import React from 'react';
import { X, ShieldAlert, CheckCircle2, Search, Calendar, Link2, AlertTriangle, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TrustGuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrustGuidelinesModal: React.FC<TrustGuidelinesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-2xl bg-[#0e1612] border border-emerald-800/40 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700/40 text-emerald-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                PAKVERIFY Trust & Verification Framework
              </h2>
              <p className="text-xs text-zinc-400">
                Ethical standards for countering viral misinformation in Pakistan
              </p>
            </div>
          </div>

          {/* Principles list */}
          <div className="space-y-4 text-sm text-zinc-300">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-emerald-950/60 flex items-start gap-3">
              <Search className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white mb-1">1. Trusted Primary Evidence — No Hallucinations</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Claims are verified strictly against authoritative public archives and official Pakistani government portals. PAKVERIFY is strictly prohibited from inventing sources, generating artificial URLs, or quoting non-existent statements.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-emerald-950/60 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white mb-1">2. Pakistani Institutional Priority</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Claims regarding taxes, banks, laws, holidays, and security are cross-referenced with primary Pakistani regulatory bodies (e.g. PTA, State Bank of Pakistan, NADRA, Federal Ministries, Supreme Court) and established fact-checking bureaus (Dawn, Geo, Tribune, Soch FactCheck, BBC Urdu).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-emerald-950/60 flex items-start gap-3">
              <Calendar className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white mb-1">3. Recycled Rumor & Temporal Detection</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Many viral WhatsApp forwards in Pakistan are authentic notifications from 2–5 years ago that are recirculated out of context. The verification engine analyzes publication timestamps and explicitly warns when old news is presented as current.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-emerald-950/60 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white mb-1">4. Never 100% Certainty — "Unverified" Over Guesswork</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  If credible, corroborated evidence is insufficient or unavailable, the system safely returns <span className="text-zinc-200 font-semibold">UNVERIFIED</span> rather than speculating. Confidence is realistically capped and calibrated.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-emerald-200 mb-1">5. AI-Assisted Verification Notice</h3>
                <p className="text-xs text-emerald-400/90 leading-relaxed">
                  PAKVERIFY is an AI-assisted analytical tool designed to empower users with verifiable citations and primary sources. Always inspect the provided evidence links before making decisions or forwarding.
                </p>
              </div>
            </div>
          </div>

          {/* Independence quote */}
          <div className="mt-6 pt-4 border-t border-emerald-950/80 flex items-center justify-between text-xs text-zinc-400">
            <span className="italic text-emerald-300/80">"Digital independence starts with verified information."</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors"
            >
              Understood
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
