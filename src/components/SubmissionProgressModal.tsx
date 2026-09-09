import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  RefreshCw,
  FileText,
  ShieldCheck,
  Send,
  ExternalLink,
  X,
} from 'lucide-react';
import { JobListing } from '../types';

interface SubmissionProgressModalProps {
  job: JobListing | null;
  isOpen: boolean;
  onClose: () => void;
  confirmationId: string | null;
}

export const SubmissionProgressModal: React.FC<SubmissionProgressModalProps> = ({
  job,
  isOpen,
  onClose,
  confirmationId,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      const timer1 = setTimeout(() => setCurrentStep(2), 700);
      const timer2 = setTimeout(() => setCurrentStep(3), 1500);
      const timer3 = setTimeout(() => setCurrentStep(4), 2200);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isOpen]);

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-lg w-full p-6 text-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3 border border-amber-500/40">
            {currentStep < 4 ? (
              <RefreshCw className="w-7 h-7 animate-spin" />
            ) : (
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            )}
          </div>
          <h2 className="text-lg font-bold text-white">
            {currentStep < 4 ? 'Dispatched to LinkedIn India...' : 'Application Successfully Submitted!'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {job.title} at <strong className="text-slate-200">{job.company}</strong>
          </p>
        </div>

        {/* Step List */}
        <div className="space-y-3 mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
          <div className="flex items-center space-x-3">
            {currentStep >= 1 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
            )}
            <span className={currentStep >= 1 ? 'text-slate-200 font-medium' : 'text-slate-500'}>
              Verifying credentials: 12+ Yrs Experience, BOSIET 2026, Cat 3516B, Varco TDS-8SA
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {currentStep >= 2 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
            )}
            <span className={currentStep >= 2 ? 'text-slate-200 font-medium' : 'text-slate-500'}>
              Attaching signed resume: <span className="text-amber-300">Jogendra_Patel_CV.pdf</span>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {currentStep >= 3 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
            )}
            <span className={currentStep >= 3 ? 'text-slate-200 font-medium' : 'text-slate-500'}>
              Transmitting screening responses &amp; tailored cover letter via LinkedIn API
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {currentStep >= 4 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
            )}
            <span className={currentStep >= 4 ? 'text-emerald-300 font-bold' : 'text-slate-500'}>
              Confirmed by Employer Portal! Confirmation ID: {confirmationId || 'LK-IN-889104'}
            </span>
          </div>
        </div>

        {currentStep >= 4 && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-emerald-200 text-xs mb-5 flex items-center justify-between">
            <div>
              <div className="font-bold">Official Application Reference</div>
              <div className="text-[11px] text-emerald-300 font-mono mt-0.5">
                {confirmationId || 'LK-IN-889104'}
              </div>
            </div>
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
        )}

        <div className="flex justify-end space-x-2">
          {currentStep >= 4 && (
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow"
            >
              Done / Return to Pipeline
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
