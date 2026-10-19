import React from 'react';
import { Loader2, Sparkles, Cpu, Clock, Music, AlertTriangle } from 'lucide-react';

export default function ConversionProgress({
  stage, // 'uploading' | 'converting' | 'fetching'
  progress, // 0 - 100
  title,
  bitrate,
  fileSize,
  duration,
  onCancel,
}) {
  const getStageTitle = () => {
    if (stage === 'uploading') return 'Uploading Video to Processing Engine...';
    if (stage === 'fetching') return 'Fetching YouTube Audio Stream...';
    if (progress < 25) return 'Inspecting Codecs & Audio Streams...';
    if (progress < 85) return `Transcoding with FFmpeg (${bitrate} MP3)...`;
    return 'Finalizing High-Fidelity MP3 Audio...';
  };

  const getStageDescription = () => {
    if (stage === 'uploading') return 'Securely transferring video chunks to local server memory';
    if (stage === 'fetching') return 'Connecting to YouTube media servers and piping stream';
    return 'Re-encoding audio track using high-grade libmp3lame with 44.1kHz stereo depth';
  };

  return (
    <div className="w-full rounded-2xl border border-brand-violet/40 bg-gradient-to-b from-navy-900/90 to-navy-850 p-6 sm:p-8 shadow-2xl shadow-brand-violet/15 space-y-6 animate-in fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-violet/20 border border-brand-violet/40 flex items-center justify-center shrink-0">
            <Loader2 className="w-5 h-5 text-brand-cyan animate-spin" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-white truncate max-w-sm sm:max-w-md">
              {title || 'Media Processing'}
            </h3>
            <p className="text-xs text-brand-violet font-semibold">
              {getStageTitle()}
            </p>
          </div>
        </div>

        {/* Bitrate Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-brand-cyan">
            {bitrate} MP3
          </span>
          {fileSize && (
            <span className="px-2.5 py-1 rounded-full bg-slate-800/60 text-xs font-mono text-slate-300">
              {fileSize}
            </span>
          )}
        </div>
      </div>

      {/* Main Progress Bar Container */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">{getStageDescription()}</span>
          <span className="text-base font-extrabold text-white font-mono">{progress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-3.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet rounded-full transition-all duration-300 relative shadow-sm"
            style={{ width: `${Math.max(progress, 3)}%` }}
          >
            {/* Shimmer line */}
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Real-time Waveform Micro-Visualizer */}
      <div className="rounded-xl bg-navy-950/80 border border-slate-800/80 p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-4 h-4 text-brand-cyan" />
          <span className="text-xs text-slate-300 font-medium">
            FFmpeg Transcoding Pipeline Active
          </span>
        </div>

        {/* Waveform Bars */}
        <div className="flex items-end gap-1 h-5">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-brand-blue to-brand-cyan rounded-full wave-bar"
              style={{ animationDuration: `${0.8 + (i % 5) * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>

      {/* Conversion notice */}
      <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Typically takes 2–5 seconds</span>
        </span>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-slate-400 hover:text-rose-400 underline transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

    </div>
  );
}
