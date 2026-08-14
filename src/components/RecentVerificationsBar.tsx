import React from 'react';
import { History, ShieldCheck, ShieldAlert, AlertTriangle, HelpCircle, ArrowRight } from 'lucide-react';
import { VerificationResult } from '../types';

interface RecentVerificationsBarProps {
  history: VerificationResult[];
  onSelectResult: (result: VerificationResult) => void;
  currentResultId?: string;
}

export const RecentVerificationsBar: React.FC<RecentVerificationsBarProps> = ({
  history,
  onSelectResult,
  currentResultId,
}) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-8">
      <div className="p-4 rounded-xl glass-panel border border-emerald-950/60">
        <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          <History className="w-3.5 h-3.5 text-emerald-400" />
          <span>Recently Verified In This Session ({history.length})</span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin">
          {history.map((item) => {
            const isSelected = currentResultId === item.id;
            const badgeColor = 
              item.verdict === 'VERIFIED' ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/50' :
              item.verdict === 'FALSE' ? 'text-red-400 bg-red-950/60 border-red-800/50' :
              item.verdict === 'MISLEADING' ? 'text-amber-400 bg-amber-950/60 border-amber-800/50' :
              'text-zinc-400 bg-zinc-900 border-zinc-700';

            return (
              <button
                key={item.id}
                onClick={() => onSelectResult(item)}
                className={`px-3 py-2 rounded-lg text-left text-xs transition-all shrink-0 max-w-[260px] border ${
                  isSelected
                    ? 'bg-emerald-950/90 border-emerald-500/60 shadow-sm ring-1 ring-emerald-400/30'
                    : 'bg-zinc-900/60 hover:bg-zinc-800/80 border-zinc-800 text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${badgeColor}`}>
                    {item.verdict}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {item.confidence}%
                  </span>
                </div>
                <p className="text-zinc-300 text-xs truncate font-medium">
                  {item.extractedClaim}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
