import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, Heart, Globe, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-navy-950/90 text-slate-400 text-sm mt-24">
      {/* Privacy & Ephemeral Security Notice Banner */}
      <div className="border-b border-slate-800/60 bg-navy-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-white font-semibold">100% Privacy & Ephemeral Security:</strong> All uploaded videos and converted MP3s are strictly purged automatically within 15 minutes. No tracking, no data storage.
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Dedicated FFmpeg Transcoding Engine</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-violet p-0.5 shadow-md shadow-brand-violet/20">
                <div className="w-full h-full bg-navy-900 rounded-[6px] flex items-center justify-center">
                  <div className="flex items-end gap-0.5 h-4">
                    <span className="w-0.5 bg-brand-cyan rounded-full h-2"></span>
                    <span className="w-0.5 bg-brand-violet rounded-full h-4"></span>
                    <span className="w-0.5 bg-brand-blue rounded-full h-2.5"></span>
                  </div>
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Audivexa</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Global high-fidelity video and YouTube to MP3 converter. Engineered for pristine audio fidelity, studio bitrates (up to 320kbps), and uncompromising speed.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Globe className="w-3.5 h-3.5 text-brand-violet" />
              <span>Worldwide CDN & Ephemeral Edge Processing</span>
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Conversion Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  MP4 to MP3 Converter
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  YouTube to MP3 (320kbps)
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  WebM & MOV Audio Extractor
                </Link>
              </li>
              <li>
                <Link to="/supported-formats" className="hover:text-white transition-colors">
                  All Supported Formats
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Resources & Help
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/how-to-use" className="hover:text-white transition-colors">
                  How to Convert Videos
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/supported-formats" className="hover:text-white transition-colors">
                  Audio Quality & Bitrate Guide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Support & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Legal & Compliance
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy (GDPR / CCPA)
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Copyright & DMCA Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Report Abuse / Issue
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Audivexa. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span>Built for audio enthusiasts worldwide</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
