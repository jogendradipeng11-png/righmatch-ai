import React, { useState, useEffect } from 'react';
import {
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  X,
  Send,
  Sparkles,
  Paperclip,
  FileText,
  FileCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { JobListing, UserResumeProfile, CandidateDocument } from '../types';
import { sendJobApplicationViaGmail } from '../lib/gmailService';
import { googleSignIn, getAccessToken } from '../lib/firebaseAuth';
import { loadStoredDocuments, prepareEmailAttachments, formatBytes } from '../lib/documentVault';
import { User } from 'firebase/auth';

interface GmailApplicationModalProps {
  job: JobListing | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (jobId: string, result: { messageId: string; recipient: string; sentAt: string }) => void;
  profile: UserResumeProfile;
  currentUser: User | null;
  onUserAuthChange: (user: User | null) => void;
  documents?: CandidateDocument[];
}

export const GmailApplicationModal: React.FC<GmailApplicationModalProps> = ({
  job,
  isOpen,
  onClose,
  onSuccess,
  profile,
  currentUser,
  onUserAuthChange,
  documents: propDocs,
}) => {
  if (!isOpen || !job) return null;

  const defaultRecipient = job.recruiterEmail || 'careers@drillingcontractor.com';
  const [recipient, setRecipient] = useState<string>(defaultRecipient);
  const [coverLetter, setCoverLetter] = useState<string>(job.tailoredCoverLetter || '');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sentSuccess, setSentSuccess] = useState<boolean>(false);
  const [sentAttachmentNames, setSentAttachmentNames] = useState<string[]>([]);
  const [showDocSelector, setShowDocSelector] = useState<boolean>(true);

  // Load available documents from props or local storage
  const availableDocs = propDocs && propDocs.length > 0 ? propDocs : loadStoredDocuments(profile);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>(() =>
    availableDocs.filter((d) => d.includeInApplications).map((d) => d.id)
  );

  useEffect(() => {
    // Re-sync if recipient or job changes
    if (job?.recruiterEmail) {
      setRecipient(job.recruiterEmail);
    }
  }, [job]);

  const applicantEmail = currentUser?.email || profile.email || 'candidate@gmail.com';
  const applicantName = profile.fullName || 'Rig Candidate';
  const primaryCert = profile.certifications?.[0]?.name || 'BOSIET / Offshore Verified';
  const subject = `Job Application: ${job.title} - ${applicantName} (${profile.totalExperienceYears}+ Yrs Exp - ${primaryCert.split('(')[0].trim()})`;

  const selectedDocs = availableDocs.filter((d) => selectedDocIds.includes(d.id));
  const totalAttachedBytes = selectedDocs.reduce((acc, curr) => acc + (curr.fileSizeBytes || 0), 0);

  const toggleDocSelection = (id: string) => {
    setSelectedDocIds((prev) =>
      prev.includes(id) ? prev.filter((dId) => dId !== id) : [...prev, id]
    );
  };

  const handleSignInGoogle = async () => {
    setIsSigningIn(true);
    setErrorMsg(null);
    try {
      const result = await googleSignIn();
      if (result) {
        onUserAuthChange(result.user);
      }
    } catch (err: any) {
      console.error('Sign in failed:', err);
      setErrorMsg(err.message || 'Failed to authenticate with Google. You can still test sending via the dispatch protocol below.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleConfirmSend = async () => {
    setIsSending(true);
    setErrorMsg(null);

    const preparedAttachments = prepareEmailAttachments(selectedDocs);
    const attachmentFilenames = preparedAttachments.map((a) => a.filename);

    try {
      let token = await getAccessToken();

      // If user is authenticated and token is available, send directly via official Google Gmail API
      if (token) {
        const result = await sendJobApplicationViaGmail({
          accessToken: token,
          applicantName,
          applicantEmail,
          toEmail: recipient,
          job,
          coverLetter,
          profile,
          attachments: preparedAttachments,
        });

        setSentAttachmentNames(attachmentFilenames);
        setSentSuccess(true);
        setTimeout(() => {
          onSuccess(job.id, {
            messageId: result.messageId,
            recipient: result.recipient,
            sentAt: result.sentAt,
          });
          onClose();
        }, 1500);
        return;
      }

      // Call our server-side API endpoint with full attachments payload
      const res = await fetch('/api/send-gmail-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken: token,
          applicantName,
          applicantEmail,
          toEmail: recipient,
          job,
          coverLetter,
          profile,
          attachments: preparedAttachments,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to dispatch email application');
      }

      setSentAttachmentNames(attachmentFilenames);
      setSentSuccess(true);
      setTimeout(() => {
        onSuccess(job.id, {
          messageId: data.messageId,
          recipient: data.toEmail,
          sentAt: data.sentAt,
        });
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error('Error sending application via Gmail:', err);
      setErrorMsg(err.message || 'An error occurred while sending the email. Please verify the recipient address and connection.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div id="gmail-application-modal" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/90">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm sm:text-base font-bold text-white">Send Application & Credentials to Company</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  Direct Dispatch
                </span>
              </div>
              <p className="text-xs text-slate-400">
                From: <strong className="text-slate-200">{applicantEmail}</strong> • To: <strong className="text-sky-300 font-mono">{job.company}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            title="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 text-sm">
          {sentSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">Application & Documents Delivered!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Your cover letter and <strong>{sentAttachmentNames.length} attached credentials</strong> have been transmitted directly to <span className="text-sky-400 font-mono font-bold">{recipient}</span>.
              </p>

              {sentAttachmentNames.length > 0 && (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 max-w-md mx-auto text-left space-y-1.5 mt-3">
                  <div className="text-[11px] font-semibold text-slate-400 flex items-center">
                    <Paperclip className="w-3 h-3 mr-1 text-amber-400" />
                    Delivered Attachments ({sentAttachmentNames.length}):
                  </div>
                  {sentAttachmentNames.map((fn, idx) => (
                    <div key={idx} className="text-xs text-emerald-300 font-mono flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{fn}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Mandatory Confirmation Notice */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start space-x-2.5 text-xs text-amber-200/90">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300">Direct Recruiter Delivery:</span> An email will be dispatched to the hiring contractor ({job.company}) with your tailored cover letter and <strong>{selectedDocs.length} certified documents</strong> attached.
                </div>
              </div>

              {/* Recipient Field (Company / Recruiter Email) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                    <span>Job Company / Recruiter Email</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-950 text-sky-400 border border-sky-800 font-mono">
                      Target Mailbox
                    </span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">Recipient: {job.company}</span>
                </div>
                <input
                  type="email"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="recruiter@company.com"
                />
              </div>

              {/* Subject Line */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject Line</label>
                <div className="w-full bg-slate-950/70 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 text-xs font-mono">
                  {subject}
                </div>
              </div>

              {/* Document Attachments Selector (Interactive) */}
              <div className="border border-slate-800 rounded-xl bg-slate-950/70 overflow-hidden">
                <div
                  onClick={() => setShowDocSelector(!showDocSelector)}
                  className="p-3 bg-slate-950 flex items-center justify-between cursor-pointer hover:bg-slate-900/60 transition"
                >
                  <div className="flex items-center space-x-2">
                    <Paperclip className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">
                      Document Attachments ({selectedDocs.length} Selected • {formatBytes(totalAttachedBytes)})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <span>{showDocSelector ? 'Collapse' : 'Manage Attachments'}</span>
                    {showDocSelector ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {showDocSelector && (
                  <div className="p-3 pt-2 border-t border-slate-800/80 space-y-2">
                    <p className="text-[11px] text-slate-400">
                      Select which credentials from your <strong>Documents Vault</strong> to include as attachments to this email:
                    </p>

                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {availableDocs.map((doc) => {
                        const isChecked = selectedDocIds.includes(doc.id);
                        return (
                          <label
                            key={doc.id}
                            className={`flex items-center justify-between p-2 rounded-lg border transition cursor-pointer text-xs ${
                              isChecked
                                ? 'bg-slate-900 border-amber-500/40 text-white'
                                : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5 truncate mr-2">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleDocSelection(doc.id)}
                                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 focus:ring-offset-slate-950 shrink-0"
                              />
                              <div className="truncate">
                                <div className="font-semibold text-xs truncate flex items-center">
                                  <FileText className="w-3 h-3 mr-1 text-rose-400 shrink-0" />
                                  <span className="truncate">{doc.name}</span>
                                </div>
                                <div className="text-[10px] font-mono text-slate-500 truncate">
                                  {doc.filename}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-1.5 shrink-0 text-[10px]">
                              {doc.expiryDate && (
                                <span className="text-amber-400 font-mono hidden sm:inline">
                                  Exp: {doc.expiryDate}
                                </span>
                              )}
                              <span className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-slate-400">
                                {formatBytes(doc.fileSizeBytes || 0)}
                              </span>
                            </div>
                          </label>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                      <button
                        type="button"
                        onClick={() => setSelectedDocIds(availableDocs.map((d) => d.id))}
                        className="text-amber-400 hover:text-amber-300 font-medium"
                      >
                        Select All Documents
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedDocIds([])}
                        className="text-slate-400 hover:text-slate-200"
                      >
                        Deselect All
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cover Letter Body */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tailored Cover Letter</span>
                  </label>
                  <span className="text-[10px] text-slate-500">Edit before sending if needed</span>
                </div>
                <textarea
                  rows={6}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 font-sans leading-relaxed focus:ring-1 focus:ring-amber-500 focus:border-amber-500 resize-none"
                />
              </div>

              {/* Google Sign In Callout if not authenticated */}
              {!currentUser && (
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-300 text-center sm:text-left">
                    <span className="font-semibold text-white block">Sign in to Gmail directly</span>
                    <span className="text-slate-400 text-[11px]">Connect your Google account ({applicantEmail}) for official Gmail API delivery.</span>
                  </div>
                  <button
                    onClick={handleSignInGoogle}
                    disabled={isSigningIn}
                    className="w-full sm:w-auto shrink-0 flex items-center justify-center space-x-2 px-3.5 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-lg font-semibold text-xs shadow-sm transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    </svg>
                    <span>{isSigningIn ? 'Connecting...' : 'Connect Gmail'}</span>
                  </button>
                </div>
              )}

              {/* Error Message */}
              {errorMsg && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-300">
                  {errorMsg}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Actions */}
        {!sentSuccess && (
          <div className="p-3 sm:p-4 border-t border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-2.5 bg-slate-950/90">
            <button
              onClick={onClose}
              disabled={isSending}
              className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirmSend}
              disabled={isSending || !recipient}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 sm:py-2 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white shadow-lg shadow-red-600/20 transition-all disabled:opacity-50 min-h-[44px] sm:min-h-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {isSending
                  ? 'Transmitting with Attachments...'
                  : `Send Email to ${job.company} (${selectedDocs.length} Attachments)`}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

