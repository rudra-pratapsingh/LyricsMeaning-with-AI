import lyricsgenius
from dotenv import load_dotenv
import os

load_dotenv()

GENIUS_ACCESS_TOKEN = os.getenv("GENIUS_ACCESS_TOKEN")

genius = lyricsgenius.Genius(GENIUS_ACCESS_TOKEN)

def get_lyrics(song_name, artist_name):
  """
  Fetch lyrics from Genius using lyricsgenius library
  Returns lyrics string or None if not found
  """
  try:
    print(f"🔍 Searching for '{song_name}' by '{artist_name}'...")
    artist = genius.search_artist(artist_name, max_songs=0, include_features=True)
    if not artist:
      print(f"❌ Artist '{artist_name}' not found")
      return None
    
    song = genius.search_song(song_name, artist.name)
    if not song:
      print(f"❌ Song '{song_name}' not found")
      return None
    
    print(f"✅ Found lyrics for '{song.title}' by '{song.artist}'")
    return song.lyrics
        
    except Exception as e:
      print(f"❌ Error fetching lyrics: {str(e)}")
      import traceback
      traceback.print_exc()
      return None

def save_lyrics(song_name, artist_name):
  artist = genius.search_artist(artist_name, max_songs=0, include_features=True)
  song = genius.search_song(song_name, artist.name)
  artist.save_lyrics()
