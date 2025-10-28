import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

export const SearchForm = ({ onSubmit, loading }) => {
  const [song, setSong] = useState('');
  const [artist, setArtist] = useState('');
  const [mode, setMode] = useState('summary');
  const [contentFilter, setContentFilter] = useState('family_friendly');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (song.trim() && artist.trim()) {
      onSubmit(song.trim(), artist.trim(), mode, contentFilter);
    }
  };

  return (
    <div className="relative mb-8">
      <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 md:p-10 border-2 border-blue-100 dark:border-slate-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Song and Artist inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <input
              type="text"
              placeholder="Song name"
              value={song}
              onChange={(e) => setSong(e.target.value)}
              className="w-full px-6 py-4 bg-blue-50 dark:bg-slate-900 border-2 border-blue-200 dark:border-slate-600 rounded-2xl focus:border-blue-400 dark:focus:border-blue-500 focus:outline-none text-lg transition-all duration-300 placeholder:text-blue-400 dark:placeholder:text-slate-500 text-blue-900 dark:text-blue-100"
              required
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Artist name"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="w-full px-6 py-4 bg-blue-50 dark:bg-slate-900 border-2 border-blue-200 dark:border-slate-600 rounded-2xl focus:border-blue-400 dark:focus:border-blue-500 focus:outline-none text-lg transition-all duration-300 placeholder:text-blue-400 dark:placeholder:text-slate-500 text-blue-900 dark:text-blue-100"
              required
              disabled={loading}
            />
          </div>

          {/* Minimalist Toggle Options */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            {/* Analysis Mode - Pill Toggle */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-blue-700 dark:text-blue-300 mb-2">
                Analysis Type
              </label>
              <div className="inline-flex bg-blue-100 dark:bg-slate-900 rounded-full p-1 w-full">
                <button
                  type="button"
                  onClick={() => setMode('summary')}
                  disabled={loading}
                  className={`flex-1 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    mode === 'summary'
                      ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-md'
                      : 'text-blue-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-slate-300'
                  }`}
                >
                  Quick Summary
                </button>
                <button
                  type="button"
                  onClick={() => setMode('detailed')}
                  disabled={loading}
                  className={`flex-1 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    mode === 'detailed'
                      ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-md'
                      : 'text-blue-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-slate-300'
                  }`}
                >
                  Line-by-Line
                </button>
              </div>
            </div>

            {/* Content Filter - Pill Toggle */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-blue-700 dark:text-blue-300 mb-2">
                Content Filter
              </label>
              <div className="inline-flex bg-blue-100 dark:bg-slate-900 rounded-full p-1 w-full">
                <button
                  type="button"
                  onClick={() => setContentFilter('family_friendly')}
                  disabled={loading}
                  className={`flex-1 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    contentFilter === 'family_friendly'
                      ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-md'
                      : 'text-blue-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-slate-300'
                  }`}
                >
                  Family Safe
                </button>
                <button
                  type="button"
                  onClick={() => setContentFilter('explicit')}
                  disabled={loading}
                  className={`flex-1 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    contentFilter === 'explicit'
                      ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-md'
                      : 'text-blue-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-slate-300'
                  }`}
                >
                  Explicit
                </button>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-blue-300/50 dark:hover:shadow-blue-900/50 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="w-7 h-7 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-7 h-7" />
                Analyze Lyrics
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
