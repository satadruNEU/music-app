import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParallaxBackground from './ParallaxBackground';
import ShinyCTA from './ShinyCTA';
import AudioPlayer from './AudioPlayer';

interface HeroProps {
  onStart: () => void;
}

const Hero = ({ onStart }: HeroProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onStart();
    }, 1000); // Match the duration of the exit animation
  };

  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden perspective-1000">
      {/* Neural network background */}
      <ParallaxBackground fadeOut={isTransitioning} />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <AnimatePresence mode="wait">
          {!isTransitioning ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 1.5,
                filter: "blur(20px)",
                transition: {
                  duration: 1,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="hero-text text-6xl md:text-8xl font-bold mb-6"
              >
                <span className="text-white">Pulse</span>
                <span className="text-white">AI</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 mb-12"
              >
                The Weeknd's "Midnight Mirage" Campaign
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <ShinyCTA onClick={handleStart}>
                  Start Campaign
                </ShinyCTA>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="transition"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
              className="text-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 1,
                  ease: "easeInOut"
                }}
                className="text-6xl mb-8"
              >
                ✨
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AudioPlayer fadeOut={isTransitioning} />
    </section>
  );
};

export default Hero; 