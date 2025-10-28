import { FileText, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export const LyricsDisplay = ({ lyrics }) => {
  const [copied, setCopied] = useState(false);

  if (!lyrics) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(lyrics);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-slide-up">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 md:p-8 border-2 border-blue-100 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-100">
              Lyrics
            </h2>
          </div>
          <button
            onClick={copyToClipboard}
            className="p-3 bg-blue-50 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-slate-600 rounded-xl transition-colors duration-200 border border-blue-200 dark:border-slate-600"
            title="Copy lyrics"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            )}
          </button>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950 rounded-2xl p-6 max-h-[500px] overflow-y-auto custom-scrollbar border border-blue-100 dark:border-slate-700">
          <pre className="whitespace-pre-wrap font-sans text-blue-900 dark:text-blue-100 leading-relaxed">
            {lyrics}
          </pre>
        </div>
      </div>
    </div>
  );
};
