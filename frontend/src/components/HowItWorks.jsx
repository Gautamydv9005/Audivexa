import React from 'react';
import { UploadCloud, Sliders, Download, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: UploadCloud,
    title: 'Select or Paste Video',
    desc: 'Drag & drop any video file (MP4, MOV, WebM, AVI, MKV) up to 250MB or paste a YouTube URL directly.',
  },
  {
    step: '02',
    icon: Sliders,
    title: 'Pick Target Bitrate',
    desc: 'Select from 128 kbps (compact), 192 kbps (balanced), or 320 kbps (studio fidelity).',
  },
  {
    step: '03',
    icon: Download,
    title: 'Preview & Download',
    desc: 'Listen to the audio preview on our waveform visualizer and download your pristine MP3 instantly.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-violet">
            Simple 3-Step Process
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How It Works
          </p>
          <p className="text-sm text-slate-400">
            Converting video audio has never been this seamless and rapid.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="relative rounded-2xl bg-navy-900/50 border border-slate-800/80 p-8 space-y-4 hover:border-slate-700 transition-all"
              >
                {/* Step Number Watermark */}
                <span className="text-4xl font-black font-mono text-slate-800/80 absolute top-5 right-6 select-none">
                  {item.step}
                </span>

                <div className="w-12 h-12 rounded-xl bg-brand-violet/20 border border-brand-violet/40 flex items-center justify-center text-brand-cyan shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-white pt-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
