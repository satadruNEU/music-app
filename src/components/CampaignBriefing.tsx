import React, { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import ShinyCTA from './ShinyCTA';
import ParallaxBackground from './ParallaxBackground';
import AudioPlayer from './AudioPlayer';

interface CampaignBriefingProps {
  onComplete: () => void;
}

const CampaignBriefing: React.FC<CampaignBriefingProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [campaignParams, setCampaignParams] = useState({
    tone: ['mysterious'],
    ageRange: ['18-34'],
    region: ['global'],
    platforms: ['instagram', 'tiktok', 'youtube']
  });

  // Create refs for each section
  const titleRef = React.useRef(null);
  const descriptionRef = React.useRef(null);
  const toneRef = React.useRef(null);
  const ageRef = React.useRef(null);
  const regionRef = React.useRef(null);
  const platformsRef = React.useRef(null);

  // Use useInView for each section
  const titleInView = useInView(titleRef, { margin: "-100px" });
  const descriptionInView = useInView(descriptionRef, { margin: "-100px" });
  const toneInView = useInView(toneRef, { margin: "-100px" });
  const ageInView = useInView(ageRef, { margin: "-100px" });
  const regionInView = useInView(regionRef, { margin: "-100px" });
  const platformsInView = useInView(platformsRef, { margin: "-100px" });

  const toggleSelection = (category: keyof typeof campaignParams, value: string) => {
    setCampaignParams(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? (prev[category] as string[]).filter(item => item !== value)
        : [...(prev[category] as string[]), value]
    }));
  };

  const handleComplete = () => {
    setIsExiting(true);
    setTimeout(onComplete, 1000); // Match the fade out duration
  };

  return (
    <section id="briefing" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-zinc-950">
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
      
      <div className="container mx-auto px-4 relative z-10 pt-32 pb-16">
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
            scale: 1.2,
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
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-5xl md:text-6xl font-bold leading-tight mb-8 text-white tracking-tight"
          >
            Build Your<br />Campaign
          </motion.h2>

          <motion.p
            ref={descriptionRef}
            initial={{ opacity: 0, y: 30 }}
            animate={descriptionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-lg md:text-xl leading-relaxed max-w-3xl text-zinc-300 font-medium mb-10"
          >
            Select your campaign parameters to find the perfect influencers for your music promotion.
          </motion.p>

          {/* Campaign Parameters */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-8"
          >
            {/* Campaign Tone */}
            <motion.div 
              ref={toneRef}
              initial={{ opacity: 0, y: 30 }}
              animate={toneInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="bg-dark-gray/80 backdrop-blur-xl border border-white/10 rounded-xl p-8 shadow-lg md:col-span-2"
            >
              <h3 className="text-lg font-semibold mb-4">Campaign Tone</h3>
              <div className="flex flex-wrap gap-3">
                {['mysterious', 'energetic', 'emotional', 'playful'].map((tone) => (
                  <button
                    key={tone}
                    onClick={() => toggleSelection('tone', tone)}
                    className={`px-4 py-2 text-base rounded-full transition-colors ${
                      campaignParams.tone.includes(tone)
                        ? 'bg-white text-black'
                        : 'bg-dark/50 text-white/70 hover:bg-dark/70'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Age Range */}
            <motion.div 
              ref={ageRef}
              initial={{ opacity: 0, y: 30 }}
              animate={ageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="bg-dark-gray/80 backdrop-blur-xl border border-white/10 rounded-xl p-8 shadow-lg md:col-span-2"
            >
              <h3 className="text-lg font-semibold mb-4">Target Age Range</h3>
              <div className="flex flex-wrap gap-3">
                {['13-17', '18-34', '35-50', '50+'].map((range) => (
                  <button
                    key={range}
                    onClick={() => toggleSelection('ageRange', range)}
                    className={`px-4 py-2 text-base rounded-full transition-colors ${
                      campaignParams.ageRange.includes(range)
                        ? 'bg-white text-black'
                        : 'bg-dark/50 text-white/70 hover:bg-dark/70'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Target Region */}
            <motion.div 
              ref={regionRef}
              initial={{ opacity: 0, y: 30 }}
              animate={regionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="bg-dark-gray/80 backdrop-blur-xl border border-white/10 rounded-xl p-8 shadow-lg md:col-span-2"
            >
              <h3 className="text-lg font-semibold mb-4">Target Region</h3>
              <div className="flex flex-wrap gap-3">
                {['global', 'north america', 'europe', 'asia'].map((region) => (
                  <button
                    key={region}
                    onClick={() => toggleSelection('region', region)}
                    className={`px-4 py-2 text-base rounded-full transition-colors ${
                      campaignParams.region.includes(region)
                        ? 'bg-white text-black'
                        : 'bg-dark/50 text-white/70 hover:bg-dark/70'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Platforms */}
            <motion.div 
              ref={platformsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={platformsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="bg-dark-gray/80 backdrop-blur-xl border border-white/10 rounded-xl p-8 shadow-lg md:col-span-2"
            >
              <h3 className="text-lg font-semibold mb-4">Target Platforms</h3>
              <div className="flex flex-wrap gap-3">
                {['instagram', 'tiktok', 'youtube', 'twitter'].map((platform) => (
                  <button
                    key={platform}
                    onClick={() => toggleSelection('platforms', platform)}
                    className={`px-4 py-2 text-base rounded-full transition-colors ${
                      campaignParams.platforms.includes(platform)
                        ? 'bg-white text-black'
                        : 'bg-dark/50 text-white/70 hover:bg-dark/70'
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Continue Button */}
          <motion.div 
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mt-16 text-center"
          >
            <ShinyCTA onClick={handleComplete}>
              Find Influencers
            </ShinyCTA>
          </motion.div>
        </motion.div>
      </div>
      <AudioPlayer fadeOut={isExiting} audioFile="/audio/weekend-intrumental-2.mp3" />
    </section>
  );
};

export default CampaignBriefing; 