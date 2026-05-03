/**
 * @fileoverview Static data for the 7-stage election timeline.
 * Each stage represents a phase in the democratic election lifecycle,
 * from eligibility verification through to official results certification.
 *
 * This data drives the Timeline component, Stage detail pages, Checklists,
 * and FAQ sections throughout the application.
 */

/**
 * Represents a single process step within a stage.
 */
export interface StageStep {
  /** Step number label (e.g., '01', '02', '03') */
  num: string;
  /** Short title for the step */
  title: string;
  /** Detailed description of the step */
  desc: string;
}

/**
 * Represents a single checklist item for voter preparation.
 */
export interface ChecklistItem {
  /** Unique numeric ID for the checklist item */
  id: number;
  /** Display label for the checklist item */
  label: string;
  /** Default checked state */
  checked: boolean;
}

/**
 * Represents a single FAQ entry.
 */
export interface FAQItem {
  /** The question text */
  question: string;
  /** The answer text */
  answer: string;
}

/**
 * Complete data shape for a single election stage.
 */
export interface StageData {
  /** Unique numeric ID (1-7) */
  id: number;
  /** URL-friendly slug for routing */
  slug: string;
  /** Short label for navigation UI */
  label: string;
  /** SVG path data for the stage icon */
  icon: string;
  /** Formatted stage prefix (e.g., 'STAGE 01') */
  stagePrefix: string;
  /** Full title of the stage */
  title: string;
  /** Detailed description of the stage */
  description: string;
  /** Three-step process breakdown */
  steps: StageStep[];
  /** Preparation checklist items */
  checklist: ChecklistItem[];
  /** Frequently asked questions */
  faqs: FAQItem[];
}

/**
 * Complete dataset for the 7 stages of the election lifecycle.
 *
 * Stage order follows the natural flow of the democratic process:
 * 1. Eligibility → 2. Registration → 3. Verification →
 * 4. Voting Methods → 5. Election Day → 6. Counting → 7. Results
 */
