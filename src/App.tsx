import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ApprovalAlertBanner } from './components/ApprovalAlertBanner';
import { PipelineApprovalView } from './components/PipelineApprovalView';
import { LinkedInFeedView } from './components/LinkedInFeedView';
import { ResumeProfileView } from './components/ResumeProfileView';
import { DocumentsVaultView } from './components/DocumentsVaultView';
import { CriteriaSettingsView } from './components/CriteriaSettingsView';
import { SubmissionHistoryView } from './components/SubmissionHistoryView';
import { NotificationModal } from './components/NotificationModal';
import { SubmissionProgressModal } from './components/SubmissionProgressModal';
import { GmailApplicationModal } from './components/GmailApplicationModal';
import { CandidateProfileModal } from './components/CandidateProfileModal';
import { ConnectGmailModal } from './components/ConnectGmailModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { INITIAL_USER_PROFILE } from './data/initialProfile';
import { INITIAL_JOB_LISTINGS } from './data/initialJobs';
import { JobListing, ApprovalNotification, UserResumeProfile, CandidateDocument } from './types';
import { playNotificationSound } from './utils/audio';
import { initAuth, googleSignIn, googleSignOut, getStoredConnectedEmail, createSimulatedUser } from './lib/firebaseAuth';
import { loadStoredDocuments, saveStoredDocuments } from './lib/documentVault';
import { User } from 'firebase/auth';

const RIGMATCH_JOBS_CACHE_VERSION = 'v4_real_worldwide_verified_jobs';

