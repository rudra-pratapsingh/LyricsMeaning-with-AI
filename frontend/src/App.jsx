import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { LyricsDisplay } from './components/LyricsDisplay';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { PopularSongs } from './components/PopularSongs';
import { useStreamAnalysis } from './hooks/useStreamAnalysis';
import { AlertCircle, Moon, Sun } from 'lucide-react';

function App() {
  const { lyrics, analysis, loading, error, analyzeSong } = useStreamAnalysis();
  const [showResults, setShowResults] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAnalyze = async (song, artist, mode, contentFilter) => {
    setShowResults(true);
    await analyzeSong(song, artist, mode, contentFilter);
  };  

  const handleQuickSearch = (song, artist) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleAnalyze(song, artist);
  };

  return (
    <div className="min-h-screen">
      {/* Soft pastel background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 transition-colors duration-500"></div>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(191, 219, 254, 0.3) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      <div className="relative py-8 md:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="fixed top-6 right-6 z-50 p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-full hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-lg border border-blue-100 dark:border-slate-700 group"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-amber-400 group-hover:rotate-180 transition-transform duration-500" />
            ) : (
              <Moon className="w-6 h-6 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
            )}
          </button>

          <Header />
          
          <SearchForm onSubmit={handleAnalyze} loading={loading} />
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-6 py-4 rounded-2xl mb-8 flex items-center gap-3 shadow-lg animate-shake">
              <AlertCircle className="w-6 h-6" />
              <p className="font-medium">{error}</p>
            </div>
          )}
          
          {showResults && (lyrics || analysis) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 animate-fade-in">
              <LyricsDisplay lyrics={lyrics} />
              <AnalysisDisplay analysis={analysis} loading={loading} />
            </div>
          )}
          
          <PopularSongs onSongClick={handleQuickSearch} />
        </div>
      </div>
    </div>
  );
}

export default App;
