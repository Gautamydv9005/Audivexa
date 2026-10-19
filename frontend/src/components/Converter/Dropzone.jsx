import React, { useRef, useState } from 'react';
import { UploadCloud, FileVideo, X, AlertCircle, ArrowRight, ShieldCheck, Film } from 'lucide-react';

const ALLOWED_EXTENSIONS = [
  '.mp4', '.mov', '.webm', '.avi', '.mkv',
  '.flv', '.wmv', '.m4v', '.ts', '.3gp', '.mpeg'
];

export default function Dropzone({
  file,
  onFileSelect,
  onClearFile,
  onStartConvert,
  maxSizeMB = 250,
  disabled = false,
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const validateAndSelect = (selectedFile) => {
    setError(null);
    if (!selectedFile) return;

    // Check file size
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (selectedFile.size > maxBytes) {
      setError(`File size exceeds ${maxSizeMB} MB limit. Please select a smaller video.`);
      return;
    }

    // Check extension
    const ext = '.' + selectedFile.name.split('.').pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext) && !selectedFile.type.startsWith('video/')) {
      setError(`Unsupported format "${ext}". Supported: MP4, MOV, WebM, AVI, MKV, FLV, WMV.`);
      return;
    }

    onFileSelect(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelect(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const mb = bytes / (1024 * 1024);
    if (mb < 1) {
      return (bytes / 1024).toFixed(1) + ' KB';
    }
    return mb.toFixed(2) + ' MB';
  };

  return (
    <div className="w-full space-y-4">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        aria-label="Select video file to convert"
        accept="video/*,.mp4,.mov,.webm,.avi,.mkv,.flv,.wmv,.m4v,.ts"
        className="hidden"
        disabled={disabled}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            validateAndSelect(e.target.files[0]);
          }
        }}
      />

      {/* Error Alert */}
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError(null)} className="text-rose-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Selected File State vs Dropzone Area */}
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`relative group border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 cursor-pointer ${
            isDragOver
              ? 'border-brand-violet bg-brand-violet/10 scale-[1.01] shadow-xl shadow-brand-violet/20'
              : 'border-slate-800 hover:border-brand-violet/50 bg-navy-900/40 hover:bg-navy-900/70'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {/* Subtle Corner Accents */}
          <div className="absolute top-3 left-3 w-2 h-2 border-t-2 border-l-2 border-slate-700 group-hover:border-brand-cyan transition-colors"></div>
          <div className="absolute top-3 right-3 w-2 h-2 border-t-2 border-r-2 border-slate-700 group-hover:border-brand-cyan transition-colors"></div>
          <div className="absolute bottom-3 left-3 w-2 h-2 border-b-2 border-l-2 border-slate-700 group-hover:border-brand-cyan transition-colors"></div>
          <div className="absolute bottom-3 right-3 w-2 h-2 border-b-2 border-r-2 border-slate-700 group-hover:border-brand-cyan transition-colors"></div>

          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-brand-violet/20 to-brand-blue/20 border border-brand-violet/30 flex items-center justify-center group-hover:scale-110 group-hover:border-brand-violet transition-all duration-300 shadow-md">
              <UploadCloud className="w-8 h-8 text-brand-cyan group-hover:text-white transition-colors" />
            </div>

            <div>
              <p className="text-base sm:text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">
                Drop your video here, or <span className="text-brand-violet underline underline-offset-4">browse files</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Fast local upload up to <strong className="text-slate-200">{maxSizeMB} MB</strong> per file
              </p>
            </div>

            {/* Supported Formats Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
              {['MP4', 'MOV', 'WEBM', 'AVI', 'MKV', 'FLV'].map((fmt) => (
                <span
                  key={fmt}
                  className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-[10px] font-mono font-medium text-slate-300"
                >
                  {fmt}
                </span>
              ))}
              <span className="text-[10px] text-slate-500 font-mono">+ more</span>
            </div>
          </div>
        </div>
      ) : (
        /* Selected File Card */
        <div className="rounded-2xl border border-brand-violet/40 bg-gradient-to-br from-navy-900/90 via-navy-850 to-navy-900/90 p-5 sm:p-6 shadow-xl shadow-brand-violet/10 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-brand-violet/20 border border-brand-violet/40 flex items-center justify-center shrink-0">
                <FileVideo className="w-6 h-6 text-brand-cyan" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate" title={file.name}>
                  {file.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span>{formatFileSize(file.size)}</span>
                  <span>•</span>
                  <span className="uppercase text-brand-cyan font-mono text-[11px]">
                    {file.name.split('.').pop()}
                  </span>
                  <span>•</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Ready
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClearFile}
              disabled={disabled}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              title="Remove file"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              disabled={disabled}
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-slate-400 hover:text-white underline underline-offset-2 transition-colors order-2 sm:order-1"
            >
              Select a different video
            </button>

            <button
              type="button"
              disabled={disabled}
              onClick={onStartConvert}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-violet via-brand-blue to-brand-cyan hover:opacity-95 shadow-lg shadow-brand-violet/25 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer order-1 sm:order-2"
            >
              <span>Start MP3 Conversion</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
