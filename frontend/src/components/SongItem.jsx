
import React from 'react';
import usePlayer from '../hooks/usePlayer';

export default function SongItem({ song, index }) {
  const { currentSong, play, pause, isPlaying } = usePlayer();

  const handleClick = () => {
    if (currentSong?.file === song.file && isPlaying) {
      pause();
    } else {
      play(index);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition"
    >
      <p className="text-white font-semibold">{song.title}</p>
    </div>
  );
}
