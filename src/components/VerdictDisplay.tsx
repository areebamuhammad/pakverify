import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  HelpCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  Share2, 
  RotateCcw, 
  Calendar, 
  Building2, 
  MessageSquare, 
  Quote, 
  Sparkles, 
  CheckCircle2,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';
import { VerificationResult, VerdictType } from '../types';

interface VerdictDisplayProps {
  result: VerificationResult;
  onReset: () => void;
}

export const VerdictDisplay: React.FC<VerdictDisplayProps> = ({ result, onReset }) => {
  const [activeLangTab, setActiveLangTab] = useState<'urdu' | 'en'>('urdu');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);

  const getVerdictStyle = (verdict: VerdictType) => {
    switch (verdict) {
      case 'VERIFIED':
        return {
          title: 'VERIFIED',
          bg: 'bg-emerald-950/80',
          border: 'border-emerald-500/50',
          text: 'text-emerald-300',
          badgeBg: 'bg-emerald-500 text-black',
          subtext: 'Corroborated by verified Pakistani official records & authentic reporting',
          icon: ShieldCheck,
          accentRing: 'ring-emerald-500/30',
        };
      case 'FALSE':
        return {
          title: 'FALSE / FABRICATED',
          bg: 'bg-red-950/70',
          border: 'border-red-500/50',
          text: 'text-red-300',
          badgeBg: 'bg-red-500 text-white',
          subtext: 'Debunked by official regulatory bodies or factual public records',
          icon: ShieldAlert,
          accentRing: 'ring-red-500/30',
        };
      case 'MISLEADING':
        return {
          title: 'MISLEADING / OUT OF CONTEXT',
          bg: 'bg-amber-950/70',
          border: 'border-amber-500/50',
          text: 'text-amber-300',
          badgeBg: 'bg-amber-500 text-black',
          subtext: 'Distorted information, exaggeration, or old news recirculated as new',
          icon: AlertTriangle,
          accentRing: 'ring-amber-500/30',
        };
      case 'UNVERIFIED':
      default:
        return {
          title: 'UNVERIFIED / INCONCLUSIVE',
          bg: 'bg-zinc-900/90',
          border: 'border-zinc-600/50',
          text: 'text-zinc-300',
          badgeBg: 'bg-zinc-600 text-white',
          subtext: 'Insufficient official corroboration or credible public reporting',
          icon: HelpCircle,
          accentRing: 'ring-zinc-500/30',
        };
    }
  };

  const style = getVerdictStyle(result.verdict);
  const VerdictIcon = style.icon;

  const handleCopyExplanation = () => {
    const textToCopy = activeLangTab === 'urdu' 
      ? result.simpleExplanationUrdu 
      : result.simpleExplanationEn;
    navigator.clipboard.writeText(textToCopy);
    setCopiedType('explanation');
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleCopyWhatsAppReply = () => {
    const emoji = result.verdict === 'VERIFIED' ? '✅' : result.verdict === 'FALSE' ? '❌' : result.verdict === 'MISLEADING' ? '⚠️' : '❓';
    const cleanUrdu = result.simpleExplanationUrdu.replace(/\n+/g, ' ');
    const sourceLink = result.sources.length > 0 ? `\n🔗 *Source:* ${result.sources[0].uri}` : '';
    const rec = result.forwardRecommendation || (result.verdict === 'VERIFIED' ? 'SAFE TO SHARE' : result.verdict === 'UNVERIFIED' ? 'CHECK BEFORE SHARING' : 'DO NOT FORWARD');
    
    const waText = `*🔍 PAKVERIFY Fact-Check Report*\n\n` +
      `*Claim:* "${result.extractedClaim}"\n\n` +
      `*Verdict:* ${emoji} *${result.verdict}* (${result.confidence}% Confidence)\n` +
      `*Should I Forward This:* *${rec}*\n\n` +
      `*Wazahat (Roman Urdu):*\n${cleanUrdu}\n` +
      `${sourceLink}\n\n` +
      `_Ruk. Check. Phir Share._ 🇵🇰\n` +
      `_AI-assisted verification. Always review evidence before sharing._`;

    navigator.clipboard.writeText(waText);
    setCopiedType('whatsapp');
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 space-y-6">
      
      {/* Top navigation actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-emerald-950/60 border border-zinc-800 hover:border-emerald-700/50 text-xs font-semibold text-zinc-300 hover:text-emerald-300 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Verify Another Claim</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Checked just now</span>
        </div>
      </div>

      {/* Recycled news / temporal warning if applicable */}
      {result.temporalWarning && (
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3 text-amber-200">
          <Calendar className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold uppercase tracking-wider block mb-0.5">
              ⚠️ Recycled News / Temporal Alert
            </span>
            <p className="text-amber-300/90 leading-relaxed">
              {result.temporalWarning}
            </p>
          </div>
        </div>
      )}

      {/* Main Verdict Card - High Prominence */}
      <div className={`relative rounded-2xl p-6 sm:p-8 border ${style.border} ${style.bg} backdrop-blur-xl shadow-2xl overflow-hidden`}>
        {/* Glow effect in corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          {/* Header row with Verdict badge and confidence */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${style.badgeBg} shadow-lg shrink-0`}>
                <VerdictIcon className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                  PAKVERIFY VERDICT
                </span>
                <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${style.text}`}>
                  {style.title}
                </h2>
                <p className="text-xs text-zinc-300 mt-0.5">
                  {style.subtext}
                </p>
              </div>
            </div>

            {/* Confidence & Forward Recommendation metric */}
            <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 shrink-0">
              <div className="bg-black/40 px-4 py-2.5 rounded-xl border border-white/10 w-full sm:w-auto sm:text-right">
                <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  Confidence Score
                </div>
                <div className="text-2xl sm:text-3xl font-mono font-black text-white flex items-center sm:justify-end gap-1.5">
                  <span>{result.confidence}%</span>
                  <span className="text-xs font-normal text-emerald-400 font-sans">
                    {result.confidence >= 85 ? 'High' : result.confidence >= 70 ? 'Moderate' : 'Tentative'}
                  </span>
                </div>
              </div>

              {/* Should I Forward This? Badge */}
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2 px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  Forward Advice:
                </span>
                <span className={`px-2 py-0.5 rounded font-bold text-[11px] border ${
                  result.forwardRecommendation === 'SAFE TO SHARE'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                    : result.forwardRecommendation === 'DO NOT FORWARD'
                    ? 'bg-red-500/20 text-red-300 border-red-500/50'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                }`}>
                  {result.forwardRecommendation || (result.verdict === 'VERIFIED' ? 'SAFE TO SHARE' : result.verdict === 'UNVERIFIED' ? 'CHECK BEFORE SHARING' : 'DO NOT FORWARD')}
                </span>
              </div>
            </div>
          </div>

          {/* Extracted Core Claim vs Original message */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5" />
                <span>Extracted Core Claim</span>
              </span>
              <button
                onClick={() => setShowOriginal(!showOriginal)}
                className="text-zinc-400 hover:text-zinc-200 underline text-[11px]"
              >
                {showOriginal ? 'Hide original message' : 'View full original message'}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-white/5 text-zinc-200 text-base sm:text-lg font-medium leading-relaxed">
              "{result.extractedClaim}"
            </div>

            {showOriginal && (
              <div className="p-3 rounded-lg bg-zinc-950/90 border border-zinc-800 text-xs text-zinc-400 leading-relaxed font-mono mt-2">
                <span className="text-zinc-500 block mb-1 font-sans font-semibold">Original Forwarded Text:</span>
                {result.originalMessage}
              </div>
            )}
          </div>

          {/* Official Institution Involved if present */}
          {result.officialEntityInvolved && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-700/40 text-xs text-emerald-300">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Entity Involved: <strong className="text-white">{result.officialEntityInvolved}</strong></span>
            </div>
          )}

          {/* Verdict Summary */}
          <div className="space-y-1 text-sm sm:text-base text-zinc-300 leading-relaxed">
            <p className="font-normal">
              {result.summaryExplanation}
            </p>
          </div>
        </div>
      </div>

      {/* Curated Evidence & Sources Cards Section - Positioned immediately below Verdict */}
      <div id="curated-evidence-section" className="p-6 sm:p-8 rounded-2xl glass-panel-elevated shadow-xl border border-emerald-900/30 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-emerald-950/60">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white tracking-tight uppercase">
                CURATED EVIDENCE
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              <span className="text-emerald-400 font-semibold">Evidence Mode: Curated Trusted Sources</span> • This demo uses a curated set of verified public sources. Live web search is not enabled in this version.
            </p>
          </div>

          <div className="text-xs text-emerald-400/90 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-900/40 self-start sm:self-auto shrink-0 font-medium">
            {result.sources.length} Verified Sources Found
          </div>
        </div>

        {result.sources.length === 0 ? (
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center space-y-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 mb-1 border border-amber-500/20">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              NO SUPPORTING EVIDENCE FOUND
            </h4>
            <p className="text-xs text-zinc-300 max-w-lg mx-auto leading-relaxed">
              No supporting evidence was found in the curated official-source library.
            </p>
            <p className="text-[11px] text-zinc-500 max-w-md mx-auto">
              This claim is not documented in the verified public records currently available in this curated library.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {result.sources.map((source, index) => (
              <div
                key={source.id || index}
                className="p-4 rounded-xl bg-zinc-900/70 hover:bg-emerald-950/30 border border-zinc-800 hover:border-emerald-700/50 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide truncate">
                      {source.publisher}
                    </span>
                    {source.date && (
                      <span className="text-[10px] text-zinc-400 font-mono bg-black/40 px-2 py-0.5 rounded border border-zinc-800 shrink-0">
                        {source.date}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors line-clamp-2 mb-2 leading-snug">
                    {source.title}
                  </h4>

                  {source.snippet && (
                    <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-3">
                      {source.snippet}
                    </p>
                  )}
                </div>

                <div className="pt-2.5 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                    Verified Source
                  </span>
                  <a
                    href={source.uri}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline"
                  >
                    <span>View Source</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grid: Why This Verdict & Simple Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Why this verdict? section */}
        <div className="p-6 rounded-2xl glass-panel-elevated shadow-xl border border-emerald-900/30 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-emerald-950/60">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Why this verdict?
            </h3>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
            {result.whyThisVerdict.map((point, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Simple Explanation section with Roman Urdu & English tabs */}
        <div className="p-6 rounded-2xl glass-panel-elevated shadow-xl border border-emerald-900/30 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-emerald-950/60">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Simple Explanation
                </h3>
              </div>

              {/* Language switcher tabs */}
              <div className="flex items-center p-0.5 rounded-lg bg-black/40 border border-zinc-800 text-[11px] font-semibold">
                <button
                  onClick={() => setActiveLangTab('urdu')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeLangTab === 'urdu'
                      ? 'bg-emerald-500 text-black font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Roman Urdu
                </button>
                <button
                  onClick={() => setActiveLangTab('en')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeLangTab === 'en'
                      ? 'bg-emerald-500 text-black font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Explanation box */}
            <div className="mt-4 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 text-sm text-zinc-200 leading-relaxed font-sans min-h-[100px]">
              {activeLangTab === 'urdu' ? (
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-1">
                    🇵🇰 Aasan Roman Urdu me wazahat:
                  </span>
                  <p>{result.simpleExplanationUrdu}</p>
                </div>
              ) : (
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-1">
                    Plain English Summary:
                  </span>
                  <p>{result.simpleExplanationEn}</p>
                </div>
              )}
            </div>
          </div>

          {/* Copy Actions Bar */}
          <div className="pt-4 border-t border-emerald-950/60 flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyExplanation}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-200 border border-zinc-700/60 transition-colors"
            >
              {copiedType === 'explanation' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Explanation Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Copy Explanation</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyWhatsAppReply}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/90 text-xs font-semibold text-emerald-300 border border-emerald-600/40 transition-colors"
              title="Copy formatted message ready to send on WhatsApp"
            >
              {copiedType === 'whatsapp' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">WhatsApp Reply Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copy for WhatsApp</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Independence Day inspired message requirement */}
      <div className="text-center py-4 border-t border-emerald-950/60 space-y-1">
        <p className="text-xs font-medium text-emerald-300/80">
          "Digital independence starts with verified information."
        </p>
        <p className="text-[11px] text-zinc-500">
          PAKVERIFY • Protecting Pakistani communities from disinformation • 🇵🇰
        </p>
      </div>

      {/* Bottom CTA to verify another */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 text-xs font-bold text-white transition-all duration-200 flex items-center gap-2 hover:border-emerald-500/50"
        >
          <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
          <span>Verify Another Viral Message</span>
        </button>
      </div>
    </div>
  );
};
