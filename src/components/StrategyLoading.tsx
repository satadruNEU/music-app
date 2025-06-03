import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AudioPlayer from './AudioPlayer';

interface StrategyLoadingProps {
  onComplete: () => void;
}

const StrategyLoading: React.FC<StrategyLoadingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const steps = [
    "Analyzing influencer data...",
    "Calculating optimal timing...",
    "Building content strategy...",
    "Optimizing engagement metrics...",
    "Crafting campaign narrative...",
    "Finalizing rollout plan..."
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 1000);
    }, 12000); // Total duration of loading state

    return () => clearTimeout(timeout);
  }, [onComplete]);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(stepInterval);
  }, []);

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-zinc-950">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-white"
          >
            Building Your Rollout Strategy
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 h-24 mb-12"
          >
            {[...Array(12)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ height: "20%" }}
                animate={{
                  height: ["20%", "80%", "20%"]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: index * 0.15
                }}
                className="w-1.5 bg-gradient-to-t from-white/40 to-white/20 rounded-full"
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-zinc-400 font-medium"
          >
            {steps[currentStep]}
          </motion.div>
        </motion.div>
      </div>

      <AudioPlayer fadeOut={isExiting} audioFile="/audio/weekend-intrumental-66.mp3" />
    </section>
  );
};

export default StrategyLoading; 