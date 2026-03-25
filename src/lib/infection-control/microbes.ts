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

  // ── 6. VRE (Vancomycin-resistant Enterococcus) ───────────────────────────
  {
    id: 'vre',
    name: 'Vancomycin-resistant Enterococcus',
    commonName: 'VRE',
    category: 'bacteria',
    primaryPrecaution: 'contact',
    additionalPrecautions: [],
    escalationRules: [],
    chainOfInfection: {
      infectiousAgent:
        'Enterococcus faecalis or faecium — Gram-positive cocci resistant to vancomycin via vanA/vanB genes',
      reservoir: 'GI tract of colonized/infected patients; contaminated environment and surfaces',
      portalOfExit: 'Feces, wound drainage, urine (UTI)',
      modeOfTransmission:
        'Direct contact (hands of HCW) or indirect contact (contaminated surfaces/equipment)',
      portalOfEntry: 'GI tract, urinary tract, wounds, indwelling devices',
      susceptibleHost:
        'Immunocompromised patients, those with prolonged antibiotic exposure, ICU patients, transplant recipients',
    },
    keyChainBreakers: [
      'Don gloves and gown before entering the room',
      'Hand hygiene with ABHR or soap and water after patient contact',
      'Dedicate patient-care equipment to VRE patient',
      'Place patient in private room; cohort if needed',
      'Antimicrobial stewardship to limit vancomycin use',
      'Active surveillance cultures in ICU and high-risk units',
    ],
    background: {
      virulence:
        'Intrinsically resistant to several antibiotics; acquired vancomycin resistance leaves few treatment options (linezolid, daptomycin)',
      colonization:
        'GI colonization can persist for months to years; patient remains a reservoir even when asymptomatic',
      biofilm: 'Forms biofilm on urinary catheters, central lines, and prosthetic devices',
      typicalSyndromes: [
        'Urinary tract infections (most common)',
        'Bacteremia',
        'Wound infections',
        'Endocarditis (less common)',
      ],
      reservoir: 'GI tract of colonized/infected patients; environmental surfaces',
      portalsOfExit: ['Feces', 'Urine', 'Wound drainage'],
      modesOfTransmission: [
        'Direct contact via contaminated hands of HCW',
        'Indirect contact via contaminated equipment or surfaces',
      ],
      portalsOfEntry: ['Urinary tract (catheter)', 'Wounds', 'IV sites', 'GI tract (oral)'],
      infectiousDose: 'Low — small inoculum sufficient in susceptible hosts',
      contagiousness: 'High in healthcare settings among at-risk patients',
      environmentalPersistence:
        'Survives on dry surfaces for days to weeks; resistant to some disinfectants at low concentrations',
      incubationPeriod: 'Colonization can precede infection by weeks to months',
      highRiskHosts: [
        'ICU patients',
        'Organ transplant recipients',
        'Oncology patients',
        'Patients with prolonged hospitalization',
        'Prior vancomycin or broad-spectrum antibiotic use',
      ],
      commonNursingPitfalls: [
        'Forgetting to don gown AND gloves before any room contact',
        'Sharing equipment (glucometer, BP cuff) between VRE and non-VRE patients',
        'Not performing hand hygiene after glove removal',
        'Discontinuing Contact Precautions prematurely without clearance cultures',
      ],
      escalationTriggers: [],
    },
  },

  // ── 7. Norovirus ─────────────────────────────────────────────────────────
  {
    id: 'norovirus',
    name: 'Norovirus',
    commonName: 'Norovirus',
    category: 'virus',
    primaryPrecaution: 'contact',
    additionalPrecautions: [],
    escalationRules: [],
    chainOfInfection: {
      infectiousAgent:
        'Norovirus — non-enveloped, single-stranded RNA calicivirus; extremely stable in the environment',
      reservoir: 'Infected humans (symptomatic and asymptomatic); contaminated food and water',
      portalOfExit: 'Vomitus and feces; aerosolized vomitus during vomiting episodes',
      modeOfTransmission:
        'Fecal-oral route; contact with contaminated surfaces or food; aerosolized vomitus (short-range)',
      portalOfEntry: 'Oral ingestion of contaminated material; mucous membranes',
      susceptibleHost:
        'Nearly universal — no lasting immunity; elderly and immunocompromised at risk for severe disease',
    },
    keyChainBreakers: [
      'Don gloves and gown before room entry; add surgical mask during active vomiting episodes',
      'Soap and water hand hygiene — ABHR is less effective against non-enveloped norovirus',
      'Immediate containment and cleaning of vomiting incidents with bleach-based disinfectant',
      'Cohorting affected patients and restricting ill staff from patient care',
      'Outbreak management: restrict unit access, notify infection control',
      'Thorough environmental cleaning with bleach (1,000–5,000 ppm)',
    ],
    background: {
      virulence:
        'Extremely low infectious dose (~18 viral particles); non-enveloped structure resists many disinfectants; rapid replication in GI tract',
      colonization: 'No persistent colonization; shedding continues up to 2 weeks after recovery',
      biofilm:
        'Adheres tenaciously to surfaces; standard hospital disinfectants may be ineffective',
      typicalSyndromes: [
        'Acute gastroenteritis (nausea, vomiting, watery diarrhea)',
        'Dehydration and electrolyte imbalances',
        'Severe complications in elderly/immunocompromised',
      ],
      reservoir: 'Infected humans; contaminated food and water; surfaces',
      portalsOfExit: ['Vomitus', 'Feces', 'Aerosolized vomitus (projectile)'],
      modesOfTransmission: [
        'Fecal-oral (contaminated hands or surfaces)',
        'Ingestion of contaminated food or water',
        'Person-to-person via vomiting aerosols (short-range)',
      ],
      portalsOfEntry: ['Oral ingestion', 'Mucous membranes'],
      infectiousDose: 'Extremely low — as few as 18 viral particles',
      contagiousness: 'Very high — R0 estimates of 2–5 in closed settings',
      environmentalPersistence:
        'Survives on surfaces for days to weeks; resistant to alcohol-based cleaners',
      incubationPeriod: '12–48 hours',
      highRiskHosts: [
        'Elderly in long-term care',
        'Immunocompromised',
        'Patients with underlying GI disease',
        'Young children',
      ],
      commonNursingPitfalls: [
        'Using ABHR instead of soap and water (insufficient for non-enveloped virus)',
        'Inadequate PPE during vomiting cleanup — forgetting mask when vomiting aerosol risk is high',
        'Not notifying infection control when ≥2 patients have concurrent GI illness',
        'Ill staff members continuing to work during norovirus illness',
        'Insufficient contact time with bleach disinfectant during environmental cleaning',
      ],
      escalationTriggers: [],
    },
  },

  // ── 8. RSV (Respiratory Syncytial Virus) ─────────────────────────────────
  {
    id: 'rsv',
    name: 'Respiratory Syncytial Virus',
    commonName: 'RSV',
    category: 'virus',
    primaryPrecaution: 'contact',
    additionalPrecautions: ['droplet'],
    escalationRules: [],
    chainOfInfection: {
      infectiousAgent:
        'Respiratory Syncytial Virus — enveloped, negative-sense RNA paramyxovirus; F protein mediates cell fusion',
      reservoir: 'Infected humans (symptomatic and mildly symptomatic adults)',
      portalOfExit:
        'Respiratory secretions via coughing, sneezing, and direct contact with nasal secretions',
      modeOfTransmission:
        'Direct contact with nasal secretions; large respiratory droplets (≥5 μm); inoculation via eyes or nose from contaminated hands',
      portalOfEntry: 'Nasal mucosa, conjunctiva (most common self-inoculation route)',
      susceptibleHost:
        'Infants <12 months (especially premature), elderly, immunocompromised, those with cardiopulmonary disease',
    },
    keyChainBreakers: [
      'Don gloves and gown before room entry (contact precautions)',
      'Add surgical mask within 3 feet (droplet component)',
      'Rigorous hand hygiene — RSV spread often involves hand-to-nose/eye self-inoculation',
      'Avoid touching eyes, nose, and mouth with ungloved hands',
      'Dedicated equipment for RSV patient',
      'Palivizumab prophylaxis for high-risk infants (born <35 weeks GA, CHD, chronic lung disease)',
    ],
    background: {
      virulence:
        'F (fusion) protein promotes cell-cell fusion → syncytia formation → severe bronchiolitis; re-infection common throughout life',
      colonization:
        'No persistent colonization; shedding typically 3–8 days (up to 4 weeks in immunocompromised)',
      biofilm: 'Does not form biofilm; inactivated by standard hospital disinfectants',
      typicalSyndromes: [
        'Bronchiolitis (infants)',
        'Croup',
        'Pneumonia',
        'Upper respiratory infection (adults)',
        'Severe respiratory failure in premature infants',
      ],
      reservoir:
        'Infected humans — often mildly symptomatic adults carrying and transmitting to infants',
      portalsOfExit: ['Nasal secretions', 'Cough', 'Sneeze'],
      modesOfTransmission: [
        'Direct inoculation via nasal secretions or conjunctiva',
        'Large respiratory droplets',
        'Indirect contact via contaminated surfaces (survives 6+ hours)',
      ],
      portalsOfEntry: ['Nasal mucosa', 'Conjunctiva'],
      infectiousDose: 'Low; hand-to-nose inoculation is a primary route',
      contagiousness: 'High in pediatric units during RSV season (fall–spring)',
      environmentalPersistence: 'Survives on hard surfaces for 4–7 hours; on hands for ~30 minutes',
      incubationPeriod: '4–6 days',
      highRiskHosts: [
        'Premature infants',
        'Infants with congenital heart disease',
        'Infants with bronchopulmonary dysplasia',
        'Immunocompromised children',
        'Elderly adults',
      ],
      commonNursingPitfalls: [
        'Omitting gown — RSV spreads via contact AND droplets so full PPE is needed',
        'Touching nose or eyes after patient contact before hand hygiene',
        'HCW with mild URI symptoms (which could be RSV) caring for high-risk infants without extra precautions',
        'Not cohorting RSV patients during peak season',
      ],
      escalationTriggers: [],
    },
  },

  // ── 9. Neisseria meningitidis ─────────────────────────────────────────────
  {
    id: 'n-meningitidis',
    name: 'Neisseria meningitidis',
    commonName: 'Meningococcus',
    category: 'bacteria',
    primaryPrecaution: 'droplet',
    additionalPrecautions: [],
    escalationRules: [],
    chainOfInfection: {
      infectiousAgent:
        'Neisseria meningitidis — encapsulated Gram-negative diplococcus; serotypes A, B, C, W, Y cause most disease',
      reservoir: 'Nasopharynx of human carriers (~10–35% asymptomatic carriage rate)',
      portalOfExit: 'Respiratory secretions — coughing, sneezing, kissing, close contact',
      modeOfTransmission:
        'Respiratory droplets requiring close contact (typically <3 feet, prolonged exposure)',
      portalOfEntry: 'Nasopharyngeal mucosa',
      susceptibleHost:
        'Unvaccinated individuals, college students (dormitory living), asplenic patients, complement-deficient patients',
    },
    keyChainBreakers: [
      'Initiate Droplet Precautions immediately — surgical mask before entering room',
      'Administer parenteral antibiotics immediately (do not delay for procedures)',
      'Provide post-exposure chemoprophylaxis to close contacts (rifampin, ciprofloxacin, or ceftriaxone)',
      'Notify public health for outbreak investigation and contact tracing',
      'Meningococcal vaccination (MenACWY, MenB) for at-risk populations',
      'Discontinue Droplet Precautions 24 hours after start of effective antimicrobial therapy',
    ],
    background: {
      virulence:
        'Polysaccharide capsule evades phagocytosis; endotoxin triggers massive inflammatory cascade → septic shock; can progress from symptoms to death within 24 hours',
      colonization: 'Asymptomatic nasopharyngeal carriage is common; invasive disease is rare',
      biofilm: 'Forms biofilm in nasopharynx; biofilm may protect from host defenses',
      typicalSyndromes: [
        'Bacterial meningitis (fever, severe headache, nuchal rigidity, photophobia)',
        'Meningococcemia/septicemia (purpuric or petechial rash — classic)',
        'Waterhouse-Friderichsen syndrome (adrenal hemorrhage, shock)',
        'Pneumonia, arthritis, pericarditis (less common)',
      ],
      reservoir: 'Nasopharynx of colonized humans',
      portalsOfExit: ['Respiratory secretions', 'Nasopharyngeal secretions during close contact'],
      modesOfTransmission: [
        'Respiratory droplets during close, prolonged contact',
        'Direct contact with oral secretions',
      ],
      portalsOfEntry: ['Nasopharyngeal mucosa'],
      infectiousDose:
        'Low; host factors (complement deficiency, asplenia) dramatically increase risk',
      contagiousness:
        'Low attack rate (most exposures do not lead to disease); close contacts at highest risk',
      environmentalPersistence:
        'Fragile outside host; does not survive long on surfaces; sunlight, drying, and heat kill rapidly',
      incubationPeriod: '1–10 days (typically 3–4 days)',
      highRiskHosts: [
        'College students in dormitories',
        'Asplenic individuals',
        'Complement-deficient patients',
        'Unvaccinated individuals',
        'Military recruits',
      ],
      commonNursingPitfalls: [
        'Delaying antibiotic administration while waiting for test results — time is critical',
        'Not wearing a surgical mask before entering the room',
        'Failing to notify infection control and public health',
        'Not assessing HCW exposure and arranging chemoprophylaxis',
        'Discontinuing Droplet Precautions before 24 hours of effective antibiotics',
      ],
      escalationTriggers: [],
    },
  },
];

export function getMicrobeById(id: string): Microbe | undefined {
  return MICROBES.find((m) => m.id === id);
}
