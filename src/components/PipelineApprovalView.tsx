import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Building2,
  MapPin,
  Anchor,
  Send,
  Sparkles,
  Edit3,
  Trash2,
  ExternalLink,
  FileText,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  Check,
  ArrowUpRight,
  Info,
  Globe,
  Radio,
  Zap,
  Mail,
  ChevronLeft,
  Eye,
} from 'lucide-react';
import { JobListing, JobRole, JobSource, UserResumeProfile } from '../types';

interface PipelineApprovalViewProps {
  jobs: JobListing[];
  onApproveAndSubmit: (job: JobListing, customLetter?: string) => Promise<void>;
  onBatchSubmitAll?: (jobs: JobListing[]) => Promise<void>;
  onApplyViaGmail?: (job: JobListing) => void;
  onRejectJob: (jobId: string) => void;
  onHoldJob: (jobId: string) => void;
  profile: UserResumeProfile;
  isSubmitting: boolean;
  activeSubmittingJobId: string | null;
}

export const PipelineApprovalView: React.FC<PipelineApprovalViewProps> = ({
  jobs,
  onApproveAndSubmit,
  onBatchSubmitAll,
  onApplyViaGmail,
  onRejectJob,
  onHoldJob,
  profile,
  isSubmitting,
  activeSubmittingJobId,
}) => {
  const pendingJobs = jobs.filter((j) => j.status === 'pending_approval');
  const [selectedJobId, setSelectedJobId] = useState<string>(pendingJobs[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'cover_letter' | 'screening' | 'resume'>('cover_letter');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  const [isEditingLetter, setIsEditingLetter] = useState<boolean>(false);
  const [editedLetter, setEditedLetter] = useState<string>('');
  const [mobilePane, setMobilePane] = useState<'list' | 'detail'>('list');

  const filteredPending = pendingJobs.filter((job) => {
    if (selectedRoleFilter === 'all') return true;
    return job.targetRole === selectedRoleFilter;
  });

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || filteredPending[0];

  // Initialize edited letter when selected job changes
  React.useEffect(() => {
    if (selectedJob) {
      setEditedLetter(selectedJob.tailoredCoverLetter || '');
      setIsEditingLetter(false);
    }
  }, [selectedJob?.id]);

  const handleApprove = () => {
    if (!selectedJob) return;
    onApproveAndSubmit(selectedJob, editedLetter);
  };

  const getSourceBadge = (source: JobSource, appliedVia?: string) => {
    switch (source) {
      case 'rigzone.com':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800 flex items-center">
            <Radio className="w-2.5 h-2.5 mr-1 text-amber-400" />
            Rigzone
          </span>
        );
      case 'oilandgasjobsearch.com':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-950 text-orange-300 border border-orange-800 flex items-center">
            <Radio className="w-2.5 h-2.5 mr-1 text-orange-400" />
            OGJS Global
          </span>
        );
      case 'energyjobline.com':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center">
            <Radio className="w-2.5 h-2.5 mr-1 text-emerald-400" />
            Energy Jobline
          </span>
        );
      case 'direct_rig':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-800 flex items-center">
            <Radio className="w-2.5 h-2.5 mr-1 text-purple-400" />
            Direct ATS
          </span>
        );
      case 'linkedin.com':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800 flex items-center">
            <Radio className="w-2.5 h-2.5 mr-1 text-blue-400" />
            LinkedIn Global
          </span>
        );
      case 'linkedin.in':
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800 flex items-center">
            <Radio className="w-2.5 h-2.5 mr-1 text-blue-400" />
            LinkedIn India
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner explaining the Approval workflow */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Globe className="w-3 h-3 mr-1" />
                Worldwide Multi-Site Gate
              </span>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Review & Auto-Submit Pipeline
              </h1>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              RigMatch AI crawls <strong>Rigzone, LinkedIn Worldwide, Oil & Gas Job Search, Energy Jobline, and Direct Contractor ATS Portals</strong>, matches your 12-year experience and BOSIET credentials, and transmits applications to each site.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
            <div className="text-right mr-2">
              <div className="text-xs text-slate-400">Awaiting Sign-Off</div>
              <div className="text-xl font-extrabold text-amber-400">{pendingJobs.length} Positions</div>
            </div>
            {pendingJobs.length > 0 && onBatchSubmitAll && (
              <button
                onClick={() => onBatchSubmitAll(pendingJobs)}
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2.5 rounded-lg font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition disabled:opacity-50"
                title="Send applications automatically across all sites now"
              >
                <Zap className="w-4 h-4 mr-1.5" />
                Auto-Send All ({pendingJobs.length})
              </button>
            )}
          </div>
        </div>

        {/* 5 Target Roles Quick Filter Pills */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-slate-400 font-semibold mr-1 shrink-0">Filter Roles:</span>
          {['all', 'Rig Mechanic', 'Senior Rig Mechanic', 'Maintenance Engineer', 'Maintenance Technician', 'Drilling Equipment Technician'].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRoleFilter(role)}
              className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition ${
                selectedRoleFilter === role
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {role === 'all' ? 'All Roles' : role}
            </button>
          ))}
        </div>
      </div>

      {filteredPending.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-400">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No Applications Awaiting Approval</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mt-1">
            All matched applications have been submitted to Rigzone, LinkedIn, or contractor portals. Check the Worldwide Job Feed to scan for more roles.
          </p>
        </div>
      ) : (
        <div>
          {/* Mobile Master-Detail Segmented Toggle (Visible only on < lg screens) */}
          <div className="lg:hidden flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 mb-4 text-xs shadow-sm">
            <button
              onClick={() => setMobilePane('list')}
              className={`flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center ${
                mobilePane === 'list'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
              Staged ({filteredPending.length})
            </button>
            <button
              onClick={() => setMobilePane('detail')}
              disabled={!selectedJob}
              className={`flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center ${
                mobilePane === 'detail'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white disabled:opacity-40'
              }`}
            >
              <Eye className="w-3.5 h-3.5 mr-1.5" />
              Review & Sign-Off {selectedJob ? `(${selectedJob.company.substring(0, 10)})` : ''}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: List of Pending Jobs (5 cols on lg) */}
            <div className={`lg:col-span-5 space-y-3 ${mobilePane === 'detail' ? 'hidden lg:block' : 'block'}`}>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
                <span>Applications Staged ({filteredPending.length})</span>
                <span className="text-amber-400 font-normal normal-case">Tap to review & sign off</span>
              </div>

              {filteredPending.map((job) => {
                const isSelected = selectedJob?.id === job.id;
                const isCurrentlySubmitting = isSubmitting && activeSubmittingJobId === job.id;

                return (
                  <div
                    key={job.id}
                    onClick={() => {
                      setSelectedJobId(job.id);
                      setMobilePane('detail');
                    }}
                    className={`p-4 rounded-xl border transition cursor-pointer text-left relative overflow-hidden ${
                      isSelected
                        ? 'bg-slate-800/90 border-amber-500/60 shadow-lg ring-1 ring-amber-500/30'
                        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                  {/* Match score pill */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {job.targetRole}
                        </span>
                        {getSourceBadge(job.source, job.appliedVia)}
                      </div>
                      <h3 className="font-bold text-sm text-white mt-1 leading-snug">
                        {job.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                        <div className="flex items-center space-x-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-medium text-slate-300">{job.company}</span>
                        </div>
                        {job.region && (
                          <span className="text-[10px] text-sky-400 font-semibold">{job.region}</span>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="inline-flex items-center px-2 py-1 rounded-md text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {job.matchScore}%
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Match</div>
                    </div>
                  </div>

                  {/* Metadata: Location, Rig Type, Source */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="flex items-center text-slate-300">
                      <MapPin className="w-3 h-3 mr-1 text-rose-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center text-slate-300">
                      <Anchor className="w-3 h-3 mr-1 text-sky-400" />
                      {job.rigType}
                    </span>
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {job.postedDate}
                    </span>
                  </div>

                  {/* Recruiter Email auto-retrieved tag */}
                  {job.recruiterEmail && (
                    <div className="mt-2 text-[11px] text-slate-300 bg-slate-950/60 p-1.5 rounded border border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 truncate">
                        <Mail className="w-3 h-3 text-red-400 shrink-0" />
                        <span className="text-slate-400 text-[10px]">Recruiter:</span>
                        <span className="text-sky-300 font-mono text-[11px] truncate">{job.recruiterEmail}</span>
                      </div>
                      <span className="shrink-0 ml-1 text-[9px] px-1 py-0.2 rounded bg-sky-950 text-sky-400 border border-sky-800 font-medium">
                        Auto-Retrieved
                      </span>
                    </div>
                  )}

                  {isCurrentlySubmitting && (
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center space-x-2 text-amber-400 font-bold text-xs">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Transmitting via {job.source}...</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Review & One-Click Approval Card (7 cols on lg) */}
          {selectedJob && (
            <div className={`lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col ${mobilePane === 'list' ? 'hidden lg:flex' : 'flex'}`}>
              {/* Card Header */}
              <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90">
                {/* Mobile Back Button */}
                <div className="lg:hidden mb-3 pb-2.5 border-b border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setMobilePane('list')}
                    className="inline-flex items-center text-xs font-bold text-amber-400 hover:text-amber-300 py-1"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Staged Applications ({filteredPending.length})
                  </button>
                  <span className="text-[11px] text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80 font-bold">
                    {selectedJob.matchScore}% Match
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                        Final Approval Gate
                      </span>
                      {getSourceBadge(selectedJob.source, selectedJob.appliedVia)}
                      {selectedJob.region && (
                        <span className="text-xs text-sky-400 font-medium">{selectedJob.region}</span>
                      )}
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-white mt-1">{selectedJob.title}</h2>
                    <div className="flex items-center space-x-2 text-xs text-slate-300 mt-1">
                      <span className="font-semibold text-slate-100">{selectedJob.company}</span>
                      <span>•</span>
                      <span>{selectedJob.location}</span>
                      <span>•</span>
                      <span className="text-amber-300">{selectedJob.rotation}</span>
                    </div>
                  </div>

                  {/* Submit Button Group */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => onRejectJob(selectedJob.id)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950/50 hover:text-rose-400 text-slate-400 border border-slate-700 transition"
                      title="Decline this job application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Apply via Gmail Action */}
                    <button
                      onClick={() => onApplyViaGmail && onApplyViaGmail(selectedJob)}
                      className="flex items-center px-3 sm:px-3.5 py-2 rounded-lg font-bold text-xs bg-red-600 hover:bg-red-500 text-white shadow-md transition"
                      title={`Send directly from your Gmail account (${profile.email || 'connected Gmail'})`}
                      id="apply-via-gmail-header-btn"
                    >
                      <Mail className="w-3.5 h-3.5 mr-1.5" />
                      Apply via Gmail
                    </button>

                    <button
                      onClick={handleApprove}
                      disabled={isSubmitting}
                      className="flex items-center px-3.5 py-2 rounded-lg font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition disabled:opacity-50"
                      id="approve-submit-btn"
                    >
                      {isSubmitting && activeSubmittingJobId === selectedJob.id ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                          Transmitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 mr-1.5" />
                          Auto-Submit
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Recruiter Email Auto-Retrieved Banner & Quick Send */}
                <div className="mt-3 p-3 bg-red-950/20 border border-red-800/40 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-start sm:items-center space-x-2.5">
                    <div className="p-1.5 rounded-md bg-red-500/10 text-red-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-slate-200">Recruiter Email:</span>
                        <span className="font-mono text-sky-300 font-bold">{selectedJob.recruiterEmail || 'careers@shelfdrilling.com'}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-950 text-sky-400 border border-sky-800 font-medium">
                          Auto-Retrieved from Ad
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Applies with customized cover letter and verified credentials payload directly through Gmail.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onApplyViaGmail && onApplyViaGmail(selectedJob)}
                    className="shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-red-600/90 hover:bg-red-500 text-white font-semibold text-xs transition"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Send from Gmail</span>
                  </button>
                </div>

                {/* Gateway Routing Notice */}
                <div className="mt-3 text-[11px] text-slate-400 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 font-semibold">Transmission Gateway:</span>{' '}
                    <span className="text-slate-300 font-mono">{selectedJob.appliedVia || `${selectedJob.source} Direct ATS`}</span>
                  </div>
                  <a
                    href={selectedJob.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline flex items-center"
                  >
                    View Source <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>

                {/* Match Breakdown Bar */}
                {selectedJob.matchAnalysis && (
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-300 flex items-center">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-1" />
                        AI Profile & Rig Match Score:
                      </span>
                      <span className="font-bold text-emerald-400 text-sm">
                        {selectedJob.matchAnalysis.overallScore}% Strong Fit
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-[11px]">
                      <div className="bg-slate-950 p-2 rounded border border-slate-800">
                        <div className="text-slate-400">Machinery Fit</div>
                        <div className="font-bold text-slate-200 mt-0.5">
                          {selectedJob.matchAnalysis.machineryFit}%
                        </div>
                      </div>
                      <div className="bg-slate-950 p-2 rounded border border-slate-800">
                        <div className="text-slate-400">BOSIET / Certs</div>
                        <div className="font-bold text-slate-200 mt-0.5">
                          {selectedJob.matchAnalysis.certificationsFit}%
                        </div>
                      </div>
                      <div className="bg-slate-950 p-2 rounded border border-slate-800">
                        <div className="text-slate-400">Experience Fit</div>
                        <div className="font-bold text-slate-200 mt-0.5">
                          {selectedJob.matchAnalysis.experienceFit}%
                        </div>
                      </div>
                      <div className="bg-slate-950 p-2 rounded border border-slate-800">
                        <div className="text-slate-400">Rig Type Fit</div>
                        <div className="font-bold text-slate-200 mt-0.5">
                          {selectedJob.matchAnalysis.rigTypeFit}%
                        </div>
                      </div>
                    </div>

                    {/* Key Strengths Pill summary */}
                    <div className="mt-3 bg-emerald-950/30 border border-emerald-800/40 rounded-lg p-2.5 text-xs text-emerald-200">
                      <div className="font-semibold text-emerald-300 mb-1 flex items-center">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                        Why This Matches Your Profile:
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-emerald-200/90 text-[11px]">
                        {selectedJob.matchAnalysis.keyStrengths.slice(0, 3).map((strength, idx) => (
                          <li key={idx}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Sub-Tabs: Tailored Cover Letter | Screening Answers | Resume Payload */}
              <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('cover_letter')}
                  className={`py-2.5 px-3 border-b-2 font-semibold transition ${
                    activeTab === 'cover_letter'
                      ? 'border-amber-400 text-amber-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Tailored Cover Letter
                </button>
                <button
                  onClick={() => setActiveTab('screening')}
                  className={`py-2.5 px-3 border-b-2 font-semibold transition ${
                    activeTab === 'screening'
                      ? 'border-amber-400 text-amber-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  LinkedIn Screening Q&A ({selectedJob.screeningAnswers?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab('resume')}
                  className={`py-2.5 px-3 border-b-2 font-semibold transition ${
                    activeTab === 'resume'
                      ? 'border-amber-400 text-amber-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Attached Resume (Jogendra Patel)
                </button>
              </div>

              {/* Tab Content Area */}
              <div className="p-5 overflow-y-auto flex-1 max-h-[420px] text-xs leading-relaxed text-slate-300">
                {activeTab === 'cover_letter' && (
                  <div>
                    <div className="flex items-center justify-between mb-3 text-slate-400">
                      <span className="text-[11px] font-semibold text-slate-300">
                        Auto-generated based on {selectedJob.company}&apos;s equipment and rig specifications:
                      </span>
                      <button
                        onClick={() => setIsEditingLetter(!isEditingLetter)}
                        className="flex items-center text-xs text-amber-400 hover:text-amber-300 font-medium"
                      >
                        <Edit3 className="w-3.5 h-3.5 mr-1" />
                        {isEditingLetter ? 'Done Editing' : 'Edit Text'}
                      </button>
                    </div>

                    {isEditingLetter ? (
                      <textarea
                        value={editedLetter}
                        onChange={(e) => setEditedLetter(e.target.value)}
                        className="w-full h-64 bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 font-mono focus:border-amber-500 focus:outline-hidden"
                      />
                    ) : (
                      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-slate-200 font-sans whitespace-pre-line text-xs">
                        {editedLetter}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'screening' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-400">
                      Pre-filled answers for LinkedIn Easy Apply screening questions:
                    </p>

                    {selectedJob.screeningAnswers && selectedJob.screeningAnswers.length > 0 ? (
                      selectedJob.screeningAnswers.map((qa, i) => (
                        <div key={i} className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-slate-200">Q: {qa.question}</span>
                            {qa.highlight && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                                {qa.highlight}
                              </span>
                            )}
                          </div>
                          <div className="text-amber-300/90 font-medium mt-1">
                            A: {qa.answer}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-slate-500 italic">No specific screening questionnaire required.</div>
                    )}
                  </div>
                )}

                {activeTab === 'resume' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-rose-500/20 text-rose-400 rounded">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-200 text-xs">
                            Jogendra_Patel_Curriculum_Vitae.pdf
                          </div>
                          <div className="text-[10px] text-slate-400">
                            12+ Yrs Experience • BOSIET Valid to 2026 • Ready to Submit
                          </div>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                        Verified
                      </span>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-2">
                      <div className="font-bold text-slate-200 border-b border-slate-800 pb-1">
                        Candidate Summary Included in Payload:
                      </div>
                      <div>
                        <strong>Name:</strong> {profile.fullName} | <strong>Nationality:</strong> {profile.nationality}
                      </div>
                      <div>
                        <strong>Passport:</strong> {profile.passportNumber} (Expires: {profile.passportExpiry})
                      </div>
                      <div>
                        <strong>Contact:</strong> {profile.phoneWhatsApp} | {profile.email}
                      </div>
                      <div>
                        <strong>Key Machinery:</strong> Caterpillar 3516B, D399, Varco TDS-8SA, National 12P160 Triplex, Jacking Gearboxes, Decanter Centrifuges
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sticky Action Footer */}
              <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  Target Recruiter: <span className="font-mono text-sky-400">{selectedJob.recruiterEmail || `${selectedJob.company} Careers`}</span>
                </div>
                <div className="flex flex-wrap items-center space-x-2">
                  <button
                    onClick={() => onHoldJob(selectedJob.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 transition"
                  >
                    Hold for Later
                  </button>
                  {onApplyViaGmail && (
                    <button
                      onClick={() => onApplyViaGmail(selectedJob)}
                      className="flex items-center px-3.5 py-2 rounded-lg font-bold text-xs bg-red-600 hover:bg-red-500 text-white shadow-md transition"
                      title="Send Job Application via Gmail with 4 Certified PDF attachments"
                    >
                      <Mail className="w-3.5 h-3.5 mr-1.5" />
                      Apply via Gmail (with 4 PDFs)
                    </button>
                  )}
                  <button
                    onClick={handleApprove}
                    disabled={isSubmitting}
                    className="flex items-center px-4 py-2 rounded-lg font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5 mr-1.5" />
                    Approve & Auto-Submit
                  </button>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      )}
    </div>
  );
};
