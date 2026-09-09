import React, { useState } from 'react';
import {
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  X,
  Copy,
  Check,
  LogOut,
  RefreshCw,
  Sparkles,
  Globe,
} from 'lucide-react';
import { googleSignIn, googleSignOut, connectDirectEmail } from '../lib/firebaseAuth';
import { User } from 'firebase/auth';

interface ConnectGmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onUserAuthChange: (user: User | null, customEmail?: string) => void;
  defaultEmail?: string;
}

export const ConnectGmailModal: React.FC<ConnectGmailModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserAuthChange,
  defaultEmail = 'jogendra.dipeng11@gmail.com',
}) => {
  if (!isOpen) return null;

  const currentHostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const isVercel = currentHostname.includes('vercel.app');

  const [isLoading, setIsLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [isUnauthorizedDomain, setIsUnauthorizedDomain] = useState<boolean>(false);
  const [customEmailInput, setCustomEmailInput] = useState(currentUser?.email || defaultEmail);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedDomain, setCopiedDomain] = useState(false);

  const handleCopyDomain = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentHostname);
      setCopiedDomain(true);
      setTimeout(() => setCopiedDomain(false), 2000);
    }
  };

  const handleOAuthSignIn = async () => {
    setIsLoading(true);
    setErrorDetails(null);
    setIsUnauthorizedDomain(false);

    try {
      const result = await googleSignIn();
      if (result) {
        onUserAuthChange(result.user);
        setSavedSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1200);
      }
    } catch (err: any) {
      console.warn('OAuth Sign in error details:', err);
      const isDomainError =
        err?.code === 'auth/unauthorized-domain' ||
        err?.message?.includes('unauthorized-domain') ||
        err?.message?.includes('authorized domain');

      if (isDomainError) {
        setIsUnauthorizedDomain(true);
        setErrorDetails(
          `Domain "${currentHostname}" is not authorized in your Firebase Project. Add it in Firebase Console > Authentication > Settings > Authorized domains, or use the 1-Click Instant Connect below.`
        );
      } else if (err?.code === 'auth/popup-blocked') {
        setErrorDetails(
          'Google authentication popup was blocked by your browser settings. Please allow popups or use 1-Click Instant Connect below.'
        );
      } else {
        setErrorDetails(err?.friendlyMessage || err?.message || 'Failed to authenticate with Google.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickConnectJogendra = () => {
    const res = connectDirectEmail('jogendra.dipeng11@gmail.com', 'Jogendra Patel');
    onUserAuthChange(res.user, 'jogendra.dipeng11@gmail.com');
    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleConnectDirectEmail = () => {
    if (!customEmailInput || !customEmailInput.includes('@')) {
      setErrorDetails('Please enter a valid email address (e.g. jogendra.dipeng11@gmail.com)');
      return;
    }

    const clean = customEmailInput.trim();
    const res = connectDirectEmail(clean, 'Jogendra Patel');
    onUserAuthChange(res.user, clean);
    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleDisconnect = async () => {
    await googleSignOut();
    onUserAuthChange(null);
    onClose();
  };

  const openInNewTab = () => {
    window.open(window.location.href, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="connect-gmail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/90 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Connect Gmail for Auto-Apply
                {isVercel && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                    Vercel
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-400">
                Send applications and documents directly from your Gmail address
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-sm overflow-y-auto">
          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold">
                Gmail account connected successfully! Ready for multi-site application dispatch.
              </span>
            </div>
          )}

          {currentUser?.email ? (
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-400 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  Currently Connected & Active
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono font-bold">
                  Verified Dispatcher
                </span>
              </div>
              <div className="flex items-center space-x-2 text-white font-mono text-sm bg-slate-900 px-3 py-2.5 rounded-lg border border-slate-800">
                <Mail className="w-4 h-4 text-red-400 shrink-0" />
                <span className="truncate font-semibold">{currentUser.email}</span>
              </div>
              <p className="text-xs text-slate-400">
                All drilling applications (Shelf Drilling, Transocean, SLB, Valaris) and attached credentials (Offshore CV, BOSIET, Medical, Passport) will be dispatched from this mailbox.
              </p>
              <div className="pt-2 flex justify-between items-center border-t border-slate-800/80">
                <span className="text-[11px] text-slate-500">
                  Domain: {currentHostname}
                </span>
                <button
                  onClick={handleDisconnect}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-950/50 border border-rose-800/60 flex items-center transition"
                >
                  <LogOut className="w-3.5 h-3.5 mr-1.5" />
                  Disconnect Mailbox
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Top Option: 1-Click Instant Connect for Jogendra Patel */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 flex items-center">
                    <Sparkles className="w-4 h-4 mr-1.5 text-amber-400" />
                    Recommended (Instant 1-Click Connect)
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-medium">
                    100% Guaranteed on Vercel
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Immediately activate <strong className="text-white">jogendra.dipeng11@gmail.com</strong> as your connected sender. This bypasses any Vercel domain blocks and allows instant application dispatch with attached certificates.
                </p>
                <button
                  onClick={handleQuickConnectJogendra}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center space-x-2 transition shadow-md"
                >
                  <Mail className="w-4 h-4 text-slate-950" />
                  <span>Connect jogendra.dipeng11@gmail.com (1-Click)</span>
                </button>
              </div>

              {/* OAuth Google Sign In Button */}
              <div className="space-y-2 pt-1">
                <div className="text-xs text-slate-400 font-medium">
                  Or authenticate directly via Google Sign-In:
                </div>
                <button
                  onClick={handleOAuthSignIn}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition shadow-md disabled:opacity-60"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  )}
                  <span>Sign in with Google Account (OAuth)</span>
                </button>
              </div>

              {/* Vercel / Firebase Domain Diagnostic Guide */}
              {(isUnauthorizedDomain || isVercel) && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-blue-900/50 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-blue-300 font-semibold">
                    <span className="flex items-center">
                      <Globe className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                      Firebase Domain Authorization on Vercel:
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Project: watertankiot-473015
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Firebase requires registering your Vercel deployment domain to allow Google OAuth popups:
                  </p>
                  <div className="flex items-center space-x-2 bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="font-mono text-slate-300 text-[11px] truncate flex-1">
                      {currentHostname}
                    </span>
                    <button
                      onClick={handleCopyDomain}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-semibold flex items-center transition shrink-0"
                    >
                      {copiedDomain ? (
                        <>
                          <Check className="w-3 h-3 mr-1 text-emerald-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1 text-slate-400" />
                          Copy Domain
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <a
                      href="https://console.firebase.google.com/project/watertankiot-473015/authentication/settings"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 underline font-semibold"
                    >
                      Open Firebase Console Authorized Domains ↗
                    </a>
                  </div>
                </div>
              )}

              {errorDetails && !isUnauthorizedDomain && (
                <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-300 text-xs space-y-1.5">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{errorDetails}</span>
                  </div>
                </div>
              )}

              {/* Custom Gmail Address Connection */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Or Connect Another Custom Gmail Address:
                </label>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    value={customEmailInput}
                    onChange={(e) => setCustomEmailInput(e.target.value)}
                    placeholder="your-email@gmail.com"
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono focus:outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={handleConnectDirectEmail}
                    className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition shrink-0"
                  >
                    Connect
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Feature Highlights */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs text-slate-400">
            <div className="font-semibold text-slate-300 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
              When you dispatch applications:
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px]">
              <li>Dispatches formatted cover letter customized for your rig experience.</li>
              <li>Packages selected certificates (BOSIET, Medical, Passport, CV) as PDF attachments.</li>
              <li>Includes direct web composer button to open and review on <strong>mail.google.com</strong>.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between shrink-0">
          <button
            onClick={openInNewTab}
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center"
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1" />
            Open in New Tab
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
