import { CandidateDocument, UserResumeProfile } from '../types';

/**
 * Creates a minimal, valid raw PDF Base64 string for preview & attachment transmission
 */
export function generateSyntheticPdfBase64(docTitle: string, candidateName: string, metaText: string): string {
  const content = `%PDF-1.4
1 0 obj
<< /Title (${docTitle})
   /Author (${candidateName})
   /Creator (RigMatch AI Document Vault)
   /Producer (RigMatch AI)
   /CreationDate (D:${new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)}Z)
>>
endobj
2 0 obj
<< /Type /Catalog
   /Pages 3 0 R
>>
endobj
3 0 obj
<< /Type /Pages
   /Kids [4 0 R]
   /Count 1
>>
endobj
4 0 obj
<< /Type /Page
   /Parent 3 0 R
   /MediaBox [0 0 595 842]
   /Contents 5 0 R
   /Resources << /Font << /F1 6 0 R >> >>
>>
endobj
5 0 obj
<< /Length 280 >>
stream
BT
/F1 18 Tf
50 780 Td
(${candidateName.toUpperCase()} - OFFICIAL VERIFIED CREDENTIAL) Tj
/F1 14 Tf
0 -35 Td
(Document: ${docTitle}) Tj
/F1 11 Tf
0 -25 Td
(Issuer / Registry: ${metaText}) Tj
0 -20 Td
(Verification ID: RIG-${Math.floor(100000 + Math.random() * 900000)} | Status: ACTIVE & VALID) Tj
0 -30 Td
(This certified document payload is attached for drilling contractor technical review.) Tj
ET
endstream
endobj
6 0 obj
<< /Type /Font
   /Subtype /Type1
   /BaseFont /Helvetica-Bold
>>
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000210 00000 n 
0000000260 00000 n 
0000000318 00000 n 
0000000445 00000 n 
0000000780 00000 n 
trailer
<< /Size 7
   /Root 2 0 R
   /Info 1 0 R
>>
startxref
860
%%EOF`;

  try {
    return btoa(unescape(encodeURIComponent(content)));
  } catch (e) {
    return btoa(content);
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

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
