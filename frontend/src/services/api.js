const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  // Fetch lyrics
  async fetchLyrics(song, artist) {
    const response = await fetch(`${API_BASE}/lyrics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ song, artist })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch lyrics');
    }
    
    return response.json();
  },

  // Stream analysis with mode and content filter
  async streamAnalysis(song, artist, mode, contentFilter, onChunk) {
    const response = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        song, 
        artist,
        mode,
        content_filter: contentFilter
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to analyze lyrics');
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      onChunk(chunk);
    }
  },

  // Get popular songs
  async getPopularSongs(limit = 6) {
    const response = await fetch(`${API_BASE}/popular?limit=${limit}`);
    return response.json();
  }
};
