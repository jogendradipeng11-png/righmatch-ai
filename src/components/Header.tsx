import React from 'react';
import {
  Bell,
  RefreshCw,
  Flame,
  CheckCircle2,
  FileText,
  Sliders,
  Compass,
  History,
  ShieldCheck,
  Globe,
  Zap,
  Mail,
  FolderArchive,
  Paperclip,
} from 'lucide-react';
import { UserResumeProfile } from '../types';
import { User } from 'firebase/auth';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  pendingCount: number;
  onScanNow: () => void;
  isScanning: boolean;
  profile: UserResumeProfile;
  unreadNotifications: number;
  onOpenNotifications: () => void;
  currentUser?: User | null;
  onConnectGmail?: () => void;
  onDisconnectGmail?: () => void;
  onOpenCandidateModal?: () => void;
  attachedDocsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  pendingCount,
  onScanNow,
  isScanning,
  profile,
  unreadNotifications,
  onOpenNotifications,
  currentUser,
  onConnectGmail,
  onDisconnectGmail,
  onOpenCandidateModal,
  attachedDocsCount,
}) => {
  const isAutoApplyActive = profile.autoApplySettings?.autoSendEnabled ?? true;
  const userEmail = currentUser?.email || profile.email || 'jogendra.dipeng11@gmail.com';
  const initials = profile.fullName
    ? profile.fullName
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'ME';

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Brand Logo & Crawler Tag */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-slate-100">
                  RigMatch <span className="text-amber-400">AI</span>
                </span>
                <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium bg-emerald-950 text-emerald-300 border border-emerald-800" title="Scanning Rigzone, LinkedIn, Oil & Gas Job Search, Energy Jobline, and Contractor ATS">
                  <Globe className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 text-emerald-400 animate-pulse" />
                  <span className="hidden xs:inline">Worldwide</span>
                </span>
                {isAutoApplyActive && (
                  <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    <Zap className="w-2.5 h-2.5 mr-0.5" />
                    Auto-Send ON
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 hidden lg:block">
                Worldwide Multi-Site Auto-Apply Bot (Rig Mechanics, Electricians, Toolpushers & Engineers)
              </p>
            </div>
          </div>

          {/* User Profile Badge & Quick Actions */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            {/* Gmail Workspace Status Pill */}
            {currentUser ? (
              <div
                className="flex items-center space-x-1.5 px-2 sm:px-2.5 py-1 rounded-md bg-red-950/40 border border-red-800/60 text-xs cursor-pointer hover:border-red-700/80 transition"
                title={`Connected as ${currentUser.email}. Click to view status.`}
                onClick={onConnectGmail}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                <Mail className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span className="text-slate-200 font-mono text-[11px] max-w-[85px] sm:max-w-[120px] truncate">
                  {currentUser.email}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDisconnectGmail();
                  }}
                  className="text-[10px] text-slate-400 hover:text-white underline ml-0.5 sm:ml-1 shrink-0"
                  title="Disconnect Gmail"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={onConnectGmail}
                className="inline-flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition shadow-xs"
                title="Connect Gmail for auto-sending applications"
              >
                <Mail className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span className="hidden sm:inline">Connect Gmail</span>
                <span className="sm:hidden text-[11px]">Gmail</span>
              </button>
            )}

            {/* Scan Button (Compact on Mobile) */}
            <button
              onClick={onScanNow}
              disabled={isScanning}
              className="inline-flex items-center px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition disabled:opacity-50 shadow-sm"
              title="Crawl Worldwide: Rigzone, LinkedIn, Oil & Gas Job Search, Energy Jobline & Direct Portals"
            >
              <RefreshCw className={`w-3.5 h-3.5 sm:mr-1.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isScanning ? 'Crawling All Sites...' : 'Scan Worldwide'}</span>
              <span className="sm:hidden">{isScanning ? 'Scanning' : 'Scan'}</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition"
              aria-label="View Approval Notifications"
              id="header-notification-bell"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[10px] font-bold text-slate-950 items-center justify-center">
                    {unreadNotifications}
                  </span>
                </span>
              )}
            </button>

            {/* Candidate Switcher / Profile Pill */}
            <button
              onClick={onOpenCandidateModal || (() => setCurrentTab('resume'))}
              className="flex items-center space-x-2 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition"
              title="Click to switch candidate or edit profile details"
              id="header-profile-switcher-btn"
            >
              <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                {initials}
              </div>
              <div className="hidden lg:block text-xs leading-tight">
                <div className="font-semibold text-slate-200 flex items-center max-w-[140px] truncate">
                  {profile.fullName}
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 ml-1 shrink-0" title="Verified Candidate" />
                </div>
                <div className="text-[10px] text-amber-400 font-medium">Switch / Edit Profile</div>
              </div>
            </button>
          </div>
        </div>

        {/* Primary Navigation Tabs - Visible on Desktop / Hidden on Mobile (Mobile uses Bottom Nav) */}
        <div className="hidden md:flex space-x-1 sm:space-x-2 border-t border-slate-800/80 pt-1 pb-2 overflow-x-auto no-scrollbar text-xs sm:text-sm">
          <button
            onClick={() => setCurrentTab('approvals')}
            className={`flex items-center px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition ${
              currentTab === 'approvals'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            Pending Approval
            {pendingCount > 0 && (
              <span
                className={`ml-2 px-1.5 py-0.2 rounded-full text-xs font-extrabold ${
                  currentTab === 'approvals'
                    ? 'bg-slate-950 text-amber-400'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('feed')}
            className={`flex items-center px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition ${
              currentTab === 'feed'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Globe className="w-4 h-4 mr-1.5" />
            Worldwide Job Feed (All Sites)
          </button>

          <button
            onClick={() => setCurrentTab('documents')}
            className={`flex items-center px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition ${
              currentTab === 'documents'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FolderArchive className="w-4 h-4 mr-1.5" />
            Documents Vault
            {typeof attachedDocsCount === 'number' && (
              <span
                className={`ml-2 px-1.5 py-0.2 rounded-full text-xs font-semibold flex items-center ${
                  currentTab === 'documents'
                    ? 'bg-slate-950 text-amber-400'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}
              >
                <Paperclip className="w-2.5 h-2.5 mr-0.5" />
                {attachedDocsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('resume')}
            className={`flex items-center px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition ${
              currentTab === 'resume'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 mr-1.5" />
            My Resume & Certs
          </button>

          <button
            onClick={() => setCurrentTab('criteria')}
            className={`flex items-center px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition ${
              currentTab === 'criteria'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4 mr-1.5" />
            Criteria & Auto-Apply
          </button>

          <button
            onClick={() => setCurrentTab('history')}
            className={`flex items-center px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition ${
              currentTab === 'history'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <History className="w-4 h-4 mr-1.5" />
            Application History
          </button>
        </div>
      </div>
    </header>
  );
};
