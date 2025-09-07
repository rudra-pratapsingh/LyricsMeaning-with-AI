import google.generativeai as genai
import os
import time
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')

def get_lyric_analysis(lyrics, song_title, artist_name):
    """
    Analyzes the meaning of song lyrics using the Gemini API.
    
    This function processes lyrics in chunks to handle rate limits and 
    provide a better streaming-like experience in the UI.
    """
    
    prompt = f"""
    You are an expert music and literature analyst. Your task is to analyze the following lyrics for the song "{song_title}" by "{artist_name}".

    Provide a deep, line-by-line analysis. For each line, first state the line, and then explain its meaning, including any metaphors, cultural references, or emotional tone.

    Format the output clearly. Use Markdown for formatting. For each line, use a heading for the lyric itself.

    Here are the lyrics:
    ---
    {lyrics}
    ---
    """

    print("🧠 Sending lyrics to the AI for analysis...")
    
    try:
        response = model.generate_content(prompt, stream=True)
        
        for chunk in response:
            yield chunk.text
            time.sleep(0.05) 
            
    except Exception as e:
        error_message = f"❌ An error occurred with the AI analysis: {e}"
        print(error_message)
        yield error_message