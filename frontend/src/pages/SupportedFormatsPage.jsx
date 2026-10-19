import React from 'react';
import { Link } from 'react-router-dom';
import { Film, CheckCircle2, ArrowRight, Cpu, Layers, Disc } from 'lucide-react';
import SeoHead from '../components/SeoHead';

const DETAILED_FORMATS = [
  {
    ext: '.mp4',
    name: 'MPEG-4 Part 14 Container',
    videoCodecs: 'H.264 (AVC), H.265 (HEVC), AV1',
    audioCodecs: 'AAC, AC3, MP3, Opus',
    suitability: 'Universal (Smartphones, YouTube, Cameras, TikTok, Instagram)',
    maxQuality: '320 kbps MP3',
  },
  {
    ext: '.mov',
    name: 'Apple QuickTime Movie',
    videoCodecs: 'Apple ProRes, H.264, HEVC',
    audioCodecs: 'AAC, Apple Lossless (ALAC), Linear PCM',
    suitability: 'iOS recordings, Final Cut Pro, macOS screen recordings',
    maxQuality: '320 kbps MP3',
  },
  {
    ext: '.webm',
    name: 'Google Open Web Media',
    videoCodecs: 'VP8, VP9, AV1',
    audioCodecs: 'Opus, Vorbis',
    suitability: 'HTML5 web video, browser recordings, Discord clips',
    maxQuality: '320 kbps MP3',
  },
  {
    ext: '.mkv',
    name: 'Matroska Multimedia Container',
    videoCodecs: 'H.264, H.265, VP9, AV1',
    audioCodecs: 'FLAC, DTS-HD, AC3, TrueHD, MP3, AAC',
    suitability: 'HD movies, multi-language anime, high-end rips',
    maxQuality: '320 kbps MP3',
  },
  {
    ext: '.avi',
    name: 'Audio Video Interleaved',
    videoCodecs: 'DivX, XviD, MPEG-4',
    audioCodecs: 'MP3, PCM, AC3',
    suitability: 'Legacy Windows camcorders, DVD rips, vintage archives',
    maxQuality: '320 kbps MP3',
  },
  {
    ext: '.wmv',
    name: 'Windows Media Video',
    videoCodecs: 'WMV7, WMV8, WMV9, VC-1',
    audioCodecs: 'WMA, WMA Pro, WMA Lossless',
    suitability: 'Windows Movie Maker, PowerPoint video embeds',
    maxQuality: '320 kbps MP3',
  },
  {
    ext: '.flv',
    name: 'Flash Video Container',
    videoCodecs: 'Sorenson Spark, VP6, H.264',
    audioCodecs: 'MP3, AAC, Nellymoser',
    suitability: 'Legacy Flash video clips and classic web archives',
    maxQuality: '320 kbps MP3',
  },
  {
    ext: '.m4v / .ts',
    name: 'MPEG Transport Stream & iTunes Video',
    videoCodecs: 'MPEG-2, H.264',
    audioCodecs: 'AAC, AC3',
    suitability: 'Broadcast television recordings, digital camcorders',
    maxQuality: '320 kbps MP3',
  },
];

export default function SupportedFormatsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <SeoHead
        title="Supported Video Formats & Audio Codecs"
        description="Comprehensive matrix of supported video containers including MP4, MOV, WebM, AVI, MKV, FLV, WMV, and YouTube streams with 320kbps MP3 audio output specifications."
        canonical="https://audivexa.com/supported-formats"
      />
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 text-xs font-bold text-brand-cyan uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>Format Encyclopedia</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Supported Video Formats & Codecs
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Audivexa utilizes native FFmpeg demuxers to convert almost any video wrapper or compressed audio stream into broadcast-grade MP3.
        </p>
      </div>

      {/* Formats Table Container */}
      <div className="rounded-3xl bg-navy-900/60 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white">Full Container Matrix</h2>
            <p className="text-xs text-slate-400">All formats processed securely on ephemeral edge servers</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
            All Formats Free
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Container</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Supported Audio Stream</th>
                <th className="py-3 px-4">Max Output</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {DETAILED_FORMATS.map((fmt) => (
                <tr key={fmt.ext} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-brand-cyan">
                    {fmt.ext}
                  </td>
                  <td className="py-4 px-4 font-medium text-white">
                    {fmt.name}
                  </td>
                  <td className="py-4 px-4 font-mono text-slate-400">
                    {fmt.audioCodecs}
                  </td>
                  <td className="py-4 px-4 font-mono text-slate-300">
                    {fmt.maxQuality}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Ready</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Output Audio Specification */}
      <section className="rounded-3xl bg-gradient-to-br from-navy-900/90 to-navy-850 border border-brand-violet/30 p-6 sm:p-10 space-y-6">
        <div className="flex items-center gap-3">
          <Disc className="w-6 h-6 text-brand-violet" />
          <h2 className="text-xl font-bold text-white">Output MP3 Technical Specifications</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">Encoder Library</span>
            <p className="text-sm font-bold text-white font-mono">libmp3lame v3.100+</p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">Sampling Rate</span>
            <p className="text-sm font-bold text-white font-mono">44,100 Hz (Standard CD)</p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">Channel Layout</span>
            <p className="text-sm font-bold text-white font-mono">2 Channels (Stereo)</p>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Every audio extraction process applies a clean, psychoacoustic frequency model via FFmpeg’s high-precision LAME encoder, ensuring no harmonic distortion or unwanted high-shelf cutoffs.
        </p>
      </section>

      {/* CTA */}
      <div className="text-center rounded-3xl bg-navy-900/60 border border-slate-800 p-8 sm:p-12 space-y-4">
        <h3 className="text-2xl font-extrabold text-white">Have a file ready to convert?</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Drop your video file into Audivexa and get your MP3 in seconds.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-violet to-brand-blue shadow-lg shadow-brand-violet/25 hover:opacity-95 transition-all"
        >
          <span>Start Converting Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
