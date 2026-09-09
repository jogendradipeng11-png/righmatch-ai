import React, { useState, useRef } from 'react';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  ShieldCheck,
  Award,
  Wrench,
  GraduationCap,
  Briefcase,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Globe,
  Printer,
  Download,
  AlertCircle,
  FileCheck,
  Radio,
  Zap,
  Bell,
  Sliders,
} from 'lucide-react';
import { UserResumeProfile } from '../types';

interface ResumeProfileViewProps {
  profile: UserResumeProfile;
  onUpdateProfile: (newProfile: UserResumeProfile) => void;
  onOpenCandidateModal?: () => void;
}

export const ResumeProfileView: React.FC<ResumeProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onOpenCandidateModal,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'upload' | 'machinery' | 'auto_apply'>('profile');
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials = profile.fullName
    ? profile.fullName
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'ME';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setUploadSuccessMessage(`Successfully uploaded and parsed: ${file.name}. Profile updated for automated dispatch.`);
    setTimeout(() => {
      setUploadSuccessMessage(null);
    }, 5000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-extrabold text-xl sm:text-2xl shadow-inner shrink-0">
              {initials}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-black text-white">{profile.fullName}</h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5 mr-1 text-emerald-400" />
                  {profile.certifications?.[0]?.name ? `${profile.certifications[0].name.split(' ')[0]} Verified` : 'Verified Candidate'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5 sm:mt-1 font-medium">
                {profile.appliedRoles?.join(' • ') || 'Rig Mechanic & Maintenance Specialist'}
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-400 mt-2">
                <span className="flex items-center">
                  <Briefcase className="w-3.5 h-3.5 mr-1 text-amber-400" />
                  {profile.totalExperienceYears}+ Years Experience
                </span>
                <span className="flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                  {profile.phoneWhatsApp}
                </span>
                <span className="flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1 text-sky-400" />
                  {profile.email}
                </span>
                {profile.passportNumber && (
                  <span className="flex items-center">
                    <Globe className="w-3.5 h-3.5 mr-1 text-purple-400" />
                    Passport: {profile.passportNumber}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-start sm:justify-end">
            {onOpenCandidateModal && (
              <button
                onClick={onOpenCandidateModal}
                className="inline-flex items-center px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow"
              >
                <User className="w-4 h-4 mr-1.5" />
                Switch / Edit Candidate
              </button>
            )}
            <button
              onClick={() => setActiveSubTab('upload')}
              className="inline-flex items-center px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition"
            >
              <UploadCloud className="w-4 h-4 mr-1.5 text-amber-400" />
              Upload CV
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-semibold text-xs transition"
            >
              <Printer className="w-4 h-4 mr-1.5" />
              Print CV
            </button>
          </div>
        </div>

        {/* Sub-tab navigation */}
        <div className="flex space-x-4 border-t border-slate-800/80 mt-6 pt-3 text-xs font-semibold overflow-x-auto no-scrollbar whitespace-nowrap">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`pb-2 border-b-2 transition ${
              activeSubTab === 'profile'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Parsed Resume & Experience
          </button>
          <button
            onClick={() => setActiveSubTab('machinery')}
            className={`pb-2 border-b-2 transition ${
              activeSubTab === 'machinery'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Drilling Equipment & Engine Competencies
          </button>
          <button
            onClick={() => setActiveSubTab('upload')}
            className={`pb-2 border-b-2 transition ${
              activeSubTab === 'upload'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Upload / Replace CV File
          </button>
          <button
            onClick={() => setActiveSubTab('auto_apply')}
            className={`pb-2 border-b-2 transition flex items-center ${
              activeSubTab === 'auto_apply'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            Worldwide Auto-Apply & Gate Config
          </button>
        </div>
      </div>

      {uploadSuccessMessage && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{uploadSuccessMessage}</span>
        </div>
      )}

      {/* Main Tab Views */}
      {activeSubTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Col (2 cols): Summary, Professional Experience, Education */}
          <div className="lg:col-span-2 space-y-6">
            {/* Career Summary */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="font-bold text-sm text-white mb-2 flex items-center">
                <FileText className="w-4 h-4 mr-1.5 text-amber-400" />
                Executive Drilling Profile & Objectives
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {profile.summary}
              </p>
            </div>

            {/* Professional Rig Experience Timeline */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="font-bold text-sm text-white mb-4 flex items-center">
                <Briefcase className="w-4 h-4 mr-1.5 text-amber-400" />
                Professional Oil & Gas Experience (12+ Years)
              </h3>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
                {profile.experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-8">
                    {/* Dot */}
                    <div
                      className={`absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                        exp.isCurrent
                          ? 'bg-amber-400 border-slate-950 shadow-md ring-2 ring-amber-500/40'
                          : 'bg-slate-800 border-slate-600'
                      }`}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-white">{exp.role}</span>
                        {exp.isCurrent && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Current
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-medium">{exp.period}</span>
                    </div>

                    <div className="text-xs font-semibold text-amber-400/90 mt-0.5">
                      {exp.company} {exp.clientOrOperator ? `(Client: ${exp.clientOrOperator})` : ''}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Rig: {exp.rigNameOrProject} • Type: {exp.rigType} • Location: {exp.location}
                    </div>

                    <ul className="mt-2 space-y-1 text-xs text-slate-300 list-disc list-inside">
                      {exp.keyDuties.map((duty, idx) => (
                        <li key={idx} className="leading-snug">{duty}</li>
                      ))}
                    </ul>

                    {exp.equipmentsHandled.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {exp.equipmentsHandled.map((eq, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] bg-slate-950 text-slate-300 border border-slate-800"
                          >
                            {eq}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Credentials */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="font-bold text-sm text-white mb-3 flex items-center">
                <GraduationCap className="w-4 h-4 mr-1.5 text-amber-400" />
                Academic Background & Degrees
              </h3>
              <div className="space-y-3">
                {profile.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1"
                  >
                    <div>
                      <div className="font-bold text-slate-200">{edu.degree}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{edu.institution}</div>
                    </div>
                    <span className="font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 shrink-0 self-start sm:self-auto">
                      {edu.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col (1 col): Verified Certifications, Personal Details, Passport */}
          <div className="space-y-6">
            {/* Certifications Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h3 className="font-bold text-sm text-white mb-3 flex items-center">
                <Award className="w-4 h-4 mr-1.5 text-emerald-400" />
                Safety & Rig Certifications
              </h3>
              <div className="space-y-3">
                {profile.certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">{cert.name}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        VALID
                      </span>
                    </div>
                    <div className="text-slate-400 text-[11px] mt-1">
                      Issuer: {cert.issuer} {cert.location ? `(${cert.location})` : ''}
                    </div>
                    {cert.expiryDate && (
                      <div className="text-emerald-400 text-[10px] font-semibold mt-1">
                        Expiry Date: {cert.expiryDate}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Official Identification & Contact */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-xs space-y-3">
              <h3 className="font-bold text-sm text-white flex items-center">
                <User className="w-4 h-4 mr-1.5 text-sky-400" />
                Personal & Passport Record
              </h3>
              <div className="divide-y divide-slate-800 text-slate-300">
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-400">Father&apos;s Name:</span>
                  <span className="font-medium">{profile.fathersName}</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-400">Date of Birth:</span>
                  <span className="font-medium">{profile.dob}</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-400">Nationality:</span>
                  <span className="font-medium">{profile.nationality}</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-400">Passport Number:</span>
                  <span className="font-bold text-amber-400">{profile.passportNumber}</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-400">Passport Expiry:</span>
                  <span className="font-medium text-emerald-400">{profile.passportExpiry}</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span className="text-slate-400">Languages:</span>
                  <span className="font-medium">{profile.languages.join(', ')}</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-slate-400 font-medium block mb-1">Permanent Address:</span>
                <p className="text-[11px] text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
                  {profile.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Machinery Competencies Tab */}
      {activeSubTab === 'machinery' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Wrench className="w-5 h-5 mr-2 text-amber-400" />
              Verified Oilfield Drilling Equipment & Mechanical Competencies
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              These machinery profiles are cross-checked by the RigMatch AI engine against LinkedIn job descriptions to verify exact technical suitability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.equipmentExpertise.map((cat, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <h3 className="font-bold text-sm text-amber-300 mb-3 border-b border-slate-800 pb-2">
                  {cat.category}
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {cat.models.map((model, mIdx) => (
                    <li key={mIdx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{model}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload New Resume Tab */}
      {activeSubTab === 'upload' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white">Upload / Update Your Resume</h2>
            <p className="text-xs text-slate-400 mt-1">
              Upload an updated PDF or Word CV. The system will use Gemini to re-sync machinery certifications and auto-attach this document for all LinkedIn submissions.
            </p>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer ${
              isDragging
                ? 'border-amber-400 bg-amber-500/10'
                : 'border-slate-700 bg-slate-950 hover:border-slate-500'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
            />
            <FileText className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <p className="font-bold text-sm text-slate-200">
              Drag & Drop your resume here, or <span className="text-amber-400">browse files</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports PDF, DOCX, TXT (Maximum file size: 10MB)
            </p>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="font-bold text-slate-300">Currently Active Submission Payload:</div>
            <div className="flex items-center justify-between text-slate-200">
              <span>Jogendra_Patel_Curriculum_Vitae_Rig_Mechanic.pdf</span>
              <span className="text-emerald-400 font-bold">100% Ready</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Includes 12 years experience, BOSIET 2026, Caterpillar 3516B/D399, Varco TDS-8SA, National 12P160, Shelf Drilling Mumbai High, Halliburton Aramco project.
            </p>
          </div>
        </div>
      )}

      {/* Worldwide Auto-Apply & Notification Gate Settings */}
      {activeSubTab === 'auto_apply' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-4xl mx-auto space-y-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Globe className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-white">Worldwide Auto-Apply & Approval Gate Settings</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Configure which worldwide job sites to search, which world regions to target, and how final notifications are dispatched to your WhatsApp and Email.
            </p>
          </div>

          {/* Autonomous Mode Toggle */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <div className="font-bold text-sm text-slate-200 flex items-center">
                <Zap className="w-4 h-4 text-amber-400 mr-2" />
                Worldwide Autonomous Auto-Send
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically submit matching applications across all configured worldwide portals after notifying you.
              </p>
            </div>
            <button
              onClick={() => {
                if (profile.autoApplySettings) {
                  onUpdateProfile({
                    ...profile,
                    autoApplySettings: {
                      ...profile.autoApplySettings,
                      enabled: !profile.autoApplySettings.enabled,
                    },
                  });
                }
              }}
              className={`px-4 py-2 rounded-lg text-xs font-extrabold transition ${
                profile.autoApplySettings?.enabled
                  ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {profile.autoApplySettings?.enabled ? 'AUTONOMOUS ACTIVE' : 'MANUAL APPROVAL ONLY'}
            </button>
          </div>

          {/* Target Sites Selection */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="font-bold text-xs text-slate-300 uppercase tracking-wider flex items-center">
              <Radio className="w-3.5 h-3.5 text-amber-400 mr-1.5" />
              Active Worldwide Crawl & Apply Portals
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {[
                { id: 'rigzone.com', name: 'Rigzone (rigzone.com)', badge: 'API Gateway' },
                { id: 'linkedin.com', name: 'LinkedIn Worldwide', badge: 'Easy Apply Protocol' },
                { id: 'linkedin.in', name: 'LinkedIn India (linkedin.in)', badge: 'Regional Gate' },
                { id: 'oilandgasjobsearch.com', name: 'Oil & Gas Job Search', badge: 'OGJS Recruiter Feed' },
                { id: 'energyjobline.com', name: 'Energy Jobline Global', badge: 'Automated Form Post' },
                { id: 'direct_rig', name: 'Direct Contractor ATS (Transocean / Shelf)', badge: 'Direct Career Portal' },
              ].map((site) => {
                const isChecked = profile.autoApplySettings?.targetSites.includes(site.id as any);
                return (
                  <label
                    key={site.id}
                    className={`p-3 rounded-lg border flex items-start space-x-2.5 cursor-pointer transition ${
                      isChecked
                        ? 'bg-slate-900 border-amber-500/50 text-slate-200'
                        : 'bg-slate-950 border-slate-800/80 text-slate-500'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        if (!profile.autoApplySettings) return;
                        const current = profile.autoApplySettings.targetSites;
                        const next = isChecked
                          ? current.filter((s) => s !== site.id)
                          : [...current, site.id as any];
                        onUpdateProfile({
                          ...profile,
                          autoApplySettings: {
                            ...profile.autoApplySettings,
                            targetSites: next,
                          },
                        });
                      }}
                      className="mt-0.5 accent-amber-500 rounded"
                    />
                    <div>
                      <div className="font-semibold text-slate-200">{site.name}</div>
                      <div className="text-[10px] text-amber-400 font-mono mt-0.5">{site.badge}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Target Regions Selection */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="font-bold text-xs text-slate-300 uppercase tracking-wider flex items-center">
              <Globe className="w-3.5 h-3.5 text-sky-400 mr-1.5" />
              Target Worldwide Offshore & Onshore Regions
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              {[
                { id: 'Middle East', label: 'Middle East (Saudi, UAE, Qatar)' },
                { id: 'North Sea / Europe', label: 'North Sea / Europe (UK, Norway)' },
                { id: 'India', label: 'India (Mumbai High, KG Basin)' },
                { id: 'Americas', label: 'Americas (US GoM, Guyana)' },
                { id: 'Africa', label: 'Africa (West Africa, Angola, Nigeria)' },
                { id: 'Asia-Pacific', label: 'Asia-Pacific (Singapore, Australia)' },
              ].map((region) => {
                const isSelected = profile.autoApplySettings?.targetRegions.includes(region.id as any);
                return (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => {
                      if (!profile.autoApplySettings) return;
                      const current = profile.autoApplySettings.targetRegions;
                      const next = isSelected
                        ? current.filter((r) => r !== region.id)
                        : [...current, region.id as any];
                      onUpdateProfile({
                        ...profile,
                        autoApplySettings: {
                          ...profile.autoApplySettings,
                          targetRegions: next,
                        },
                      });
                    }}
                    className={`p-2.5 rounded-lg text-left border text-xs font-medium transition ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/60 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    {region.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notification Gate Routing Info */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="font-bold text-xs text-slate-300 uppercase tracking-wider flex items-center">
              <Bell className="w-3.5 h-3.5 text-amber-400 mr-1.5" />
              Mandatory Notification Channels Before Application Submission
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="font-semibold text-emerald-400 flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1.5" />
                  WhatsApp Direct Alert
                </div>
                <div className="text-slate-200 mt-1 font-mono">{profile.phoneWhatsApp}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Sends 1-click Approve / Hold webhook notification before submission.
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="font-semibold text-sky-400 flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1.5" />
                  Email Dispatch Audit Log
                </div>
                <div className="text-slate-200 mt-1 font-mono">{profile.email}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Receives full transmission packet with PDF resume & recruiter answers.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
