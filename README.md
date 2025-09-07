# 🎵 Lyric Meaning Finder

A Python-based web application that fetches song lyrics and provides AI-powered analysis of their meaning, metaphors, and cultural references.

## 📋 Description

Lyric Meaning Finder is an intuitive Streamlit web application that allows users to search for song lyrics and get detailed AI-powered interpretations. Simply enter a song name and artist, and the app will fetch the lyrics from Genius and provide a comprehensive line-by-line analysis using Google's Gemini AI.

## ✨ Features

- **🔍 Song Search**: Search for any song by title and artist name
- **📖 Lyrics Retrieval**: Fetch accurate lyrics from the Genius database
- **🤖 AI Analysis**: Get detailed line-by-line meaning analysis using Google's Gemini AI
- **💾 Download Option**: Save lyrics as text files for offline access
- **📱 Responsive UI**: Clean, user-friendly interface with expandable sections
- **⚡ Streaming Analysis**: Real-time streaming of AI analysis for better UX
- **🔄 Session Management**: Maintains data across user interactions
- **⚠️ Error Handling**: Robust error handling for API failures and missing content

## 🏗️ Project Structure

```
lyric-meaning-finder/
│
├── app.py                 # Main Streamlit application
├── genius_lyrics.py       # Genius API integration for lyrics fetching
├── lyrics_meaning.py      # Google Gemini AI integration for analysis
├── .env                   # Environment variables (API keys)
├── requirements.txt       # Python dependencies
└── README.md             # Project documentation
```

## 🛠️ Installation

### Prerequisites

- Python 3.7 or higher
- Genius API Access Token
- Google AI API Key

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lyric-meaning-finder.git
   cd lyric-meaning-finder
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the project root:
   ```env
   GENIUS_ACCESS_TOKEN=your_genius_api_token_here
   GOOGLE_API_KEY=your_google_ai_api_key_here
   ```

## 🔑 API Setup

### Genius API
1. Visit [Genius API](https://genius.com/api-clients)
2. Create a new API client
3. Copy your access token to the `.env` file

### Google AI (Gemini)
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new API key
3. Add it to your `.env` file

## 📦 Dependencies

Create a `requirements.txt` file with the following:

```txt
streamlit==1.28.1
lyricsgenius==3.0.1
google-generativeai==0.3.2
python-dotenv==1.0.0
```

## 🚀 Usage

1. **Start the application**
   ```bash
   streamlit run app.py
   ```

2. **Open your browser** and navigate to `http://localhost:8501`

3. **Search for a song**:
   - Enter the song name (e.g., "Bohemian Rhapsody")
   - Enter the artist name (e.g., "Queen")
   - Click "Get Lyrics"

4. **View and analyze**:
   - Expand "View Full Lyrics" to see the complete lyrics
   - Download lyrics as a text file if needed
   - Click "Analyze Lyrics ✨" for AI-powered analysis

## 💡 How It Works

1. **Lyrics Fetching**: The app uses the `lyricsgenius` library to search and retrieve lyrics from Genius.com
2. **AI Analysis**: Google's Gemini 2.5 Flash model analyzes the lyrics, providing insights into:
   - Metaphors and symbolism
   - Cultural references
   - Emotional themes
   - Line-by-line interpretations
3. **Streaming Response**: The AI analysis is streamed in real-time for better user experience

## 🔧 Technical Details

- **Frontend**: Streamlit for the web interface
- **Lyrics API**: Genius API via `lyricsgenius` library
- **AI Model**: Google Gemini 2.5 Flash for text analysis
- **State Management**: Streamlit session state for maintaining data
- **Error Handling**: Comprehensive error handling for API failures

## 🚨 Error Handling

The application handles various error scenarios:
- Missing or incorrect song/artist names
- Lyrics not found in Genius database
- API rate limiting and timeouts
- Invalid API keys or authentication issues

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ⚠️ Disclaimer

This tool is for educational and personal use. Please respect copyright laws and the terms of service of the APIs used. Lyrics are retrieved from Genius.com and are subject to their terms of use.

## 📞 Support

If you encounter any issues or have questions, please:
- Check the troubleshooting section
- Create an issue on GitHub
- Ensure your API keys are correctly configured

## 🎯 Future Enhancements

- [ ] Support for multiple languages
- [ ] Sentiment analysis visualization
- [ ] User authentication and saved analyses

---

**Made with ❤️ using Streamlit, Genius API, and Google AI**