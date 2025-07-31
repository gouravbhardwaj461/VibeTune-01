import React from 'react';
import { useAudioPlayer } from '../hooks/usePlayer';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const formatTime = (time) => {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const PlayerBar = () => {
  const {
    currentSong,
    isPlaying,
    play,
    pause,
    next,
    previous,
    currentTime,
    duration,
    seekTo,
    
  } = useAudioPlayer();

  const handleSeek = (e) => {
    const progress = parseFloat(e.target.value);
    seekTo(progress);
  };

  const togglePlay = () => {
    if (isPlaying) pause();
    else play();
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex flex-col items-center shadow-lg z-50">
      <div className="text-center text-sm font-semibold mb-2">
        {currentSong.name}
      </div>

      <div className="flex items-center gap-4 mb-2">
        <button onClick={previous}>
          <SkipBack className="w-5 h-5" />
        </button>
        <button
          onClick={togglePlay}
          className="bg-white text-black p-2 rounded-full"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button onClick={next}>
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      <div className="w-full flex items-center gap-2 text-xs">
        <span className="w-12 text-right">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="w-full"
        />
        <span className="w-12 text-left">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default PlayerBar;
