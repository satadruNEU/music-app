import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import CampaignBriefing from './components/CampaignBriefing';
import Matchmaking from './components/Matchmaking';
import CampaignPreview from './components/CampaignPreview';
import CampaignLaunch from './components/CampaignLaunch';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import LoadingTransition from './components/LoadingTransition';

type CampaignStage = 'loading' | 'hero' | 'briefing' | 'loading-matchmaking' | 'matchmaking' | 'preview' | 'launch';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStage, setCurrentStage] = useState<CampaignStage>('loading');
  const [isTransitionExiting, setIsTransitionExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setCurrentStage('hero');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleStageChange = (stage: CampaignStage) => {
    setCurrentStage(stage);
  };

  // Add effect to handle loading-matchmaking transition
  useEffect(() => {
    if (currentStage === 'loading-matchmaking') {
      const timer = setTimeout(() => {
        setIsTransitionExiting(true);
        setTimeout(() => {
          handleStageChange('matchmaking');
          setIsTransitionExiting(false);
        }, 500); // Wait for exit animation
      }, 5000); // Show loading for 5 seconds
      return () => clearTimeout(timer);
    }
  }, [currentStage]);

  const renderStage = () => {
    switch (currentStage) {
      case 'loading':
        return <LoadingScreen />;
      case 'hero':
        return <Hero onStart={() => handleStageChange('briefing')} />;
      case 'briefing':
        return <CampaignBriefing onComplete={() => handleStageChange('loading-matchmaking')} />;
      case 'loading-matchmaking':
        return (
          <LoadingTransition 
            isExiting={isTransitionExiting}
          />
        );
      case 'matchmaking':
        return <Matchmaking onComplete={() => handleStageChange('preview')} />;
      case 'preview':
        return <CampaignPreview onLaunch={() => handleStageChange('launch')} />;
      case 'launch':
        return <CampaignLaunch onNewCampaign={() => handleStageChange('hero')} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      <Navigation currentStage={currentStage} onStageChange={handleStageChange} />
      <AnimatePresence mode="wait">
        {renderStage()}
      </AnimatePresence>
    </div>
  );
};

export default App; 