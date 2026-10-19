import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Download, CheckCircle2, RotateCcw, FileAudio, Sparkles, ShieldCheck, Clock, HardDrive } from 'lucide-react';
import AudioWaveformPlayer from './AudioWaveformPlayer';

export default function ResultCard({
  job,
  downloadUrl,
  streamUrl,
  onReset,
}) {
  // Fire subtle confetti celebration on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#a855f7'],
      });
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <div className="w-full rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-navy-900/95 via-navy-850 to-navy-900/90 p-6 sm:p-8 shadow-2xl shadow-emerald-500/10 space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Success Badge & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase">
                Success
              </span>
              <span className="text-xs text-slate-400">High-Fidelity MP3 Ready</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-sm sm:max-w-md mt-0.5" title={job.displayName}>
              {job.displayName}.mp3
            </h3>
          </div>
        </div>

        {/* Quality & Expiry Tags */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/40 text-xs font-mono font-bold text-brand-cyan">
            {job.bitrate} MP3
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">
            {job.outputSizeFormatted}
          </span>
        </div>
      </div>

      {/* Technical Conversion Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="rounded-xl bg-navy-950/70 border border-slate-800/80 p-3">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
            <Clock className="w-3 h-3 text-brand-cyan" /> Duration
          </span>
          <p className="text-sm font-bold font-mono text-white mt-1">
            {job.durationFormatted || '00:00'}
          </p>
        </div>

        <div className="rounded-xl bg-navy-950/70 border border-slate-800/80 p-3">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
            <HardDrive className="w-3 h-3 text-brand-violet" /> MP3 Size
          </span>
          <p className="text-sm font-bold font-mono text-white mt-1">
            {job.outputSizeFormatted || 'Ready'}
          </p>
        </div>

        <div className="rounded-xl bg-navy-950/70 border border-slate-800/80 p-3 col-span-2 sm:col-span-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Retention
          </span>
          <p className="text-sm font-bold font-mono text-slate-300 mt-1">
            Purges in 15 mins
          </p>
        </div>
      </div>

      {/* Custom Audio Player with Waveform Preview */}
      <AudioWaveformPlayer
        audioUrl={streamUrl}
        title={job.displayName}
      />

      {/* Main Download & Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <a
          href={downloadUrl}
          download={`${job.displayName}.mp3`}
          className="w-full sm:flex-1 py-4 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-brand-blue hover:opacity-95 shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2.5 transition-all active:scale-95 text-center cursor-pointer"
        >
          <Download className="w-5 h-5" />
          <span>Download MP3 Audio ({job.bitrate})</span>
        </a>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto py-4 px-5 rounded-xl font-semibold text-xs text-slate-300 bg-slate-800/80 hover:bg-slate-850 hover:text-white border border-slate-700/80 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Convert Another</span>
        </button>
      </div>

    </div>
  );
}
