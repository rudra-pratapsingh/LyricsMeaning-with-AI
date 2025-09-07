import streamlit as st
from genius_lyrics import get_lyrics, save_lyrics
from lyrics_meaning import get_lyric_analysis

st.set_page_config(
    page_title="Lyric Meaning Finder",
    page_icon="🎵",
    layout="centered"
)

if 'lyrics' not in st.session_state:
    st.session_state.lyrics = None
if 'song_title' not in st.session_state:
    st.session_state.song_title = ""
if 'artist_name' not in st.session_state:
    st.session_state.artist_name = ""
if 'analysis' not in st.session_state:
    st.session_state.analysis = None

st.title("🎵 Lyric Meaning Finder")
st.write("Enter a song, get the lyrics, and then analyze their meaning with AI.")

song_name_input = st.text_input("Song Name", placeholder="e.g., 52 Bars")
artist_name_input = st.text_input("Artist Name", placeholder="e.g., Karan Aujla")

if st.button("Get Lyrics", type="primary"):
    st.session_state.analysis = None 
    if not song_name_input or not artist_name_input:
        st.warning("Please enter both a song name and an artist name.")
        st.session_state.lyrics = None
    else:
        st.session_state.song_name = song_name_input
        st.session_state.artist_name = artist_name_input
        with st.spinner(f"Searching for lyrics for '{st.session_state.song_name}'..."):
            lyrics_text = get_lyrics(st.session_state.song_name, st.session_state.artist_name)
            st.session_state.lyrics = lyrics_text
            if not lyrics_text:
                st.error("Sorry, lyrics could not be found. Please check the spelling.")

if st.session_state.lyrics:
    st.success(f"Lyrics found for '{st.session_state.song_name.title()}'!")
    
    with st.expander("View Full Lyrics"):
        st.text_area("Lyrics", st.session_state.lyrics, height=300, key="lyrics_text_area")
        st.download_button(
            label="Save Lyrics to .txt file",
            data=st.session_state.lyrics.encode('utf-8'),
            file_name=f"{st.session_state.artist_name} - {st.session_state.song_name}.txt",
            mime="text/plain"
        )

    if st.button("Analyze Lyrics ✨", type="primary"):
        with st.spinner("🤖 The AI is analyzing the lyrics... this may take a moment."):
            st.session_state.analysis = get_lyric_analysis(
                st.session_state.lyrics, 
                st.session_state.song_name, 
                st.session_state.artist_name
            )

if st.session_state.analysis:
    st.subheader("🤖 AI-Powered Lyrics Analysis")
    st.write_stream(st.session_state.analysis)

