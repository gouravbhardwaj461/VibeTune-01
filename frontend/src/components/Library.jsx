import React, { useContext } from 'react';
import AudioPlayerContext from "../context/AudioPlayerContext";
import { Play } from 'lucide-react';

const Library = () => {
  const { songs, play, currentIndex, isPlaying } = useContext(AudioPlayerContext);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Library</h1>

      {songs.length === 0 ? (
        <p className="text-gray-400">No songs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {songs.map((song, index) => (
            <div
              key={song.filename}
              className="bg-[#1e293b] p-4 rounded-xl flex flex-col gap-2 items-start"
            >
              <span className="text-lg font-medium truncate w-full">{song.name || song.filename}</span>

              <button
                onClick={() => play(index)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full flex items-center gap-2 transition"
              >
                <Play size={18} />
                {isPlaying && currentIndex === index ? 'Playing' : 'Play'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
