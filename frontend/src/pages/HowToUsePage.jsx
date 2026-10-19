import React from 'react';
import { Link } from 'react-router-dom';
import { UploadCloud, Sliders, Download, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle, Headphones } from 'lucide-react';
import YoutubeIcon from '../components/icons/YoutubeIcon';
import SeoHead from '../components/SeoHead';

export default function HowToUsePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <SeoHead
        title="How to Convert Video & YouTube to MP3 Guide"
        description="Easy step-by-step tutorial on extracting 320kbps MP3 audio from video files and YouTube links. Learn about audio bitrates and optimal quality."
        canonical="https://audivexa.com/how-to-use"
      />
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/30 text-xs font-bold text-brand-violet uppercase tracking-wider">
          <span>Comprehensive Guide</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          How to Convert Videos & YouTube Links to MP3
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Step-by-step instructions for extracting studio-quality MP3 audio from any video container or streaming link using Audivexa.
        </p>
      </div>

      {/* Guide 1: Converting Local Video Files */}
      <section className="space-y-6 rounded-3xl bg-navy-900/60 border border-slate-800 p-6 sm:p-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center text-brand-cyan">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-brand-blue uppercase tracking-wider">Method A</span>
            <h2 className="text-xl font-bold text-white">Converting Local Video Files</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2 rounded-2xl bg-navy-950/60 border border-slate-800/80 p-5">
            <span className="text-xs font-mono font-bold text-brand-cyan">Step 1</span>
            <h3 className="text-sm font-bold text-white">Select Your Video</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Drag and drop your file into the converter box, or click the browse area to choose a file from your computer or phone. Audivexa supports MP4, MOV, WebM, AVI, MKV, FLV, WMV up to 250MB.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl bg-navy-950/60 border border-slate-800/80 p-5">
            <span className="text-xs font-mono font-bold text-brand-violet">Step 2</span>
            <h3 className="text-sm font-bold text-white">Choose Audio Quality</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We recommend <strong className="text-slate-200">320 kbps (Ultra Studio)</strong> for music, DJ sets, and recordings. For podcasts, speech, and lightweight files, 128 kbps or 192 kbps is ideal.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl bg-navy-950/60 border border-slate-800/80 p-5">
            <span className="text-xs font-mono font-bold text-emerald-400">Step 3</span>
            <h3 className="text-sm font-bold text-white">Preview & Download</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Click "Start MP3 Conversion". Once the progress reaches 100%, listen to the waveform preview to verify quality and click "Download MP3 Audio".
            </p>
          </div>
        </div>
      </section>

      {/* Guide 2: Converting YouTube Links */}
      <section className="space-y-6 rounded-3xl bg-navy-900/60 border border-slate-800 p-6 sm:p-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <YoutubeIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider">Method B</span>
            <h2 className="text-xl font-bold text-white">Converting YouTube Links to MP3</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2 rounded-2xl bg-navy-950/60 border border-slate-800/80 p-5">
            <span className="text-xs font-mono font-bold text-brand-cyan">Step 1</span>
            <h3 className="text-sm font-bold text-white">Copy the Video URL</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              From YouTube (web or app), click "Share" and copy the link (e.g. <code className="text-slate-300">https://youtu.be/...</code> or <code className="text-slate-300">https://youtube.com/watch?v=...</code>).
            </p>
          </div>

          <div className="space-y-2 rounded-2xl bg-navy-950/60 border border-slate-800/80 p-5">
            <span className="text-xs font-mono font-bold text-brand-violet">Step 2</span>
            <h3 className="text-sm font-bold text-white">Paste and Inspect</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Switch to the "YouTube URL" tab on Audivexa, paste your link, and click "Fetch" to verify title, duration, and thumbnail.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl bg-navy-950/60 border border-slate-800/80 p-5">
            <span className="text-xs font-mono font-bold text-emerald-400">Step 3</span>
            <h3 className="text-sm font-bold text-white">Transcode & Save</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Select 320 kbps and click "Convert to High-Fidelity MP3". Our backend streams the highest audio bitrate stream, re-encodes it into MP3, and makes it available for download.
            </p>
          </div>
        </div>
      </section>

      {/* Bitrate Selection Guide */}
      <section className="space-y-6 rounded-3xl bg-gradient-to-br from-navy-900/90 to-navy-850 border border-brand-violet/30 p-6 sm:p-10">
        <div className="flex items-center gap-3">
          <Headphones className="w-6 h-6 text-brand-cyan" />
          <h2 className="text-xl font-bold text-white">Which Audio Bitrate Should You Choose?</h2>
        </div>

        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <p>
            Bitrate is measured in kilobits per second (kbps). It represents the density of audio information processed each second. Higher bitrates preserve fine details in high frequencies (hi-hats, vocal sibilance) and punchy bass resonance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1.5">
              <span className="text-brand-cyan font-bold font-mono">128 kbps (Standard)</span>
              <p className="text-slate-400">
                Smallest file size. Ideal for speech recordings, interviews, audiobooks, and mobile devices with limited storage.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1.5">
              <span className="text-brand-violet font-bold font-mono">192 kbps (High Quality)</span>
              <p className="text-slate-400">
                The golden balance. Indistinguishable from CD audio for most casual listeners on standard headphones.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-navy-950/80 border border-brand-violet/40 space-y-1.5">
              <span className="text-white font-bold font-mono">320 kbps (Ultra Studio)</span>
              <p className="text-slate-400">
                Maximum MP3 specification. Essential for audiophiles, DJ playback, music production, and high-end sound systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="text-center rounded-3xl bg-gradient-to-r from-brand-violet/20 via-brand-blue/20 to-brand-cyan/20 border border-brand-violet/40 p-8 sm:p-12 space-y-4">
        <h3 className="text-2xl font-extrabold text-white">Ready to extract pristine audio?</h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Start converting your videos right now with zero software installation and zero fees.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-violet to-brand-blue shadow-lg shadow-brand-violet/25 hover:opacity-95 transition-all"
        >
          <span>Open Audivexa Converter</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
