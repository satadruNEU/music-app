import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
  fadeOut?: boolean;
  audioFile?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  fadeOut = false,
  audioFile = '/audio/weekend-intrumental.mp3'
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try {
      audioRef.current = new Audio(audioFile);
      const audio = audioRef.current;
      
      audio.loop = true;
      audio.volume = 0.3;

      // Try to play on load
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsMuted(false);
          })
          .catch(() => {
            // If autoplay fails, keep muted
            setIsMuted(true);
          });
      }

      return () => {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
        audio.pause();
        audio.currentTime = 0;
      };
    } catch (err) {
      console.error('Error initializing audio:', err);
    }
  }, [audioFile]);

  useEffect(() => {
    if (fadeOut && audioRef.current && !isMuted) {
      const audio = audioRef.current;
      const fadeOutDuration = 1000; // 1 second fade out
      const steps = 20; // Number of steps in the fade
      const stepDuration = fadeOutDuration / steps;
      const volumeStep = audio.volume / steps;

      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > volumeStep) {
          audio.volume -= volumeStep;
        } else {
          audio.volume = 0;
          audio.pause();
          setIsMuted(true);
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
          }
        }
      }, stepDuration);
    }

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, [fadeOut, isMuted]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              audioRef.current!.volume = 0.3;
              setIsMuted(false);
            })
            .catch(err => {
              console.error('Error playing audio:', err);
            });
        }
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      onClick={toggleMute}
      className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {isMuted ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
      )}
    </motion.button>
  );
};

export default AudioPlayer; 