import { createContext, useContext } from "react";

export const AudioPlayerContext = createContext(); 
export const useAudioPlayer = () => useContext(AudioPlayerContext); 

export default AudioPlayerContext; 
