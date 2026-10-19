import React from 'react';
import { ShieldCheck, Lock, Trash2, Globe, Clock, FileText } from 'lucide-react';
import SeoHead from '../components/SeoHead';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <SeoHead
        title="Privacy Policy & Ephemeral Data Guarantee"
        description="Audivexa privacy policy. Learn about our strict 15-minute ephemeral auto-purge policy, GDPR/CCPA compliance, and zero tracking guarantees."
        canonical="https://audivexa.com/privacy"
      />
      
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Zero Retention Guarantee</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">
          Last revised: October 19, 2026 • Effective Worldwide
        </p>
      </div>

      {/* Summary Highlight Box */}
      <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-6 space-y-3">
        <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          <span>Core Privacy Principle: Ephemeral Processing Only</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Audivexa does not require user registration or personal accounts. Uploaded videos are securely stored in temporary RAM/disk buffers during active FFmpeg transcoding and immediately deleted the second processing completes. Generated MP3 audio files are permanently purged within 15 minutes.
        </p>
      </div>

      {/* Policy Sections */}
      <div className="space-y-8 text-xs text-slate-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">1. Information We Do Not Collect</h2>
          <p>
            Unlike conventional online converters, we do not require your email address, legal name, phone number, or billing information to use the free video-to-MP3 converter. We do not build user behavioral profiles or cross-site tracking vectors.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">2. File Handling & Lifecycle</h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>
              <strong>Source Video Files:</strong> When you upload a video (MP4, MOV, WebM, AVI, etc.), it is assigned a random UUID and stored temporarily solely for the purpose of audio extraction. Once converted, the original video is instantly unlinked and destroyed.
            </li>
            <li>
              <strong>Target MP3 Audio Files:</strong> The transcoded MP3 file is retained in an ephemeral output folder for a maximum duration of 15 minutes to allow you to preview and download it. Our automated background cleanup daemon runs continuously every 5 minutes to sweep and purge all files past this threshold.
            </li>
            <li>
              <strong>No File Inspection:</strong> No human or AI training system reviews, parses, or accesses your media. The entire process is automated via local FFmpeg binaries.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">3. YouTube Links & Third-Party Services</h2>
          <p>
            When converting a YouTube video link, our servers communicate directly with public media feeds to extract the requested audio stream. We do not store viewing histories, search queries, or user credentials.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">4. Technical Logs & Security</h2>
          <p>
            To prevent distributed denial-of-service (DDoS) attacks, abuse, and automated scraping, our web server utilizes standard IP rate limiting (<code className="text-slate-200">express-rate-limit</code>) and transient access logs. These server logs record only timestamps, requested HTTP paths, and IP addresses for basic operational safety. Logs are routinely rotated and purged.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">5. Cookies & Advertising</h2>
          <p>
            We do not use invasive third-party tracking cookies. Compliant advertising networks (such as Google AdSense) may utilize non-personalized cookies to deliver compliant advertisements without interfering with your conversion tools. You may configure your browser to decline cookies at any time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">6. Your Worldwide Rights (GDPR & CCPA)</h2>
          <p>
            Under European Union General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), users possess the right to access, rectify, and delete personal data. Because we do not store personal data or identify users, your media is permanently wiped automatically without requiring manual deletion requests.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-800">
          <h2 className="text-base font-bold text-white">7. Contact Data Controller</h2>
          <p>
            If you have any questions regarding this Privacy Policy or our ephemeral infrastructure, please contact us at <span className="text-brand-cyan">privacy@audivexa.com</span> or via our contact page.
          </p>
        </section>

      </div>

    </div>
  );
}
