import React, { useState } from 'react';
import {
  Search,
  Compass,
  Building2,
  MapPin,
  Anchor,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  RefreshCw,
  Globe,
  Radio,
  Send,
  Zap,
  Mail,
} from 'lucide-react';
import { JobListing, JobSource, WorldRegion } from '../types';

interface LinkedInFeedViewProps {
  jobs: JobListing[];
  onStageForApproval: (jobId: string) => void;
  onSubmitJobDirectly?: (job: JobListing) => void;
  onApplyViaGmail?: (job: JobListing) => void;
  onCustomJobAnalyze: (title: string, company: string, description: string, source?: JobSource, region?: WorldRegion) => Promise<void>;
  isAnalyzingCustom: boolean;
}

export const LinkedInFeedView: React.FC<LinkedInFeedViewProps> = ({
  jobs,
  onStageForApproval,
  onSubmitJobDirectly,
  onApplyViaGmail,
  onCustomJobAnalyze,
  isAnalyzingCustom,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [siteFilter, setSiteFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [rigFilter, setRigFilter] = useState<string>('all');
  const [minScore, setMinScore] = useState<number>(70);
  const [showCustomModal, setShowCustomModal] = useState(false);

  // Custom job inputs
  const [customTitle, setCustomTitle] = useState('Senior Rig Mechanic');
  const [customCompany, setCustomCompany] = useState('Saipem Drilling / Transocean');
  const [customSource, setCustomSource] = useState<JobSource>('rigzone.com');
  const [customRegion, setCustomRegion] = useState<WorldRegion>('North Sea / Europe');
  const [customDescription, setCustomDescription] = useState(
    `Looking for Senior Rig Mechanic with offshore experience on Jack-up / Drillships. Must be skilled in Caterpillar 3516B engines, Varco top drives, National mud pumps, and possess valid BOSIET.`
  );

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.country && job.country.toLowerCase().includes(searchTerm.toLowerCase())) ||
      job.requiredEquipments.some((e) => e.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = roleFilter === 'all' || job.targetRole === roleFilter;
    const matchesRig = rigFilter === 'all' || job.rigType === rigFilter;
    const matchesScore = job.matchScore >= minScore;

    const matchesSite =
      siteFilter === 'all' ||
      (siteFilter === 'linkedin' && (job.source === 'linkedin.in' || job.source === 'linkedin.com')) ||
      (siteFilter === 'rigzone' && job.source === 'rigzone.com') ||
      (siteFilter === 'ogjs' && job.source === 'oilandgasjobsearch.com') ||
      (siteFilter === 'energyjobline' && job.source === 'energyjobline.com') ||
      (siteFilter === 'direct' && job.source === 'direct_rig');

    const matchesRegion =
      regionFilter === 'all' ||
      job.region === regionFilter ||
      (regionFilter === 'Worldwide');

    return matchesSearch && matchesRole && matchesRig && matchesScore && matchesSite && matchesRegion;
  });

  const handleRunCustomAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle || !customCompany || !customDescription) return;
    await onCustomJobAnalyze(customTitle, customCompany, customDescription, customSource, customRegion);
    setShowCustomModal(false);
  };

  const getSourceBadge = (source: JobSource, appliedVia?: string) => {
    switch (source) {
      case 'rigzone.com':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-950 text-amber-300 border border-amber-800 flex items-center">
            <Radio className="w-2.5 h-2.5 mr-1 text-amber-400" />
            Rigzone QuickApply
          </span>
        );
      case 'oilandgasjobsearch.com':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-orange-950 text-orange-300 border border-orange-800 flex items-center">
            <Radio className="w-2.5 h-2.5 mr-1 text-orange-400" />
            OGJS Global Feed
          </span>
        );
      case 'energyjobline.com':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center">
            <Radio className="w-2.5 h-2.5 mr-1 text-emerald-400" />
            Energy Jobline
          </span>
        );
      case 'direct_rig':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-950 text-purple-300 border border-purple-800 flex items-center">
            <Radio className="w-2.5 h-2.5 mr-1 text-purple-400" />
            Direct Contractor ATS
          </span>
        );
      case 'linkedin.com':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-950 text-blue-300 border border-blue-800 flex items-center">
            <Radio className="w-2.5 h-2.5 mr-1 text-blue-400" />
            LinkedIn Global
          </span>
        );
      case 'linkedin.in':
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-950 text-blue-300 border border-blue-800 flex items-center">
            <Radio className="w-2.5 h-2.5 mr-1 text-blue-400" />
            LinkedIn India
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header with Title & Custom Add */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Globe className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Worldwide Oil & Gas Job Feed
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
              All Sites Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Global crawler aggregation across Rigzone, LinkedIn Worldwide, Oil & Gas Job Search, Energy Jobline, and Direct Contractor ATS portals.
          </p>
        </div>

        <button
          onClick={() => setShowCustomModal(true)}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 mr-1.5" />
          Match Any Job from Any Site
        </button>
      </div>

      {/* Live Spider Status Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-300 font-semibold">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Multi-Site Crawlers Live:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px] flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span>
            Rigzone Global
          </span>
          <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px] flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span>
            LinkedIn Worldwide
          </span>
          <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px] flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span>
            Oil & Gas Job Search
          </span>
          <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px] flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span>
            Energy Jobline
          </span>
          <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px] flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span>
            Direct Contractor ATS
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Input */}
          <div className="relative lg:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search title, company, engine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:border-amber-500 focus:outline-hidden"
            />
          </div>

          {/* Site Filter */}
          <div>
            <select
              value={siteFilter}
              onChange={(e) => setSiteFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:border-amber-500 focus:outline-hidden font-medium"
            >
              <option value="all">All Sites (Worldwide)</option>
              <option value="rigzone">Rigzone (rigzone.com)</option>
              <option value="linkedin">LinkedIn (Global & India)</option>
              <option value="ogjs">Oil & Gas Job Search</option>
              <option value="energyjobline">Energy Jobline</option>
              <option value="direct">Direct Rig Portals (Transocean/Shelf/Valaris)</option>
            </select>
          </div>

          {/* Region Filter */}
          <div>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:border-amber-500 focus:outline-hidden"
            >
              <option value="all">All World Regions</option>
              <option value="Middle East">Middle East (Saudi / UAE / Qatar)</option>
              <option value="North Sea / Europe">North Sea / Europe (UK / Norway)</option>
              <option value="India">India (Mumbai High / KG Basin)</option>
              <option value="Americas">Americas (US GoM / Guyana)</option>
              <option value="Africa">Africa (West Africa / Angola / Nigeria)</option>
              <option value="Asia-Pacific">Asia-Pacific</option>
            </select>
          </div>

          {/* Role Filter */}
          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:border-amber-500 focus:outline-hidden"
            >
              <option value="all">All 5 Specified Roles</option>
              <option value="Rig Mechanic">Rig Mechanic</option>
              <option value="Senior Rig Mechanic">Senior Rig Mechanic</option>
              <option value="Maintenance Engineer">Maintenance Engineer</option>
              <option value="Maintenance Technician">Maintenance Technician</option>
              <option value="Drilling Equipment Technician">Drilling Equipment Technician</option>
            </select>
          </div>

          {/* Min Match Score */}
          <div className="flex items-center space-x-2 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-400 whitespace-nowrap">Min Fit: {minScore}%</span>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-10 text-center text-slate-400">
          <AlertCircle className="w-10 h-10 text-slate-500 mx-auto mb-2" />
          <p className="font-semibold text-sm">No worldwide postings match current filters.</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the site or region filter to view all global opportunities.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map((job) => {
            const isPending = job.status === 'pending_approval';
            const isSubmitted = job.status === 'submitted';

            return (
              <div
                key={job.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition flex flex-col justify-between shadow-sm"
              >
                <div>
                  {/* Top Bar: Role badge, Site badge, Match score */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {job.targetRole}
                      </span>
                      {getSourceBadge(job.source, job.appliedVia)}
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {job.matchScore}% Match
                    </span>
                  </div>

                  {/* Title & Company */}
                  <h3 className="font-bold text-base text-white leading-snug">
                    {job.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-300 mt-1">
                    <div className="flex items-center space-x-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium text-slate-200">{job.company}</span>
                    </div>
                    {job.region && (
                      <span className="text-[10px] font-medium text-sky-400 bg-sky-950/50 px-1.5 py-0.5 rounded border border-sky-800/60">
                        {job.region}
                      </span>
                    )}
                  </div>

                  {/* Location & Rig Type */}
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                    <span className="flex items-center text-slate-300">
                      <MapPin className="w-3 h-3 mr-1 text-rose-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center text-slate-300">
                      <Anchor className="w-3 h-3 mr-1 text-sky-400" />
                      {job.rigType}
                    </span>
                  </div>

                  {/* Description snippet */}
                  <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Required Machinery tags */}
                  <div className="mt-3 pt-3 border-t border-slate-800/80">
                    <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1.5">
                      Required Machinery & Standards:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {job.requiredEquipments.slice(0, 3).map((eq, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded text-[10px] bg-slate-950 text-slate-300 border border-slate-800"
                        >
                          {eq}
                        </span>
                      ))}
                      {job.requiredCertifications.map((c, i) => (
                        <span
                          key={`c-${i}`}
                          className="px-1.5 py-0.5 rounded text-[10px] bg-amber-950/40 text-amber-300 border border-amber-800/50 font-medium"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Auto-Retrieved Recruiter Email Pill */}
                  {job.recruiterEmail && (
                    <div className="mt-2.5 text-[11px] text-slate-300 bg-slate-950/70 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
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
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-slate-400 hover:text-slate-200 transition"
                  >
                    View on {job.source.replace('.com', '').replace('.in', '')}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>

                  <div className="flex items-center space-x-2">
                    {/* Apply via Gmail Action if not yet submitted */}
                    {!isSubmitted && onApplyViaGmail && (
                      <button
                        onClick={() => onApplyViaGmail(job)}
                        className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-bold bg-red-600/90 hover:bg-red-500 text-white transition shadow-sm"
                        title="Apply directly from your connected Gmail"
                      >
                        <Mail className="w-3 h-3 mr-1" />
                        Gmail
                      </button>
                    )}

                    {isSubmitted ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                        Submitted
                      </span>
                    ) : isPending ? (
                      <div className="flex items-center space-x-1.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Staged for Approval
                        </span>
                        {onSubmitJobDirectly && (
                          <button
                            onClick={() => onSubmitJobDirectly(job)}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition"
                            title="Auto-Send to this site now"
                          >
                            <Send className="w-3 h-3 mr-1" />
                            Send Now
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => onStageForApproval(job.id)}
                          className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                        >
                          <PlusCircle className="w-3.5 h-3.5 mr-1" />
                          Stage
                        </button>
                        {onSubmitJobDirectly && (
                          <button
                            onClick={() => onSubmitJobDirectly(job)}
                            className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow"
                          >
                            <Zap className="w-3 h-3 mr-1" />
                            Auto-Send
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Custom Job Matching Modal for ANY SITE Worldwide */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-lg w-full p-5 text-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-white">Match Job from Any Site Worldwide</h3>
              </div>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Paste any job description from Rigzone, LinkedIn Worldwide, Oil & Gas Job Search, Energy Jobline, or Contractor ATS portals. Gemini AI will match Jogendra Patel&apos;s CV, generate screening answers, and prepare the application packet.
            </p>

            <form onSubmit={handleRunCustomAnalysis} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Source Website / Portal</label>
                  <select
                    value={customSource}
                    onChange={(e) => setCustomSource(e.target.value as JobSource)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-amber-500 focus:outline-hidden"
                  >
                    <option value="rigzone.com">Rigzone (rigzone.com)</option>
                    <option value="oilandgasjobsearch.com">Oil & Gas Job Search</option>
                    <option value="energyjobline.com">Energy Jobline</option>
                    <option value="linkedin.com">LinkedIn Worldwide</option>
                    <option value="linkedin.in">LinkedIn India</option>
                    <option value="direct_rig">Direct Contractor Portal</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">World Region</label>
                  <select
                    value={customRegion}
                    onChange={(e) => setCustomRegion(e.target.value as WorldRegion)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-amber-500 focus:outline-hidden"
                  >
                    <option value="Middle East">Middle East (Saudi / UAE / Qatar)</option>
                    <option value="North Sea / Europe">North Sea / Europe</option>
                    <option value="India">India</option>
                    <option value="Americas">Americas (GoM / Guyana)</option>
                    <option value="Africa">Africa</option>
                    <option value="Asia-Pacific">Asia-Pacific</option>
                    <option value="Worldwide">Worldwide</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Job Title</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Senior Rig Mechanic or Maintenance Engineer"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-amber-500 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Company / Drilling Operator</label>
                <input
                  type="text"
                  value={customCompany}
                  onChange={(e) => setCustomCompany(e.target.value)}
                  placeholder="e.g. Shelf Drilling, Transocean, Valaris, Saipem, Noble"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-amber-500 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Job Description & Machinery Requirements</label>
                <textarea
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  rows={4}
                  placeholder="Paste the job description from Rigzone, LinkedIn, or any site..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-amber-500 focus:outline-hidden"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAnalyzingCustom}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition disabled:opacity-50"
                >
                  {isAnalyzingCustom ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                      Analyze & Match CV
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
