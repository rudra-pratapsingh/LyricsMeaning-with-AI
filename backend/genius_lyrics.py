import lyricsgenius
from dotenv import load_dotenv
import os

load_dotenv()

GENIUS_ACCESS_TOKEN = os.getenv("GENIUS_ACCESS_TOKEN")

genius = lyricsgenius.Genius(GENIUS_ACCESS_TOKEN)

def get_lyrics(song_name, artist_name):
  artist = genius.search_artist(artist_name, max_songs=0, include_features=True)
  song = genius.search_song(song_name, artist.name)
  return song.lyrics

def save_lyrics(song_name, artist_name):
  artist = genius.search_artist(artist_name, max_songs=0, include_features=True)
  song = genius.search_song(song_name, artist.name)
  artist.save_lyrics()
