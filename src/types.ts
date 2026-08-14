export type VerdictType = 'VERIFIED' | 'FALSE' | 'MISLEADING' | 'UNVERIFIED';

export type ForwardRecommendation = 'SAFE TO SHARE' | 'CHECK BEFORE SHARING' | 'DO NOT FORWARD';

export interface SourceItem {
  id: string;
  title: string;
  publisher: string;
  uri: string;
  date?: string;
  snippet?: string;
  isOfficial?: boolean;
  isOldWarning?: boolean;
}

export interface CuratedEvidenceItem {
  id: string;
  title: string;
  publisher: string;
  uri: string;
  date?: string;
  evidence: string;
  isOfficial: boolean;
}

export interface VerificationResult {
  id: string;
  originalMessage: string;
  extractedClaim: string;
  verdict: VerdictType;
  confidence: number;
  forwardRecommendation: ForwardRecommendation;
  summaryExplanation: string;
  whyThisVerdict: string[];
  simpleExplanationEn: string;
  simpleExplanationUrdu: string;
  sources: SourceItem[];
  temporalWarning?: string | null;
  officialEntityInvolved?: string | null;
  timestamp: string;
  groundingSearchQueries?: string[];
}

export type VerificationStage = 
  | 'extracting' 
  | 'searching' 
  | 'checking' 
  | 'comparing' 
  | 'verdict'
  | 'complete'
  | 'error';

export interface SampleClaim {
  title: string;
  category: string;
  text: string;
  expectedType?: string;
}
