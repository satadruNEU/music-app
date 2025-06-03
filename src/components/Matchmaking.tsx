import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import ShinyCTA from './ShinyCTA';
import ParallaxBackground from './ParallaxBackground';
import AudioPlayer from './AudioPlayer';
import StrategyLoading from './StrategyLoading';

interface MatchmakingProps {
  onComplete: () => void;
}

const Matchmaking: React.FC<MatchmakingProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  
  // Create refs for each section
  const titleRef = React.useRef(null);
  const descriptionRef = React.useRef(null);
  const influencersRef = React.useRef(null);
  const buttonRef = React.useRef(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Use useInView for each section
  const titleInView = useInView(titleRef, { margin: "-100px" });
  const descriptionInView = useInView(descriptionRef, { margin: "-100px" });
  const influencersInView = useInView(influencersRef, { margin: "-100px" });
  const buttonInView = useInView(buttonRef, { margin: "-100px" });

  // Add scroll-based animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -375]);

  const steps = [
    "Analyzing campaign parameters...",
    "Scanning influencer database...",
    "Calculating engagement metrics...",
    "Matching brand alignment...",
    "Optimizing for target audience...",
    "Finalizing recommendations..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowResults(true);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

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

  const handleComplete = () => {
    setIsExiting(true);
    setShowLoading(true);
  };

  const toggleInfluencer = (id: string) => {
    setSelectedInfluencers(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  if (showLoading) {
    return <StrategyLoading onComplete={onComplete} />;
  }

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-zinc-950">
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            transition={{ duration: 1 }}
          >
            <ParallaxBackground fadeIn={true} fadeOut={isExiting} speed={0.5} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div ref={containerRef} className="container mx-auto px-4 relative z-10 pt-32 pb-16">
        <motion.div
          initial={{ 
            opacity: 0,
            scale: 0.8,
            filter: "blur(20px)"
          }}
          animate={{ 
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: {
              duration: 1,
              ease: [0.4, 0, 0.2, 1]
            }
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            filter: "blur(20px)",
            transition: {
              duration: 1,
              ease: [0.4, 0, 0.2, 1]
            }
          }}
          className="max-w-3xl mx-auto"
        >
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            exit={{ opacity: 0, y: -30, transition: { duration: 0.6 } }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-5xl md:text-6xl font-bold leading-tight mb-8 text-white tracking-tight"
          >
            Choose Your<br />Influencers
          </motion.h2>

          <motion.p
            ref={descriptionRef}
            initial={{ opacity: 0, y: 30 }}
            animate={descriptionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            exit={{ opacity: 0, y: -30, transition: { duration: 0.6 } }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-lg md:text-xl leading-relaxed max-w-3xl text-zinc-300 font-medium mb-10"
          >
            Pulse AI has handpicked the perfect influencers for your campaign. Select your dream team from our curated list.
          </motion.p>

          <motion.div
            ref={influencersRef}
            initial={{ opacity: 0, y: 30 }}
            animate={influencersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            exit={{ opacity: 0, y: -30, transition: { duration: 0.6 } }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="w-full pb-8"
          >
            <div className="relative">
              <div className="overflow-x-auto py-4">
                <motion.div 
                  style={{ x }}
                  className="flex space-x-6 px-4 min-w-max"
                >
                  {[
                    {
                      id: 1,
                      name: "Sophia",
                      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
                      instagram: "1.3M",
                      youtube: "850K",
                      twitter: "320K",
                      match: 95
                    },
                    {
                      id: 2,
                      name: "Emma",
                      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60",
                      instagram: "2.1M",
                      youtube: "1.2M",
                      twitter: "450K",
                      match: 92
                    },
                    {
                      id: 3,
                      name: "Olivia",
                      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60",
                      instagram: "950K",
                      youtube: "500K",
                      twitter: "180K",
                      match: 88
                    },
                    {
                      id: 4,
                      name: "Ava",
                      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60",
                      instagram: "1.8M",
                      youtube: "1M",
                      twitter: "380K",
                      match: 90
                    },
                    {
                      id: 5,
                      name: "Isabella",
                      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60",
                      instagram: "2.5M",
                      youtube: "1.5M",
                      twitter: "520K",
                      match: 94
                    },
                    {
                      id: 6,
                      name: "Mia",
                      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=60",
                      instagram: "1.6M",
                      youtube: "900K",
                      twitter: "410K",
                      match: 89
                    },
                    {
                      id: 7,
                      name: "Charlotte",
                      image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=800&auto=format&fit=crop&q=60",
                      instagram: "1.9M",
                      youtube: "1.1M",
                      twitter: "480K",
                      match: 91
                    },
                    {
                      id: 8,
                      name: "Amelia",
                      image: "https://images.unsplash.com/photo-1513379733131-47fc74b45fc7?w=800&auto=format&fit=crop&q=60",
                      instagram: "2.2M",
                      youtube: "1.3M",
                      twitter: "550K",
                      match: 93
                    }
                  ].map((influencer) => (
                    <motion.div
                      key={influencer.id}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      className={`relative w-[300px] h-[400px] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                        selectedInfluencers.includes(influencer.id.toString())
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-950'
                          : ''
                      }`}
                      onClick={() => toggleInfluencer(influencer.id.toString())}
                    >
                      <div className="relative">
                        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-white rounded-full px-4 py-1.5">
                          <span className="text-white font-medium text-sm">
                            {influencer.match}% Match
                          </span>
                        </div>
                        <img 
                          src={influencer.image} 
                          alt={influencer.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold text-white">{influencer.name}</h3>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center relative ${
                            selectedInfluencers.includes(influencer.id.toString())
                              ? 'bg-white border-white text-zinc-950'
                              : 'border-white/30'
                          }`} />
                          {selectedInfluencers.includes(influencer.id.toString()) && (
                            <svg 
                              className="absolute w-4 h-4 text-zinc-950" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2.5"
                            >
                              <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-sm text-zinc-400">Instagram</div>
                            <div className="text-white font-semibold">{influencer.instagram}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-zinc-400">YouTube</div>
                            <div className="text-white font-semibold">{influencer.youtube}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-zinc-400">Twitter</div>
                            <div className="text-white font-semibold">{influencer.twitter}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={buttonRef}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.6 } }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mt-16 text-center"
          >
            <ShinyCTA onClick={handleComplete}>
              Preview Campaign
            </ShinyCTA>
          </motion.div>
        </motion.div>
      </div>
      <AudioPlayer fadeOut={isExiting} audioFile="/audio/weekend-intrumental-3.mp3" />
    </section>
  );
};

export default Matchmaking; 