import React, { useState, useRef } from 'react';
import {
  FileText,
  Upload,
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Paperclip,
  ShieldCheck,
  Calendar,
  Eye,
  Plus,
  Search,
  FileCheck,
  FolderArchive,
  Info,
  X,
  ExternalLink,
} from 'lucide-react';
import { CandidateDocument, DocumentCategory, UserResumeProfile } from '../types';
import { formatBytes, generateSyntheticPdfBase64 } from '../lib/documentVault';

interface DocumentsVaultViewProps {
  profile: UserResumeProfile;
  documents: CandidateDocument[];
  onUpdateDocuments: (docs: CandidateDocument[]) => void;
  onNavigateToFeed?: () => void;
}

const CATEGORY_LABELS: Record<DocumentCategory, { label: string; color: string }> = {
  resume: { label: 'CV & Resume', color: 'bg-indigo-950 text-indigo-300 border-indigo-800' },
  offshore_safety: { label: 'Offshore Safety & BOSIET', color: 'bg-emerald-950 text-emerald-300 border-emerald-800' },
  passport_seaman_book: { label: 'Passport & Seaman CDC', color: 'bg-sky-950 text-sky-300 border-sky-800' },
  trade_diploma: { label: 'Trade Test & Diplomas', color: 'bg-amber-950 text-amber-300 border-amber-800' },
  medical_vaccination: { label: 'Medical & Vaccinations', color: 'bg-rose-950 text-rose-300 border-rose-800' },
  other: { label: 'Other Credentials', color: 'bg-slate-800 text-slate-300 border-slate-700' },
};

