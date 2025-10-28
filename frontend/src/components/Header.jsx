import { Music, Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="text-center mb-12 md:mb-16">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="relative">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl">
            <Music className="w-12 h-12 text-white animate-bounce" />
          </div>
          <Sparkles className="w-6 h-6 text-blue-400 absolute -top-2 -right-2 animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-blue-900 dark:text-blue-100 drop-shadow-lg">
          Lyrics<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AI</span>
        </h1>
      </div>
      <p className="text-lg md:text-2xl text-blue-700 dark:text-blue-300 max-w-2xl mx-auto">
        Uncover the hidden meanings in your favorite songs with AI-powered analysis
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
        <div className="px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-md border border-blue-100 dark:border-slate-700 text-blue-700 dark:text-blue-300">
          🎵 Real-time Analysis
        </div>
        <div className="px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-md border border-blue-100 dark:border-slate-700 text-blue-700 dark:text-blue-300">
          ✨ AI-Powered
        </div>
        <div className="px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-md border border-blue-100 dark:border-slate-700 text-blue-700 dark:text-blue-300">
          🚀 Instant Results
        </div>
      </div>
    </header>
  );
};
