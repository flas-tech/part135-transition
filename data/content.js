/* Authored study + tool content. Sourced from 14 CFR Parts 61/67/91/119/135. */
window.SITE = window.SITE || {};

/* ============================================================
   PLAN OF ACTION — check-ride templates for the check airman
   Each template = ordered sections of required items per the regs.
   ============================================================ */
window.SITE.poaTemplates = {
  competency: {
    label: "135.293 Competency / Knowledge Check",
    reg: "§135.293",
    cadence: "Every 12 calendar months",
    who: "All pilots (PIC & SIC)",
    desc: "Combined written/oral knowledge test plus a competency flight check in each make/model the pilot is to fly. The IPC (§135.297) may substitute for the .293(b) competency check for IFR PICs.",
    sections: [
      { name: "Knowledge test — §135.293(a)", items: [
        "Appropriate provisions of Parts 61, 91, and 135, OpSpecs, and the company manual",
        "Aircraft powerplant, major components & systems, major appliances, performance & operating limitations",
        "Standard & emergency operating procedures; contents of the approved AFM / equivalent",
        "Navigation & use of nav aids appropriate to the operation, including instrument approach facilities & procedures",
        "Air traffic control procedures, including IFR procedures when applicable",
        "Meteorology — principles of frontal systems, icing, fog, thunderstorms, windshear; high-altitude weather if applicable",
        "Procedures for avoiding operation in severe weather (windshear, thunderstorms, icing, turbulence)",
        "New equipment, procedures, or techniques, as appropriate",
      ]},
      { name: "Competency flight check — §135.293(b)", items: [
        "Conducted in each make/model of aircraft the pilot will fly (or approved simulator/FTD)",
        "Normal maneuvers & procedures for the make/model",
        "Abnormal & emergency maneuvers & procedures",
        "Determine practical skill & technique in conducting the operation",
        "Check airman certifies competence in the pilot training record",
      ]},
    ],
  },
  ipc: {
    label: "135.297 Instrument Proficiency Check",
    reg: "§135.297",
    cadence: "Every 6 calendar months (IFR PIC)",
    who: "PIC for IFR operations",
    desc: "Required for any PIC operating under IFR. Tests procedures and maneuvers of an instrument approach. May substitute for the §135.293(b) competency check. At least one approach must be a non-precision/RNAV procedure; no two approaches of the same type.",
    sections: [
      { name: "Setup — §135.297", items: [
        "Within preceding 6 calendar months; given by an approved check airman or the Administrator",
        "Conducted in aircraft, approved simulator, or appropriate training device",
        "PIC must NOT use any type of precision instrument approach procedure under IFR unless within preceding 6 months they demonstrated that approach type",
      ]},
      { name: "Required maneuvers & procedures — §135.297(c)", items: [
        "Air traffic control clearances and procedures",
        "Flight by reference to instruments (full and partial panel as applicable)",
        "Navigation systems",
        "Instrument approach procedures — at least one non-precision/RNAV; demonstrate each type to be flown in line ops",
        "Emergency procedures (equipment malfunctions, partial panel, missed approach)",
        "Postflight procedures",
        "No two approaches may be of the same type; one must be a circling or as required by OpSpecs",
      ]},
      { name: "Certification", items: [
        "Check airman certifies the IPC in the pilot training record",
        "Confirm whether this IPC is being used to substitute for the §135.293(b) competency check",
      ]},
    ],
  },
  line: {
    label: "135.299 Line Check",
    reg: "§135.299",
    cadence: "Every 12 calendar months",
    who: "PIC — designates the pilot as PIC",
    desc: "An observed normal line flight over a typical route in one of the types of aircraft the pilot is to fly. For IFR-authorized pilots, at least one flight must be over a civil airway, an approved off-airway route, or a portion of either. This is the check that officially designates the pilot as PIC.",
    sections: [
      { name: "Conduct — §135.299(a)", items: [
        "Given by an approved check airman or the Administrator",
        "At least one flight over a typical route; one or more representative airports",
        "For IFR ops: at least one flight over a civil airway / approved off-airway route / portion thereof",
        "Observe normal line operations end-to-end (preflight through postflight)",
      ]},
      { name: "Evaluation", items: [
        "Determine the pilot satisfactorily performs the duties & responsibilities of a PIC in line operations",
        "Familiarity with route, airports, and available information for safe operation (§135.299(c) — route/airport currency)",
      ]},
      { name: "Certification", items: [
        "Check airman certifies the line check in the pilot training record",
        "This check designates the pilot as PIC under the certificate",
      ]},
    ],
  },
};

