import React, { useState, useEffect, useRef } from 'react';
import { Upload, AlertCircle, RotateCcw, ShieldCheck, Sparkles, FileAudio } from 'lucide-react';
import YoutubeIcon from '../icons/YoutubeIcon';
import Dropzone from './Dropzone';
import YoutubeInput from './YoutubeInput';
import QualitySelector from './QualitySelector';
import ConversionProgress from './ConversionProgress';
import ResultCard from './ResultCard';
import {
  uploadVideo,
  convertYouTube,
  getJobStatus,
  getDownloadUrl,
  getStreamUrl,
} from '../../services/api';

export default function ConverterCard() {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'youtube'
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedBitrate, setSelectedBitrate] = useState('320k');

  // Conversion Lifecycle
  const [status, setStatus] = useState('idle'); // 'idle' | 'uploading' | 'converting' | 'completed' | 'error'
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('uploading');
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  const pollIntervalRef = useRef(null);

  // Stop polling on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, []);

  // Poll job status until complete or failed
  const startPolling = (jobId) => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

    pollIntervalRef.current = setInterval(async () => {
      try {
        const latestJob = await getJobStatus(jobId);
        setJob(latestJob);

        if (latestJob.status === 'processing') {
          setStatus('converting');
          setStage('converting');
          setProgress(latestJob.progress || 50);
        } else if (latestJob.status === 'completed') {
          clearInterval(pollIntervalRef.current);
          setProgress(100);
          setStatus('completed');
        } else if (latestJob.status === 'failed') {
          clearInterval(pollIntervalRef.current);
          setStatus('error');
          setError(latestJob.error || 'Conversion failed during audio transcoding.');
        }
      } catch (err) {
        clearInterval(pollIntervalRef.current);
        setStatus('error');
        setError(err.message || 'Failed to poll conversion status.');
      }
    }, 750);
  };

  // Handle local video file conversion
  const handleStartFileConvert = async () => {
    if (!selectedFile) return;

    setStatus('uploading');
    setStage('uploading');
    setProgress(0);
    setError(null);

    try {
      const res = await uploadVideo({
        file: selectedFile,
        bitrate: selectedBitrate,
        onUploadProgress: (pct) => {
          setProgress(pct);
          if (pct >= 100) {
            setStage('converting');
            setProgress(5);
          }
        },
      });

      startPolling(res.jobId);
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Video upload failed. Please try again.');
    }
  };

  // Handle YouTube conversion
  const handleStartYouTubeConvert = async (url) => {
    setStatus('converting');
    setStage('fetching');
    setProgress(20);
    setError(null);

    try {
      const res = await convertYouTube({
        url,
        bitrate: selectedBitrate,
      });

      startPolling(res.jobId);
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Failed to initiate YouTube conversion.');
    }
  };

  // Reset to initial state
  const handleReset = () => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    setStatus('idle');
    setProgress(0);
    setSelectedFile(null);
    setJob(null);
    setError(null);
  };

  const isConverting = status === 'uploading' || status === 'converting';

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative rounded-3xl p-1 bg-gradient-to-b from-slate-700/40 via-slate-800/20 to-slate-900/60 shadow-2xl backdrop-blur-2xl">
        <div className="rounded-[22px] bg-navy-900/95 p-5 sm:p-8 lg:p-10 space-y-6 border border-slate-800/80">
          
          {/* Top Switcher Tabs (Only visible when idle) */}
          {status === 'idle' && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-navy-950 border border-slate-800/90 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('upload');
                    setError(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeTab === 'upload'
                      ? 'bg-gradient-to-r from-brand-violet to-brand-blue text-white shadow-md shadow-brand-violet/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Video File</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('youtube');
                    setError(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeTab === 'youtube'
                      ? 'bg-gradient-to-r from-rose-500 to-brand-violet text-white shadow-md shadow-rose-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <YoutubeIcon className="w-4 h-4" />
                  <span>YouTube URL</span>
                </button>
              </div>

              {/* Security Hint */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero File Retention • 250MB Limit</span>
              </div>
            </div>
          )}

          {/* Error Message Alert */}
          {status === 'error' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 space-y-3 animate-in fade-in">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Conversion Encountered an Issue</h4>
                  <p className="text-xs text-rose-300 leading-relaxed">{error}</p>
                </div>
              </div>

              <div className="pt-1 flex flex-wrap items-center justify-end gap-2">
                {(error?.includes('bot verification') || error?.includes('Video Upload') || error?.includes('cloud servers')) && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('upload');
                      handleReset();
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-violet to-brand-blue hover:opacity-95 flex items-center gap-2 shadow-md shadow-brand-violet/20 transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Switch to Video Upload (100% Reliable)</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          )}

          {/* ACTIVE STATE: Idle Input Zone */}
          {status === 'idle' && (
            <div className="space-y-6 animate-in fade-in">
              {activeTab === 'upload' ? (
                <Dropzone
                  file={selectedFile}
                  onFileSelect={setSelectedFile}
                  onClearFile={() => setSelectedFile(null)}
                  onStartConvert={handleStartFileConvert}
                  maxSizeMB={250}
                  disabled={isConverting}
                />
              ) : (
                <YoutubeInput
                  onStartConvert={handleStartYouTubeConvert}
                  disabled={isConverting}
                />
              )}

              {/* Quality Selector */}
              <QualitySelector
                selectedBitrate={selectedBitrate}
                onChange={setSelectedBitrate}
                disabled={isConverting}
              />
            </div>
          )}

          {/* ACTIVE STATE: Progress Indicator */}
          {isConverting && (
            <ConversionProgress
              stage={stage}
              progress={progress}
              title={selectedFile?.name || job?.displayName || 'Media Stream'}
              bitrate={selectedBitrate}
              fileSize={job?.fileSizeFormatted}
              onCancel={handleReset}
            />
          )}

          {/* ACTIVE STATE: Completed Result Card */}
          {status === 'completed' && job && (
            <ResultCard
              job={job}
              downloadUrl={getDownloadUrl(job.id)}
              streamUrl={getStreamUrl(job.id)}
              onReset={handleReset}
            />
          )}

        </div>
      </div>
    </div>
  );
}
