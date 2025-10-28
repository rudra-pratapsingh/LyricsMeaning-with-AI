from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class LyricsRequest(BaseModel):
  song: str
  artist: str

class LyricsResponse(BaseModel):
  song: str
  artist: str
  lyrics: str
  created_at: datetime

  class Config:
    from_attributes = True
    
class AnalyzeRequest(BaseModel):
  song: str
  artist: str
  lyrics: Optional[str] = None
  mode: str = "summary"
  content_filter: str = "family_friendly"

class AnalyzeResponse(BaseModel):
  song: str
  artist: str
  lyrics: str
  analysis: str
  created_at: datetime

  class Config:
    from_attributes = True

class SongCreate(BaseModel):
  """Used when creating a new song in the database"""
  song_name: str
  artist_name: str
  lyrics: Optional[str] = None

class AnalysisCreate(BaseModel):
  """Used when saving an analysis to the database"""
  song_id: int
  song_name: str
  artist_name: str
  analysis: str