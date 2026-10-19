import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

export default function AudioWaveformPlayer({ audioUrl, title }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Synchronize audio element state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(err => {
        console.warn('Audio play prevented:', err);
      });
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      audioRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Static bars representing audio waveform shape
  const waveBarsHeights = [
    30, 45, 70, 90, 60, 40, 85, 95, 60, 45, 75, 100, 80, 55, 35, 65, 85, 50, 40, 70,
    90, 60, 75, 100, 85, 45, 60, 80, 50, 30, 70, 95, 65, 40, 80, 90, 50, 35, 60, 80
  ];

  const currentPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full rounded-xl bg-navy-950/90 border border-slate-800 p-4 space-y-3">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Top control bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-violet to-brand-blue hover:from-brand-violet/90 hover:to-brand-blue/90 text-white flex items-center justify-center shadow-md shadow-brand-violet/30 active:scale-95 transition-all cursor-pointer"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white ml-0.5" />
            )}
          </button>

          <div>
            <p className="text-xs font-bold text-slate-200">Audio Preview</p>
            <p className="text-[11px] font-mono text-slate-400">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
            aria-label="Volume slider"
            aria-valuemin="0"
            aria-valuemax="1"
            aria-valuenow={isMuted ? 0 : volume}
          />
        </div>
      </div>

      {/* Waveform Scrubber Visualizer */}
      <div className="space-y-1.5">
        <div className="relative h-12 flex items-center justify-between gap-0.5 px-1 py-1 rounded-lg bg-navy-900/50">
          {waveBarsHeights.map((heightPercent, idx) => {
            const barPercent = (idx / waveBarsHeights.length) * 100;
            const isPlayed = barPercent <= currentPercent;
            return (
              <div
                key={idx}
                className="flex-1 flex items-center justify-center h-full"
              >
                <div
                  className={`w-full max-w-[4px] rounded-full transition-all duration-150 ${
                    isPlayed
                      ? 'bg-gradient-to-t from-brand-blue to-brand-cyan'
                      : 'bg-slate-700/60'
                  } ${isPlaying && isPlayed ? 'opacity-100' : 'opacity-80'}`}
                  style={{ height: `${heightPercent}%` }}
                ></div>
              </div>
            );
          })}

          {/* Invisible Range Slider on top for interactive scrubbing */}
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Seek audio"
            aria-valuemin="0"
            aria-valuemax={duration || 100}
            aria-valuenow={currentTime}
            aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
          />
        </div>

        {/* Small Progress Line */}
        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-cyan transition-all duration-100"
            style={{ width: `${currentPercent}%` }}
          ></div>
        </div>
      </div>

    </div>
  );
}
