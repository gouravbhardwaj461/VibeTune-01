// src/App.jsx
import React from 'react';
import Library from './components/Library';
import PlayerBar from './components/PlayerBar';
import { AudioPlayerProvider } from './context/AudioPlayerProvider';

function App() {
  return (
    <AudioPlayerProvider>
      <div className="min-h-screen bg-gray-900 text-white pb-24">
        <Library />
        <PlayerBar />
      </div>
    </AudioPlayerProvider>
  );
}

export default App;
