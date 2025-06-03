import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll } from 'framer-motion';
import ShinyCTA from './ShinyCTA';
import ParallaxBackground from './ParallaxBackground';
import AudioPlayer from './AudioPlayer';

interface CampaignPreviewProps {
  onLaunch: () => void;
}

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, prefix = '', suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState('0');
  
  React.useEffect(() => {
    if (isInView) {
      const startTime = Date.now();
      const duration = 1500; // 1.5 seconds
      const startValue = 0;
      const endValue = value;
      
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
        const currentValue = startValue + (endValue - startValue) * easeOut(progress);
        
        if (suffix === '%') {
          setDisplayValue(currentValue.toFixed(1));
        } else if (suffix === 'M+') {
          setDisplayValue(currentValue.toFixed(1));
        } else {
          setDisplayValue(Math.round(currentValue).toString());
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
  }, [isInView, value, suffix]);

  return (
    <motion.div ref={ref} className="text-lg font-semibold text-white">
      {prefix}
      {displayValue}
      {suffix}
    </motion.div>
  );
};

const CampaignPreview: React.FC<CampaignPreviewProps> = ({ onLaunch }) => {
  const [isExiting, setIsExiting] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const handleLaunch = () => {
    setIsExiting(true);
    setTimeout(onLaunch, 1000);
  };

  const timeline = [
    {
      day: 'Day 1',
      title: 'Teaser Posts',
      description: 'Mysterious snippets and behind-the-scenes content'
    },
    {
      day: 'Day 3',
      title: 'Single Release',
      description: 'Full song premiere with influencer reactions'
    },
    {
      day: 'Day 5',
      title: 'Challenge Launch',
      description: 'Dance challenge and cover contest'
    },
    {
      day: 'Day 7',
      title: 'Behind the Scenes',
      description: 'Studio sessions and creative process'
    }
  ];

  const getMetrics = (index: number) => {
    return {
      reach: index === 0 ? 2.5 : index === 1 ? 5 : index === 2 ? 8 : 10,
      engagement: index === 0 ? 4.2 : index === 1 ? 5.8 : index === 2 ? 6.5 : 7.2,
      conversion: index === 0 ? 12 : index === 1 ? 25 : index === 2 ? 45 : 60
    };
  };

  return (
    <section id="preview" className="min-h-screen relative flex items-center justify-center overflow-y-auto bg-zinc-950">
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <ParallaxBackground fadeIn={true} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 relative z-10 py-32">
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
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold leading-tight mb-8 text-white tracking-tight"
          >
            Campaign Preview
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl leading-relaxed max-w-3xl text-zinc-300 font-medium mb-16"
          >
            Your "Midnight Mirage" rollout strategy
          </motion.p>

          <div ref={timelineRef} className="relative min-h-[200vh]">
            {/* Flow Chart Lines */}
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/20 via-white/40 to-white/20 -translate-x-1/2"
            >
              {/* Animated Dot */}
              <motion.div
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white"
              />
            </motion.div>
            
            {/* Timeline Items */}
            <div className="space-y-32">
              {timeline.map((item, index) => {
                const itemRef = useRef(null);
                const isInView = useInView(itemRef, { 
                  margin: "-100px",
                  once: false 
                });
                
                return (
                  <motion.div
                    key={item.day}
                    ref={itemRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ 
                      duration: 0.8,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  >
                    {/* Content Card */}
                    <motion.div
                      initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                      animate={isInView ? { x: 0, opacity: 1 } : { x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 0 30px rgba(255,255,255,0.1)"
                      }}
                      transition={{ 
                        duration: 0.8, 
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      className={`w-[calc(50%-2rem)] bg-gradient-to-br from-black/90 to-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative z-10 ${
                        index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6"
                      >
                        <span className="text-white font-medium text-sm bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 inline-block">
                          {item.day}
                        </span>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ 
                          duration: 0.6, 
                          ease: [0.4, 0, 0.2, 1]
                        }}
                      >
                        <motion.h3
                          className="text-3xl font-bold mb-4 text-white bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
                        >
                          {item.title}
                        </motion.h3>
                        <motion.p
                          className="text-zinc-400 leading-relaxed text-lg"
                        >
                          {item.description}
                        </motion.p>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ delay: 0.2 }}
                          className="mt-6 grid grid-cols-3 gap-4"
                        >
                          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="text-sm text-zinc-400 mb-2">Estimated Reach</div>
                            <AnimatedNumber 
                              value={getMetrics(index).reach} 
                              suffix="M+" 
                            />
                          </div>
                          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="text-sm text-zinc-400 mb-2">Engagement Rate</div>
                            <AnimatedNumber 
                              value={getMetrics(index).engagement} 
                              suffix="%" 
                            />
                          </div>
                          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="text-sm text-zinc-400 mb-2">Brand Impact</div>
                            <AnimatedNumber 
                              value={getMetrics(index).conversion} 
                              suffix="K+" 
                            />
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* Connecting Line - Now behind the card */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "3rem" } : { width: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      className={`absolute h-0.5 bg-gradient-to-r z-0 ${
                        index % 2 === 0 
                          ? 'right-[calc(50%+1rem)] from-white/40 to-white/20' 
                          : 'left-[calc(50%+1rem)] from-white/20 to-white/40'
                      }`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.8,
              delay: 2,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="text-center mt-20 sticky bottom-8"
          >
            <ShinyCTA onClick={handleLaunch}>
              Launch Campaign
            </ShinyCTA>
          </motion.div>
        </motion.div>
      </div>

      <AudioPlayer fadeOut={isExiting} audioFile="/audio/weekend-intrumental-4.mp3" />
    </section>
  );
};

export default CampaignPreview; 