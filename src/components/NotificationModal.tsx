import React from 'react';
import {
  X,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Smartphone,
  ExternalLink,
  Clock,
  Volume2,
} from 'lucide-react';
import { ApprovalNotification, JobListing, UserResumeProfile } from '../types';
import { playNotificationSound } from '../utils/audio';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: ApprovalNotification[];
  jobs: JobListing[];
  profile: UserResumeProfile;
  onSelectJob: (job: JobListing) => void;
  onQuickApprove?: (job: JobListing) => Promise<void>;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  jobs,
  profile,
  onSelectJob,
  onQuickApprove,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Approval Notifications & Alerts</h3>
              <p className="text-xs text-slate-400">Automated job staging alerts sent to Jogendra Patel</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => playNotificationSound()}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center"
              title="Test notification chime sound"
            >
              <Volume2 className="w-3.5 h-3.5 mr-1" />
              Test Chime
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Dispatch Channels Status */}
        <div className="bg-slate-950/60 p-3.5 border-b border-slate-800 text-xs">
          <span className="text-slate-400 font-medium block mb-2">Configured Notification Channels:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2 bg-slate-900 px-2.5 py-1.5 rounded border border-slate-800 text-slate-300">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="truncate">WhatsApp: {profile.phoneWhatsApp}</span>
              <span className="ml-auto text-[10px] text-emerald-400 font-bold">ACTIVE</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900 px-2.5 py-1.5 rounded border border-slate-800 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span className="truncate">Email: {profile.email}</span>
              <span className="ml-auto text-[10px] text-sky-400 font-bold">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Notification List */}
        <div className="overflow-y-auto p-4 space-y-3 flex-1 divide-y divide-slate-800/60">
          {notifications.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400 mb-2" />
              <p className="font-semibold text-sm">All caught up!</p>
              <p className="text-xs text-slate-500 mt-1">No pending approval alerts right now.</p>
            </div>
          ) : (
            notifications.map((notif) => {
              const matchedJob = jobs.find((j) => j.id === notif.jobId);
              return (
                <div key={notif.id} className="pt-3 first:pt-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start space-x-3">
                      <div
                        className={`p-1.5 rounded-md mt-0.5 ${
                          notif.urgent
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-sm text-slate-200">{notif.jobTitle}</h4>
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {notif.matchScore}% Match
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {notif.company} • {notif.location}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {notif.timestamp}
                          </span>
                          {matchedJob?.source && (
                            <span className="px-1.5 py-0.2 rounded bg-slate-800 text-amber-300 text-[10px] font-mono border border-slate-700">
                              {matchedJob.source}
                            </span>
                          )}
                          {matchedJob?.region && (
                            <span className="px-1.5 py-0.2 rounded bg-sky-950 text-sky-300 text-[10px] border border-sky-800">
                              {matchedJob.region}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {matchedJob && (
                      <div className="flex items-center space-x-1.5 shrink-0">
                        {onQuickApprove && matchedJob.status === 'pending_approval' && (
                          <button
                            onClick={async () => {
                              await onQuickApprove(matchedJob);
                            }}
                            className="px-2.5 py-1 text-xs font-bold rounded bg-emerald-600 hover:bg-emerald-500 text-white transition"
                            title="Auto-Approve and dispatch to site"
                          >
                            Send
                          </button>
                        )}
                        <button
                          onClick={() => {
                            onSelectJob(matchedJob);
                            onClose();
                          }}
                          className="px-2.5 py-1 text-xs font-bold rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                        >
                          Review
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Notifications push automatically when crawler discovers 75%+ matches</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
