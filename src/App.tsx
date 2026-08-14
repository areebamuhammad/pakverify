/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { ClaimInput } from './components/ClaimInput';
import { VerificationLoader } from './components/VerificationLoader';
import { VerdictDisplay } from './components/VerdictDisplay';
import { TrustGuidelinesModal } from './components/TrustGuidelinesModal';
import { RecentVerificationsBar } from './components/RecentVerificationsBar';
import { VerificationResult, VerificationStage } from './types';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStage, setCurrentStage] = useState<VerificationStage>('extracting');
  const [currentResult, setCurrentResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isTrustModalOpen, setIsTrustModalOpen] = useState(false);
  const [history, setHistory] = useState<VerificationResult[]>([]);

  const handleVerify = async () => {
    if (!inputMessage.trim() || isLoading) return;

    setError(null);
    setIsLoading(true);
    setCurrentStage('extracting');

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage.trim() }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status ${response.status}`);
      }

      const data: VerificationResult = await response.json();
      setCurrentResult(data);
      setHistory((prev) => [data, ...prev.filter((item) => item.id !== data.id)].slice(0, 10));
      setCurrentStage('complete');
    } catch (err: any) {
      console.error('Verification error:', err);
      setError(err?.message || 'Unable to complete verification. Please try again.');
      setCurrentStage('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentResult(null);
    setError(null);
    setInputMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRecentResult = (selected: VerificationResult) => {
    setCurrentResult(selected);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070b09] text-zinc-100 flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] bg-teal-800/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Header navigation */}
        <Header 
          onOpenTrustModal={() => setIsTrustModalOpen(true)}
          onReset={handleReset}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <VerificationLoader currentStage={currentStage} />
              </motion.div>
            ) : currentResult ? (
              <motion.div
                key="verdict"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <VerdictDisplay 
                  result={currentResult} 
                  onReset={handleReset} 
                />
              </motion.div>
            ) : (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {error && (
                  <div className="max-w-4xl mx-auto px-4 mt-6">
                    <div className="p-4 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-sm flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                        <span>{error}</span>
                      </div>
                      <button
                        onClick={handleVerify}
                        className="px-3 py-1.5 bg-red-900/60 hover:bg-red-800 text-xs font-semibold rounded-lg text-white flex items-center gap-1 shrink-0 transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Retry</span>
                      </button>
                    </div>
                  </div>
                )}

                <ClaimInput
                  inputMessage={inputMessage}
                  setInputMessage={setInputMessage}
                  onVerify={handleVerify}
                  isLoading={isLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recent Verifications Bar when results exist */}
          {!isLoading && history.length > 0 && (
            <RecentVerificationsBar
              history={history}
              onSelectResult={handleSelectRecentResult}
              currentResultId={currentResult?.id}
            />
          )}
        </main>

        {/* Minimalist Footer */}
        <footer className="w-full border-t border-emerald-950/60 py-6 mt-12 text-center text-xs text-zinc-500">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono">
              <span className="font-bold text-zinc-400">PAK<span className="text-emerald-400">VERIFY</span></span>
              <span>•</span>
              <span className="text-zinc-400">Ruk. Check. Phir Share.</span>
            </div>

            <p className="text-[11px] text-zinc-500">
              Grounded on real-time web sources • Built for Pakistani digital communities
            </p>

            <button
              onClick={() => setIsTrustModalOpen(true)}
              className="text-zinc-400 hover:text-emerald-300 underline text-[11px]"
            >
              Trust & Ethical Standards
            </button>
          </div>
        </footer>
      </div>

      {/* Trust Guidelines Modal */}
      <TrustGuidelinesModal
        isOpen={isTrustModalOpen}
        onClose={() => setIsTrustModalOpen(false)}
      />
    </div>
  );
}
