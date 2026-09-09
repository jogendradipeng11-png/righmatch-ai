import { JobListing } from '../types';
import { extractRecruiterEmail } from '../lib/gmailService';

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
    url: 'https://in.linkedin.com/jobs/view/shelf-drilling-senior-rig-mechanic-mumbai-high',
    salaryOrDayRate: '₹1,80,000 - ₹2,50,000 / month (28/28 Rotation)',
    rotation: '28/28 Rotation',
    description: `We are urgently hiring an experienced Senior Rig Mechanic for our Jack-Up drilling fleet operating offshore Mumbai High under long-term contract with ONGC.
Key Responsibilities:
- Direct supervision and overhaul of diesel power generation engines (Caterpillar 3516B / D399 series) and auxiliary equipment.
- Routine and emergency maintenance on National 12P160 Triplex mud pumps, National 1625 DE Drawworks, and Varco TDS-8SA Top Drive.
- Inspect and maintain Jack-up rack and pinion jacking gearboxes, Skagit cranes, and pneumatic systems.
- Maintain accurate maintenance logs utilizing CMMS (JDE Edwards), ensure strict adherence to PTW, JSA, and offshore safety protocols.
Requirements:
- Minimum 8-10 years offshore drilling experience on Jack-Up rigs.
- Valid BOSIET certification and valid passport.
- In-depth mechanical knowledge of Caterpillar, Varco Top Drive, and National mud pumps.`,
    requiredEquipments: [
      'Caterpillar 3516 B / D399',
      'Varco TDS-8SA Top Drive',
      'National 12P160 Mud Pumps',
      'Jacking Gearboxes',
      'JDE Maintenance System',
    ],
    requiredCertifications: ['BOSIET (Valid)', 'Safety Leadership', 'LOTO & PTW'],
    minExperienceYears: 8,
    matchScore: 97,
    status: 'pending_approval',
    matchAnalysis: {
      overallScore: 97,
      machineryFit: 98,
      certificationsFit: 100,
      experienceFit: 96,
      rigTypeFit: 100,
      keyStrengths: [
        '7 years prior direct experience on Shelf Drilling Jack-Up rigs (C.E. Thornton & JTA) in Mumbai High for ONGC.',
        'Extensive expertise on exact engine specs: Cat 3516B & D399.',
        'Mastery of Varco TDS-8SA Top Drive, National 1625 DE Drawworks, and National 12P160 Triplex Mud Pumps.',
        'Hands-on expertise with Jack-up rack & pinion jacking gearbox overhauls and JDE Software logging.',
        'Valid BOSIET certificate (valid to 2026, Mumbai) and active passport.',
      ],
      missingOrGaps: ['No material gaps identified. Near-perfect alignment with Shelf Drilling operational requirements.'],
      reasoning:
        'Jogendra previously worked at Shelf Drilling on the exact same rig fleet (C.E. Thornton & JTA) offshore Mumbai High for ONGC, operating the exact machinery stack specified.',
    },
    screeningAnswers: [
      {
        question: 'Do you possess an active BOSIET certification with valid offshore survival training?',
        answer: 'Yes, I hold a fully valid BOSIET issued in Mumbai, valid through 2026.',
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
    id: 'job-transocean-002',
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
    url: 'https://in.linkedin.com/jobs/view/transocean-maintenance-engineer-kg-basin',
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
    matchAnalysis: {
      overallScore: 94,
      machineryFit: 95,
      certificationsFit: 100,
      experienceFit: 96,
      rigTypeFit: 88,
      keyStrengths: [
        'Bachelor Degree in Mechanical Engineering (87.5% Grade A) from recognized university.',
        'Prior Transocean rig experience (Hold Fire Watch and PROMT/START Card from Transocean Rig Actinia).',
        'Demonstrated 12+ years experience on high-pressure drilling hydraulics, EMD 645E8 and Caterpillar 3516 engines.',
        'Solid background in computerized maintenance systems (JDE) and risk assessments.',
      ],
      missingOrGaps: ['Deepwater drillship operations vs primary jack-up/land rig background; easily bridgeable.'],
      reasoning:
        'Jogendra holds the required Bachelor Degree in Mechanical Engineering and holds Transocean rig certification credentials with 12+ years heavy drilling equipment maintenance.',
    },
    screeningAnswers: [
      {
        question: 'Do you hold a recognized Bachelor Degree in Mechanical Engineering?',
        answer:
          'Yes, I hold a Bachelor Degree in Mechanical Engineering with 87.5% (Grade A) alongside a Diploma in Mechanical Engg with Distinction.',
        highlight: 'B.Eng Mechanical (87.5%)',
      },
      {
        question: 'Have you worked on EMD 645E8 and Caterpillar heavy marine/rig engines?',
        answer:
          'Yes, maintained EMD 645E8 engines during 2 years in Nigeria (SEEPCO Rig DURGA-1) and Caterpillar 3516B/D399 across Mumbai High and Saudi Arabia projects.',
        highlight: 'EMD 645E8 & Cat Specialist',
      },
      {
        question: 'Do you have Transocean safety orientation or prior rig exposure?',
        answer:
          'Yes, I hold Transocean Rig ACTINIA certifications including Fire Watch, PROMT Card, and START Conversation Card.',
        highlight: 'Transocean Rig Certs',
      },
    ],
    tailoredCoverLetter: `Dear Transocean Recruitment Team,

I am writing to apply for the Mechanical Maintenance Engineer position for Transocean's deepwater operations in India. With a Bachelor Degree in Mechanical Engineering (87.5% marks) and more than 12 years of hands-on drilling equipment maintenance across offshore jack-ups, drillships, and land rigs, I offer both technical analytical capability and practical rig-floor execution.

Notably, I previously obtained safety certifications on the Transocean Rig ACTINIA (including Fire Watch, PROMT Card, and START Safety systems), instilling in me Transocean's world-class safety standards. My technical expertise spans overhauls of EMD 645E8 and Caterpillar 3516B engines, Varco TDS-8SA top drive troubleshooting, high-pressure mud pump fluid end servicing, and CMMS asset tracking via JDE software.

Currently supporting Halliburton's unconventional drilling project with Saudi Aramco, I hold valid BOSIET certification and look forward to contributing to Transocean's zero-incident mission.

Warm regards,
Jogendra Patel
Email: jogendra.dipeng11@gmail.com | Phone: +91-7077869585`,
  },
  {
    id: 'job-halliburton-003',
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
    url: 'https://www.linkedin.com/jobs/view/halliburton-drilling-equipment-technician-saudi',
    salaryOrDayRate: '$4,500 - $5,800 / month (35/35 Rotation)',
    rotation: '35/35 Rotation',
    description: `Halliburton Baroid / Drilling & Evaluation division is recruiting experienced Drilling Equipment Technicians to maintain drilling waste management, solids control decanters, high-pressure pumps, and mechanical rig packages.
Duties:
- Installation, commissioning, maintenance, and teardown of solids control centrifuges, shale shakers, cutting dryers, and screw conveyors.
- Troubleshoot diesel engines, centrifugal feed pumps, and variable frequency drive (VFD) electronic control panels.
- Perform daily equipment checkouts, maintain accurate equipment maintenance history logs.
Requirements:
- 5+ years experience in drilling equipment maintenance and solids control.
- Experience with Caterpillar/Doosan engines, Mono pumps, Alfa Laval centrifuges.
- Must be familiar with Middle East onshore drilling operations.`,
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
    matchAnalysis: {
      overallScore: 99,
      machineryFit: 100,
      certificationsFit: 100,
      experienceFit: 100,
      rigTypeFit: 96,
      keyStrengths: [
        'Currently employed directly by Halliburton on unconventional rig drilling project with Aramco in Saudi Arabia (since Feb 2024).',
        'Specialized dual experience as Rig Mechanic cum Solids Control Engineer.',
        'Extensive expertise with decanter centrifuges (CD 518 FH, GNSC363C), cutting dryers (WSM-04, VG-005), mono pumps (MN-120/MN-80), and screw augers (AUG-300/250).',
        'Familiar with Saudi Aramco onshore safety rules and HSE standards.',
      ],
      missingOrGaps: ['None. Internal company alignment and current project continuity.'],
      reasoning:
        'Jogendra is already working with Halliburton in Saudi Arabia on the Aramco project and was previously a Rig Mechanic cum Solids Control Engineer in Nigeria.',
    },
    screeningAnswers: [
      {
        question: 'Are you currently working in Saudi Arabia or familiar with Aramco drilling requirements?',
        answer: 'Yes, I am currently working with Halliburton in Saudi Arabia on Aramco unconventional rig drilling projects.',
        highlight: 'Active Halliburton Aramco Tech',
      },
      {
        question: 'What specific solids control equipment have you maintained?',
        answer:
          'CD 518 FH and GNSC363C centrifuges, WSM-04 & VG-005 cutting dryers, MN-120/80 mono pumps, and AUG-300 screw conveyors.',
        highlight: 'Full Solids Control Fleet',
      },
    ],
    tailoredCoverLetter: `Dear Halliburton Recruitment Team,

As a current Mechanic with Halliburton in the Unconventional Rig Drilling Project with Saudi Aramco, I am pleased to present my application for the Drilling Equipment Technician (Solids Control & Mechanical) role.

Having worked as both a Rig Mechanic and Solids Control Engineer across diverse onshore and offshore installations, I have mastered the maintenance of decanter centrifuges (CD 518 FH, GNSC363C), cutting dryers (WSM-04), mono pumps, VFD control systems, and screw conveyors. My dual expertise in heavy diesel prime movers (Caterpillar 3516B, EMD, Doosan) and solids separation allows me to optimize equipment uptime while enforcing strict Aramco HSE and LOTO standards.

I look forward to discussing how my inside experience and mechanical proficiency will continue driving excellence for Halliburton.

Best regards,
Jogendra Patel`,
  },
  {
    id: 'job-sanguine-004',
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
    url: 'https://in.linkedin.com/jobs/view/sanguine-oilfield-rig-mechanic-mumbai',
    salaryOrDayRate: '₹1,50,000 - ₹2,10,000 / month (14/14 or 28/28)',
    rotation: '14/14 or 28/28 Rotation',
    description: `Sanguine Oilfield Services is mobilizing skilled Rig Mechanics for ongoing offshore operations on behalf of major drilling contractors operating for ONGC Mumbai High.
Key Roles:
- Preventive and breakdown maintenance of diesel generators (Caterpillar D399 / 3516B), rotary tables, and drawworks.
- Overhauling mud pump fluid ends (valves, seats, liners, pistons) and charge centrifugal pumps.
- Daily inspection of compressed air systems (Ingersoll-Rand), water makers, and jacking gear.
- Maintain routine logs, participate in tool box meetings, and conduct JSAs.
Requirements:
- Diploma or Degree in Mechanical Engineering / ITI.
- Minimum 5 years experience on offshore rigs.
- Valid BOSIET from OPITO approved center.`,
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
    matchAnalysis: {
      overallScore: 98,
      machineryFit: 100,
      certificationsFit: 100,
      experienceFit: 98,
      rigTypeFit: 100,
      keyStrengths: [
        'Prior direct employment record with Sanguine Oilfield Services LLP (Jan 2017 - Feb 2024) placed on Shelf Drilling Jack-up rigs.',
        'Immediate onboarding potential with established company file and Mumbai high credentials.',
        'Complete mastery of all listed machinery: Cat D399, Cat 3516B, National 12P160, Ingersoll-Rand air compressors.',
      ],
      missingOrGaps: ['None. Former valued employee seeking deployment.'],
      reasoning:
        'Jogendra worked on behalf of Sanguine Oilfield Services LLP for 7 years drilling for ONGC in Mumbai High. Zero learning curve.',
    },
    screeningAnswers: [
      {
        question: 'Have you worked with Sanguine Oilfield Services in the past?',
        answer: 'Yes, I was employed with Sanguine Oilfield Services LLP from Jan 2017 through Feb 2024 on Shelf Drilling Jack-up rigs.',
        highlight: '7 Years Ex-Sanguine Employee',
      },
      {
        question: 'Is your BOSIET valid?',
        answer: 'Yes, valid through 2026, issued in Mumbai.',
        highlight: 'BOSIET Valid to 2026',
      },
    ],
    tailoredCoverLetter: `Dear Sanguine Oilfield Services Recruitment,

I am writing to re-engage with Sanguine Oilfield Services LLP for the Rig Mechanic opening. Having proudly represented Sanguine on the Shelf Drilling C.E. Thornton and JTA Jack-up rigs in Mumbai High for ONGC operations for seven years, I am ready to step in with zero ramp-up time.

My mechanical track record includes routine overhauls of Caterpillar 3516B and D399 engines, mud pump fluid ends, National drawworks, and top drive systems, always adhering to ONGC and Sanguine HSE mandates.

I look forward to discussing my upcoming availability.

Best regards,
Jogendra Patel`,
  },
  {
    id: 'job-slb-005',
    title: 'Maintenance Technician - Drilling & Mechanical Systems',
    targetRole: 'Maintenance Technician',
    company: 'SLB (Schlumberger)',
    location: 'Navi Mumbai / Offshore India Support Base',
    country: 'India',
    region: 'India',
    isOffshore: false,
    rigType: 'Offshore Platform',
    postedDate: '12 hours ago',
    source: 'linkedin.in',
    appliedVia: 'LinkedIn India Direct Recruiter Feed',
    url: 'https://in.linkedin.com/jobs/view/slb-maintenance-technician-navi-mumbai',
    salaryOrDayRate: '₹1,40,000 - ₹1,90,000 / month',
    rotation: 'Onshore Base / Rig Support',
    description: `SLB is looking for a Maintenance Technician to support mechanical drilling equipment maintenance, overhaul, and testing at our Western India support base and offshore facilities.
Key Responsibilities:
- Disassemble, inspect, overhaul, and test high-pressure pumps, hydraulic power units, centrifuges, and auxiliary engines.
- Conduct non-destructive evaluations, preventive maintenance schedules, and safety audits.
- Complete documentation in maintenance tracking systems.
Qualifications:
- ITI / Diploma in Mechanical Engineering or Refrigeration & A/C.
- 4+ years experience in heavy industrial or oilfield maintenance.
- Strong knowledge of pump overhauling, hydraulic circuits, and diesel engines.`,
    requiredEquipments: [
      'High-Pressure Mud Pumps',
      'Hydraulic Power Units',
      'Centrifuges & Shakers',
      'Diesel Engines',
    ],
    requiredCertifications: ['Diploma/ITI Mechanical', 'Basic Rig Safety'],
    minExperienceYears: 4,
    matchScore: 92,
    status: 'new_match',
    matchAnalysis: {
      overallScore: 92,
      machineryFit: 94,
      certificationsFit: 95,
      experienceFit: 95,
      rigTypeFit: 85,
      keyStrengths: [
        'Holds both Diploma in Mechanical Engg (Distinction) and ITI Refrigeration & A/C Mech (85%).',
        '12+ years experience in high-pressure oilfield pumps, hydraulics, and centrifuges.',
        'Strong base in Mumbai / Navi Mumbai mobilization.',
      ],
      missingOrGaps: ['Base workshop support role vs offshore rig floor preference; good fallback option.'],
      reasoning:
        'Jogendra exceeds the mechanical criteria and holds the exact educational qualifications (Diploma + ITI) sought by SLB.',
    },
    screeningAnswers: [
      {
        question: 'What is your mechanical educational background?',
        answer: 'Diploma in Mechanical Engineering (80.96% with Distinction) and Govt. ITI in RAC Mech (85%).',
        highlight: 'Diploma + ITI Certified',
      },
    ],
    tailoredCoverLetter: `Dear SLB Hiring Team,

I am applying for the Maintenance Technician position at SLB. With a Diploma in Mechanical Engineering and over 12 years of hands-on experience maintaining high-pressure mud pumps, Caterpillar engines, hydraulic power units, and decanter centrifuges across offshore and onshore drilling operations, I am well-equipped to deliver top-tier maintenance standards for SLB.

My background includes structured apprenticeship with Tata Refractories, extensive field experience with Shelf Drilling and Halliburton, and complete familiarity with CMMS maintenance workflows.

Sincerely,
Jogendra Patel`,
  },
  {
    id: 'job-noble-006',
    title: 'Senior Rig Mechanic (High-Spec Harsh Environment)',
    targetRole: 'Senior Rig Mechanic',
    company: 'Noble Corporation',
    location: 'Dammam / Offshore Arabian Gulf',
    country: 'Saudi Arabia',
    region: 'Middle East',
    isOffshore: true,
    rigType: 'Jack-Up',
    rigName: 'Noble Lloyd Noble Class',
    postedDate: '1 day ago',
    source: 'linkedin.com',
    appliedVia: 'Noble Careers Portal / LinkedIn Direct',
    url: 'https://www.linkedin.com/jobs/view/noble-corporation-senior-rig-mechanic-arabian-gulf',
    salaryOrDayRate: '$5,200 - $6,500 / month (28/28 Rotation)',
    rotation: '28/28 Rotation',
    description: `Noble Corporation is accepting applications for Senior Rig Mechanics on our modern high-spec Jack-Up rigs operating in the Arabian Gulf.
Responsibilities:
- Responsible for all drilling and marine mechanical machinery maintenance, including Caterpillar 3516B/C engines, Varco TDS-8SA top drive, National 14-P-220/12-P-160 mud pumps.
- Coordinate with Chief Engineer and Toolpusher on planned maintenance schedules, overhaul planning, and critical spare parts inventory.
- Ensure 100% compliance with Noble HSE policy, Permit to Work, and Job Safety Analyses.
Requirements:
- 7+ years offshore Jack-up experience as Rig Mechanic.
- Proven competence on Caterpillar engines and Varco top drives.
- Valid BOSIET, Passport, and Medical fitness certificate.`,
    requiredEquipments: [
      'Caterpillar 3516 B/C',
      'Varco TDS-8SA',
      'Triplex Mud Pumps (National 12P160/14P220)',
      'Drawworks & Jacking Systems',
    ],
    requiredCertifications: ['BOSIET (OPITO)', 'Valid Passport', 'Safety Leadership'],
    minExperienceYears: 7,
    matchScore: 96,
    status: 'new_match',
    matchAnalysis: {
      overallScore: 96,
      machineryFit: 98,
      certificationsFit: 100,
      experienceFit: 96,
      rigTypeFit: 95,
      keyStrengths: [
        'Currently in Saudi Arabia with Halliburton (Aramco unconventional drilling).',
        '7 years dedicated Jack-up rig mechanic experience with Shelf Drilling.',
        'Extensive overhauls of Cat 3516B and Varco TDS-8SA.',
        'Valid BOSIET (expiry 2026) and active Indian Passport (expiry 2033).',
      ],
      missingOrGaps: ['Familiar with Noble SMS systems vs Shelf Drilling SMS, very quick transition.'],
      reasoning:
        'Jogendra combines current Saudi Arabia presence with deep Jack-up rig mechanic experience on the exact equipment listed.',
    },
    screeningAnswers: [
      {
        question: 'Do you currently reside or work in Saudi Arabia?',
        answer: 'Yes, presently working in Saudi Arabia on Halliburton/Aramco drilling operations.',
        highlight: 'In-Country Saudi Arabia',
      },
      {
        question: 'Do you have valid BOSIET and offshore medical?',
        answer: 'Yes, BOSIET valid till 2026 and offshore medical cleared.',
        highlight: 'BOSIET 2026',
      },
    ],
    tailoredCoverLetter: `Dear Noble Corporation Recruitment,

I am writing to apply for the Senior Rig Mechanic role with Noble Corporation in the Arabian Gulf. Having spent over seven years as a Rig Mechanic on offshore Jack-up rigs with Shelf Drilling and currently working on drilling operations in Saudi Arabia with Halliburton, I am uniquely positioned for this vacancy.

My expertise directly mirrors Noble's operational equipment: overhauling Caterpillar 3516B engines, Varco TDS-8SA top drive troubleshooting, National 12P160 mud pump rebuilds, and jacking gearbox maintenance. I hold a valid BOSIET (through 2026) and an active passport valid until 2033.

I welcome the opportunity to bring my hands-on mechanical dedication to Noble Corporation.

Sincerely,
Jogendra Patel`,
  },
  {
    id: 'job-rigzone-saipem-007',
    title: 'Senior Rig Mechanic - Offshore Semi-Submersible',
    targetRole: 'Senior Rig Mechanic',
    company: 'Saipem Drilling Services',
    location: 'Aberdeen Offshore, North Sea',
    country: 'United Kingdom',
    region: 'North Sea / Europe',
    isOffshore: true,
    rigType: 'Semi-Submersible',
    rigName: 'Scarabeo Fleet Harsh Environment',
    postedDate: '3 hours ago',
    source: 'rigzone.com',
    appliedVia: 'Rigzone QuickApply XML Gateway',
    url: 'https://www.rigzone.com/oil/jobs/postings/saipem-senior-rig-mechanic-north-sea',
    salaryOrDayRate: '£480 - £620 / day (21/21 Rotation)',
    rotation: '21/21 Rotation',
    description: `Saipem is looking for a Senior Rig Mechanic on high-spec Semi-Submersible rigs operating in the UK Continental Shelf (North Sea).
Responsibilities:
- Overhaul of main diesel engines (Caterpillar 3516B / Wärtsilä marine engines) and auxiliary generating sets.
- Maintenance of National 14-P-220/12-P-160 mud pumps, Varco TDS Top Drive, and BOP crane handling systems.
- Manage planned maintenance routines via SAP/JDE, enforce permit to work and cold work safety protocols.
Requirements:
- Minimum 8 years offshore experience on mobile offshore drilling units.
- Valid BOSIET with CA-EBS (UK / North Sea compliant) and OGUK medical.
- Proven mechanical expertise in high-pressure mud circulation and Caterpillar power.`,
    requiredEquipments: [
      'Caterpillar 3516B / Wärtsilä Engines',
      'Varco TDS Top Drive',
      'National 12P160 / 14P220 Pumps',
      'Hydraulic Handling & Cranes',
    ],
    requiredCertifications: ['BOSIET (OPITO)', 'OGUK Medical', 'Mechanical Engineering Qualification'],
    minExperienceYears: 8,
    matchScore: 96,
    status: 'pending_approval',
    matchAnalysis: {
      overallScore: 96,
      machineryFit: 98,
      certificationsFit: 96,
      experienceFit: 97,
      rigTypeFit: 94,
      keyStrengths: [
        '12+ years continuous hands-on experience on Caterpillar 3516B and National 12P160 pumps.',
        'Extensive Varco TDS top drive maintenance expertise.',
        'Holds active OPITO-approved BOSIET valid through 2026.',
        'Bachelor Degree in Mechanical Engineering (87.5%).',
      ],
      missingOrGaps: ['North Sea CA-EBS module can be scheduled upon mobilization.'],
      reasoning: 'Matches all equipment and offshore criteria on Rigzone portal.',
    },
    screeningAnswers: [
      {
        question: 'Do you hold an active OPITO approved BOSIET?',
        answer: 'Yes, valid through 2026, issued at Mumbai approved training center.',
        highlight: 'BOSIET 2026',
      },
      {
        question: 'How many years experience do you have overhauling Caterpillar 3516B engines?',
        answer: 'Over 10 years performing top-end and full overhauls on Caterpillar 3516B and D399 series engines.',
        highlight: '10+ Yrs Cat 3516B',
      },
    ],
    tailoredCoverLetter: `Dear Saipem Recruitment Team,

I am writing via Rigzone QuickApply to submit my application for the Senior Rig Mechanic position on your North Sea Semi-Submersible fleet. With over 12 years of hands-on rig mechanic experience across offshore Jack-ups, Drillships, and land drilling packages, I possess deep technical competence in maintaining zero-downtime drilling machinery.

My field background includes continuous maintenance and overhauls of Caterpillar 3516B engines, Varco TDS-8SA top drives, and National 12P160 triplex mud pumps with Shelf Drilling in Mumbai High and Halliburton in Saudi Arabia. I hold a Bachelor Degree in Mechanical Engineering, active BOSIET certification valid to 2026, and an active passport valid until 2033.

I look forward to contributing to Saipem's world-class North Sea offshore operations.

Sincerely,
Jogendra Patel
jogendra.dipeng11@gmail.com | +91-7077869585`,
  },
  {
    id: 'job-ogjs-borr-008',
    title: 'Rig Mechanic - High-Spec Jack-Up Fleet',
    targetRole: 'Rig Mechanic',
    company: 'Borr Drilling Ltd',
    location: 'Abu Dhabi Offshore / Arabian Gulf',
    country: 'United Arab Emirates',
    region: 'Middle East',
    isOffshore: true,
    rigType: 'Jack-Up',
    rigName: 'Borr Ran / Frigg Class Modern Jack-Up',
    postedDate: '4 hours ago',
    source: 'oilandgasjobsearch.com',
    appliedVia: 'OGJS Direct Recruiter Feed',
    url: 'https://www.oilandgasjobsearch.com/jobs/borr-drilling-rig-mechanic-arabian-gulf',
    salaryOrDayRate: '$4,800 - $6,200 / month (28/28 Rotation)',
    rotation: '28/28 Rotation',
    description: `Borr Drilling is seeking an energetic Rig Mechanic to join our modern high-spec Jack-Up rig fleet operating in the Arabian Gulf for ADNOC Offshore campaigns.
Duties:
- Daily preventive maintenance and overhauls on Caterpillar 3516C diesel engines, Lewco/National triplex mud pumps, and Varco top drive packages.
- Perform inspection and lube servicing of Jack-up rack & pinion jacking system pinions, cranes, and pneumatic systems.
- Maintain accurate equipment history logs in Maximo/JDE CMMS systems.
Requirements:
- 5+ years offshore Jack-up rig mechanic experience.
- Valid BOSIET and offshore medical.
- Proven competence on Caterpillar engines and hydraulic drilling equipment.`,
    requiredEquipments: [
      'Caterpillar 3516C Engines',
      'Varco Top Drives',
      'Triplex Mud Pumps',
      'Jack-Up Pinion Jacking Gear',
    ],
    requiredCertifications: ['BOSIET (OPITO)', 'Mechanical Diploma/Degree', 'Safety Leadership'],
    minExperienceYears: 5,
    matchScore: 98,
    status: 'pending_approval',
    matchAnalysis: {
      overallScore: 98,
      machineryFit: 100,
      certificationsFit: 100,
      experienceFit: 98,
      rigTypeFit: 100,
      keyStrengths: [
        '7 years dedicated Jack-Up rig mechanic experience on Shelf Drilling fleet.',
        'Extensive expertise with Jack-up rack and pinion jacking gearboxes.',
        'Expertise on Caterpillar 3516 engines and Varco top drives.',
        'Presently based in Middle East region (Saudi Arabia), facilitating rapid UAE visa & mobilization.',
      ],
      missingOrGaps: ['None. Outstanding fit for Borr Drilling modern fleet.'],
      reasoning: 'Extensive jack-up experience matching all equipment and regional deployment needs.',
    },
    screeningAnswers: [
      {
        question: 'Do you have direct Jack-up rack & pinion jacking gearbox overhaul experience?',
        answer: 'Yes, 7 years on Shelf Drilling Jack-ups C.E. Thornton and JTA inspecting and servicing rack and pinion jacking gearboxes.',
        highlight: 'Jack-Up Gearbox Specialist',
      },
      {
        question: 'What is your current location and mobilization notice?',
        answer: 'Currently in Saudi Arabia with Halliburton; can mobilize for UAE hitch within 15-20 days.',
        highlight: 'Middle East Mobilization Ready',
      },
    ],
    tailoredCoverLetter: `Dear Borr Drilling Talent Acquisition,

I am applying through Oil and Gas Job Search for the Rig Mechanic role across your modern Jack-Up fleet in the Arabian Gulf. Having spent 7 years as a Rig Mechanic on Shelf Drilling Jack-up rigs (C.E. Thornton and JTA) and currently operating on drilling campaigns in Saudi Arabia, I bring direct, relevant expertise to Borr Drilling.

My daily work centers on Caterpillar 3516 series engines, Varco TDS top drives, National 12P160 triplex mud pumps, and rack & pinion jacking mechanisms. I hold a Bachelor Degree in Mechanical Engineering, valid BOSIET (2026), and an Indian passport valid until 2033.

I welcome the chance to deliver zero-downtime mechanical reliability for your ADNOC offshore drilling operations.

Sincerely,
Jogendra Patel
Phone: +91-7077869585 | Email: jogendra.dipeng11@gmail.com`,
  },
  {
    id: 'job-rigzone-seadrill-009',
    title: 'Maintenance Engineer - Deepwater Drillship Mechanical Systems',
    targetRole: 'Maintenance Engineer',
    company: 'Seadrill Americas Inc',
    location: 'Houston / Gulf of Mexico Offshore',
    country: 'United States',
    region: 'Americas',
    isOffshore: true,
    rigType: 'Drillship',
    rigName: 'West Fleet Ultra-Deepwater Drillship',
    postedDate: '6 hours ago',
    source: 'rigzone.com',
    appliedVia: 'Rigzone Global ATS Direct',
    url: 'https://www.rigzone.com/oil/jobs/postings/seadrill-maintenance-engineer-gom',
    salaryOrDayRate: '$7,200 - $8,800 / month (28/28 Rotation)',
    rotation: '28/28 Rotation',
    description: `Seadrill Americas has an immediate vacancy for a Mechanical Maintenance Engineer supporting deepwater drillship operations in the Gulf of Mexico.
Responsibilities:
- Manage planned and predictive maintenance schedules for major drilling packages, Cat/EMD power generation, and heave compensation systems.
- Supervise overhaul of 7,500 psi high-pressure mud circulating pumps, top drives, and solids control centrifuge decanters.
- Monitor CMMS work order completion, spare parts inventory, and ensure regulatory USCG/BSEE environmental compliance.
Requirements:
- Bachelor Degree in Mechanical Engineering.
- 6+ years drilling equipment maintenance experience.
- BOSIET with HUET certification and valid passport.`,
    requiredEquipments: [
      'Caterpillar 3516 / EMD 645E8',
      'High-Pressure Mud Circulation (7500 PSI)',
      'Decanter Centrifuges & Solids Control',
      'Varco Top Drive Systems',
    ],
    requiredCertifications: ['Degree in Mechanical Engineering', 'BOSIET (OPITO)', 'PTW / Risk Assessment'],
    minExperienceYears: 6,
    matchScore: 95,
    status: 'new_match',
    matchAnalysis: {
      overallScore: 95,
      machineryFit: 96,
      certificationsFit: 98,
      experienceFit: 96,
      rigTypeFit: 92,
      keyStrengths: [
        'Bachelor Degree in Mechanical Engineering (87.5% Grade A).',
        'Demonstrated 12+ years experience on high pressure drilling systems and EMD/Caterpillar engines.',
        'Proven expertise with solids control centrifuges (CD 518 FH, GNSC363C) and CMMS software.',
        'Holds valid BOSIET valid through 2026.',
      ],
      missingOrGaps: ['Requires B1/OCS US visa or rotational transit support, standard for international rotation.'],
      reasoning: 'Excellent alignment with Seadrill engineering criteria.',
    },
    screeningAnswers: [
      {
        question: 'Do you hold an accredited Bachelor Degree in Mechanical Engineering?',
        answer: 'Yes, Bachelor Degree in Mechanical Engineering with 87.5% (Grade A).',
        highlight: 'B.Eng Mechanical 87.5%',
      },
      {
        question: 'What is your background on EMD and Caterpillar heavy engines?',
        answer: 'Maintained EMD 645E8 engines during 2 years in West Africa and Caterpillar 3516B/D399 across India and Saudi Arabia.',
        highlight: 'EMD & Cat Heavy Power',
      },
    ],
    tailoredCoverLetter: `Dear Seadrill Americas Hiring Team,

I am writing via Rigzone to apply for the Mechanical Maintenance Engineer position for your deepwater drillship operations. Holding a Bachelor Degree in Mechanical Engineering (87.5% Grade A) alongside over 12 years of hands-on rig mechanic and maintenance engineering experience across offshore Jack-ups, Drillships, and land drilling systems, I offer technical analytical depth and field execution rig-floor capability.

My machinery background includes overhauling Caterpillar 3516B and EMD 645E8 engines, Varco TDS-8SA top drives, 7,500 psi mud pump fluid ends, and solids control decanter centrifuges. I maintain an active BOSIET certification (valid through 2026) and an Indian passport valid until 2033.

I welcome the opportunity to support Seadrill's deepwater fleet with rigorous mechanical availability.

Sincerely,
Jogendra Patel
jogendra.dipeng11@gmail.com | +91-7077869585`,
  },
  {
    id: 'job-energyjobline-stena-010',
    title: 'Drilling Equipment Technician - Deepwater Offshore Drillship',
    targetRole: 'Drilling Equipment Technician',
    company: 'Stena Drilling Ltd',
    location: 'Georgetown Offshore / Stabroek Block',
    country: 'Guyana',
    region: 'Americas',
    isOffshore: true,
    rigType: 'Drillship',
    rigName: 'Stena Carron / DrillMAX Fleet',
    postedDate: '8 hours ago',
    source: 'energyjobline.com',
    appliedVia: 'Energy Jobline Global Recruiter Gateway',
    url: 'https://www.energyjobline.com/job/stena-drilling-equipment-technician-guyana',
    salaryOrDayRate: '$5,400 - $6,800 / month (28/28 Rotation)',
    rotation: '28/28 Rotation',
    description: `Stena Drilling is recruiting an experienced Drilling Equipment Technician for ultra-deepwater drillship exploration campaigns offshore Guyana.
Responsibilities:
- Mechanical maintenance of drilling fluid solids control equipment (decanter centrifuges, shale shakers, cutting dryers).
- Overhaul centrifugal feed pumps, screw conveyors, and auxiliary pneumatic systems.
- Assist Senior Rig Mechanic during top drive and drawworks scheduled overhauls.
Requirements:
- 5+ years offshore drilling equipment maintenance.
- Extensive background in solids control decanters and diesel auxiliary engines.
- Valid BOSIET and international passport.`,
    requiredEquipments: [
      'Decanter Centrifuges (CD 518 / Alfa Laval)',
      'Cutting Dryers & Augers',
      'Mud Pump Maintenance',
      'Pneumatic & Hydraulic Controls',
    ],
    requiredCertifications: ['BOSIET (OPITO)', 'Mechanical Diploma/Degree', 'HSE Rig Pass'],
    minExperienceYears: 5,
    matchScore: 97,
    status: 'new_match',
    matchAnalysis: {
      overallScore: 97,
      machineryFit: 98,
      certificationsFit: 100,
      experienceFit: 98,
      rigTypeFit: 94,
      keyStrengths: [
        'Dedicated dual experience as Rig Mechanic and Solids Control Engineer.',
        'Extensive overhauls of decanter centrifuges (CD 518 FH, GNSC363C) and cutting dryers (WSM-04).',
        'Valid BOSIET (expiry 2026) and active Indian passport (expiry 2033).',
      ],
      missingOrGaps: ['South America deployment readiness; candidate possesses active passport and yellow fever vaccine.'],
      reasoning: 'Outstanding alignment with Stena Drilling deepwater exploration requirements.',
    },
    screeningAnswers: [
      {
        question: 'What solids control centrifuges have you overhauled?',
        answer: 'CD 518 FH, GNSC363C, Alfa Laval centrifuges, WSM-04 cutting dryers, and MN-120 mono pumps.',
        highlight: 'Complete Solids Fleet',
      },
      {
        question: 'Are you prepared for international 28/28 rotation in South America?',
        answer: 'Yes, fully prepared with active passport (valid to 2033) and valid BOSIET.',
        highlight: 'International 28/28 Ready',
      },
    ],
    tailoredCoverLetter: `Dear Stena Drilling Recruitment Team,

I am writing via Energy Jobline to submit my application for the Drilling Equipment Technician position for your deepwater drillship operations offshore Guyana. With over 12 years of hands-on mechanical maintenance across offshore and onshore drilling installations—including dual roles as Rig Mechanic and Solids Control Engineer—I am well suited to maintain your drilling equipment at peak reliability.

My technical background includes extensive servicing of decanter centrifuges (CD 518 FH, GNSC363C), cutting dryers (WSM-04), mono positive displacement pumps, and Caterpillar prime movers. I hold active BOSIET credentials (valid through 2026) and an active international passport valid until 2033.

I welcome the opportunity to join Stena Drilling's high-performance Guyana exploration team.

Sincerely,
Jogendra Patel`,
  },
  {
    id: 'job-valaris-angola-011',
    title: 'Senior Rig Mechanic - West Africa Offshore Fleet',
    targetRole: 'Senior Rig Mechanic',
    company: 'Valaris Limited',
    location: 'Luanda Offshore / Block 15',
    country: 'Angola',
    region: 'Africa',
    isOffshore: true,
    rigType: 'Drillship',
    rigName: 'Valaris DS Fleet',
    postedDate: '10 hours ago',
    source: 'direct_rig',
    appliedVia: 'Valaris Direct Contractor ATS Portal',
    url: 'https://careers.valaris.com/jobs/senior-rig-mechanic-west-africa',
    salaryOrDayRate: '$5,600 - $7,000 / month (28/28 Rotation)',
    rotation: '28/28 Rotation',
    description: `Valaris is seeking a Senior Rig Mechanic for offshore drillship operations in West Africa (Angola).
Responsibilities:
- Lead maintenance of Caterpillar 3516B/C and EMD 645 marine diesel engines.
- Overhaul National 14-P-220 and 12-P-160 triplex mud pumps and Varco TDS-8SA top drive systems.
- Supervise mechanic crew, manage critical spare parts in SAP, enforce safety standards.
Requirements:
- 7+ years offshore rig mechanic experience.
- Prior West Africa or international offshore experience preferred.
- Valid BOSIET and OPITO certifications.`,
    requiredEquipments: [
      'Caterpillar 3516B & EMD 645E8',
      'Varco TDS-8SA Top Drive',
      'National 12P160 Triplex Mud Pumps',
      'Engine Overhaul & Diagnostics',
    ],
    requiredCertifications: ['BOSIET', 'Passport (Valid)', 'Safety Leadership'],
    minExperienceYears: 7,
    matchScore: 97,
    status: 'new_match',
    matchAnalysis: {
      overallScore: 97,
      machineryFit: 100,
      certificationsFit: 100,
      experienceFit: 98,
      rigTypeFit: 94,
      keyStrengths: [
        'Direct West Africa offshore experience (2 years in Nigeria with SEEPCO on Rig DURGA-1).',
        'Mastery of EMD 645E8 and Caterpillar 3516B engines.',
        'Extensive overhaul record on National 12P160 and Varco TDS-8SA.',
        'Valid BOSIET (expiry 2026) and passport valid to 2033.',
      ],
      missingOrGaps: ['None. Former West Africa drilling experience makes transition seamless.'],
      reasoning: 'Candidate already possesses direct West Africa rig experience and exact machinery competencies.',
    },
    screeningAnswers: [
      {
        question: 'Do you have prior rig experience in West Africa?',
        answer: 'Yes, 2 years in Nigeria with SEEPCO on Rig DURGA-1 as Rig Mechanic cum Solids Control Engineer.',
        highlight: '2 Yrs West Africa Rig Exp',
      },
      {
        question: 'Have you overhauled EMD 645E8 and Cat 3516 engines?',
        answer: 'Yes, routine top-end and full overhauls on EMD 645E8 in Nigeria and Cat 3516B in Mumbai High and Saudi Arabia.',
        highlight: 'EMD & Cat Heavy Overhauls',
      },
    ],
    tailoredCoverLetter: `Dear Valaris West Africa Recruitment,

I am writing directly through the Valaris Contractor Careers Portal to apply for the Senior Rig Mechanic position in West Africa. Having worked in Nigeria for two years on Rig DURGA-1 as Rig Mechanic cum Solids Control Engineer, and with over seven years on Shelf Drilling Jack-up rigs, I bring proven resilience and technical competence in West African offshore environments.

My machinery expertise includes extensive overhauls of EMD 645E8 and Caterpillar 3516B engines, Varco TDS-8SA top drives, and National 12P160 triplex mud pumps. I hold a Bachelor Degree in Mechanical Engineering, active BOSIET certification valid through 2026, and an Indian passport valid until 2033.

I am ready to mobilize smoothly for your Angola drillship campaign.

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

