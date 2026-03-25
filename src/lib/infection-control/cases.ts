// ─── Infection-Control Case Data ────────────────────────────────────────────

import type { Case } from './types';

export const CASES: Case[] = [
  // ── Case 1: MRSA Wound Infection ──────────────────────────────────────────
  {
    id: 'mrsa-wound',
    microbeId: 'mrsa',
    title: 'Post-Op Wound: The Draining Incision',
    vignette:
      'You are a med-surg nurse caring for Mr. Alvarez, a 68-year-old diabetic man who is post-op day 3 following hip arthroplasty. You notice his surgical wound has significant purulent drainage. The wound culture report just arrived: MRSA-positive. He is currently in a semi-private room with one roommate. He has a shared stethoscope and BP cuff at the bedside.',
    setting: 'med-surg',
    difficulty: 'basic',
    tags: ['MRSA', 'contact precautions', 'wound care', 'post-op'],
    modeA: {
      precautionQuestion:
        'Which level of transmission-based precautions must you initiate for Mr. Alvarez?',
      precautionOptions: [
        {
          level: 'standard',
          label: 'Standard Precautions only',
          description: 'Follow standard precautions for all patients.',
          points: 0,
          feedback:
            'Incorrect. Standard precautions alone are insufficient for MRSA. You must add Contact Precautions to prevent transmission via direct and indirect contact.',
        },
        {
          level: 'contact',
          label: 'Contact Precautions',
          description: 'Gloves + gown before entering room; dedicated equipment.',
          points: 20,
          feedback:
            'Correct! MRSA is transmitted by direct contact (hands) and indirect contact (contaminated surfaces). Contact Precautions with gloves and gown are required.',
        },
        {
          level: 'droplet',
          label: 'Droplet Precautions',
          description: 'Surgical mask within 3 feet of patient.',
          points: 0,
          feedback:
            'Incorrect. MRSA wound infection is transmitted by contact, not respiratory droplets. A surgical mask alone does not address the primary route.',
        },
        {
          level: 'airborne',
          label: 'Airborne Precautions',
          description: 'N95 in a negative-pressure room.',
          points: 0,
          feedback:
            'Incorrect. MRSA wound infection does not require airborne precautions. This level is reserved for pathogens that spread via droplet nuclei (TB, measles, varicella).',
        },
      ],
      keyActionsInstruction:
        'Select ALL actions that are correct for this situation (select every applicable action):',
      keyActions: [
        {
          id: 'mrsa-a1',
          text: "Don gloves and gown before entering Mr. Alvarez's room",
          correct: true,
          chainLink: 'modeOfTransmission',
          points: 10,
          feedback:
            'Correct! Gloves and gown must be donned before room entry to block direct and indirect contact transmission.',
        },
        {
          id: 'mrsa-a2',
          text: 'Move Mr. Alvarez to a private room',
          correct: true,
          chainLink: 'reservoir',
          points: 10,
          feedback:
            'Correct! A private room is preferred for contact precautions to reduce the risk of transmission to the roommate.',
        },
        {
          id: 'mrsa-a3',
          text: 'Dedicate the stethoscope and BP cuff to Mr. Alvarez only',
          correct: true,
          chainLink: 'modeOfTransmission',
          points: 10,
          feedback:
            'Correct! Shared equipment is a major indirect contact transmission vector for MRSA.',
        },
        {
          id: 'mrsa-a4',
          text: 'Perform hand hygiene with alcohol-based hand rub (ABHR) or soap and water after removing gloves',
          correct: true,
          chainLink: 'modeOfTransmission',
          points: 10,
          feedback:
            'Correct! Hand hygiene after glove removal is critical — hands can become contaminated during doffing.',
        },
        {
          id: 'mrsa-a5',
          text: 'Place the patient in a negative-pressure room',
          correct: false,
          chainLink: 'modeOfTransmission',
          points: -5,
          feedback:
            'Incorrect. Negative-pressure rooms (AIIRs) are required only for airborne pathogens (TB, measles). MRSA does not spread by the airborne route.',
        },
        {
          id: 'mrsa-a6',
          text: 'Don a fit-tested N95 respirator before entering the room',
          correct: false,
          chainLink: 'modeOfTransmission',
          points: -5,
          feedback:
            'Incorrect. N95 respirators are not required for MRSA wound infections. Gloves and gown are the appropriate PPE.',
        },
      ],
      chainLinkQuestions: [
        {
          id: 'mrsa-clq1',
          prompt: 'What is the primary mode of transmission for MRSA in this case?',
          chainLink: 'modeOfTransmission',
          options: [
            {
              text: 'Airborne via droplet nuclei',
              correct: false,
              points: 0,
              feedback: 'MRSA is not transmitted by the airborne route.',
            },
            {
              text: 'Direct and indirect contact (hands, surfaces, equipment)',
              correct: true,
              points: 10,
              feedback:
                'Correct! MRSA spreads primarily via the contact route — HCW hands and contaminated surfaces are the main vectors.',
            },
            {
              text: 'Respiratory droplets from coughing',
              correct: false,
              points: 0,
              feedback: 'MRSA wound infection does not spread via droplets.',
            },
            {
              text: 'Vector-borne via insects',
              correct: false,
              points: 0,
              feedback: 'MRSA is not vector-borne.',
            },
          ],
        },
        {
          id: 'mrsa-clq2',
          prompt:
            'Which action BEST breaks the chain of infection at the "Susceptible Host" link for the roommate?',
          chainLink: 'susceptibleHost',
          options: [
            {
              text: 'Move Mr. Alvarez to a private room',
              correct: true,
              points: 10,
              feedback:
                'Correct! Separating the MRSA patient removes the source of transmission, protecting the susceptible roommate.',
            },
            {
              text: 'Ask the roommate to wear gloves',
              correct: false,
              points: 0,
              feedback: 'Roommates do not routinely wear gloves.',
            },
            {
              text: 'Place a surgical mask on Mr. Alvarez',
              correct: false,
              points: 0,
              feedback: 'Masking addresses respiratory transmission, not contact transmission.',
            },
            {
              text: 'Use alcohol hand rub after dressing changes',
              correct: false,
              points: 5,
              feedback:
                'Partially correct — hand hygiene helps, but the best answer is private room placement.',
            },
          ],
        },
      ],
      maxScore: 80,
    },
    modeB: {
      phases: [
        {
          phase: 'before_entry',
          label: 'Before Entry',
          description: 'Prepare PPE and supplies outside the room',
        },
        {
          phase: 'donning',
          label: 'Donning PPE',
          description: 'Put on required PPE in correct order',
        },
        { phase: 'care', label: 'Patient Care', description: 'Perform wound care and assessment' },
        {
          phase: 'before_exit',
          label: 'Before Exit',
          description: 'Ensure patient safety and room readiness',
        },
        {
          phase: 'doffing',
          label: 'Doffing PPE',
          description: 'Remove PPE safely without self-contamination',
        },
        { phase: 'exiting', label: 'After Exit', description: 'Post-care hand hygiene' },
      ],
      steps: [
        {
          id: 'mrsa-b1',
          phase: 'before_entry',
          title: 'Gather Supplies',
          narrative:
            "You are about to enter Mr. Alvarez's room to perform a wound dressing change. What do you gather outside the room?",
          prompt: 'Which set of supplies is correct?',
          options: [
            {
              id: 'mrsa-b1-a',
              text: 'Gloves, gown, wound care supplies, dedicated stethoscope',
              correct: true,
              points: 10,
              feedback:
                'Correct! For MRSA contact precautions, gloves and gown are required. Bringing dedicated equipment prevents shared-item transmission.',
            },
            {
              id: 'mrsa-b1-b',
              text: 'N95, gloves, wound care supplies',
              correct: false,
              points: 0,
              feedback: 'Incorrect. An N95 is not required for MRSA. You need a gown, not an N95.',
              contaminationEvent: undefined,
            },
            {
              id: 'mrsa-b1-c',
              text: 'Gloves only, wound care supplies',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Gloves alone are insufficient — a gown is also required for contact precautions.',
              contaminationEvent:
                'Incomplete PPE: gown missing. Your uniform may now be colonized with MRSA.',
            },
          ],
        },
        {
          id: 'mrsa-b2',
          phase: 'donning',
          title: 'Don PPE',
          narrative: 'You have your supplies. In what order do you put on PPE?',
          prompt: 'Select the correct donning sequence:',
          options: [
            {
              id: 'mrsa-b2-a',
              text: 'Hand hygiene → Gown → Gloves',
              correct: true,
              points: 10,
              feedback:
                'Correct! For contact precautions: perform hand hygiene first, then gown, then gloves (gloves last so they cover the gown cuffs).',
            },
            {
              id: 'mrsa-b2-b',
              text: 'Gloves → Gown → Hand hygiene',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Hand hygiene must come first. Gown before gloves ensures gloves overlap the gown cuffs.',
              contaminationEvent: 'Improper donning sequence may leave skin exposed.',
            },
            {
              id: 'mrsa-b2-c',
              text: 'Gown → Gloves (no hand hygiene needed before)',
              correct: false,
              points: 0,
              feedback: 'Incorrect. Hand hygiene is always performed before donning PPE.',
              contaminationEvent:
                'Skipping hand hygiene before donning may contaminate the inside of your gloves.',
            },
          ],
        },
        {
          id: 'mrsa-b3',
          phase: 'care',
          title: 'Wound Dressing Change',
          narrative:
            'You are at the bedside and have completed the wound dressing. The old dressing is heavily soiled.',
          prompt: 'How do you dispose of the soiled dressing?',
          options: [
            {
              id: 'mrsa-b3-a',
              text: 'Place in a regular waste bag at the bedside, keeping gloves on',
              correct: true,
              points: 10,
              feedback:
                'Correct. MRSA wound dressings go in regular (non-red-bag) waste in most facilities, keeping gloves on to avoid contamination.',
            },
            {
              id: 'mrsa-b3-b',
              text: 'Carry it to the hallway trash without gloves',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Never remove gloves before disposal. This contaminates your hands and the hallway.',
              contaminationEvent:
                'MRSA on your hands from the soiled dressing — potential for environmental contamination.',
            },
            {
              id: 'mrsa-b3-c',
              text: 'Double-bag in red biohazard bags and send to biohazard disposal',
              correct: false,
              points: 5,
              feedback:
                'Partially acceptable in some facilities, but MRSA wound dressings typically go in regular waste, not red-bag regulated medical waste.',
            },
          ],
        },
        {
          id: 'mrsa-b4',
          phase: 'doffing',
          title: 'Doff PPE',
          narrative: 'You are ready to leave the room. You must remove your PPE safely.',
          prompt: 'Select the correct doffing sequence for contact precautions:',
          options: [
            {
              id: 'mrsa-b4-a',
              text: 'Gloves → Hand hygiene → Gown → Hand hygiene → Exit → Hand hygiene',
              correct: true,
              points: 15,
              feedback:
                'Correct! Remove gloves first (most contaminated), hand hygiene, then gown. Perform hand hygiene again after gown removal and after exiting.',
            },
            {
              id: 'mrsa-b4-b',
              text: 'Gown → Gloves → Hand hygiene → Exit',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Gloves should be removed first because they are the most contaminated item.',
              contaminationEvent:
                'Contaminated gloves touched the inside of the gown during doffing — potential self-contamination.',
            },
            {
              id: 'mrsa-b4-c',
              text: 'Gloves → Gown → Exit (hand hygiene at the sink outside)',
              correct: false,
              points: 5,
              feedback:
                'Partially correct, but hand hygiene should occur inside the room after removing gloves, and again after gown removal.',
            },
          ],
        },
      ],
      maxScore: 45,
    },
    debrief: {
      correctPrecaution: 'contact',
      rationale:
        'MRSA spreads primarily via direct contact (HCW hands) and indirect contact (contaminated equipment and surfaces). Contact Precautions — gloves + gown before room entry — are the evidence-based standard for MRSA management.',
      chainOfInfectionSummary:
        "MRSA lives on the patient's skin and wound (Reservoir) → exits through wound drainage (Portal of Exit) → travels via hands or equipment (Mode of Transmission — contact) → enters another patient through non-intact skin or devices (Portal of Entry) → infects susceptible hosts such as diabetic post-op patients (Susceptible Host).",
      keyLessons: [
        'Contact Precautions require gloves AND gown — both before room entry.',
        'ABHR is effective for MRSA hand hygiene; soap and water is also acceptable.',
        'Dedicated patient equipment is essential — shared stethoscopes are a common transmission vector.',
        'Private room placement reduces transmission risk to roommates.',
        'MRSA decolonization (chlorhexidine bathing, mupirocin) is evidence-based in high-risk settings.',
      ],
      commonErrors: [
        'Wearing only gloves without a gown.',
        'Using a shared stethoscope and BP cuff after an MRSA result.',
        'Not performing hand hygiene after glove removal.',
        'Failing to move the patient to a private room.',
      ],
      nclexPearl:
        'NCLEX tip: For MRSA, select "contact precautions" → gloves + gown. Remember: C. diff also uses contact precautions but requires SOAP AND WATER (not ABHR) for hand hygiene because alcohol doesn\'t kill spores.',
    },
  },

  // ── Case 2: TB Pulmonary ───────────────────────────────────────────────────
  {
    id: 'tb-pulmonary',
    microbeId: 'tb',
    title: 'TB Suspect: The Persistent Cough',
    vignette:
      'You are assigned to care for Ms. Chen, a 45-year-old immigrant woman admitted with a 3-month history of productive cough, night sweats, and a 15-pound weight loss. Chest X-ray shows upper-lobe cavitary lesions. Sputum AFB smear is pending. The charge nurse tells you an AIIR room is available.',
    setting: 'med-surg',
    difficulty: 'intermediate',
    tags: ['TB', 'airborne precautions', 'AFB', 'respiratory isolation'],
    modeA: {
      precautionQuestion:
        'Which transmission-based precautions should be implemented IMMEDIATELY for Ms. Chen?',
      precautionOptions: [
        {
          level: 'standard',
          label: 'Standard Precautions only',
          description: 'Standard precautions for all patients.',
          points: 0,
          feedback:
            'Incorrect. The clinical presentation (cavitary lesions, AFB history) strongly suggests TB. Airborne Precautions must be started immediately — do not wait for AFB culture confirmation.',
        },
        {
          level: 'contact',
          label: 'Contact Precautions',
          description: 'Gloves + gown before room entry.',
          points: 0,
          feedback:
            'Incorrect. Contact precautions address skin/surface transmission. TB is transmitted by airborne droplet nuclei — a surgical mask and contact precautions alone are insufficient.',
        },
        {
          level: 'droplet',
          label: 'Droplet Precautions',
          description: 'Surgical mask within 3 feet.',
          points: 0,
          feedback:
            'Incorrect. TB is NOT a droplet disease — it spreads via droplet nuclei (<5 μm) that travel >3 ft and remain suspended. A surgical mask does not filter particles this small. An N95 is required.',
        },
        {
          level: 'airborne',
          label: 'Airborne Precautions',
          description: 'N95 in a negative-pressure AIIR room.',
          points: 20,
          feedback:
            'Correct! TB spreads via airborne droplet nuclei. Place Ms. Chen in an AIIR immediately. All HCW must wear a fit-tested N95 or PAPR to enter the room.',
        },
      ],
      keyActionsInstruction: 'Select ALL actions that are appropriate for Ms. Chen right now:',
      keyActions: [
        {
          id: 'tb-a1',
          text: 'Place Ms. Chen in the available AIIR (negative-pressure room) immediately',
          correct: true,
          chainLink: 'modeOfTransmission',
          points: 10,
          feedback:
            'Correct! AIIR placement is the first priority to contain airborne droplet nuclei.',
        },
        {
          id: 'tb-a2',
          text: "Don a fit-tested N95 respirator before entering Ms. Chen's room",
          correct: true,
          chainLink: 'modeOfTransmission',
          points: 10,
          feedback:
            'Correct! A fit-tested N95 (or PAPR) is mandatory for entering a TB patient room. A surgical mask does not provide adequate protection.',
        },
        {
          id: 'tb-a3',
          text: 'Instruct Ms. Chen to wear a surgical mask when leaving the room',
          correct: true,
          chainLink: 'portalOfExit',
          points: 10,
          feedback:
            'Correct! Masking the patient during transport reduces environmental contamination with droplet nuclei.',
        },
        {
          id: 'tb-a4',
          text: 'Keep the AIIR door closed at all times',
          correct: true,
          chainLink: 'modeOfTransmission',
          points: 10,
          feedback:
            'Correct! Keeping the door closed maintains negative pressure, preventing contaminated air from escaping.',
        },
        {
          id: 'tb-a5',
          text: 'Wait for AFB culture confirmation before initiating any precautions',
          correct: false,
          chainLink: 'infectiousAgent',
          points: -10,
          feedback:
            'Incorrect and dangerous! Airborne precautions must be initiated on clinical suspicion. AFB cultures take 2–8 weeks. Waiting puts staff and other patients at risk.',
        },
        {
          id: 'tb-a6',
          text: 'Don a standard surgical mask before entering the room',
          correct: false,
          chainLink: 'modeOfTransmission',
          points: -5,
          feedback:
            'Incorrect. A surgical mask does not filter particles <5 μm. A fit-tested N95 is required for TB.',
        },
      ],
      chainLinkQuestions: [
        {
          id: 'tb-clq1',
          prompt:
            'TB droplet nuclei remain suspended in the air for extended periods. Which feature of the AIIR directly addresses this?',
          chainLink: 'modeOfTransmission',
          options: [
            {
              text: 'Negative air pressure with ≥12 air changes per hour (ACH)',
              correct: true,
              points: 10,
              feedback:
                'Correct! Negative pressure prevents contaminated air from flowing out, and high ACH dilutes and removes airborne particles.',
            },
            {
              text: 'Enhanced surface disinfection protocols',
              correct: false,
              points: 0,
              feedback: 'Surface disinfection addresses contact transmission, not airborne.',
            },
            {
              text: 'Patient isolation in a standard private room',
              correct: false,
              points: 0,
              feedback:
                'A standard private room does not have the negative pressure or high ACH needed for TB.',
            },
            {
              text: 'Use of HEPA filters in corridor hallways',
              correct: false,
              points: 5,
              feedback: 'HEPA in corridors helps but is not the primary feature of an AIIR.',
            },
          ],
        },
        {
          id: 'tb-clq2',
          prompt: 'Which action breaks the chain of infection at the "Portal of Exit" link?',
          chainLink: 'portalOfExit',
          options: [
            {
              text: 'Teaching Ms. Chen respiratory hygiene/cough etiquette and providing a surgical mask',
              correct: true,
              points: 10,
              feedback:
                'Correct! Respiratory hygiene and source masking contain respiratory secretions at the portal of exit.',
            },
            {
              text: 'Administering broad-spectrum antibiotics',
              correct: false,
              points: 0,
              feedback: 'Antibiotics address the infectious agent, not the portal of exit.',
            },
            {
              text: 'Placing the patient in an AIIR',
              correct: false,
              points: 5,
              feedback:
                'The AIIR primarily addresses mode of transmission. Cough etiquette targets the portal of exit.',
            },
            {
              text: 'Vaccinating susceptible contacts with BCG',
              correct: false,
              points: 0,
              feedback: 'Vaccination acts on the susceptible host, not the portal of exit.',
            },
          ],
        },
      ],
      maxScore: 80,
    },
    modeB: {
      phases: [
        { phase: 'before_entry', label: 'Before Entry', description: 'Prepare outside the AIIR' },
        { phase: 'donning', label: 'Donning PPE', description: 'Don airborne PPE correctly' },
        { phase: 'care', label: 'Patient Care', description: 'Assess and educate the patient' },
        { phase: 'doffing', label: 'Doffing PPE', description: 'Remove airborne PPE safely' },
        { phase: 'exiting', label: 'After Exit', description: 'Post-care procedures' },
      ],
      steps: [
        {
          id: 'tb-b1',
          phase: 'before_entry',
          title: 'Verify Room and PPE',
          narrative:
            'You are outside the AIIR. The door sign says "Airborne Precautions." You need to enter to assess Ms. Chen.',
          prompt: 'What do you do first?',
          options: [
            {
              id: 'tb-b1-a',
              text: 'Check that negative pressure is confirmed (pressure indicator shows negative), then don fit-tested N95',
              correct: true,
              points: 15,
              feedback:
                'Correct! Always verify negative pressure is functioning before entry. Then don your N95 before opening the door.',
            },
            {
              id: 'tb-b1-b',
              text: 'Don a surgical mask and enter quickly to minimize exposure time',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. A surgical mask does not protect against airborne TB. Speed does not replace proper PPE.',
              contaminationEvent:
                'Inadequate respiratory protection — potential TB exposure event.',
            },
            {
              id: 'tb-b1-c',
              text: 'Don your N95 and enter immediately without checking room pressure',
              correct: false,
              points: 5,
              feedback:
                'Partially correct — donning N95 is right, but you should verify negative pressure before entry.',
            },
          ],
        },
        {
          id: 'tb-b2',
          phase: 'donning',
          title: 'N95 Seal Check',
          narrative: 'You have your N95 in hand. How do you ensure it fits correctly?',
          prompt: 'Select the correct action:',
          options: [
            {
              id: 'tb-b2-a',
              text: 'Perform a user seal check (positive and negative pressure check) after donning',
              correct: true,
              points: 10,
              feedback:
                'Correct! A user seal check ensures the N95 is fitted correctly before entering the contaminated environment.',
            },
            {
              id: 'tb-b2-b',
              text: 'Simply put it on and enter — seal checks are only needed annually',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. A user seal check should be performed every time an N95 is donned.',
              contaminationEvent:
                'Poor N95 seal — potential airborne exposure to TB droplet nuclei.',
            },
            {
              id: 'tb-b2-c',
              text: 'Squeeze the nose wire tight and assume it fits',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Bending the nose wire helps but does not constitute a proper seal check.',
              contaminationEvent: 'Unverified seal — risk of leakage around the respirator edges.',
            },
          ],
        },
        {
          id: 'tb-b3',
          phase: 'care',
          title: 'Patient Education',
          narrative:
            "You enter Ms. Chen's room. She asks if she can walk to the bathroom down the hall.",
          prompt: 'What is your best response?',
          options: [
            {
              id: 'tb-b3-a',
              text: 'Explain that she must stay in the AIIR, and if she must leave, she must wear a surgical mask',
              correct: true,
              points: 10,
              feedback:
                'Correct! TB patients must remain in the AIIR. If transport is unavoidable, a surgical mask on the patient reduces contamination of the environment.',
            },
            {
              id: 'tb-b3-b',
              text: 'Allow her to use the hall bathroom if she coughs into her elbow',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Coughing into the elbow does not contain airborne TB droplet nuclei. She must remain in the AIIR.',
              contaminationEvent:
                'Unmasked TB patient in the hallway — environmental contamination risk.',
            },
            {
              id: 'tb-b3-c',
              text: 'Tell her to use the bedside commode and stay in the AIIR; no exceptions',
              correct: false,
              points: 8,
              feedback:
                'Mostly correct — the bedside commode keeps her in the AIIR. The key additional point is that if she must leave, she must wear a surgical mask.',
            },
          ],
        },
        {
          id: 'tb-b4',
          phase: 'doffing',
          title: 'Exiting the AIIR',
          narrative:
            'Your assessment is complete. You are ready to exit. When should you remove your N95?',
          prompt: 'Select the correct doffing action:',
          options: [
            {
              id: 'tb-b4-a',
              text: 'Remove the N95 OUTSIDE the AIIR, after closing the door behind you',
              correct: true,
              points: 10,
              feedback:
                'Correct! The N95 is removed outside the AIIR (or in the anteroom if available). Removing it inside the contaminated room re-exposes you to the air.',
            },
            {
              id: 'tb-b4-b',
              text: 'Remove the N95 inside the AIIR before opening the door',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Removing the N95 inside the contaminated room exposes your airway to airborne TB organisms.',
              contaminationEvent:
                'N95 removed inside AIIR — respiratory exposure to TB droplet nuclei.',
            },
            {
              id: 'tb-b4-c',
              text: 'Keep the N95 on until you reach the nursing station',
              correct: false,
              points: 5,
              feedback:
                'While keeping the N95 on does not expose you, it is unnecessary and may contaminate the N95 with environmental organisms beyond the AIIR.',
            },
          ],
        },
      ],
      maxScore: 45,
    },
    debrief: {
      correctPrecaution: 'airborne',
      rationale:
        'TB is transmitted by airborne droplet nuclei (<5 μm) that remain suspended in air and can travel >3 feet. Standard masks do not provide filtration for particles this small. A fit-tested N95 respirator and an AIIR with negative pressure are mandatory.',
      chainOfInfectionSummary:
        "TB bacilli live in Ms. Chen's lung (Reservoir) → exit via coughing generating droplet nuclei (Portal of Exit) → remain airborne and travel >3 ft (Mode of Transmission — airborne) → enter a new host's alveoli (Portal of Entry) → infect susceptible individuals with inadequate immunity (Susceptible Host).",
      keyLessons: [
        'TB precautions must start on clinical suspicion — do not wait for culture confirmation.',
        'A surgical mask is NOT sufficient for TB — use a fit-tested N95 or PAPR.',
        'AIIR rooms require negative pressure and ≥12 ACH.',
        'N95 must be removed OUTSIDE the room (or in the anteroom).',
        'Patient wears a surgical mask during any transport outside the AIIR.',
      ],
      commonErrors: [
        'Using a surgical mask instead of an N95.',
        'Waiting for culture results before initiating isolation.',
        'Removing the N95 inside the AIIR.',
        'Leaving the AIIR door open.',
      ],
      nclexPearl:
        'NCLEX tip: Airborne precautions = N95 + AIIR. TB, Measles (rubeola), Varicella/Chickenpox, disseminated Zoster — remember "AirMEV" (Airborne: Measles, encephalitis [measles], Varicella/TB). The mask goes on BEFORE entering, comes off OUTSIDE the room.',
    },
  },

  // ── Case 3: Influenza with AGP escalation ─────────────────────────────────
  {
    id: 'influenza-icu',
    microbeId: 'influenza',
    title: 'Flu in the ICU: When Droplets Become Aerosols',
    vignette:
      'Mr. Thompson, a 72-year-old man with COPD, is admitted to the ICU with severe influenza A pneumonia. His O2 saturation is 86% on high-flow O2. The intensivist has ordered emergent endotracheal intubation. You are the bedside nurse assisting with the procedure.',
    setting: 'icu',
    difficulty: 'intermediate',
    tags: [
      'influenza',
      'droplet precautions',
      'airborne precautions',
      'AGP',
      'escalation',
      'intubation',
    ],
    modeA: {
      precautionQuestion:
        'Before the intubation procedure begins, which level of precautions is NOW required?',
      precautionOptions: [
        {
          level: 'standard',
          label: 'Standard Precautions only',
          description: 'Standard precautions for all patients.',
          points: 0,
          feedback:
            'Incorrect. Mr. Thompson has confirmed influenza AND is about to undergo an AGP. Standard precautions alone are insufficient.',
        },
        {
          level: 'contact',
          label: 'Contact Precautions',
          description: 'Gloves + gown before room entry.',
          points: 0,
          feedback:
            'Incorrect. Contact precautions alone do not address airborne aerosol generation during intubation.',
        },
        {
          level: 'droplet',
          label: 'Droplet Precautions',
          description: 'Surgical mask + gloves + gown within 3 feet.',
          points: 5,
          feedback:
            'Partially correct for routine influenza care, but NOT for the intubation procedure. AGPs generate fine aerosols requiring airborne-level protection (N95).',
        },
        {
          level: 'airborne',
          label: 'Airborne Precautions (escalated for AGP)',
          description: 'N95/PAPR + eye protection + gloves + gown.',
          points: 20,
          feedback:
            'Correct! Endotracheal intubation is an aerosol-generating procedure (AGP). Influenza precautions must be escalated to airborne (N95 or PAPR) for this procedure.',
        },
      ],
      keyActionsInstruction: 'Select ALL appropriate actions for this intubation scenario:',
      keyActions: [
        {
          id: 'flu-a1',
          text: 'Don a fit-tested N95 respirator (or PAPR) before assisting with intubation',
          correct: true,
          chainLink: 'modeOfTransmission',
          points: 10,
          feedback:
            'Correct! Intubation is a high-risk AGP. N95 or PAPR is required to protect against aerosol transmission.',
        },
        {
          id: 'flu-a2',
          text: 'Don eye protection (goggles or face shield)',
          correct: true,
          chainLink: 'modeOfTransmission',
          points: 10,
          feedback:
            'Correct! Eye protection is essential during intubation to protect the conjunctiva from respiratory secretions and aerosols.',
        },
        {
          id: 'flu-a3',
          text: 'Limit personnel in the room to only those essential for the procedure',
          correct: true,
          chainLink: 'susceptibleHost',
          points: 10,
          feedback:
            'Correct! Minimizing personnel in the room during AGPs reduces the number of people exposed to infectious aerosols.',
        },
        {
          id: 'flu-a4',
          text: 'Use a surgical mask for the intubation since influenza is a droplet disease',
          correct: false,
          chainLink: 'modeOfTransmission',
          points: -10,
          feedback:
            'Incorrect. During AGPs, influenza aerosols behave like airborne particles. A surgical mask is inadequate — escalate to N95 or PAPR.',
        },
        {
          id: 'flu-a5',
          text: 'Ensure the patient has received antiviral therapy (oseltamivir) to reduce infectiousness',
          correct: true,
          chainLink: 'infectiousAgent',
          points: 5,
          feedback:
            'Correct (though secondary to PPE). Antivirals reduce viral shedding and infectiousness — part of a comprehensive prevention strategy.',
        },
      ],
      chainLinkQuestions: [
        {
          id: 'flu-clq1',
          prompt:
            'What specifically makes endotracheal intubation an "aerosol-generating procedure" that changes the PPE requirements?',
          chainLink: 'modeOfTransmission',
          options: [
            {
              text: 'Intubation forces air from the lungs and airway, generating fine aerosol particles (<5 μm) that remain airborne',
              correct: true,
              points: 10,
              feedback:
                'Correct! AGPs disrupt the airway and create fine aerosol particles that travel farther and remain suspended longer than respiratory droplets.',
            },
            {
              text: 'Intubation involves direct contact with blood, requiring higher precautions',
              correct: false,
              points: 0,
              feedback:
                'While blood contact is possible, the primary concern is aerosol generation.',
            },
            {
              text: 'ICU patients always require airborne precautions',
              correct: false,
              points: 0,
              feedback: 'ICU admission alone does not mandate airborne precautions.',
            },
            {
              text: 'The ventilator itself spreads the virus through its exhaust',
              correct: false,
              points: 0,
              feedback:
                'Modern closed ventilator circuits with HEPA filters contain exhaled gas safely.',
            },
          ],
        },
        {
          id: 'flu-clq2',
          prompt:
            'After the intubation is complete and Mr. Thompson is on the ventilator, you return to routine care. Which precautions apply?',
          chainLink: 'modeOfTransmission',
          options: [
            {
              text: 'Droplet Precautions — resume surgical mask, gloves, and gown for routine care',
              correct: true,
              points: 10,
              feedback:
                'Correct! Escalation to airborne is only required DURING AGPs. Between procedures, routine influenza care requires droplet precautions (surgical mask).',
            },
            {
              text: 'Continue airborne precautions at all times for safety',
              correct: false,
              points: 0,
              feedback:
                'While more cautious, this is not evidence-based for routine care and wastes scarce N95 resources.',
            },
            {
              text: 'Standard precautions only — the patient is now intubated',
              correct: false,
              points: 0,
              feedback:
                'Being intubated does not eliminate the need for droplet precautions in an influenza patient.',
            },
            {
              text: 'No precautions needed — the patient is sedated and cannot cough',
              correct: false,
              points: 0,
              feedback:
                'Sedation does not eliminate viral shedding. Droplet precautions remain necessary.',
            },
          ],
        },
      ],
      maxScore: 75,
    },
    modeB: {
      phases: [
        {
          phase: 'before_entry',
          label: 'Pre-Procedure',
          description: 'Set up outside the ICU room',
        },
        { phase: 'donning', label: 'Donning', description: 'Don escalated PPE for AGP' },
        { phase: 'care', label: 'Procedure Assist', description: 'Assist with intubation safely' },
        { phase: 'doffing', label: 'Doffing', description: 'Doff PPE after the AGP' },
        { phase: 'exiting', label: 'Post-Procedure', description: 'Resume routine care level' },
      ],
      steps: [
        {
          id: 'flu-b1',
          phase: 'before_entry',
          title: 'Pre-Procedure PPE Selection',
          narrative:
            'The intensivist announces intubation is needed NOW. You must gather PPE rapidly.',
          prompt:
            'Which PPE set is correct for assisting with intubation in this influenza patient?',
          options: [
            {
              id: 'flu-b1-a',
              text: 'N95 respirator, eye protection (goggles/face shield), gloves, gown',
              correct: true,
              points: 10,
              feedback:
                'Correct! All four elements are required for an AGP on an influenza patient: N95, eye protection, gloves, and gown.',
            },
            {
              id: 'flu-b1-b',
              text: 'Surgical mask, gloves, gown',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Surgical mask is inadequate for intubation. An N95 is required for this AGP.',
              contaminationEvent:
                'Inadequate respiratory protection during an AGP — potential influenza aerosol exposure.',
            },
            {
              id: 'flu-b1-c',
              text: 'N95 respirator and gloves only',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Gloves alone without gown leaves clothing exposed. Eye protection is also missing.',
              contaminationEvent:
                'Missing gown and eye protection — body fluids and aerosol splash risk.',
            },
          ],
        },
        {
          id: 'flu-b2',
          phase: 'care',
          title: 'Limiting Room Entry During Procedure',
          narrative:
            "The intubation is in progress. A colleague knocks and asks to enter to check on another patient's IV pump.",
          prompt: 'What do you do?',
          options: [
            {
              id: 'flu-b2-a',
              text: 'Decline entry — explain that an AGP is in progress and ask them to wait',
              correct: true,
              points: 10,
              feedback:
                'Correct! During AGPs, room entry should be restricted to essential personnel only.',
            },
            {
              id: 'flu-b2-b',
              text: 'Let them in — they have their surgical mask on',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. A surgical mask provides inadequate protection during an AGP. They should not enter without an N95.',
              contaminationEvent:
                'Additional personnel exposed to influenza aerosols with inadequate PPE.',
            },
            {
              id: 'flu-b2-c',
              text: 'Let them in if they quickly put on an N95 first',
              correct: false,
              points: 5,
              feedback:
                'If entry is truly essential, ensuring N95 use is correct. But non-essential personnel should not enter during an AGP regardless.',
            },
          ],
        },
        {
          id: 'flu-b3',
          phase: 'doffing',
          title: 'Post-AGP Doffing',
          narrative:
            'The intubation is complete. The patient is on the ventilator. You are ready to step out.',
          prompt: 'In what order do you doff your airborne-level PPE?',
          options: [
            {
              id: 'flu-b3-a',
              text: 'Gloves → Gown → Exit room → N95 removal (outside or anteroom) → Hand hygiene',
              correct: true,
              points: 15,
              feedback:
                'Correct! N95 is removed last, outside the room, to avoid self-contamination from a potentially soiled outer surface.',
            },
            {
              id: 'flu-b3-b',
              text: 'N95 → Gloves → Gown → Exit → Hand hygiene',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. The N95 should be removed last (outside the room). Removing it first while still in the contaminated area defeats its purpose.',
              contaminationEvent:
                'Early N95 removal in contaminated environment — respiratory exposure risk.',
            },
            {
              id: 'flu-b3-c',
              text: 'Gloves → Gown → N95 (inside room) → Hand hygiene → Exit',
              correct: false,
              points: 5,
              feedback:
                'Gloves before gown is correct, but the N95 should be removed OUTSIDE or in the anteroom, not inside the patient room.',
            },
          ],
        },
      ],
      maxScore: 35,
    },
    debrief: {
      correctPrecaution: 'airborne',
      rationale:
        'Influenza is normally a droplet disease, but aerosol-generating procedures (AGPs) create fine particles (<5 μm) that travel >3 feet and remain airborne. During intubation, escalation to airborne precautions (N95 or PAPR) is required. After the AGP, droplet precautions resume for routine care.',
      chainOfInfectionSummary:
        "Influenza A virus in Mr. Thompson's respiratory tract (Reservoir) → exits via exhaled aerosols generated by intubation (Portal of Exit — amplified by AGP) → travels as fine aerosol particles >3 ft (Mode of Transmission — escalated to airborne during AGP) → enters HCW airway (Portal of Entry) → infects susceptible HCW without N95 (Susceptible Host).",
      keyLessons: [
        'Influenza = droplet precautions for routine care; escalate to airborne (N95) for AGPs.',
        'AGPs include: intubation, bronchoscopy, open suctioning, CPAP/BiPAP, high-flow O2, CPR, nebulizers.',
        'Eye protection is essential for AGPs regardless of pathogen.',
        'Limit room personnel during AGPs.',
        'N95 is removed OUTSIDE the room — always last during doffing.',
      ],
      commonErrors: [
        'Using surgical mask for intubation of an influenza patient.',
        'Forgetting eye protection during AGPs.',
        'Allowing non-essential personnel in the room during AGPs.',
        'Removing N95 inside the patient room.',
      ],
      nclexPearl:
        'NCLEX tip: Know your AGP list cold. Any procedure that opens the airway (intubation, bronchoscopy, suctioning, CPAP/BiPAP) requires upgrading to N95 even for droplet pathogens like influenza. The rule: AGP = N95.',
    },
  },

  // ── Case 4: C. diff ───────────────────────────────────────────────────────
  {
    id: 'cdiff-colitis',
    microbeId: 'cdiff',
    title: 'C. diff: The Dangerous Diarrhea',
    vignette:
      'Mrs. Park, a 78-year-old woman, was admitted 3 days ago for a UTI and started on broad-spectrum antibiotics. She now has 6 loose stools today. Stool C. diff toxin assay returns POSITIVE. She is in a semi-private room. Your hand hygiene station outside her room has alcohol-based hand rub.',
    setting: 'med-surg',
    difficulty: 'basic',
    tags: ['C. diff', 'CDI', 'contact precautions', 'spores', 'hand hygiene'],
    modeA: {
      precautionQuestion: 'Which precautions are required for Mrs. Park with confirmed CDI?',
      precautionOptions: [
        {
          level: 'standard',
          label: 'Standard Precautions only',
          description: 'Standard precautions for all patients.',
          points: 0,
          feedback:
            'Incorrect. CDI requires Contact Precautions to prevent fecal-oral transmission via spores.',
        },
        {
          level: 'contact',
          label: 'Contact Precautions',
          description: 'Gloves + gown before room entry; soap and water hand hygiene.',
          points: 20,
          feedback:
            'Correct! CDI is transmitted via fecal-oral route. Contact Precautions with gloves and gown are required.',
        },
        {
          level: 'droplet',
          label: 'Droplet Precautions',
          description: 'Surgical mask within 3 feet.',
          points: 0,
          feedback:
            'Incorrect. C. diff is not transmitted by respiratory droplets — it spreads via fecal-oral contact with spores.',
        },
        {
          level: 'airborne',
          label: 'Airborne Precautions',
          description: 'N95 in a negative-pressure room.',
          points: 0,
          feedback: 'Incorrect. C. diff does not spread by the airborne route.',
        },
      ],
      keyActionsInstruction: 'Select ALL correct actions for Mrs. Park:',
      keyActions: [
        {
          id: 'cdiff-a1',
          text: 'Perform hand hygiene with SOAP AND WATER (not just alcohol hand rub) after caring for Mrs. Park',
          correct: true,
          chainLink: 'modeOfTransmission',
          points: 15,
          feedback:
            'CRITICAL! Alcohol-based hand rub does NOT kill C. diff spores. Soap and water physically removes spores from hands. This is the most important C. diff hand hygiene rule.',
        },
        {
          id: 'cdiff-a2',
          text: 'Don gloves and gown before entering the room',
          correct: true,
          chainLink: 'modeOfTransmission',
          points: 10,
          feedback: 'Correct! Contact Precautions require gloves and gown before room entry.',
        },
        {
          id: 'cdiff-a3',
          text: "Clean Mrs. Park's room surfaces with a bleach-based disinfectant (≥1,000 ppm sodium hypochlorite)",
          correct: true,
          chainLink: 'reservoir',
          points: 10,
          feedback:
            'Correct! C. diff spores resist most standard hospital disinfectants. Bleach (≥1,000 ppm hypochlorite) is required to kill spores.',
        },
        {
          id: 'cdiff-a4',
          text: 'Move Mrs. Park to a private room',
          correct: true,
          chainLink: 'reservoir',
          points: 10,
          feedback:
            'Correct! A private room prevents transmission to roommates who may be especially vulnerable after antibiotic exposure.',
        },
        {
          id: 'cdiff-a5',
          text: 'Use the alcohol hand rub outside the room since the soap dispenser is farther away',
          correct: false,
          chainLink: 'modeOfTransmission',
          points: -15,
          feedback:
            'INCORRECT and dangerous! Alcohol does not kill C. diff spores. You MUST use soap and water for C. diff, even if you have to walk to a farther sink.',
        },
      ],
      chainLinkQuestions: [
        {
          id: 'cdiff-clq1',
          prompt:
            'Why does C. diff hand hygiene require soap and water instead of alcohol-based hand rub?',
          chainLink: 'modeOfTransmission',
          options: [
            {
              text: 'C. diff forms spores that are resistant to alcohol; soap and water mechanically removes spores from hands',
              correct: true,
              points: 10,
              feedback:
                'Correct! Alcohol hand rub kills vegetative bacteria but cannot destroy C. diff spores. Soap and water physically lifts and rinses spores away.',
            },
            {
              text: 'Alcohol is not a registered disinfectant',
              correct: false,
              points: 0,
              feedback:
                'Alcohol IS an effective disinfectant for many organisms, but not C. diff spores.',
            },
            {
              text: 'Soap and water is always more effective than ABHR for all organisms',
              correct: false,
              points: 0,
              feedback:
                'For most organisms, ABHR is equally or more effective. C. diff spores are the exception.',
            },
            {
              text: 'C. diff is transmitted by respiratory droplets that soap removes from hands',
              correct: false,
              points: 0,
              feedback:
                'C. diff is not respiratory — it is transmitted by fecal-oral spore contact.',
            },
          ],
        },
        {
          id: 'cdiff-clq2',
          prompt: "Which factor in Mrs. Park's history MOST contributed to her developing CDI?",
          chainLink: 'susceptibleHost',
          options: [
            {
              text: 'Broad-spectrum antibiotic therapy disrupting her normal gut flora',
              correct: true,
              points: 10,
              feedback:
                'Correct! Antibiotics disrupt the gut microbiome, allowing C. diff to proliferate and produce toxins. Antimicrobial stewardship is the key prevention strategy.',
            },
            {
              text: 'Her age (78 years)',
              correct: false,
              points: 5,
              feedback:
                'Age is a risk factor but not the PRIMARY driver here — antibiotic exposure is the most direct cause.',
            },
            {
              text: 'Drinking contaminated water',
              correct: false,
              points: 0,
              feedback:
                'CDI in healthcare settings is primarily nosocomial, not from contaminated water.',
            },
            {
              text: 'Contact with a sick visitor',
              correct: false,
              points: 0,
              feedback:
                'While possible, the most likely source is the hospital environment and her own antibiotic-altered flora.',
            },
          ],
        },
      ],
      maxScore: 85,
    },
    modeB: {
      phases: [
        { phase: 'before_entry', label: 'Before Entry', description: 'Prepare outside the room' },
        { phase: 'donning', label: 'Donning', description: 'Don PPE for CDI' },
        { phase: 'care', label: 'Patient Care', description: 'Assess and clean' },
        { phase: 'doffing', label: 'Doffing', description: 'Remove PPE safely' },
        { phase: 'exiting', label: 'After Exit', description: 'Hand hygiene' },
      ],
      steps: [
        {
          id: 'cdiff-b1',
          phase: 'before_entry',
          title: 'Identify Hand Hygiene Station',
          narrative:
            "You need to enter Mrs. Park's room. There is an ABHR dispenser right outside the door and a sink with soap 10 feet down the hall.",
          prompt: 'Before entering, which hand hygiene method do you use?',
          options: [
            {
              id: 'cdiff-b1-a',
              text: 'Walk to the soap-and-water sink 10 feet away and wash hands',
              correct: true,
              points: 10,
              feedback:
                'Correct! Even though it requires extra steps, soap and water is mandatory for C. diff. Alcohol hand rub will not remove spores.',
            },
            {
              id: 'cdiff-b1-b',
              text: "Use the ABHR at the door — it's right there and faster",
              correct: false,
              points: 0,
              feedback:
                'Incorrect. ABHR does not kill or remove C. diff spores. Soap and water is required before and after caring for CDI patients.',
              contaminationEvent:
                'Spores on hands not removed — potential transmission to next patient.',
            },
            {
              id: 'cdiff-b1-c',
              text: "Skip hand hygiene — you'll be putting gloves on immediately",
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Hand hygiene is required before donning gloves. Gloves can have microscopic defects and are not a substitute for hand hygiene.',
              contaminationEvent: 'Contaminated hands inside gloves — risk if gloves fail.',
            },
          ],
        },
        {
          id: 'cdiff-b2',
          phase: 'care',
          title: 'Room Cleaning Product Selection',
          narrative:
            "Environmental services asks you which cleaning product to use for Mrs. Park's room.",
          prompt: 'Which product is appropriate for CDI environmental cleaning?',
          options: [
            {
              id: 'cdiff-b2-a',
              text: 'Bleach-based disinfectant (≥1,000 ppm sodium hypochlorite)',
              correct: true,
              points: 10,
              feedback:
                'Correct! Bleach at ≥1,000 ppm is the CDC-recommended sporicidal agent for C. diff environmental decontamination.',
            },
            {
              id: 'cdiff-b2-b',
              text: 'Standard quaternary ammonium (quat) disinfectant wipes',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Quaternary ammonium compounds do not kill C. diff spores. They are NOT effective for CDI environmental cleaning.',
              contaminationEvent:
                'Spores persist on surfaces — risk of transmission to future room occupants.',
            },
            {
              id: 'cdiff-b2-c',
              text: 'Alcohol-based surface wipes',
              correct: false,
              points: 0,
              feedback: 'Incorrect. Like ABHR, alcohol-based wipes do not kill C. diff spores.',
              contaminationEvent: 'Spores persist on surfaces — ongoing transmission risk.',
            },
          ],
        },
        {
          id: 'cdiff-b3',
          phase: 'doffing',
          title: 'Post-Care Hand Hygiene',
          narrative: 'You have removed your gloves and gown after caring for Mrs. Park.',
          prompt: 'Which hand hygiene action is required?',
          options: [
            {
              id: 'cdiff-b3-a',
              text: 'Wash hands with soap and water for at least 20 seconds',
              correct: true,
              points: 15,
              feedback:
                'Correct! After glove and gown removal, wash hands with soap and water. This is mandatory for CDI — alcohol hand rub is insufficient.',
            },
            {
              id: 'cdiff-b3-b',
              text: 'Use alcohol hand rub — faster and convenient',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. C. diff spores must be physically removed with soap and water, not killed with alcohol.',
              contaminationEvent:
                'Spores remain on hands after ABHR use — risk of environmental spread.',
            },
            {
              id: 'cdiff-b3-c',
              text: 'No additional hand hygiene needed — gloves protected your hands',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Hands can become contaminated during glove removal. Hand hygiene after doffing is always required.',
              contaminationEvent: 'Spores transferred during glove removal persist on hands.',
            },
          ],
        },
      ],
      maxScore: 35,
    },
    debrief: {
      correctPrecaution: 'contact',
      rationale:
        "C. diff spreads via the fecal-oral route. Spores contaminate the patient's environment and can survive for months. Contact Precautions (gloves + gown) and SOAP AND WATER hand hygiene are critical. Bleach-based disinfectants are required for environmental cleaning because alcohol and standard disinfectants do not kill spores.",
      chainOfInfectionSummary:
        "C. diff spores colonize Mrs. Park's gut (Reservoir) → exit via stool (Portal of Exit) → travel on hands or surfaces to a new host (Mode of Transmission — contact, fecal-oral) → enter new host's GI tract via oral ingestion (Portal of Entry) → infect susceptible antibiotic-treated patients (Susceptible Host).",
      keyLessons: [
        'SOAP AND WATER is mandatory for C. diff — alcohol does not kill spores.',
        'Bleach (≥1,000 ppm hypochlorite) is required for environmental cleaning.',
        'C. diff spores survive months on surfaces — thorough cleaning is essential.',
        'Antimicrobial stewardship is the key prevention strategy.',
        'Contact Precautions: gloves + gown required for all room contact.',
      ],
      commonErrors: [
        'Using alcohol hand rub after CDI patient care.',
        'Using quaternary ammonium or standard wipes for room cleaning.',
        'Not wearing a gown — gloves alone are insufficient.',
        'Not moving the patient to a private room.',
      ],
      nclexPearl:
        "NCLEX tip: C. diff = Contact Precautions + SOAP AND WATER. This is a classic NCLEX question. The distractor is always 'use ABHR' — don't fall for it. Also: bleach cleans C. diff rooms, not standard disinfectants.",
    },
  },

  // ── Case 5: COVID-19 ─────────────────────────────────────────────────────
  {
    id: 'covid19-med-surg',
    microbeId: 'covid19',
    title: 'COVID-19: Navigating the PPE Maze',
    vignette:
      'You are caring for Ms. Rivera, a 55-year-old unvaccinated woman admitted for COVID-19 pneumonia. She is on 4L nasal cannula. The physician orders a sputum sample via nasopharyngeal swab and plans to start high-flow nasal cannula (HFNC) at 40 L/min. The patient is in a negative-pressure room.',
    setting: 'med-surg',
    difficulty: 'advanced',
    tags: ['COVID-19', 'droplet precautions', 'airborne precautions', 'AGP', 'HFNC', 'escalation'],
    modeA: {
      precautionQuestion:
        'For routine assessment of Ms. Rivera (before HFNC), which precautions are required?',
      precautionOptions: [
        {
          level: 'standard',
          label: 'Standard Precautions only',
          description: 'Basic standard precautions.',
          points: 0,
          feedback: 'Incorrect. COVID-19 requires droplet precautions at minimum for routine care.',
        },
        {
          level: 'contact',
          label: 'Contact Precautions',
          description: 'Gloves + gown only.',
          points: 0,
          feedback:
            'Incorrect. COVID-19 is primarily a respiratory pathogen. Respiratory precautions (surgical mask) are essential.',
        },
        {
          level: 'droplet',
          label: 'Droplet Precautions (+ standard)',
          description: 'Surgical mask, gloves, gown, eye protection.',
          points: 20,
          feedback:
            'Correct! Per CDC guidance, droplet precautions (surgical mask + eye protection + gloves + gown) are required for routine COVID-19 patient care.',
        },
        {
          level: 'airborne',
          label: 'Airborne Precautions at all times',
          description: 'N95 in a negative-pressure room.',
          points: 10,
          feedback:
            'Partially correct. Many institutions use N95 for all COVID care, but the CDC minimum standard for routine care is droplet precautions. N95 is required during AGPs (like HFNC at high flows).',
        },
      ],
      keyActionsInstruction: 'Select ALL appropriate actions when HFNC at 40 L/min is initiated:',
      keyActions: [
        {
          id: 'covid-a1',
          text: 'Upgrade to N95 (or PAPR) when initiating high-flow nasal cannula',
          correct: true,
          chainLink: 'modeOfTransmission',
          points: 15,
          feedback:
            'Correct! HFNC at high flow rates is considered an AGP that may generate aerosols. Upgrade to N95 per institutional and CDC guidance.',
        },
        {
          id: 'covid-a2',
          text: 'Don eye protection (goggles or face shield) for all COVID care',
          correct: true,
          chainLink: 'portalOfEntry',
          points: 10,
          feedback:
            'Correct! Eye protection is required for all COVID-19 patient care to protect conjunctival exposure.',
        },
        {
          id: 'covid-a3',
          text: 'Keep the negative-pressure room door closed',
          correct: true,
          chainLink: 'modeOfTransmission',
          points: 10,
          feedback:
            'Correct! Keeping the door closed maintains negative pressure, preventing contaminated air from escaping into the corridor.',
        },
        {
          id: 'covid-a4',
          text: 'Continue with surgical mask during HFNC setup — droplet precautions are sufficient',
          correct: false,
          chainLink: 'modeOfTransmission',
          points: -10,
          feedback:
            'Incorrect. HFNC at ≥30–40 L/min may generate aerosols. Upgrade to N95 for HFNC initiation and high-flow care.',
        },
        {
          id: 'covid-a5',
          text: 'Ask the patient to wear a surgical mask during the procedure if possible',
          correct: true,
          chainLink: 'portalOfExit',
          points: 5,
          feedback:
            'Correct (where feasible). Source masking helps contain respiratory particles at the portal of exit.',
        },
      ],
      chainLinkQuestions: [
        {
          id: 'covid-clq1',
          prompt:
            'Which COVID-19 prevention measure operates at the "Susceptible Host" chain link?',
          chainLink: 'susceptibleHost',
          options: [
            {
              text: 'COVID-19 vaccination (primary + boosters)',
              correct: true,
              points: 10,
              feedback:
                'Correct! Vaccination reduces susceptibility by priming the immune system, acting directly on the "Susceptible Host" link.',
            },
            {
              text: 'N95 respirator use',
              correct: false,
              points: 0,
              feedback: 'N95 blocks the mode of transmission, not the susceptible host.',
            },
            {
              text: 'Negative-pressure room',
              correct: false,
              points: 0,
              feedback: 'The AIIR controls the mode of transmission, not host susceptibility.',
            },
            {
              text: 'Antiviral therapy (nirmatrelvir-ritonavir)',
              correct: false,
              points: 5,
              feedback:
                'Antivirals reduce the infectious agent (viral load), not host susceptibility.',
            },
          ],
        },
        {
          id: 'covid-clq2',
          prompt:
            "Ms. Rivera's COVID test was positive 2 days BEFORE she developed symptoms. Which feature of COVID-19 does this illustrate?",
          chainLink: 'reservoir',
          options: [
            {
              text: 'Pre-symptomatic infectiousness — SARS-CoV-2 can be transmitted before symptoms appear',
              correct: true,
              points: 10,
              feedback:
                'Correct! SARS-CoV-2 viral load peaks around symptom onset, but infectious spread can occur 1–3 days before symptoms — a key driver of community spread.',
            },
            {
              text: 'COVID-19 tests have a high false-positive rate',
              correct: false,
              points: 0,
              feedback:
                'Molecular PCR tests have very high specificity. This is not a false positive.',
            },
            {
              text: 'She acquired COVID-19 in the hospital',
              correct: false,
              points: 0,
              feedback: 'No evidence of healthcare acquisition is mentioned.',
            },
            {
              text: 'COVID-19 has a very long incubation period',
              correct: false,
              points: 0,
              feedback: 'The incubation is 2–14 days (median ~5 days), not unusually long.',
            },
          ],
        },
      ],
      maxScore: 80,
    },
    modeB: {
      phases: [
        { phase: 'before_entry', label: 'Before Entry', description: 'Select appropriate PPE' },
        { phase: 'donning', label: 'Donning', description: 'Don COVID PPE correctly' },
        { phase: 'care', label: 'HFNC Initiation', description: 'Manage AGP safely' },
        {
          phase: 'doffing',
          label: 'Doffing',
          description: 'Remove PPE without self-contamination',
        },
        { phase: 'exiting', label: 'After Exit', description: 'Complete hand hygiene' },
      ],
      steps: [
        {
          id: 'covid-b1',
          phase: 'before_entry',
          title: 'PPE Selection for HFNC Setup',
          narrative: "You are about to enter Ms. Rivera's room to set up HFNC at 40 L/min.",
          prompt: 'Which PPE is required?',
          options: [
            {
              id: 'covid-b1-a',
              text: 'N95 respirator, goggles or face shield, gloves, gown',
              correct: true,
              points: 10,
              feedback:
                'Correct! HFNC is an AGP. All four PPE elements are required: N95, eye protection, gloves, and gown.',
            },
            {
              id: 'covid-b1-b',
              text: 'Surgical mask, gloves, gown, face shield',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. A surgical mask is insufficient for an AGP. An N95 is required for HFNC initiation.',
              contaminationEvent:
                'Inadequate filtration during HFNC AGP — potential aerosol exposure.',
            },
            {
              id: 'covid-b1-c',
              text: 'N95 and gloves only — gown is unnecessary for HFNC',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. A gown is required to protect clothing and skin from respiratory secretions.',
              contaminationEvent:
                'Clothing exposed to respiratory secretions — potential secondary transmission.',
            },
          ],
        },
        {
          id: 'covid-b2',
          phase: 'care',
          title: 'Post-Doffing Sequence with Face Shield',
          narrative:
            'You have completed the HFNC setup. The face shield is visibly splashed with secretions.',
          prompt: 'How do you handle the face shield during doffing?',
          options: [
            {
              id: 'covid-b2-a',
              text: 'Remove face shield by grasping the headband or side pieces (not the front), clean with disinfectant wipes',
              correct: true,
              points: 10,
              feedback:
                'Correct! Face shields are removed by the clean headband/side pieces. Touching the contaminated front causes self-contamination. Clean/disinfect for reuse or discard.',
            },
            {
              id: 'covid-b2-b',
              text: 'Wipe the front of the face shield with a gloved hand and remove normally',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Wiping the contaminated front with a gloved hand then touching the headband transfers contamination.',
              contaminationEvent:
                'Contaminated glove-to-headband contact — potential face exposure during removal.',
            },
            {
              id: 'covid-b2-c',
              text: 'Remove face shield last, after removing gloves and gown',
              correct: false,
              points: 5,
              feedback:
                "Partially correct in some protocols, but the standard sequence removes gloves first, then gown, then eye protection, then N95 last (outside). Check your facility's protocol.",
            },
          ],
        },
        {
          id: 'covid-b3',
          phase: 'doffing',
          title: 'N95 Removal',
          narrative:
            "You have removed gloves, gown, and eye protection. You are now outside Ms. Rivera's room.",
          prompt: 'How do you remove the N95?',
          options: [
            {
              id: 'covid-b3-a',
              text: 'Remove the N95 by the straps/headbands (not the front), avoid touching the contaminated outer surface',
              correct: true,
              points: 15,
              feedback:
                'Correct! The outer surface of the N95 is contaminated. Grasp only the straps/headbands. Dispose of or store per institutional protocol. Perform hand hygiene immediately.',
            },
            {
              id: 'covid-b3-b',
              text: 'Grasp the front of the N95 and pull it away from your face',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Touching the contaminated outer surface of the N95 contaminates your hands.',
              contaminationEvent:
                'Hands contaminated by touching N95 outer surface — risk of face/mucous membrane exposure.',
            },
            {
              id: 'covid-b3-c',
              text: 'Leave the N95 on and walk to the nursing station — remove it there',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Wearing a potentially contaminated N95 through the unit spreads contamination to clean areas.',
              contaminationEvent: 'Contaminated N95 brought into clean areas of the unit.',
            },
          ],
        },
      ],
      maxScore: 35,
    },
    debrief: {
      correctPrecaution: 'droplet',
      rationale:
        'COVID-19 is transmitted primarily by respiratory droplets and aerosols. For routine care, droplet precautions (surgical mask + eye protection + gloves + gown) are the CDC minimum. During AGPs (intubation, bronchoscopy, HFNC at high flow rates, open suctioning), escalate to airborne precautions (N95 or PAPR).',
      chainOfInfectionSummary:
        "SARS-CoV-2 in Ms. Rivera's respiratory tract (Reservoir) → exits via exhaled breath, coughing, sneezing (Portal of Exit) → travels as droplets and aerosols (Mode of Transmission) → enters HCW/other patient's respiratory mucosa or conjunctiva (Portal of Entry) → infects unvaccinated susceptible host (Susceptible Host).",
      keyLessons: [
        'COVID-19 routine care = droplet precautions (surgical mask minimum); many institutions use N95 for all care.',
        'AGPs (HFNC, intubation, bronchoscopy) require upgrading to N95 or PAPR.',
        'Eye protection is mandatory for all COVID-19 care.',
        'Negative-pressure room (AIIR) should be used when available.',
        'Vaccination is the most effective tool to protect susceptible hosts.',
        'Pre-symptomatic transmission is a key epidemiological feature of COVID-19.',
      ],
      commonErrors: [
        'Using only a surgical mask during AGPs.',
        'Forgetting eye protection.',
        'Touching the contaminated outer surface of PPE during doffing.',
        'Assuming vaccinated patients cannot transmit — they can, especially with newer variants.',
      ],
      nclexPearl:
        'NCLEX tip: COVID-19 = droplet precautions for routine care + airborne (N95) for AGPs. Know your AGP list. Also note: COVID-19 is in a negative-pressure room when available — this makes it similar to airborne pathogens in practice.',
    },
  },

  // ── Case 6: VRE ───────────────────────────────────────────────────────────
  {
    id: 'vre-uti',
    microbeId: 'vre',
    title: 'VRE: The Antibiotic-Resistant Gut Bug',
    vignette:
      'Mr. Thompson, a 67-year-old kidney transplant recipient, has been in the ICU for 10 days on broad-spectrum antibiotics including vancomycin. He develops a urinary tract infection; urine culture returns positive for Vancomycin-resistant Enterococcus faecium (VRE). He is currently sharing a semi-private room.',
    setting: 'icu',
    difficulty: 'basic',
    tags: ['VRE', 'contact precautions', 'antimicrobial stewardship', 'transplant', 'MDR organism'],
    modeA: {
      precautionQuestion: 'Which precautions are required for Mr. Thompson with confirmed VRE?',
      precautionOptions: [
        {
          level: 'standard',
          label: 'Standard Precautions only',
          description: 'Standard precautions for all patients.',
          points: 0,
          feedback:
            'Incorrect. VRE is a multi-drug resistant organism (MDRO) requiring Contact Precautions to prevent spread via contaminated hands and surfaces.',
        },
        {
          level: 'contact',
          label: 'Contact Precautions',
          description: 'Gloves + gown before room entry; dedicated equipment.',
          points: 20,
          feedback:
            'Correct! VRE is transmitted by direct and indirect contact. Contact Precautions with gloves and gown are required. Move to a private room.',
        },
        {
          level: 'droplet',
          label: 'Droplet Precautions',
          description: 'Surgical mask within 3 feet.',
          points: 0,
          feedback:
            'Incorrect. VRE is not transmitted by respiratory droplets — it spreads via the fecal-oral route and contact with contaminated surfaces.',
        },
        {
          level: 'airborne',
          label: 'Airborne Precautions',
          description: 'N95 in a negative-pressure room.',
          points: 0,
          feedback:
            'Incorrect. VRE does not spread by the airborne route. Contact Precautions are required.',
        },
      ],
      keyActionsInstruction: 'Select ALL correct actions for Mr. Thompson:',
      keyActions: [
        {
          id: 'vre-a1',
          text: 'Don gloves AND gown before entering the room',
          correct: true,
          chainLink: 'modeOfTransmission',
          points: 15,
          feedback:
            'Correct! Both gloves and gown are required before any room entry for Contact Precautions. VRE can colonize clothing and surfaces.',
        },
        {
          id: 'vre-a2',
          text: 'Move Mr. Thompson to a private room',
          correct: true,
          chainLink: 'reservoir',
          points: 10,
          feedback:
            'Correct! Private room placement prevents transmission to other ICU patients, many of whom are also immunocompromised.',
        },
        {
          id: 'vre-a3',
          text: 'Dedicate a blood pressure cuff and glucometer to Mr. Thompson',
          correct: true,
          chainLink: 'modeOfTransmission',
          points: 10,
          feedback:
            'Correct! Shared equipment is a major vector for VRE transmission. Dedicated equipment eliminates this route.',
        },
        {
          id: 'vre-a4',
          text: 'Notify the pharmacy and treating team about the VRE result to prompt antimicrobial stewardship review',
          correct: true,
          chainLink: 'susceptibleHost',
          points: 10,
          feedback:
            'Correct! Antimicrobial stewardship — optimizing antibiotic selection and duration — is a key strategy to prevent further MDRO emergence and colonization.',
        },
        {
          id: 'vre-a5',
          text: 'Wear only gloves — a gown is unnecessary since you are just checking his vital signs',
          correct: false,
          chainLink: 'modeOfTransmission',
          points: -15,
          feedback:
            'Incorrect. VRE readily colonizes clothing. Both gloves AND gown are required before ANY room contact, regardless of activity.',
        },
      ],
      chainLinkQuestions: [
        {
          id: 'vre-clq1',
          prompt: 'Why is VRE particularly dangerous in Mr. Thompson compared with healthy adults?',
          chainLink: 'susceptibleHost',
          options: [
            {
              text: 'He is immunocompromised (transplant + corticosteroids) and has depleted gut flora from prolonged broad-spectrum antibiotic exposure',
              correct: true,
              points: 10,
              feedback:
                'Correct! Immunosuppression and antibiotic-disrupted microbiome are the two most important VRE risk factors. Transplant recipients on immunosuppressants and broad-spectrum antibiotics are classic high-risk hosts.',
            },
            {
              text: 'VRE is always fatal in ICU patients',
              correct: false,
              points: 0,
              feedback:
                'VRE is serious but not invariably fatal; mortality depends on infection site, treatment options, and host factors.',
            },
            {
              text: 'VRE is highly contagious in the air',
              correct: false,
              points: 0,
              feedback: 'VRE is not airborne — it spreads by direct and indirect contact.',
            },
            {
              text: 'He has not been vaccinated against VRE',
              correct: false,
              points: 0,
              feedback: 'There is no available VRE vaccine.',
            },
          ],
        },
        {
          id: 'vre-clq2',
          prompt:
            'Which infection control measure breaks the "Mode of Transmission" link for VRE most effectively?',
          chainLink: 'modeOfTransmission',
          options: [
            {
              text: 'Hand hygiene with ABHR or soap and water after patient contact, combined with gloves and gown',
              correct: true,
              points: 10,
              feedback:
                'Correct! VRE is transmitted via contaminated hands and surfaces. Rigorous hand hygiene combined with Contact Precautions PPE is the most effective transmission barrier.',
            },
            {
              text: 'N95 respirator use',
              correct: false,
              points: 0,
              feedback:
                'VRE is not airborne — respirators do not address its mode of transmission.',
            },
            {
              text: 'Placing the patient in a negative-pressure room',
              correct: false,
              points: 0,
              feedback:
                'Negative-pressure rooms are for airborne pathogens, not VRE which spreads by contact.',
            },
            {
              text: 'Isolating all visitors',
              correct: false,
              points: 5,
              feedback:
                'Visitor restrictions may help in outbreaks but are not the primary transmission-breaking intervention.',
            },
          ],
        },
      ],
      maxScore: 85,
    },
    modeB: {
      phases: [
        {
          phase: 'before_entry',
          label: 'Before Entry',
          description: 'Prepare outside the room',
        },
        { phase: 'donning', label: 'Donning', description: 'Don PPE for Contact Precautions' },
        { phase: 'care', label: 'Patient Care', description: 'Provide care safely' },
        {
          phase: 'doffing',
          label: 'Doffing',
          description: 'Remove PPE without self-contamination',
        },
        { phase: 'exiting', label: 'After Exit', description: 'Hand hygiene and equipment' },
      ],
      steps: [
        {
          id: 'vre-b1',
          phase: 'donning',
          title: 'PPE Selection',
          narrative: "You are about to enter Mr. Thompson's room to perform a routine assessment.",
          prompt: 'Which PPE do you don before entering?',
          options: [
            {
              id: 'vre-b1-a',
              text: 'Gloves and gown',
              correct: true,
              points: 10,
              feedback:
                'Correct! Contact Precautions require both gloves and gown before any room entry to prevent contact transmission.',
            },
            {
              id: 'vre-b1-b',
              text: 'Gloves only',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Gloves alone are insufficient. VRE colonizes clothing — a gown is required to protect your uniform.',
              contaminationEvent:
                'Clothing contaminated with VRE — potential spread to other patients.',
            },
            {
              id: 'vre-b1-c',
              text: 'Surgical mask, gloves, gown',
              correct: false,
              points: 5,
              feedback:
                'A surgical mask is not required for VRE (contact-only pathogen), but gloves and gown are correct. Extra PPE is not harmful, but mask is unnecessary.',
            },
          ],
        },
        {
          id: 'vre-b2',
          phase: 'care',
          title: 'Equipment Sharing',
          narrative:
            "After examining Mr. Thompson, you need to check his roommate's blood pressure using the shared wall-mounted BP cuff.",
          prompt: 'What do you do?',
          options: [
            {
              id: 'vre-b2-a',
              text: 'Use only the dedicated BP cuff labeled for Mr. Thompson; use a separate cuff for his roommate',
              correct: true,
              points: 10,
              feedback:
                'Correct! Shared equipment is a key VRE transmission vector. Dedicated equipment for the VRE patient prevents indirect contact transmission.',
            },
            {
              id: 'vre-b2-b',
              text: "Use the shared cuff and wipe it with an alcohol wipe after — it's quick and convenient",
              correct: false,
              points: 0,
              feedback:
                'Incorrect. While disinfection is important, the safest practice is dedicated equipment. If sharing is unavoidable, clean and disinfect thoroughly before and after each use.',
              contaminationEvent: 'VRE transferred via shared BP cuff to another patient.',
            },
            {
              id: 'vre-b2-c',
              text: "Skip the roommate's assessment until you have time to get a separate cuff",
              correct: false,
              points: 0,
              feedback:
                'Patient safety requires timely assessment. The correct action is to obtain a separate dedicated cuff, not to skip care.',
            },
          ],
        },
        {
          id: 'vre-b3',
          phase: 'exiting',
          title: 'Post-Care Hand Hygiene',
          narrative: 'You have removed gloves and gown after caring for Mr. Thompson.',
          prompt: 'Which hand hygiene is appropriate for VRE?',
          options: [
            {
              id: 'vre-b3-a',
              text: 'Alcohol-based hand rub (ABHR) for at least 20 seconds, or soap and water — either is effective for VRE',
              correct: true,
              points: 15,
              feedback:
                'Correct! Unlike C. diff, VRE does NOT form spores and is susceptible to alcohol-based hand rub. ABHR is preferred per WHO guidelines, but soap and water is also acceptable.',
            },
            {
              id: 'vre-b3-b',
              text: 'Soap and water only — alcohol is ineffective for drug-resistant organisms',
              correct: false,
              points: 5,
              feedback:
                'Partially correct (soap and water is fine), but the reasoning is wrong. VRE is susceptible to alcohol. ABHR is the preferred method per WHO guidelines for non-spore-forming bacteria.',
            },
            {
              id: 'vre-b3-c',
              text: 'No additional hand hygiene — gloves protected your hands',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Hand hygiene is always required after removing gloves. Gloves can have microscopic defects and hands can become contaminated during removal.',
              contaminationEvent: 'VRE on hands from glove removal — risk of environmental spread.',
            },
          ],
        },
      ],
      maxScore: 35,
    },
    debrief: {
      correctPrecaution: 'contact',
      rationale:
        'VRE spreads via direct and indirect contact — contaminated hands of HCW and shared equipment are the primary vectors. Contact Precautions (gloves + gown), private room placement, dedicated equipment, and rigorous hand hygiene are the core interventions. Unlike C. diff, VRE is susceptible to alcohol-based hand rub. Antimicrobial stewardship is the key prevention strategy to reduce colonization pressure.',
      chainOfInfectionSummary:
        "VRE colonizes Mr. Thompson's GI tract (Reservoir) → exits via feces, urine, wound drainage (Portal of Exit) → travels on HCW hands or shared equipment (Mode of Transmission — contact) → enters next patient's GI tract, urinary tract, or wounds (Portal of Entry) → infects immunocompromised or antibiotic-exposed susceptible hosts (Susceptible Host).",
      keyLessons: [
        'VRE requires Contact Precautions: gloves AND gown before any room entry.',
        'Dedicate equipment (BP cuff, glucometer, stethoscope) to the VRE patient.',
        'Unlike C. diff, VRE IS susceptible to alcohol-based hand rub.',
        'Private room placement prevents transmission to other high-risk patients.',
        'Antimicrobial stewardship reduces the emergence and spread of VRE.',
        'VRE colonization can persist months to years — clearance cultures are needed before discontinuing precautions.',
      ],
      commonErrors: [
        'Wearing gloves but forgetting the gown.',
        'Using shared equipment between VRE and non-VRE patients.',
        'Discontinuing Contact Precautions without clearance surveillance cultures.',
        'Confusing VRE hand hygiene (ABHR OK) with C. diff (soap and water required).',
      ],
      nclexPearl:
        'NCLEX tip: VRE = Contact Precautions. Key distinguisher: ABHR is OK for VRE (unlike C. diff which requires soap and water). Dedicated equipment and private room are priority actions. Common NCLEX question: "Which action prevents VRE transmission?" — Answer: donning gloves AND gown before entering.',
    },
  },

  // ── Case 7: Norovirus ─────────────────────────────────────────────────────
  {
    id: 'norovirus-outbreak',
    microbeId: 'norovirus',
    title: 'Norovirus: The Cruise Ship Bug Hits the Med-Surg Floor',
    vignette:
      'You are working the night shift on a 28-bed medical-surgical floor. Three patients in different rooms have developed acute onset nausea, projectile vomiting, and watery diarrhea within the past 4 hours. Two nursing assistants also report feeling nauseated. You suspect a norovirus outbreak. One of the affected patients, Mr. Alvarez (72 years old), just vomited across the floor of his semi-private room.',
    setting: 'med-surg',
    difficulty: 'intermediate',
    tags: [
      'norovirus',
      'contact precautions',
      'outbreak management',
      'hand hygiene',
      'environmental cleaning',
    ],
    modeA: {
      precautionQuestion:
        'Which precautions are required for Mr. Alvarez with suspected norovirus gastroenteritis?',
      precautionOptions: [
        {
          level: 'standard',
          label: 'Standard Precautions only',
          description: 'Standard precautions for all patients.',
          points: 0,
          feedback:
            'Incorrect. Norovirus requires Contact Precautions due to its highly contagious fecal-oral and contact transmission.',
        },
        {
          level: 'contact',
          label: 'Contact Precautions',
          description: 'Gloves + gown; soap and water hand hygiene; mask during vomiting events.',
          points: 20,
          feedback:
            'Correct! Norovirus requires Contact Precautions. During active vomiting, add a surgical mask to protect against aerosolized vomitus particles.',
        },
        {
          level: 'droplet',
          label: 'Droplet Precautions',
          description: 'Surgical mask within 3 feet.',
          points: 5,
          feedback:
            'Partially correct — a surgical mask is appropriate during active vomiting for the aerosolized component, but full Contact Precautions are the primary requirement.',
        },
        {
          level: 'airborne',
          label: 'Airborne Precautions',
          description: 'N95 in a negative-pressure room.',
          points: 0,
          feedback:
            'Incorrect. Norovirus does not spread by true airborne transmission. Contact Precautions are required; mask added only during active vomiting.',
        },
      ],
      keyActionsInstruction:
        'Select ALL correct outbreak management actions for Mr. Alvarez and the affected floor:',
      keyActions: [
        {
          id: 'noro-a1',
          text: 'Don gloves, gown, AND surgical mask before cleaning up the vomiting incident',
          correct: true,
          chainLink: 'portalOfExit',
          points: 15,
          feedback:
            'Correct! Vomitus aerosols can spread norovirus short-range. Gloves and gown prevent contact transmission; the mask protects from aerosolized vomitus during cleanup.',
        },
        {
          id: 'noro-a2',
          text: 'Perform hand hygiene with SOAP AND WATER (not just ABHR) after patient contact',
          correct: true,
          chainLink: 'modeOfTransmission',
          points: 15,
          feedback:
            'Correct! Norovirus is a non-enveloped virus. ABHR is LESS effective against non-enveloped viruses. Soap and water is the preferred hand hygiene method during norovirus outbreaks.',
        },
        {
          id: 'noro-a3',
          text: 'Clean the vomiting area with a bleach-based disinfectant (1,000–5,000 ppm sodium hypochlorite)',
          correct: true,
          chainLink: 'reservoir',
          points: 10,
          feedback:
            'Correct! Norovirus is resistant to many standard hospital disinfectants. Bleach-based products with adequate contact time are required for effective environmental decontamination.',
        },
        {
          id: 'noro-a4',
          text: 'Notify infection control immediately about the cluster of GI illness',
          correct: true,
          chainLink: 'susceptibleHost',
          points: 10,
          feedback:
            'Correct! A cluster of ≥2 patients with simultaneous GI illness is a potential outbreak and requires immediate infection control notification for investigation and unit-level interventions.',
        },
        {
          id: 'noro-a5',
          text: 'Instruct the nauseated nursing assistants to continue working but wear gloves',
          correct: false,
          chainLink: 'infectiousAgent',
          points: -15,
          feedback:
            'Incorrect and dangerous! Ill staff members are contagious and must not care for patients. Symptomatic HCW should be excluded from patient care for 48–72 hours after symptoms resolve. This is a critical outbreak control measure.',
        },
      ],
      chainLinkQuestions: [
        {
          id: 'noro-clq1',
          prompt:
            'Why is ABHR less effective for norovirus hand hygiene compared with C. diff or VRE?',
          chainLink: 'infectiousAgent',
          options: [
            {
              text: 'Norovirus is a non-enveloped virus — alcohol disrupts lipid envelopes but cannot effectively inactivate non-enveloped viruses',
              correct: true,
              points: 10,
              feedback:
                'Correct! Enveloped viruses (influenza, COVID-19, RSV) are easily killed by alcohol because it dissolves the lipid envelope. Non-enveloped viruses (norovirus, hepatitis A) are much more resistant to alcohol-based disinfectants.',
            },
            {
              text: 'ABHR has too low an alcohol concentration to kill any viruses',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. ABHR (60–95% alcohol) effectively kills enveloped viruses. The issue is specific to non-enveloped viruses like norovirus.',
            },
            {
              text: 'Norovirus forms spores that resist alcohol, similar to C. diff',
              correct: false,
              points: 0,
              feedback:
                'Norovirus does not form spores. Its resistance to alcohol is due to its non-enveloped structure, not spore formation.',
            },
            {
              text: 'ABHR is effective against norovirus — soap and water is not needed',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. During norovirus outbreaks, CDC and WHO recommend soap and water as the preferred hand hygiene method due to reduced ABHR efficacy.',
            },
          ],
        },
        {
          id: 'noro-clq2',
          prompt:
            'Which of the following is the HIGHEST priority action to contain a norovirus outbreak on a hospital unit?',
          chainLink: 'modeOfTransmission',
          options: [
            {
              text: 'Exclude symptomatic staff from patient care for 48–72 hours after symptom resolution',
              correct: true,
              points: 10,
              feedback:
                'Correct! Symptomatic HCW are highly contagious and act as a mobile reservoir — they will spread norovirus to patients and other staff. Staff exclusion is the single highest-impact outbreak control measure.',
            },
            {
              text: 'Administer antiviral therapy to all exposed patients',
              correct: false,
              points: 0,
              feedback:
                'There are no approved antiviral treatments for norovirus. Supportive care (hydration) is the management approach.',
            },
            {
              text: 'Use N95 respirators for all staff caring for GI illness patients',
              correct: false,
              points: 0,
              feedback:
                'N95 respirators are not required for norovirus. Contact Precautions (gloves + gown) with a surgical mask during active vomiting are appropriate.',
            },
            {
              text: 'Quarantine the entire hospital floor for 2 weeks',
              correct: false,
              points: 0,
              feedback:
                'Quarantining the entire floor is disproportionate. Outbreak management focuses on cohorting affected patients, excluding ill staff, and enhanced environmental cleaning.',
            },
          ],
        },
      ],
      maxScore: 85,
    },
    modeB: {
      phases: [
        {
          phase: 'before_entry',
          label: 'Before Entry',
          description: 'Prepare to manage the vomiting incident',
        },
        { phase: 'donning', label: 'Donning', description: 'Don PPE for vomiting cleanup' },
        { phase: 'care', label: 'Cleanup', description: 'Manage vomiting incident safely' },
        {
          phase: 'doffing',
          label: 'Doffing',
          description: 'Remove PPE without self-contamination',
        },
        { phase: 'exiting', label: 'After Exit', description: 'Hand hygiene and notification' },
      ],
      steps: [
        {
          id: 'noro-b1',
          phase: 'donning',
          title: 'PPE for Vomiting Cleanup',
          narrative:
            'Mr. Alvarez has just vomited across the floor. You need to clean up the incident and assess him.',
          prompt: 'Which PPE do you don before entering the room?',
          options: [
            {
              id: 'noro-b1-a',
              text: 'Gloves, gown, and surgical mask',
              correct: true,
              points: 10,
              feedback:
                'Correct! Gloves and gown protect against contact transmission; the surgical mask protects against aerosolized vomitus particles during cleanup of a vomiting incident.',
            },
            {
              id: 'noro-b1-b',
              text: 'Gloves only — the vomiting has stopped',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Aerosolized vomitus particles remain in the environment after a vomiting incident. Gown and mask are needed for cleanup in addition to gloves.',
              contaminationEvent: 'Norovirus on clothing and inhaled — risk of self-infection.',
            },
            {
              id: 'noro-b1-c',
              text: 'Gloves and gown — no mask needed since there is no active vomiting',
              correct: false,
              points: 5,
              feedback:
                'Partially correct — gloves and gown are essential. However, during cleanup of vomiting incidents, a surgical mask is recommended because vomitus particles may be aerosolized even after the episode ends.',
            },
          ],
        },
        {
          id: 'noro-b2',
          phase: 'care',
          title: 'Environmental Cleaning Product',
          narrative: 'Environmental services asks which product to use to clean the vomiting area.',
          prompt:
            'Which cleaning product is most appropriate for norovirus environmental decontamination?',
          options: [
            {
              id: 'noro-b2-a',
              text: 'Bleach solution (1,000–5,000 ppm sodium hypochlorite)',
              correct: true,
              points: 10,
              feedback:
                'Correct! Bleach is the recommended sporicidal and virucidal agent for norovirus. Standard quaternary ammonium disinfectants may not be effective against non-enveloped norovirus.',
            },
            {
              id: 'noro-b2-b',
              text: 'Standard quaternary ammonium ("quat") disinfectant wipes',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Quaternary ammonium compounds may not effectively inactivate norovirus. Bleach-based disinfectants are required for norovirus environmental cleaning.',
              contaminationEvent: 'Norovirus persists on surfaces — continued transmission risk.',
            },
            {
              id: 'noro-b2-c',
              text: 'Alcohol-based surface wipes',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Like ABHR, alcohol-based surface wipes are less effective against non-enveloped norovirus. Use bleach-based disinfectants.',
              contaminationEvent: 'Norovirus persists on surfaces after inadequate disinfection.',
            },
          ],
        },
        {
          id: 'noro-b3',
          phase: 'exiting',
          title: 'Hand Hygiene After Norovirus Care',
          narrative: 'You have completed the cleanup and removed your PPE outside the room.',
          prompt: 'Which hand hygiene method is most appropriate?',
          options: [
            {
              id: 'noro-b3-a',
              text: 'Wash hands with soap and water for at least 20 seconds',
              correct: true,
              points: 15,
              feedback:
                'Correct! During norovirus outbreaks, CDC recommends soap and water as the preferred hand hygiene method. Soap and water mechanically removes norovirus particles more effectively than ABHR alone.',
            },
            {
              id: 'noro-b3-b',
              text: 'Use ABHR — it is faster and equally effective',
              correct: false,
              points: 0,
              feedback:
                'Incorrect for norovirus. ABHR is LESS effective against non-enveloped norovirus. Soap and water is recommended during outbreaks.',
              contaminationEvent:
                'Norovirus particles remain on hands after ABHR — risk of continued spread.',
            },
            {
              id: 'noro-b3-c',
              text: 'Either method is acceptable — pick whichever is closest',
              correct: false,
              points: 0,
              feedback:
                'Incorrect during a norovirus outbreak. Soap and water is specifically recommended over ABHR for norovirus due to the non-enveloped structure.',
            },
          ],
        },
      ],
      maxScore: 35,
    },
    debrief: {
      correctPrecaution: 'contact',
      rationale:
        'Norovirus is a highly contagious non-enveloped virus spread via fecal-oral contact, contaminated surfaces, food, and aerosolized vomitus. Contact Precautions (gloves + gown) are required; add a surgical mask during active vomiting incidents. Unlike enveloped viruses, norovirus is less susceptible to ABHR — soap and water is preferred. Bleach-based disinfectants are required for environmental cleaning. Critically, symptomatic staff must be excluded from patient care to prevent outbreak amplification.',
      chainOfInfectionSummary:
        "Norovirus replicates in Mr. Alvarez's GI tract (Reservoir) → exits via vomitus and feces (Portal of Exit) → spreads on HCW hands, contaminated surfaces, or aerosolized vomitus (Mode of Transmission — fecal-oral contact) → enters susceptible hosts via oral ingestion or mucous membranes (Portal of Entry) → infects virtually any unimmune host, especially elderly patients (Susceptible Host).",
      keyLessons: [
        'Norovirus requires Contact Precautions; add surgical mask during active vomiting cleanup.',
        'SOAP AND WATER is preferred for hand hygiene during norovirus outbreaks (ABHR less effective for non-enveloped viruses).',
        'Bleach-based disinfectants (1,000–5,000 ppm) are required for environmental cleaning.',
        'Symptomatic staff MUST be excluded from patient care for 48–72 hours after symptom resolution.',
        'Norovirus requires only ~18 viral particles to cause infection — extremely contagious.',
        'Cohorting affected patients and notifying infection control are priority outbreak responses.',
      ],
      commonErrors: [
        'Using ABHR instead of soap and water during norovirus outbreak.',
        'Symptomatic staff continuing to work.',
        'Using standard disinfectant wipes instead of bleach for environmental cleaning.',
        'Forgetting surgical mask during cleanup of vomiting incidents.',
        'Not notifying infection control when ≥2 patients have concurrent GI illness.',
      ],
      nclexPearl:
        'NCLEX tip: Norovirus = Contact Precautions + SOAP AND WATER (just like C. diff, but for different reasons — non-enveloped virus vs. spores). Classic NCLEX scenario: which hand hygiene is correct for norovirus? Answer: soap and water. Also: ill staff must be excluded — this tests professional responsibility as well as infection control.',
    },
  },

  // ── Case 8: RSV ───────────────────────────────────────────────────────────
  {
    id: 'rsv-pediatric',
    microbeId: 'rsv',
    title: 'RSV: Protecting the Premature Infant',
    vignette:
      'You are a nurse on a pediatric unit. Baby Elena, a 6-week-old infant born at 28 weeks gestation, is admitted with worsening respiratory distress, nasal flaring, intercostal retractions, and oxygen saturation of 88% on room air. RSV rapid antigen test is POSITIVE. She is in an open-bay room with two other infants, one of whom is also a premature neonate.',
    setting: 'pediatric',
    difficulty: 'intermediate',
    tags: [
      'RSV',
      'contact precautions',
      'droplet precautions',
      'premature infant',
      'bronchiolitis',
      'palivizumab',
    ],
    modeA: {
      precautionQuestion:
        'Which precautions are required for Baby Elena with confirmed RSV bronchiolitis?',
      precautionOptions: [
        {
          level: 'standard',
          label: 'Standard Precautions only',
          description: 'Standard precautions for all patients.',
          points: 0,
          feedback:
            'Incorrect. RSV is transmitted by both contact and droplet routes. Standard precautions alone are insufficient.',
        },
        {
          level: 'contact',
          label: 'Contact Precautions only',
          description: 'Gloves + gown only.',
          points: 10,
          feedback:
            'Partially correct. Contact Precautions are required, but RSV also spreads via large respiratory droplets. Droplet Precautions (surgical mask within 3 feet) should be added.',
        },
        {
          level: 'droplet',
          label: 'Droplet Precautions only',
          description: 'Surgical mask within 3 feet.',
          points: 5,
          feedback:
            'Partially correct. Droplet Precautions are needed, but RSV also spreads by direct contact with nasal secretions and contaminated surfaces. Both Contact and Droplet Precautions are required.',
        },
        {
          level: 'contact',
          label: 'Contact + Droplet Precautions',
          description: 'Gloves, gown, AND surgical mask within 3 feet.',
          points: 20,
          feedback:
            'Correct! RSV spreads via direct contact with nasal secretions AND large respiratory droplets. Both Contact and Droplet Precautions are required: gloves, gown, and surgical mask.',
        },
      ],
      keyActionsInstruction: 'Select ALL correct actions for Baby Elena:',
      keyActions: [
        {
          id: 'rsv-a1',
          text: 'Move Baby Elena to a private room immediately',
          correct: true,
          chainLink: 'reservoir',
          points: 15,
          feedback:
            'Correct! Baby Elena must be moved out of the open bay immediately. The other premature neonate is at extremely high risk for severe RSV disease. Private room or cohorting with other RSV-positive infants is required.',
        },
        {
          id: 'rsv-a2',
          text: 'Don gloves, gown, AND surgical mask before entering the room',
          correct: true,
          chainLink: 'modeOfTransmission',
          points: 10,
          feedback:
            'Correct! RSV requires both Contact and Droplet Precautions: gloves + gown (contact) and surgical mask within 3 feet (droplet).',
        },
        {
          id: 'rsv-a3',
          text: 'Perform rigorous hand hygiene and avoid touching your eyes, nose, or mouth',
          correct: true,
          chainLink: 'portalOfEntry',
          points: 10,
          feedback:
            'Correct! RSV is frequently self-inoculated by touching nasal mucosa or conjunctiva with contaminated hands. Hand hygiene and mucous membrane protection are critical.',
        },
        {
          id: 'rsv-a4',
          text: 'Assess whether Baby Elena is eligible for palivizumab prophylaxis this RSV season',
          correct: true,
          chainLink: 'susceptibleHost',
          points: 10,
          feedback:
            'Correct! Palivizumab (a monoclonal antibody) provides passive immunity against severe RSV disease and is indicated for premature infants <35 weeks GA, infants with congenital heart disease, and infants with bronchopulmonary dysplasia.',
        },
        {
          id: 'rsv-a5',
          text: 'Allow the parents to visit without any PPE — they likely gave RSV to the baby anyway',
          correct: false,
          chainLink: 'modeOfTransmission',
          points: -10,
          feedback:
            'Incorrect. Visitors should be instructed in hand hygiene and may need to wear a mask depending on institutional policy. Parents who are symptomatic with URI should discuss visitation with the care team — they could spread RSV to other vulnerable infants on the unit.',
        },
      ],
      chainLinkQuestions: [
        {
          id: 'rsv-clq1',
          prompt:
            'Why is Baby Elena at much higher risk for severe RSV disease than a healthy full-term infant?',
          chainLink: 'susceptibleHost',
          options: [
            {
              text: 'She was born at 28 weeks gestation — she has immature lungs, a limited immune response, and no maternal RSV antibody transfer that typically occurs in the third trimester',
              correct: true,
              points: 10,
              feedback:
                'Correct! Premature infants miss the window of passive maternal antibody transfer that occurs late in the third trimester. Combined with immature pulmonary development and immune function, they are at highest risk for severe RSV bronchiolitis requiring mechanical ventilation.',
            },
            {
              text: 'She is a girl — RSV is more severe in female infants',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Sex is not a major RSV severity risk factor. Prematurity, congenital heart disease, and immunocompromise are the key risk factors.',
            },
            {
              text: 'RSV is resistant to all available treatments, making any infection fatal',
              correct: false,
              points: 0,
              feedback:
                'RSV is not invariably fatal. While there is no approved antiviral for most RSV patients, supportive care (supplemental oxygen, hydration) is effective for most cases.',
            },
            {
              text: 'She was not vaccinated against RSV at birth',
              correct: false,
              points: 0,
              feedback:
                'Infants are not vaccinated against RSV at birth. Maternal RSV vaccination and palivizumab prophylaxis for high-risk infants are the preventive strategies.',
            },
          ],
        },
        {
          id: 'rsv-clq2',
          prompt:
            'A nurse caring for Baby Elena develops mild cold symptoms the next day. What is the MOST appropriate action?',
          chainLink: 'infectiousAgent',
          options: [
            {
              text: 'Notify the charge nurse and occupational health; consider reassignment away from high-risk infants',
              correct: true,
              points: 10,
              feedback:
                "Correct! Adults with mild URI symptoms are often the source of RSV transmission to vulnerable infants. Even mild symptoms in a nurse can result in severe disease in a premature neonate. Reassignment or additional precautions protect the unit's most vulnerable patients.",
            },
            {
              text: 'Continue working but wear a surgical mask at all times',
              correct: false,
              points: 5,
              feedback:
                "Partially protective, but the safest action for premature infants is reassignment away from the NICU/pediatric unit when the HCW has active URI symptoms. A mask alone doesn't address hand contact transmission.",
            },
            {
              text: 'Call out sick immediately and do not return for 10 days',
              correct: false,
              points: 0,
              feedback:
                'RSV shedding typically lasts 3–8 days. The decision on work restrictions should be made with occupational health, not self-determined. 10 days is generally excessive.',
            },
            {
              text: 'Continue normal work — mild colds are not an infection control issue',
              correct: false,
              points: 0,
              feedback:
                "Incorrect. On units with premature infants, ANY URI symptoms in HCW should be reported and evaluated. What's mild for the nurse can be life-threatening for Baby Elena.",
            },
          ],
        },
      ],
      maxScore: 85,
    },
    modeB: {
      phases: [
        {
          phase: 'before_entry',
          label: 'Before Entry',
          description: 'Select correct PPE for RSV',
        },
        {
          phase: 'donning',
          label: 'Donning',
          description: 'Don Contact + Droplet PPE',
        },
        { phase: 'care', label: 'Patient Care', description: 'Provide safe infant care' },
        { phase: 'doffing', label: 'Doffing', description: 'Remove PPE without self-inoculation' },
        { phase: 'exiting', label: 'After Exit', description: 'Hand hygiene and documentation' },
      ],
      steps: [
        {
          id: 'rsv-b1',
          phase: 'donning',
          title: 'PPE Selection for RSV',
          narrative: "You are about to enter Baby Elena's room.",
          prompt: 'Which PPE do you don?',
          options: [
            {
              id: 'rsv-b1-a',
              text: 'Gloves, gown, and surgical mask',
              correct: true,
              points: 10,
              feedback:
                'Correct! RSV requires both Contact Precautions (gloves + gown) and Droplet Precautions (surgical mask within 3 feet).',
            },
            {
              id: 'rsv-b1-b',
              text: 'Gloves and gown only',
              correct: false,
              points: 0,
              feedback:
                'Incomplete. RSV also spreads via respiratory droplets, so a surgical mask is required in addition to gloves and gown.',
              contaminationEvent:
                'Respiratory droplet exposure without mask — risk of HCW RSV infection and further spread.',
            },
            {
              id: 'rsv-b1-c',
              text: 'Surgical mask only',
              correct: false,
              points: 0,
              feedback:
                'Incomplete. RSV spreads heavily via contact with nasal secretions. Gloves and gown are also required.',
              contaminationEvent:
                'Nasal secretion contact with clothing and hands — risk of self-inoculation via eye/nose touching.',
            },
          ],
        },
        {
          id: 'rsv-b2',
          phase: 'care',
          title: 'Self-Inoculation Prevention',
          narrative:
            "During your assessment, you accidentally brush your gloved hand against Baby Elena's nasal secretion-soaked blanket. Moments later you feel an itch near your eye.",
          prompt: 'What is the correct action?',
          options: [
            {
              id: 'rsv-b2-a',
              text: 'Do NOT touch your eye — complete the assessment, remove gloves, perform hand hygiene, and then address the itch',
              correct: true,
              points: 10,
              feedback:
                'Correct! The conjunctiva is a primary portal of entry for RSV. Touching your eye with a contaminated glove would inoculate the virus. Remove gloves and perform hand hygiene before touching your face.',
            },
            {
              id: 'rsv-b2-b',
              text: "Rub your eye quickly with your gloved finger — it's just a brief touch",
              correct: false,
              points: 0,
              feedback:
                "Incorrect! Even brief contact with the conjunctiva can inoculate RSV. The conjunctiva is one of RSV's primary portals of entry.",
              contaminationEvent:
                'RSV self-inoculation via conjunctiva — high risk of HCW RSV infection.',
            },
            {
              id: 'rsv-b2-c',
              text: 'Remove your gloves immediately in the room and rub your eye',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Removing gloves mid-care in the room leaves hands potentially contaminated. Complete the safe sequence: finish task, remove gloves, perform hand hygiene, THEN address the itch outside the patient zone.',
            },
          ],
        },
        {
          id: 'rsv-b3',
          phase: 'doffing',
          title: 'Preventing Self-Inoculation During Doffing',
          narrative: 'You have finished caring for Baby Elena and are ready to leave.',
          prompt: 'After removing gloves and gown, what is the MOST critical next action?',
          options: [
            {
              id: 'rsv-b3-a',
              text: 'Perform thorough hand hygiene with ABHR or soap and water before touching your face or any environmental surface',
              correct: true,
              points: 15,
              feedback:
                "Correct! RSV's primary transmission mechanism to HCW is self-inoculation via mucous membranes after touching contaminated surfaces. Hand hygiene before touching your face is the most critical protective action.",
            },
            {
              id: 'rsv-b3-b',
              text: 'Remove your mask first, then gloves, then gown',
              correct: false,
              points: 0,
              feedback:
                'Incorrect sequence. The standard doffing order is: gloves first, then gown, then hand hygiene, then eye protection/mask. The mask is removed last to maintain protection while removing contaminated items.',
              contaminationEvent:
                'Face and mask contaminated by improper doffing sequence — risk of self-inoculation.',
            },
            {
              id: 'rsv-b3-c',
              text: 'It is safe to touch your face now that gloves and gown are removed',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Hands may be contaminated despite glove use (microscopic glove defects, contamination during removal). Hand hygiene must be performed before touching your face.',
              contaminationEvent: 'RSV on hands contacts mucous membranes — self-inoculation risk.',
            },
          ],
        },
      ],
      maxScore: 35,
    },
    debrief: {
      correctPrecaution: 'contact',
      rationale:
        "RSV spreads via two routes: direct contact with nasal secretions and large respiratory droplets. Both Contact Precautions (gloves + gown) and Droplet Precautions (surgical mask within 3 feet) are required. RSV's primary mechanism of HCW infection is self-inoculation — touching one's eyes or nose with contaminated hands. Premature infants are the highest-risk population for severe RSV disease. Palivizumab provides targeted passive protection for high-risk infants.",
      chainOfInfectionSummary:
        "RSV replicates in Baby Elena's respiratory tract (Reservoir) → exits via nasal secretions, coughing, and sneezing (Portal of Exit) → spreads to HCW via direct contact with secretions or respiratory droplets (Mode of Transmission) → HCW self-inoculates by touching nasal mucosa or conjunctiva (Portal of Entry) → HCW then transmits to another vulnerable infant — completing the chain (Susceptible Host: premature neonate).",
      keyLessons: [
        'RSV requires BOTH Contact AND Droplet Precautions — gloves, gown, AND surgical mask.',
        "RSV's key mechanism: self-inoculation via nasal mucosa or conjunctiva — avoid touching your face.",
        'Move RSV-positive infants to private rooms away from other premature neonates.',
        'Palivizumab prophylaxis protects premature infants (<35 weeks GA), infants with CHD, and infants with BPD.',
        'HCW with mild URI symptoms should be reassigned from high-risk infant units.',
        'ABHR and standard disinfectants are effective for RSV (enveloped virus — unlike norovirus).',
      ],
      commonErrors: [
        'Using only Contact Precautions without adding a surgical mask.',
        'Touching nose or eyes without performing hand hygiene after patient contact.',
        'Allowing symptomatic HCW to continue caring for premature infants.',
        'Not cohorting RSV-positive patients away from other vulnerable infants.',
      ],
      nclexPearl:
        'NCLEX tip: RSV = Contact + Droplet Precautions. The key clinical feature: self-inoculation via conjunctiva and nasal mucosa is the HCW infection route. Highest-risk patients: premature infants, those with CHD, BPD. Palivizumab (monthly injections) = passive RSV prophylaxis for high-risk infants. Important: ABHR IS effective for RSV (enveloped) — contrast with norovirus (non-enveloped) where soap and water is preferred.',
    },
  },

  // ── Case 9: Neisseria meningitidis ────────────────────────────────────────
  {
    id: 'meningitis-ed',
    microbeId: 'n-meningitidis',
    title: 'Meningococcal Meningitis: Time Is Brain (and Life)',
    vignette:
      'A 19-year-old college student, Marcus, is brought to the ED by his roommate with a 6-hour history of severe headache, high fever (40.1°C), neck stiffness, and photophobia. On examination you note a non-blanching petechial rash spreading across his trunk and legs. You suspect meningococcal meningitis/septicemia. He is currently in an open ED bay, and his roommate is standing nearby asking questions.',
    setting: 'ed',
    difficulty: 'advanced',
    tags: [
      'meningococcal meningitis',
      'droplet precautions',
      'chemoprophylaxis',
      'petechial rash',
      'time-critical',
    ],
    modeA: {
      precautionQuestion:
        'Which precautions are required for Marcus with suspected meningococcal meningitis?',
      precautionOptions: [
        {
          level: 'standard',
          label: 'Standard Precautions only',
          description: 'Standard precautions for all patients.',
          points: 0,
          feedback:
            'Incorrect. Suspected meningococcal disease requires immediate Droplet Precautions. This is a life-threatening, notifiable emergency.',
        },
        {
          level: 'contact',
          label: 'Contact Precautions',
          description: 'Gloves + gown only.',
          points: 5,
          feedback:
            'Partially correct — gloves are part of standard precautions. However, the primary precaution for N. meningitidis is Droplet Precautions (surgical mask). The petechial rash is not a contact transmission risk.',
        },
        {
          level: 'droplet',
          label: 'Droplet Precautions',
          description: 'Surgical mask when within 3 feet; private room.',
          points: 20,
          feedback:
            'Correct! N. meningitidis spreads via respiratory droplets. Droplet Precautions (surgical mask, private room) must be initiated immediately. Do NOT delay antibiotics to place the patient first.',
        },
        {
          level: 'airborne',
          label: 'Airborne Precautions',
          description: 'N95 in a negative-pressure room.',
          points: 0,
          feedback:
            'Incorrect. N. meningitidis spreads by droplets (not true airborne transmission). Droplet Precautions are correct. Airborne precautions are not needed.',
        },
      ],
      keyActionsInstruction:
        'Select ALL correct IMMEDIATE actions for Marcus (time-critical scenario):',
      keyActions: [
        {
          id: 'mening-a1',
          text: 'Don a surgical mask before approaching Marcus and initiate Droplet Precautions immediately',
          correct: true,
          chainLink: 'modeOfTransmission',
          points: 15,
          feedback:
            'Correct! The surgical mask is the critical protective measure for HCW. Meningococcal disease is transmitted by respiratory secretions. Initiate Droplet Precautions without delay.',
        },
        {
          id: 'mening-a2',
          text: 'Advocate for immediate administration of parenteral antibiotics (ceftriaxone) — do NOT delay treatment to complete workup',
          correct: true,
          chainLink: 'infectiousAgent',
          points: 15,
          feedback:
            "Correct! Time is the most critical factor. Every hour of delay in antibiotic therapy increases mortality significantly. Antibiotic treatment also reduces the patient's infectiousness within hours — key for infection control.",
        },
        {
          id: 'mening-a3',
          text: 'Move Marcus to a private room immediately',
          correct: true,
          chainLink: 'reservoir',
          points: 10,
          feedback:
            'Correct! Private room placement (with Droplet Precautions) prevents exposure of other ED patients and staff. If a negative-pressure room is available, it is preferred but not strictly required for droplet transmission.',
        },
        {
          id: 'mening-a4',
          text: 'Identify and document all close contacts (roommate, EMS crew, HCW within 3 feet) for chemoprophylaxis notification',
          correct: true,
          chainLink: 'susceptibleHost',
          points: 10,
          feedback:
            "Correct! Close contacts (within 3 feet for >8 hours, or direct oral secretion contact) require post-exposure chemoprophylaxis (rifampin, ciprofloxacin, or ceftriaxone IM) and public health notification. Marcus's roommate in the ED is a priority contact.",
        },
        {
          id: 'mening-a5',
          text: 'Wait for blood cultures and LP results before starting antibiotics to avoid affecting culture results',
          correct: false,
          chainLink: 'infectiousAgent',
          points: -15,
          feedback:
            'INCORRECT and potentially fatal. In suspected bacterial meningitis/septicemia with classic presentation (fever, meningismus, petechial rash), antibiotic delay is deadly. START ANTIBIOTICS IMMEDIATELY. A single dose of antibiotics does not meaningfully affect culture yield in the first 1–2 hours but substantially reduces mortality.',
        },
      ],
      chainLinkQuestions: [
        {
          id: 'mening-clq1',
          prompt:
            "Marcus's roommate has been living with him for 3 months and spent several hours studying with him the night before admission. What infection control action is required for the roommate?",
          chainLink: 'susceptibleHost',
          options: [
            {
              text: 'Arrange post-exposure chemoprophylaxis (single-dose ciprofloxacin, rifampin course, or IM ceftriaxone) and notify public health',
              correct: true,
              points: 10,
              feedback:
                'Correct! The roommate meets criteria for a close contact: prolonged exposure (<3 feet, >8 hours cumulatively) and household contact. Chemoprophylaxis dramatically reduces the risk of secondary cases. Public health must be notified for contact tracing and outbreak investigation.',
            },
            {
              text: 'Reassure the roommate — he is vaccinated and does not need prophylaxis',
              correct: false,
              points: 0,
              feedback:
                'Vaccination status must be verified, and prophylaxis is still recommended for close contacts regardless of vaccination status (vaccines are not 100% effective and may not cover all serogroups).',
            },
            {
              text: 'The roommate only needs monitoring — chemoprophylaxis is only for household members with direct oral contact',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Close contact criteria includes sleeping or living in the same household and prolonged proximity. Chemoprophylaxis is indicated — waiting for direct oral contact evidence puts the roommate at risk.',
            },
            {
              text: 'Hospitalize the roommate for 24 hours of observation',
              correct: false,
              points: 0,
              feedback:
                'Hospitalization is not required for asymptomatic contacts. Chemoprophylaxis and close follow-up (monitoring for symptoms) are the recommended actions.',
            },
          ],
        },
        {
          id: 'mening-clq2',
          prompt:
            'The petechial/purpuric rash in meningococcemia is caused by which pathophysiological mechanism?',
          chainLink: 'infectiousAgent',
          options: [
            {
              text: 'Meningococcal endotoxin triggers disseminated intravascular coagulation (DIC) and damage to small blood vessel walls, causing skin hemorrhage',
              correct: true,
              points: 10,
              feedback:
                'Correct! The purpuric rash (non-blanching, skin hemorrhage) results from bacterial endotoxin-driven inflammatory cascade leading to DIC and vascular endothelial damage. This is a sign of septicemia and a medical emergency. Waterhouse-Friderichsen syndrome (bilateral adrenal hemorrhage) is the most severe manifestation.',
            },
            {
              text: 'Meningitis causes increased intracranial pressure that redistributes blood to the skin',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. The petechial rash is due to septicemia and DIC, not intracranial pressure changes.',
            },
            {
              text: 'The rash is a drug reaction to empiric antibiotics',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. The rash appeared before antibiotics were given — it is a sign of meningococcemia.',
            },
            {
              text: 'N. meningitidis directly invades skin cells causing the rash',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. The rash is caused by vascular damage from endotoxin-mediated inflammation, not direct bacterial skin invasion.',
            },
          ],
        },
      ],
      maxScore: 85,
    },
    modeB: {
      phases: [
        {
          phase: 'before_entry',
          label: 'Before Entry',
          description: 'Prepare for time-critical PPE application',
        },
        {
          phase: 'donning',
          label: 'Donning',
          description: 'Don Droplet Precautions PPE',
        },
        {
          phase: 'care',
          label: 'Urgent Care',
          description: 'Manage meningococcal emergency safely',
        },
        {
          phase: 'doffing',
          label: 'Doffing',
          description: 'Remove PPE and complete contact assessment',
        },
        {
          phase: 'exiting',
          label: 'Post-Care',
          description: 'HCW exposure assessment and prophylaxis',
        },
      ],
      steps: [
        {
          id: 'mening-b1',
          phase: 'donning',
          title: 'PPE for Suspected Meningococcal Disease',
          narrative:
            "The triage nurse calls you: 'We have a 19-year-old with high fever, stiff neck, and a petechial rash in Bay 3.' You walk toward Bay 3.",
          prompt: 'Before you approach Marcus, what do you do first?',
          options: [
            {
              id: 'mening-b1-a',
              text: 'Stop, don a surgical mask and gloves, then approach Marcus — initiate Droplet Precautions immediately',
              correct: true,
              points: 10,
              feedback:
                'Correct! The clinical presentation strongly suggests meningococcal disease. Donning a surgical mask before approaching ANY patient with suspected meningococcal meningitis is the priority HCW protective action.',
            },
            {
              id: 'mening-b1-b',
              text: 'Walk directly to Marcus to assess severity first — PPE can wait until the diagnosis is confirmed',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Do NOT approach a patient with suspected meningococcal meningitis without a surgical mask. The clinical triad (fever + meningismus + petechial rash) is sufficient to initiate Droplet Precautions before confirmation.',
              contaminationEvent:
                'Unprotected HCW exposure to meningococcal respiratory secretions — requires chemoprophylaxis.',
            },
            {
              id: 'mening-b1-c',
              text: 'Don an N95 respirator and move Marcus to a negative-pressure room before any assessment',
              correct: false,
              points: 5,
              feedback:
                "Partially correct — moving to a private room is right, but N. meningitidis requires Droplet (not Airborne) precautions. An N95 is not required. A surgical mask is sufficient. Don't delay life-saving assessment for an N95.",
            },
          ],
        },
        {
          id: 'mening-b2',
          phase: 'care',
          title: 'Antibiotic Timing Decision',
          narrative:
            "Marcus is now in a private room. The ED physician says: 'Let's get blood cultures and an LP before starting antibiotics to keep our cultures clean.'",
          prompt: 'As the nurse, what is your responsibility?',
          options: [
            {
              id: 'mening-b2-a',
              text: 'Advocate strongly for immediate antibiotic administration — delay is life-threatening. Suggest obtaining cultures rapidly, but antibiotics should not be withheld pending LP in a patient with signs of septicemia and likely meningococcemia.',
              correct: true,
              points: 10,
              feedback:
                'Correct! Nurses have a professional responsibility to advocate for patients. In meningococcal septicemia, antibiotic delay is associated with sharply increased mortality. Blood cultures can be drawn immediately before the first antibiotic dose, but the LP should NOT delay treatment when there are signs of septicemia and raised ICP. A single antibiotic dose does not significantly affect culture yield.',
            },
            {
              id: 'mening-b2-b',
              text: 'Follow the physician order — it is not your role to question diagnostic sequencing',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Patient advocacy is a core nursing responsibility. Evidence-based guidelines clearly state that antibiotic therapy should not be delayed for LP in patients with suspected bacterial meningitis and signs of septicemia or raised ICP. Speak up.',
            },
            {
              id: 'mening-b2-c',
              text: 'Give the antibiotics immediately without informing the physician',
              correct: false,
              points: 0,
              feedback:
                'Incorrect process. Nurses must communicate and advocate, not unilaterally deviate from physician orders without discussion. The correct action is to advocate strongly while following the escalation pathway if needed.',
            },
          ],
        },
        {
          id: 'mening-b3',
          phase: 'exiting',
          title: 'HCW Exposure Assessment',
          narrative:
            'After Marcus is stabilized, infection control asks you to document your exposure. During triage you approached Marcus without a mask for approximately 2 minutes before Droplet Precautions were initiated.',
          prompt:
            'You were within 3 feet of Marcus without a surgical mask for ~2 minutes. What is the correct action?',
          options: [
            {
              id: 'mening-b3-a',
              text: 'Report the exposure to occupational health and infection control; receive evaluation for post-exposure chemoprophylaxis per local protocol',
              correct: true,
              points: 15,
              feedback:
                'Correct! HCW with unprotected close contact (<3 feet) with a meningococcal patient, even briefly, should be evaluated for chemoprophylaxis. In most protocols, >5–10 minutes of unprotected exposure triggers prophylaxis, but individual risk assessment by occupational health is required. Report all exposures promptly.',
            },
            {
              id: 'mening-b3-b',
              text: "It was only 2 minutes — don't report it since it doesn't meet the exposure threshold",
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Even brief unprotected exposure warrants reporting and occupational health evaluation. Duration thresholds vary by protocol, and individual risk factors matter. All potential exposures should be reported — the decision on prophylaxis is made by occupational health, not the exposed HCW.',
            },
            {
              id: 'mening-b3-c',
              text: 'Take ciprofloxacin from the unit medication supply as self-prophylaxis',
              correct: false,
              points: 0,
              feedback:
                'Incorrect. Self-medication is not appropriate. Chemoprophylaxis should be prescribed through occupational health following proper exposure assessment to ensure appropriate drug selection, dosing, and documentation.',
            },
          ],
        },
      ],
      maxScore: 35,
    },
    debrief: {
      correctPrecaution: 'droplet',
      rationale:
        'Neisseria meningitidis spreads via respiratory droplets requiring close contact (<3 feet, prolonged exposure). Droplet Precautions (surgical mask, private room) must be initiated immediately upon clinical suspicion — before diagnostic confirmation. The classic triad of fever + meningismus + petechial rash is sufficient to trigger both Droplet Precautions AND immediate antibiotic administration. Chemoprophylaxis for close contacts (including HCW) and public health notification are mandatory. Droplet Precautions can be discontinued 24 hours after effective antibiotic therapy begins.',
      chainOfInfectionSummary:
        "N. meningitidis colonizes Marcus's nasopharynx (Reservoir) → exits via respiratory secretions during close contact (Portal of Exit) → spreads as respiratory droplets (Mode of Transmission — droplet; requires close, prolonged contact) → enters susceptible host via nasopharyngeal mucosa (Portal of Entry) → causes invasive disease in unvaccinated, asplenic, or complement-deficient hosts (Susceptible Host).",
      keyLessons: [
        'Meningococcal meningitis = Droplet Precautions — surgical mask is the critical HCW protection.',
        'DO NOT delay antibiotics for LP or cultures when septicemia signs are present — time is life.',
        'Droplet Precautions can be discontinued 24 hours after effective antibiotic therapy.',
        'All close contacts require chemoprophylaxis evaluation and public health must be notified.',
        'Non-blanching petechial/purpuric rash = meningococcemia emergency (DIC, endotoxin).',
        'HCW with unprotected exposure must report to occupational health for chemoprophylaxis evaluation.',
      ],
      commonErrors: [
        'Approaching suspected meningococcal patients without a surgical mask.',
        'Delaying antibiotics to obtain LP results.',
        'Not identifying and notifying close contacts (including the roommate in the ED).',
        'Failing to notify public health for outbreak investigation.',
        'Confusing meningococcal (droplet) with TB or varicella (airborne) precaution requirements.',
      ],
      nclexPearl:
        'NCLEX tip: Meningococcal meningitis = Droplet Precautions (surgical mask, private room). Key NCLEX priority: antibiotics FIRST before LP if signs of septicemia. Chemoprophylaxis for contacts = rifampin (2 days), single-dose ciprofloxacin, or single-dose IM ceftriaxone. Precautions can be stopped 24 hours after effective antibiotics. Classic NCLEX distractor: choosing Airborne instead of Droplet — N. meningitidis is droplet only.',
    },
  },
];

export function getCaseById(id: string): Case | undefined {
  return CASES.find((c) => c.id === id);
}

export function getCasesByMicrobe(microbeId: string): Case[] {
  return CASES.filter((c) => c.microbeId === microbeId);
}
