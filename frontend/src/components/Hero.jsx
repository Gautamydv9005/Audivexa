import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Zap, Music } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-10 pb-8 text-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-violet/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-brand-blue/15 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-brand-violet/30 shadow-inner mb-6 animate-pulse-slow">
          <Sparkles className="w-3.5 h-3.5 text-brand-violet" />
          <span className="text-xs font-semibold tracking-wide text-slate-200">
            Next-Gen FFmpeg 6.1 Audio Transcoder • Free Forever
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-5">
          Convert Video & YouTube to{' '}
          <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet bg-clip-text text-transparent">
            Pristine MP3
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          Extract studio-quality audio from <span className="text-white font-medium">MP4, MOV, WebM, AVI, MKV</span> files or paste any <span className="text-white font-medium">YouTube link</span>. Fast, private, and zero compression artifacts.
        </p>

        {/* Highlights Bar */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Studio 320 kbps Bitrate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>250 MB Free File Limit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Ephemeral & Private</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>In-Browser Audio Player</span>
          </div>
        </div>

      </div>
    </section>
  );
}
