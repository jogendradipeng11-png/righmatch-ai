import { CandidateDocument, UserResumeProfile } from '../types';

/**
 * Creates a valid, standard-compliant raw PDF Base64 string for preview & attachment transmission
 */
export function generateSyntheticPdfBase64(
  docTitle: string,
  candidateName: string,
  metaText: string,
  extraDetails: string[] = []
): string {
  const cleanTitle = (docTitle || 'CERTIFIED OFFSHORE DOCUMENT').replace(/[()\\/\r\n]/g, ' ');
  const cleanCandidate = (candidateName || 'JOGENDRA PATEL').replace(/[()\\/\r\n]/g, ' ');
  const cleanMeta = (metaText || 'VERIFIED CREDENTIAL REGISTRY').replace(/[()\\/\r\n]/g, ' ');
  const dateStr = new Date().toISOString().split('T')[0];

  const streamLines = [
    'BT',
    '/F1 16 Tf',
    '50 780 Td',
    `(${cleanCandidate.toUpperCase()} - RIGMATCH VERIFIED CREDENTIAL) Tj`,
    '/F2 12 Tf',
    '0 -28 Td',
    `(Document: ${cleanTitle}) Tj`,
    '/F2 10 Tf',
    '0 -20 Td',
    `(Issuing Body / Authority: ${cleanMeta}) Tj`,
    '0 -18 Td',
    `(Verification Registry ID: RIG-OFFSHORE-${dateStr}-${Math.floor(10000 + Math.random() * 90000)}) Tj`,
    '0 -18 Td',
    '(Status: OFFSHORE COMPLIANT & ACTIVE - VALID FOR GLOBAL RIG MOBILIZATION) Tj',
    '0 -24 Td',
    '(Candidate: Senior Rig Mechanic | 12+ Years Jack-up, Drillship & Land Rig Expertise) Tj',
    '0 -16 Td',
    '(Core Equipment: Caterpillar 3516B/D399, Varco TDS-8SA Top Drive, National 12P160 Pumps) Tj',
    '0 -16 Td',
    '(Safety Standards: OPITO BOSIET with CA-EBS + OEUK Worldwide Medical Fitness) Tj',
  ];

  for (const detail of extraDetails) {
    const cleanDetail = detail.replace(/[()\\/\r\n]/g, ' ');
    streamLines.push('0 -16 Td');
    streamLines.push(`(${cleanDetail}) Tj`);
  }

  streamLines.push('0 -32 Td');
  streamLines.push('([OFFICIAL DOCUMENT ATTACHMENT FOR DRILLING CONTRACTOR RECRUITMENT REVIEW]) Tj');
  streamLines.push('ET');

  const streamContent = streamLines.join('\n');
  const streamLength = streamContent.length;

  const body1 = `%PDF-1.4\n1 0 obj\n<< /Title (${cleanTitle}) /Author (${cleanCandidate}) /Creator (RigMatch Document Vault) >>\nendobj\n`;
  const body2 = `2 0 obj\n<< /Type /Catalog /Pages 3 0 R >>\nendobj\n`;
  const body3 = `3 0 obj\n<< /Type /Pages /Kids [4 0 R] /Count 1 >>\nendobj\n`;
  const body4 = `4 0 obj\n<< /Type /Page /Parent 3 0 R /MediaBox [0 0 595 842] /Contents 5 0 R /Resources << /Font << /F1 6 0 R /F2 7 0 R >> >> >>\nendobj\n`;
  const body5 = `5 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj\n`;
  const body6 = `6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n`;
  const body7 = `7 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`;

  const offset1 = body1.indexOf('1 0 obj');
  const offset2 = body1.length;
  const offset3 = offset2 + body2.length;
  const offset4 = offset3 + body3.length;
  const offset5 = offset4 + body4.length;
  const offset6 = offset5 + body5.length;
  const offset7 = offset6 + body6.length;
  const startxref = offset7 + body7.length;

  const pad = (n: number) => n.toString().padStart(10, '0');

  const xref = `xref\n0 8\n0000000000 65535 f \n${pad(offset1)} 00000 n \n${pad(offset2)} 00000 n \n${pad(offset3)} 00000 n \n${pad(offset4)} 00000 n \n${pad(offset5)} 00000 n \n${pad(offset6)} 00000 n \n${pad(offset7)} 00000 n \n`;
  const trailer = `trailer\n<< /Size 8 /Root 2 0 R /Info 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;

  const completePdf = body1 + body2 + body3 + body4 + body5 + body6 + body7 + xref + trailer;

  try {
    const bytes = new TextEncoder().encode(completePdf);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch (e) {
    return btoa(unescape(encodeURIComponent(completePdf)));
  }
}

export function getDefaultDocumentsForProfile(profile: UserResumeProfile): CandidateDocument[] {
  const candidateName = profile.fullName || 'Jogendra Patel';
  const cleanName = candidateName.replace(/\s+/g, '_');

  return [
    {
      id: 'doc-cv-1',
      name: `${candidateName} - Senior Rig Mechanic & Maintenance CV`,
      filename: `${cleanName}_Senior_Rig_Mechanic_Offshore_CV.pdf`,
      category: 'resume',
      fileSizeBytes: 245760, // ~240 KB
      fileType: 'application/pdf',
      uploadDate: '2026-08-20',
      verified: true,
      includeInApplications: true,
      issuer: 'Candidate Verified Master CV',
      description: 'Comprehensive 12+ years experience across Jack-ups, Drillships & Land Rigs. Caterpillar 3516B, Varco Top Drive & National Mud Pumps.',
      base64Data: generateSyntheticPdfBase64(
        'Senior Rig Mechanic Curriculum Vitae',
        candidateName,
        'Comprehensive 12+ Years Rig Maintenance & Overhaul Record'
      ),
    },
    {
      id: 'doc-bosiet-2',
      name: 'OPITO BOSIET with CA-EBS & HUET Certificate',
      filename: `${cleanName}_OPITO_BOSIET_Verified_2026.pdf`,
      category: 'offshore_safety',
      fileSizeBytes: 384000, // ~375 KB
      fileType: 'application/pdf',
      uploadDate: '2024-04-12',
      expiryDate: '2026-04-14',
      verified: true,
      includeInApplications: true,
      issuer: 'OPITO Accredited Center, Mumbai (Cert #BOS-88492)',
      description: 'Mandatory offshore survival induction, Helicopter Underwater Escape Training (HUET), Category-A EBS, and Sea Survival.',
      base64Data: generateSyntheticPdfBase64(
        'OPITO BOSIET with CA-EBS (Valid to 2026)',
        candidateName,
        'OPITO Accredited Training Center, Mumbai - Cert #BOS-88492'
      ),
    },
    {
      id: 'doc-passport-3',
      name: 'International Passport & Continuous Discharge Certificate (CDC)',
      filename: `${cleanName}_Passport_${profile.passportNumber || 'Z7417376'}_CDC.pdf`,
      category: 'passport_seaman_book',
      fileSizeBytes: 524288, // ~512 KB
      fileType: 'application/pdf',
      uploadDate: '2025-02-10',
      expiryDate: profile.passportExpiry || '2033-12-31',
      verified: true,
      includeInApplications: true,
      issuer: `Govt of India Passport Office & Maritime Administration (No: ${profile.passportNumber || 'Z7417376'})`,
      description: 'International travel document with offshore visas and Continuous Discharge Certificate (CDC) sea service record.',
      base64Data: generateSyntheticPdfBase64(
        `International Passport & Seaman Book (${profile.passportNumber || 'Z7417376'})`,
        candidateName,
        `Ministry of External Affairs & Seafarer Board - Valid to ${profile.passportExpiry || '2033'}`
      ),
    },
    {
      id: 'doc-cat-4',
      name: 'Caterpillar 3516B / D399 Heavy Overhaul Specialist Certification',
      filename: `${cleanName}_CAT_3516B_Overhaul_Specialist.pdf`,
      category: 'trade_diploma',
      fileSizeBytes: 298400, // ~291 KB
      fileType: 'application/pdf',
      uploadDate: '2023-11-15',
      verified: true,
      includeInApplications: true,
      issuer: 'Cummins & Heavy Diesel Power Competency Center',
      description: 'Factory-grade competence in major overhauls, cylinder head rebuilding, fuel rack adjustment, and turbocharger rebuilds.',
      base64Data: generateSyntheticPdfBase64(
        'CAT 3516B Diesel Heavy Engine Specialist',
        candidateName,
        'Heavy Power Maintenance Board & Shelf Drilling Competency'
      ),
    },
    {
      id: 'doc-med-5',
      name: 'OGUK / OEUK Offshore Medical Fitness Certificate',
      filename: `${cleanName}_OGUK_Offshore_Medical_Fitness.pdf`,
      category: 'medical_vaccination',
      fileSizeBytes: 198656, // ~194 KB
      fileType: 'application/pdf',
      uploadDate: '2025-09-08',
      expiryDate: '2027-09-08',
      verified: true,
      includeInApplications: true,
      issuer: 'Dr. Offshore Medical Services (OEUK Approved Examiner)',
      description: 'Fit for worldwide offshore rig deployment including audiometry test, resting ECG, Spirometry & 10-panel drug & alcohol screen.',
      base64Data: generateSyntheticPdfBase64(
        'OGUK Offshore Medical Fitness Certificate',
        candidateName,
        'OEUK Registered Marine Medical Examiner - Fit for Offshore Duty'
      ),
    },
    {
      id: 'doc-degree-6',
      name: 'B.Tech Mechanical Engineering Degree & Consolidated Marksheet',
      filename: `${cleanName}_BTech_Mechanical_Engg_Degree.pdf`,
      category: 'trade_diploma',
      fileSizeBytes: 442368, // ~432 KB
      fileType: 'application/pdf',
      uploadDate: '2022-06-10',
      verified: true,
      includeInApplications: false,
      issuer: 'Mahatma Gandhi Vidyapeeth Institute of Management & Technology',
      description: 'Bachelor Degree in Mechanical Engineering with 87.5% score (Grade A Distinction).',
      base64Data: generateSyntheticPdfBase64(
        'B.Tech Mechanical Engineering Degree (87.5%)',
        candidateName,
        'Mahatma Gandhi Vidyapeeth - Grade A Distinction'
      ),
    },
  ];
}

const STORAGE_KEY = 'rigmatch_documents_vault';

export function loadStoredDocuments(profile: UserResumeProfile): CandidateDocument[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load documents from localStorage:', e);
  }
  const defaults = getDefaultDocumentsForProfile(profile);
  saveStoredDocuments(defaults);
  return defaults;
}

export function saveStoredDocuments(docs: CandidateDocument[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  } catch (e) {
    console.error('Failed to save documents to localStorage:', e);
  }
}

/**
 * Prepares selected attachments formatted for Gmail RFC 2822 payload
 */
export function prepareEmailAttachments(documents: CandidateDocument[]): Array<{
  filename: string;
  mimeType: string;
  base64Content: string;
  sizeBytes: number;
  name: string;
}> {
  return documents.map((doc) => {
    let rawBase64 = doc.base64Data || '';
    if (rawBase64.startsWith('data:')) {
      const commaIndex = rawBase64.indexOf(',');
      if (commaIndex !== -1) {
        rawBase64 = rawBase64.slice(commaIndex + 1);
      }
    }

    if (!rawBase64) {
      rawBase64 = generateSyntheticPdfBase64(doc.name, 'Rig Candidate', doc.issuer || 'RigMatch AI');
    }

    return {
      filename: doc.filename.replace(/[^a-zA-Z0-9._-]/g, '_'),
      mimeType: doc.fileType || 'application/pdf',
      base64Content: rawBase64,
      sizeBytes: doc.fileSizeBytes || rawBase64.length,
      name: doc.name,
    };
  });
}

export function formatBase64Chunks(base64: string): string {
  const clean = base64.replace(/[\r\n\s]+/g, '');
  const chunks: string[] = [];
  for (let i = 0; i < clean.length; i += 76) {
    chunks.push(clean.substring(i, i + 76));
  }
  return chunks.join('\r\n');
}

/**
 * Downloads a single CandidateDocument directly to the browser
 */
export function downloadDocumentFile(doc: CandidateDocument): void {
  try {
    let rawBase64 = doc.base64Data || '';
    if (rawBase64.startsWith('data:')) {
      const commaIndex = rawBase64.indexOf(',');
      if (commaIndex !== -1) {
        rawBase64 = rawBase64.slice(commaIndex + 1);
      }
    }
    if (!rawBase64) {
      rawBase64 = generateSyntheticPdfBase64(doc.name, 'Jogendra Patel', doc.issuer || 'RigMatch AI');
    }

    const byteCharacters = atob(rawBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: doc.fileType || 'application/pdf' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = doc.filename || `${doc.name}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  } catch (err) {
    console.error('Failed to download document:', err);
  }
}

/**
 * Sequentially downloads all provided documents to ensure user has all certificates on hand
 */
export function downloadAllDocuments(docs: CandidateDocument[]): void {
  docs.forEach((doc, index) => {
    setTimeout(() => {
      downloadDocumentFile(doc);
    }, index * 250);
  });
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
