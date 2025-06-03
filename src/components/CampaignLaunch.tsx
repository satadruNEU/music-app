import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import ShinyCTA from './ShinyCTA';
import ParallaxBackground from './ParallaxBackground';
import AudioPlayer from './AudioPlayer';

interface CampaignLaunchProps {
  onNewCampaign: () => void;
}

const CampaignLaunch: React.FC<CampaignLaunchProps> = ({ onNewCampaign }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Show confetti immediately
    setShowConfetti(true);

    // Show message after 3 seconds
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 3000);

    // Show CTA after 6 seconds
    const ctaTimer = setTimeout(() => {
      setShowCTA(true);
    }, 6000);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(ctaTimer);
    };
  }, []);

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-zinc-950">
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <ParallaxBackground fadeIn={true} fadeOut={isExiting} speed={0.5} />
          </motion.div>
        )}
      </AnimatePresence>

      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      <div className="container mx-auto px-4 relative z-10">
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: showCTA ? -40 : 0 
              }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 1.2,
                y: {
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
              className="text-center"
            >
              <motion.h1
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, type: "spring" }}
                className="text-6xl md:text-7xl font-bold mb-8 text-white"
              >
                Campaign Launched! 🎉
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1.2 }}
                className="text-xl md:text-2xl text-zinc-400 mb-12"
              >
                Your "Midnight Mirage" campaign is now live
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2 }}
              className="text-center mt-12"
            >
              <ShinyCTA onClick={onNewCampaign}>
                Start New Campaign
              </ShinyCTA>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AudioPlayer fadeOut={isExiting} audioFile="/audio/weekend-intrumental-5.mp3" />
    </section>
  );
};

export default CampaignLaunch; 