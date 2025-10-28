from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional
import logging

from genius_lyrics import get_lyrics, save_lyrics
from lyrics_meaning import get_lyrics_analysis

from database import engine, get_db
from schemas import LyricsRequest, AnalyzeRequest, AnalyzeResponse
import models, schemas, crud

models.Base.metadata.create_all(bind=engine)

logging.basicConfig(level = logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
  title="Lyrics Meaning API",
  description="API for fetching song lyrics and analyzing their meaning using AI",
  version="1.0.0"
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=[
        "http://localhost:3000",     
        "http://127.0.0.1:3000",
        "https://lyrics-meaning-with-ai.vercel.app",              
        "https://lyrics-meaning-with-ai-*.vercel.app",    
    ],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/")
def read_root():
  return {
    "message": "Lyrics Meaning API is running",
    "status": "healthy",
    "features": ["lyrics caching", "analysis caching", "search analytics"],
    "endpoints": {
      "/lyrics": "GET - Fetch song lyrics",
      "/analyze": "POST - Analyze lyrics meaning"
    }
  }

@app.post("/lyrics", response_model=schemas.LyricsResponse)
def fetch_lyrics(request: LyricsRequest, db: Session = Depends(get_db)):
  """
  Fetch lyrics for a given song and artist from Genius.
  """

  lyrics = None
  cached_song = None

  try:
    crud.log_search(db, request.song, request.artist, success=False)
    cached_song = crud.get_song(db, request.song, request.artist)

    if cached_song and cached_song.lyrics:
      logger.info(f"✅ Cache HIT for '{request.song}'")
      crud.increment_search_count(db, cached_song.id)
      lyrics = cached_song.lyrics

    else:
      logger.info(f"❌ Cache MISS - Fetching from Genius API")
      lyrics = get_lyrics(request.song, request.artist)
    
      if not lyrics:
        raise HTTPException(
          status_code=404, 
          detail="Lyrics not found."
        )
      
      if cached_song:
        cached_song.lyrics = lyrics
        crud.increment_search_count(db, cached_song.id)
        db.commit()
      
      else:
        song_data = schemas.SongCreate(
          song_name = request.song,
          artist_name = request.artist,
          lyrics = lyrics
        )
        cached_song = crud.create_song(db, song_data)

    crud.log_search(db, request.song, request.artist, success=True)

    return schemas.LyricsResponse(
      song=request.song,
      artist=request.artist,
      lyrics=lyrics,
      created_at=cached_song.created_at
    )
  
  except HTTPException:
    raise

  except Exception as e:
    logger.error(f"Error fetching lyrics: {str(e)}")
    raise HTTPException(
      status_code=500, 
      detail=f"An error occurred while fetching lyrics: {str(e)}"
    )

@app.post("/analyze")
def analyze_lyrics(request: AnalyzeRequest, db: Session = Depends(get_db)):
  """
  Analyze the meaning of song lyrics using AI.
  Can accept pre-fetched lyrics or fetch them automatically.
  Supports multiple modes and content filters.
  """

  lyrics = None

  try:
    cached_song = crud.get_song(db, request.song, request.artist)

    if cached_song and cached_song.lyrics:
      lyrics = cached_song.lyrics
      crud.increment_search_count(db, cached_song.id)

    else:
      if request.lyrics:
        lyrics = request.lyrics
      
      else:
        lyrics = get_lyrics(request.song, request.artist)
        if not lyrics:
          raise HTTPException(status_code=404, detail="Lyrics not found")

      song_data = schemas.SongCreate(
        song_name = request.song,
        artist_name = request.artist,
        lyrics = lyrics
      )
      
    def analysis_generator():
      try:
        for chunk in get_lyrics_analysis(
          lyrics, 
          request.song, 
          request.artist, 
          mode=request.mode, 
          content_filter=request.content_filter
        ):
          yield chunk
      except Exception as e:
        logger.error(f"Error during analysis: {str(e)}")
        yield f"\n\n Error: {str(e)}"
    
    return StreamingResponse(
      analysis_generator(),
      media_type="text/plain"
    )
  
  except HTTPException:
    raise

  except Exception as e:
    logger.error(f"Error in analyze endpoint: {str(e)}")
    raise HTTPException(
      status_code=500,
      detail=f"An error occurred during analysis: {str(e)}"
    )

@app.post("/analyze-complete", response_model=AnalyzeResponse)
def analyze_lyrics_complete(request: AnalyzeRequest):
  """
  Analyze lyrics and return the complete analysis (non-streaming).
  Better for simple frontends that don't need streaming.
  """

  lyrics = None

  try:
    cached_song = crud.get_song(db, request.song, request.artist)

    if cached_song and cached_song.lyrics:
      lyrics = cached_song.lyrics
      crud.increment_search_count(db, cached_song.id)

      cached_analysis = crud.get_analysis(db, cached_song.id)

      if cached_analysis:
        logger.info(f"Returning cached analysis")

        return schemas.AnalyzeResponse(
          song=request.song,
          artist=request.artist,
          lyrics=lyrics,
          analysis=cached_analysis.analysis,
          created_at=cached_analysis.created_at
        )

    if not lyrics:
      if request.lyrics:
        lyrics = request.lyrics
      
      else:
        lyrics = get_lyrics(request.song, request.artist)
        if not lyrics:
          raise HTTPException(status_code=404, detail="Lyrics not found")

      song_data = schemas.SongCreate(
        song_name = request.song,
        artist_name = request.artist,
        lyrics = lyrics
      )
      cached_song = crud.create_song(db, song_data)

    logger.info(f"Generating new analysis") 
    analysis_chunks = []
    for chunk in get_lyrics_analysis(lyrics, request.song, request.artist):
      analysis_chunks.append(chunk)
      
    full_analysis = "".join(analysis_chunks)

    analysis_data = schemas.AnalysisCreate(
      song_id = cached_song.id,
      song_name = request.song,
      artist_name = request.artist,
      analysis = full_analysis
    )
    saved_analysis = crud.create_analysis(db, analysis_data)
      
    return schemas.AnalyzeResponse(
      song=request.song,
      artist=request.artist,
      lyrics=lyrics,
      analysis=full_analysis,
      created_at=saved_analysis.created_at
    )
  
  except HTTPException:
    raise
  except Exception as e:
    logger.error(f"Error in analyze-complete endpoint: {str(e)}")
    raise HTTPException(
        status_code=500,
        detail=f"An error occurred during analysis: {str(e)}"
    )

@app.get("/popular")
def get_popular_songs(limit: int = 10, db: Session = Depends(get_db)):
  """
  Get most searched songs.
  """
  popular = crud.get_popular_songs(db, limit)
  return {
    "popular_songs": [
      {
        "song": song.song_name,
        "artist": song.artist_name,
        "searches": song.search_count
      }
      for song in popular
    ]
  }