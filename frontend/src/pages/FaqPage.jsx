import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, ShieldCheck, Headphones, Zap } from 'lucide-react';
import YoutubeIcon from '../components/icons/YoutubeIcon';
import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';

const CATEGORIZED_FAQS = [
  {
    category: 'General & Capabilities',
    icon: Zap,
    items: [
      {
        q: 'Is Audivexa completely free to use?',
        a: 'Yes! Audivexa is 100% free with no hidden fees, subscriptions, or credit card requirements. You can convert video files and YouTube links as often as you need within our generous free rate limits.',
      },
      {
        q: 'Do I need to install any software or browser extensions?',
        a: 'No. All conversion and transcoding happens server-side using high-performance FFmpeg servers. You only need a modern web browser on desktop, tablet, or mobile.',
      },
      {
        q: 'What is the maximum file size I can upload for free?',
        a: 'You can upload video files up to 250 MB each on the standard tier. This easily covers short films, musical performances, presentations, and phone video clips.',
      },
    ],
  },
  {
    category: 'Audio Fidelity & Bitrates',
    icon: Headphones,
    items: [
      {
        q: 'Does converting to 320 kbps improve low-quality video audio?',
        a: 'Converting to 320 kbps ensures that zero additional compression or acoustic degradation is introduced by our transcoder. However, the resulting quality cannot exceed the original audio stream embedded in the source video.',
      },
      {
        q: 'Why should I pick 192 kbps instead of 320 kbps?',
        a: '192 kbps delivers approximately 40% smaller file size than 320 kbps while sounding virtually identical on standard car speakers, earbuds, and smartphones. It is great if you have limited mobile storage.',
      },
      {
        q: 'What audio channels and sample rates are preserved?',
        a: 'Our converter outputs standard 44.1 kHz stereo audio (2-channel) using the industry-proven libmp3lame encoder for maximum compatibility with any player, vehicle stereo, or media library.',
      },
    ],
  },
  {
    category: 'YouTube Link Conversions',
    icon: YoutubeIcon,
    items: [
      {
        q: 'Can I convert any YouTube video?',
        a: 'You can convert any public on-demand YouTube video up to 2 hours in duration. Live streams and private videos requiring user credentials cannot be converted.',
      },
      {
        q: 'Why did my YouTube link fail to convert?',
        a: 'YouTube link conversions can fail if the video is restricted by age, geo-blocked in certain regions, is a live broadcast, or exceeds the maximum duration limit of 2 hours.',
      },
    ],
  },
  {
    category: 'Privacy & Security',
    icon: ShieldCheck,
    items: [
      {
        q: 'How long do you retain my uploaded video files?',
        a: 'Your uploaded source video is deleted immediately the second conversion finishes. The converted MP3 file is kept in our secure temporary storage for exactly 15 minutes to allow you to preview and download it, after which it is permanently purged by our automated cleanup cron.',
      },
      {
        q: 'Can anyone else access my converted files?',
        a: 'No. Every job and converted file is assigned a cryptographically random UUID v4 identifier. Only someone with your exact private job identifier can download your file during the 15-minute retention window.',
      },
    ],
  },
];

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState({ 'General & Capabilities-0': true });

  const toggleItem = (key) => {
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredCategories = CATEGORIZED_FAQS.map(cat => ({
    ...cat,
    items: cat.items.filter(
      item =>
        item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.a.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <SeoHead
        title="Frequently Asked Questions (FAQ)"
        description="Comprehensive FAQ for Audivexa video to MP3 converter. Answers regarding bitrates, security, file size limits, YouTube links, and privacy."
        canonical="https://audivexa.com/faq"
      />
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/20 border border-brand-violet/30 text-xs font-bold text-brand-violet uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Find answers regarding video conversion, bitrates, security, and supported devices.
        </p>

        {/* Search Bar */}
        <div className="relative pt-4 max-w-md mx-auto">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-7 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions (e.g. 320 kbps, YouTube, limits)..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-navy-900 border border-slate-700/80 focus:border-brand-violet focus:ring-1 focus:ring-brand-violet text-xs text-white placeholder-slate-500 focus:outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Categories & Questions */}
      <div className="space-y-10">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            No questions matching "{searchTerm}". Try a different keyword or check our contact page.
          </div>
        ) : (
          filteredCategories.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <div key={cat.category} className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
                  <CatIcon className="w-4 h-4 text-brand-cyan" />
                  <h2 className="text-base font-bold text-white tracking-wide">
                    {cat.category}
                  </h2>
                </div>

                <div className="space-y-3">
                  {cat.items.map((item, idx) => {
                    const key = `${cat.category}-${idx}`;
                    const isOpen = !!openItems[key];
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-800/80 bg-navy-900/40 overflow-hidden transition-all duration-200"
                      >
                        <button
                          type="button"
                          onClick={() => toggleItem(key)}
                          className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-slate-100 hover:text-white transition-colors cursor-pointer"
                        >
                          <span className="flex-1">{item.q}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-brand-violet shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-brand-cyan' : ''
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-6 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/40 animate-in fade-in duration-200">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
