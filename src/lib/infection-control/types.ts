// ─── Infection-Control Game Engine: Type Definitions ───────────────────────

export type PrecautionLevel = 'standard' | 'contact' | 'droplet' | 'airborne';

export type MicrobeCategory = 'bacteria' | 'virus' | 'fungi' | 'parasite';

export type CaseSetting = 'med-surg' | 'icu' | 'ltc' | 'peds' | 'ed';

export type CaseDifficulty = 'basic' | 'intermediate' | 'advanced';

// ─── Chain of Infection ─────────────────────────────────────────────────────

export interface ChainOfInfection {
  infectiousAgent: string;
  reservoir: string;
  portalOfExit: string;
  modeOfTransmission: string;
  portalOfEntry: string;
  susceptibleHost: string;
}

// ─── Escalation Rule ────────────────────────────────────────────────────────

export interface EscalationRule {
  trigger: string; // e.g., "Aerosol-generating procedure (AGP)"
  upgradeFrom: PrecautionLevel;
  upgradeTo: PrecautionLevel;
  reason: string;
}

// ─── Microbe / Infectious Agent ─────────────────────────────────────────────

export interface MicrobeBackground {
  virulence: string;
  colonization: string;
  biofilm: string;
  typicalSyndromes: string[];
  reservoir: string;
  portalsOfExit: string[];
  modesOfTransmission: string[];
  portalsOfEntry: string[];
  infectiousDose?: string;
  contagiousness?: string;
  environmentalPersistence: string;
  incubationPeriod: string;
  highRiskHosts: string[];
  commonNursingPitfalls: string[];
  escalationTriggers: string[];
}

export interface Microbe {
  id: string;
  name: string;
  commonName?: string;
  category: MicrobeCategory;
  primaryPrecaution: PrecautionLevel;
  additionalPrecautions: PrecautionLevel[];
  escalationRules: EscalationRule[];
  background: MicrobeBackground;
  chainOfInfection: ChainOfInfection;
  keyChainBreakers: string[]; // top actions that break the chain for this agent
}

// ─── Mode A: Choose Precautions + Key Actions ───────────────────────────────

export interface PrecautionOption {
  level: PrecautionLevel;
  label: string;
  description: string;
  points: number; // positive if correct/partial, 0 or negative if wrong
  feedback: string;
}

export interface KeyAction {
  id: string;
  text: string;
  correct: boolean;
  chainLink: keyof ChainOfInfection; // which chain link this action breaks
  points: number;
  feedback: string;
}

export interface EscalationScenario {
  trigger: string; // narrative description of new info
  correctUpgrade: PrecautionLevel;
  points: number;
  feedback: string;
}

export interface ChainLinkQuestion {
  id: string;
  prompt: string;
  chainLink: keyof ChainOfInfection;
  options: Array<{ text: string; correct: boolean; points: number; feedback: string }>;
}

export interface ModeAContent {
  precautionQuestion: string;
  precautionOptions: PrecautionOption[];
  keyActionsInstruction: string;
  keyActions: KeyAction[];
  escalationScenario?: EscalationScenario;
  chainLinkQuestions: ChainLinkQuestion[];
  maxScore: number;
}

// ─── Mode B: Step-by-step Room Workflow ─────────────────────────────────────

export type WorkflowPhase =
  | 'before_entry'
  | 'donning'
  | 'entering'
  | 'care'
  | 'before_exit'
  | 'doffing'
  | 'exiting'
  | 'cleaning';

export interface WorkflowStepOption {
  id: string;
  text: string;
  correct: boolean;
  points: number;
  feedback: string;
  contaminationEvent?: string; // if selecting this causes a contamination event
}

export interface WorkflowStep {
  id: string;
  phase: WorkflowPhase;
  title: string;
  narrative: string; // situation description at this step
  prompt: string; // what must the nurse do?
  options: WorkflowStepOption[];
  hint?: string;
}

export interface ModeBContent {
  phases: Array<{
    phase: WorkflowPhase;
    label: string;
    description: string;
  }>;
  steps: WorkflowStep[];
  maxScore: number;
}

// ─── Debrief / Results ──────────────────────────────────────────────────────

export interface Debrief {
  correctPrecaution: PrecautionLevel;
  rationale: string;
  chainOfInfectionSummary: string;
  keyLessons: string[];
  commonErrors: string[];
  nclexPearl?: string; // NCLEX-style clinical pearl
}

// ─── Case ───────────────────────────────────────────────────────────────────

export interface Case {
  id: string;
  microbeId: string;
  title: string;
  vignette: string; // opening patient scenario
  setting: CaseSetting;
  difficulty: CaseDifficulty;
  tags: string[];
  modeA: ModeAContent;
  modeB: ModeBContent;
  debrief: Debrief;
}

// ─── Scoring ─────────────────────────────────────────────────────────────────

export interface ModeAResult {
  caseId: string;
  precautionChoice: PrecautionLevel;
  precautionPoints: number;
  keyActionIds: string[];
  keyActionPoints: number;
  escalationChoice?: PrecautionLevel;
  escalationPoints: number;
  chainLinkAnswers: Record<string, string>; // questionId -> optionText
  chainLinkPoints: number;
  totalPoints: number;
  maxPoints: number;
  percentage: number;
  completedAt: string; // ISO timestamp
}

export interface ModeBResult {
  caseId: string;
  stepResults: Array<{
    stepId: string;
    chosenOptionId: string;
    points: number;
    contaminationEvent?: string;
  }>;
  totalPoints: number;
  maxPoints: number;
  percentage: number;
  contaminations: string[];
  completedAt: string;
}

export interface CaseProgress {
  caseId: string;
  modeAResult?: ModeAResult;
  modeBResult?: ModeBResult;
  modeACompleted: boolean;
  modeBCompleted: boolean;
}

export interface PlayerProgress {
  version: number;
  caseProgress: Record<string, CaseProgress>;
  totalModeAPoints: number;
  totalModeBPoints: number;
  badges: string[];
  lastPlayed: string;
}

// ─── Job Aids ────────────────────────────────────────────────────────────────

export interface PrecautionGuide {
  level: PrecautionLevel;
  label: string;
  ppe: string[];
  roomRequirements: string[];
  equipment: string[];
  when: string[];
}

export interface ChainLink {
  name: string;
  description: string;
  nursingInterventions: string[];
}