/* ============================================================
   FLASHCARDS — the testable numbers & rules
   ============================================================ */
window.SITE.flashcards = [
  { cat: "Medical", q: "First-class medical duration for ATP PIC privileges, age 40+?", a: "6 months (12 months if under 40). It then steps down to second-class for the remainder of 12 months, then third-class.", reg: "§61.23" },
  { cat: "Medical", q: "Second-class medical duration?", a: "12 months (commercial privileges).", reg: "§61.23" },
  { cat: "Medical", q: "Third-class medical duration?", a: "60 months if under 40 at exam; 24 months if 40 or over.", reg: "§61.23" },
  { cat: "PIC Quals", q: "Aeronautical experience to serve as PIC under IFR (135.243(c))?", a: "1,200 hr total · 500 hr cross-country · 100 hr night · 75 hr instrument (of which ≤50 may be simulated).", reg: "§135.243(c)" },
  { cat: "PIC Quals", q: "PIC under VFR experience (135.243(b))?", a: "500 total · 100 XC · 25 night, plus a commercial certificate (airplane).", reg: "§135.243(b)" },
  { cat: "Op Experience", q: "Operating experience hours by aircraft type (135.244)?", a: "Turbojet 25 · ME turbine 20 · ME recip 15 · single-engine 10. Reducible 50% by adding 1 T/O & landing per hour.", reg: "§135.244" },
  { cat: "Recency", q: "Basic recent-experience requirement (135.247)?", a: "3 takeoffs & landings in category/class/type within the preceding 90 days.", reg: "§135.247" },
  { cat: "Recency", q: "Turbine multi-crew jet alternate currency path (135.247)?", a: "1,500 hr total time as a pilot + 15 hr in type within preceding 90 days, with required recent T/O & landings.", reg: "§135.247" },
  { cat: "Checks", q: "What does the §135.293 check cover and how often?", a: "Knowledge test + competency flight check; every 12 calendar months.", reg: "§135.293" },
  { cat: "Checks", q: "§135.297 IPC — frequency and who?", a: "Every 6 calendar months for IFR PICs; may substitute for the .293(b) competency check.", reg: "§135.297" },
  { cat: "Checks", q: "§135.299 line check — frequency and significance?", a: "Every 12 calendar months; it designates the pilot as PIC.", reg: "§135.299" },
  { cat: "Duty/Rest", q: "Unscheduled 1-pilot max flight time in 24 consecutive hours (135.267)?", a: "8 hours (1 pilot) / 10 hours (2 pilots).", reg: "§135.267" },
  { cat: "Duty/Rest", q: "Rest required before an unscheduled assignment (135.267)?", a: "At least 10 consecutive hours of rest in the 24 hr before completion of the assignment (look-back rest).", reg: "§135.267" },
  { cat: "Duty/Rest", q: "Flight-time caps for unscheduled 1/2-pilot crews (135.267)?", a: "500 hr/quarter · 800 hr/two consecutive quarters · 1,400 hr/year.", reg: "§135.267" },
  { cat: "Duty/Rest", q: "Days off requirement (135.267(f))?", a: "At least 13 rest periods of 24 consecutive hours each per calendar quarter.", reg: "§135.267(f)" },
  { cat: "Weather", q: "VFR passenger ceiling/vis in uncontrolled airspace (135.205, airplane)?", a: "Ceiling ≥ 1,000 ft and visibility ≥ 2 sm.", reg: "§135.205" },
  { cat: "Weather", q: "IFR alternate weather minimums derived value (135.221/.223)?", a: "Ceiling 1,500 ft above the lowest circling MDA; visibility 3 sm or +2 sm over lowest applicable, whichever is greater.", reg: "§135.221" },
  { cat: "Weather", q: "PIC with <100 hr in type — takeoff/landing minimum penalty (135.225(e))?", a: "Add 100 ft to MDA/DA and 1/2 sm (or 800 m) to visibility minimums.", reg: "§135.225(e)" },
  { cat: "Weather", q: "When is an alternate required for an IFR takeoff below landing mins (135.225)?", a: "An alternate within 1 hour at normal cruise speed must be designated when departing below authorized landing minimums.", reg: "§135.225" },
  { cat: "Part 119", q: "On-demand vs commuter seat/turbojet limits?", a: "On-demand: ≤30 seats / ≤7,500 lb payload, turbojets allowed. Commuter: ≤9 seats, no turbojets. Jets must operate on-demand.", reg: "§119.21/.23" },
  { cat: "Part 119", q: "Required management positions (119.71)?", a: "Director of Operations, Chief Pilot, Director of Maintenance (some Basic/single-pilot ops relieved).", reg: "§119.71" },
];

