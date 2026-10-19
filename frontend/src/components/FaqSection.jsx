import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    q: 'What is the difference between 128, 192, and 320 kbps bitrate?',
    a: 'Bitrate determines the amount of audio data processed per second. 128 kbps is standard quality suitable for podcasts and speech with compact file sizes. 192 kbps offers high clarity for everyday listening. 320 kbps is the maximum possible bitrate for MP3 files, preserving ultra-crisp highs, punchy bass, and full acoustic fidelity equivalent to CD studio sound.',
  },
  {
    q: 'How safe is Audivexa? Do you store my video files?',
    a: 'Audivexa is strictly privacy-first. Uploaded files are immediately deleted from disk as soon as your MP3 is rendered. Converted MP3 downloads are purged completely after 15 minutes. We never index, inspect, share, or monetize your video files.',
  },
  {
    q: 'What is the maximum allowed video file size?',
    a: 'The free converter allows video uploads up to 250 MB per file, which comfortably accommodates HD videos, webinar recordings, and full concert clips. For videos exceeding 250MB, check out Audivexa Pro.',
  },
  {
    q: 'Can I convert YouTube video links to MP3?',
    a: 'Yes! Simply switch to the "YouTube URL" tab, paste any valid YouTube video link, select your desired audio quality, and click convert. The audio track is streamed and transcoded into 320kbps MP3.',
  },
  {
    q: 'What happens if my video does not have an audio track?',
    a: 'Our FFmpeg engine automatically probes stream headers before processing. If no audio stream is detected, our system will notify you with a clear message so no processing time or bandwidth is wasted.',
  },
  {
    q: 'Does Audivexa work on iOS (iPhone), iPad, and Android?',
    a: 'Yes, Audivexa is 100% web-based and fully responsive. You can upload videos directly from your iPhone camera roll or Android files and download the MP3 directly into your device Files app.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="py-20 border-t border-slate-800/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-violet">
            Clear Answers
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </p>
          <p className="text-sm text-slate-400">
            Everything you need to know about video and YouTube to MP3 conversion.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800/80 bg-navy-900/40 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 text-sm font-bold text-slate-100 hover:text-white transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-brand-violet shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-cyan' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/40 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* More Questions Callout */}
        <div className="text-center pt-10 text-xs text-slate-400">
          Have more questions? Visit our{' '}
          <Link to="/faq" className="text-brand-cyan hover:underline font-semibold">
            comprehensive FAQ page
          </Link>{' '}
          or{' '}
          <Link to="/contact" className="text-brand-violet hover:underline font-semibold">
            contact our support team
          </Link>
          .
        </div>

      </div>
    </section>
  );
}