export const stagesData: StageData[] = [
  {
    id: 1,
    slug: 'eligibility',
    label: 'Eligibility',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    stagePrefix: 'STAGE 01',
    title: 'Voter Eligibility',
    description: 'Before you can register, you must meet the fundamental requirements to participate in the election process. This ensures that only qualified residents cast ballots.',
    steps: [
      { num: '01', title: 'Age Requirement', desc: 'You must be at least 18 years old on or before Election Day.' },
      { num: '02', title: 'Citizenship', desc: 'You must be a citizen of the jurisdiction in which you are voting.' },
      { num: '03', title: 'Residency', desc: 'You must have established residency for a specified period prior to the election.' }
    ],
    checklist: [
      { id: 101, label: 'Confirm Age Qualification', checked: false },
      { id: 102, label: 'Verify Citizenship Status', checked: false },
      { id: 103, label: 'Check State Residency Requirements', checked: false },
    ],
    faqs: [
      { question: 'What if I turn 18 on Election Day?', answer: 'In most states, you are eligible to register early and vote as long as you are 18 by Election Day.' },
      { question: 'Do I need to be a US citizen?', answer: 'Yes, federal elections require US citizenship. Some local municipalities may have different rules for municipal elections.' }
    ]
  },
  {
    id: 2,
    slug: 'registration',
    label: 'Registration',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    stagePrefix: 'STAGE 02',
    title: 'Voter Registration',
    description: 'The entry point to participation. This is where your identity is confirmed and your ballot eligibility is established. Registration ensures the integrity of the electoral roll.',
    steps: [
      { num: '01', title: 'Form Submission', desc: 'Submit your personal details via the National Identity Registry or local physical office.' },
      { num: '02', title: 'Residency Verification', desc: 'Officials cross-reference your provided address to determine your specific voting district and candidates.' },
      { num: '03', title: 'Confirmation', desc: 'A registration card is issued digitally or by mail, confirming your active status on the Electoral Roll.' }
    ],
    checklist: [
      { id: 201, label: 'Valid Government-issued ID (Passport, DL)', checked: false },
      { id: 202, label: 'Proof of address (Utility bill, Lease)', checked: false },
      { id: 203, label: 'Complete Online Registration Form', checked: false },
    ],
    faqs: [
      { question: 'Do I need to re-register if I moved houses?', answer: 'Yes, address changes often require updated registration to ensure you are assigned to the correct polling district and receive the correct ballot.' },
      { question: 'Can I register on Election Day?', answer: 'This varies by state. Some jurisdictions allow same-day registration with valid proof of identity and residency, while others have strict deadlines weeks in advance.' },
      { question: 'What if I am living abroad during the election?', answer: 'Citizens living abroad can typically register and request an absentee ballot through the Federal Voting Assistance Program (FVAP).' }
    ]
  },
  {
    id: 3,
    slug: 'verification',
    label: 'Verification',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    stagePrefix: 'STAGE 03',
    title: 'Status Verification',
    description: 'Before heading to the polls or requesting an absentee ballot, verify your active status. This prevents unexpected issues on Election Day.',
    steps: [
      { num: '01', title: 'Check Online Portal', desc: 'Log into your state\'s voter portal.' },
      { num: '02', title: 'Confirm Details', desc: 'Ensure your name, address, and party affiliation are accurate.' },
      { num: '03', title: 'Find Polling Place', desc: 'Note your assigned polling place or ballot drop-off location.' }
    ],
    checklist: [
      { id: 301, label: 'Locate Voter ID Card', checked: false },
      { id: 302, label: 'Verify Address Match', checked: false },
      { id: 303, label: 'Confirm Polling Location Details', checked: false },
    ],
    faqs: [
      { question: 'What if my name is missing from the roll?', answer: 'Contact your local election office immediately. You may need to cast a provisional ballot if it cannot be resolved before Election Day.' },
      { question: 'Does my party affiliation matter?', answer: 'In closed primary states, you can only vote in the primary of the party you are registered with. For general elections, it does not restrict who you can vote for.' }
    ]
  },
  {
    id: 4,
    slug: 'voting-methods',
    label: 'Voting Methods',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    stagePrefix: 'STAGE 04',
    title: 'Voting Methods',
    description: 'Decide how you will cast your ballot. Depending on your state, you may have multiple options including absentee, mail-in, early voting, or in-person on Election Day.',
    steps: [
      { num: '01', title: 'Request Absentee', desc: 'If voting by mail, submit an absentee ballot request before the deadline.' },
      { num: '02', title: 'Early Voting', desc: 'Check dates and times for early voting centers in your area.' },
      { num: '03', title: 'Election Day', desc: 'Plan your route and schedule to vote on the official day.' }
    ],
    checklist: [
      { id: 401, label: 'Decide Voting Method', checked: false },
      { id: 402, label: 'Request Mail-In Ballot (if applicable)', checked: false },
      { id: 403, label: 'Add voting date to calendar', checked: false },
    ],
    faqs: [
      { question: 'Is mail-in voting secure?', answer: 'Yes, mail-in voting has multiple security layers including signature verification and barcode tracking.' },
      { question: 'When does early voting start?', answer: 'Early voting schedules vary widely by jurisdiction, typically starting 1-4 weeks before Election Day.' }
    ]
  },
  {
    id: 5,
    slug: 'election-day',
    label: 'Election Day',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    stagePrefix: 'STAGE 05',
    title: 'Election Day',
    description: 'The culmination of the civic process. Head to your assigned polling location, cast your ballot, and ensure your voice is officially heard.',
    steps: [
      { num: '01', title: 'Arrive at Polls', desc: 'Go to your designated polling place during operating hours.' },
      { num: '02', title: 'Check In', desc: 'Provide necessary identification to the poll workers.' },
      { num: '03', title: 'Cast Ballot', desc: 'Complete your ballot and submit it via the scanning machine or ballot box.' }
    ],
    checklist: [
      { id: 501, label: 'Bring required ID to polling place', checked: false },
      { id: 502, label: 'Bring personalized ballot guide', checked: false },
      { id: 503, label: 'Get your "I Voted" sticker', checked: false },
    ],
    faqs: [
      { question: 'What if I am in line when the polls close?', answer: 'Stay in line. By law, anyone in line when the polls close is permitted to vote.' },
      { question: 'Can I wear political clothing?', answer: 'Most states prohibit campaigning or wearing political merchandise within a certain distance (e.g., 100 feet) of the polling place.' }
    ]
  },
  {
    id: 6,
    slug: 'counting',
    label: 'Counting',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
    stagePrefix: 'STAGE 06',
    title: 'Vote Counting',
    description: 'After the polls close, the meticulous process of counting begins. This includes processing in-person votes, mail-in ballots, and provisional ballots under strict supervision.',
    steps: [
      { num: '01', title: 'In-Person Tally', desc: 'Electronic scanners transmit initial in-person tallies to central election offices.' },
      { num: '02', title: 'Mail-In Processing', desc: 'Mail ballots are opened, signatures verified, and scanned in batches.' },
      { num: '03', title: 'Provisional Review', desc: 'Provisional ballots are evaluated for eligibility before being added to the count.' }
    ],
    checklist: [
      { id: 601, label: 'Track your mail-in ballot status online', checked: false },
    ],
    faqs: [
      { question: 'Why does counting take days?', answer: 'Many states cannot begin processing mail-in ballots until Election Day. Record turnout and rigorous verification processes also add time to ensure accuracy.' },
      { question: 'Who monitors the counting?', answer: 'Bipartisan teams of poll watchers and election officials supervise the counting process to ensure transparency and integrity.' }
    ]
  },
  {
    id: 7,
    slug: 'results',
    label: 'Results',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    stagePrefix: 'STAGE 07',
    title: 'Official Results',
    description: 'The final outcome of the election is determined after all valid votes are counted, audited, and officially certified by state authorities.',
    steps: [
      { num: '01', title: 'Unofficial Results', desc: 'Media outlets project winners based on preliminary data.' },
      { num: '02', title: 'Canvassing', desc: 'Local boards review the tallies and resolve any discrepancies.' },
      { num: '03', title: 'Certification', desc: 'State officials formally certify the results, making them official and final.' }
    ],
    checklist: [
      { id: 701, label: 'Review certified election results', checked: false },
      { id: 702, label: 'Research newly elected officials', checked: false },
    ],
    faqs: [
      { question: 'What triggers a recount?', answer: 'Recounts are typically triggered automatically if the margin of victory is extremely close (e.g., less than 0.5%), or they can be requested by a candidate.' },
      { question: 'When do newly elected officials take office?', answer: 'This depends on the office. Federal officials usually take office in January, while local officials may take office sooner.' }
    ]
  }
];
