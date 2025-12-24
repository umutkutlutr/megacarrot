import { GlassCard } from './GlassCard';
import { Rocket, Target, Trophy, Code } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const phases = [
  {
    icon: Rocket,
    phase: 'Phase 1',
    title: 'Testnet Launch',
    status: 'completed',
    items: [
      'Core prototype with a single Casual arena',
      'Basic BLINK integration and staking',
      'Simple leaderboard and profile system',
      'Closed testing with early community'
    ]
  },
  {
    icon: Target,
    phase: 'Phase 2',
    title: 'Ranked Mode & Advanced Mechanics',
    status: 'active',
    items: [
      'Introduction of Ranked Arenas',
      'Rating / MMR system for competitive players',
      'First wave of cosmetic items',
      'Stronger anti-bot and fairness mechanisms'
    ]
  },
  {
    icon: Trophy,
    phase: 'Phase 3',
    title: 'Tournaments & Seasons',
    status: 'upcoming',
    items: [
      'Time-limited tournaments with large prize pools',
      'Season-based progression with unique rewards',
      'Advanced player stats and match histories',
      'Seasonal badges and limited collectibles'
    ]
  },
  {
    icon: Code,
    phase: 'Phase 4',
    title: 'SDK & Ecosystem Expansion',
    status: 'upcoming',
    items: [
      'Developer-facing APIs and SDK',
      'Additional mini-games and modes',
      'Cross-project events with MegaETH partners',
      'Real-time gaming infrastructure for others'
    ]
  }
];

export function Roadmap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="roadmap" className="py-24 px-6 bg-gradient-to-b from-[#13131a]/50 to-transparent relative overflow-hidden" ref={ref}>
      {/* Background Decoration */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-[#b537ff]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4 bg-gradient-to-r from-white to-[#00d9ff] bg-clip-text text-transparent">
            Roadmap
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            BlinkRush starts as a focused, real-time reflex game and evolves into a core building block for real-time gaming on MegaETH.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, index) => (
            <motion.div 
              key={index} 
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {/* Connector Line */}
              {index < phases.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + (index * 0.15) }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
              
              <GlassCard hover className="relative z-10 h-full">
                {/* Status Badge */}
                <motion.div 
                  className="absolute -top-3 -right-3"
                  whileHover={{ scale: 1.1 }}
                >
                  {phase.status === 'completed' && (
                    <span className="px-3 py-1 bg-green-500/20 border border-green-500/40 rounded-full text-xs text-green-400 inline-block">
                      ✓ Done
                    </span>
                  )}
                  {phase.status === 'active' && (
                    <span className="px-3 py-1 bg-[#00d9ff]/20 border border-[#00d9ff]/40 rounded-full text-xs text-[#00d9ff] flex items-center gap-1">
                      <motion.span 
                        className="w-1.5 h-1.5 bg-[#00d9ff] rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      Active
                    </span>
                  )}
                  {phase.status === 'upcoming' && (
                    <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white/60 inline-block">
                      Soon
                    </span>
                  )}
                </motion.div>

                <motion.div 
                  className="mb-4"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    phase.status === 'completed' ? 'bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30' :
                    phase.status === 'active' ? 'bg-gradient-to-br from-[#00d9ff]/20 to-[#b537ff]/20 border border-[#00d9ff]/30' :
                    'bg-white/5 border border-white/10'
                  }`}>
                    <phase.icon className={`w-7 h-7 ${
                      phase.status === 'completed' ? 'text-green-400' :
                      phase.status === 'active' ? 'text-[#00d9ff]' :
                      'text-white/40'
                    }`} />
                  </div>
                </motion.div>

                <p className="text-sm text-[#00d9ff] mb-1">{phase.phase}</p>
                <h3 className="text-white mb-4">{phase.title}</h3>

                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start gap-2 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.5, delay: 0.5 + (index * 0.15) + (i * 0.05) }}
                    >
                      <span className="text-[#b537ff] mt-1">•</span>
                      <span className={phase.status === 'completed' ? 'text-white/80' : ''}>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
