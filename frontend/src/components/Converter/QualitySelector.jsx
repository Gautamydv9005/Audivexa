import React from 'react';
import { Sliders, Sparkles, Check } from 'lucide-react';

const QUALITIES = [
  {
    id: '320k',
    name: '320 kbps',
    label: 'Ultra Studio',
    desc: 'Maximum MP3 fidelity, pristine acoustic dynamics',
    recommended: true,
  },
  {
    id: '192k',
    name: '192 kbps',
    label: 'High Quality',
    desc: 'Great balance of high clarity and compact file size',
    recommended: false,
  },
  {
    id: '128k',
    name: '128 kbps',
    label: 'Standard',
    desc: 'Lightweight audio, perfect for voice notes & speeches',
    recommended: false,
  },
];

export default function QualitySelector({ selectedBitrate, onChange, disabled }) {
  return (
    <div className="w-full space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-brand-violet" />
          <span>Output Audio Quality</span>
        </label>
        <span className="text-[11px] text-slate-400">Constant Bitrate (CBR)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {QUALITIES.map((q) => {
          const isSelected = selectedBitrate === q.id;
          return (
            <button
              key={q.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(q.id)}
              className={`relative text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-br from-brand-violet/20 via-brand-blue/15 to-transparent border-brand-violet shadow-lg shadow-brand-violet/15 ring-1 ring-brand-violet/50'
                  : 'bg-navy-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/30'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {q.recommended && (
                <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-brand-violet to-brand-blue text-[10px] font-extrabold text-white uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
                  <span>Best Audio</span>
                </div>
              )}

              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {q.name}
                </span>
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-brand-violet border-brand-violet text-white'
                      : 'border-slate-700 bg-navy-950'
                  }`}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </div>

              <div className="text-xs font-semibold text-brand-cyan/90 mb-0.5">
                {q.label}
              </div>

              <p className="text-[11px] text-slate-400 leading-snug">
                {q.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
