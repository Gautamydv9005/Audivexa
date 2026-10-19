import React from 'react';
import { Film, Check, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const FORMATS = [
  {
    ext: 'MP4',
    name: 'MPEG-4 Part 14',
    codecs: 'AAC, AC3, MP3, Opus',
    desc: 'The global standard for smartphones, cameras, and web streaming.',
  },
  {
    ext: 'WEBM',
    name: 'WebM Video',
    codecs: 'Opus, Vorbis',
    desc: 'HTML5 web video format commonly used on modern streaming sites.',
  },
  {
    ext: 'MOV',
    name: 'Apple QuickTime',
    codecs: 'AAC, Apple Lossless, PCM',
    desc: 'Standard output format from iPhone, iPad, and macOS cameras.',
  },
  {
    ext: 'MKV',
    name: 'Matroska Video',
    codecs: 'FLAC, DTS, AC3, MP3, AAC',
    desc: 'Flexible open standard supporting multiple multi-channel audio tracks.',
  },
  {
    ext: 'AVI',
    name: 'Audio Video Interleave',
    codecs: 'MP3, AC3, PCM',
    desc: 'Classic Windows multimedia format compatible with legacy editors.',
  },
  {
    ext: 'FLV',
    name: 'Flash Video',
    codecs: 'MP3, AAC',
    desc: 'Legacy streaming video format frequently found in video archives.',
  },
  {
    ext: 'WMV',
    name: 'Windows Media Video',
    codecs: 'WMA, WMA Pro',
    desc: 'Native Microsoft format designed for Windows Media Player.',
  },
  {
    ext: 'YouTube',
    name: 'YouTube Stream',
    codecs: 'Opus, AAC 128/160kbps',
    desc: 'Direct YouTube URLs automatically extracted into 320kbps MP3s.',
  },
];

export default function SupportedFormats() {
  return (
    <section className="py-20 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-cyan">
              Wide Codec Compatibility
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Supported Input Video Formats
            </p>
            <p className="text-sm text-slate-400 max-w-xl">
              Audivexa harnesses complete FFmpeg container demuxers, enabling you to extract MP3 audio from virtually any format.
            </p>
          </div>

          <Link
            to="/supported-formats"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-violet hover:text-white transition-colors"
          >
            <span>View complete format encyclopedia</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Formats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FORMATS.map((f) => (
            <div
              key={f.ext}
              className="rounded-2xl bg-navy-900/50 border border-slate-800/80 p-5 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-brand-violet/20 border border-brand-violet/30 text-xs font-mono font-bold text-brand-cyan">
                  .{f.ext}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Fully Supported
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">{f.name}</h4>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                  Audio: {f.codecs}
                </p>
              </div>

              <p className="text-xs text-slate-400 leading-snug">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
