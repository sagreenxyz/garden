// ─── Infection-Control Microbe Data ─────────────────────────────────────────

import type { Microbe } from './types';

export const MICROBES: Microbe[] = [
  // ── 1. MRSA ──────────────────────────────────────────────────────────────
  {
    id: 'mrsa',
    name: 'Methicillin-resistant Staphylococcus aureus',
    commonName: 'MRSA',
    category: 'bacteria',
    primaryPrecaution: 'contact',
    additionalPrecautions: [],
    escalationRules: [],
    chainOfInfection: {
      infectiousAgent:
        'Methicillin-resistant Staphylococcus aureus (MRSA) — Gram-positive cocci resistant to beta-lactam antibiotics',
      reservoir:
        'Human skin, nares, and wounds of colonized/infected individuals; contaminated environment and equipment',
      portalOfExit: 'Wound drainage, nasal secretions, skin-to-skin contact',
      modeOfTransmission:
        'Direct contact (hands of HCW) or indirect contact (contaminated surfaces/equipment)',
      portalOfEntry: 'Non-intact skin, wounds, mucous membranes, invasive devices',
      susceptibleHost:
        'Immunocompromised patients, surgical patients, those with indwelling devices, elderly',
    },
    keyChainBreakers: [
      'Hand hygiene with soap & water or ABHR before and after every patient contact',
      'Don gloves and gown before entering the room',
      'Dedicate patient-care equipment to MRSA patient',
      'Active surveillance cultures in high-risk units',
      'MRSA decolonization protocols (chlorhexidine bathing, mupirocin nasal ointment)',
    ],
    background: {
      virulence: 'Produces toxins; resists most beta-lactam antibiotics via mecA gene',
      colonization: 'Can colonize nares, axillae, groin without causing active infection',
      biofilm: 'Forms biofilm on prosthetics and catheters — difficult to eradicate',
      typicalSyndromes: [
        'Skin and soft-tissue infections (SSTIs)',
        'Bacteremia',
        'Pneumonia',
        'Surgical site infections',
      ],
      reservoir: 'Colonized humans, contaminated hospital environment',
      portalsOfExit: ['Wound drainage', 'Respiratory secretions (in pneumonia)', 'Skin shedding'],
      modesOfTransmission: [
        'Direct contact with infected/colonized person',
        'Indirect contact via contaminated hands or surfaces',
      ],
      portalsOfEntry: ['Open wounds', 'Intravenous catheter sites', 'Non-intact skin'],
      infectiousDose: 'Low — very few organisms needed due to adhesin factors',
      contagiousness: 'High in healthcare settings',
      environmentalPersistence: 'Survives on dry surfaces for weeks to months',
      incubationPeriod: '4–10 days for infections; colonization can be indefinite',
      highRiskHosts: [
        'Post-surgical patients',
        'ICU patients',
        'Dialysis patients',
        'IV drug users',
      ],
      commonNursingPitfalls: [
        'Forgetting to don gown AND gloves before entry',
        'Not dedicating equipment (using shared stethoscope)',
        'Inadequate hand hygiene after glove removal',
        'Allowing other patients to share a room without appropriate precautions',
      ],
      escalationTriggers: [],
    },
  },

  // ── 2. Mycobacterium tuberculosis ─────────────────────────────────────────
  {
    id: 'tb',
    name: 'Mycobacterium tuberculosis',
    commonName: 'TB',
    category: 'bacteria',
    primaryPrecaution: 'airborne',
    additionalPrecautions: [],
    escalationRules: [],
    chainOfInfection: {
      infectiousAgent:
        'Mycobacterium tuberculosis — acid-fast bacillus capable of surviving in macrophages',
      reservoir: 'Human respiratory tract of infected individuals (active pulmonary TB)',
      portalOfExit:
        'Respiratory tract — coughing, sneezing, speaking, singing generate infectious droplet nuclei',
      modeOfTransmission:
        'Airborne — droplet nuclei (<5 μm) remain suspended in air and travel >3 ft',
      portalOfEntry: 'Respiratory tract — alveoli of lungs',
      susceptibleHost:
        'Immunocompromised (HIV, diabetes, malnutrition), unvaccinated, close contacts',
    },
    keyChainBreakers: [
      'Place patient in AIIR (negative-pressure room, ≥12 ACH) immediately',
      'Don fit-tested N95 or PAPR before entering room',
      'Keep room door closed at all times',
      'Patient wears surgical mask during transport outside AIIR',
      'Respiratory hygiene / cough etiquette education',
      'Initiate anti-TB therapy to reduce infectiousness',
    ],
    background: {
      virulence:
        'Intracellular pathogen; survives phagocytosis; waxy cell wall resists disinfection',
      colonization: 'Latent TB infection (LTBI) — bacteria dormant, patient non-infectious',
      biofilm: 'Does not form classic biofilm but persists in granulomas',
      typicalSyndromes: [
        'Pulmonary TB (cough, hemoptysis, night sweats, weight loss)',
        'Miliary TB (disseminated)',
        'TB meningitis',
        'Pleural TB',
      ],
      reservoir: 'Human lung (active TB)',
      portalsOfExit: ['Cough', 'Sneeze', 'Speaking', 'Singing'],
      modesOfTransmission: ['Airborne via droplet nuclei'],
      portalsOfEntry: ['Respiratory tract (alveoli)'],
      infectiousDose: 'Very low — <10 bacilli may cause infection',
      contagiousness: 'Moderate; requires prolonged close contact in most cases',
      environmentalPersistence:
        'Droplet nuclei remain airborne for hours; UV light inactivates rapidly',
      incubationPeriod: '2–12 weeks to positive TST/IGRA; years to reactivation',
      highRiskHosts: [
        'HIV-positive individuals',
        'Diabetics',
        'TNF-alpha inhibitor users',
        'Homeless/incarcerated',
        'Healthcare workers with TB exposure',
      ],
      commonNursingPitfalls: [
        'Using a surgical mask instead of N95 for TB',
        'Leaving AIIR door open',
        'Not fit-testing N95 before use',
        'Forgetting to mask the patient during transport',
        'Assuming HIV-negative = low risk',
      ],
      escalationTriggers: [],
    },
  },

  // ── 3. Influenza A/B ──────────────────────────────────────────────────────
  {
    id: 'influenza',
    name: 'Influenza A/B',
    commonName: 'Flu',
    category: 'virus',
    primaryPrecaution: 'droplet',
    additionalPrecautions: [],
    escalationRules: [
      {
        trigger: 'Aerosol-generating procedure (bronchoscopy, intubation, CPAP/BiPAP)',
        upgradeFrom: 'droplet',
        upgradeTo: 'airborne',
        reason:
          'AGPs create small particles that travel >3 ft and remain airborne; N95 required to protect HCW',
      },
    ],
    chainOfInfection: {
      infectiousAgent:
        'Influenza A or B — single-stranded RNA virus with rapid antigenic drift and shift',
      reservoir: 'Infected humans; animal reservoirs (birds, swine) for novel strains',
      portalOfExit: 'Respiratory secretions via coughing, sneezing, talking',
      modeOfTransmission: 'Droplets (primary) and contact; airborne during AGPs',
      portalOfEntry: 'Respiratory mucosa (nose, throat, lungs); conjunctiva',
      susceptibleHost:
        'Unvaccinated individuals, elderly, immunocompromised, pregnant, young children',
    },
    keyChainBreakers: [
      'Annual influenza vaccination for patients and HCW',
      'Don surgical mask before entering patient room',
      'Droplet precautions for all routine care',
      'Upgrade to N95 for aerosol-generating procedures (intubation, bronchoscopy)',
      'Respiratory hygiene / cough etiquette',
      'Antiviral therapy within 48 h of symptom onset (oseltamivir)',
    ],
    background: {
      virulence:
        'Neuraminidase allows viral release; hemagglutinin enables cell entry; rapid mutation',
      colonization: 'No colonization — active infection only',
      biofilm: 'Does not form biofilm',
      typicalSyndromes: [
        'Seasonal influenza (fever, myalgia, cough)',
        'Pneumonia',
        'Secondary bacterial pneumonia',
        'Encephalitis (rare)',
      ],
      reservoir: 'Humans; zoonotic reservoir in birds and pigs',
      portalsOfExit: ['Cough', 'Sneeze', 'Respiratory secretions'],
      modesOfTransmission: [
        'Respiratory droplets (≥5 μm)',
        'Contact with contaminated hands/surfaces',
        'Airborne during AGPs',
      ],
      portalsOfEntry: ['Nasopharyngeal mucosa', 'Conjunctiva'],
      infectiousDose: 'Low — hundreds of viral particles',
      contagiousness: 'High — R0 ~1.2–1.4 for seasonal; higher for pandemic strains',
      environmentalPersistence: '24–48 h on hard surfaces; inactivated by standard disinfectants',
      incubationPeriod: '1–4 days',
      highRiskHosts: [
        '≥65 years',
        '<5 years',
        'Pregnant women',
        'Chronic cardiopulmonary disease',
        'Immunocompromised',
      ],
      commonNursingPitfalls: [
        'Using N95 routinely when only droplet precautions are needed (wastes resources)',
        'Forgetting to upgrade to N95 during AGPs',
        'Not offering vaccination to the patient',
        'Touching face after contact with contaminated surfaces',
      ],
      escalationTriggers: [
        'Bronchoscopy',
        'Endotracheal intubation',
        'CPAP or BiPAP',
        'High-flow nasal cannula at high flow rates',
      ],
    },
  },

  // ── 4. Clostridioides difficile ───────────────────────────────────────────
  {
    id: 'cdiff',
    name: 'Clostridioides difficile',
    commonName: 'C. diff',
    category: 'bacteria',
    primaryPrecaution: 'contact',
    additionalPrecautions: [],
    escalationRules: [],
    chainOfInfection: {
      infectiousAgent:
        'Clostridioides difficile — spore-forming, toxin-producing anaerobic bacterium',
      reservoir: 'GI tract of colonized/infected patients; spores on environmental surfaces',
      portalOfExit: 'Feces (spores shed in stool)',
      modeOfTransmission: 'Fecal-oral route via contact with spores on hands or environment',
      portalOfEntry: 'Oral ingestion of spores → GI tract',
      susceptibleHost:
        'Antibiotic-exposed patients, elderly, immunocompromised, hospitalized patients',
    },
    keyChainBreakers: [
      'SOAP AND WATER hand hygiene — ABHR does NOT kill C. diff spores',
      'Don gloves and gown before entering room',
      'Use dedicated equipment for C. diff patient',
      'Bleach-based environmental cleaning (≥1,000 ppm hypochlorite)',
      'Judicious antibiotic use (antimicrobial stewardship)',
      'Avoid unnecessary PPIs (risk factor for CDI)',
    ],
    background: {
      virulence:
        'Produces toxins A and B that cause pseudomembranous colitis; hypervirulent 027 strain produces binary toxin',
      colonization: 'Asymptomatic carriage common after antibiotic exposure',
      biofilm: 'Spores adhere to surfaces and resist standard cleaning agents',
      typicalSyndromes: [
        'Watery diarrhea (≥3 loose stools/day)',
        'Pseudomembranous colitis',
        'Toxic megacolon',
        'Fulminant colitis',
      ],
      reservoir: 'GI tract; environmental surfaces (spores)',
      portalsOfExit: ['Feces', 'Contaminated hands/equipment'],
      modesOfTransmission: ['Fecal-oral via contaminated hands or surfaces'],
      portalsOfEntry: ['Oral ingestion of spores'],
      infectiousDose: 'Very low due to spore stability',
      contagiousness: 'High in antibiotic-treated patients',
      environmentalPersistence:
        'Spores survive months on surfaces; resistant to alcohol and most disinfectants',
      incubationPeriod: '2–3 days after antibiotic exposure or exposure to spores',
      highRiskHosts: [
        'Recent antibiotic use',
        'Age >65',
        'Proton pump inhibitor use',
        'IBD',
        'Immunocompromised',
      ],
      commonNursingPitfalls: [
        'Using alcohol hand rub instead of soap and water for C. diff',
        'Using non-bleach-based disinfectant on surfaces',
        'Not wearing gown and gloves before room entry',
        'Sharing equipment between patients',
      ],
      escalationTriggers: [],
    },
  },

  // ── 5. SARS-CoV-2 (COVID-19) ──────────────────────────────────────────────
  {
    id: 'covid19',
    name: 'SARS-CoV-2',
    commonName: 'COVID-19',
    category: 'virus',
    primaryPrecaution: 'droplet',
    additionalPrecautions: [],
    escalationRules: [
      {
        trigger: 'Aerosol-generating procedure (intubation, bronchoscopy, open suctioning)',
        upgradeFrom: 'droplet',
        upgradeTo: 'airborne',
        reason:
          'AGPs generate fine aerosols that travel >3 ft; N95 or PAPR required per CDC/WHO guidance',
      },
    ],
    chainOfInfection: {
      infectiousAgent: 'SARS-CoV-2 — single-stranded RNA betacoronavirus; binds ACE2 receptor',
      reservoir: 'Infected humans (symptomatic and pre-symptomatic/asymptomatic)',
      portalOfExit:
        'Respiratory tract — exhaled breath, cough, sneeze; highest viral load 2 days before symptoms',
      modeOfTransmission:
        'Respiratory droplets and aerosols; contact with contaminated surfaces (less common)',
      portalOfEntry: 'Respiratory mucosa (nose, throat), conjunctiva',
      susceptibleHost:
        'Unvaccinated, elderly, immunocompromised, chronic disease (DM, obesity, CV disease)',
    },
    keyChainBreakers: [
      'Vaccination (primary + boosters)',
      'Surgical mask for routine care; N95 for AGPs',
      'Maintain ≥6-ft distancing when possible',
      'Cohorting COVID-positive patients',
      'Adequate room ventilation / HEPA filtration',
      'Antiviral therapy (nirmatrelvir-ritonavir) for high-risk patients',
    ],
    background: {
      virulence:
        'Spike protein binds ACE2; dysregulated immune response causes cytokine storm in severe disease',
      colonization: 'Pre-symptomatic carriage common; infectious before symptoms',
      biofilm: 'Does not form biofilm',
      typicalSyndromes: [
        'COVID-19 (fever, cough, dyspnea, loss of smell/taste)',
        'ARDS',
        'Multiorgan failure',
        'Long COVID',
      ],
      reservoir: 'Infected humans (symptomatic and asymptomatic)',
      portalsOfExit: ['Exhaled breath', 'Cough', 'Sneezing', 'Speaking', 'Singing'],
      modesOfTransmission: [
        'Respiratory droplets',
        'Aerosols (especially in poorly ventilated spaces)',
        'Fomite contact (less significant)',
      ],
      portalsOfEntry: ['Nasopharyngeal mucosa', 'Conjunctiva'],
      infectiousDose: 'Low — estimated 100–1,000 viral copies',
      contagiousness: 'High — R0 ~2–3 for original strain; higher for Omicron variants',
      environmentalPersistence: 'Hours on surfaces; inactivated by standard hospital disinfectants',
      incubationPeriod: '2–14 days (median ~5 days)',
      highRiskHosts: [
        'Age ≥65',
        'Obesity (BMI ≥30)',
        'Diabetes mellitus',
        'Chronic kidney/lung/heart disease',
        'Immunocompromised',
        'Unvaccinated',
      ],
      commonNursingPitfalls: [
        'Forgetting to upgrade from surgical mask to N95 during AGPs',
        'Doffing PPE incorrectly (self-contamination)',
        'Not donning eye protection',
        'Inadequate room ventilation assessment',
        'Assuming vaccinated patients cannot transmit',
      ],
      escalationTriggers: [
        'Endotracheal intubation',
        'Bronchoscopy',
        'Open airway suctioning',
        'CPR',
        'Nebulizer treatments',
      ],
    },
  },
];

export function getMicrobeById(id: string): Microbe | undefined {
  return MICROBES.find((m) => m.id === id);
}
