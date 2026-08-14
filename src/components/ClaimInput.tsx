import React, { useState } from 'react';
import { Search, Sparkles, Clipboard, Trash2, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { SAMPLE_CLAIMS } from '../data/sampleClaims';
import { SampleClaim } from '../types';

interface ClaimInputProps {
  inputMessage: string;
  setInputMessage: (msg: string) => void;
  onVerify: () => void;
  isLoading: boolean;
}

export const ClaimInput: React.FC<ClaimInputProps> = ({
  inputMessage,
  setInputMessage,
  onVerify,
  isLoading,
}) => {
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputMessage(text);
      }
    } catch {
      // Clipboard permissions might be blocked in iframe; user can use Ctrl+V
    }
  };

  const handleSelectSample = (sample: SampleClaim) => {
    setInputMessage(sample.text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (inputMessage.trim() && !isLoading) {
        onVerify();
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4">
      {/* Hero Section */}
      <div className="text-center space-y-3 mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>PAKVERIFY • RUK. CHECK. PHIR SHARE.</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Before You Forward. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200">Verify.</span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-normal">
          AI-assisted claim verification for Pakistan's digital communities.
        </p>
      </div>

      {/* Main Input Box */}
      <div className="relative rounded-2xl glass-panel-elevated p-4 sm:p-6 shadow-2xl border border-emerald-900/40 emerald-glow">
        
        {/* Top actions toolbar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-950/60 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5 font-medium text-emerald-400/90">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Forwarded Message / Social Post Text</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePaste}
              className="flex items-center gap-1 px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-md border border-zinc-800 transition-colors"
              title="Paste from clipboard"
            >
              <Clipboard className="w-3 h-3 text-emerald-400" />
              <span>Paste</span>
            </button>

            {inputMessage && (
              <button
                type="button"
                onClick={() => setInputMessage('')}
                className="flex items-center gap-1 px-2 py-1 bg-zinc-900/60 hover:bg-red-950/40 text-zinc-400 hover:text-red-300 rounded-md border border-zinc-800 hover:border-red-800/40 transition-colors"
                title="Clear text"
              >
                <Trash2 className="w-3 h-3" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Text area */}
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste a viral message here... (e.g. WhatsApp forward, circular rumor, breaking news alert)"
          rows={5}
          disabled={isLoading}
          className="w-full bg-transparent text-white text-base sm:text-lg placeholder:text-zinc-500 focus:outline-none resize-none disabled:opacity-50 leading-relaxed font-sans"
        />

        {/* Bottom bar & Verify button */}
        <div className="pt-4 mt-2 border-t border-emerald-950/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-400 flex items-center gap-2 w-full sm:w-auto">
            <span>{inputMessage.length} characters</span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="hidden sm:inline text-zinc-500">Press Ctrl + Enter to verify</span>
          </div>

          <button
            type="button"
            onClick={onVerify}
            disabled={isLoading || !inputMessage.trim()}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer select-none ${
              !inputMessage.trim() || isLoading
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/40'
                : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-extrabold shadow-lg shadow-emerald-600/30 emerald-button-glow border border-emerald-300/40 active:scale-[0.98]'
            }`}
          >
            <Search className="w-4 h-4 text-black stroke-[2.5]" />
            <span>🔎 VERIFY CLAIM</span>
          </button>
        </div>
      </div>

      {/* Trust Notice requirement */}
      <div className="text-center mt-4">
        <p className="text-xs text-zinc-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>AI-assisted verification. Always review the evidence before sharing.</span>
        </p>
      </div>

      {/* Sample claims to test quickly */}
      <div className="mt-8 pt-6 border-t border-emerald-950/40">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Or try common viral WhatsApp claims in Pakistan:</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SAMPLE_CLAIMS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSample(sample)}
              className="text-left p-3 rounded-xl bg-zinc-900/60 hover:bg-emerald-950/40 border border-zinc-800 hover:border-emerald-700/40 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-zinc-200 group-hover:text-emerald-300 transition-colors">
                  {sample.title}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/40">
                  {sample.category}
                </span>
              </div>
              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                {sample.text}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
