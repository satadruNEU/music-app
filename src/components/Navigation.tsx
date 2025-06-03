import React from 'react';
import { motion } from 'framer-motion';

type CampaignStage = 'loading' | 'hero' | 'briefing' | 'loading-matchmaking' | 'matchmaking' | 'preview' | 'launch';

interface NavigationProps {
  currentStage: CampaignStage;
  onStageChange: (stage: CampaignStage) => void;
}

const Navigation = ({ currentStage, onStageChange }: NavigationProps) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (stage: CampaignStage) => {
    onStageChange(stage);
    scrollToSection(stage);
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'briefing', label: 'Briefing' },
    { id: 'matchmaking', label: 'Matchmaker' },
    { id: 'preview', label: 'Preview' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-medium">
              <span className="font-light">influur</span>
              <span className="font-bold"> pulse</span>
            </a>
          </div>

          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item.id as CampaignStage)}
                className={`text-sm font-medium transition-colors ${
                  currentStage === item.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation; 