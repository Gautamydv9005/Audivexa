import React from 'react';
import { FileText, ShieldAlert, Scale, CheckCircle } from 'lucide-react';
import SeoHead from '../components/SeoHead';

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <SeoHead
        title="Terms of Service & DMCA Guidelines"
        description="Audivexa user agreement, terms of service, acceptable use, copyright and DMCA compliance guidelines."
        canonical="https://audivexa.com/terms"
      />
      
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-xs font-bold text-brand-blue uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400">
          Last revised: October 19, 2026 • Effective Worldwide
        </p>
      </div>

      {/* Terms Content */}
      <div className="space-y-8 text-xs text-slate-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Audivexa (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to all provisions herein, please refrain from using our converter services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">2. Acceptable Use & Intellectual Property</h2>
          <p>
            Audivexa is provided strictly as a technical utility tool designed to convert personal media files and authorized public streams. By uploading content or converting video URLs, you represent and warrant that:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
            <li>You own the copyright to the content, or have obtained explicit permission or licensing from the rightful rights holder.</li>
            <li>Your use constitutes authorized fair use, educational use, or non-infringing personal backup.</li>
            <li>You will not use the service to process defamatory, unlawful, malicious, or exploitative media.</li>
            <li>You will not attempt to disrupt or overwhelm our infrastructure using automated bots or excessive requests.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">3. DMCA & Copyright Infringement Notices</h2>
          <p>
            We strictly respect the intellectual property rights of creators and copyright owners worldwide. Because Audivexa operates in an ephemeral model where all uploaded and converted files are automatically destroyed within 15 minutes, our servers do not host permanent public media repositories. However, if you are a copyright owner and wish to submit inquiries or notices, please contact us at <span className="text-brand-cyan">dmca@audivexa.com</span>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">4. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. While we strive for 99.9% uptime and accurate transcoding fidelity, Audivexa does not warrant that conversions will be uninterrupted, error-free, or compatible with corrupt source files.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">5. Limitation of Liability</h2>
          <p>
            In no event shall Audivexa, its maintainers, or hosting affiliates be held liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to access the service or loss of temporary data.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-800">
          <h2 className="text-base font-bold text-white">6. Modifications to Terms</h2>
          <p>
            We reserve the right to revise these Terms of Service at any time. Continued use of the platform after updates indicates your acknowledgment and acceptance of the revised conditions.
          </p>
        </section>

      </div>

    </div>
  );
}
