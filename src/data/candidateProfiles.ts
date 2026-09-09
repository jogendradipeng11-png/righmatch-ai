import { UserResumeProfile } from '../types';
import { INITIAL_USER_PROFILE } from './initialProfile';

export interface CandidatePreset {
  id: string;
  name: string;
  role: string;
  experience: number;
  location: string;
  email: string;
  phone: string;
  avatarInitials: string;
  badge: string;
  profile: UserResumeProfile;
}

export const CANDIDATE_PRESETS: CandidatePreset[] = [
  {
    id: 'jogendra-patel',
    name: 'Jogendra Patel',
    role: 'Senior Rig Mechanic',
    experience: 12,
    location: 'Odisha / Mumbai High / Saudi Arabia',
    email: 'jogendra.dipeng11@gmail.com',
    phone: '+91-7077869585',
    avatarInitials: 'JP',
    badge: 'Offshore Jack-Up & Drillship',
    profile: INITIAL_USER_PROFILE,
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Chief Rig Electrician & Cyberbase Tech',
    experience: 11,
    location: 'Aberdeen, UK / North Sea',
    email: 'marcus.vance.rig@gmail.com',
    phone: '+44 7700 900342',
    avatarInitials: 'MV',
    badge: 'CompEx Ex01-Ex04 & 11kV',
    profile: {
      ...INITIAL_USER_PROFILE,
      fullName: 'Marcus Vance',
      email: 'marcus.vance.rig@gmail.com',
      phoneWhatsApp: '+44 7700 900342',
      phoneAlt: '+44 1224 556789',
      nationality: 'British',
      passportNumber: 'GB9823412',
      passportExpiry: '15 OCT 2032',
      passportPlace: 'UKPA LONDON',
      totalExperienceYears: 11,
      appliedRoles: ['Maintenance Engineer', 'Drilling Equipment Technician'],
      summary:
        'Chief Rig Electrician and Cyberbase automation engineer with 11+ years of offshore experience on 6th generation dynamic-positioned Drillships and Semi-submersibles across the North Sea, West Africa, and Gulf of Mexico. Specialist in high-voltage 11kV power generation, Siemens S7 PLC controls, NOV Cyberbase operator chairs, ABB variable frequency drives, and hazardous area Ex equipment maintenance. Certified CompEx (Units 01-04) and offshore BOSIET.',
      education: [
        {
          degree: 'BEng (Hons) in Electrical & Electronic Engineering',
          institution: 'Robert Gordon University, Aberdeen',
          score: 'First Class Honours',
        },
        {
          degree: 'HND Electrical Engineering',
          institution: 'Aberdeen College of Technology',
          score: 'Distinction',
        },
      ],
      certifications: [
        {
          id: 'mv-cert-1',
          name: 'CompEx Hazardous Areas (Ex01-Ex04 Gas & Vapour)',
          issuer: 'JTL CompEx Certification',
          expiryDate: '2027',
          status: 'valid',
          location: 'Aberdeen, UK',
        },
        {
          id: 'mv-cert-2',
          name: 'OPITO BOSIET with EBS and CA-EBS',
          issuer: 'Survitec Training Center',
          expiryDate: '2026',
          status: 'valid',
          location: 'Aberdeen, UK',
        },
        {
          id: 'mv-cert-3',
          name: 'High Voltage Senior Authorised Person (HV SAP 11kV)',
          issuer: 'The Faraday Training Group',
          expiryDate: '2028',
          status: 'valid',
          location: 'Middlesbrough, UK',
        },
      ],
      equipmentExpertise: [
        {
          category: 'High Voltage & Power Generation',
          models: ['Caterpillar C280 / Bergen B32:40 Generators', 'ABB 11kV Switchgear & Vacuum Breakers', 'Siemens S7-400 / S7-1500 PLC'],
        },
        {
          category: 'Drilling Automation & Drives',
          models: ['NOV Cyberbase Drilling Console', 'ABB ACS800 / ACS880 VFD Drives', 'National Oilwell Varco Amphion Control'],
        },
        {
          category: 'Rig Safety & ESD Systems',
          models: ['Consilium Fire & Gas System', 'Autronica Smoke & Flame Detection', 'Emergency Shutdown (ESD) Matrices'],
        },
      ],
    },
  },
  {
    id: 'david-oconnor',
    name: "David O'Connor",
    role: 'Offshore Toolpusher & Senior Driller',
    experience: 15,
    location: 'Houston, Texas / Gulf of Mexico',
    email: 'david.oconnor.drilling@gmail.com',
    phone: '+1 (713) 555-0198',
    avatarInitials: 'DO',
    badge: 'IWCF Level 4 Well Control',
    profile: {
      ...INITIAL_USER_PROFILE,
      fullName: "David O'Connor",
      email: 'david.oconnor.drilling@gmail.com',
      phoneWhatsApp: '+1 (713) 555-0198',
      phoneAlt: '+1 (832) 555-0144',
      nationality: 'American',
      passportNumber: 'US44091283',
      passportExpiry: '22 APR 2031',
      passportPlace: 'US DEPT OF STATE',
      totalExperienceYears: 15,
      appliedRoles: ['Senior Rig Mechanic', 'Drilling Equipment Technician'],
      summary:
        'Seasoned Offshore Toolpusher and Rig Superintendent with 15+ years of drilling leadership across deepwater Gulf of Mexico and offshore Brazil for Transocean and Valaris. Expert in managed pressure drilling (MPD), HPHT well operations, dual-activity derrick operations, subsea BOP stack testing, and NOV Cyberbase drilling control. Holds current IWCF Level 4 Supervisor Well Control and OPITO BOSIET.',
      education: [
        {
          degree: 'B.S. in Petroleum Engineering',
          institution: 'Texas A&M University, College Station',
          score: '3.8 GPA',
        },
      ],
      certifications: [
        {
          id: 'doc-cert-1',
          name: 'IWCF Level 4 Well Control (Supervisor - Surface & Subsea)',
          issuer: 'International Well Control Forum (IWCF)',
          expiryDate: '2026',
          status: 'valid',
          location: 'Houston, USA',
        },
        {
          id: 'doc-cert-2',
          name: 'OPITO BOSIET + HUET + CA-EBS',
          issuer: 'Falck Safety Services',
          expiryDate: '2026',
          status: 'valid',
          location: 'Houma, Louisiana',
        },
      ],
      equipmentExpertise: [
        {
          category: 'Subsea & Well Control',
          models: ['Cameron 18-3/4" 15,000 psi BOP Stack', 'Vetco Gray Multiplex Control Pods', 'Shaffer Spherical Annular Preventers'],
        },
        {
          category: 'Derrick & Hoisting Systems',
          models: ['NOV Cyberbase Dual Derrick System', 'MH Wirth DDM 1000 AC Top Drive', 'Wirth 3000 HP Continuous Mud Pumps'],
        },
      ],
    },
  },
  {
    id: 'sarah-almansoor',
    name: 'Sarah Al-Mansoor',
    role: 'Offshore HSE & Rig Safety Officer',
    experience: 9,
    location: 'Abu Dhabi / Middle East',
    email: 'sarah.almansoor.hse@gmail.com',
    phone: '+971 50 123 4567',
    avatarInitials: 'SA',
    badge: 'NEBOSH Diploma & BOSIET',
    profile: {
      ...INITIAL_USER_PROFILE,
      fullName: 'Sarah Al-Mansoor',
      email: 'sarah.almansoor.hse@gmail.com',
      phoneWhatsApp: '+971 50 123 4567',
      phoneAlt: '+971 2 600 7890',
      nationality: 'Emirati',
      passportNumber: 'AE1298450',
      passportExpiry: '11 NOV 2030',
      passportPlace: 'ABU DHABI',
      totalExperienceYears: 9,
      appliedRoles: ['Maintenance Engineer'],
      summary:
        'Offshore Health, Safety & Environmental (HSE) Officer with 9 years of direct rig safety oversight on Jack-ups and artificial island drilling rigs across the Arabian Gulf (ADNOC, Saudi Aramco projects). Expert in Permit to Work (PTW) audits, SIMOPS coordination, incident investigation (TapRooT), gas testing, environmental compliance, and safety case management. Holds NEBOSH International Diploma and OPITO BOSIET.',
      education: [
        {
          degree: 'B.Sc. in Occupational Health, Safety & Environment',
          institution: 'Khalifa University, Abu Dhabi',
          score: 'Distinction',
        },
      ],
      certifications: [
        {
          id: 'sa-cert-1',
          name: 'NEBOSH International Diploma in Occupational Health and Safety',
          issuer: 'NEBOSH UK',
          expiryDate: 'Lifetime',
          status: 'valid',
          location: 'Dubai, UAE',
        },
        {
          id: 'sa-cert-2',
          name: 'OPITO BOSIET with HUET',
          issuer: 'Abu Dhabi Safety Training Institute',
          expiryDate: '2027',
          status: 'valid',
          location: 'Abu Dhabi',
        },
      ],
      equipmentExpertise: [
        {
          category: 'Safety Systems & Monitoring',
          models: ['Industrial Scientific GasBadge Multi-Gas Monitors', 'Dräger SCBA Breathing Apparatus', 'Lifeboat Davits & Watercraft Evacuation'],
        },
      ],
    },
  },
];

export function getCustomCandidateProfile(
  name: string,
  email: string,
  role: string = 'Rig Mechanic',
  phone: string = '+1-555-0199',
  experienceYears: number = 10
): UserResumeProfile {
  return {
    ...INITIAL_USER_PROFILE,
    fullName: name,
    email: email,
    phoneWhatsApp: phone,
    phoneAlt: phone,
    totalExperienceYears: experienceYears,
    appliedRoles: [role as any, 'Maintenance Engineer', 'Drilling Equipment Technician'],
    summary: `Dedicated and highly skilled ${role} with over ${experienceYears} years of experience across drilling rigs and heavy mechanical/electrical operations. Proven track record in equipment maintenance, zero-downtime operations, safety protocol enforcement, and team coordination. Committed to high operational safety standards and continuous drilling uptime.`,
  };
}
