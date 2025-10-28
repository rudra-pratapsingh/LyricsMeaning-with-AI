import { Brain, Sparkles, Zap, Bookmark, TrendingUp, Heart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const AnalysisDisplay = ({ analysis, loading }) => {
  const containerRef = useRef(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [analysis]);

  if (!analysis && !loading) return null;

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 md:p-8 border-2 border-blue-100 dark:border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl shadow-lg animate-pulse-slow">
                <Brain className="w-6 h-6 text-white" />
              </div>
              {loading && (
                <Zap className="w-4 h-4 text-blue-400 absolute -top-1 -right-1 animate-ping" />
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-100">
              AI Analysis
            </h2>
            <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
          </div>

          {/* Save button */}
          {analysis && !loading && (
            <button
              onClick={handleSave}
              className="p-3 bg-blue-50 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-slate-600 rounded-xl transition-colors duration-200 border border-blue-200 dark:border-slate-600"
              title={isSaved ? "Saved" : "Save analysis"}
            >
              {isSaved ? (
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              ) : (
                <Bookmark className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              )}
            </button>
          )}
        </div>

        {/* Stats bar */}
        {analysis && !loading && (
          <div className="flex gap-3 mb-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-700 dark:text-blue-300 font-medium">
                AI Generated
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-100 dark:border-green-800">
              <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-green-700 dark:text-green-300 font-medium">
                {Math.ceil(analysis.split(' ').length / 200)} min read
              </span>
            </div>
          </div>
        )}
        
        {/* Analysis content */}
        <div 
          ref={containerRef}
          className="bg-gradient-to-br from-indigo-50 via-blue-50 to-white dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 rounded-2xl p-6 max-h-[600px] overflow-y-auto custom-scrollbar border border-blue-100 dark:border-slate-700"
        >
          {loading && !analysis ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                AI is analyzing the lyrics...
              </span>
            </div>
          ) : (
            <div className="analysis-content prose prose-sm md:prose-base max-w-none dark:prose-invert text-blue-900 dark:text-blue-100">
              {/* Custom markdown-like rendering */}
              {analysis.split('\n').map((line, index) => {
                
                if (line.startsWith('## ')) {
                  return (
                    <h3 key={index} className="text-xl font-bold text-blue-900 dark:text-blue-100 mt-6 mb-3 flex items-center gap-2">
                      {line.replace('## ', '')}
                    </h3>
                  );
                }
                
                if (line.startsWith('• ') || line.startsWith('- ')) {
                  return (
                    <li key={index} className="ml-4 mb-2 text-blue-800 dark:text-blue-200 leading-relaxed">
                      {line.replace('• ', '').replace('- ', '')}
                    </li>
                  );
                }
                
                if (line.includes('"') && line.startsWith('**"') && !line.includes('→')) {
                  return (
                    <p key={index} className="bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500 pl-4 py-2 rounded-r-lg my-3 italic text-blue-800 dark:text-blue-200 font-medium">
                      {line.replace(/\*\*/g, '')}
                    </p>
                  );
                }
                
                if (line.includes('→')) {
                  return (
                    <p key={index} className="ml-6 mb-3 text-blue-700 dark:text-blue-300 leading-relaxed">
                      {line}
                    </p>
                  );
                }
                
                if (line.trim()) {
                  return (
                    <p key={index} className="mb-3 leading-relaxed text-blue-800 dark:text-blue-200">
                      {line}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