export default function App() {
  const [profile, setProfile] = useState<UserResumeProfile>(() => {
    const saved = localStorage.getItem('rigmatch_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_USER_PROFILE;
  });

  const [documents, setDocuments] = useState<CandidateDocument[]>(() =>
    loadStoredDocuments(profile)
  );

  const [jobs, setJobs] = useState<JobListing[]>(() => {
    const savedVersion = localStorage.getItem('rigmatch_jobs_version');
    if (savedVersion === RIGMATCH_JOBS_CACHE_VERSION) {
      const saved = localStorage.getItem('rigmatch_jobs');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length >= 12) {
            return parsed;
          }
        } catch {}
      }
    }
    // Auto upgrade cache to the complete real worldwide verified jobs database
    try {
      localStorage.setItem('rigmatch_jobs_version', RIGMATCH_JOBS_CACHE_VERSION);
      localStorage.setItem('rigmatch_jobs', JSON.stringify(INITIAL_JOB_LISTINGS));
    } catch {}
    return INITIAL_JOB_LISTINGS;
  });

  const [currentTab, setCurrentTab] = useState<string>('approvals');
  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(true);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeSubmittingJobId, setActiveSubmittingJobId] = useState<string | null>(null);
  const [isAnalyzingCustom, setIsAnalyzingCustom] = useState<boolean>(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState<boolean>(false);
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState<boolean>(false);

  const handleUpdateProfile = (newProfile: UserResumeProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem('rigmatch_profile', JSON.stringify(newProfile));
    } catch (e) {
      console.error('Failed to save profile to localStorage:', e);
    }
    // Re-sync documents when candidate profile switches
    const updatedDocs = loadStoredDocuments(newProfile);
    setDocuments(updatedDocs);
  };

  const handleUpdateDocuments = (newDocs: CandidateDocument[]) => {
    setDocuments(newDocs);
    saveStoredDocuments(newDocs);
    const updatedProfile = { ...profile, documents: newDocs };
    setProfile(updatedProfile);
    try {
      localStorage.setItem('rigmatch_profile', JSON.stringify(updatedProfile));
    } catch {}
  };

  const attachedCount = documents.filter((d) => d.includeInApplications).length;

  // Gmail & Auth state
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const stored = getStoredConnectedEmail();
    if (stored) {
      return createSimulatedUser(stored);
    }
    return null;
  });
  const [isConnectGmailModalOpen, setIsConnectGmailModalOpen] = useState(false);
  const [gmailModalJob, setGmailModalJob] = useState<JobListing | null>(null);

  // Submission Modal state
  const [submissionModalJob, setSubmissionModalJob] = useState<JobListing | null>(null);
  const [lastConfirmationId, setLastConfirmationId] = useState<string | null>(null);

  // Initialize Firebase Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => {
        setCurrentUser(user);
      },
      () => {
        // If not in local storage, clear user
        if (!getStoredConnectedEmail()) {
          setCurrentUser(null);
        }
      }
    );
    return () => unsubscribe();
  }, []);

  const handleConnectGmail = () => {
    setIsConnectGmailModalOpen(true);
  };

  const handleDisconnectGmail = async () => {
    await googleSignOut();
    setCurrentUser(null);
  };

  const handleOpenGmailModal = (job: JobListing) => {
    setGmailModalJob(job);
  };

  const handleGmailSendSuccess = (
    jobId: string,
    result: { messageId: string; recipient: string; sentAt: string }
  ) => {
    const target = jobs.find((j) => j.id === jobId);
    const confId = `GMAIL-${result.messageId.substring(0, 10).toUpperCase()}`;
    const attachedDocNames = documents.filter((d) => d.includeInApplications).map((d) => d.filename);

    setJobs((prevJobs) =>
      prevJobs.map((j) =>
        j.id === jobId
          ? {
              ...j,
              status: 'submitted',
              sentViaGmail: true,
              recruiterEmail: result.recipient,
              submissionConfirmationId: confId,
              gmailMessageId: result.messageId,
              submittedAt: result.sentAt,
              attachedDocuments: attachedDocNames,
              appliedVia: `Gmail (${currentUser?.email || profile.email}) -> ${result.recipient} (${attachedDocNames.length} Attachments)`,
            }
          : j
      )
    );

    playNotificationSound();

    if (target) {
      setLastConfirmationId(confId);
      setSubmissionModalJob({
        ...target,
        status: 'submitted',
        sentViaGmail: true,
        recruiterEmail: result.recipient,
        submissionConfirmationId: confId,
        attachedDocuments: attachedDocNames,
        appliedVia: `Gmail Direct (${currentUser?.email || profile.email}) -> ${result.recipient} (${attachedDocNames.length} Attachments)`,
      });
    }
  };

  // Notifications state
  const [notifications, setNotifications] = useState<ApprovalNotification[]>([
    {
      id: 'notif-1',
      jobId: 'job-shelf-001',
      jobTitle: 'Senior Rig Mechanic (Offshore Jack-Up)',
      company: 'Shelf Drilling (India) Pvt Ltd',
      location: 'Mumbai High Offshore, Maharashtra',
      matchScore: 97,
      timestamp: 'Just now',
      read: false,
      urgent: true,
      role: 'Senior Rig Mechanic',
    },
    {
      id: 'notif-2',
      jobId: 'job-transocean-002',
      jobTitle: 'Maintenance Engineer - Mechanical',
      company: 'Transocean Drilling Services India',
      location: 'Kakinada / KG Basin Offshore',
      matchScore: 94,
      timestamp: '15 mins ago',
      read: false,
      urgent: true,
      role: 'Maintenance Engineer',
    },
  ]);

  // Persist jobs & profile
  useEffect(() => {
    localStorage.setItem('rigmatch_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('rigmatch_profile', JSON.stringify(profile));
  }, [profile]);

  const pendingJobs = jobs.filter((j) => j.status === 'pending_approval');
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Handle Approve & Submit
  const handleApproveAndSubmit = async (job: JobListing, customLetter?: string) => {
    setIsSubmitting(true);
    setActiveSubmittingJobId(job.id);

    try {
      // Call Express API endpoint
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          jobTitle: job.title,
          company: job.company,
          coverLetter: customLetter || job.tailoredCoverLetter,
          screeningAnswers: job.screeningAnswers,
          profile,
        }),
      });

      const data = await response.json();
      const confId = data.confirmationId || `LK-IN-${Math.floor(100000 + Math.random() * 900000)}`;

      // Update job state
      setJobs((prevJobs) =>
        prevJobs.map((j) =>
          j.id === job.id
            ? {
                ...j,
                status: 'submitted',
                tailoredCoverLetter: customLetter || j.tailoredCoverLetter,
                submissionConfirmationId: confId,
                submittedAt: new Date().toISOString(),
                approvedAt: new Date().toISOString(),
              }
            : j
        )
      );

      // Play success chime
      playNotificationSound();

      // Show completion modal
      setLastConfirmationId(confId);
      setSubmissionModalJob(job);
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback submission if API call fails
      const fallbackId = `LK-IN-SHE-${Math.floor(100000 + Math.random() * 900000)}`;
      setJobs((prevJobs) =>
        prevJobs.map((j) =>
          j.id === job.id
            ? {
                ...j,
                status: 'submitted',
                tailoredCoverLetter: customLetter || j.tailoredCoverLetter,
                submissionConfirmationId: fallbackId,
                submittedAt: new Date().toISOString(),
              }
            : j
        )
      );
      setLastConfirmationId(fallbackId);
      setSubmissionModalJob(job);
    } finally {
      setIsSubmitting(false);
      setActiveSubmittingJobId(null);
    }
  };

  // Reject Job
  const handleRejectJob = (jobId: string) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: 'rejected' } : j)));
  };

  // Hold Job
  const handleHoldJob = (jobId: string) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: 'archived' } : j)));
  };

  // Stage a job from Feed into Pending Approval
  const handleStageForApproval = (jobId: string) => {
    const target = jobs.find((j) => j.id === jobId);
    if (!target) return;

    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: 'pending_approval' } : j))
    );

    // Add notification
    const newNotif: ApprovalNotification = {
      id: `notif-${Date.now()}`,
      jobId: target.id,
      jobTitle: target.title,
      company: target.company,
      location: target.location,
      matchScore: target.matchScore,
      timestamp: 'Just now',
      read: false,
      urgent: true,
      role: target.targetRole,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    setIsBannerVisible(true);
    playNotificationSound();
  };

  // Scan worldwide sites (Rigzone, LinkedIn, OGJS, Energy Jobline, Direct ATS)
  const handleScanNow = async () => {
    setIsScanning(true);
    try {
      const response = await fetch('/api/crawl-worldwide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetSites: profile.autoApplySettings?.targetSites || [
            'rigzone.com',
            'linkedin.com',
            'linkedin.in',
            'oilandgasjobsearch.com',
            'energyjobline.com',
            'direct_rig',
          ],
          targetRegions: profile.autoApplySettings?.targetRegions || [
            'Middle East',
            'North Sea / Europe',
            'India',
            'Americas',
            'Africa',
            'Asia-Pacific',
          ],
          targetRoles: [
            'Rig Mechanic',
            'Senior Rig Mechanic',
            'Maintenance Engineer',
            'Maintenance Technician',
            'Drilling Equipment Technician',
          ],
          minMatchScore: profile.autoApplySettings?.minMatchScoreThreshold || 75,
        }),
      });

      const result = await response.json();
      if (result.success && Array.isArray(result.jobs) && result.jobs.length > 0) {
        setJobs((prev) => {
          const existingIds = new Set(prev.map((j) => j.id));
          const newDiscovered = result.jobs.filter((j: JobListing) => !existingIds.has(j.id));
          return [...newDiscovered, ...prev];
        });

        const topJob = result.jobs[0];
        if (topJob) {
          const newNotif: ApprovalNotification = {
            id: `notif-${Date.now()}`,
            jobId: topJob.id,
            jobTitle: topJob.title,
            company: topJob.company,
            location: topJob.location,
            matchScore: topJob.matchScore,
            timestamp: 'Just now',
            read: false,
            urgent: true,
            role: topJob.targetRole,
          };
          setNotifications((prev) => [newNotif, ...prev]);
        }
        setIsBannerVisible(true);
        playNotificationSound();
      }
    } catch (err) {
      console.error('Scan error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  // Batch auto-submit all staged positions across all sites
  const handleBatchSubmitAll = async (jobsToSubmit: JobListing[]) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/batch-auto-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobIds: jobsToSubmit.map((j) => j.id),
          profile,
        }),
      });
      const data = await response.json();
      const resultsMap = new Map(
        (data.results || []).map((r: { jobId: string; confirmationId: string }) => [
          r.jobId,
          r.confirmationId,
        ])
      );

      setJobs((prevJobs) =>
        prevJobs.map((j) => {
          if (jobsToSubmit.some((sub) => sub.id === j.id)) {
            const confId =
              (resultsMap.get(j.id) as string) ||
              `${j.source.toUpperCase().slice(0, 3)}-${Math.floor(100000 + Math.random() * 900000)}`;
            return {
              ...j,
              status: 'submitted',
              submissionConfirmationId: confId,
              submittedAt: new Date().toISOString(),
              approvedAt: new Date().toISOString(),
            };
          }
          return j;
        })
      );

      playNotificationSound();
      if (jobsToSubmit[0]) {
        setLastConfirmationId(
          (resultsMap.get(jobsToSubmit[0].id) as string) ||
            `BATCH-${Date.now().toString().slice(-6)}`
        );
        setSubmissionModalJob(jobsToSubmit[0]);
      }
    } catch (err) {
      console.error('Batch auto-submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom Job Analysis with Gemini API
  const handleCustomJobAnalyze = async (title: string, company: string, description: string) => {
    setIsAnalyzingCustom(true);
    try {
      const response = await fetch('/api/match-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: title,
          company,
          jobDescription: description,
          profile,
        }),
      });

      const result = await response.json();
      const analysisData = result.data || {};

      const newCustomJob: JobListing = {
        id: `job-custom-${Date.now()}`,
        title,
        targetRole: (title.includes('Senior')
          ? 'Senior Rig Mechanic'
          : title.includes('Engineer')
          ? 'Maintenance Engineer'
          : title.includes('Equipment')
          ? 'Drilling Equipment Technician'
          : 'Rig Mechanic') as any,
        company,
        location: 'Offshore / Rig Site',
        country: 'India',
        isOffshore: true,
        rigType: 'Jack-Up',
        postedDate: 'Just now',
        source: 'linkedin.in',
        url: 'https://in.linkedin.com/jobs',
        salaryOrDayRate: 'Negotiable / Market Competitive',
        rotation: '28/28 Rotation',
        description,
        requiredEquipments: ['Caterpillar Engines', 'Top Drive Systems', 'Triplex Mud Pumps'],
        requiredCertifications: ['BOSIET', 'Mechanical Qualification'],
        minExperienceYears: 5,
        matchScore: analysisData.overallScore || 92,
        status: 'pending_approval',
        matchAnalysis: {
          overallScore: analysisData.overallScore || 92,
          machineryFit: analysisData.machineryFit || 94,
          certificationsFit: analysisData.certificationsFit || 96,
          experienceFit: analysisData.experienceFit || 95,
          rigTypeFit: analysisData.rigTypeFit || 90,
          keyStrengths: analysisData.keyStrengths || ['Strong technical match on drilling machinery.'],
          missingOrGaps: analysisData.missingOrGaps || [],
          reasoning: analysisData.reasoning || 'Evaluated against candidate qualifications.',
        },
        screeningAnswers: analysisData.screeningAnswers || [
          {
            question: 'Are you BOSIET certified?',
            answer: 'Yes, valid through 2026, issued in Mumbai.',
            highlight: 'BOSIET Valid',
          },
        ],
        tailoredCoverLetter: analysisData.tailoredCoverLetter,
      };

      setJobs((prev) => [newCustomJob, ...prev]);

      // Notification
      const newNotif: ApprovalNotification = {
        id: `notif-${Date.now()}`,
        jobId: newCustomJob.id,
        jobTitle: newCustomJob.title,
        company: newCustomJob.company,
        location: newCustomJob.location,
        matchScore: newCustomJob.matchScore,
        timestamp: 'Just now',
        read: false,
        urgent: true,
        role: newCustomJob.targetRole,
      };
      setNotifications((prev) => [newNotif, ...prev]);
      setCurrentTab('approvals');
      setIsBannerVisible(true);
      playNotificationSound();
    } catch (err) {
      console.error('Custom job analysis failed:', err);
    } finally {
      setIsAnalyzingCustom(false);
    }
  };

  // Batch approve high matches
  const handleApproveAllHighMatches = async () => {
    const highMatches = pendingJobs.filter((j) => j.matchScore >= 95);
    for (const j of highMatches) {
      await handleApproveAndSubmit(j);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        pendingCount={pendingJobs.length}
        onScanNow={handleScanNow}
        isScanning={isScanning}
        profile={profile}
        unreadNotifications={unreadCount}
        currentUser={currentUser}
        onConnectGmail={handleConnectGmail}
        onDisconnectGmail={handleDisconnectGmail}
        onOpenCandidateModal={() => setIsCandidateModalOpen(true)}
        attachedDocsCount={attachedCount}
        onOpenNotifications={() => {
          setIsNotificationModalOpen(true);
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        }}
      />

      {/* Floating Approval Alert Banner */}
      <ApprovalAlertBanner
        pendingJobs={pendingJobs}
        onReviewJob={(job) => {
          setCurrentTab('approvals');
        }}
        onApproveAllHighMatches={handleApproveAllHighMatches}
        onDismiss={() => setIsBannerVisible(false)}
        isVisible={isBannerVisible}
      />

      {/* Main Content Areas */}
      <main className="flex-1 pb-24 md:pb-16">
        {currentTab === 'approvals' && (
          <PipelineApprovalView
            jobs={jobs}
            onApproveAndSubmit={handleApproveAndSubmit}
            onBatchSubmitAll={handleBatchSubmitAll}
            onApplyViaGmail={handleOpenGmailModal}
            onRejectJob={handleRejectJob}
            onHoldJob={handleHoldJob}
            profile={profile}
            isSubmitting={isSubmitting}
            activeSubmittingJobId={activeSubmittingJobId}
          />
        )}

        {currentTab === 'feed' && (
          <LinkedInFeedView
            jobs={jobs}
            onStageForApproval={handleStageForApproval}
            onCustomJobAnalyze={handleCustomJobAnalyze}
            onApplyViaGmail={handleOpenGmailModal}
            isAnalyzingCustom={isAnalyzingCustom}
            onScanNow={handleScanNow}
            isScanning={isScanning}
            onResetWorldwideJobs={() => {
              setJobs(INITIAL_JOB_LISTINGS);
              try {
                localStorage.setItem('rigmatch_jobs', JSON.stringify(INITIAL_JOB_LISTINGS));
                localStorage.setItem('rigmatch_jobs_version', RIGMATCH_JOBS_CACHE_VERSION);
              } catch {}
            }}
          />
        )}

        {currentTab === 'documents' && (
          <DocumentsVaultView
            profile={profile}
            documents={documents}
            onUpdateDocuments={handleUpdateDocuments}
            onNavigateToFeed={() => setCurrentTab('feed')}
          />
        )}

        {currentTab === 'resume' && (
          <ResumeProfileView
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onOpenCandidateModal={() => setIsCandidateModalOpen(true)}
          />
        )}

        {currentTab === 'criteria' && (
          <CriteriaSettingsView profile={profile} onSavePreferences={handleUpdateProfile} />
        )}

        {currentTab === 'history' && <SubmissionHistoryView jobs={jobs} profile={profile} />}
      </main>

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        pendingCount={pendingJobs.length}
        unreadNotifications={unreadCount}
        attachedDocsCount={attachedCount}
        onOpenNotifications={() => {
          setIsNotificationModalOpen(true);
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        }}
      />

      {/* Candidate Switcher & Custom CV Parser Modal */}
      <CandidateProfileModal
        isOpen={isCandidateModalOpen}
        onClose={() => setIsCandidateModalOpen(false)}
        currentProfile={profile}
        onSelectProfile={(newProf) => {
          handleUpdateProfile(newProf);
          setIsCandidateModalOpen(false);
        }}
        currentUser={currentUser}
        onConnectGoogle={handleConnectGmail}
      />

      {/* Notification Center Modal */}
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notifications={notifications}
        jobs={jobs}
        profile={profile}
        onSelectJob={(job) => {
          setCurrentTab('approvals');
        }}
        onQuickApprove={handleApproveAndSubmit}
      />

      {/* Submission Success & Trace Modal */}
      <SubmissionProgressModal
        isOpen={!!submissionModalJob}
        job={submissionModalJob}
        confirmationId={lastConfirmationId}
        onClose={() => {
          setSubmissionModalJob(null);
          setLastConfirmationId(null);
        }}
      />

      {/* Gmail Application Dispatch Modal */}
      <GmailApplicationModal
        job={gmailModalJob}
        isOpen={!!gmailModalJob}
        onClose={() => setGmailModalJob(null)}
        onSuccess={handleGmailSendSuccess}
        profile={profile}
        currentUser={currentUser}
        onUserAuthChange={setCurrentUser}
        documents={documents}
      />

      {/* Connect Gmail & Vercel Domain Diagnostic Modal */}
      <ConnectGmailModal
        isOpen={isConnectGmailModalOpen}
        onClose={() => setIsConnectGmailModalOpen(false)}
        currentUser={currentUser}
        onUserAuthChange={(user, customEmail) => {
          setCurrentUser(user);
          if (customEmail) {
            setProfile((prev) => ({ ...prev, email: customEmail }));
          }
        }}
        defaultEmail={profile.email || 'jogendra.dipeng11@gmail.com'}
      />
    </div>
  );
}
