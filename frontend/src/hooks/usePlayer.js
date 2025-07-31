import { useContext } from 'react';
import AudioPlayerContext from '../context/AudioPlayerContext';

export const useAudioPlayer = () => useContext(AudioPlayerContext);