from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func
from database import Base

class Song(Base):
  """
  Stores song information and cached lyrics.
  """

  __tablename__ = "songs"

  id = Column(Integer, primary_key=True, index=True)
  song_name = Column(String(255), nullable=False, index=True)
  artist_name = Column(String(255), nullable=False, index=True)
  lyrics = Column(Text, nullable=True)

  created_at = Column(DateTime(timezone=True), server_default=func.now())
  updated_at = Column(DateTime(timezone=True), onupdate=func.now())

  search_count = Column(Integer, default=0)

  def __repr__(self):
    return f"<Song(id={self.id}, song='{self.song_name}', artist='{self.artist_name}')>"

class Analysis(Base):
  """
  Stores AI-generated lyric analysis.
  One song can have multiple analyses if re-analyzed.
  """

  __tablename__ = "analyses"

  id = Column(Integer, primary_key=True, index=True)
  song_id = Column(Integer, ForeignKey("songs.id"), nullable=False, index=True)
  song_name = Column(String(255), nullable=False)
  artist_name = Column(String(255), nullable=False)
  analysis = Column(Text, nullable=False)

  created_at = Column(DateTime(timezone=True), server_default=func.now())

  def __repr__(self):
    return f"<Analysis(id={self.id}, song_id={self.song_id})>"

class SearchHistory(Base):
  """
  Tracks every search request for analytics.
  """

  __tablename__ = "search_history"

  id = Column(Integer, primary_key=True, index=True)
  song_name = Column(String(255), nullable=False, index=True)
  artist_name = Column(String(255), nullable=False)
  success = Column(Boolean, default=True)

  timestamp = Column(DateTime(timezone=True), server_default=func.now())

  def __repr__(self):
    return f"<SearchHistory(id={self.id}, song={self.song_name})>"