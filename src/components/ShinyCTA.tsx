import React from 'react';
import { IoArrowForward } from 'react-icons/io5';

interface ShinyCTAProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ShinyCTA: React.FC<ShinyCTAProps> = ({ children, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="shiny-cta group relative overflow-hidden inline-flex"
    >
      <div className="flex items-center justify-center gap-6 whitespace-nowrap">
        <div>
          {children}
        </div>
        <div className="relative">
          <div className="transition-transform duration-300 group-hover:translate-y-[-3rem] transform-gpu">
            <IoArrowForward className="w-5 h-5" />
          </div>
          <div className="absolute top-0 left-0 transition-transform duration-300 translate-y-[3rem] group-hover:translate-y-0 transform-gpu">
            <IoArrowForward className="w-5 h-5" />
          </div>
        </div>
      </div>
    </button>
  );
};

export default ShinyCTA; 