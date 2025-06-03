import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AudioPlayer from './AudioPlayer';

interface LoadingTransitionProps {
  isExiting?: boolean;
}

const LoadingTransition: React.FC<LoadingTransitionProps> = ({ isExiting }) => {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-zinc-950">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Finding Your Perfect Match
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-zinc-400 mb-12"
          >
            Analyzing your campaign requirements...
          </motion.p>

          {/* Music Beat Animation */}
          <div className="flex items-center justify-center gap-2 h-20">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 bg-white rounded-full"
                initial={{ height: 20 }}
                animate={{
                  height: [20, 60, 20, 40, 20],
                  scale: [1, 1.1, 1, 1.05, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: [0.4, 0, 0.2, 1],
                  times: [0, 0.2, 0.4, 0.6, 1]
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <AudioPlayer fadeOut={isExiting} audioFile="/audio/weekend-intrumental-66.mp3" />
    </section>
  );
};

export default LoadingTransition; 