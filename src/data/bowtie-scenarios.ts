export interface BowtieOption {
  id: string;
  text: string;
}

export interface BowTieScenario {
  id: string;
  title: string;
  vignette: string;
  actions: BowtieOption[];
  conditions: BowtieOption[];
  parameters: BowtieOption[];
  correctActionIds: [string, string];
  correctConditionId: string;
  correctParameterIds: [string, string];
  rationale: string;
}

export const BOWTIE_SCENARIOS: BowTieScenario[] = [
  {
    id: 'ischemic-stroke',
    title: 'Ischemic Stroke',
    vignette:
      'A 72-year-old male is brought by ambulance after sudden onset of right-sided weakness and facial droop with slurred speech. Vital signs: BP 188/102 mmHg, HR 88 bpm, O₂ saturation 94% on room air. Last known well was 90 minutes ago. CT head is pending. He has no known drug allergies and his past medical history includes hypertension and atrial fibrillation.',
    conditions: [
      { id: 'bells-palsy', text: "Bell's palsy" },
      { id: 'hypoglycemia', text: 'Hypoglycemia' },
      { id: 'ischemic-stroke', text: 'Ischemic stroke' },
      { id: 'uti', text: 'Urinary tract infection' },
    ],
    actions: [
      { id: 'oral-steroid', text: 'Request oral steroid prescription' },
      { id: 'oxygen', text: 'Administer oxygen at 2 L/min via nasal cannula' },
      { id: 'iv-access', text: 'Insert a peripheral venous access device' },
      { id: 'urine-cs', text: 'Obtain urine for culture and sensitivity' },
      { id: 'dextrose', text: 'Request 50% dextrose IV push' },
    ],
    parameters: [
      { id: 'temperature', text: 'Temperature' },
      { id: 'urinary-output', text: 'Urinary output' },
      { id: 'neuro-status', text: 'Neurologic status' },
      { id: 'serum-glucose', text: 'Serum glucose level' },
      { id: 'ecg', text: 'ECG rhythm' },
    ],
    correctConditionId: 'ischemic-stroke',
    correctActionIds: ['oxygen', 'iv-access'],
    correctParameterIds: ['neuro-status', 'serum-glucose'],
    rationale:
      'Ischemic stroke explains the unilateral weakness, facial droop, and slurred speech within the thrombolytic time window. Supplemental oxygen corrects hypoxemia (O₂ sat 94%), and IV access is essential for potential thrombolytic therapy. Neurologic status must be trended to detect improvement or deterioration, and serum glucose must be monitored because hypoglycemia can mimic stroke and hyperglycemia worsens outcomes.',
  },
  {
    id: 'acute-heart-failure',
    title: 'Acute Decompensated Heart Failure',
    vignette:
      'A 68-year-old female with a known history of heart failure presents with a 3-day history of worsening shortness of breath. Assessment reveals bilateral crackles to the mid-lungs, 3+ pitting edema in bilateral lower extremities, and a weight gain of 4 kg over 3 days. Vital signs: BP 158/96 mmHg, HR 102 bpm, O₂ saturation 89% on room air. She is sitting upright and appears anxious.',
    conditions: [
      { id: 'pneumonia', text: 'Pneumonia' },
      { id: 'pulmonary-embolism', text: 'Pulmonary embolism' },
      { id: 'adhf', text: 'Acute decompensated heart failure' },
      { id: 'copd', text: 'COPD exacerbation' },
    ],
    actions: [
      { id: 'furosemide', text: 'Administer IV furosemide as prescribed' },
      { id: 'high-fowlers', text: "Position in high Fowler's position" },
      { id: 'antibiotics', text: 'Administer antibiotics as prescribed' },
      { id: 'scd', text: 'Apply sequential compression devices' },
      { id: 'intubation', text: 'Prepare for intubation' },
    ],
    parameters: [
      { id: 'daily-weight', text: 'Daily weight' },
      { id: 'potassium', text: 'Serum potassium' },
      { id: 'urine-output', text: 'Urine output' },
      { id: 'cxr', text: 'Chest X-ray result' },
      { id: 'bnp', text: 'BNP level' },
    ],
    correctConditionId: 'adhf',
    correctActionIds: ['furosemide', 'high-fowlers'],
    correctParameterIds: ['daily-weight', 'potassium'],
    rationale:
      "Bilateral crackles, dependent edema, rapid weight gain, and her cardiac history are hallmark signs of acute decompensated heart failure. IV furosemide reduces preload by promoting diuresis, and high Fowler's positioning uses gravity to reduce venous return and improve lung expansion. Daily weight is the most sensitive indicator of fluid balance, and serum potassium must be monitored closely because loop diuretics cause significant potassium loss that can lead to dangerous arrhythmias.",
  },
  {
    id: 'dka',
    title: 'Diabetic Ketoacidosis (DKA)',
    vignette:
      'A 24-year-old male with type 1 diabetes presents with nausea, vomiting, abdominal pain, and confusion for 12 hours. He reports running out of insulin 2 days ago. Vital signs: T 37.8°C, HR 124 bpm, RR 28 and deep, BP 94/60 mmHg, O₂ saturation 97%. Laboratory results: blood glucose 520 mg/dL, arterial pH 7.18, serum bicarbonate 10 mEq/L, serum potassium 5.8 mEq/L, urine and serum ketones positive.',
    conditions: [
      { id: 'hhs', text: 'Hyperglycemic hyperosmolar state (HHS)' },
      { id: 'hypoglycemia', text: 'Hypoglycemia' },
      { id: 'dka', text: 'Diabetic ketoacidosis (DKA)' },
      { id: 'sepsis', text: 'Sepsis' },
    ],
    actions: [
      { id: 'insulin-infusion', text: 'Administer IV regular insulin infusion as prescribed' },
      { id: 'ns-fluids', text: 'Initiate IV 0.9% normal saline fluid resuscitation' },
      { id: 'oral-glucose', text: 'Administer oral glucose tablets' },
      { id: 'bicarb', text: 'Administer sodium bicarbonate IV push' },
      { id: 'restrict-fluids', text: 'Restrict oral fluid intake' },
    ],
    parameters: [
      { id: 'potassium', text: 'Serum potassium' },
      { id: 'blood-glucose', text: 'Blood glucose level' },
      { id: 'urine-output', text: 'Urine output' },
      { id: 'temperature', text: 'Temperature' },
      { id: 'sodium', text: 'Sodium level' },
    ],
    correctConditionId: 'dka',
    correctActionIds: ['insulin-infusion', 'ns-fluids'],
    correctParameterIds: ['potassium', 'blood-glucose'],
    rationale:
      'DKA is confirmed by the triad of elevated blood glucose (520 mg/dL), metabolic acidosis (pH 7.18, bicarbonate 10 mEq/L), and positive ketones, combined with the missed insulin history. IV insulin infusion lowers blood glucose and halts ketone production, while IV 0.9% normal saline corrects severe dehydration and hypotension. Serum potassium must be monitored continuously because insulin drives potassium into cells, risking dangerous hypokalemia despite the initially elevated level. Blood glucose is trended to titrate the insulin infusion and prevent iatrogenic hypoglycemia.',
  },
  {
    id: 'septic-shock',
    title: 'Septic Shock',
    vignette:
      'A 58-year-old female is on post-operative day 2 following a bowel resection. The nurse notes she is increasingly confused. Vital signs: HR 118 bpm, RR 24 breaths/min, T 39.2°C, BP 88/54 mmHg, O₂ saturation 92% on 2 L/min nasal cannula. WBC 18,000 cells/µL. Inspection of the surgical wound reveals purulent drainage at the incision site.',
    conditions: [
      { id: 'pe', text: 'Pulmonary embolism' },
      { id: 'dehydration', text: 'Dehydration' },
      { id: 'septic-shock', text: 'Septic shock' },
      { id: 'adrenal-crisis', text: 'Adrenal crisis' },
    ],
    actions: [
      { id: 'blood-cultures', text: 'Obtain two sets of blood cultures before antibiotics' },
      { id: 'antibiotics', text: 'Administer prescribed broad-spectrum IV antibiotics' },
      { id: 'trendelenburg', text: 'Place patient in Trendelenburg position' },
      { id: 'restrict-iv', text: 'Restrict IV fluid administration' },
      { id: 'acetaminophen', text: 'Administer oral acetaminophen for fever' },
    ],
    parameters: [
      { id: 'map', text: 'Mean arterial pressure (MAP)' },
      { id: 'lactate', text: 'Lactate level' },
      { id: 'urine-output', text: 'Urine output' },
      { id: 'wound-culture', text: 'Wound culture result' },
      { id: 'temperature', text: 'Temperature' },
    ],
    correctConditionId: 'septic-shock',
    correctActionIds: ['blood-cultures', 'antibiotics'],
    correctParameterIds: ['map', 'lactate'],
    rationale:
      'The post-operative patient meets criteria for septic shock: a clear infection source (wound infection after bowel surgery), hypotension (BP 88/54), tachycardia, fever, altered mentation, and elevated WBC. Blood cultures must be obtained before the first antibiotic dose to avoid sterilising the sample and losing diagnostic information. Broad-spectrum IV antibiotics should then be administered within one hour. Mean arterial pressure (MAP) ≥ 65 mmHg is the primary haemodynamic goal in septic shock management, and serum lactate reflects tissue perfusion and is the gold-standard parameter for guiding resuscitation and predicting mortality.',
  },
  {
    id: 'pulmonary-embolism',
    title: 'Pulmonary Embolism',
    vignette:
      'A 45-year-old female on post-operative day 3 after a total hip arthroplasty suddenly reports severe shortness of breath and right-sided pleuritic chest pain. She is diaphoretic and anxious. Vital signs: HR 128 bpm, RR 28 breaths/min, BP 96/62 mmHg, O₂ saturation 87% on room air, T 37.1°C. She has not been ambulating and declined sequential compression devices earlier that morning.',
    conditions: [
      { id: 'pneumothorax', text: 'Pneumothorax' },
      { id: 'pe', text: 'Pulmonary embolism' },
      { id: 'pneumonia', text: 'Pneumonia' },
      { id: 'adhf', text: 'Acute decompensated heart failure' },
    ],
    actions: [
      { id: 'high-flow-o2', text: 'Apply high-flow oxygen via non-rebreather mask' },
      { id: 'notify-provider', text: 'Notify provider immediately and request urgent CT pulmonary angiography' },
      { id: 'ambulate', text: 'Assist patient to ambulate in the hallway' },
      { id: 'oral-anticoagulant', text: 'Administer scheduled oral anticoagulant and encourage fluids' },
      { id: 'scd-apply', text: 'Apply sequential compression devices and reposition for comfort' },
    ],
    parameters: [
      { id: 'o2-sat', text: 'Oxygen saturation' },
      { id: 'bp', text: 'Blood pressure' },
      { id: 'troponin', text: 'Troponin level' },
      { id: 'temperature', text: 'Temperature' },
      { id: 'urine-output', text: 'Urine output' },
    ],
    correctConditionId: 'pe',
    correctActionIds: ['high-flow-o2', 'notify-provider'],
    correctParameterIds: ['o2-sat', 'bp'],
    rationale:
      'Sudden onset dyspnea, pleuritic chest pain, tachycardia, hypoxia, and hypotension after hip arthroplasty in a non-ambulating patient are classic findings of massive pulmonary embolism. High-flow oxygen addresses life-threatening hypoxia (O₂ sat 87%), and immediate provider notification is necessary to initiate CT pulmonary angiography and anticoagulation. Oxygen saturation must be continuously monitored as the primary indicator of respiratory compromise, and blood pressure reflects hemodynamic stability — a MAP < 65 mmHg signals massive PE requiring escalation to thrombolytics or surgical intervention.',
  },
  {
    id: 'anaphylaxis',
    title: 'Anaphylaxis',
    vignette:
      'A 32-year-old male with a documented penicillin allergy was mistakenly administered amoxicillin 500 mg PO 15 minutes ago. He now presents with diffuse urticaria, lip swelling, stridor, and reports throat tightness. Vital signs: HR 136 bpm, RR 30 breaths/min, BP 78/44 mmHg, O₂ saturation 90% on room air. He is in visible respiratory distress.',
    conditions: [
      { id: 'vasovagal', text: 'Vasovagal syncope' },
      { id: 'anaphylaxis', text: 'Anaphylaxis' },
      { id: 'angioedema', text: 'Hereditary angioedema' },
      { id: 'anxiety', text: 'Acute anxiety attack' },
    ],
    actions: [
      { id: 'epinephrine', text: 'Administer epinephrine 0.3 mg IM (anterolateral thigh) immediately' },
      { id: 'call-rapid', text: 'Activate the rapid response team' },
      { id: 'antihistamine-oral', text: 'Administer oral diphenhydramine and observe for 30 minutes' },
      { id: 'iv-corticosteroid', text: 'Administer IV corticosteroid as the first-line intervention' },
      { id: 'prone-position', text: 'Place patient in prone position to improve breathing' },
    ],
    parameters: [
      { id: 'bp', text: 'Blood pressure' },
      { id: 'o2-sat', text: 'Oxygen saturation' },
      { id: 'heart-rate', text: 'Heart rate' },
      { id: 'temperature', text: 'Temperature' },
      { id: 'urine-output', text: 'Urine output' },
    ],
    correctConditionId: 'anaphylaxis',
    correctActionIds: ['epinephrine', 'call-rapid'],
    correctParameterIds: ['bp', 'o2-sat'],
    rationale:
      'Urticaria, angioedema, stridor, hypotension, and tachycardia following antibiotic administration in a penicillin-allergic patient constitute anaphylaxis — a life-threatening systemic allergic reaction. Epinephrine IM is the only first-line treatment for anaphylaxis: it reverses vasodilation, reduces laryngeal edema, and relieves bronchospasm. Activating the rapid response team ensures the airway is secured before complete obstruction occurs. Blood pressure (reflecting distributive shock) and oxygen saturation (reflecting airway compromise and bronchospasm) are the two most critical parameters to monitor continuously.',
  },
  {
    id: 'acute-kidney-injury',
    title: 'Acute Kidney Injury (AKI)',
    vignette:
      'A 67-year-old male with type 2 diabetes and hypertension was admitted 48 hours ago for a urinary tract infection and started on IV gentamicin. Today the nurse notes that urine output over the last 8 hours is 80 mL. Serum creatinine has risen from 1.1 mg/dL on admission to 3.4 mg/dL today. Potassium is 5.9 mEq/L. The patient reports nausea and decreased appetite. BP 162/94 mmHg.',
    conditions: [
      { id: 'ckd', text: 'Chronic kidney disease (CKD) stage 3' },
      { id: 'aki', text: 'Acute kidney injury (AKI)' },
      { id: 'nephrotic-syndrome', text: 'Nephrotic syndrome' },
      { id: 'dehydration', text: 'Dehydration' },
    ],
    actions: [
      { id: 'hold-nephrotoxic', text: 'Notify provider and hold nephrotoxic medications (gentamicin)' },
      { id: 'iv-fluid-bolus', text: 'Administer IV fluid bolus to improve renal perfusion' },
      { id: 'increase-gentamicin', text: 'Increase gentamicin dose to ensure adequate serum levels' },
      { id: 'encourage-oral', text: 'Encourage oral fluid intake of at least 2 L/day' },
      { id: 'foley', text: 'Insert indwelling urinary catheter to measure output accurately' },
    ],
    parameters: [
      { id: 'creatinine', text: 'Serum creatinine and BUN' },
      { id: 'potassium', text: 'Serum potassium' },
      { id: 'urine-output', text: 'Urine output (hourly)' },
      { id: 'temperature', text: 'Temperature' },
      { id: 'weight', text: 'Daily weight' },
    ],
    correctConditionId: 'aki',
    correctActionIds: ['hold-nephrotoxic', 'iv-fluid-bolus'],
    correctParameterIds: ['creatinine', 'potassium'],
    rationale:
      'Rising creatinine (1.1 → 3.4 mg/dL in 48 hours), oliguria (80 mL/8 h), and hyperkalemia (K⁺ 5.9 mEq/L) following aminoglycoside use confirm acute kidney injury. Gentamicin is directly nephrotoxic and must be held; the provider needs immediate notification. IV fluid resuscitation addresses pre-renal contributors and promotes tubular flushing. Serum creatinine and BUN trend the degree of renal impairment, while potassium is monitored because hyperkalemia above 6.0 mEq/L carries risk of fatal arrhythmia and may require emergent intervention.',
  },
  {
    id: 'hypertensive-crisis',
    title: 'Hypertensive Crisis',
    vignette:
      'A 55-year-old male with poorly controlled hypertension presents to the emergency department with a severe occipital headache, blurred vision, and confusion. He ran out of his antihypertensive medications 5 days ago. Vital signs: BP 218/136 mmHg, HR 96 bpm, RR 18 breaths/min, O₂ saturation 97% on room air, T 37.0°C. Fundoscopic exam reveals papilledema. Neurologic assessment shows new-onset expressive aphasia.',
    conditions: [
      { id: 'migraine', text: 'Migraine with aura' },
      { id: 'hypertensive-crisis', text: 'Hypertensive emergency' },
      { id: 'ischemic-stroke', text: 'Ischemic stroke' },
      { id: 'meningitis', text: 'Bacterial meningitis' },
    ],
    actions: [
      { id: 'iv-antihypertensive', text: 'Prepare for IV antihypertensive infusion (e.g., nicardipine) per protocol' },
      { id: 'continuous-bp', text: 'Establish continuous arterial blood pressure monitoring' },
      { id: 'oral-antihypertensive', text: 'Administer oral antihypertensive and recheck BP in 1 hour' },
      { id: 'rapid-bp-reduction', text: 'Lower blood pressure to normal range within 30 minutes' },
      { id: 'dim-lights', text: 'Dim lights and offer analgesics for headache relief only' },
    ],
    parameters: [
      { id: 'bp', text: 'Blood pressure (continuous)' },
      { id: 'neuro-status', text: 'Neurologic status (GCS, aphasia assessment)' },
      { id: 'urine-output', text: 'Urine output' },
      { id: 'temperature', text: 'Temperature' },
      { id: 'potassium', text: 'Serum potassium' },
    ],
    correctConditionId: 'hypertensive-crisis',
    correctActionIds: ['iv-antihypertensive', 'continuous-bp'],
    correctParameterIds: ['bp', 'neuro-status'],
    rationale:
      'BP of 218/136 mmHg with papilledema and new neurological deficits (aphasia) defines a hypertensive emergency — end-organ damage is occurring. IV antihypertensive therapy (e.g., nicardipine infusion) is required for controlled, titratable reduction; oral agents cannot achieve adequate speed or precision. Continuous intra-arterial BP monitoring is essential because blood pressure must be reduced by no more than 20–25% in the first hour to avoid cerebral ischemia from autoregulatory failure. Neurologic status is monitored to detect improvement or paradoxical deterioration if BP is lowered too rapidly.',
  },
  {
    id: 'ards',
    title: 'Acute Respiratory Distress Syndrome (ARDS)',
    vignette:
      'A 49-year-old male was admitted 36 hours ago with severe community-acquired pneumonia. Despite supplemental oxygen at 15 L/min via non-rebreather mask, his O₂ saturation remains 84%. Chest X-ray shows bilateral diffuse infiltrates. ABG results: PaO₂ 52 mmHg, FiO₂ 1.0, PaO₂/FiO₂ ratio 52, pH 7.28, PaCO₂ 52 mmHg. He is increasingly somnolent and using accessory muscles.',
    conditions: [
      { id: 'cardiogenic-pulmonary-edema', text: 'Cardiogenic pulmonary edema' },
      { id: 'ards', text: 'Acute respiratory distress syndrome (ARDS)' },
      { id: 'copd-exacerbation', text: 'COPD exacerbation' },
      { id: 'pleural-effusion', text: 'Large bilateral pleural effusions' },
    ],
    actions: [
      { id: 'notify-intubation', text: 'Notify provider immediately and prepare for endotracheal intubation' },
      { id: 'prone-positioning', text: 'Implement prone positioning protocol per provider order' },
      { id: 'increase-o2', text: 'Increase non-rebreather mask flow to maximum and reassess in 2 hours' },
      { id: 'diuresis', text: 'Administer IV furosemide to reduce pulmonary infiltrates' },
      { id: 'restrict-activity', text: 'Keep patient on strict bed rest and restrict visitors' },
    ],
    parameters: [
      { id: 'pao2-fio2', text: 'PaO₂/FiO₂ ratio' },
      { id: 'o2-sat', text: 'Oxygen saturation' },
      { id: 'plateau-pressure', text: 'Plateau airway pressure (after intubation)' },
      { id: 'urine-output', text: 'Urine output' },
      { id: 'temperature', text: 'Temperature' },
    ],
    correctConditionId: 'ards',
    correctActionIds: ['notify-intubation', 'prone-positioning'],
    correctParameterIds: ['pao2-fio2', 'o2-sat'],
    rationale:
      'A PaO₂/FiO₂ ratio of 52 on 100% FiO₂ with bilateral infiltrates not fully explained by cardiac failure defines severe ARDS. The patient is failing non-invasive oxygenation (O₂ sat 84% on NRB) and showing signs of impending respiratory failure (somnolence, accessory muscle use, hypercapnia). Immediate provider notification and preparation for intubation with lung-protective ventilation (tidal volume 6 mL/kg IBW, PEEP optimization) are the priority interventions. Prone positioning for 16+ hours/day has a mortality benefit in severe ARDS (PaO₂/FiO₂ < 150). The PaO₂/FiO₂ ratio is the primary diagnostic and trending parameter for ARDS severity.',
  },
  {
    id: 'increased-icp',
    title: 'Increased Intracranial Pressure (ICP)',
    vignette:
      'A 28-year-old male is in the neuro ICU following a traumatic brain injury sustained in a motor vehicle collision 18 hours ago. His ICP monitor reads 28 mmHg (normal < 20 mmHg). The nurse notes a widening pulse pressure: BP has changed from 122/80 to 168/54 mmHg over the last 30 minutes. Heart rate has slowed from 88 to 52 bpm. He is unresponsive to verbal stimuli and his pupils are unequal — left pupil 6 mm and non-reactive.',
    conditions: [
      { id: 'autonomic-dysreflexia', text: 'Autonomic dysreflexia' },
      { id: 'increased-icp', text: 'Herniation-threatening elevated ICP (Cushing triad)' },
      { id: 'hypertensive-emergency', text: 'Hypertensive emergency (unrelated to ICP)' },
      { id: 'vasovagal', text: 'Vasovagal episode' },
    ],
    actions: [
      { id: 'notify-neuro', text: 'Notify neurosurgery immediately' },
      { id: 'hob-30', text: 'Elevate head of bed to 30° and maintain neutral head alignment' },
      { id: 'lower-bp', text: 'Administer antihypertensive to rapidly lower blood pressure' },
      { id: 'flat-position', text: 'Place bed flat to maximize cerebral perfusion pressure' },
      { id: 'oral-fluids', text: 'Encourage oral fluid intake to maintain hydration' },
    ],
    parameters: [
      { id: 'icp', text: 'ICP reading and cerebral perfusion pressure (CPP)' },
      { id: 'pupil-response', text: 'Pupillary size and reactivity' },
      { id: 'gcs', text: 'Glasgow Coma Scale (GCS) score' },
      { id: 'temperature', text: 'Temperature' },
      { id: 'urine-output', text: 'Urine output' },
    ],
    correctConditionId: 'increased-icp',
    correctActionIds: ['notify-neuro', 'hob-30'],
    correctParameterIds: ['icp', 'pupil-response'],
    rationale:
      "The Cushing triad — hypertension with widening pulse pressure, bradycardia, and respiratory changes — combined with ICP of 28 mmHg and a blown pupil (unilateral fixed dilation) signals impending transtentorial herniation. Immediate neurosurgery notification may activate emergent decompressive craniectomy or osmotherapy (mannitol/hypertonic saline). Elevating the HOB to 30° with neutral neck alignment promotes venous drainage and reduces ICP without compromising cerebral perfusion pressure (CPP = MAP − ICP). ICP and CPP (target CPP ≥ 60 mmHg) are the primary hemodynamic targets, while pupillary response is the most sensitive bedside indicator of herniation progression.",
  },
  {
    id: 'postpartum-hemorrhage',
    title: 'Postpartum Hemorrhage',
    vignette:
      'A 29-year-old G2P2 female delivered vaginally 30 minutes ago after a prolonged labor augmented with oxytocin. The nurse notes the uterine fundus is boggy, displaced to the right, and above the umbilicus. Estimated blood loss so far is 600 mL and continues. Vital signs: BP 88/56 mmHg, HR 122 bpm, RR 22 breaths/min, O₂ saturation 96% on room air. The bladder is visibly distended.',
    conditions: [
      { id: 'uterine-inversion', text: 'Uterine inversion' },
      { id: 'uterine-atony', text: 'Uterine atony' },
      { id: 'cervical-laceration', text: 'Cervical laceration' },
      { id: 'retained-placenta', text: 'Retained placenta fragments' },
    ],
    actions: [
      { id: 'fundal-massage', text: 'Perform uterine fundal massage and notify provider' },
      { id: 'catheterize', text: 'Insert urinary catheter to decompress the bladder' },
      { id: 'oxytocin-infusion', text: 'Increase oxytocin infusion rate per protocol' },
      { id: 'trendelenburg', text: 'Place patient in Trendelenburg position and restrict IV fluids' },
      { id: 'ambulate', text: 'Assist patient to ambulate to stimulate uterine contraction' },
    ],
    parameters: [
      { id: 'fundal-height', text: 'Uterine fundal height and tone' },
      { id: 'ebl', text: 'Estimated blood loss (cumulative)' },
      { id: 'bp', text: 'Blood pressure' },
      { id: 'heart-rate', text: 'Heart rate' },
      { id: 'temperature', text: 'Temperature' },
    ],
    correctConditionId: 'uterine-atony',
    correctActionIds: ['fundal-massage', 'catheterize'],
    correctParameterIds: ['ebl', 'bp'],
    rationale:
      'A boggy, displaced uterus with ongoing hemorrhage after prolonged oxytocin-augmented labor is the classic presentation of uterine atony — the leading cause of postpartum hemorrhage. Fundal massage stimulates uterine contraction and slows bleeding, and the provider must be notified for uterotonic medication orders (oxytocin, methylergonovine, carboprost). Bladder distension displaces the uterus and mechanically prevents it from contracting; catheterization immediately removes this obstruction. Cumulative estimated blood loss is monitored to trigger massive transfusion protocol thresholds (≥ 1,000 mL), and blood pressure reflects hemodynamic stability in the setting of ongoing hemorrhage.',
  },
  {
    id: 'hypoglycemia',
    title: 'Severe Hypoglycemia',
    vignette:
      'A 71-year-old female with type 2 diabetes managed with insulin glargine and glipizide is found unresponsive by the nurse during morning rounds. Her roommate reports she refused her breakfast tray. Point-of-care blood glucose reads 32 mg/dL. She does not respond to sternal rub. IV access is in place. Vital signs: HR 108 bpm, BP 138/84 mmHg, RR 14 breaths/min, O₂ saturation 97% on room air.',
    conditions: [
      { id: 'ischemic-stroke', text: 'Ischemic stroke' },
      { id: 'hypoglycemia', text: 'Severe hypoglycemia' },
      { id: 'seizure', text: 'Post-ictal state after generalized tonic-clonic seizure' },
      { id: 'medication-overdose', text: 'Sedative medication overdose' },
    ],
    actions: [
      { id: 'dextrose-50', text: 'Administer dextrose 50% (D50) 25 g IV push immediately' },
      { id: 'oral-juice', text: 'Offer 4 oz of orange juice orally and observe for 15 minutes' },
      { id: 'glucagon-im', text: 'Administer glucagon 1 mg IM if IV access fails' },
      { id: 'hold-insulin', text: 'Hold all insulin doses and notify the provider' },
      { id: 'ct-head', text: 'Request urgent CT head before initiating any treatment' },
    ],
    parameters: [
      { id: 'blood-glucose', text: 'Blood glucose (q15 min until > 100 mg/dL)' },
      { id: 'loc', text: 'Level of consciousness / responsiveness' },
      { id: 'heart-rate', text: 'Heart rate' },
      { id: 'temperature', text: 'Temperature' },
      { id: 'urine-output', text: 'Urine output' },
    ],
    correctConditionId: 'hypoglycemia',
    correctActionIds: ['dextrose-50', 'hold-insulin'],
    correctParameterIds: ['blood-glucose', 'loc'],
    rationale:
      'A blood glucose of 32 mg/dL with unresponsiveness in a patient on insulin and sulfonylurea (glipizide) confirms severe hypoglycemia. Because the patient cannot swallow safely, IV dextrose 50% (25 g) is the first-line treatment — it rapidly raises blood glucose and restores consciousness. Oral glucose is contraindicated in an unconscious patient due to aspiration risk. Holding insulin and notifying the provider prevents recurrence and triggers a medication review. Blood glucose must be rechecked every 15 minutes until consistently above 100 mg/dL, and level of consciousness is monitored to confirm neurological recovery and guide safe resumption of oral intake.',
  },
];
