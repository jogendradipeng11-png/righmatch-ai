import React from 'react';
import { AlertTriangle, ArrowRight, CheckCheck, Send, ShieldAlert, Sparkles, X } from 'lucide-react';
import { JobListing } from '../types';

interface ApprovalAlertBannerProps {
  pendingJobs: JobListing[];
  onReviewJob: (job: JobListing) => void;
  onApproveAllHighMatches: () => void;
  onDismiss: () => void;
  isVisible: boolean;
}

export const ApprovalAlertBanner: React.FC<ApprovalAlertBannerProps> = ({
  pendingJobs,
  onReviewJob,
  onApproveAllHighMatches,
  onDismiss,
  isVisible,
}) => {
  if (!isVisible || pendingJobs.length === 0) return null;

  const topJob = pendingJobs[0];

  return (
    <div className="bg-amber-950/60 border-b border-amber-500/30 text-amber-100 px-4 py-3 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-amber-500/20 border border-amber-500/40 rounded-lg text-amber-400 shrink-0 mt-0.5 sm:mt-0">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-sm text-amber-300">
                Action Required: {pendingJobs.length} Application{pendingJobs.length > 1 ? 's' : ''} Staged for Final Approval
              </span>
              <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-amber-400 text-slate-950">
                Awaiting Sign-Off
              </span>
            </div>
            <p className="text-xs text-amber-200/80 mt-0.5">
              RigMatch AI matched <strong className="text-white">{topJob.title}</strong> at{' '}
              <strong className="text-white">{topJob.company}</strong> ({topJob.matchScore}% Match). Automated submission is paused until you approve.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => onReviewJob(topJob)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 shadow transition"
          >
            Review & Approve
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </button>

          {pendingJobs.length > 1 && (
            <button
              onClick={onApproveAllHighMatches}
              className="hidden lg:inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition"
              title="Batch submit all verified matches scoring > 90%"
            >
              <CheckCheck className="w-3.5 h-3.5 mr-1" />
              Approve All (&gt;90%)
            </button>
          )}

          <button
            onClick={onDismiss}
            className="p-1.5 rounded-md hover:bg-amber-900/50 text-amber-300/60 hover:text-amber-200 transition"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
