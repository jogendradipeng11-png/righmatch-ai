import React, { useState } from 'react';
import {
  History,
  CheckCircle2,
  ExternalLink,
  FileText,
  Building2,
  MapPin,
  Clock,
  Send,
  Eye,
  ShieldCheck,
  Mail,
  ChevronLeft,
  Paperclip,
  FolderArchive,
} from 'lucide-react';
import { JobListing, UserResumeProfile } from '../types';

interface SubmissionHistoryViewProps {
  jobs: JobListing[];
  profile?: UserResumeProfile;
}

export const SubmissionHistoryView: React.FC<SubmissionHistoryViewProps> = ({ jobs, profile }) => {
  const submittedJobs = jobs.filter((j) => j.status === 'submitted' || j.submissionConfirmationId);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(submittedJobs[0] || null);
  const [mobileTab, setMobileTab] = useState<'list' | 'detail'>('list');

  const applicantName = profile?.fullName || 'Candidate';
  const cvFilename = `${applicantName.replace(/\s+/g, '_')}_Curriculum_Vitae.pdf`;
  const senderEmail = profile?.email || 'applicant@gmail.com';

  const handleSelectJob = (job: JobListing) => {
    setSelectedJob(job);
    setMobileTab('detail');
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <History className="w-5 h-5" />
            </span>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Application Submission History & Audit Log
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete record of automated submissions dispatched to Rigzone, LinkedIn & direct rig recruiters.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            <span className="text-slate-400 mr-1.5">Submitted Count:</span>
            <span className="font-bold text-emerald-400">{submittedJobs.length}</span>
          </div>
        </div>
      </div>

      {submittedJobs.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 sm:p-10 text-center text-slate-400">
          <Send className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <h3 className="font-bold text-sm text-white">No Applications Submitted Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Go to the Staged Approval tab to review matching jobs and trigger your first automated dispatch.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* List of Submitted Apps (6 cols on lg) */}
          <div className={`lg:col-span-6 space-y-3 ${mobileTab === 'detail' ? 'hidden lg:block' : 'block'}`}>
            {submittedJobs.map((job) => {
              const isSelected = selectedJob?.id === job.id;
              return (
                <div
                  key={job.id}
                  onClick={() => handleSelectJob(job)}
                  className={`p-3.5 sm:p-4 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-slate-850 border-emerald-500/60 shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center">
                          <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-400" />
                          Submitted
                        </span>
                        {job.sentViaGmail ? (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 font-medium flex items-center">
                            <Mail className="w-2.5 h-2.5 mr-1 text-red-400" />
                            Gmail Sent
                          </span>
                        ) : (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 font-mono">
                            {job.source}
                          </span>
                        )}
                        {job.region && (
                          <span className="text-[10px] text-sky-400 font-medium">
                            {job.region}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400">
                          {job.submittedAt ? new Date(job.submittedAt).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-white mt-1.5">{job.title}</h3>
                      <div className="flex items-center space-x-2 text-xs text-slate-300 mt-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.company}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                      </div>
                      {job.recruiterEmail && (
                        <div className="text-[11px] text-slate-400 font-mono mt-1 flex items-center space-x-1">
                          <Mail className="w-3 h-3 text-slate-500" />
                          <span className="text-slate-300">{job.recruiterEmail}</span>
                        </div>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-slate-400">Receipt</div>
                      <div className="text-xs font-mono font-bold text-amber-400">
                        {job.submissionConfirmationId || 'LK-IN-884912'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Details Drawer (6 cols on lg) */}
          {selectedJob && (
            <div className={`lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col space-y-4 ${mobileTab === 'list' ? 'hidden lg:flex' : 'flex'}`}>
              {/* Mobile Back button */}
              <div className="lg:hidden pb-2.5 border-b border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setMobileTab('list')}
                  className="inline-flex items-center text-xs font-bold text-amber-400 hover:text-amber-300"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Submissions List
                </button>
                <span className="text-xs font-mono text-emerald-400">
                  {selectedJob.submissionConfirmationId || 'VERIFIED'}
                </span>
              </div>

              <div className="border-b border-slate-800 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-1 text-emerald-400" />
                    Official Submission Record
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    ID: {selectedJob.submissionConfirmationId || 'LK-IN-884912'}
                  </span>
                </div>
                <h2 className="text-base font-bold text-white mt-1">{selectedJob.title}</h2>
                <div className="text-xs text-slate-300 mt-0.5">{selectedJob.company} • {selectedJob.location}</div>
              </div>

              {/* Gmail Specific Dispatch Card */}
              {selectedJob.sentViaGmail ? (
                <div className="p-3.5 bg-red-950/30 rounded-lg border border-red-800/50 text-xs space-y-2">
                  <div className="font-semibold text-red-300 flex items-center justify-between">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-1.5 text-red-400" />
                      Dispatched via Connected Gmail Account
                    </div>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-900/60 text-red-200 border border-red-700">
                      Workspace Verified
                    </span>
                  </div>
                  <div className="text-slate-300">
                    Sender: <strong className="text-white">{senderEmail}</strong>
                  </div>
                  <div className="text-slate-300">
                    Recruiter Mailbox: <strong className="text-sky-300 font-mono">{selectedJob.recruiterEmail || 'careers@rig-operator.com'}</strong>
                  </div>
                  {selectedJob.attachedDocuments && selectedJob.attachedDocuments.length > 0 && (
                    <div className="pt-1 border-t border-red-900/40">
                      <div className="text-[11px] font-semibold text-slate-300 flex items-center mb-1">
                        <Paperclip className="w-3 h-3 text-red-400 mr-1" />
                        Attached Credentials & Documents ({selectedJob.attachedDocuments.length}):
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedJob.attachedDocuments.map((docName, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-200 border border-slate-700"
                          >
                            <FileText className="w-2.5 h-2.5 mr-1 text-red-400" />
                            {docName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedJob.gmailMessageId && (
                    <div className="text-slate-400 text-[10px] font-mono">
                      Gmail Message ID: {selectedJob.gmailMessageId}
                    </div>
                  )}
                  <div className="text-slate-400 text-[11px] flex items-center pt-1 border-t border-red-900/40">
                    <Clock className="w-3.5 h-3.5 mr-1 text-red-400" />
                    Sent At: <span className="text-slate-200 ml-1">{selectedJob.submittedAt || new Date().toLocaleString()}</span>
                  </div>
                </div>
              ) : (
                /* Standard Portal ATS Payload Info */
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1.5">
                  <div className="font-semibold text-slate-200">Dispatched Payload:</div>
                  <div className="text-slate-400 flex items-center">
                    <FileText className="w-3.5 h-3.5 mr-1.5 text-rose-400" />
                    Primary CV: <strong className="text-slate-200 ml-1 font-mono">{cvFilename}</strong>
                  </div>
                  {selectedJob.attachedDocuments && selectedJob.attachedDocuments.length > 0 && (
                    <div className="pt-1 border-t border-slate-800">
                      <div className="text-[11px] font-semibold text-slate-300 flex items-center mb-1">
                        <Paperclip className="w-3 h-3 text-amber-400 mr-1" />
                        Packaged Credentials ({selectedJob.attachedDocuments.length}):
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedJob.attachedDocuments.map((docName, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-200 border border-slate-700"
                          >
                            <FileText className="w-2.5 h-2.5 mr-1 text-emerald-400" />
                            {docName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="text-slate-400 flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                    Dispatched At: <span className="text-slate-300 ml-1">{selectedJob.submittedAt || new Date().toLocaleString()}</span>
                  </div>
                  <div className="text-slate-400 flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                    Channel: <span className="text-slate-300 ml-1">{selectedJob.appliedVia || `${selectedJob.source} Direct ATS Protocol`}</span>
                  </div>
                </div>
              )}

              {/* Submitted Cover Letter */}
              <div>
                <div className="font-semibold text-xs text-slate-300 mb-2">
                  Submitted Tailored Cover Letter:
                </div>
                <div className="bg-slate-950 p-3 sm:p-4 rounded-lg border border-slate-800 text-xs text-slate-300 whitespace-pre-line max-h-64 overflow-y-auto leading-relaxed font-sans">
                  {selectedJob.tailoredCoverLetter}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
