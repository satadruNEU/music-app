import React from 'react';

const DatabaseSchema: React.FC = () => {
  return (
    <div className="w-full h-48 rounded-xl gradient-border inner-glow overflow-hidden relative">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full animate-pulse" style={{
          backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '15px 15px'
        }}></div>
      </div>

      {/* Database connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 180">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 0.8 }} />
            <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.8 }} />
          </linearGradient>
        </defs>

        <g stroke="url(#connectionGradient)" strokeWidth="1.5" fill="none">
          {/* Primary data flow */}
          <path className="connector" d="M80,60 L140,60 L140,90 L200,90" />
          <path className="connector" d="M200,90 L240,90 L240,60 L280,60" />
          <path className="connector" d="M140,90 L140,120 L200,120" />
          <path className="connector" d="M200,120 L240,120 L240,150 L200,150" />

          {/* Connection nodes */}
          <circle cx="80" cy="60" r="3" fill="#4f46e5"/>
          <circle cx="200" cy="90" r="3" fill="#3b82f6"/>
          <circle cx="280" cy="60" r="3" fill="#8b5cf6"/>
          <circle cx="200" cy="120" r="3" fill="#f59e0b"/>
          <circle cx="200" cy="150" r="3" fill="#ef4444"/>
        </g>
      </svg>

      {/* Animated Database Tables */}
      <div className="absolute inset-0 w-full h-full">
        {/* Central database hub */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 animate-schema-pulse">
          <div className="w-8 h-8 glass rounded-xl flex items-center justify-center border border-indigo-400/30 inner-glow">
            <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
        </div>

        {/* Floating table cards */}
        <div className="absolute left-3 top-12 table-float">
          <div className="w-16 h-12 glass rounded-lg gradient-border shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500/20 to-blue-500/20 text-white text-[7px] px-1.5 py-0.5 font-medium border-b border-white/10">users</div>
            <div className="px-1.5 py-0.5 space-y-0.5">
              <div className="flex items-center space-x-0.5">
                <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                <div className="h-0.5 w-6 bg-white/30 rounded"></div>
              </div>
              <div className="h-0.5 w-4 bg-white/20 rounded"></div>
              <div className="h-0.5 w-7 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>

        <div className="absolute right-3 top-12 table-float">
          <div className="w-16 h-12 glass rounded-lg gradient-border shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white text-[7px] px-1.5 py-0.5 font-medium border-b border-white/10">orders</div>
            <div className="px-1.5 py-0.5 space-y-0.5">
              <div className="flex items-center space-x-0.5">
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                <div className="h-0.5 w-6 bg-white/30 rounded"></div>
              </div>
              <div className="h-0.5 w-3 bg-white/20 rounded"></div>
              <div className="h-0.5 w-5 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 top-24 table-float">
          <div className="w-16 h-12 glass rounded-lg gradient-border shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white text-[7px] px-1.5 py-0.5 font-medium border-b border-white/10">products</div>
            <div className="px-1.5 py-0.5 space-y-0.5">
              <div className="flex items-center space-x-0.5">
                <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                <div className="h-0.5 w-6 bg-white/30 rounded"></div>
              </div>
              <div className="h-0.5 w-6 bg-white/20 rounded"></div>
              <div className="h-0.5 w-4 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-3 table-float">
          <div className="w-16 h-12 glass rounded-lg gradient-border shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-white text-[7px] px-1.5 py-0.5 font-medium border-b border-white/10">analytics</div>
            <div className="px-1.5 py-0.5 space-y-0.5">
              <div className="flex items-center space-x-0.5">
                <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                <div className="h-0.5 w-6 bg-white/30 rounded"></div>
              </div>
              <div className="h-0.5 w-3 bg-white/20 rounded"></div>
              <div className="h-0.5 w-5 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseSchema; 