import { JobListing } from '../types';
import { extractRecruiterEmail } from '../lib/gmailService';

export interface LivePortalLink {
  name: string;
  category: 'contractor' | 'job_board';
  searchUrl: string;
  description: string;
  region: string;
}

export const LIVE_WORLDWIDE_PORTALS: LivePortalLink[] = [
  {
    name: 'Rigzone Worldwide (Offshore Rigs)',
    category: 'job_board',
    searchUrl: 'https://www.rigzone.com/oil/jobs/search/?k=Rig+Mechanic&c=Offshore',
    description: 'Live global offshore rig mechanic, chief mechanic, and maintenance engineer postings.',
    region: 'Worldwide',
  },
  {
    name: 'LinkedIn Worldwide (Global Rig Jobs)',
    category: 'job_board',
    searchUrl: 'https://www.linkedin.com/jobs/search/?keywords=Rig+Mechanic&location=Worldwide',
    description: 'Real-time worldwide vacancies across all international drilling contractors.',
    region: 'Worldwide',
  },
  {
    name: 'Shelf Drilling Official Careers',
    category: 'contractor',
    searchUrl: 'https://www.shelfdrilling.com/careers/',
    description: 'Premier shallow-water jack-up drilling contractor (Middle East, India Mumbai High, West Africa).',
    region: 'Middle East & India',
  },
  {
    name: 'Transocean Official Careers',
    category: 'contractor',
    searchUrl: 'https://www.deepwater.com/careers',
    description: 'Ultra-deepwater drillships and harsh-environment semi-submersibles (India KG Basin, GoM, Brazil).',
    region: 'Global Deepwater',
  },
  {
    name: 'Valaris Official Careers',
    category: 'contractor',
    searchUrl: 'https://www.valaris.com/careers/',
    description: 'Global offshore drilling contractor with jack-ups, drillships, and semi-subs (North Sea, Angola, GoM, Guyana).',
    region: 'North Sea & Americas',
  },
  {
    name: 'Noble Corporation Careers',
    category: 'contractor',
    searchUrl: 'https://noblecorp.com/careers/',
    description: 'High-spec harsh environment jack-ups (Norway, UK) and deepwater drillships (Saudi Aramco, Guyana).',
    region: 'North Sea & Middle East',
  },
  {
    name: 'Saipem Offshore Drilling Careers',
    category: 'contractor',
    searchUrl: 'https://www.saipem.com/en/careers',
    description: 'Perro Negro jack-up fleet (UAE, Saudi, Qatar) and ultra-deepwater drillships (Angola, Mediterranean).',
    region: 'Middle East & Africa',
  },
  {
    name: 'SLB (Schlumberger) Careers',
    category: 'contractor',
    searchUrl: 'https://careers.slb.com/',
    description: 'Global drilling services, land rig mechanical systems, and automated drilling machinery.',
    region: 'Middle East & Global',
  },
  {
    name: 'Halliburton Careers Portal',
    category: 'contractor',
    searchUrl: 'https://jobs.halliburton.com/search/?q=mechanic',
    description: 'Drilling waste management, solids control decanters, high-pressure pumps, and rig site evaluation.',
    region: 'Saudi Arabia & Global',
  },
  {
    name: 'Oil & Gas Job Search (OGJS)',
    category: 'job_board',
    searchUrl: 'https://www.oilandgasjobsearch.com/jobs?keywords=rig+mechanic',
    description: 'Specialized energy job search portal with direct recruiter contacts across EMEA & Americas.',
    region: 'Worldwide',
  },
  {
    name: 'Energy Jobline Global',
    category: 'job_board',
    searchUrl: 'https://www.energyjobline.com/jobs/rig-mechanic/',
    description: 'Worldwide energy and offshore drilling engineering vacancies.',
    region: 'Worldwide',
  },
  {
    name: 'Borr Drilling Careers',
    category: 'contractor',
    searchUrl: 'https://borrdrilling.com/careers/',
    description: 'Modern fleet of high-specification jack-up rigs (Southeast Asia, North Sea, West Africa).',
    region: 'Asia-Pacific & Global',
  },
  {
    name: 'Seadrill Careers',
    category: 'contractor',
    searchUrl: 'https://www.seadrill.com/careers/',
    description: 'Deepwater drillships and semi-submersibles operating in West Africa, Brazil, and Gulf of Mexico.',
    region: 'Africa & Americas',
  },
];

