from sqlalchemy.orm import Session
from sqlalchemy import func
import models
import schemas

def get_song(db: Session, song_name: str, artist_name: str):
  """
  Find a song by name and artist (case-insensitive).
  """

  return db.query(models.Song).filter(
    func.lower(models.Song.song_name) == func.lower(song_name),
    func.lower(models.Song.artist_name) == func.lower(artist_name)
  ).first()

def create_song(db: Session, song: schemas.SongCreate):
  """
  Create a new song entry with cached lyrics
  """

  db_song = models.Song(
    song_name = song.song_name,
    artist_name = song.artist_name,
    lyrics = song.lyrics,
    search_count = 1
  )

  db.add(db_song)
  db.commit()
  db.refresh(db_song)
  return db_song

def increment_search_count(db: Session, song_id: int):
  """
  Increment search count when a song is looked up again
  """

  song = db.query(models.Song).filter(models.Song.id==song_id).first()
  if song:
    song.search_count+=1
    db.commit()
    db.refresh(song)

  return 
  
def get_latest_analysis(db: Session, song_id: int):
  """
  Get the most recent analysis for a song.
  """
  return db.query(models.Analysis).filter(
    models.Analysis.song_id == song_id
  ).order_by(models.Analysis.created_at.desc()).first()

def create_analysis(db: Session, analysis: schemas.AnalysisCreate):
  """
  Store a new AI analysis.
  """
  db_analysis = models.Analysis(
    song_id=analysis.song_id,
    song_name=analysis.song_name,
    artist_name=analysis.artist_name,
    analysis=analysis.analysis
  )
  db.add(db_analysis)
  db.commit()
  db.refresh(db_analysis)
  return db_analysis

def log_search(db: Session, song_name: str, artist_name: str, success: bool = True):
  """
  Log every search for analytics.
  """
  search_log = models.SearchHistory(
      song_name=song_name,
      artist_name=artist_name,
      success=success
  )
  db.add(search_log)
  db.commit()

def get_popular_songs(db: Session, limit: int = 10):
  """
  Get most searched songs.
  """
  return db.query(models.Song).order_by(
      models.Song.search_count.desc()
  ).limit(limit).all()

