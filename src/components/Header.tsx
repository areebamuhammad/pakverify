import React from 'react';
import { ShieldCheck, Sparkles, BookOpen, Globe, Info } from 'lucide-react';

interface HeaderProps {
  onOpenTrustModal: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTrustModal, onReset }) => {
  return (
    <header className="w-full border-b border-emerald-900/30 bg-[#070b09]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        
        {/* Brand identity */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-950 border border-emerald-400/30 shadow-lg shadow-emerald-950/50 group-hover:border-emerald-400/60 transition-all duration-300">
            <ShieldCheck className="w-5 h-5 text-emerald-300 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white font-mono">
                PAK<span className="text-emerald-400">VERIFY</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                AI Fact-Check
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-medium tracking-wide">
              Ruk. Check. <span className="text-emerald-400 font-semibold">Phir Share.</span>
            </p>
          </div>
        </div>

        {/* Right action items */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-900/40 text-xs text-emerald-300/90">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Trusted Evidence</span>
          </div>

          <button
            onClick={onOpenTrustModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-emerald-300 bg-zinc-900/80 hover:bg-emerald-950/50 border border-zinc-800 hover:border-emerald-700/50 rounded-lg transition-all"
            title="How PAKVERIFY Verifies Claims"
          >
            <Info className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Trust Principles</span>
            <span className="sm:hidden">Trust</span>
          </button>
        </div>
      </div>
    </header>
  );
};
