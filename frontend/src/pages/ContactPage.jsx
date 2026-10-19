import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Clock, Globe, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Support',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <SeoHead
        title="Contact & Technical Support"
        description="Contact the Audivexa team for technical support, feature requests, bug reports, and partnership inquiries."
        canonical="https://audivexa.com/contact"
      />
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 text-xs font-bold text-brand-cyan uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          <span>Support & Enquiries</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Contact Our Team
        </h1>
        <p className="text-sm text-slate-300">
          Have feedback, need assistance with a conversion, or interested in enterprise partnerships? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Contact Info Sidebar */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-navy-900/60 border border-slate-800 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Direct Channels</h3>
            
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Email Support</span>
                  <a href="mailto:support@audivexa.com" className="text-white hover:text-brand-cyan transition-colors">
                    support@audivexa.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Response Window</span>
                  <span>Within 24 business hours</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Global Operations</span>
                  <span>Worldwide Edge Nodes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-navy-900/40 border border-slate-800/80 p-5 space-y-2 text-xs">
            <h4 className="font-bold text-white">Looking for quick answers?</h4>
            <p className="text-slate-400 leading-relaxed">
              Check our extensive FAQ guide for answers on bitrates, formats, and YouTube guidelines.
            </p>
            <Link to="/faq" className="inline-block text-brand-cyan hover:underline font-semibold pt-1">
              Read FAQs →
            </Link>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 rounded-3xl bg-navy-900/70 border border-slate-800 p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-in fade-in">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Thank you for reaching out!</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Your message has been received by our support team. We will review your inquiry and follow up at <strong>{formData.email}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', topic: 'Support', message: '' });
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-700/80 focus:border-brand-violet text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-700/80 focus:border-brand-violet text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Subject Topic</label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-700/80 focus:border-brand-violet text-xs text-white focus:outline-none"
                >
                  <option value="Support">Conversion Technical Support</option>
                  <option value="Feature Request">Feature Request or Format Support</option>
                  <option value="Bug Report">Bug or Transcoding Error Report</option>
                  <option value="Partnership">Commercial & API Partnership</option>
                  <option value="DMCA">DMCA & Copyright Inquiry</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Your Message *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your question or issue in detail..."
                  className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-700/80 focus:border-brand-violet text-xs text-white focus:outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-violet to-brand-blue hover:opacity-95 shadow-lg shadow-brand-violet/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
