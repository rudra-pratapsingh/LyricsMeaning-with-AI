import { useState, useCallback } from 'react';
import { api } from '../services/api';

export const useStreamAnalysis = () => {
  const [lyrics, setLyrics] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeSong = useCallback(async (song, artist, mode = 'summary', contentFilter = 'family_friendly') => {
    setLoading(true);
    setError(null);
    setLyrics('');
    setAnalysis('Analyzing lyrics... 🧠');

    try {
      // Step 1: Fetch lyrics
      const lyricsData = await api.fetchLyrics(song, artist);
      setLyrics(lyricsData.lyrics);

      // Step 2: Stream analysis with mode and filter
      setAnalysis('');
      await api.streamAnalysis(song, artist, mode, contentFilter, (chunk) => {
        setAnalysis(prev => prev + chunk);
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLyrics('');
    setAnalysis('');
    setError(null);
  }, []);

  return { lyrics, analysis, loading, error, analyzeSong, reset };
};
