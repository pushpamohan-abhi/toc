export type AutomatonType = 'DFA' | 'NFA' | 'ENFA';

export interface AutomatonState {
  id: string;
  label: string;
  x: number;
  y: number;
  isStart?: boolean;
  isFinal?: boolean;
}

export interface Transition {
  id: string;
  from: string;
  to: string;
  symbol: string; // '0', '1', 'a', 'b', or 'ε' / 'eps' / 'epsilon'
}

export interface AutomatonData {
  id: string;
  name: string;
  description: string;
  type: AutomatonType;
  alphabet: string[]; // e.g. ['0', '1'] or ['a', 'b']
  states: AutomatonState[];
  transitions: Transition[];
  testStrings?: string[];
}

export interface SimulationStep {
  stepIndex: number;
  inputChar: string | null; // null for initial state or epsilon transition
  processedInput: string;
  remainingInput: string;
  currentStates: string[]; // Set of active state IDs
  activeTransitionIds: string[];
  status: 'running' | 'accepted' | 'rejected';
  log: string;
}

export interface SubsetRow {
  dfaStateId: string;
  dfaStateLabel: string;
  nfaStates: string[]; // e.g. ['q0', 'q1']
  isStart: boolean;
  isFinal: boolean;
  transitions: Record<string, { targetDfaStateLabel: string; targetNfaStates: string[] }>;
}

export interface SlideContent {
  id: string;
  number: number;
  title: string;
  category: string;
  textbookSection: string;
  bullets: string[];
  keyTerms?: { term: string; definition: string }[];
  formulas?: string[];
  exampleBox?: {
    title: string;
    description: string;
    codeOrDetails?: string;
  };
  presetAutomatonId?: string;
  interactiveType?: 'switch' | 'then' | 'divisible3' | 'subset' | 'epsilon' | 'quiz_mini';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  topic: string;
}
