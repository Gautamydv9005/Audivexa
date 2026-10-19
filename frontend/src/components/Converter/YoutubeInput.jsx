import React, { useState } from 'react';
import { Link as LinkIcon, Search, AlertCircle, ArrowRight, Clock, User, Loader2, Sparkles } from 'lucide-react';
import YoutubeIcon from '../icons/YoutubeIcon';
import { inspectYouTubeUrl } from '../../services/api';

export default function YoutubeInput({ onStartConvert, disabled = false }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        inspectUrl(text);
      }
    } catch (e) {
      // clipboard access denied, ignore
    }
  };

  const inspectUrl = async (inputUrl) => {
    const targetUrl = (inputUrl || url).trim();
    if (!targetUrl) return;

    if (!targetUrl.includes('youtube.com') && !targetUrl.includes('youtu.be')) {
      setError('Please enter a valid YouTube link (e.g. https://www.youtube.com/watch?v=...)');
      setPreview(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await inspectYouTubeUrl(targetUrl);
      setPreview(data);
    } catch (err) {
      setError(err.message || 'Could not fetch video details. Please verify the URL.');
      setPreview(null);
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = () => {
    if (!url.trim()) {
      setError('Please enter a YouTube video URL first.');
      return;
    }
    onStartConvert(url.trim());
  };

  return (
    <div className="w-full space-y-4">
      {/* Input row */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <YoutubeIcon className="w-4 h-4 text-rose-500" />
            <span>Enter YouTube Video URL</span>
          </span>
          <span className="text-[11px] text-slate-400 font-normal">Supports standard, Shorts & music videos</span>
        </label>

        <div className="relative flex items-center">
          <div className="absolute left-3.5 text-slate-500 pointer-events-none">
            <LinkIcon className="w-4 h-4" />
          </div>

          <input
            type="url"
            disabled={disabled || loading}
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                inspectUrl();
              }
            }}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full pl-10 pr-24 py-3.5 rounded-xl bg-navy-900/80 border border-slate-700/80 focus:border-brand-violet focus:ring-1 focus:ring-brand-violet text-sm text-white placeholder-slate-500 transition-all focus:outline-none"
          />

          <div className="absolute right-2 flex items-center gap-1.5">
            {!url ? (
              <button
                type="button"
                onClick={handlePaste}
                disabled={disabled}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:text-white hover:bg-slate-700 transition-colors"
              >
                Paste
              </button>
            ) : (
              <button
                type="button"
                onClick={() => inspectUrl()}
                disabled={disabled || loading}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-brand-violet hover:bg-brand-violet/90 transition-colors flex items-center gap-1"
              >
                {loading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    <span>Fetch</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span className="flex-1">{error}</span>
        </div>
      )}

      {/* Video Preview Card if loaded */}
      {preview && (
        <div className="rounded-2xl border border-brand-violet/40 bg-gradient-to-br from-navy-900/90 to-navy-850 p-4 sm:p-5 shadow-xl shadow-brand-violet/10 space-y-4 animate-in fade-in slide-in-from-top-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {preview.thumbnail ? (
              <div className="relative w-full sm:w-36 h-24 rounded-xl overflow-hidden bg-navy-950 shrink-0 border border-slate-800">
                <img
                  src={preview.thumbnail}
                  alt={preview.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{preview.durationFormatted}</span>
                </div>
              </div>
            ) : null}

            <div className="flex-1 min-w-0 space-y-1">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-400 text-[10px] font-semibold border border-rose-500/25">
                <YoutubeIcon className="w-3 h-3" />
                <span>YouTube Media</span>
              </div>
              <h4 className="text-sm font-bold text-white line-clamp-2" title={preview.title}>
                {preview.title}
              </h4>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <User className="w-3 h-3 text-slate-500" />
                <span>{preview.author}</span>
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              disabled={disabled}
              onClick={handleConvert}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-rose-500 via-brand-violet to-brand-blue hover:opacity-95 shadow-lg shadow-brand-violet/20 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <span>Convert to High-Fidelity MP3</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Direct Convert without inspection if user presses enter */}
      {!preview && url && !loading && (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            disabled={disabled}
            onClick={handleConvert}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-violet to-brand-blue hover:opacity-95 shadow-lg shadow-brand-violet/25 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <span>Proceed to MP3 Conversion</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