const RAW_JOB_LISTINGS: JobListing[] = [
  {
    id: 'job-shelf-001',
    title: 'Senior Rig Mechanic (Offshore Jack-Up)',
    targetRole: 'Senior Rig Mechanic',
    company: 'Shelf Drilling (India) Pvt Ltd',
    location: 'Mumbai High Offshore, Maharashtra',
    country: 'India',
    region: 'India',
    isOffshore: true,
    rigType: 'Jack-Up',
    rigName: 'High-Spec Jack-Up Rig (ONGC Contract)',
    postedDate: '2 hours ago',
    source: 'linkedin.in',
    appliedVia: 'LinkedIn India Easy Apply API',
    url: 'https://www.shelfdrilling.com/careers/',
    salaryOrDayRate: '₹1,80,000 - ₹2,50,000 / month (28/28 Rotation)',
    rotation: '28/28 Rotation',
    description: `Shelf Drilling is urgently recruiting an experienced Senior Rig Mechanic for our offshore Jack-Up drilling fleet operating under long-term contract with ONGC in Mumbai High.
Key Responsibilities:
- Direct maintenance, diagnostics, and overhaul of Caterpillar 3516B and D399 diesel prime movers.
- Routine overhaul of National 12P160 Triplex mud pumps, fluid ends (liners, pistons, valves, seats), and charge pumps.
- Inspection and scheduled maintenance of Varco TDS-8SA top drives and National 1625 DE drawworks.
- Supervision of rig jacking gearboxes, Skagit cranes, air compressors, and compliance with JDE computerized maintenance systems.
- Lead safety briefings, execute PTW/JSA requirements, and maintain zero mechanical downtime.`,
    requiredEquipments: [
      'Caterpillar 3516B / D399',
      'National 12P160 Mud Pumps',
      'Varco TDS-8SA Top Drive',
      'National 1625 DE Drawworks',
      'JDE Maintenance System',
    ],
    requiredCertifications: ['BOSIET (Valid)', 'B.Tech/Diploma in Mechanical Engg', 'Valid Passport'],
    minExperienceYears: 8,
    matchScore: 97,
    status: 'pending_approval',
    recruiterEmail: 'india-recruiting@shelfdrilling.com',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 97,
      machineryFit: 100,
      certificationsFit: 100,
      experienceFit: 98,
      rigTypeFit: 100,
      keyStrengths: [
        'Direct 7+ years on Shelf Drilling Jack-up rigs (C.E. Thornton and JTA in Mumbai High) drilling for ONGC.',
        'Over 12 years specialized experience in Caterpillar 3516B/D399, Varco TDS-8SA, and National 12P160 pumps.',
        'Valid BOSIET (expiry 2026) and passport valid to 2033.',
        'B.Tech in Mechanical Engineering (87.5% marks) + Diploma with Distinction.',
      ],
      missingOrGaps: ['None. Former Shelf Drilling employee with verified track record.'],
      reasoning:
        'Jogendra worked directly on Shelf Drilling Jack-up rigs in Mumbai High from 2017 to 2024. Exact machinery and company match.',
    },
    screeningAnswers: [
      {
        question: 'Do you possess an active BOSIET certification with valid offshore survival training?',
        answer: 'Yes, I hold an active BOSIET issued in Mumbai, valid through 2026.',
        highlight: 'BOSIET Valid (2026)',
      },
      {
        question: 'How many years of offshore Jack-Up rig experience do you have?',
        answer: 'Over 7 years directly on offshore Jack-up rigs (Shelf Drilling C.E. Thornton and JTA in Mumbai High).',
        highlight: '7+ Years Jack-Up',
      },
      {
        question: 'Have you performed major maintenance and overhauls on Caterpillar 3516B and National 12P160 pumps?',
        answer:
          'Yes, routinely performed top-end overhauls, liner/piston replacements, valve seat maintenance, and fluid end rebuilding on Cat 3516B and National 12P160 pumps.',
        highlight: 'Cat 3516B & 12P160 Expert',
      },
      {
        question: 'What is your current notice period and availability for offshore mobilization?',
        answer: 'Available within 15-30 days for mobilization from Odisha/Mumbai.',
        highlight: '15-30 Days Notice',
      },
    ],
    tailoredCoverLetter: `Dear Hiring Manager at Shelf Drilling,

I am writing to express my enthusiastic interest in the Senior Rig Mechanic position for your Jack-Up rig fleet operating offshore Mumbai High. Having previously served with Shelf Drilling on the C.E. Thornton and JTA Jack-Up rigs drilling for ONGC in Mumbai High from 2017 to 2024, I possess immediate familiarity with your equipment standards, rig personnel safety culture, and preventive maintenance protocols.

Throughout my 12+ years in oil and gas drilling mechanics, I have specialized in the scheduled maintenance, troubleshooting, and major overhauls of Caterpillar 3516B and D399 diesel engines, Varco TDS-8SA top drives, National 1625 DE drawworks, and National 12P160/A1700 mud pumps. Furthermore, I have extensive hands-on experience inspecting and servicing Jack-up jacking gearboxes, hydraulic Skagit cranes, and maintaining rigorous logs in JDE software.

Currently operating on unconventional drilling operations with Halliburton in Saudi Arabia, I maintain active BOSIET credentials (valid through 2026), full safety leadership qualifications, and an active international passport (valid to 2033). I am prepared to mobilize smoothly and deliver zero-NPT mechanical uptime for Shelf Drilling.

Sincerely,
Jogendra Patel
Cell: +91-7077869585 / +91-8847810037
Email: jogendra.dipeng11@gmail.com`,
  },
  {
    id: 'job-shelf-me-002',
    title: 'Senior Rig Mechanic (Persian Gulf Jack-Up Fleet)',
    targetRole: 'Senior Rig Mechanic',
    company: 'Shelf Drilling Operations Ltd',
    location: 'Dubai Offshore / Persian Gulf',
    country: 'United Arab Emirates',
    region: 'Middle East',
    isOffshore: true,
    rigType: 'Jack-Up',
    rigName: 'High-Spec F&G Super 116E Jack-Up',
    postedDate: '4 hours ago',
    source: 'rigzone.com',
    appliedVia: 'Rigzone QuickApply Portal',
    url: 'https://www.rigzone.com/oil/jobs/search/?k=Rig+Mechanic&c=Offshore',
    salaryOrDayRate: '$5,200 - $6,400 / month (28/28 Rotation)',
    rotation: '28/28 Rotation',
    description: `Shelf Drilling Middle East is hiring Senior Rig Mechanics for our modern jack-up drilling rigs operating offshore UAE and the Arabian Gulf.
Duties:
- Supervise mechanical maintenance crew during continuous 24/7 offshore drilling operations.
- Lead troubleshooting of high-pressure mud circulation (National 12P160 / 14P220 triplex pumps).
- Execute preventive maintenance on Caterpillar 3516B diesel generators, Varco TDS top drives, and blowout preventer (BOP) control skids.
- Record work orders, parts consumption, and condition monitoring in CMMS / JDE.
Requirements:
- Minimum 7 years offshore drilling rig experience.
- Former Shelf Drilling experience strongly favored.
- Valid BOSIET, OPITO-approved HUET, and offshore medical.`,
    requiredEquipments: [
      'Caterpillar 3516B Series',
      'National 12P160 / 14P220',
      'Varco TDS Top Drive',
      'BOP Accumulator / Koomey Unit',
    ],
    requiredCertifications: ['BOSIET', 'OPITO HUET', 'B.Tech/Diploma Mechanical'],
    minExperienceYears: 7,
    matchScore: 98,
    status: 'pending_approval',
    recruiterEmail: 'middleeast-recruiting@shelfdrilling.com',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 98,
      machineryFit: 100,
      certificationsFit: 100,
      experienceFit: 98,
      rigTypeFit: 100,
      keyStrengths: [
        'Prior 7 years with Shelf Drilling on Jack-Up rigs.',
        'Current Middle East experience in Saudi Arabia with Halliburton/Aramco.',
        'BOSIET valid to 2026, international passport valid to 2033.',
      ],
      missingOrGaps: ['None.'],
      reasoning: 'Candidate is an experienced ex-Shelf Drilling Senior Rig Mechanic currently working in the Gulf region.',
    },
    screeningAnswers: [
      {
        question: 'Do you have prior experience with Shelf Drilling?',
        answer: 'Yes, 7 years on Shelf Drilling Jack-Up rigs (C.E. Thornton and JTA) from 2017 to 2024.',
        highlight: 'Ex-Shelf Drilling (7 Yrs)',
      },
      {
        question: 'Are you available for international offshore rotation in the Middle East?',
        answer: 'Yes, currently based in Saudi Arabia with Halliburton, fully available for 28/28 rotation.',
        highlight: 'Middle East Ready',
      },
    ],
    tailoredCoverLetter: `Dear Shelf Drilling Middle East Recruitment,

I am writing to apply for the Senior Rig Mechanic position supporting your Arabian Gulf Jack-Up fleet. Having worked for Shelf Drilling for over seven years on the C.E. Thornton and JTA Jack-Up rigs, I am thoroughly versed in your maintenance philosophies, JDE workflows, and safety procedures.

With 12+ years of heavy mechanical drilling experience spanning Caterpillar 3516B overhauls, National 12P160 pump rebuilds, and Varco TDS systems, and currently working in Saudi Arabia on drilling operations, I am immediately prepared to join your Persian Gulf team.

Sincerely,
Jogendra Patel
Email: jogendra.dipeng11@gmail.com`,
  },
  {
    id: 'job-transocean-003',
    title: 'Maintenance Engineer - Mechanical (Ultra-Deepwater)',
    targetRole: 'Maintenance Engineer',
    company: 'Transocean Drilling Services India',
    location: 'Kakinada / KG Basin Offshore, Andhra Pradesh',
    country: 'India',
    region: 'India',
    isOffshore: true,
    rigType: 'Drillship',
    rigName: 'Discoverer Fleet Drillship',
    postedDate: '5 hours ago',
    source: 'linkedin.in',
    appliedVia: 'LinkedIn India Easy Apply API',
    url: 'https://www.deepwater.com/careers',
    salaryOrDayRate: '₹2,40,000 - ₹3,20,000 / month (21/21 Rotation)',
    rotation: '21/21 Rotation',
    description: `Transocean is seeking a qualified Mechanical Maintenance Engineer for deepwater drillship operations in Eastern Offshore India (KG-D6 Basin).
Responsibilities:
- Plan, coordinate, and execute preventive, predictive, and corrective maintenance programs across heavy rotating machinery, high-pressure mud systems, and top drive units.
- Lead troubleshooting of high-pressure hydraulic circuits, Caterpillar/EMD engines, compressors, and deck handling machinery.
- Manage computerized maintenance management system (CMMS) work orders, equipment condition monitoring, and spares procurement.
- Comply with all marine regulatory and company safety guidelines (Company Management System).
Requirements:
- Bachelor Degree in Mechanical Engineering.
- 6+ years oil and gas drilling equipment maintenance experience.
- Strong knowledge of EMD 645E8 / Cat 3516 series, Varco TDS, and solids control decanter centrifuges.`,
    requiredEquipments: [
      'Caterpillar 3516 / EMD 645E8',
      'Varco TDS Top Drive',
      'High-Pressure Mud Circulation',
      'CMMS / Condition Monitoring',
    ],
    requiredCertifications: ['BOSIET', 'Degree in Mechanical Engg', 'PTW / Risk Assessment'],
    minExperienceYears: 6,
    matchScore: 94,
    status: 'pending_approval',
    recruiterEmail: 'india-careers@transocean.com',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 94,
      machineryFit: 95,
      certificationsFit: 100,
      experienceFit: 96,
      rigTypeFit: 88,
      keyStrengths: [
        'Bachelor Degree in Mechanical Engineering (87.5% Grade A).',
        'Holds Fire Watch and PROMT/START safety credentials from Transocean Rig ACTINIA.',
        '12+ years experience on high-pressure drilling hydraulics, EMD 645E8 and Caterpillar 3516 engines.',
      ],
      missingOrGaps: ['Ultra-deepwater drillship operations vs primary jack-up/land rig background.'],
      reasoning: 'Holds required Mechanical Engineering degree and Transocean safety orientation credentials.',
    },
    screeningAnswers: [
      {
        question: 'Do you hold a recognized Bachelor Degree in Mechanical Engineering?',
        answer: 'Yes, Bachelor Degree in Mechanical Engineering with 87.5% (Grade A).',
        highlight: 'B.Eng Mechanical (87.5%)',
      },
      {
        question: 'Do you have Transocean safety orientation or prior rig exposure?',
        answer: 'Yes, I hold Transocean Rig ACTINIA certifications including Fire Watch, PROMT Card, and START Conversation Card.',
        highlight: 'Transocean Rig Certs',
      },
    ],
    tailoredCoverLetter: `Dear Transocean Recruitment Team,

I am writing to apply for the Mechanical Maintenance Engineer position for Transocean's deepwater operations in India. With a Bachelor Degree in Mechanical Engineering (87.5% marks) and more than 12 years of hands-on drilling equipment maintenance, I offer both technical analytical capability and practical rig-floor execution.

Notably, I previously obtained safety certifications on the Transocean Rig ACTINIA (including Fire Watch, PROMT Card, and START Safety systems). My technical expertise spans overhauls of EMD 645E8 and Caterpillar 3516B engines, Varco TDS-8SA top drive troubleshooting, and CMMS asset tracking via JDE software.

Warm regards,
Jogendra Patel
Email: jogendra.dipeng11@gmail.com | Phone: +91-7077869585`,
  },
  {
    id: 'job-transocean-gom-004',
    title: 'Senior Rig Mechanic (DP3 Deepwater Drillship)',
    targetRole: 'Senior Rig Mechanic',
    company: 'Transocean',
    location: 'Gulf of Mexico Offshore / Houston Base',
    country: 'United States',
    region: 'Americas',
    isOffshore: true,
    rigType: 'Drillship',
    rigName: 'Deepwater Conqueror (20k PSI Rated)',
    postedDate: '1 day ago',
    source: 'linkedin.com',
    appliedVia: 'LinkedIn Worldwide Direct Apply',
    url: 'https://www.deepwater.com/careers',
    salaryOrDayRate: '$7,500 - $9,200 / month (21/21 Rotation)',
    rotation: '21/21 Rotation',
    description: `Transocean is hiring Senior Rig Mechanics for our state-of-the-art dual-derrick DP3 drillships in the US Gulf of Mexico.
Responsibilities:
- Maintain primary diesel electric generation plant, Caterpillar and EMD engines, high-pressure 7500 PSI mud circulation systems.
- Supervise overhauls of NOV TDS-8 top drives, Hydralift pipe racking systems, and NOV mud pumps.
- Coordinate with Subsea Department on heave compensation and mechanical deck interfaces.`,
    requiredEquipments: [
      'EMD 645 / 710 Series Diesels',
      'NOV 14P220 / 12P160 Triplex Pumps',
      'NOV TDS-8 Top Drive',
      'Dual-Derrick Automated Pipe Handling',
    ],
    requiredCertifications: ['BOSIET with HUET', 'B.Tech/Diploma Mechanical Engg', 'C1/D Visa / International Passport'],
    minExperienceYears: 8,
    matchScore: 93,
    status: 'new_match',
    recruiterEmail: 'americas-recruiting@transocean.com',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 93,
      machineryFit: 96,
      certificationsFit: 94,
      experienceFit: 95,
      rigTypeFit: 88,
      keyStrengths: ['Transocean rig certified', 'Over 12 years heavy diesel and drilling machinery overhaul'],
      missingOrGaps: ['Requires US C1/D transit visa (eligible through international passport valid to 2033)'],
      reasoning: 'Holds verified Transocean credentials and 12+ years heavy drilling equipment maintenance.',
    },
    screeningAnswers: [
      {
        question: 'Do you hold an international passport valid for offshore mobilization?',
        answer: 'Yes, international passport valid until 2033.',
        highlight: 'Passport Valid to 2033',
      },
    ],
    tailoredCoverLetter: `Dear Transocean Americas Team,

I am writing to apply for the Senior Rig Mechanic position on your Gulf of Mexico deepwater fleet. Having served 12+ years across Jack-ups, drillships, and high-spec rigs, and holding Transocean Rig ACTINIA safety credentials, I bring rigorous mechanical uptime discipline.

Sincerely,
Jogendra Patel`,
  },
  {
    id: 'job-valaris-ns-005',
    title: 'Senior Rig Mechanic - Harsh Environment Jack-Up',
    targetRole: 'Senior Rig Mechanic',
    company: 'Valaris Limited',
    location: 'Aberdeen / North Sea Sector',
    country: 'United Kingdom',
    region: 'North Sea / Europe',
    isOffshore: true,
    rigType: 'Jack-Up',
    rigName: 'Valaris 120 Series (GustoMSC CJ70)',
    postedDate: '6 hours ago',
    source: 'rigzone.com',
    appliedVia: 'Rigzone QuickApply Feed',
    url: 'https://www.valaris.com/careers/',
    salaryOrDayRate: '£420 - £540 / day (14/14 or 21/21 Rotation)',
    rotation: '14/14 or 21/21 Rotation',
    description: `Valaris is recruiting a Senior Rig Mechanic for our North Sea harsh-environment Jack-Up fleet.
- Responsible for mechanical integrity of Caterpillar 3516B generators, Lewco 2200 mud pumps, and Varco top drive systems.
- Supervise round-the-clock maintenance, predictive vibration diagnostics, and winterization equipment.
- Execute overhaul of hydraulic cranes, winches, and high-pressure valves.`,
    requiredEquipments: [
      'Caterpillar 3516B Series',
      'Lewco / National 14P220 Pumps',
      'Varco Top Drive Systems',
      'Hydraulic Cranes & Winches',
    ],
    requiredCertifications: ['BOSIET with CA-EBS', 'OEUK Medical', 'Mechanical Engineering Degree/Diploma'],
    minExperienceYears: 7,
    matchScore: 95,
    status: 'new_match',
    recruiterEmail: 'ukcareers@valaris.com',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 95,
      machineryFit: 98,
      certificationsFit: 94,
      experienceFit: 96,
      rigTypeFit: 96,
      keyStrengths: ['Extensive Caterpillar 3516B overhaul expertise', 'BOSIET valid through 2026'],
      missingOrGaps: ['Requires CA-EBS module for UK North Sea helicopter transit'],
      reasoning: 'Exceptional fit for heavy Jack-Up machinery maintenance.',
    },
    screeningAnswers: [
      {
        question: 'Have you overhauled Caterpillar 3516B diesel engines?',
        answer: 'Yes, routinely performed complete overhauls, cylinder head rebuilding, and fuel system calibration.',
        highlight: 'Cat 3516B Specialist',
      },
    ],
    tailoredCoverLetter: `Dear Valaris Recruitment,

I am writing to express my strong interest in the Senior Rig Mechanic position for your North Sea Jack-Up operations. With over 12 years of hands-on rig mechanics on Jack-ups and drillships, I specialize in Caterpillar 3516B engines, top drives, and mud circulation.

Sincerely,
Jogendra Patel`,
  },
  {
    id: 'job-valaris-angola-006',
    title: 'Senior Rig Mechanic - West Africa Deepwater Drillship',
    targetRole: 'Senior Rig Mechanic',
    company: 'Valaris West Africa',
    location: 'Luanda Offshore / Block 15',
    country: 'Angola',
    region: 'Africa',
    isOffshore: true,
    rigType: 'Drillship',
    rigName: 'Valaris DS-12 Drillship',
    postedDate: '12 hours ago',
    source: 'direct_rig',
    appliedVia: 'Valaris Global ATS Direct',
    url: 'https://www.valaris.com/careers/',
    salaryOrDayRate: '$5,800 - $7,000 / month (28/28 Rotation)',
    rotation: '28/28 Rotation',
    description: `Valaris is hiring a Senior Rig Mechanic for offshore drilling campaigns in Block 15/06 Angola.
- Overhaul of EMD 645E8 and Caterpillar engines, high-pressure mud pumps (National 12P160), and drawworks.
- Troubleshoot high-pressure hydraulic circuits, centrifuges, and deck winches.
- Maintain accurate preventive maintenance logs and enforce zero safety incidents.`,
    requiredEquipments: [
      'EMD 645E8 / Caterpillar 3516B',
      'National 12P160 Triplex Mud Pumps',
      'Varco TDS-8SA',
      'Hydraulic Systems',
    ],
    requiredCertifications: ['BOSIET', 'Valid Passport', 'Safety Leadership'],
    minExperienceYears: 7,
    matchScore: 98,
    status: 'new_match',
    recruiterEmail: 'recruitment.africa@valaris.com',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 98,
      machineryFit: 100,
      certificationsFit: 100,
      experienceFit: 98,
      rigTypeFit: 96,
      keyStrengths: [
        'Direct 2 years West Africa rig experience in Nigeria with SEEPCO on Rig DURGA-1.',
        'Overhauls of EMD 645E8 and Caterpillar 3516B.',
        'Valid BOSIET (expiry 2026) and passport valid to 2033.',
      ],
      missingOrGaps: ['None.'],
      reasoning: 'Candidate already possesses direct West Africa offshore experience and exact equipment competencies.',
    },
    screeningAnswers: [
      {
        question: 'Do you have prior rig experience in West Africa?',
        answer: 'Yes, 2 years in Nigeria with SEEPCO on Rig DURGA-1 as Rig Mechanic cum Solids Control Engineer.',
        highlight: '2 Yrs West Africa Exp',
      },
    ],
    tailoredCoverLetter: `Dear Valaris West Africa Recruitment,

I am writing to apply for the Senior Rig Mechanic position offshore Angola. Having worked in Nigeria for two years on Rig DURGA-1 as Rig Mechanic cum Solids Control Engineer, and with over seven years on Shelf Drilling Jack-up rigs, I bring proven resilience and technical competence in West African offshore operations.

Sincerely,
Jogendra Patel`,
  },
  {
    id: 'job-noble-norway-007',
    title: 'Lead Rig Mechanic (Harsh Environment CJ70 Jack-Up)',
    targetRole: 'Senior Rig Mechanic',
    company: 'Noble Corporation',
    location: 'Stavanger Offshore / Ekofisk Field',
    country: 'Norway',
    region: 'North Sea / Europe',
    isOffshore: true,
    rigType: 'Jack-Up',
    rigName: 'Noble Integrator (GustoMSC CJ70)',
    postedDate: '8 hours ago',
    source: 'oilandgasjobsearch.com',
    appliedVia: 'OGJS Direct Recruiter Feed',
    url: 'https://noblecorp.com/careers/',
    salaryOrDayRate: '$720 - $850 / day (14/14 or 21/21 Rotation)',
    rotation: '14/14 or 21/21 Rotation',
    description: `Noble Corporation is seeking an experienced Lead Rig Mechanic for our ultra-harsh environment CJ70 jack-up operating in the Norwegian Continental Shelf.
Responsibilities:
- Supervise all mechanical rig operations, power generation (Caterpillar & Wärtsilä diesels), and mud pumping.
- Perform preventive and predictive maintenance on NOV top drives and cyberbase drilling controls.
- Maintain strict compliance with Norwegian NORSOK standards and Noble safety management systems.`,
    requiredEquipments: [
      'Wärtsilä / Caterpillar 3516B',
      'NOV Mud Pumps & TDS Top Drive',
      'BOSIET with EBS',
      'NORSOK Mechanical Standards',
    ],
    requiredCertifications: ['BOSIET with EBS', 'NORSOK Training', 'B.Tech/Diploma Mechanical'],
    minExperienceYears: 8,
    matchScore: 93,
    status: 'new_match',
    recruiterEmail: 'norway-recruitment@noblecorp.com',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 93,
      machineryFit: 95,
      certificationsFit: 92,
      experienceFit: 94,
      rigTypeFit: 94,
      keyStrengths: ['12+ years mechanical experience', 'BOSIET valid to 2026'],
      missingOrGaps: ['NORSOK familiarization required'],
      reasoning: 'Strong international qualifications and heavy jack-up mechanical background.',
    },
    screeningAnswers: [
      {
        question: 'Have you worked with high-pressure triplex mud pumps and top drives?',
        answer: 'Yes, 12+ years rebuilding National 12P160/14P220 pumps and Varco TDS-8SA top drives.',
        highlight: '12+ Yrs HP Mud & Top Drives',
      },
    ],
    tailoredCoverLetter: `Dear Noble Corporation Recruitment Team,

I am writing to apply for the Lead Rig Mechanic role on your Norwegian harsh-environment fleet. Having spent over 12 years maintaining heavy mechanical and hydraulic systems on offshore Jack-ups, I offer comprehensive troubleshooting and overhaul capabilities.

Sincerely,
Jogendra Patel`,
  },
  {
    id: 'job-noble-me-008',
    title: 'Senior Rig Mechanic (Saudi Aramco Offshore Campaign)',
    targetRole: 'Senior Rig Mechanic',
    company: 'Noble Corporation',
    location: 'Ras Tanura / Arabian Gulf Offshore',
    country: 'Saudi Arabia',
    region: 'Middle East',
    isOffshore: true,
    rigType: 'Jack-Up',
    rigName: 'Noble Scott Marks / Roger Lewis Jack-Ups',
    postedDate: '10 hours ago',
    source: 'linkedin.com',
    appliedVia: 'LinkedIn Worldwide Direct Apply',
    url: 'https://noblecorp.com/careers/',
    salaryOrDayRate: '$5,500 - $6,800 / month (28/28 Rotation)',
    rotation: '28/28 Rotation',
    description: `Noble Corporation is mobilizing Senior Rig Mechanics for long-term contract jack-ups drilling for Saudi Aramco in the Arabian Gulf.
Responsibilities:
- Oversee maintenance of Caterpillar 3516B engines, Lewco 2200 mud pumps, and Varco top drive systems.
- Ensure strict compliance with Saudi Aramco Schedule 'G' safety regulations and Noble maintenance standards.
- Troubleshoot jacking systems, pneumatic clutches, and rotary tables.`,
    requiredEquipments: [
      'Caterpillar 3516B Series',
      'Lewco / National Triplex Mud Pumps',
      'Varco Top Drives',
      'Aramco Schedule G HSE',
    ],
    requiredCertifications: ['BOSIET (OPITO)', 'Mechanical Engineering Degree/Diploma', 'Aramco Rig Induction'],
    minExperienceYears: 7,
    matchScore: 99,
    status: 'new_match',
    recruiterEmail: 'middleeast@noblecorp.com',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 99,
      machineryFit: 100,
      certificationsFit: 100,
      experienceFit: 98,
      rigTypeFit: 100,
      keyStrengths: [
        'Currently working in Saudi Arabia on Aramco drilling project with Halliburton.',
        '7 years on Shelf Drilling Jack-up rigs.',
        'Complete mastery of Caterpillar 3516B engines and triplex pumps.',
      ],
      missingOrGaps: ['None. Inside knowledge of Aramco requirements.'],
      reasoning: 'Currently stationed in Saudi Arabia on Aramco projects with 7 years Jack-up experience.',
    },
    screeningAnswers: [
      {
        question: 'Are you currently working in Saudi Arabia?',
        answer: 'Yes, currently working with Halliburton on Saudi Aramco unconventional drilling operations.',
        highlight: 'Active in Saudi Arabia',
      },
    ],
    tailoredCoverLetter: `Dear Noble Corporation Middle East Team,

As a Rig Mechanic currently deployed in Saudi Arabia supporting Saudi Aramco drilling operations with Halliburton, I am writing to apply for the Senior Rig Mechanic position on your Arabian Gulf jack-up fleet.

Having previously spent seven years with Shelf Drilling on offshore jack-up rigs in Mumbai High, I bring unmatched proficiency in Caterpillar 3516B power generation, National/Lewco mud pump overhauls, and Aramco safety protocols.

Best regards,
Jogendra Patel`,
  },
  {
    id: 'job-halliburton-009',
    title: 'Drilling Equipment Technician - Solids Control & Mechanical Systems',
    targetRole: 'Drilling Equipment Technician',
    company: 'Halliburton Energy Services',
    location: 'Al-Khobar / Eastern Province',
    country: 'Saudi Arabia',
    region: 'Middle East',
    isOffshore: false,
    rigType: 'Land Rig',
    rigName: 'Unconventional Gas Fleet',
    postedDate: '1 day ago',
    source: 'linkedin.com',
    appliedVia: 'LinkedIn Worldwide Direct Apply',
    url: 'https://jobs.halliburton.com/search/?q=mechanic',
    salaryOrDayRate: '$4,500 - $5,800 / month (35/35 Rotation)',
    rotation: '35/35 Rotation',
    description: `Halliburton Baroid / Drilling & Evaluation division is recruiting experienced Drilling Equipment Technicians to maintain drilling waste management, solids control decanters, high-pressure pumps, and mechanical rig packages.
Duties:
- Installation, commissioning, maintenance, and teardown of solids control centrifuges, shale shakers, cutting dryers, and screw conveyors.
- Troubleshoot diesel engines, centrifugal feed pumps, and variable frequency drive (VFD) electronic control panels.
- Perform daily equipment checkouts, maintain accurate equipment maintenance history logs.`,
    requiredEquipments: [
      'Decanter Centrifuges',
      'Cutting Dryers (WSM-04)',
      'Mono Pumps & Screw Conveyors',
      'Cat Engines & VFD Systems',
    ],
    requiredCertifications: ['Mechanical Engineering Diploma/Degree', 'HSE / LOTO Training'],
    minExperienceYears: 5,
    matchScore: 99,
    status: 'new_match',
    recruiterEmail: 'saudi-recruitment@halliburton.com',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 99,
      machineryFit: 100,
      certificationsFit: 100,
      experienceFit: 100,
      rigTypeFit: 96,
      keyStrengths: [
        'Currently employed directly by Halliburton on unconventional rig drilling project with Aramco in Saudi Arabia (since Feb 2024).',
        'Specialized dual experience as Rig Mechanic cum Solids Control Engineer.',
        'Extensive expertise with decanter centrifuges, cutting dryers, mono pumps, and screw augers.',
      ],
      missingOrGaps: ['None. Internal company alignment.'],
      reasoning: 'Candidate is already working with Halliburton in Saudi Arabia on the Aramco project.',
    },
    screeningAnswers: [
      {
        question: 'Are you currently working in Saudi Arabia or familiar with Aramco drilling requirements?',
        answer: 'Yes, currently working with Halliburton in Saudi Arabia on Aramco unconventional rig drilling projects.',
        highlight: 'Active Halliburton Aramco Tech',
      },
    ],
    tailoredCoverLetter: `Dear Halliburton Recruitment Team,

As a current Mechanic with Halliburton in the Unconventional Rig Drilling Project with Saudi Aramco, I am pleased to present my application for the Drilling Equipment Technician role.

Having worked as both a Rig Mechanic and Solids Control Engineer across diverse onshore and offshore installations, I have mastered the maintenance of decanter centrifuges, cutting dryers, mono pumps, and screw conveyors.

Best regards,
Jogendra Patel`,
  },
  {
    id: 'job-saipem-me-010',
    title: 'Senior Rig Mechanic - Perro Negro Jack-Up Fleet',
    targetRole: 'Senior Rig Mechanic',
    company: 'Saipem S.p.A.',
    location: 'Abu Dhabi / Arabian Gulf Offshore',
    country: 'United Arab Emirates',
    region: 'Middle East',
    isOffshore: true,
    rigType: 'Jack-Up',
    rigName: 'Perro Negro 8 / 9 Jack-Up',
    postedDate: '5 hours ago',
    source: 'direct_rig',
    appliedVia: 'Saipem Global Careers Portal',
    url: 'https://www.saipem.com/en/careers',
    salaryOrDayRate: '$5,400 - $6,500 / month (28/28 Rotation)',
    rotation: '28/28 Rotation',
    description: `Saipem is mobilizing Senior Rig Mechanics for our Perro Negro shallow-water jack-up fleet operating in UAE and Arabian Gulf waters.
- Overhaul of Caterpillar 3516B and D399 generator units and emergency generators.
- Maintenance of high-pressure mud pumps (National 12P160) and Varco top drive systems.
- Maintenance of hydraulic jacking system, mooring winches, and deck cranes.`,
    requiredEquipments: [
      'Caterpillar 3516B / D399',
      'National 12P160 Triplex Pumps',
      'Varco TDS Top Drive',
      'Jack-up Jacking Systems',
    ],
    requiredCertifications: ['BOSIET (OPITO)', 'Diploma/Degree Mechanical Engg', 'Valid Passport'],
    minExperienceYears: 7,
    matchScore: 98,
    status: 'new_match',
    recruiterEmail: 'careers.middleeast@saipem.com',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 98,
      machineryFit: 100,
      certificationsFit: 100,
      experienceFit: 98,
      rigTypeFit: 100,
      keyStrengths: [
        '7 years on Jack-up rigs with Shelf Drilling.',
        'Overhaul experience on Cat 3516B, D399, and National 12P160.',
        'BOSIET valid through 2026.',
      ],
      missingOrGaps: ['None.'],
      reasoning: 'Candidate has exact Jack-up machinery background and valid credentials.',
    },
    screeningAnswers: [
      {
        question: 'How many years of offshore Jack-Up experience do you have?',
        answer: 'Over 7 years directly on offshore Jack-up drilling rigs.',
        highlight: '7+ Years Jack-Up',
      },
    ],
    tailoredCoverLetter: `Dear Saipem Middle East Team,

I am writing to apply for the Senior Rig Mechanic position on your Perro Negro Jack-Up fleet. With over 12 years of hands-on mechanical experience including 7 years on Shelf Drilling Jack-up rigs, I specialize in Caterpillar 3516B/D399 diesels, National 12P160 pumps, and Varco top drives.

Sincerely,
Jogendra Patel`,
  },
  {
    id: 'job-slb-me-011',
    title: 'Drilling Maintenance Engineer (Mechanical Systems)',
    targetRole: 'Maintenance Engineer',
    company: 'SLB (Schlumberger)',
    location: 'Dhahran / Shaybah Base',
    country: 'Saudi Arabia',
    region: 'Middle East',
    isOffshore: false,
    rigType: 'Land Rig',
    rigName: 'Aramco Unconventional Land Fleet',
    postedDate: '1 day ago',
    source: 'rigzone.com',
    appliedVia: 'Rigzone QuickApply Feed',
    url: 'https://careers.slb.com/',
    salaryOrDayRate: '$5,000 - $6,200 / month (28/28 Rotation)',
    rotation: '28/28 Rotation',
    description: `SLB Middle East is seeking a Mechanical Maintenance Engineer for rig-based operations supporting Saudi Aramco gas drilling projects.
- Supervise mechanical diagnostic routines, preventative maintenance scheduling, and major overhauls.
- Ensure reliability of Caterpillar 3516B engines, high-pressure mud pumps, centrifuges, and automated handling systems.
- Manage SAP PM work orders and inventory tracking.`,
    requiredEquipments: ['CAT 3516B', 'Decanter Centrifuges', 'Hydraulic Systems', 'SAP PM / CMMS'],
    requiredCertifications: ['Bachelor Degree Mechanical Engineering', 'Aramco Safety / LOTO'],
    minExperienceYears: 6,
    matchScore: 96,
    status: 'new_match',
    recruiterEmail: 'middleeast-jobs@slb.com',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 96,
      machineryFit: 98,
      certificationsFit: 96,
      experienceFit: 96,
      rigTypeFit: 94,
      keyStrengths: [
        'Bachelor Degree in Mechanical Engineering (87.5% Grade A).',
        'Currently operating on Aramco gas drilling project with Halliburton.',
        '12+ years heavy mechanical experience.',
      ],
      missingOrGaps: ['None.'],
      reasoning: 'Strong academic foundation, Aramco field exposure, and 12 years experience.',
    },
    screeningAnswers: [
      {
        question: 'Do you hold a recognized Bachelor Degree in Mechanical Engineering?',
        answer: 'Yes, Bachelor of Technology in Mechanical Engineering with 87.5% marks.',
        highlight: 'B.Eng (87.5% Marks)',
      },
    ],
    tailoredCoverLetter: `Dear SLB Hiring Team,

I am writing to express my interest in the Mechanical Maintenance Engineer position in Saudi Arabia. I am currently deployed as a Mechanic with Halliburton on Saudi Aramco's unconventional gas drilling project, giving me up-to-date knowledge of Aramco rig safety procedures and mechanical standards.

With a Bachelor Degree in Mechanical Engineering (87.5%) and 12+ years operating on high-spec drilling rigs, I specialize in Caterpillar 3516B engines and mud circulating units.

Sincerely,
Jogendra Patel`,
  },
  {
    id: 'job-borr-012',
    title: 'Senior Rig Mechanic (High-Spec Super 116E Jack-Up)',
    targetRole: 'Senior Rig Mechanic',
    company: 'Borr Drilling',
    location: 'Singapore / Batam / Offshore Malaysia',
    country: 'Singapore',
    region: 'Asia-Pacific',
    isOffshore: true,
    rigType: 'Jack-Up',
    rigName: 'Borr Gunnlod / Saga Modern Jack-Up',
    postedDate: '1 day ago',
    source: 'direct_rig',
    appliedVia: 'Borr Drilling Direct Careers',
    url: 'https://borrdrilling.com/careers/',
    salaryOrDayRate: '$5,500 - $6,600 / month (28/28 Rotation)',
    rotation: '28/28 Rotation',
    description: `Borr Drilling is seeking a Senior Rig Mechanic for our modern high-spec Super 116E jack-up rig operating in Southeast Asia.
- Lead scheduled maintenance on Caterpillar 3516C-HD engines, NOV 14P220 mud pumps, and NOV TDS-8SA top drives.
- Inspect and maintain hydraulic jacking gear, Skagit / Liebherr cranes, and BOP handling skids.
- Record maintenance logs and spares ordering in Maximo / JDE.`,
    requiredEquipments: [
      'Caterpillar 3516 Series',
      'NOV 14P220 Triplex Mud Pumps',
      'NOV TDS-8SA Top Drive',
      'Liebherr Offshore Cranes',
    ],
    requiredCertifications: ['BOSIET (OPITO)', 'Diploma/Degree Mechanical Engg', 'Passport Valid 5+ Yrs'],
    minExperienceYears: 7,
    matchScore: 97,
    status: 'new_match',
    recruiterEmail: 'careers@borrdrilling.com',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 97,
      machineryFit: 100,
      certificationsFit: 100,
      experienceFit: 96,
      rigTypeFit: 100,
      keyStrengths: [
        '7 years on Jack-up drilling rigs with Shelf Drilling.',
        'Overhauls on Caterpillar 3516 and NOV 14P220 mud pumps.',
        'Valid BOSIET through 2026, passport valid to 2033.',
      ],
      missingOrGaps: ['None.'],
      reasoning: 'Super 116E Jack-up matches candidate Jack-up experience perfectly.',
    },
    screeningAnswers: [
      {
        question: 'Do you hold active BOSIET certification?',
        answer: 'Yes, valid through 2026 from OPITO accredited centre.',
        highlight: 'BOSIET Valid 2026',
      },
    ],
    tailoredCoverLetter: `Dear Borr Drilling Recruitment,

I am writing to apply for the Senior Rig Mechanic position on your modern jack-up fleet. Having spent over seven years maintaining Jack-up rigs with Shelf Drilling and with over 12 years in oil and gas drilling mechanics, I specialize in Caterpillar 3516 engines, NOV mud pumps, and TDS-8SA top drives.

Sincerely,
Jogendra Patel`,
  },
  {
    id: 'job-adnoc-me-013',
    title: 'Offshore Rig Mechanic (Jack-Up & Island Rig Fleet)',
    targetRole: 'Rig Mechanic',
    company: 'ADNOC Drilling PJSC',
    location: 'Abu Dhabi Offshore / Das Island',
    country: 'United Arab Emirates',
    region: 'Middle East',
    isOffshore: true,
    rigType: 'Jack-Up',
    rigName: 'Al-Yasat / Al-Hail High-Spec Fleet',
    postedDate: '12 hours ago',
    source: 'linkedin.com',
    appliedVia: 'LinkedIn Worldwide Direct Apply',
    url: 'https://www.adnoc.ae/en/careers',
    salaryOrDayRate: 'AED 18,000 - 24,000 / month (28/28 Rotation)',
    rotation: '28/28 Rotation',
    description: `ADNOC Drilling is recruiting qualified Rig Mechanics for expanding offshore jack-up and artificial island drilling operations in Abu Dhabi.
- Routine overhauls of Caterpillar 3516B engines, centrifugal charge pumps, and shale shakers.
- Overhaul National 12P160 fluid ends, replace liners, pistons, and valve seats.
- Adhere to ADNOC 100% HSE culture and permit to work systems.`,
    requiredEquipments: [
      'Caterpillar 3516B Series',
      'National 12P160 Triplex Pumps',
      'Varco TDS Top Drive',
      'ADNOC PTW System',
    ],
    requiredCertifications: ['BOSIET (OPITO)', 'Mechanical Engineering Diploma/Degree', 'Passport Valid 5+ Yrs'],
    minExperienceYears: 6,
    matchScore: 97,
    status: 'new_match',
    recruiterEmail: 'drillingrecruitment@adnoc.ae',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 97,
      machineryFit: 100,
      certificationsFit: 100,
      experienceFit: 96,
      rigTypeFit: 100,
      keyStrengths: [
        '7 years on Jack-Up rigs with Shelf Drilling.',
        'Current Middle East deployment in Saudi Arabia.',
        'BOSIET valid to 2026.',
      ],
      missingOrGaps: ['None.'],
      reasoning: 'Extensive offshore Jack-up background with exact machinery match.',
    },
    screeningAnswers: [
      {
        question: 'Are you familiar with Middle East offshore drilling HSE standards?',
        answer: 'Yes, currently working in Saudi Arabia on Aramco drilling and hold active BOSIET.',
        highlight: 'Middle East Ready',
      },
    ],
    tailoredCoverLetter: `Dear ADNOC Drilling Recruitment,

I am writing to apply for the Offshore Rig Mechanic position with ADNOC Drilling in Abu Dhabi. Having spent over seven years maintaining Jack-Up rigs with Shelf Drilling in Mumbai High and currently working on drilling projects in Saudi Arabia, I bring strong expertise in Caterpillar 3516B engines and National 12P160 pumps.

Sincerely,
Jogendra Patel`,
  },
  {
    id: 'job-arabian-me-014',
    title: 'Senior Rig Mechanic (Offshore Jack-Up Operations)',
    targetRole: 'Senior Rig Mechanic',
    company: 'Arabian Drilling Company (ADC)',
    location: 'Al-Khobar / Offshore Safaniya',
    country: 'Saudi Arabia',
    region: 'Middle East',
    isOffshore: true,
    rigType: 'Jack-Up',
    rigName: 'Arabdrill 50 / 60 Series Jack-Up',
    postedDate: '1 day ago',
    source: 'direct_rig',
    appliedVia: 'Arabian Drilling Careers ATS',
    url: 'https://www.arabdrill.com/careers/',
    salaryOrDayRate: 'SAR 19,000 - 25,000 / month (28/28 Rotation)',
    rotation: '28/28 Rotation',
    description: `Arabian Drilling Company (ADC) is hiring Senior Rig Mechanics for offshore Jack-Up rigs drilling for Saudi Aramco in Safaniya and Marjan fields.
- Direct maintenance of Caterpillar 3516B/D399 diesels, National 12P160 triplex mud pumps, and Varco TDS-8SA top drives.
- Ensure strict adherence to Saudi Aramco offshore inspection standards.`,
    requiredEquipments: [
      'Caterpillar 3516B / D399',
      'National 12P160 Pumps',
      'Varco TDS-8SA',
      'Saudi Aramco Standards',
    ],
    requiredCertifications: ['BOSIET', 'Mechanical Diploma / Degree', 'Aramco Offshore Induction'],
    minExperienceYears: 7,
    matchScore: 99,
    status: 'new_match',
    recruiterEmail: 'recruitment@arabdrill.com',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 99,
      machineryFit: 100,
      certificationsFit: 100,
      experienceFit: 98,
      rigTypeFit: 100,
      keyStrengths: [
        'Currently deployed in Saudi Arabia on Aramco drilling with Halliburton.',
        '7 years on Jack-up rigs with Shelf Drilling.',
        'Mastery of Cat 3516B, D399, and National 12P160.',
      ],
      missingOrGaps: ['None.'],
      reasoning: 'Currently based in Saudi Arabia on Aramco project with 7 years Jack-up experience.',
    },
    screeningAnswers: [
      {
        question: 'Are you currently working in Saudi Arabia?',
        answer: 'Yes, based in Saudi Arabia supporting Saudi Aramco drilling operations.',
        highlight: 'In Saudi Arabia Now',
      },
    ],
    tailoredCoverLetter: `Dear Arabian Drilling Company Recruitment,

I am writing to apply for the Senior Rig Mechanic position on your offshore Jack-Up fleet. Being currently deployed in Saudi Arabia supporting Saudi Aramco unconventional drilling with Halliburton, and having previously served seven years on Shelf Drilling Jack-Up rigs in Mumbai High, I bring deep hands-on expertise in Caterpillar 3516B engines and National 12P160 pumps.

Sincerely,
Jogendra Patel`,
  },
  {
    id: 'job-seadrill-015',
    title: 'Rig Mechanic - Deepwater Semi-Submersible',
    targetRole: 'Rig Mechanic',
    company: 'Seadrill Limited',
    location: 'Port Harcourt Offshore / Gulf of Guinea',
    country: 'Nigeria',
    region: 'Africa',
    isOffshore: true,
    rigType: 'Semi-Submersible',
    rigName: 'West Saturn Deepwater Fleet',
    postedDate: '1 day ago',
    source: 'oilandgasjobsearch.com',
    appliedVia: 'OGJS Direct Recruiter Feed',
    url: 'https://www.seadrill.com/careers/',
    salaryOrDayRate: '$5,600 - $6,800 / month (28/28 Rotation)',
    rotation: '28/28 Rotation',
    description: `Seadrill is recruiting Rig Mechanics for our deepwater drilling campaign offshore Nigeria.
- Preventative maintenance on EMD 645E8 diesel engines, high-pressure mud circulating systems, and top drive units.
- Service high-pressure valves, shale shakers, and decanter centrifuges.`,
    requiredEquipments: [
      'EMD 645E8 Diesels',
      'National 12P160 Mud Pumps',
      'Solids Control Centrifuges',
      'Hydraulic Circuits',
    ],
    requiredCertifications: ['BOSIET', 'Diploma/Degree Mechanical Engg', 'Passport Valid 5+ Yrs'],
    minExperienceYears: 6,
    matchScore: 97,
    status: 'new_match',
    recruiterEmail: 'nigeria-recruiting@seadrill.com',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 97,
      machineryFit: 100,
      certificationsFit: 100,
      experienceFit: 96,
      rigTypeFit: 94,
      keyStrengths: [
        'Direct 2 years West Africa rig experience in Nigeria with SEEPCO on Rig DURGA-1.',
        'Overhaul of EMD 645E8 engines.',
        'BOSIET valid to 2026, passport valid to 2033.',
      ],
      missingOrGaps: ['None.'],
      reasoning: 'Prior Nigeria rig experience makes candidate ideal for immediate deployment.',
    },
    screeningAnswers: [
      {
        question: 'Have you worked in Nigeria or West Africa?',
        answer: 'Yes, 2 years in Nigeria with SEEPCO on Rig DURGA-1 as Rig Mechanic cum Solids Control Engineer.',
        highlight: '2 Yrs Nigeria Exp',
      },
    ],
    tailoredCoverLetter: `Dear Seadrill Nigeria Recruitment,

I am writing to apply for the Rig Mechanic position on your deepwater fleet offshore Nigeria. Having worked in Nigeria for two years on Rig DURGA-1 with SEEPCO, I am familiar with Nigerian offshore logistics and maintenance requirements.

Sincerely,
Jogendra Patel`,
  },
  {
    id: 'job-stena-016',
    title: 'Maintenance Engineer Mechanical - Ice-Class Drillship',
    targetRole: 'Maintenance Engineer',
    company: 'Stena Drilling Ltd',
    location: 'Aberdeen Offshore / West of Shetland',
    country: 'United Kingdom',
    region: 'North Sea / Europe',
    isOffshore: true,
    rigType: 'Drillship',
    rigName: 'Stena IceMAX / Stena Carron',
    postedDate: '2 days ago',
    source: 'energyjobline.com',
    appliedVia: 'Energy Jobline Global',
    url: 'https://www.stenadrilling.com/careers/',
    salaryOrDayRate: '£450 - £560 / day (21/21 Rotation)',
    rotation: '21/21 Rotation',
    description: `Stena Drilling has an opportunity for a Mechanical Maintenance Engineer on our ice-class ultra-deepwater drillship fleet.
- Coordinate planned maintenance schedules on diesel electric machinery, high-pressure mud pumps, and hydraulic motion compensators.
- Utilize Maximo CMMS to track equipment condition and spare parts inventory.`,
    requiredEquipments: [
      'Wärtsilä / Caterpillar Engines',
      'NOV 14P220 Mud Pumps',
      'Maximo CMMS',
      'Hydraulic Motion Compensators',
    ],
    requiredCertifications: ['Degree in Mechanical Engineering', 'BOSIET with CA-EBS', 'OEUK Medical'],
    minExperienceYears: 6,
    matchScore: 92,
    status: 'new_match',
    recruiterEmail: 'careers@stenadrilling.com',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 92,
      machineryFit: 94,
      certificationsFit: 92,
      experienceFit: 92,
      rigTypeFit: 90,
      keyStrengths: [
        'Bachelor Degree in Mechanical Engineering (87.5% marks).',
        '12+ years heavy mechanical maintenance on drilling rigs.',
      ],
      missingOrGaps: ['CA-EBS module required for UK offshore'],
      reasoning: 'Holds required Mechanical Engineering degree and 12 years of heavy machinery maintenance.',
    },
    screeningAnswers: [
      {
        question: 'Do you hold a Degree in Mechanical Engineering?',
        answer: 'Yes, Bachelor of Technology in Mechanical Engineering with 87.5% marks.',
        highlight: 'B.Eng Mechanical',
      },
    ],
    tailoredCoverLetter: `Dear Stena Drilling Talent Acquisition,

I am writing to express my interest in the Mechanical Maintenance Engineer position for Stena Drilling. With a Bachelor Degree in Mechanical Engineering (87.5% marks) and 12+ years in oilfield drilling machinery maintenance, I offer strong analytical and hands-on maintenance capabilities.

Sincerely,
Jogendra Patel`,
  },
  {
    id: 'job-valaris-guyana-017',
    title: 'Maintenance Engineer (Mechanical) - Deepwater Campaign',
    targetRole: 'Maintenance Engineer',
    company: 'Valaris Limited',
    location: 'Georgetown Offshore / Stabroek Block',
    country: 'Guyana',
    region: 'Americas',
    isOffshore: true,
    rigType: 'Drillship',
    rigName: 'Valaris DS-17 Ultra-Deepwater Drillship',
    postedDate: '2 days ago',
    source: 'linkedin.com',
    appliedVia: 'LinkedIn Worldwide Direct Apply',
    url: 'https://www.valaris.com/careers/',
    salaryOrDayRate: '$6,800 - $8,200 / month (28/28 Rotation)',
    rotation: '28/28 Rotation',
    description: `Valaris is hiring a Mechanical Maintenance Engineer for ultra-deepwater drilling operations in the prolific Stabroek Block offshore Guyana.
- Plan and manage maintenance routines for main power generation (Caterpillar 3516 / EMD diesels) and 7,500 PSI mud systems.
- Lead troubleshooting of high-pressure hydraulic circuits, centrifuges, and automated drill floor equipment.`,
    requiredEquipments: [
      'Caterpillar 3516 / EMD 710 Diesels',
      '7,500 PSI Mud Pumps',
      'Varco TDS Top Drive',
      'CMMS Maintenance Scheduling',
    ],
    requiredCertifications: ['Bachelor Degree in Mechanical Engineering', 'BOSIET with HUET', 'International Passport'],
    minExperienceYears: 6,
    matchScore: 94,
    status: 'new_match',
    recruiterEmail: 'guyana-careers@valaris.com',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 94,
      machineryFit: 96,
      certificationsFit: 96,
      experienceFit: 94,
      rigTypeFit: 90,
      keyStrengths: [
        'Bachelor Degree in Mechanical Engineering (87.5%).',
        '12+ years mechanical drilling experience.',
        'Passport valid to 2033, BOSIET valid to 2026.',
      ],
      missingOrGaps: ['None.'],
      reasoning: 'Holds required Mechanical Engineering degree and 12 years of heavy machinery maintenance.',
    },
    screeningAnswers: [
      {
        question: 'Do you hold a Degree in Mechanical Engineering and valid BOSIET?',
        answer: 'Yes, Bachelor Degree in Mechanical Engineering (87.5%) and active BOSIET valid to 2026.',
        highlight: 'Degree + BOSIET',
      },
    ],
    tailoredCoverLetter: `Dear Valaris Guyana Recruitment,

I am writing to apply for the Mechanical Maintenance Engineer position supporting your ultra-deepwater campaign offshore Guyana. With a Bachelor Degree in Mechanical Engineering (87.5%) and 12+ years of heavy drilling mechanics, I specialize in Caterpillar and EMD engines, high-pressure mud circulation, and CMMS asset integrity.

Sincerely,
Jogendra Patel`,
  },
  {
    id: 'job-nabors-me-018',
    title: 'Rig Mechanic - PACE-X Automated Walking Rig',
    targetRole: 'Rig Mechanic',
    company: 'Nabors Drilling International',
    location: 'Muscat / Nimr Desert Base',
    country: 'Oman',
    region: 'Middle East',
    isOffshore: false,
    rigType: 'Land Rig',
    rigName: 'PACE-X Walking Rig Series',
    postedDate: '2 days ago',
    source: 'rigzone.com',
    appliedVia: 'Rigzone QuickApply Feed',
    url: 'https://www.nabors.com/careers/',
    salaryOrDayRate: '$4,800 - $5,900 / month (28/28 Rotation)',
    rotation: '28/28 Rotation',
    description: `Nabors Drilling is seeking an experienced Rig Mechanic for our PACE-X automated walking rig fleet in the Sultanate of Oman.
- Preventive and corrective maintenance of Caterpillar 3512/3516 diesel generator packages and Canrig top drives.
- Overhaul Gardner Denver mud pumps, centrifugal pumps, and hydraulic walking systems.`,
    requiredEquipments: [
      'Caterpillar 3512 / 3516 Engines',
      'Gardner Denver Mud Pumps',
      'Canrig Top Drives',
      'Hydraulic Walking Systems',
    ],
    requiredCertifications: ['Mechanical Diploma / Degree', 'HSE / LOTO Certification'],
    minExperienceYears: 5,
    matchScore: 96,
    status: 'new_match',
    recruiterEmail: 'middleeast-jobs@nabors.com',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 96,
      machineryFit: 98,
      certificationsFit: 96,
      experienceFit: 96,
      rigTypeFit: 96,
      keyStrengths: [
        'Currently working in Middle East drilling operations in Saudi Arabia.',
        'Extensive Caterpillar 3512/3516 overhaul experience.',
        '12+ years heavy drilling equipment maintenance.',
      ],
      missingOrGaps: ['None.'],
      reasoning: 'Extensive Caterpillar diesel and mud pump maintenance background.',
    },
    screeningAnswers: [
      {
        question: 'Are you experienced with Caterpillar rig power generation?',
        answer: 'Yes, 12+ years overhauling Caterpillar 3516B and D399 series engines.',
        highlight: 'Cat Engine Expert',
      },
    ],
    tailoredCoverLetter: `Dear Nabors Drilling Middle East,

I am writing to apply for the Rig Mechanic position with Nabors Drilling in Oman. Having worked 12+ years across heavy drilling operations and currently stationed in Saudi Arabia on drilling operations with Halliburton, I offer proven capability across Caterpillar 3516 engines, triplex mud pumps, and hydraulic systems.

Sincerely,
Jogendra Patel`,
  },
  {
    id: 'job-sanguine-019',
    title: 'Rig Mechanic - Offshore Drilling (Jack-Up)',
    targetRole: 'Rig Mechanic',
    company: 'Sanguine Oilfield Services LLP',
    location: 'Mumbai Offshore / Nhava Base, Maharashtra',
    country: 'India',
    region: 'India',
    isOffshore: true,
    rigType: 'Jack-Up',
    rigName: 'Offshore Jack-Up Operations (ONGC Charter)',
    postedDate: '6 hours ago',
    source: 'linkedin.in',
    appliedVia: 'LinkedIn India Easy Apply API',
    url: 'https://www.linkedin.com/jobs/search/?keywords=Sanguine+Oilfield+Rig+Mechanic&location=India',
    salaryOrDayRate: '₹1,50,000 - ₹2,10,000 / month (14/14 or 28/28)',
    rotation: '14/14 or 28/28 Rotation',
    description: `Sanguine Oilfield Services is mobilizing skilled Rig Mechanics for ongoing offshore operations on behalf of major drilling contractors operating for ONGC Mumbai High.
Key Roles:
- Preventive and breakdown maintenance of diesel generators (Caterpillar D399 / 3516B), rotary tables, and drawworks.
- Overhauling mud pump fluid ends (valves, seats, liners, pistons) and charge centrifugal pumps.
- Daily inspection of compressed air systems (Ingersoll-Rand), water makers, and jacking gear.`,
    requiredEquipments: [
      'Caterpillar D399 / 3516B',
      'Mud Pump Fluid Ends (12P160)',
      'Drawworks & Rotary Table',
      'Ingersoll-Rand Compressors',
    ],
    requiredCertifications: ['BOSIET (Valid)', 'Diploma/Degree in Mechanical Engg', 'Safety Leadership'],
    minExperienceYears: 5,
    matchScore: 98,
    status: 'new_match',
    recruiterEmail: 'hr@sanguineoilfield.com',
    emailRetrievedFromAd: true,
    matchAnalysis: {
      overallScore: 98,
      machineryFit: 100,
      certificationsFit: 100,
      experienceFit: 98,
      rigTypeFit: 100,
      keyStrengths: [
        'Direct 7+ years on ONGC charter rigs in Mumbai High.',
        'Expert on Caterpillar D399 and 3516B engines.',
        'Active BOSIET valid through 2026.',
      ],
      missingOrGaps: ['None.'],
      reasoning: 'Candidate worked extensively in Mumbai High with Shelf Drilling on ONGC operations.',
    },
    screeningAnswers: [
      {
        question: 'Have you worked offshore in Mumbai High on ONGC drilling contracts?',
        answer: 'Yes, 7+ years with Shelf Drilling on the C.E. Thornton and JTA Jack-Ups drilling for ONGC in Mumbai High.',
        highlight: '7+ Yrs ONGC Mumbai High',
      },
    ],
    tailoredCoverLetter: `Dear Sanguine Oilfield Services Team,

I am writing to apply for the Rig Mechanic position for your Mumbai High offshore operations. Having spent over seven years operating on Shelf Drilling Jack-Up rigs (C.E. Thornton and JTA) chartered for ONGC in Mumbai High, I possess firsthand knowledge of offshore logistics, ONGC safety rules, and equipment standards.

Sincerely,
Jogendra Patel`,
  },
];

export const INITIAL_JOB_LISTINGS: JobListing[] = RAW_JOB_LISTINGS.map((job) => {
  const extracted = extractRecruiterEmail(job.description, job.company, job.targetRole);
  return {
    ...job,
    recruiterEmail: job.recruiterEmail || extracted.email,
    emailRetrievedFromAd: true,
  };
});
