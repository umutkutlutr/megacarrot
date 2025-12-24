import { Wallet, Coins, Zap, Trophy } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const steps = [
  {
    icon: Wallet,
    title: 'Connect Your Wallet',
    description: 'Connect your wallet to the MegaETH network in a few clicks. If you\'re on testnet, we\'ll guide you to a faucet where you can get test ETH and BLINK to start playing instantly.'
  },
  {
    icon: Coins,
    title: 'Choose an Arena & Stake BLINK',
    description: 'Pick from Casual, Ranked, or special tournament arenas. Each arena has its own entry fee (stake amount), player cap, and prize pool.'
  },
  {
    icon: Zap,
    title: 'Read the Pattern, React First',
    description: 'When the round begins, a short visual pattern or signal appears on your screen. Tap the correct button faster than everyone else. Your move is sent onchain and recorded in real time.'
  },
  {
    icon: Trophy,
    title: 'Claim Rewards & Climb the Leaderboard',
    description: 'At the end of each round, rewards are distributed based on the final ranking. Collect BLINK, unlock new arenas and cosmetics, and push your way up the global leaderboard.'
  }
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 px-6 relative overflow-hidden" ref={ref}>
      {/* Background Pattern with Parallax */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(#00d9ff 1px, transparent 1px), linear-gradient(90deg, #00d9ff 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
        initial={{ y: 100 }}
        animate={isInView ? { y: 0 } : { y: 100 }}
        transition={{ duration: 1 }}
      />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4 bg-gradient-to-r from-white to-[#00d9ff] bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            BlinkRush is designed to be simple to learn, hard to master. Connect your wallet, stake BLINK, trust your reflexes, and climb the ranks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <GlassCard hover className="relative h-full">
                <motion.div 
                  className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-[#00d9ff] to-[#b537ff] rounded-full flex items-center justify-center"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <span>{index + 1}</span>
                </motion.div>
                
                <motion.div 
                  className="mb-4 mt-2"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00d9ff]/20 to-[#b537ff]/20 rounded-2xl flex items-center justify-center border border-white/10">
                    <step.icon className="w-8 h-8 text-[#00d9ff]" />
                  </div>
                </motion.div>
                
                <h3 className="mb-3 text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed">{step.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
