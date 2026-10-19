import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Music, Menu, X, Sparkles, FileAudio, HelpCircle, BookOpen, Layers } from 'lucide-react';

export default function Navbar({ onOpenPro }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Converter', path: '/' },
    { name: 'How It Works', path: '/how-to-use' },
    { name: 'Supported Formats', path: '/supported-formats' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-navy-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue via-brand-violet to-brand-cyan p-0.5 shadow-lg shadow-brand-violet/20 group-hover:shadow-brand-violet/40 transition-all duration-300">
            <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
              <div className="flex items-end gap-0.5 h-5">
                <span className="w-1 bg-brand-cyan rounded-full h-3 group-hover:h-4 transition-all"></span>
                <span className="w-1 bg-brand-violet rounded-full h-5"></span>
                <span className="w-1 bg-brand-blue rounded-full h-2 group-hover:h-3 transition-all"></span>
                <span className="w-1 bg-brand-cyan rounded-full h-4"></span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Audivexa
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-violet/20 text-brand-violet border border-brand-violet/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase -mt-0.5">
              Video & YouTube to MP3
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-navy-900/60 p-1.5 rounded-full border border-slate-800/60">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                isActive(link.path)
                  ? 'bg-gradient-to-r from-brand-blue/20 to-brand-violet/20 text-white border border-brand-violet/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Action */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenPro}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-violet to-brand-blue hover:from-brand-violet/90 hover:to-brand-blue/90 shadow-md shadow-brand-violet/25 hover:shadow-brand-violet/40 transition-all duration-200 border border-white/10 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Audivexa Pro</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-navy-900/95 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive(link.path)
                  ? 'bg-brand-violet/20 text-white border border-brand-violet/30'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPro();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-violet to-brand-blue shadow-lg shadow-brand-violet/20 border border-white/10"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Explore Audivexa Pro</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
