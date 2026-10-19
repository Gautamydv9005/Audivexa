import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

export default function AdBanner({ onOpenPro }) {
  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {/* Label indicating compliant ad placement */}
      <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest px-2 mb-1.5 font-medium">
        <span>Compliant Sponsor Zone</span>
        <span>Ad Placement</span>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-navy-900/80 via-navy-850 to-navy-900/80 border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-violet to-brand-cyan p-0.5 shrink-0">
            <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-cyan" />
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <span>Audivexa Studio Cloud</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] bg-brand-violet/20 text-brand-violet border border-brand-violet/30 font-mono">
                Beta
              </span>
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Need batch conversions for hundreds of videos or lossless FLAC? Explore our high-speed pro tier.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenPro}
          className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 hover:text-brand-cyan border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>Learn More</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
