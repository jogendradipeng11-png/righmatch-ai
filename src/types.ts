export type RigType = 'Jack-Up' | 'Semi-Submersible' | 'Drillship' | 'Land Rig' | 'Offshore Platform' | 'Any';

export type JobRole =
  | 'Rig Mechanic'
  | 'Senior Rig Mechanic'
  | 'Maintenance Engineer'
  | 'Maintenance Technician'
  | 'Drilling Equipment Technician';

export type JobSource =
  | 'linkedin.in'
  | 'linkedin.com'
  | 'rigzone.com'
  | 'oilandgasjobsearch.com'
  | 'energyjobline.com'
  | 'direct_rig';

export type WorldRegion =
  | 'Middle East'
  | 'North Sea / Europe'
  | 'India'
  | 'Americas'
  | 'Africa'
  | 'Asia-Pacific'
  | 'Worldwide';

export type ApplicationStatus =
  | 'new_match'
  | 'pending_approval'
  | 'submitting'
  | 'submitted'
  | 'rejected'
  | 'interviewing'
  | 'archived';

export interface MatchAnalysis {
  overallScore: number;
  machineryFit: number;
  certificationsFit: number;
  experienceFit: number;
  rigTypeFit: number;
  keyStrengths: string[];
  missingOrGaps: string[];
  reasoning: string;
}

export interface ScreeningAnswer {
  question: string;
  answer: string;
  highlight?: string;
}

export interface JobListing {
  id: string;
  title: string;
  targetRole: JobRole;
  company: string;
  location: string;
  country: string;
  region?: WorldRegion;
  isOffshore: boolean;
  rigType: RigType;
  rigName?: string;
  postedDate: string;
  source: JobSource;
  appliedVia?: string;
  recruiterEmail?: string;
  emailRetrievedFromAd?: boolean;
  sentViaGmail?: boolean;
  gmailMessageId?: string;
  gmailThreadId?: string;
  attachedDocuments?: string[];
  attachedDocumentNames?: string[];
  url: string;
  salaryOrDayRate: string;
  rotation: string; // e.g. '28/28', '14/14', '60/30'
  description: string;
  requiredEquipments: string[];
  requiredCertifications: string[];
  minExperienceYears: number;
  matchScore: number;
  matchAnalysis?: MatchAnalysis;
  status: ApplicationStatus;
  screeningAnswers?: ScreeningAnswer[];
  tailoredCoverLetter?: string;
  approvedAt?: string;
  submittedAt?: string;
  submissionConfirmationId?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  clientOrOperator?: string;
  rigNameOrProject: string;
  rigType: string;
  role: string;
  location: string;
  period: string;
  isCurrent: boolean;
  keyDuties: string[];
  equipmentsHandled: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate?: string;
  expiryDate?: string;
  status: 'valid' | 'expired';
  certNumber?: string;
  location?: string;
}

export type DocumentCategory =
  | 'resume'
  | 'offshore_safety'
  | 'passport_seaman_book'
  | 'trade_diploma'
  | 'medical_vaccination'
  | 'other';

export interface CandidateDocument {
  id: string;
  name: string;
  filename: string;
  category: DocumentCategory;
  fileSizeBytes: number;
  fileType: string; // e.g. 'application/pdf', 'image/jpeg', 'image/png'
  uploadDate: string;
  expiryDate?: string;
  verified?: boolean;
  base64Data?: string; // Data URL or Base64 payload
  includeInApplications: boolean;
  description?: string;
  issuer?: string;
}

export interface GlobalAutoApplySettings {
  autoSendEnabled: boolean; // "send automatically from all sites"
  minMatchScore: number; // e.g. 90%
  delayCountdownSeconds: number; // e.g. 10s safety buffer
  enabledSites: {
    linkedin: boolean;
    rigzone: boolean;
    oilandgasjobsearch: boolean;
    energyjobline: boolean;
    directPortals: boolean;
  };
  enabledRegions: WorldRegion[];
  requireNotificationBeforeSend: boolean;
  sendFromGmail?: boolean;
  applicantGmail?: string;
}

export interface UserResumeProfile {
  fullName: string;
  appliedRoles: JobRole[];
  fathersName: string;
  dob: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  passportPlace: string;
  phoneWhatsApp: string;
  phoneAlt: string;
  email: string;
  address: string;
  education: {
    degree: string;
    institution: string;
    score: string;
  }[];
  summary: string;
  totalExperienceYears: number;
  languages: string[];
  certifications: Certification[];
  experiences: WorkExperience[];
  equipmentExpertise: {
    category: string;
    models: string[];
  }[];
  rolePreferences: {
    role: JobRole;
    minDayRateUSD: number;
    preferredLocations: string[];
    preferredRigTypes: RigType[];
    autoQueueForApproval: boolean;
  }[];
  autoApplySettings?: GlobalAutoApplySettings;
  documents?: CandidateDocument[];
}

export interface ApprovalNotification {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  source?: JobSource;
  region?: WorldRegion;
  matchScore: number;
  timestamp: string;
  read: boolean;
  urgent: boolean;
  role: JobRole;
  autoSent?: boolean;
  confirmationId?: string;
}

export interface CrawlerLog {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warn' | 'action';
  message: string;
}