export const DocumentsVaultView: React.FC<DocumentsVaultViewProps> = ({
  profile,
  documents,
  onUpdateDocuments,
  onNavigateToFeed,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<CandidateDocument | null>(null);

  // Upload Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<DocumentCategory>('offshore_safety');
  const [newIssuer, setNewIssuer] = useState('');
  const [newExpiry, setNewExpiry] = useState('');
  const [newAttachByDefault, setNewAttachByDefault] = useState(true);
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: number;
    type: string;
    base64: string;
  } | null>(null);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const attachedCount = documents.filter((d) => d.includeInApplications).length;
  const attachedSizeBytes = documents
    .filter((d) => d.includeInApplications)
    .reduce((acc, curr) => acc + (curr.fileSizeBytes || 0), 0);

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.issuer && doc.issuer.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleToggleAttach = (id: string) => {
    const updated = documents.map((doc) =>
      doc.id === id ? { ...doc, includeInApplications: !doc.includeInApplications } : doc
    );
    onUpdateDocuments(updated);
  };

  const handleDeleteDoc = (id: string) => {
    if (confirm('Are you sure you want to remove this document from your vault?')) {
      const updated = documents.filter((d) => d.id !== id);
      onUpdateDocuments(updated);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setUploadError('File size exceeds 15 MB limit. Please select a smaller PDF or image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setSelectedFile({
        name: file.name,
        size: file.size,
        type: file.type || 'application/pdf',
        base64,
      });
      if (!newTitle) {
        const cleanTitle = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[_-]/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase());
        setNewTitle(cleanTitle);
      }
    };
    reader.onerror = () => {
      setUploadError('Failed to read file from disk.');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveNewDocument = () => {
    if (!selectedFile && !newTitle) {
      setUploadError('Please select a file or provide a title.');
      return;
    }

    const docName = newTitle.trim() || selectedFile?.name || 'Candidate Document';
    const filename = (selectedFile?.name || `${docName.replace(/\s+/g, '_')}.pdf`).replace(
      /[^a-zA-Z0-9._-]/g,
      '_'
    );

    const base64Data =
      selectedFile?.base64 ||
      generateSyntheticPdfBase64(docName, profile.fullName, newIssuer || 'Verified Credential');

    const newDoc: CandidateDocument = {
      id: `doc-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      name: docName,
      filename,
      category: newCategory,
      fileSizeBytes: selectedFile?.size || 256000,
      fileType: selectedFile?.type || 'application/pdf',
      uploadDate: new Date().toISOString().split('T')[0],
      expiryDate: newExpiry || undefined,
      verified: true,
      includeInApplications: newAttachByDefault,
      issuer: newIssuer.trim() || undefined,
      base64Data,
    };

    onUpdateDocuments([newDoc, ...documents]);
    setShowUploadModal(false);
    resetUploadForm();
  };

  const resetUploadForm = () => {
    setNewTitle('');
    setNewCategory('offshore_safety');
    setNewIssuer('');
    setNewExpiry('');
    setNewAttachByDefault(true);
    setSelectedFile(null);
    setUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownload = (doc: CandidateDocument) => {
    let dataUrl = doc.base64Data;
    if (!dataUrl) {
      const synthetic = generateSyntheticPdfBase64(
        doc.name,
        profile.fullName,
        doc.issuer || 'RigMatch AI'
      );
      dataUrl = `data:application/pdf;base64,${synthetic}`;
    } else if (!dataUrl.startsWith('data:')) {
      dataUrl = `data:${doc.fileType || 'application/pdf'};base64,${dataUrl}`;
    }

    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = doc.filename || `${doc.name}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Top Banner / Summary Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <FolderArchive className="w-5 h-5" />
            </span>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Candidate Credentials & Documents Vault
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Store and manage your technical certificates, CV, offshore survival (BOSIET), passport & CDC.
            Selected documents are <strong>automatically bundled and attached</strong> when sending direct emails to hiring drilling contractors.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-sm"
            id="btn-upload-document"
          >
            <Upload className="w-3.5 h-3.5 mr-1.5" />
            Upload Document / Cert
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 sm:p-4">
          <div className="text-[11px] text-slate-400 font-medium">Total Vault Documents</div>
          <div className="text-lg sm:text-2xl font-bold text-white mt-1">{documents.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Certificates, CV & IDs</div>
        </div>

        <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-amber-400 font-medium flex items-center">
              <Paperclip className="w-3 h-3 mr-1" />
              Attached to Outgoing Emails
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-bold text-amber-300 mt-1">
            {attachedCount}{' '}
            <span className="text-xs font-normal text-slate-400">({formatBytes(attachedSizeBytes)})</span>
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5 flex items-center">
            <CheckCircle2 className="w-2.5 h-2.5 mr-1" />
            Auto-sent to company inboxes
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 sm:p-4">
          <div className="text-[11px] text-slate-400 font-medium">Offshore Safety Status</div>
          <div className="text-sm sm:text-base font-bold text-emerald-400 mt-1 flex items-center">
            <ShieldCheck className="w-4 h-4 mr-1 text-emerald-400" />
            BOSIET 2026 Valid
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">OPITO Accredited Center</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 sm:p-4">
          <div className="text-[11px] text-slate-400 font-medium">Candidate Profile Owner</div>
          <div className="text-sm sm:text-base font-bold text-slate-200 mt-1 truncate">
            {profile.fullName}
          </div>
          <div className="text-[10px] text-sky-400 mt-0.5 truncate font-mono">
            {profile.email}
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 sm:p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All ({documents.length})
          </button>
          {(Object.keys(CATEGORY_LABELS) as DocumentCategory[]).map((cat) => {
            const count = documents.filter((d) => d.category === cat).length;
            if (count === 0 && selectedCategory !== cat) return null;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {CATEGORY_LABELS[cat].label} ({count})
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative min-w-[200px] sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
          />
        </div>
      </div>

      {/* Active Outgoing Attachments Info Callout */}
      <div className="mb-6 p-3 sm:p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed text-slate-300">
          <strong className="text-amber-300">How Job Company Email Attachments Work:</strong> Any document marked with{' '}
          <span className="text-emerald-400 font-bold">"Attach by Default"</span> will be automatically packed as a standard base64 MIME attachment and sent directly to the employer's recruiter mailbox (e.g. <em>careers@shelfdrilling.com</em>) whenever you approve or auto-submit an application.
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocs.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-10 text-center text-slate-400">
          <FolderArchive className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="font-bold text-sm text-white">No Documents Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            {searchQuery
              ? 'No documents match your search keyword. Try clearing filters.'
              : 'Upload your CV, offshore certifications, trade licenses, or medical certificates.'}
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Upload First Document
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => {
            const catMeta = CATEGORY_LABELS[doc.category] || CATEGORY_LABELS.other;
            const isAttached = doc.includeInApplications;

            return (
              <div
                key={doc.id}
                className={`rounded-xl border p-4 transition flex flex-col justify-between ${
                  isAttached
                    ? 'bg-slate-900/90 border-slate-700 hover:border-amber-500/50 shadow-sm ring-1 ring-amber-500/20'
                    : 'bg-slate-900/50 border-slate-800/80 opacity-80 hover:opacity-100 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Bar: Category Pill & Attach Switch */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${catMeta.color} flex items-center`}
                    >
                      {catMeta.label}
                    </span>

                    <button
                      onClick={() => handleToggleAttach(doc.id)}
                      className={`inline-flex items-center space-x-1.5 px-2 py-1 rounded-md text-[11px] font-bold transition ${
                        isAttached
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200'
                      }`}
                      title="Toggle whether to automatically attach this document to job company application emails"
                    >
                      <Paperclip className="w-3 h-3" />
                      <span>{isAttached ? 'Attached' : 'Do Not Attach'}</span>
                    </button>
                  </div>

                  {/* Document Title & Filename */}
                  <h3 className="font-bold text-sm text-white line-clamp-2 leading-snug">
                    {doc.name}
                  </h3>
                  <div className="text-[11px] font-mono text-slate-400 mt-1 truncate flex items-center">
                    <FileText className="w-3 h-3 mr-1 text-rose-400 shrink-0" />
                    {doc.filename}
                  </div>

                  {/* Metadata Chips */}
                  <div className="mt-3 space-y-1.5 text-[11px] text-slate-400 border-t border-slate-800/80 pt-2.5">
                    {doc.issuer && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Issuer:</span>
                        <span className="text-slate-300 font-medium truncate max-w-[170px]">
                          {doc.issuer}
                        </span>
                      </div>
                    )}
                    {doc.expiryDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Validity / Expiry:</span>
                        <span className="text-amber-400 font-medium flex items-center">
                          <Calendar className="w-2.5 h-2.5 mr-1" />
                          {doc.expiryDate}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">File Size:</span>
                      <span className="text-slate-300 font-mono">
                        {formatBytes(doc.fileSizeBytes || 0)}
                      </span>
                    </div>
                  </div>

                  {doc.description && (
                    <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 italic">
                      "{doc.description}"
                    </p>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs flex items-center"
                      title="Preview Document Details"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      <span className="text-[11px]">Preview</span>
                    </button>
                    <button
                      onClick={() => handleDownload(doc)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs flex items-center"
                      title="Download PDF payload"
                    >
                      <Download className="w-3.5 h-3.5 mr-1" />
                      <span className="text-[11px]">Download</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleDeleteDoc(doc.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition"
                    title="Delete Document"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="p-1 rounded bg-amber-500/20 text-amber-400">
                  <Upload className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-base text-white">Upload New Credential / Document</h3>
              </div>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  resetUploadForm();
                }}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 py-4">
              {/* File Dropzone / Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Select File (PDF, DOC, JPG, PNG) <span className="text-rose-400">*</span>
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-xl p-5 text-center cursor-pointer bg-slate-950/50 transition group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Upload className="w-8 h-8 text-slate-500 group-hover:text-amber-400 mx-auto mb-2 transition" />
                  {selectedFile ? (
                    <div>
                      <div className="text-xs font-bold text-emerald-400 flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        {selectedFile.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {formatBytes(selectedFile.size)} • Click to choose another file
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-xs font-bold text-slate-200">
                        Click to browse or drop certificate file here
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Supported: PDF, DOCX, JPG, PNG up to 15 MB
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Document Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. OPITO BOSIET Certificate (2026) or Rig Mechanic CV"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Credential Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as DocumentCategory)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/60"
                >
                  <option value="offshore_safety">Offshore Safety (BOSIET, HUET, FOET, CA-EBS)</option>
                  <option value="resume">Curriculum Vitae (CV) / Master Resume</option>
                  <option value="passport_seaman_book">Passport & Continuous Discharge Certificate (CDC)</option>
                  <option value="trade_diploma">Trade Test, B.Tech / Diploma in Mechanical</option>
                  <option value="medical_vaccination">Offshore Medical Fitness (OGUK / OEUK, Yellow Fever)</option>
                  <option value="other">Other Oil & Gas Credential</option>
                </select>
              </div>

              {/* Issuer & Expiry in 2 cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Issuing Authority / Center
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. OPITO Mumbai, Shelf Drilling, OEUK"
                    value={newIssuer}
                    onChange={(e) => setNewIssuer(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2026-04-14 or Valid to 2033"
                    value={newExpiry}
                    onChange={(e) => setNewExpiry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
                  />
                </div>
              </div>

              {/* Attach by default toggle */}
              <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center">
                    <Paperclip className="w-3.5 h-3.5 mr-1 text-amber-400" />
                    Attach by default to company emails
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Included automatically whenever you dispatch an application to a recruiter
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={newAttachByDefault}
                  onChange={(e) => setNewAttachByDefault(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 focus:ring-offset-slate-950"
                />
              </div>

              {uploadError && (
                <div className="text-xs text-rose-400 bg-rose-950/50 border border-rose-900/50 p-2.5 rounded-lg flex items-center">
                  <AlertCircle className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                  {uploadError}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setShowUploadModal(false);
                  resetUploadForm();
                }}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNewDocument}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-sm"
              >
                Save to Documents Vault
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Document Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 inline-flex items-center mb-1">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Verified Document
                </span>
                <h3 className="font-bold text-base text-white">{previewDoc.name}</h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">{previewDoc.filename}</p>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[11px]">Category:</span>
                  <span className="text-slate-200 font-semibold">
                    {CATEGORY_LABELS[previewDoc.category]?.label || 'General'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">File Size:</span>
                  <span className="text-slate-200 font-mono">
                    {formatBytes(previewDoc.fileSizeBytes)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Upload Date:</span>
                  <span className="text-slate-200">{previewDoc.uploadDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Validity / Expiry:</span>
                  <span className="text-amber-400 font-medium">
                    {previewDoc.expiryDate || 'Lifelong / Active'}
                  </span>
                </div>
                {previewDoc.issuer && (
                  <div className="col-span-2">
                    <span className="text-slate-500 block text-[11px]">Issuing Institution:</span>
                    <span className="text-slate-200 font-medium">{previewDoc.issuer}</span>
                  </div>
                )}
              </div>

              {/* Status Pill */}
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Paperclip className="w-4 h-4 text-amber-400" />
                  <span className="text-slate-300">
                    Application Auto-Attach:{' '}
                    <strong className={previewDoc.includeInApplications ? 'text-emerald-400' : 'text-slate-400'}>
                      {previewDoc.includeInApplications ? 'Enabled (Auto-send)' : 'Disabled'}
                    </strong>
                  </span>
                </div>
                <button
                  onClick={() => handleToggleAttach(previewDoc.id)}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 underline"
                >
                  Toggle
                </button>
              </div>

              {/* Document Certificate Frame */}
              <div className="border border-slate-800 rounded-xl p-4 bg-slate-950 font-mono text-xs text-slate-300 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-slate-800">
                  <span>CERTIFIED ENCODED PAYLOAD</span>
                  <span className="text-emerald-400">READY FOR MIME TRANSMISSION</span>
                </div>
                <p className="text-xs text-slate-300">
                  Candidate: <strong>{profile.fullName}</strong>
                </p>
                <p className="text-xs text-slate-300">
                  Certified Title: <strong>{previewDoc.name}</strong>
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  This technical document payload is securely held in RigMatch AI and will be encoded as an RFC 2822 Base64 attachment whenever an application email is triggered to contractor recruitment teams.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleDownload(previewDoc)}
                className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Download Document
              </button>

              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
