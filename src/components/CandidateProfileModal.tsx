import React, { useState } from 'react';
import {
  X,
  User,
  CheckCircle2,
  Sparkles,
  Mail,
  Phone,
  Briefcase,
  Award,
  UploadCloud,
  FileText,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { UserResumeProfile } from '../types';
import { CANDIDATE_PRESETS, CandidatePreset, getCustomCandidateProfile } from '../data/candidateProfiles';
import { User as FirebaseUser } from 'firebase/auth';

interface CandidateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserResumeProfile;
  onSelectProfile: (profile: UserResumeProfile) => void;
  currentUser?: FirebaseUser | null;
  onConnectGoogle?: () => void;
}

export const CandidateProfileModal: React.FC<CandidateProfileModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSelectProfile,
  currentUser,
  onConnectGoogle,
}) => {
  const [activeMode, setActiveMode] = useState<'presets' | 'edit' | 'paste_cv'>('presets');
  const [name, setName] = useState(currentProfile.fullName);
  const [email, setEmail] = useState(currentProfile.email);
  const [phone, setPhone] = useState(currentProfile.phoneWhatsApp);
  const [role, setRole] = useState(currentProfile.appliedRoles?.[0] || 'Rig Mechanic');
  const [experience, setExperience] = useState(currentProfile.totalExperienceYears || 10);
  const [location, setLocation] = useState(currentProfile.address || 'Offshore / Global');
  const [summary, setSummary] = useState(currentProfile.summary || '');
  const [cvText, setCvText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parseSuccessNote, setParseSuccessNote] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: CandidatePreset) => {
    onSelectProfile(preset.profile);
    setName(preset.profile.fullName);
    setEmail(preset.profile.email);
    setPhone(preset.profile.phoneWhatsApp);
    setRole(preset.profile.appliedRoles?.[0] || preset.role);
    setExperience(preset.profile.totalExperienceYears);
    setLocation(preset.profile.address || preset.location);
    setSummary(preset.profile.summary);
    onClose();
  };

  const handleUseGoogleAccount = () => {
    if (currentUser) {
      const gName = currentUser.displayName || name;
      const gEmail = currentUser.email || email;
      setName(gName);
      setEmail(gEmail);
      const updated = {
        ...currentProfile,
        fullName: gName,
        email: gEmail,
      };
      onSelectProfile(updated);
      setParseSuccessNote(`Connected to Google Profile: ${gName} (${gEmail})`);
      setTimeout(() => setParseSuccessNote(null), 3000);
    } else if (onConnectGoogle) {
      onConnectGoogle();
    }
  };

  const handleSaveCustomProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserResumeProfile = {
      ...currentProfile,
      fullName: name.trim() || 'Rig Candidate',
      email: email.trim() || 'candidate@gmail.com',
      phoneWhatsApp: phone.trim() || '+1-555-0100',
      phoneAlt: phone.trim() || '+1-555-0100',
      totalExperienceYears: Number(experience) || 5,
      appliedRoles: [role as any, 'Maintenance Engineer', 'Drilling Equipment Technician'],
      address: location.trim(),
      summary:
        summary.trim() ||
        `Experienced ${role} with ${experience}+ years of verified hands-on background in drilling and maintenance.`,
    };
    onSelectProfile(updated);
    onClose();
  };

  const handleParseCvText = () => {
    if (!cvText.trim()) return;
    setIsParsing(true);

    setTimeout(() => {
      // Intelligent regex parsing of common CV fields
      const emailMatch = cvText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i);
      const phoneMatch = cvText.match(/(\+?\d{1,4}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{4}/);
      const expMatch = cvText.match(/(\d{1,2})\+?\s*(?:years|yrs|year)/i);

      // Name detection (first non-empty line under 40 chars)
      const lines = cvText.split('\n').map((l) => l.trim()).filter(Boolean);
      let detectedName = name;
      if (lines.length > 0 && lines[0].length < 40 && !lines[0].toLowerCase().includes('resume') && !lines[0].toLowerCase().includes('curriculum')) {
        detectedName = lines[0];
      }

      // Role detection
      let detectedRole = role;
      const lower = cvText.toLowerCase();
      if (lower.includes('electrician') || lower.includes('electrical')) {
        detectedRole = 'Maintenance Engineer';
      } else if (lower.includes('toolpusher') || lower.includes('driller')) {
        detectedRole = 'Senior Rig Mechanic';
      } else if (lower.includes('hse') || lower.includes('safety')) {
        detectedRole = 'Maintenance Engineer';
      } else if (lower.includes('technician')) {
        detectedRole = 'Maintenance Technician';
      }

      if (emailMatch) setEmail(emailMatch[0]);
      if (phoneMatch) setPhone(phoneMatch[0].trim());
      if (expMatch) setExperience(parseInt(expMatch[1], 10));
      setName(detectedName);
      setRole(detectedRole);
      setSummary(lines.slice(0, 4).join(' '));

      const updated = getCustomCandidateProfile(
        detectedName,
        emailMatch ? emailMatch[0] : email,
        detectedRole,
        phoneMatch ? phoneMatch[0].trim() : phone,
        expMatch ? parseInt(expMatch[1], 10) : experience
      );
      updated.summary = lines.slice(0, 4).join(' ');

      onSelectProfile(updated);
      setIsParsing(false);
      setParseSuccessNote(`Extracted profile for ${detectedName} (${updated.totalExperienceYears} yrs exp)!`);
      setActiveMode('edit');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-auto max-h-[92dvh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Candidate Profile & Trade Setup
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-medium">
                  Universal
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Anyone can use RigMatch AI with their own name, email, trade, and CV credentials.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Presets vs Custom vs Paste CV */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-2 gap-1.5 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveMode('presets')}
            className={`px-3 py-2 rounded-lg transition shrink-0 flex items-center ${
              activeMode === 'presets'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Quick Presets ({CANDIDATE_PRESETS.length})
          </button>

          <button
            onClick={() => setActiveMode('edit')}
            className={`px-3 py-2 rounded-lg transition shrink-0 flex items-center ${
              activeMode === 'edit'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5 mr-1.5" />
            Custom Profile / Form
          </button>

          <button
            onClick={() => setActiveMode('paste_cv')}
            className={`px-3 py-2 rounded-lg transition shrink-0 flex items-center ${
              activeMode === 'paste_cv'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5 mr-1.5" />
            Paste / Import My CV
          </button>
        </div>

        {/* Success Alert */}
        {parseSuccessNote && (
          <div className="m-4 mb-0 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{parseSuccessNote}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* Mode 1: Presets */}
          {activeMode === 'presets' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-300 font-medium">
                Select a ready-to-test offshore professional persona or switch to custom below:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CANDIDATE_PRESETS.map((preset) => {
                  const isCurrent = currentProfile.fullName === preset.name;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-4 rounded-xl border transition cursor-pointer text-left relative ${
                        isCurrent
                          ? 'bg-slate-800 border-amber-500 ring-1 ring-amber-500/30'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black text-sm flex items-center justify-center">
                            {preset.avatarInitials}
                          </div>
                          <div>
                            <h3 className="font-bold text-sm text-white">{preset.name}</h3>
                            <div className="text-xs text-amber-400 font-medium">{preset.role}</div>
                          </div>
                        </div>
                        {isCurrent && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold">
                            Active
                          </span>
                        )}
                      </div>

                      <div className="mt-3 text-xs text-slate-400 space-y-1">
                        <div className="flex items-center truncate">
                          <Mail className="w-3 h-3 mr-1 text-slate-500 shrink-0" />
                          <span className="truncate">{preset.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="w-3 h-3 mr-1 text-amber-400 shrink-0" />
                          <span>{preset.experience}+ Years Experience</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="w-3 h-3 mr-1 text-sky-400 shrink-0" />
                          <span className="truncate">{preset.badge}</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPreset(preset);
                        }}
                        className={`mt-3 w-full py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                          isCurrent
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        {isCurrent ? 'Current Profile Active' : 'Switch to This Candidate'}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Connected Google Account Callout */}
              <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      {currentUser ? `Signed in as ${currentUser.displayName || currentUser.email}` : 'Want to use your personal Google account?'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {currentUser
                        ? 'Sync your Google name & email directly into your application profile.'
                        : 'Connect Google so applications are sent directly from your verified inbox.'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleUseGoogleAccount}
                  className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition shrink-0 shadow-sm"
                >
                  {currentUser ? 'Use My Google Account' : 'Connect Google'}
                </button>
              </div>
            </div>
          )}

          {/* Mode 2: Custom Profile Form */}
          {activeMode === 'edit' && (
            <form onSubmit={handleSaveCustomProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Jogendra Patel / Marcus Vance"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address (For Recruiter Follow-ups) *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your.email@gmail.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+91-7077869585"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Primary Trade / Target Role *
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Senior Rig Mechanic">Senior Rig Mechanic</option>
                    <option value="Rig Mechanic">Rig Mechanic</option>
                    <option value="Maintenance Engineer">Maintenance Engineer</option>
                    <option value="Maintenance Technician">Maintenance Technician</option>
                    <option value="Drilling Equipment Technician">Drilling Equipment Technician</option>
                    <option value="Chief Rig Electrician">Chief Rig Electrician</option>
                    <option value="Offshore Toolpusher">Offshore Toolpusher</option>
                    <option value="Offshore HSE Officer">Offshore HSE Officer</option>
                    <option value="Subsea Engineer">Subsea Engineer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Total Experience (Years) *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={experience}
                    onChange={(e) => setExperience(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Current Location / Residence
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Mumbai / Saudi Arabia / Houston / Aberdeen"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Professional Bio / Executive Summary
                </label>
                <textarea
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Summary of your machinery, offshore rigs, certifications, and technical accomplishments..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-sm"
                >
                  Save & Apply as {name}
                </button>
              </div>
            </form>
          )}

          {/* Mode 3: Paste / Import CV */}
          {activeMode === 'paste_cv' && (
            <div className="space-y-3.5">
              <div className="text-xs text-slate-300">
                Paste your resume text or CV profile below. RigMatch AI will automatically extract your contact details, experience years, skills, and set up your candidate profile:
              </div>

              <textarea
                rows={8}
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder="Paste your CV text here (e.g., Name, email, phone, experience, company history, certifications such as BOSIET, CompEx, or IWCF)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-400"
              />

              <div className="flex items-center justify-between">
                <div className="text-[11px] text-slate-400 flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                  Your CV data stays private and is stored locally in your browser.
                </div>

                <button
                  onClick={handleParseCvText}
                  disabled={!cvText.trim() || isParsing}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center disabled:opacity-50"
                >
                  {isParsing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      Parsing CV...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                      Auto-Extract Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
