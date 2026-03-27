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
  {
    id: 'stemi',
    title: 'ST-Elevation Myocardial Infarction (STEMI)',
    vignette:
      'A 61-year-old male presents to the emergency department with crushing substernal chest pain radiating to his left jaw and arm, onset 45 minutes ago. He is diaphoretic and nauseated. Vital signs: BP 102/68 mmHg, HR 54 bpm, RR 20 breaths/min, O₂ saturation 93% on room air. 12-lead ECG shows 3 mm ST elevation in leads II, III, and aVF with reciprocal ST depression in leads I and aVL. He has no known drug allergies.',
    conditions: [
      { id: 'unstable-angina', text: 'Unstable angina' },
      { id: 'stemi', text: 'ST-elevation myocardial infarction (inferior STEMI)' },
      { id: 'aortic-dissection', text: 'Aortic dissection' },
      { id: 'pericarditis', text: 'Acute pericarditis' },
    ],
    actions: [
      { id: 'aspirin', text: 'Administer aspirin 325 mg PO (chewed) immediately' },
      { id: 'activate-cath-lab', text: 'Activate the cardiac catheterization laboratory for primary PCI' },
      { id: 'nitroglycerin-sl', text: 'Administer sublingual nitroglycerin × 3 doses before notifying provider' },
      { id: 'hold-antiplatelet', text: 'Hold antiplatelet therapy and await cardiology consultation' },
      { id: 'ice-pack', text: 'Apply ice pack to chest for pain relief' },
    ],
    parameters: [
      { id: 'ecg-rhythm', text: 'Continuous ECG monitoring and 12-lead repeat' },
      { id: 'troponin', text: 'Serial troponin levels' },
      { id: 'bp', text: 'Blood pressure' },
      { id: 'urine-output', text: 'Urine output' },
      { id: 'temperature', text: 'Temperature' },
    ],
    correctConditionId: 'stemi',
    correctActionIds: ['aspirin', 'activate-cath-lab'],
    correctParameterIds: ['ecg-rhythm', 'troponin'],
    rationale:
      'Crushing chest pain with inferior ST elevation (leads II, III, aVF) and reciprocal changes confirms an inferior STEMI. Aspirin 325 mg (chewed for rapid absorption) irreversibly inhibits platelet aggregation and is the first drug given in any ACS. Primary PCI — balloon time goal < 90 minutes from first medical contact — is the definitive treatment and must be activated immediately. Continuous ECG monitoring detects life-threatening dysrhythmias (e.g., complete heart block, ventricular fibrillation) common in inferior STEMI, and serial troponin levels confirm myocardial necrosis extent and guide prognosis.',
  },
  {
    id: 'asthma-exacerbation',
    title: 'Acute Severe Asthma Exacerbation',
    vignette:
      'A 19-year-old female with a history of moderate persistent asthma presents to urgent care after using her rescue inhaler six times in the past 4 hours without relief. She can only speak in 2–3 word sentences. Accessory muscle use is prominent, with audible expiratory wheeze. Vital signs: HR 118 bpm, RR 32 breaths/min, BP 128/76 mmHg, O₂ saturation 88% on room air, peak expiratory flow 35% of her personal best.',
    conditions: [
      { id: 'copd-exacerbation', text: 'COPD exacerbation' },
      { id: 'anaphylaxis', text: 'Anaphylaxis with bronchospasm' },
      { id: 'asthma-exacerbation', text: 'Acute severe asthma exacerbation' },
      { id: 'vocal-cord-dysfunction', text: 'Vocal cord dysfunction' },
    ],
    actions: [
      { id: 'nebulized-albuterol', text: 'Administer continuous nebulized albuterol and ipratropium as prescribed' },
      { id: 'systemic-steroid', text: 'Administer IV or oral systemic corticosteroid as prescribed' },
      { id: 'supplemental-o2', text: 'Apply supplemental oxygen to maintain saturation ≥ 92%' },
      { id: 'sedation', text: 'Administer IV sedation and prepare for elective intubation' },
      { id: 'restrict-activity', text: 'Place patient on strict bed rest and dim the lights' },
    ],
    parameters: [
      { id: 'peak-flow', text: 'Peak expiratory flow rate' },
      { id: 'o2-sat', text: 'Oxygen saturation' },
      { id: 'respiratory-rate', text: 'Respiratory rate and work of breathing' },
      { id: 'heart-rate', text: 'Heart rate' },
      { id: 'temperature', text: 'Temperature' },
    ],
    correctConditionId: 'asthma-exacerbation',
    correctActionIds: ['nebulized-albuterol', 'systemic-steroid'],
    correctParameterIds: ['peak-flow', 'o2-sat'],
    rationale:
      'Peak flow 35% of personal best, inability to complete sentences, profound hypoxia (O₂ sat 88%), and failure to respond to six rescue inhaler doses define a severe acute asthma exacerbation. Continuous nebulized albuterol (short-acting β₂ agonist) and ipratropium (anticholinergic) produce additive bronchodilation and are the cornerstones of acute treatment. Systemic corticosteroids reduce airway inflammation and decrease the rate of relapse; they must be given early. Peak flow is the objective measure of airflow obstruction severity and response to treatment, and oxygen saturation guides supplemental oxygen titration to prevent hypoxic respiratory failure.',
  },
  {
    id: 'copd-exacerbation',
    title: 'Acute COPD Exacerbation',
    vignette:
      'A 70-year-old male with GOLD Stage III COPD presents with a 3-day history of increased dyspnea, productive cough with green sputum, and decreased exercise tolerance. He is a 50-pack-year smoker. Vital signs: HR 104 bpm, RR 26 breaths/min, BP 144/88 mmHg, O₂ saturation 82% on room air. ABG: pH 7.32, PaCO₂ 58 mmHg, PaO₂ 46 mmHg. Chest auscultation reveals prolonged expiration and diffuse expiratory wheeze.',
    conditions: [
      { id: 'pneumonia', text: 'Community-acquired pneumonia' },
      { id: 'copd-exacerbation', text: 'Acute COPD exacerbation' },
      { id: 'pulmonary-edema', text: 'Acute cardiogenic pulmonary edema' },
      { id: 'pe', text: 'Pulmonary embolism' },
    ],
    actions: [
      { id: 'controlled-o2', text: 'Apply controlled low-flow oxygen (target SpO₂ 88–92%)' },
      { id: 'nippv', text: 'Initiate non-invasive positive pressure ventilation (BiPAP) per protocol' },
      { id: 'high-flow-o2', text: 'Apply 100% non-rebreather mask oxygen to rapidly correct hypoxia' },
      { id: 'bronchodilators', text: 'Administer nebulized short-acting bronchodilators as prescribed' },
      { id: 'restrict-fluids', text: 'Restrict all IV fluids to prevent fluid overload' },
    ],
    parameters: [
      { id: 'abg', text: 'Arterial blood gas (pH, PaCO₂, PaO₂)' },
      { id: 'o2-sat', text: 'Oxygen saturation (target 88–92%)' },
      { id: 'respiratory-rate', text: 'Respiratory rate and breathing effort' },
      { id: 'temperature', text: 'Temperature' },
      { id: 'urine-output', text: 'Urine output' },
    ],
    correctConditionId: 'copd-exacerbation',
    correctActionIds: ['controlled-o2', 'nippv'],
    correctParameterIds: ['abg', 'o2-sat'],
    rationale:
      'Increased purulent sputum, worsening dyspnea, hypercapnia (PaCO₂ 58 mmHg), and acidosis (pH 7.32) in a patient with known severe COPD indicate an acute exacerbation with hypercapnic respiratory failure. In COPD, supplemental oxygen must be titrated carefully to a target SpO₂ of 88–92% — excessive oxygen abolishes hypoxic respiratory drive and worsens hypercapnia. BiPAP significantly reduces the need for intubation, decreases work of breathing, and improves gas exchange by providing inspiratory pressure support and PEEP. Serial ABGs are the gold standard for trending ventilatory failure, and SpO₂ guides real-time oxygen titration at the bedside.',
  },
  {
    id: 'tension-pneumothorax',
    title: 'Tension Pneumothorax',
    vignette:
      'A 23-year-old male is in the trauma bay following a high-speed motor vehicle collision with suspected blunt chest trauma. He was intubated in the field. The ventilator alarms are indicating high peak airway pressures. His neck veins are distended and the trachea is deviated to the right. Vital signs: HR 138 bpm, BP 74/40 mmHg, O₂ saturation 78%, with absent breath sounds over the left lung field.',
    conditions: [
      { id: 'hemothorax', text: 'Massive hemothorax' },
      { id: 'tension-pneumothorax', text: 'Tension pneumothorax' },
      { id: 'cardiac-tamponade', text: 'Cardiac tamponade' },
      { id: 'ards', text: 'ARDS secondary to trauma' },
    ],
    actions: [
      { id: 'needle-decompression', text: 'Prepare for immediate needle thoracostomy (2nd intercostal space, MCL)' },
      { id: 'notify-provider', text: 'Notify provider immediately and prepare for chest tube insertion' },
      { id: 'chest-xray', text: 'Order portable chest X-ray before any intervention' },
      { id: 'increase-peep', text: 'Increase PEEP on the ventilator to improve oxygenation' },
      { id: 'fluid-bolus', text: 'Administer a 2 L IV crystalloid bolus rapidly' },
    ],
    parameters: [
      { id: 'bp', text: 'Blood pressure' },
      { id: 'o2-sat', text: 'Oxygen saturation' },
      { id: 'breath-sounds', text: 'Bilateral breath sounds' },
      { id: 'peak-airway-pressure', text: 'Peak airway pressure (ventilator)' },
      { id: 'heart-rate', text: 'Heart rate' },
    ],
    correctConditionId: 'tension-pneumothorax',
    correctActionIds: ['needle-decompression', 'notify-provider'],
    correctParameterIds: ['bp', 'o2-sat'],
    rationale:
      'Tracheal deviation away from the affected side, absent unilateral breath sounds, JVD, hypotension, and rising airway pressures after intubation are pathognomonic for tension pneumothorax — a life-threatening emergency that causes obstructive shock by shifting mediastinal structures and compressing the heart. Needle thoracostomy (2nd ICS, mid-clavicular line) is the immediate life-saving intervention and must not be delayed for imaging. The provider must be notified concurrently for definitive chest tube insertion. Blood pressure reflects hemodynamic collapse, and oxygen saturation confirms the degree of respiratory compromise — both must be monitored continuously.',
  },
  {
    id: 'upper-gi-bleed',
    title: 'Acute Upper Gastrointestinal Bleed',
    vignette:
      'A 57-year-old male with a history of peptic ulcer disease and daily NSAID use presents with two episodes of hematemesis (bright red blood) and melena for 12 hours. He feels lightheaded when standing. Vital signs supine: BP 104/68 mmHg, HR 112 bpm; sitting: BP 88/56 mmHg, HR 128 bpm. O₂ saturation 96% on room air. Hemoglobin 7.2 g/dL. He has no IV access.',
    conditions: [
      { id: 'lower-gi-bleed', text: 'Lower GI bleed (diverticular)' },
      { id: 'upper-gi-bleed', text: 'Acute upper gastrointestinal bleed (peptic ulcer)' },
      { id: 'esophageal-varices', text: 'Bleeding esophageal varices' },
      { id: 'mallory-weiss', text: 'Mallory-Weiss tear' },
    ],
    actions: [
      { id: 'large-bore-iv', text: 'Insert two large-bore (≥ 18-gauge) peripheral IV catheters' },
      { id: 'iv-ppi', text: 'Initiate IV proton pump inhibitor infusion as prescribed' },
      { id: 'transfuse', text: 'Prepare for packed red blood cell transfusion per protocol' },
      { id: 'oral-antacids', text: 'Administer oral antacids and clear liquids for stomach neutralization' },
      { id: 'enema', text: 'Administer a cleansing enema to clear melena' },
    ],
    parameters: [
      { id: 'hemoglobin', text: 'Hemoglobin and hematocrit (serial)' },
      { id: 'orthostatic-bp', text: 'Orthostatic blood pressure and heart rate' },
      { id: 'stool-character', text: 'Stool character and frequency (melena, hematochezia)' },
      { id: 'urine-output', text: 'Urine output' },
      { id: 'temperature', text: 'Temperature' },
    ],
    correctConditionId: 'upper-gi-bleed',
    correctActionIds: ['large-bore-iv', 'iv-ppi'],
    correctParameterIds: ['hemoglobin', 'orthostatic-bp'],
    rationale:
      'Hematemesis, melena, a hemoglobin of 7.2 g/dL, and significant orthostatic hypotension (systolic drop > 20 mmHg) in a patient on NSAIDs with a peptic ulcer history confirm a significant acute upper GI bleed. Large-bore IV access is the immediate priority to enable rapid volume resuscitation and transfusion. IV PPI infusion (e.g., pantoprazole) reduces gastric acidity, stabilizes clot formation at the ulcer base, and is standard pre-endoscopy therapy. Serial hemoglobin and hematocrit track blood loss magnitude and transfusion thresholds, while orthostatic vital signs quantify volume depletion — a key indicator of hemodynamic instability.',
  },
  {
    id: 'hepatic-encephalopathy',
    title: 'Hepatic Encephalopathy',
    vignette:
      'A 52-year-old male with known cirrhosis secondary to chronic alcohol use is brought in by his wife for increasing confusion and inappropriate behavior over 3 days. She reports he has not been taking his lactulose. Physical examination reveals asterixis, jaundice, and a distended abdomen with a fluid wave. Vital signs: T 37.6°C, HR 98 bpm, BP 108/64 mmHg, O₂ saturation 95%. Serum ammonia is 142 µmol/L.',
    conditions: [
      { id: 'alcohol-withdrawal', text: 'Alcohol withdrawal delirium' },
      { id: 'hepatic-encephalopathy', text: 'Hepatic encephalopathy' },
      { id: 'subdural-hematoma', text: 'Subdural hematoma' },
      { id: 'meningitis', text: 'Bacterial meningitis' },
    ],
    actions: [
      { id: 'lactulose', text: 'Administer lactulose per provider order to promote ammonia excretion' },
      { id: 'fall-precautions', text: 'Implement fall precautions and reorient patient frequently' },
      { id: 'high-protein-diet', text: 'Initiate a high-protein diet to support hepatic regeneration' },
      { id: 'rifaximin', text: 'Confirm rifaximin is prescribed for maintenance therapy' },
      { id: 'restraints', text: 'Apply wrist restraints to prevent patient from removing IV lines' },
    ],
    parameters: [
      { id: 'ammonia', text: 'Serum ammonia level' },
      { id: 'mental-status', text: 'Mental status and orientation (West Haven grade)' },
      { id: 'bowel-movements', text: 'Bowel movement frequency and character' },
      { id: 'temperature', text: 'Temperature' },
      { id: 'urine-output', text: 'Urine output' },
    ],
    correctConditionId: 'hepatic-encephalopathy',
    correctActionIds: ['lactulose', 'fall-precautions'],
    correctParameterIds: ['ammonia', 'mental-status'],
    rationale:
      'Asterixis, confusion, elevated ammonia (142 µmol/L), and cirrhosis with a clear precipitant (lactulose non-compliance) confirm hepatic encephalopathy. Lactulose acidifies the colon, traps ammonia as ammonium, and promotes its excretion through diarrhea — it is the primary pharmacologic treatment. Fall precautions are essential because altered mentation significantly elevates injury risk; reorientation preserves dignity and reduces agitation. Serum ammonia correlates with encephalopathy severity (though imperfectly), and tracking mental status using a validated grading tool guides treatment response and escalation decisions.',
  },
  {
    id: 'opioid-overdose',
    title: 'Opioid Overdose',
    vignette:
      'A 34-year-old male is found unresponsive by a bystander in a public restroom. He is brought by EMS with pinpoint pupils bilaterally, shallow respirations, and cyanotic lips. A used syringe is found nearby. Vital signs: RR 4 breaths/min, HR 56 bpm, BP 88/50 mmHg, O₂ saturation unable to obtain accurately, GCS 4 (E1V1M2). He has no known medical history on file.',
    conditions: [
      { id: 'hypoglycemia', text: 'Severe hypoglycemia' },
      { id: 'opioid-overdose', text: 'Opioid overdose (respiratory depression)' },
      { id: 'traumatic-brain-injury', text: 'Traumatic brain injury' },
      { id: 'alcohol-intoxication', text: 'Severe alcohol intoxication' },
    ],
    actions: [
      { id: 'naloxone', text: 'Administer naloxone (Narcan) IV/IM/intranasal per protocol' },
      { id: 'bag-mask-ventilation', text: 'Initiate bag-mask ventilation to support respiratory effort' },
      { id: 'activated-charcoal', text: 'Administer activated charcoal for GI decontamination' },
      { id: 'restraints', text: 'Apply restraints in anticipation of agitation after reversal' },
      { id: 'flumazenil', text: 'Administer flumazenil IV for benzodiazepine reversal' },
    ],
    parameters: [
      { id: 'respiratory-rate', text: 'Respiratory rate and effort' },
      { id: 'o2-sat', text: 'Oxygen saturation' },
      { id: 'loc', text: 'Level of consciousness (GCS)' },
      { id: 'pupil-response', text: 'Pupillary size and reactivity' },
      { id: 'heart-rate', text: 'Heart rate' },
    ],
    correctConditionId: 'opioid-overdose',
    correctActionIds: ['naloxone', 'bag-mask-ventilation'],
    correctParameterIds: ['respiratory-rate', 'o2-sat'],
    rationale:
      'Pinpoint pupils, apnea (RR 4), cyanosis, and GCS 4 in the context of a found syringe are the classic triad of opioid toxidrome. Naloxone competitively displaces opioids from μ-receptors and rapidly reverses respiratory depression; it can be given IV, IM, or intranasally. Because naloxone\'s half-life (30–90 minutes) is shorter than most opioids, repeat dosing and observation for re-narcotization are essential. Bag-mask ventilation is the concurrent life-sustaining intervention to prevent anoxic brain injury while naloxone is taking effect. Respiratory rate and oxygen saturation are the primary parameters that confirm reversal of respiratory depression and guide repeat naloxone dosing.',
  },
  {
    id: 'hyperkalemia',
    title: 'Severe Hyperkalemia',
    vignette:
      'A 64-year-old male with end-stage renal disease on hemodialysis missed his last two dialysis sessions. He presents with generalized muscle weakness and palpitations. Vital signs: HR 44 bpm (irregular), BP 156/92 mmHg, RR 18 breaths/min, O₂ saturation 97%. 12-lead ECG shows absent P waves, widened QRS complexes (0.18 seconds), and peaked T waves. Serum potassium is 7.2 mEq/L.',
    conditions: [
      { id: 'complete-heart-block', text: 'Complete heart block (primary)' },
      { id: 'hyperkalemia', text: 'Severe hyperkalemia with cardiac toxicity' },
      { id: 'hypokalemia', text: 'Hypokalemia-induced dysrhythmia' },
      { id: 'hypothyroidism', text: 'Severe hypothyroidism (myxedema)' },
    ],
    actions: [
      { id: 'calcium-gluconate', text: 'Administer IV calcium gluconate to stabilize the cardiac membrane' },
      { id: 'insulin-dextrose', text: 'Administer IV regular insulin with dextrose to shift potassium intracellularly' },
      { id: 'potassium-supplement', text: 'Administer IV potassium supplement to correct dysrhythmia' },
      { id: 'sodium-bicarb', text: 'Administer IV sodium bicarbonate to alkalinize serum' },
      { id: 'hold-diuretics', text: 'Hold all diuretic medications and restrict IV fluids' },
    ],
    parameters: [
      { id: 'serum-potassium', text: 'Serum potassium level' },
      { id: 'ecg', text: 'Continuous ECG monitoring' },
      { id: 'blood-glucose', text: 'Blood glucose (after insulin administration)' },
      { id: 'urine-output', text: 'Urine output' },
      { id: 'bp', text: 'Blood pressure' },
    ],
    correctConditionId: 'hyperkalemia',
    correctActionIds: ['calcium-gluconate', 'insulin-dextrose'],
    correctParameterIds: ['serum-potassium', 'ecg'],
    rationale:
      'Peaked T waves, widened QRS, absent P waves, and bradycardia with a potassium of 7.2 mEq/L in a dialysis patient who missed sessions confirm life-threatening hyperkalemia with cardiac toxicity. IV calcium gluconate does not lower potassium but immediately stabilizes the myocardial membrane (onset within minutes), reducing the risk of ventricular fibrillation. Insulin with dextrose shifts potassium into cells, lowering serum potassium within 15–30 minutes, buying time for definitive removal (dialysis or kayexalate). Continuous ECG monitoring tracks cardiac toxicity resolution, and serial potassium levels guide whether interventions are sufficient and when dialysis is required.',
  },
  {
    id: 'pneumonia',
    title: 'Community-Acquired Pneumonia (CAP)',
    vignette:
      'A 78-year-old female residing in an assisted living facility presents with a 4-day history of productive cough with rust-colored sputum, fever, and increasing confusion. Her caregiver notes she has not eaten in 2 days. Vital signs: T 39.4°C, HR 106 bpm, RR 24 breaths/min, BP 102/64 mmHg, O₂ saturation 88% on room air. Chest auscultation reveals dullness to percussion and bronchial breath sounds over the right lower lobe.',
    conditions: [
      { id: 'pulmonary-tb', text: 'Pulmonary tuberculosis' },
      { id: 'lung-cancer', text: 'Lung cancer with post-obstructive pneumonia' },
      { id: 'pneumonia', text: 'Community-acquired pneumonia (CAP)' },
      { id: 'adhf', text: 'Acute decompensated heart failure' },
    ],
    actions: [
      { id: 'sputum-culture', text: 'Obtain sputum culture and blood cultures before starting antibiotics' },
      { id: 'empiric-antibiotics', text: 'Administer empiric IV antibiotics per hospital protocol within 1 hour' },
      { id: 'supplemental-o2', text: 'Apply supplemental oxygen to maintain SpO₂ ≥ 92%' },
      { id: 'withhold-antibiotics', text: 'Withhold antibiotics until cultures result to ensure targeted therapy' },
      { id: 'incentive-spirometry', text: 'Instruct patient on incentive spirometry hourly while awake' },
    ],
    parameters: [
      { id: 'o2-sat', text: 'Oxygen saturation' },
      { id: 'temperature', text: 'Temperature trend' },
      { id: 'respiratory-rate', text: 'Respiratory rate' },
      { id: 'wbc', text: 'White blood cell count' },
      { id: 'bp', text: 'Blood pressure' },
    ],
    correctConditionId: 'pneumonia',
    correctActionIds: ['sputum-culture', 'empiric-antibiotics'],
    correctParameterIds: ['o2-sat', 'temperature'],
    rationale:
      'Fever, productive rust-colored sputum, lobar consolidation findings, confusion, and hypoxia in an elderly patient from a congregate setting define community-acquired pneumonia with sepsis criteria. Culture specimens must be obtained before the first antibiotic dose to preserve diagnostic yield and guide de-escalation. Empiric IV antibiotic therapy must be initiated within one hour of sepsis recognition per Surviving Sepsis guidelines. Oxygen saturation is monitored continuously because hypoxemia (SpO₂ 88%) threatens end-organ perfusion, and temperature trend is the primary indicator of antibiotic response — failure to defervesce within 48–72 hours suggests treatment failure or an alternative diagnosis.',
  },
  {
    id: 'thyroid-storm',
    title: 'Thyroid Storm',
    vignette:
      'A 38-year-old female with known Graves\' disease presents to the ED after stopping her propylthiouracil 2 weeks ago. She is agitated, tremulous, and complains of palpitations. Her skin is flushed and diaphoretic. Vital signs: T 40.2°C, HR 158 bpm (irregular), RR 28 breaths/min, BP 168/88 mmHg. She experienced a seizure en route and has vomited twice. TSH is undetectable; free T4 is critically elevated.',
    conditions: [
      { id: 'serotonin-syndrome', text: 'Serotonin syndrome' },
      { id: 'thyroid-storm', text: 'Thyroid storm (thyrotoxic crisis)' },
      { id: 'cocaine-intoxication', text: 'Cocaine intoxication' },
      { id: 'neuroleptic-malignant', text: 'Neuroleptic malignant syndrome' },
    ],
    actions: [
      { id: 'ptu', text: 'Administer propylthiouracil (PTU) as prescribed to block thyroid hormone synthesis' },
      { id: 'beta-blocker', text: 'Administer IV propranolol as prescribed to control heart rate and sympathetic symptoms' },
      { id: 'cooling-measures', text: 'Initiate active external cooling measures for hyperthermia' },
      { id: 'aspirin', text: 'Administer aspirin for fever reduction' },
      { id: 'levothyroxine', text: 'Administer levothyroxine to replace depleted thyroid hormone' },
    ],
    parameters: [
      { id: 'temperature', text: 'Core temperature (continuous)' },
      { id: 'heart-rate', text: 'Heart rate and cardiac rhythm' },
      { id: 'mental-status', text: 'Mental status and neurologic status' },
      { id: 'free-t4', text: 'Free T4 and TSH levels' },
      { id: 'bp', text: 'Blood pressure' },
    ],
    correctConditionId: 'thyroid-storm',
    correctActionIds: ['ptu', 'beta-blocker'],
    correctParameterIds: ['temperature', 'heart-rate'],
    rationale:
      'Hyperpyrexia (T 40.2°C), tachyarrhythmia (HR 158, irregular — likely atrial fibrillation), agitation, diaphoresis, seizure, and undetectable TSH in a patient who stopped antithyroid medication meets criteria for thyroid storm. PTU is the preferred antithyroid agent in thyroid storm because it also inhibits peripheral conversion of T4 to active T3; it must be given before iodide therapy. IV propranolol rapidly controls the adrenergic manifestations (tachycardia, hypertension, tremor) and is particularly important because uncontrolled tachycardia risks high-output cardiac failure. Note: aspirin is contraindicated in thyroid storm because it displaces thyroid hormone from binding proteins, worsening toxicity. Temperature and heart rate are the primary parameters reflecting treatment response.',
  },
  {
    id: 'adrenal-crisis',
    title: 'Adrenal Crisis',
    vignette:
      'A 44-year-old female with a known history of primary adrenal insufficiency (Addison\'s disease) is brought to the ED by her husband after a week of progressive nausea, vomiting, diarrhea, and weakness. She ran out of her hydrocortisone 4 days ago. Vital signs: T 38.2°C, HR 128 bpm, BP 72/44 mmHg, RR 22 breaths/min, O₂ saturation 97%. Sodium 124 mEq/L, potassium 6.1 mEq/L, glucose 52 mg/dL.',
    conditions: [
      { id: 'septic-shock', text: 'Septic shock' },
      { id: 'adrenal-crisis', text: 'Adrenal crisis (acute adrenal insufficiency)' },
      { id: 'dka', text: 'Diabetic ketoacidosis' },
      { id: 'gi-illness', text: 'Severe viral gastroenteritis with dehydration' },
    ],
    actions: [
      { id: 'hydrocortisone-iv', text: 'Administer IV hydrocortisone 100 mg bolus immediately as prescribed' },
      { id: 'iv-dextrose-saline', text: 'Initiate IV 0.9% normal saline with dextrose for volume resuscitation and glucose correction' },
      { id: 'oral-hydrocortisone', text: 'Administer oral hydrocortisone and advance to liquid diet' },
      { id: 'vasopressors', text: 'Start vasopressors as first-line treatment for hypotension' },
      { id: 'insulin', text: 'Administer IV insulin for hyperkalemia management' },
    ],
    parameters: [
      { id: 'bp', text: 'Blood pressure' },
      { id: 'blood-glucose', text: 'Blood glucose' },
      { id: 'sodium', text: 'Serum sodium' },
      { id: 'potassium', text: 'Serum potassium' },
      { id: 'temperature', text: 'Temperature' },
    ],
    correctConditionId: 'adrenal-crisis',
    correctActionIds: ['hydrocortisone-iv', 'iv-dextrose-saline'],
    correctParameterIds: ['bp', 'blood-glucose'],
    rationale:
      'Hyponatremia (124 mEq/L), hyperkalemia (6.1 mEq/L), hypoglycemia (52 mg/dL), and hypotension in a patient with known Addison\'s disease who ran out of corticosteroids confirms adrenal crisis — a life-threatening emergency caused by cortisol deficiency. IV hydrocortisone 100 mg must be given immediately; it acts as both glucocorticoid and mineralocorticoid at this dose. IV isotonic saline with dextrose corrects volume depletion, hyponatremia, and hypoglycemia simultaneously. Vasopressors will not work without cortisol replacement and should not be given first-line. Blood pressure is the primary hemodynamic target, and blood glucose must be corrected and maintained to prevent neurologic injury.',
  },
  {
    id: 'bacterial-meningitis',
    title: 'Bacterial Meningitis',
    vignette:
      'A 21-year-old male college student is brought to the ED with a 12-hour history of severe headache, high fever, photophobia, and neck stiffness. His roommate reports he is becoming increasingly confused. Vital signs: T 39.8°C, HR 118 bpm, BP 102/66 mmHg, RR 20 breaths/min, O₂ saturation 97%. Examination reveals a non-blanching petechial rash on his trunk and lower extremities. Kernig\'s and Brudzinski\'s signs are positive.',
    conditions: [
      { id: 'viral-meningitis', text: 'Viral (aseptic) meningitis' },
      { id: 'bacterial-meningitis', text: 'Bacterial meningitis with meningococcemia' },
      { id: 'subarachnoid-hemorrhage', text: 'Subarachnoid hemorrhage' },
      { id: 'migraine', text: 'Complicated migraine with meningismus' },
    ],
    actions: [
      { id: 'blood-cultures', text: 'Obtain blood cultures immediately before starting antibiotics' },
      { id: 'empiric-antibiotics-meningitis', text: 'Administer empiric IV ceftriaxone and vancomycin as prescribed without delay' },
      { id: 'dexamethasone', text: 'Administer IV dexamethasone before or with the first antibiotic dose as prescribed' },
      { id: 'lumbar-puncture-first', text: 'Perform lumbar puncture before any antibiotic administration' },
      { id: 'isolation', text: 'Implement droplet isolation precautions' },
    ],
    parameters: [
      { id: 'temperature', text: 'Temperature' },
      { id: 'neurologic-status', text: 'Neurologic status (GCS, confusion, seizure activity)' },
      { id: 'bp', text: 'Blood pressure' },
      { id: 'rash', text: 'Rash character and progression (petechiae/purpura)' },
      { id: 'urine-output', text: 'Urine output' },
    ],
    correctConditionId: 'bacterial-meningitis',
    correctActionIds: ['blood-cultures', 'empiric-antibiotics-meningitis'],
    correctParameterIds: ['temperature', 'neurologic-status'],
    rationale:
      'The classic triad of fever, neck stiffness, and altered mental status combined with a non-blanching petechial rash (suggesting meningococcemia) and positive meningeal signs is bacterial meningitis until proven otherwise. Blood cultures must be drawn immediately, but antibiotics must not be delayed for lumbar puncture if there is evidence of elevated ICP, altered consciousness, or rash. Empiric therapy (ceftriaxone + vancomycin) covers the most likely organisms (N. meningitidis, S. pneumoniae). Dexamethasone given before or with the first antibiotic dose reduces inflammation-mediated complications (hearing loss, cerebral edema). Temperature and neurologic status are the primary parameters reflecting disease severity and treatment response.',
  },
  {
    id: 'alcohol-withdrawal',
    title: 'Alcohol Withdrawal Delirium (Delirium Tremens)',
    vignette:
      'A 48-year-old male with chronic alcohol use disorder was admitted 3 days ago for pneumonia. He reports his last drink was the morning of admission. The nurse notes he is now profusely diaphoretic, agitated, and grabbing at things that are not there. Vital signs: T 38.8°C, HR 138 bpm, BP 172/104 mmHg, RR 24 breaths/min, O₂ saturation 96%. CIWA-Ar score is 28. He has one peripheral IV.',
    conditions: [
      { id: 'septic-delirium', text: 'Delirium secondary to worsening sepsis' },
      { id: 'alcohol-withdrawal', text: 'Alcohol withdrawal delirium (delirium tremens)' },
      { id: 'hepatic-encephalopathy', text: 'Hepatic encephalopathy' },
      { id: 'stimulant-intoxication', text: 'Stimulant intoxication' },
    ],
    actions: [
      { id: 'lorazepam-iv', text: 'Administer IV lorazepam per CIWA-Ar protocol as prescribed' },
      { id: 'thiamine-iv', text: 'Administer IV thiamine 100 mg before any dextrose-containing fluids' },
      { id: 'haloperidol', text: 'Administer IV haloperidol as the first-line agent for agitation' },
      { id: 'seizure-precautions', text: 'Implement seizure precautions and continuous cardiac monitoring' },
      { id: 'restraints-first', text: 'Apply physical restraints first to prevent self-injury before calling provider' },
    ],
    parameters: [
      { id: 'ciwa-score', text: 'CIWA-Ar score (every 1–2 hours)' },
      { id: 'heart-rate', text: 'Heart rate and blood pressure' },
      { id: 'temperature', text: 'Temperature' },
      { id: 'mental-status', text: 'Mental status (orientation, hallucinations)' },
      { id: 'o2-sat', text: 'Oxygen saturation' },
    ],
    correctConditionId: 'alcohol-withdrawal',
    correctActionIds: ['lorazepam-iv', 'thiamine-iv'],
    correctParameterIds: ['ciwa-score', 'heart-rate'],
    rationale:
      'A CIWA-Ar score of 28, visual hallucinations, diaphoresis, tachycardia, and hypertension on day 3 of hospitalization in a patient with alcohol use disorder confirm delirium tremens — the most severe and life-threatening form of alcohol withdrawal, carrying up to 15% mortality if untreated. IV benzodiazepines (lorazepam) are the only evidence-based first-line treatment; they cross-react at GABA receptors to suppress CNS hyperexcitability and prevent seizures. Thiamine must be given before any glucose-containing solution because glucose administration can precipitate Wernicke\'s encephalopathy in thiamine-deficient patients. The CIWA-Ar score is the validated tool that drives symptom-triggered dosing, and heart rate and blood pressure reflect the degree of autonomic instability.',
  },
  {
    id: 'acute-pancreatitis',
    title: 'Acute Pancreatitis',
    vignette:
      'A 42-year-old male with a history of heavy alcohol use presents with severe epigastric pain radiating to his back, onset 6 hours ago. He rates the pain 9/10 and reports nausea and two vomiting episodes. Vital signs: T 38.4°C, HR 112 bpm, BP 96/60 mmHg, RR 20 breaths/min, O₂ saturation 95% on room air. Serum lipase is 1,840 U/L (normal < 60 U/L). Hematocrit is 52% (hemoconcentration). He has no IV access.',
    conditions: [
      { id: 'peptic-ulcer', text: 'Perforated peptic ulcer' },
      { id: 'acute-pancreatitis', text: 'Acute pancreatitis' },
      { id: 'mesenteric-ischemia', text: 'Acute mesenteric ischemia' },
      { id: 'cholecystitis', text: 'Acute cholecystitis' },
    ],
    actions: [
      { id: 'iv-fluid-resus', text: 'Initiate aggressive IV lactated Ringer\'s fluid resuscitation (250–500 mL/hr)' },
      { id: 'npo', text: 'Make patient NPO and insert nasogastric tube to suction' },
      { id: 'iv-access-analgesia', text: 'Establish IV access and administer prescribed IV analgesia' },
      { id: 'early-feeding', text: 'Initiate early oral or enteral feeding immediately to reduce inflammation' },
      { id: 'antibiotics', text: 'Administer prophylactic IV antibiotics for all pancreatitis cases' },
    ],
    parameters: [
      { id: 'hematocrit', text: 'Hematocrit and BUN (hemoconcentration markers)' },
      { id: 'lipase', text: 'Serum lipase' },
      { id: 'urine-output', text: 'Urine output (goal ≥ 0.5 mL/kg/hr)' },
      { id: 'pain-score', text: 'Pain score' },
      { id: 'temperature', text: 'Temperature' },
    ],
    correctConditionId: 'acute-pancreatitis',
    correctActionIds: ['iv-fluid-resus', 'iv-access-analgesia'],
    correctParameterIds: ['hematocrit', 'urine-output'],
    rationale:
      'Severe epigastric pain radiating to the back with lipase > 3× the upper limit of normal (1,840 U/L) confirms acute pancreatitis. Hemoconcentration (hematocrit 52%) and hypotension indicate significant third-space fluid loss. Aggressive IV fluid resuscitation with lactated Ringer\'s is the most important early intervention — it reduces the risk of pancreatic necrosis and organ failure. IV access is essential for both fluids and analgesia (morphine or hydromorphone); adequate pain control reduces sympathetic stress. Hematocrit and BUN track the degree of hemoconcentration and guide fluid resuscitation goals; urine output (goal ≥ 0.5 mL/kg/hr) is the bedside indicator of adequate end-organ perfusion.',
  },
  {
    id: 'transfusion-reaction',
    title: 'Acute Hemolytic Transfusion Reaction',
    vignette:
      'A 54-year-old female is receiving her second unit of packed red blood cells for post-operative anemia following a hysterectomy. Approximately 50 mL into the transfusion, she complains of severe lower back pain, chills, and a feeling of "doom." The nurse notes her skin is flushed and she has a new fever. Vital signs (pre-transfusion): T 37.1°C, HR 82, BP 126/78. Current: T 39.0°C, HR 112 bpm, BP 88/54 mmHg, O₂ saturation 94%.',
    conditions: [
      { id: 'febrile-non-hemolytic', text: 'Febrile non-hemolytic transfusion reaction' },
      { id: 'acute-hemolytic', text: 'Acute hemolytic transfusion reaction (ABO incompatibility)' },
      { id: 'transfusion-related-lung-injury', text: 'Transfusion-related acute lung injury (TRALI)' },
      { id: 'allergic-reaction', text: 'Allergic transfusion reaction (urticaria)' },
    ],
    actions: [
      { id: 'stop-transfusion', text: 'Stop the transfusion immediately and keep the IV line open with normal saline' },
      { id: 'notify-blood-bank', text: 'Notify the blood bank and provider; return the blood bag and tubing for analysis' },
      { id: 'slow-transfusion', text: 'Slow the transfusion rate and administer acetaminophen' },
      { id: 'diphenhydramine', text: 'Administer diphenhydramine and continue the transfusion slowly' },
      { id: 'fresh-blood', text: 'Immediately request a replacement unit of blood and restart the transfusion' },
    ],
    parameters: [
      { id: 'urine-output', text: 'Urine output and urine color (hemoglobinuria)' },
      { id: 'bp', text: 'Blood pressure' },
      { id: 'temperature', text: 'Temperature' },
      { id: 'renal-function', text: 'Serum creatinine and BUN' },
      { id: 'hemoglobin', text: 'Hemoglobin and hematocrit' },
    ],
    correctConditionId: 'acute-hemolytic',
    correctActionIds: ['stop-transfusion', 'notify-blood-bank'],
    correctParameterIds: ['urine-output', 'bp'],
    rationale:
      'Severe lower back pain, fever, hypotension, and hemodynamic deterioration after receiving 50 mL of blood are classic signs of an acute hemolytic transfusion reaction, most commonly caused by ABO incompatibility — a life-threatening medical emergency. The transfusion must be stopped immediately to limit further hemolysis, and the IV line is kept open with normal saline (not the blood tubing) for emergency access. The blood bank must be notified immediately and the blood bag returned for repeat crossmatch and direct Coombs testing. Hemolysis leads to hemoglobinuria (red/brown urine) and renal tubular injury, making urine output the primary parameter for detecting acute kidney injury; blood pressure reflects hemodynamic stability in the setting of distributive shock.',
  },
  {
    id: 'preeclampsia',
    title: 'Preeclampsia with Severe Features',
    vignette:
      'A 26-year-old primigravida at 34 weeks gestation presents with a persistent headache, visual disturbances ("floaters"), and epigastric pain for 6 hours. She reports a 4 kg weight gain in the past week. Vital signs: BP 166/112 mmHg (confirmed on repeat), HR 96 bpm, RR 18 breaths/min, O₂ saturation 98%. Laboratory results: platelet count 88,000/µL, AST 98 U/L, ALT 104 U/L, creatinine 1.4 mg/dL, urine protein 4+ on dipstick.',
    conditions: [
      { id: 'gestational-hypertension', text: 'Gestational hypertension (without severe features)' },
      { id: 'preeclampsia', text: 'Preeclampsia with severe features' },
      { id: 'chronic-hypertension', text: 'Chronic hypertension exacerbation' },
      { id: 'hellp-syndrome', text: 'HELLP syndrome without preeclampsia' },
    ],
    actions: [
      { id: 'magnesium-sulfate', text: 'Initiate IV magnesium sulfate for seizure prophylaxis as prescribed' },
      { id: 'antihypertensive', text: 'Administer IV labetalol or hydralazine for acute BP control as prescribed' },
      { id: 'oral-antihypertensive', text: 'Administer oral nifedipine and observe for 4 hours before reassessment' },
      { id: 'encourage-ambulation', text: 'Encourage ambulation to reduce blood pressure naturally' },
      { id: 'restrict-fluids', text: 'Restrict all IV fluids to prevent pulmonary edema' },
    ],
    parameters: [
      { id: 'bp', text: 'Blood pressure (q15 min during acute management)' },
      { id: 'deep-tendon-reflexes', text: 'Deep tendon reflexes and magnesium toxicity signs' },
      { id: 'fetal-heart-rate', text: 'Fetal heart rate pattern' },
      { id: 'urine-protein', text: 'Urine output and proteinuria' },
      { id: 'platelets', text: 'Platelet count and liver enzymes (AST/ALT)' },
    ],
    correctConditionId: 'preeclampsia',
    correctActionIds: ['magnesium-sulfate', 'antihypertensive'],
    correctParameterIds: ['bp', 'deep-tendon-reflexes'],
    rationale:
      'BP ≥ 160/110 mmHg with headache, visual disturbances, epigastric pain, thrombocytopenia (88,000/µL), elevated liver enzymes, and proteinuria at 34 weeks confirms preeclampsia with severe features approaching HELLP syndrome. IV magnesium sulfate is the only evidence-based agent for seizure (eclampsia) prophylaxis and must be initiated immediately. Severe-range blood pressure (≥ 160/110 mmHg) must be treated within 30–60 minutes to prevent maternal stroke. Blood pressure requires monitoring every 15 minutes during acute management. Deep tendon reflexes must be assessed hourly while on magnesium because hypermagnesemia (evidenced by loss of patellar reflex before respiratory depression) can cause respiratory arrest.',
  },
  {
    id: 'sickle-cell-crisis',
    title: 'Sickle Cell Vaso-Occlusive Crisis',
    vignette:
      'A 22-year-old male with sickle cell disease (HbSS) presents to the ED with severe bilateral leg and back pain, rated 10/10, that began 24 hours ago. He recently ran a 5K race in hot weather. Vital signs: T 38.2°C, HR 108 bpm, BP 128/78 mmHg, RR 20 breaths/min, O₂ saturation 92% on room air. Hemoglobin is 6.8 g/dL (baseline 7.5 g/dL). He reports his pain is not controlled by his home ibuprofen.',
    conditions: [
      { id: 'acute-chest-syndrome', text: 'Acute chest syndrome' },
      { id: 'sickle-cell-crisis', text: 'Sickle cell vaso-occlusive pain crisis' },
      { id: 'osteomyelitis', text: 'Osteomyelitis' },
      { id: 'dvt', text: 'Deep vein thrombosis' },
    ],
    actions: [
      { id: 'iv-opioid', text: 'Administer IV opioid analgesia (per weight-based protocol) without delay' },
      { id: 'iv-fluids-sickle', text: 'Initiate IV fluid hydration with isotonic saline' },
      { id: 'supplemental-o2-sickle', text: 'Apply supplemental oxygen to maintain SpO₂ ≥ 95%' },
      { id: 'restrict-activity', text: 'Place patient on strict bed rest and restrict oral fluids' },
      { id: 'nsaids', text: 'Administer high-dose IV NSAIDs as the sole analgesic for sickle cell pain' },
    ],
    parameters: [
      { id: 'pain-score', text: 'Pain score (every 30 minutes until controlled)' },
      { id: 'o2-sat', text: 'Oxygen saturation' },
      { id: 'hemoglobin', text: 'Hemoglobin and reticulocyte count' },
      { id: 'respiratory-rate', text: 'Respiratory rate (monitor for acute chest syndrome)' },
      { id: 'temperature', text: 'Temperature' },
    ],
    correctConditionId: 'sickle-cell-crisis',
    correctActionIds: ['iv-opioid', 'iv-fluids-sickle'],
    correctParameterIds: ['pain-score', 'o2-sat'],
    rationale:
      'Severe pain in a known sickle cell patient following a known trigger (dehydration from heat and exertion) with a hemoglobin drop from baseline confirms a vaso-occlusive pain crisis. IV opioid analgesia must be administered promptly without barriers — undertreated pain is a patient safety issue in sickle cell disease. IV hydration corrects dehydration (a key sickling trigger) and reduces blood viscosity. Oxygen saturation must be monitored closely because hypoxia (SpO₂ < 95%) is both a sickling trigger and an early warning sign of acute chest syndrome — the leading cause of death in sickle cell disease. Pain score guides analgesic titration to a goal of ≤ 4/10.',
  },
  {
    id: 'bowel-obstruction',
    title: 'Small Bowel Obstruction',
    vignette:
      'A 67-year-old female with a history of two prior abdominal surgeries presents with a 48-hour history of crampy abdominal pain, nausea, bilious vomiting, and no flatus or bowel movement. Her abdomen is distended with high-pitched, tinkling bowel sounds. Vital signs: T 37.9°C, HR 104 bpm, BP 108/70 mmHg, RR 18 breaths/min, O₂ saturation 97%. Abdominal X-ray shows multiple air-fluid levels. Sodium 130 mEq/L, potassium 3.0 mEq/L.',
    conditions: [
      { id: 'ileus', text: 'Post-operative ileus' },
      { id: 'bowel-obstruction', text: 'Mechanical small bowel obstruction (adhesions)' },
      { id: 'volvulus', text: 'Sigmoid volvulus' },
      { id: 'appendicitis', text: 'Acute appendicitis with peritonitis' },
    ],
    actions: [
      { id: 'ngt-decompression', text: 'Insert nasogastric tube to low intermittent suction for decompression' },
      { id: 'npo-bowel', text: 'Make patient NPO and initiate IV fluid resuscitation with electrolyte replacement' },
      { id: 'enema', text: 'Administer a high cleansing enema to stimulate bowel movement' },
      { id: 'advance-diet', text: 'Advance to a regular diet to stimulate bowel motility' },
      { id: 'metoclopramide', text: 'Administer IV metoclopramide as a prokinetic agent' },
    ],
    parameters: [
      { id: 'ngt-output', text: 'NGT output volume and character' },
      { id: 'electrolytes', text: 'Serum electrolytes (sodium, potassium, chloride)' },
      { id: 'abdominal-assessment', text: 'Abdominal assessment (distension, bowel sounds, tenderness)' },
      { id: 'urine-output', text: 'Urine output' },
      { id: 'temperature', text: 'Temperature' },
    ],
    correctConditionId: 'bowel-obstruction',
    correctActionIds: ['ngt-decompression', 'npo-bowel'],
    correctParameterIds: ['ngt-output', 'electrolytes'],
    rationale:
      'Crampy abdominal pain, bilious vomiting, obstipation, distension, and air-fluid levels on X-ray in a patient with prior abdominal surgeries is a mechanical small bowel obstruction due to adhesions until proven otherwise. NGT decompression relieves the distension, reduces vomiting, and prevents aspiration while allowing the obstruction to resolve (non-operatively in 60–80% of adhesive SBO cases). NPO status and IV fluid resuscitation correct the significant electrolyte derangements (hyponatremia, hypokalemia) caused by prolonged vomiting and third-spacing. NGT output quantity and character (bilious vs. feculent) guide the decision point between conservative management and surgical intervention; serum electrolytes must be monitored and replaced to prevent dangerous dysrhythmias.',
  },
  {
    id: 'major-burn',
    title: 'Major Burn Injury',
    vignette:
      'A 35-year-old male sustained burns from a house fire. EMS reports he was trapped for approximately 5 minutes. He has burns to his face, anterior chest, abdomen, and both arms — estimated 40% total body surface area (TBSA) with partial- and full-thickness involvement. His eyebrows are singed, voice is hoarse, and carbon deposits are visible around his mouth. Vital signs: HR 128 bpm, BP 116/74 mmHg, RR 28 breaths/min, O₂ saturation 90% on 15 L/min NRB mask.',
    conditions: [
      { id: 'superficial-burns', text: 'Minor superficial burn injury' },
      { id: 'major-burn', text: 'Major burn with suspected inhalation injury' },
      { id: 'co-poisoning', text: 'Carbon monoxide poisoning without significant burns' },
      { id: 'chemical-burn', text: 'Chemical burn injury' },
    ],
    actions: [
      { id: 'airway-burn', text: 'Notify provider immediately and prepare for early endotracheal intubation' },
      { id: 'parkland-formula', text: 'Initiate Parkland formula fluid resuscitation (4 mL × kg × %TBSA with LR)' },
      { id: 'ice-application', text: 'Apply ice packs to burn wounds to reduce pain and tissue injury' },
      { id: 'oral-fluids-burn', text: 'Encourage oral fluids and apply wet dressings to all burn areas' },
      { id: 'foley-burn', text: 'Insert a urinary catheter to monitor urine output accurately' },
    ],
    parameters: [
      { id: 'urine-output-burn', text: 'Urine output (goal 0.5–1 mL/kg/hr in adults)' },
      { id: 'o2-sat-burn', text: 'Oxygen saturation' },
      { id: 'airway-assessment', text: 'Airway and voice quality (hoarseness progression)' },
      { id: 'carboxyhemoglobin', text: 'Carboxyhemoglobin level' },
      { id: 'heart-rate-burn', text: 'Heart rate (fluid resuscitation adequacy)' },
    ],
    correctConditionId: 'major-burn',
    correctActionIds: ['airway-burn', 'parkland-formula'],
    correctParameterIds: ['urine-output-burn', 'o2-sat-burn'],
    rationale:
      'Singed eyebrows, hoarseness, carbon deposits, and hypoxia in a patient with 40% TBSA burns following enclosed-space fire exposure are hallmarks of inhalation injury — the leading cause of mortality in burn patients. Airway edema progresses rapidly; early intubation before complete obstruction is critical because delayed intubation becomes technically impossible as the airway swells shut. The Parkland formula (4 mL × weight in kg × %TBSA burned using lactated Ringer\'s) guides the first 24 hours of resuscitation — half in the first 8 hours from time of injury, half in the next 16 hours. Urine output (0.5–1 mL/kg/hr) is the gold-standard clinical endpoint for fluid resuscitation adequacy; oxygen saturation monitoring reflects respiratory compromise and response to therapy.',
  },
  {
    id: 'febrile-seizure',
    title: 'Pediatric Febrile Seizure',
    vignette:
      'A 2-year-old male is brought to the pediatric emergency department by his parents after witnessing a generalized tonic-clonic seizure lasting approximately 2 minutes that self-terminated. He has no prior seizure history. The parents report he has had a fever and runny nose for 2 days. Currently he appears drowsy but arousable (post-ictal). Vital signs: T 39.6°C (rectal), HR 148 bpm, RR 30 breaths/min, O₂ saturation 97% on room air, weight 13 kg.',
    conditions: [
      { id: 'epilepsy', text: 'First unprovoked seizure / new-onset epilepsy' },
      { id: 'febrile-seizure', text: 'Simple febrile seizure' },
      { id: 'meningitis-peds', text: 'Bacterial meningitis' },
      { id: 'hypocalcemia', text: 'Hypocalcemia-induced seizure' },
    ],
    actions: [
      { id: 'antipyretics', text: 'Administer acetaminophen or ibuprofen for fever reduction' },
      { id: 'seizure-reassessment', text: 'Reassess neurologic status and monitor for seizure recurrence' },
      { id: 'phenobarbital', text: 'Administer prophylactic phenobarbital to prevent recurrence' },
      { id: 'lumbar-puncture-peds', text: 'Perform lumbar puncture on all children with febrile seizures' },
      { id: 'imaging', text: 'Order emergent CT head and MRI brain' },
    ],
    parameters: [
      { id: 'temperature-peds', text: 'Temperature (trending and response to antipyretics)' },
      { id: 'neuro-status-peds', text: 'Neurologic status (level of consciousness, post-ictal recovery)' },
      { id: 'seizure-duration', text: 'Seizure duration and semiology (if recurrence occurs)' },
      { id: 'heart-rate-peds', text: 'Heart rate' },
      { id: 'o2-sat-peds', text: 'Oxygen saturation' },
    ],
    correctConditionId: 'febrile-seizure',
    correctActionIds: ['antipyretics', 'seizure-reassessment'],
    correctParameterIds: ['temperature-peds', 'neuro-status-peds'],
    rationale:
      'A brief (< 15 minutes), generalized, self-terminating seizure in a febrile child aged 6 months–6 years with no neurologic abnormalities is a simple febrile seizure — the most common seizure type in children, affecting 2–5% of this age group. Simple febrile seizures carry no increased risk of epilepsy and do not warrant prophylactic antiepileptic therapy or routine lumbar puncture (unless meningitis signs are present). Antipyretics reduce fever and improve child comfort; fever reduction may lower seizure recurrence risk in this episode. Neurologic status must be reassessed as the child recovers from the post-ictal state — failure to return to baseline within 1 hour warrants further evaluation for meningitis or complex seizure disorder. Temperature trending and neurologic recovery are the primary monitoring parameters.',
  },
  {
    id: 'neutropenic-fever',
    title: 'Neutropenic Fever (Febrile Neutropenia)',
    vignette:
      'A 55-year-old female with breast cancer is receiving her third cycle of doxorubicin and cyclophosphamide chemotherapy. On day 12 of her cycle she develops chills and a fever at home and presents to the oncology clinic. She reports mild shortness of breath but no obvious source of infection. Vital signs: T 38.8°C, HR 108 bpm, BP 110/70 mmHg, RR 22 breaths/min, O₂ saturation 96%. ANC (absolute neutrophil count) is 280 cells/µL.',
    conditions: [
      { id: 'viral-uri', text: 'Viral upper respiratory infection' },
      { id: 'neutropenic-fever', text: 'Febrile neutropenia' },
      { id: 'drug-fever', text: 'Drug fever from chemotherapy' },
      { id: 'transfusion-fever', text: 'Febrile non-hemolytic transfusion reaction' },
    ],
    actions: [
      { id: 'blood-cultures-onc', text: 'Obtain blood cultures from two sites (peripheral and central line if present) before antibiotics' },
      { id: 'empiric-broad-spectrum', text: 'Administer empiric broad-spectrum IV antibiotics (antipseudomonal coverage) within 60 minutes' },
      { id: 'observe-24h', text: 'Observe for 24 hours and start antibiotics only if fever persists' },
      { id: 'antipyretics-only', text: 'Administer acetaminophen and discharge with oral antibiotics' },
      { id: 'granulocyte-csf', text: 'Administer G-CSF immediately as the first-line intervention' },
    ],
    parameters: [
      { id: 'anc', text: 'Absolute neutrophil count (ANC)' },
      { id: 'temperature-onc', text: 'Temperature trend' },
      { id: 'blood-pressure-onc', text: 'Blood pressure (sepsis monitoring)' },
      { id: 'cultures-result', text: 'Blood and urine culture results' },
      { id: 'o2-sat-onc', text: 'Oxygen saturation' },
    ],
    correctConditionId: 'neutropenic-fever',
    correctActionIds: ['blood-cultures-onc', 'empiric-broad-spectrum'],
    correctParameterIds: ['anc', 'temperature-onc'],
    rationale:
      'Febrile neutropenia (temperature ≥ 38.3°C with ANC < 500 cells/µL) is a medical emergency in oncology patients — even a few hours\' delay in antibiotic administration is associated with significantly increased mortality. Blood cultures from peripheral and central sites must be obtained first to establish microbiological diagnosis and guide de-escalation, but antibiotics must be started within 60 minutes of presentation regardless of culture collection status. Empiric antipseudomonal coverage (e.g., piperacillin-tazobactam or cefepime) is required because gram-negative bacteremia, especially with Pseudomonas aeruginosa, is rapidly fatal in immunocompromised patients. The ANC determines the depth of immunosuppression and guides risk stratification, while temperature trending confirms infection and antibiotic response.',
  },
  {
    id: 'autonomic-dysreflexia',
    title: 'Autonomic Dysreflexia',
    vignette:
      'A 31-year-old male with a T4-level complete spinal cord injury is in the rehabilitation unit. The nurse responds to his call light and finds him diaphoretic above the level of injury, with flushing and a pounding headache (8/10). His BP has acutely risen to 198/114 mmHg from his baseline of 102/64 mmHg. His foley catheter drainage bag is noted to be empty despite the last recorded output 3 hours ago.',
    conditions: [
      { id: 'hypertensive-emergency', text: 'Primary hypertensive emergency (unrelated to SCI)' },
      { id: 'autonomic-dysreflexia', text: 'Autonomic dysreflexia' },
      { id: 'pain-response', text: 'Pain-induced sympathetic surge' },
      { id: 'medication-error', text: 'Accidental vasopressor administration' },
    ],
    actions: [
      { id: 'sit-upright', text: 'Sit the patient upright immediately (elevate HOB to 90°)' },
      { id: 'identify-trigger', text: 'Identify and relieve the noxious stimulus (check catheter patency, bladder distension, bowel)' },
      { id: 'antihypertensive-ad', text: 'Administer a rapid-acting antihypertensive (e.g., nitroglycerine paste) per protocol if BP remains elevated after trigger removal' },
      { id: 'lay-flat', text: 'Lay patient flat to increase cerebral perfusion' },
      { id: 'encourage-fluids', text: 'Encourage oral fluid intake to reduce sympathetic tone' },
    ],
    parameters: [
      { id: 'bp-ad', text: 'Blood pressure (continuous, every 2–5 minutes)' },
      { id: 'trigger-identification', text: 'Identification of noxious stimulus (bladder, bowel, skin)' },
      { id: 'headache-severity', text: 'Headache severity' },
      { id: 'heart-rate-ad', text: 'Heart rate (may be bradycardic due to baroreceptor reflex)' },
      { id: 'urine-output-ad', text: 'Urine output after catheter intervention' },
    ],
    correctConditionId: 'autonomic-dysreflexia',
    correctActionIds: ['sit-upright', 'identify-trigger'],
    correctParameterIds: ['bp-ad', 'trigger-identification'],
    rationale:
      'Autonomic dysreflexia is a life-threatening syndrome of massive, uninhibited sympathetic discharge below the level of SCI lesion at T6 or above, triggered by a noxious stimulus (most commonly bladder distension). Severe hypertension (up to 200+ mmHg systolic) can cause hemorrhagic stroke, seizure, or cardiac arrest. The first intervention is sitting the patient upright — gravity reduces venous return and lowers blood pressure immediately. The triggering stimulus must be identified and relieved: a kinked or blocked urinary catheter is the most common cause. If BP remains dangerously elevated after trigger removal, a rapid-acting antihypertensive is required. Continuous BP monitoring (every 2–5 minutes) confirms the response to each intervention, and trigger identification is the essential diagnostic step that determines management.',
  },
  {
    id: 'status-epilepticus',
    title: 'Status Epilepticus',
    vignette:
      'A 45-year-old male with known epilepsy is brought by ambulance after his wife observed him seizing continuously for 8 minutes. He is still seizing on arrival — generalized tonic-clonic activity. She reports he has not taken his phenytoin in 5 days. Vital signs: HR 148 bpm, BP 162/98 mmHg, T 38.6°C, RR 10 (agonal during seizure), O₂ saturation 82% on room air. He has no IV access.',
    conditions: [
      { id: 'psychogenic-seizure', text: 'Psychogenic non-epileptic seizure (PNES)' },
      { id: 'status-epilepticus', text: 'Convulsive status epilepticus' },
      { id: 'syncope', text: 'Convulsive syncope' },
      { id: 'hypoglycemia-seizure', text: 'Hypoglycemic seizure' },
    ],
    actions: [
      { id: 'benzodiazepine-im', text: 'Administer IM midazolam (or IV/rectal benzodiazepine) as first-line anticonvulsant' },
      { id: 'o2-seizure', text: 'Apply supplemental oxygen and ensure airway is positioned safely' },
      { id: 'restraint-seizure', text: 'Apply physical restraints to prevent injury during seizure activity' },
      { id: 'phenytoin-load', text: 'Load IV phenytoin as the immediate first-line therapy before benzodiazepines' },
      { id: 'glucose-check', text: 'Check point-of-care blood glucose immediately' },
    ],
    parameters: [
      { id: 'seizure-cessation', text: 'Seizure cessation (time to termination)' },
      { id: 'o2-sat-seizure', text: 'Oxygen saturation' },
      { id: 'blood-glucose-seizure', text: 'Blood glucose' },
      { id: 'heart-rate-seizure', text: 'Heart rate' },
      { id: 'temperature-seizure', text: 'Temperature' },
    ],
    correctConditionId: 'status-epilepticus',
    correctActionIds: ['benzodiazepine-im', 'o2-seizure'],
    correctParameterIds: ['seizure-cessation', 'o2-sat-seizure'],
    rationale:
      'Continuous generalized tonic-clonic seizure activity lasting ≥ 5 minutes, or two seizures without return to baseline, defines convulsive status epilepticus — a neurological emergency that causes progressive neuronal injury and systemic complications (hypoxia, hyperthermia, acidosis, rhabdomyolysis). IM midazolam is now considered equivalent or superior to IV lorazepam as initial therapy because it can be given without IV access (a common barrier), achieving faster seizure control. Oxygen and airway positioning are concurrent, life-saving priorities because tonic-clonic seizures cause functional apnea and oxygen desaturation (SpO₂ 82%). Blood glucose is checked immediately to exclude hypoglycemia as a reversible cause. Time to seizure cessation is the primary clinical outcome measure; oxygen saturation tracks the hypoxic complication.',
  },
  {
    id: 'neonatal-hypoglycemia',
    title: 'Neonatal Hypoglycemia',
    vignette:
      'A 6-hour-old term male neonate born to a mother with gestational diabetes (GDM) is noted to be jittery and lethargic during his first newborn assessment. He had a weak suck during the initial breastfeeding attempt. A point-of-care heel-stick glucose reads 28 mg/dL. He has mild central cyanosis. Vital signs: HR 168 bpm, RR 64 breaths/min, T 36.7°C (axillary). His weight is 4.2 kg (large for gestational age).',
    conditions: [
      { id: 'neonatal-sepsis', text: 'Neonatal sepsis' },
      { id: 'neonatal-hypoglycemia', text: 'Neonatal hypoglycemia' },
      { id: 'hypocalcemia-neonate', text: 'Neonatal hypocalcemia' },
      { id: 'tthn', text: 'Transient tachypnea of the newborn' },
    ],
    actions: [
      { id: 'dextrose-gel', text: 'Apply 40% dextrose gel to buccal mucosa per neonatal protocol and encourage breastfeeding' },
      { id: 'iv-dextrose-neonate', text: 'Establish IV access and administer a 10% dextrose (D10W) minibolus as prescribed for symptomatic hypoglycemia' },
      { id: 'formula-supplement', text: 'Supplement with formula feeding and recheck glucose in 30 minutes' },
      { id: 'glucagon-neonate', text: 'Administer IM glucagon 1 mg and transfer to NICU' },
      { id: 'wait-feed', text: 'Continue breastfeeding every 30 minutes and recheck glucose in 2 hours' },
    ],
    parameters: [
      { id: 'glucose-neonate', text: 'Blood glucose (per screening protocol, every 1–3 hours until stable)' },
      { id: 'neuro-neonate', text: 'Neurologic signs (jitteriness, lethargy, seizure activity)' },
      { id: 'o2-sat-neonate', text: 'Oxygen saturation and cyanosis' },
      { id: 'feeding-tolerance', text: 'Feeding tolerance and suck strength' },
      { id: 'temperature-neonate', text: 'Temperature (hypothermia worsens hypoglycemia)' },
    ],
    correctConditionId: 'neonatal-hypoglycemia',
    correctActionIds: ['iv-dextrose-neonate', 'dextrose-gel'],
    correctParameterIds: ['glucose-neonate', 'neuro-neonate'],
    rationale:
      'A large-for-gestational-age neonate born to a GDM mother is at high risk for neonatal hypoglycemia due to hyperinsulinism from in utero glucose excess. A glucose of 28 mg/dL with symptoms (jitteriness, lethargy, weak suck, cyanosis) constitutes symptomatic neonatal hypoglycemia requiring immediate intervention. For a symptomatic neonate who cannot feed effectively, a D10W IV minibolus (200 mg/kg = 2 mL/kg) provides rapid glucose delivery; dextrose gel applied to the buccal mucosa is an effective adjunct recommended by AAP for at-risk neonates who can tolerate feeding. Glucose monitoring per protocol (q1–3 hours) is essential because neonates can re-dip rapidly; neurologic status (seizures, altered tone) is monitored because prolonged neonatal hypoglycemia causes permanent brain injury.',
  },
];
