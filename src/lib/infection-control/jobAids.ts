// ─── Infection-Control Job Aids Reference Data ──────────────────────────────

import type { PrecautionGuide, ChainLink } from './types';

export const PRECAUTION_GUIDES: PrecautionGuide[] = [
  {
    level: 'standard',
    label: 'Standard Precautions',
    ppe: [
      'Gloves (when touching blood/body fluids)',
      'Gown (if splash risk)',
      'Mask/eye protection (if splash risk)',
    ],
    roomRequirements: ['Any room type', 'Standard hand hygiene'],
    equipment: [
      'Soap and water or ABHR',
      'Gloves',
      'Gown (if needed)',
      'Mask/face shield (if splash risk)',
    ],
    when: [
      'All patient care — every patient, every time',
      'Contact with blood, body fluids, non-intact skin, mucous membranes',
      'Handling contaminated equipment or surfaces',
    ],
  },
  {
    level: 'contact',
    label: 'Contact Precautions',
    ppe: ['Gloves — don before entering room', 'Gown — don before entering room'],
    roomRequirements: [
      'Private room preferred',
      'Cohort if private room unavailable',
      'Keep door closed',
      'Dedicate patient equipment',
    ],
    equipment: ['Gloves', 'Gown', 'Dedicated stethoscope / BP cuff / thermometer'],
    when: [
      'MRSA, VRE, C. difficile',
      'Multi-drug resistant organisms (MDROs)',
      'Wound infections with copious drainage',
      'Scabies, RSV (pediatric)',
    ],
  },
  {
    level: 'droplet',
    label: 'Droplet Precautions',
    ppe: ['Surgical mask — don before entering room', 'Gloves and gown per standard precautions'],
    roomRequirements: [
      'Private room preferred',
      'Door may remain open',
      'Keep patient masked during transport',
      'Maintain ≥3-ft spatial separation',
    ],
    equipment: ['Surgical/procedure mask', 'Eye protection if splash risk'],
    when: [
      'Influenza, pertussis, mumps, rubella',
      'Meningococcal disease',
      'Group A Streptococcus (first 24 h of antibiotics)',
      'COVID-19 (routine care)',
    ],
  },
  {
    level: 'airborne',
    label: 'Airborne Precautions',
    ppe: [
      'NIOSH-approved N95 respirator (fit-tested) — don before entering room',
      'Gloves and gown per standard precautions',
      'Eye protection',
    ],
    roomRequirements: [
      'Airborne infection isolation room (AIIR) required',
      '≥12 air changes per hour',
      'Negative-pressure room',
      'Door kept closed at all times',
      'Patient masked during transport',
    ],
    equipment: ['Fit-tested N95 or PAPR', 'AIIR with anteroom preferred'],
    when: [
      'Tuberculosis (TB)',
      'Measles (rubeola)',
      'Chickenpox / disseminated zoster',
      'COVID-19 during AGPs',
    ],
  },
];

export const CHAIN_LINKS: Record<keyof import('./types').ChainOfInfection, ChainLink> = {
  infectiousAgent: {
    name: 'Infectious Agent',
    description: 'The pathogen capable of causing disease (bacteria, virus, fungus, parasite).',
    nursingInterventions: [
      'Identify the causative organism via lab cultures',
      'Administer prescribed antimicrobials',
      'Monitor susceptibility/resistance patterns',
    ],
  },
  reservoir: {
    name: 'Reservoir',
    description:
      'The habitat where the pathogen lives, grows, and multiplies (human, animal, environment).',
    nursingInterventions: [
      'Identify and treat infected/colonized individuals',
      'Clean and disinfect environmental surfaces',
      'Control animal/insect vectors when applicable',
    ],
  },
  portalOfExit: {
    name: 'Portal of Exit',
    description:
      'The route by which the pathogen leaves the reservoir (respiratory tract, GI tract, wounds, etc.).',
    nursingInterventions: [
      'Cover coughs and sneezes (respiratory hygiene)',
      'Handle wound drainage with gloves and gown',
      'Contain secretions and excretions properly',
    ],
  },
  modeOfTransmission: {
    name: 'Mode of Transmission',
    description: 'The mechanism of transfer from reservoir to susceptible host.',
    nursingInterventions: [
      'Apply the correct transmission-based precautions',
      'Perform hand hygiene before and after every patient contact',
      'Use PPE appropriate to the route of transmission',
    ],
  },
  portalOfEntry: {
    name: 'Portal of Entry',
    description:
      'The route by which the pathogen enters the new host (respiratory, mucous membranes, broken skin, etc.).',
    nursingInterventions: [
      'Maintain intact skin and mucous membrane barriers',
      'Use aseptic technique for invasive procedures',
      'Provide proper wound care',
    ],
  },
  susceptibleHost: {
    name: 'Susceptible Host',
    description: 'A person at risk for infection due to lack of immunity or compromised defenses.',
    nursingInterventions: [
      'Administer recommended vaccines',
      'Optimize nutrition and hydration',
      'Monitor and support immune function',
      'Implement protective (reverse) isolation for severely immunocompromised patients',
    ],
  },
};
