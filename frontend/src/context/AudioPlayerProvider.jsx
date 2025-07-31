import React, { useEffect, useRef, useState, useCallback } from 'react';
import AudioPlayerContext from './AudioPlayerContext';

export const AudioPlayerProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  
  useEffect(() => {
    fetch('/api/songs')
      .then(res => res.json())
      .then(data => setSongs(data))
      .catch(err => console.error('Error loading songs:', err));
  }, []);

  
  const handleNext = useCallback(() => {
    if (songs.length === 0) return;
    setCurrentIndex(prev => (prev + 1) % songs.length);
  }, [songs]);

  const handlePrev = useCallback(() => {
    if (songs.length === 0) return;
    setCurrentIndex(prev => (prev - 1 + songs.length) % songs.length);
  }, [songs]);

  
  useEffect(() => {
    if (songs.length === 0 || currentIndex === null) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const currentSong = songs[currentIndex];
    const audioUrl = currentSong.url;

    console.log("Attempting to play:", audioUrl);

    const newAudio = new Audio(audioUrl);
    audioRef.current = newAudio;

    const tryPlay = () => {
      newAudio.play().catch(err => {
        console.warn("Autoplay blocked or audio unsupported:", err);
      });
    };

    if (isPlaying) tryPlay();

    newAudio.addEventListener('ended', handleNext);

    return () => {
      newAudio.pause();
      newAudio.removeEventListener('ended', handleNext);
    };
  }, [currentIndex, isPlaying, songs, handleNext]);

  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(err => {
        console.warn(" Audio play failed:", err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  
  const play = (index = currentIndex ?? 0) => {
    if (index === currentIndex) {
      setIsPlaying(true);
    } else {
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  };

  const pause = () => setIsPlaying(false);

  return (
    <AudioPlayerContext.Provider
      value={{
        songs,
        currentSong: currentIndex !== null ? songs[currentIndex] : null,
        currentIndex,
        play,
        pause,
        next: handleNext,
        previous: handlePrev,
        isPlaying,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
