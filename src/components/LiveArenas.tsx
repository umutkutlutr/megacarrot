import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { Users, TrendingUp, Lock, Medal } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { CountUpNumber } from './CountUpNumber';

const arenas = [
  {
    name: 'Casual Arena',
    tag: 'Low stake · Fast games',
    description: 'Perfect for learning the game, practicing your timing, or just chilling with quick matches. Ideal for new players or those who don\'t want to sweat every round.',
    entryFee: '10 BLINK',
    players: '8/12',
    prizePool: 96,
    status: 'active',
    gradient: 'from-[#00d9ff]/20 to-[#00d9ff]/5'
  },
  {
    name: 'Ranked Arena',
    tag: 'Competitive · High stakes',
    description: 'This is where things get serious. Stake more BLINK to face stronger competition and fight for bigger prize pools. Every win pushes you higher on the global leaderboard.',
    entryFee: '100 BLINK',
    players: '15/20',
    prizePool: 1800,
    status: 'active',
    gradient: 'from-[#b537ff]/20 to-[#b537ff]/5'
  },
  {
    name: 'Tournament Arenas',
    tag: 'Coming Soon · Elite',
    description: 'Limited-time, high-stakes events with big prize pools and exclusive rewards. Seasonal tournaments will feature unique formats, special badges, and rewards that can only be earned during those events.',
    entryFee: '500 BLINK',
    players: '—',
    prizePool: 50000,
    status: 'locked',
    gradient: 'from-yellow-500/20 to-yellow-500/5'
  }
];

const leaderboard = [
  { rank: 1, player: '0x7f3A...d21c', earnings: 45230 },
  { rank: 2, player: '0x9B2c...8a4f', earnings: 38910 },
  { rank: 3, player: '0x4E1d...5b9a', earnings: 32450 },
  { rank: 4, player: '0xC8f6...2e3d', earnings: 28120 },
  { rank: 5, player: '0x5A9b...7c1e', earnings: 24680 }
];

export function LiveArenas() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="arenas" className="py-24 px-6 bg-gradient-to-b from-transparent to-[#13131a]/50" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4 bg-gradient-to-r from-white to-[#b537ff] bg-clip-text text-transparent">
            Choose Your Arena
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Different arenas offer different levels of risk, reward, and intensity. Whether you&rsquo;re here to warm up your reflexes or dominate the rankings, there&rsquo;s a place for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {arenas.map((arena, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: 10 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <GlassCard hover className={`bg-gradient-to-br ${arena.gradient} backdrop-blur-xl h-full flex flex-col`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white mb-1">{arena.name}</h3>
                    <span className="text-xs text-white/60">{arena.tag}</span>
                  </div>
                  {arena.status === 'locked' && (
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Lock className="w-5 h-5 text-yellow-500" />
                    </motion.div>
                  )}
                  {arena.status === 'active' && (
                    <span className="flex items-center gap-1 text-xs text-[#00d9ff]">
                      <motion.span 
                        className="w-2 h-2 bg-[#00d9ff] rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      Live
                    </span>
                  )}
                </div>
                
                <p className="mb-6 text-sm flex-grow leading-relaxed">{arena.description}</p>
                
                <div className="space-y-3 mb-6">
                  <motion.div 
                    className="flex justify-between items-center p-3 bg-white/5 rounded-xl"
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <span className="text-sm text-white/60">Entry Fee</span>
                    <span className="text-white font-medium">{arena.entryFee}</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex justify-between items-center p-3 bg-white/5 rounded-xl"
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <span className="text-sm text-white/60 flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Players
                    </span>
                    <span className="text-white font-medium">{arena.players}</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex justify-between items-center p-3 bg-white/5 rounded-xl"
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <span className="text-sm text-white/60 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Prize Pool
                    </span>
                    <span className="text-[#00d9ff] font-medium">
                      <CountUpNumber end={arena.prizePool} /> BLINK
                    </span>
                  </motion.div>
                </div>
                
                <Button 
                  variant={arena.status === 'locked' ? 'ghost' : 'primary'}
                  className="w-full"
                >
                  {arena.status === 'locked' ? 'Coming Soon' : 'Join Arena'}
                </Button>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Leaderboard Widget */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <GlassCard className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Medal className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-white">Top Players</h3>
            </div>
            
            <div className="space-y-3">
              {leaderboard.map((player, index) => (
                <motion.div 
                  key={player.rank}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      player.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                      player.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                      player.rank === 3 ? 'bg-orange-600/20 text-orange-600' :
                      'bg-white/10 text-white/60'
                    }`}>
                      {player.rank}
                    </div>
                    <span className="text-white font-mono">{player.player}</span>
                  </div>
                  <span className="text-[#00d9ff] font-medium">
                    <CountUpNumber end={player.earnings} /> BLINK
                  </span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
