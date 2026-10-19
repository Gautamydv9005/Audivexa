import React from 'react';
import { X, Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export default function ProPricingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl bg-navy-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl shadow-brand-violet/20 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-lg mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/30 text-brand-violet text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Audivexa Pricing Preview</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Free Forever Converter vs. Pro
          </h3>
          <p className="text-xs text-slate-400">
            Enjoy full high-fidelity conversions for free. Upgrade only if your workflow demands batch capacity and multi-gigabyte files.
          </p>
        </div>

        {/* Pricing Cards Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Free Tier */}
          <div className="rounded-2xl bg-navy-950/70 border border-slate-800 p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white">Audivexa Free</h4>
                  <p className="text-xs text-slate-400">For daily personal & audio conversion</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-xs font-bold text-slate-200">
                  Current
                </span>
              </div>

              <div className="text-3xl font-black text-white font-mono">
                $0 <span className="text-xs text-slate-400 font-normal">/ lifetime</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>320 kbps Constant Bitrate (CBR)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>250 MB Maximum File Size</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>All formats: MP4, MOV, WebM, AVI, MKV</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct YouTube video extraction</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Interactive Audio Waveform Preview</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Ephemeral (15 min auto-purge)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Continue with Free Converter
            </button>
          </div>

          {/* Pro Tier */}
          <div className="rounded-2xl bg-gradient-to-br from-brand-violet/15 via-navy-850 to-brand-blue/15 border border-brand-violet/50 p-6 space-y-5 flex flex-col justify-between shadow-xl shadow-brand-violet/10 relative">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-brand-violet to-brand-blue text-[10px] font-extrabold text-white uppercase tracking-wider shadow-sm">
              Coming Soon
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                    <span>Audivexa Pro</span>
                    <Sparkles className="w-4 h-4 text-brand-cyan" />
                  </h4>
                  <p className="text-xs text-slate-400">For creators, video editors & studios</p>
                </div>
              </div>

              <div className="text-3xl font-black text-white font-mono">
                $4.99 <span className="text-xs text-slate-400 font-normal">/ month (Planned)</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-cyan shrink-0" />
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-cyan shrink-0" />
                  <span className="font-semibold text-white">Batch upload up to 50 videos</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-cyan shrink-0" />
                  <span className="font-semibold text-white">Up to 4 GB per video file</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-cyan shrink-0" />
                  <span>Lossless FLAC, WAV, and OGG formats</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-cyan shrink-0" />
                  <span>Dedicated priority CPU conversion cluster</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-cyan shrink-0" />
                  <span>100% ad-free interface</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                alert('Audivexa Pro is currently in private preview! All features remain 100% free right now.');
                onClose();
              }}
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-violet to-brand-blue hover:opacity-95 shadow-md shadow-brand-violet/25 transition-all"
            >
              Join Pro Beta Waitlist
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
