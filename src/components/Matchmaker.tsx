import { useState } from 'react';
import { motion } from 'framer-motion';

interface MatchmakerProps {
  onComplete: () => void;
}

const Matchmaker = ({ onComplete }: MatchmakerProps) => {
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);

  const influencers = [
    { id: '1', name: 'Alex Chen', platform: 'Instagram', followers: '2.5M', engagement: '4.8%' },
    { id: '2', name: 'Sarah Park', platform: 'TikTok', followers: '5.1M', engagement: '6.2%' },
    { id: '3', name: 'Marcus Johnson', platform: 'YouTube', followers: '1.8M', engagement: '5.5%' },
    { id: '4', name: 'Luna Rodriguez', platform: 'Instagram', followers: '3.2M', engagement: '5.1%' },
  ];

  const toggleInfluencer = (id: string) => {
    setSelectedInfluencers(prev =>
      prev.includes(id)
        ? prev.filter(influencerId => influencerId !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="matchmaker" className="min-h-screen relative py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">AI-Recommended Influencers</h2>
          <p className="text-gray-300">Select your dream team for "Midnight Mirage"</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {influencers.map((influencer, index) => (
            <motion.div
              key={influencer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{influencer.name}</h3>
                <span className="text-primary">{influencer.platform}</span>
              </div>
              <div className="space-y-2 mb-4">
                <p>Followers: {influencer.followers}</p>
                <p>Engagement: {influencer.engagement}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleInfluencer(influencer.id)}
                className={`w-full py-2 rounded-lg transition-colors ${
                  selectedInfluencers.includes(influencer.id)
                    ? 'bg-primary text-dark'
                    : 'bg-dark-gray text-white hover:bg-gray-700'
                }`}
              >
                {selectedInfluencers.includes(influencer.id) ? 'Selected' : 'Select'}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            disabled={selectedInfluencers.length === 0}
            className={`glow-button px-8 py-4 text-lg font-medium ${
              selectedInfluencers.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Preview Campaign
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Matchmaker; 