/* ============================================================
   QUIZ — multiple choice drawn from the same facts
   ============================================================ */
window.SITE.quiz = [
  { q: "How often must a PIC complete the §135.297 instrument proficiency check?", choices: ["Every 12 calendar months", "Every 6 calendar months", "Every 24 calendar months", "Every 90 days"], answer: 1, reg: "§135.297" },
  { q: "Minimum total time to serve as PIC under IFR per §135.243(c)?", choices: ["500 hours", "1,000 hours", "1,200 hours", "1,500 hours"], answer: 2, reg: "§135.243(c)" },
  { q: "Operating experience required in a turbojet per §135.244?", choices: ["10 hours", "15 hours", "20 hours", "25 hours"], answer: 3, reg: "§135.244" },
  { q: "Which check officially designates a pilot as PIC?", choices: ["§135.293 competency check", "§135.297 IPC", "§135.299 line check", "§61.58 PIC proficiency check"], answer: 2, reg: "§135.299" },
  { q: "Max flight time for an unscheduled one-pilot crew in any 24 consecutive hours (§135.267)?", choices: ["8 hours", "10 hours", "14 hours", "16 hours"], answer: 0, reg: "§135.267" },
  { q: "A first-class medical for ATP PIC privileges (age 40+) is valid for:", choices: ["12 months", "6 months", "24 months", "60 months"], answer: 1, reg: "§61.23" },
  { q: "VFR passenger ops in uncontrolled airspace require a ceiling of at least (§135.205, airplane):", choices: ["500 ft", "700 ft", "1,000 ft", "1,500 ft"], answer: 2, reg: "§135.205" },
  { q: "A PIC with fewer than 100 hours in type must add how much to landing visibility minimums (§135.225(e))?", choices: ["1/4 sm", "1/2 sm", "1 sm", "No penalty"], answer: 1, reg: "§135.225(e)" },
  { q: "Annual flight-time cap for an unscheduled 1/2-pilot crew (§135.267)?", choices: ["1,000 hr", "1,200 hr", "1,400 hr", "1,600 hr"], answer: 2, reg: "§135.267" },
  { q: "Which operation may carry turbojets?", choices: ["Commuter only", "On-demand only", "Both equally", "Neither"], answer: 1, reg: "§119.21" },
];

/* ============================================================
   CURRENCY ITEMS — for the printable plan + currency calculator
   ============================================================ */
window.SITE.currencyItems = [
  { key: "med1", label: "First-class medical (ATP PIC, 40+)", months: 6, reg: "§61.23" },
  { key: "med1u40", label: "First-class medical (ATP PIC, under 40)", months: 12, reg: "§61.23" },
  { key: "comp293", label: "§135.293 knowledge + competency check", months: 12, reg: "§135.293" },
  { key: "ipc297", label: "§135.297 instrument proficiency check (IFR PIC)", months: 6, reg: "§135.297" },
  { key: "line299", label: "§135.299 line check (PIC)", months: 12, reg: "§135.299" },
  { key: "recency247", label: "§135.247 recent experience (3 T/O & ldg)", days: 90, reg: "§135.247" },
];
