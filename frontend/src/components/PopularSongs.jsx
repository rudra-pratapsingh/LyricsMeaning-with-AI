import { useState, useEffect } from 'react';
import { TrendingUp, Play, Flame } from 'lucide-react';
import { api } from '../services/api';

export const PopularSongs = ({ onSongClick }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    api.getPopularSongs(6)
      .then(data => setSongs(data.popular_songs))
      .catch(console.error);
  }, []);

  if (songs.length === 0) return null;

  return (
    <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 md:p-8 border-2 border-blue-100 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-100">
            Trending Songs
          </h3>
          <Flame className="w-6 h-6 text-blue-500 animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {songs.map((song, index) => (
            <button
              key={index}
              onClick={() => onSongClick(song.song, song.artist)}
              className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-slate-800 dark:hover:to-blue-900 p-5 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 text-left border-2 border-blue-100 dark:border-slate-700"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 text-lg">
                    {song.song}
                  </h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1 line-clamp-1">
                    {song.artist}
                  </p>
                </div>
                <div className="flex-shrink-0 ml-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 group-hover:from-blue-600 group-hover:to-indigo-700 rounded-lg transition-all shadow-md">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs">
                <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center gap-1">
                  <Flame className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-700 dark:text-blue-300 font-medium">
                    {song.searches} searches
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
