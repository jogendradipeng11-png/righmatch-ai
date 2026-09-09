import React, { useState } from 'react';
import {
  Sliders,
  ShieldCheck,
  Bell,
  Smartphone,
  Mail,
  DollarSign,
  MapPin,
  Anchor,
  CheckCircle2,
  Save,
  Radio,
  Lock,
} from 'lucide-react';
import { JobRole, RigType, UserResumeProfile } from '../types';

interface CriteriaSettingsViewProps {
  profile: UserResumeProfile;
  onSavePreferences: (profile: UserResumeProfile) => void;
}

export const CriteriaSettingsView: React.FC<CriteriaSettingsViewProps> = ({
  profile,
  onSavePreferences,
}) => {
  const [currentProfile, setCurrentProfile] = useState<UserResumeProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);

  // Notification toggles
  const [notifyApp, setNotifyApp] = useState(true);
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [requireFinalApproval, setRequireFinalApproval] = useState(true);

  const activePreference = currentProfile.rolePreferences[activeRoleIndex];

  const handleUpdateDayRate = (newRate: number) => {
    const updated = [...currentProfile.rolePreferences];
    updated[activeRoleIndex] = { ...updated[activeRoleIndex], minDayRateUSD: newRate };
    setCurrentProfile({ ...currentProfile, rolePreferences: updated });
  };

  const handleSave = () => {
    onSavePreferences(currentProfile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Sliders className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Role Criteria & Approval Settings
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure screening rules, salary thresholds, and approval dispatch channels for each oil & gas position.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition self-start md:self-auto"
        >
          <Save className="w-4 h-4 mr-1.5" />
          Save Criteria Changes
        </button>
      </div>

      {savedSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-950/70 border border-emerald-500 text-emerald-200 text-xs flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Criteria and notification parameters successfully saved and applied to live LinkedIn crawler!</span>
        </div>
      )}

      {/* Primary Rule Card: Approval Gate */}
      <div className="bg-slate-900 border border-amber-500/40 rounded-xl p-5 mb-6 shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg shrink-0 mt-0.5">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-sm text-white">
                  Mandatory Final Approval Gate (Active)
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                  ENFORCED
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                When RigMatch AI finds a high-match posting on <strong>linkedin.in</strong>, it will automatically prepare the tailored application package (custom cover letter, screening answers, CV payload) and send you a notification. The application will <strong className="text-white">never be submitted</strong> until you explicitly click &quot;Approve &amp; Auto-Submit&quot;.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <input
              type="checkbox"
              checked={requireFinalApproval}
              onChange={(e) => setRequireFinalApproval(e.target.checked)}
              className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col (2 cols): 5 Roles Criteria Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="font-bold text-sm text-white mb-3">
              Configure Criteria for the 5 Target Roles
            </h3>

            {/* Role Tab Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
              {currentProfile.rolePreferences.map((pref, idx) => (
                <button
                  key={pref.role}
                  onClick={() => setActiveRoleIndex(idx)}
                  className={`p-2.5 rounded-lg border text-left text-xs font-semibold transition ${
                    activeRoleIndex === idx
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-xs'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div>{pref.role}</div>
                  <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                    Min: ${pref.minDayRateUSD}/day
                  </div>
                </button>
              ))}
            </div>

            {/* Active Role Config Form */}
            {activePreference && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="font-bold text-white text-sm">
                    {activePreference.role} Parameters
                  </div>
                  <span className="text-emerald-400 font-bold text-[11px]">
                    Auto-Queue Enabled
                  </span>
                </div>

                {/* Day Rate Slider */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-semibold text-slate-300">
                      Minimum Target Day Rate (USD):
                    </label>
                    <span className="font-bold text-amber-400 text-sm">
                      ${activePreference.minDayRateUSD} / Day
                    </span>
                  </div>
                  <input
                    type="range"
                    min="250"
                    max="800"
                    step="25"
                    value={activePreference.minDayRateUSD}
                    onChange={(e) => handleUpdateDayRate(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>$250/day</span>
                    <span>$500/day</span>
                    <span>$800/day</span>
                  </div>
                </div>

                {/* Preferred Locations */}
                <div>
                  <label className="font-semibold text-slate-300 block mb-1.5">
                    Target Deployment Hubs:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {activePreference.preferredLocations.map((loc, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-200"
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preferred Rig Installations */}
                <div>
                  <label className="font-semibold text-slate-300 block mb-1.5">
                    Eligible Rig Types:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {activePreference.preferredRigTypes.map((rig, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-amber-300 font-medium"
                      >
                        {rig}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Notification Dispatch Routing */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="font-bold text-sm text-white mb-3 flex items-center">
              <Bell className="w-4 h-4 mr-1.5 text-amber-400" />
              Approval Notification Routing
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              When an oil & gas application is staged, notifications are immediately routed to your devices for instant review:
            </p>

            <div className="space-y-3 text-xs">
              {/* WhatsApp notification */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-semibold text-slate-200">WhatsApp Alert</div>
                    <div className="text-[11px] text-slate-400">{profile.phoneWhatsApp}</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifyWhatsApp}
                  onChange={(e) => setNotifyWhatsApp(e.target.checked)}
                  className="accent-amber-500 rounded cursor-pointer"
                />
              </div>

              {/* Email Notification */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Mail className="w-4 h-4 text-sky-400" />
                  <div>
                    <div className="font-semibold text-slate-200">Email Dispatch</div>
                    <div className="text-[11px] text-slate-400">{profile.email}</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.checked)}
                  className="accent-amber-500 rounded cursor-pointer"
                />
              </div>

              {/* In-App Sound Alert */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Radio className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="font-semibold text-slate-200">In-App Audio Chime</div>
                    <div className="text-[11px] text-slate-400">Play tone upon high-match find</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifyApp}
                  onChange={(e) => setNotifyApp(e.target.checked)}
                  className="accent-amber-500 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
