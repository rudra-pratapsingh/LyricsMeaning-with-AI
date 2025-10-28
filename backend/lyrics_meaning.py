import google.generativeai as genai
import os
import time
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash-exp')

def get_lyrics_analysis(lyrics, song_title, artist_name, mode="summary", content_filter="family_friendly"):
    """
    Analyzes song lyrics with multiple modes.
    
    Args:
        mode: "summary" or "detailed" (line-by-line)
        content_filter: "family_friendly" or "explicit"
    """
    
    base_instructions = """
        Use VERY SIMPLE language that anyone can understand. Avoid big, complicated words.
        Write like you're explaining to a friend who doesn't know much about poetry or literature.
        Use everyday words and short sentences.
    """

    if content_filter == "family_friendly":
        content_instructions = """
        Keep explanations appropriate for all ages. If the song has mature themes, explain them in a gentle, educational way without explicit details.
        """
    else:
        content_instructions = """
        Be honest about mature themes, explicit content, or controversial topics. Explain them directly and clearly.
        """
    
    if mode == "summary":
        prompt = f"""You are a friendly music expert explaining songs in simple words.

        {base_instructions}
        {content_instructions}

        Analyze "{song_title}" by {artist_name} in this EXACT format:

        ## 🎯 What's This Song About?
        [Explain the main idea in 2-3 simple sentences]

        ## 💡 Main Ideas
        • [Idea 1]: [Explain in one simple sentence]
        • [Idea 2]: [Explain in one simple sentence]  
        • [Idea 3]: [Explain in one simple sentence]

        ## 🎭 How Does It Feel?
        [Describe the mood in 2 simple sentences - happy, sad, angry, calm, etc.]

        ## 🔍 Hidden Meanings
        [Explain any deeper meanings, symbols, or references in 3-4 simple sentences]

        ## 💭 Best Lines
        • "[Quote a powerful line]" - [What this means in simple words]
        • "[Quote another line]" - [What this means in simple words]

        Lyrics:
        ---
        {lyrics}
        ---
        """
    
    else: 
        prompt = f"""You are a friendly music expert explaining songs line-by-line in simple words.

        {base_instructions}
        {content_instructions}

        Analyze "{song_title}" by {artist_name}. Go through the lyrics and explain what each important line or verse means.

        Format like this:

        ## 📝 Line-by-Line Breakdown

        ### [First verse or section name]
        **"[Quote 1-2 lines]"**
        → [Explain what this means in simple, everyday words]

        **"[Next 1-2 lines]"**
        → [Explain what this means]

        [Continue for all important parts]

        ## 🎯 Overall Message
        [Sum up the whole song's meaning in 2-3 simple sentences]

        Focus on the most important and interesting lines. Skip repetitive choruses after explaining them once.

        Lyrics:
        ---
        {lyrics}
        ---
        """
    
    print(f"🧠 Analyzing '{song_title}' by {artist_name} in {mode} mode ({content_filter})...")
    
    try:
        response = model.generate_content(prompt, stream=True)
        for chunk in response:
            yield chunk.text
            time.sleep(0.03)
    except Exception as e:
        error_message = f"❌ Error: {e}"
        print(error_message)
        yield error_message
