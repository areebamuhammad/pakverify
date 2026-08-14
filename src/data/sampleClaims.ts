import { SampleClaim } from '../types';

export const SAMPLE_CLAIMS: SampleClaim[] = [
  {
    title: 'Demo 1: Independence Day Date',
    category: 'Official Gazette',
    text: "Pakistan's Independence Day is observed on 14 August.",
    expectedType: 'Expected: VERIFIED',
  },
  {
    title: 'Demo 2: 1947 Sovereign State',
    category: 'Historical Record',
    text: "Pakistan became an independent and sovereign state on 14 August 1947.",
    expectedType: 'Expected: VERIFIED',
  },
  {
    title: 'Demo 3: Rs. 100,000 Citizen Grant',
    category: 'Financial Claim',
    text: "The Government of Pakistan has announced that every citizen will receive Rs. 100,000 tomorrow.",
    expectedType: 'Expected: UNVERIFIED',
  },
  {
    title: 'State Bank Rs. 5000 Note Ban',
    category: 'Economy & Banking',
    text: '⚠️ State Bank of Pakistan (SBP) Breaking Update: The Government of Pakistan and SBP have officially notified the demonetization and cancellation of all Rs. 5,000 currency notes from next month. Exchange your cash urgently.',
    expectedType: 'Expected: UNVERIFIED',
  },
  {
    title: 'PTA Mobile Block Notice',
    category: 'Telecom & Tech',
    text: '🚨 URGENT PTA NOTICE: All unregistered and non-PTA approved mobile phones across Pakistan will be permanently blocked tonight at 12:00 AM without any grace period.',
    expectedType: 'Expected: UNVERIFIED',
  },
];
