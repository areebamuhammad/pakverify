import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, FileSearch, ShieldAlert, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import { VerificationStage } from '../types';

const STAGES: { id: VerificationStage; label: string; detail: string; icon: React.ComponentType<{ className?: string }> }[] = [
  {
    id: 'extracting',
    label: 'Extracting claim...',
    detail: 'Parsing core factual assertions and key entities from the message',
    icon: FileSearch,
  },
  {
    id: 'searching',
    label: 'Evaluating against evidence library...',
    detail: 'Checking verified official Pakistani public sources & gazettes',
    icon: Search,
  },
  {
    id: 'checking',
    label: 'Checking official sources...',
    detail: 'Cross-referencing Government, Senate, and official state records',
    icon: ShieldAlert,
  },
  {
    id: 'comparing',
    label: 'Comparing evidence...',
    detail: 'Evaluating factual consistency, source dates, and foundation records',
    icon: Sparkles,
  },
  {
    id: 'verdict',
    label: 'Generating verdict...',
    detail: 'Synthesizing confidence score and easy explanations (EN & Roman Urdu)',
    icon: CheckCircle2,
  },
];

interface VerificationLoaderProps {
  currentStage: VerificationStage;
}

export const VerificationLoader: React.FC<VerificationLoaderProps> = ({ currentStage }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    // Automatically advance through steps smoothly if backend is processing
    const stepInterval = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev < STAGES.length - 1) return prev + 1;
        return prev;
      });
    }, 1800);

    return () => clearInterval(stepInterval);
  }, []);

  const activeStage = STAGES[activeStepIndex] || STAGES[0];
  const IconComponent = activeStage.icon;

  return (
    <div className="w-full max-w-2xl mx-auto my-12 p-8 rounded-2xl glass-panel-elevated shadow-2xl relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main active stage visualization */}
      <div className="flex flex-col items-center text-center relative z-10">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-950/80">
            <IconComponent className="w-9 h-9 text-emerald-400 animate-pulse" />
          </div>
          <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400/30 animate-ping opacity-25 pointer-events-none" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-2 mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-xs font-semibold text-emerald-300">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              <span>STAGE {activeStepIndex + 1} OF 5</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {activeStage.label}
            </h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto">
              {activeStage.detail}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Step progress timeline */}
        <div className="w-full space-y-3 pt-4 border-t border-emerald-950/60">
          {STAGES.map((stage, idx) => {
            const isFinished = idx < activeStepIndex;
            const isCurrent = idx === activeStepIndex;
            const isPending = idx > activeStepIndex;

            return (
              <div
                key={stage.id}
                className={`flex items-center justify-between p-2.5 px-4 rounded-xl text-xs transition-all duration-300 ${
                  isCurrent
                    ? 'bg-emerald-950/70 border border-emerald-500/30 text-emerald-200 shadow-sm'
                    : isFinished
                    ? 'bg-zinc-900/40 text-emerald-400/80'
                    : 'bg-zinc-900/20 text-zinc-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] ${
                      isFinished
                        ? 'bg-emerald-500 text-black font-bold'
                        : isCurrent
                        ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {isFinished ? '✓' : idx + 1}
                  </div>
                  <span className={`font-medium ${isCurrent ? 'text-white' : ''}`}>
                    {stage.label}
                  </span>
                </div>

                <div className="text-[11px]">
                  {isFinished && <span className="text-emerald-400 font-semibold">Done</span>}
                  {isCurrent && (
                    <span className="text-emerald-300 animate-pulse font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Analyzing
                    </span>
                  )}
                  {isPending && <span className="text-zinc-600">Pending</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
