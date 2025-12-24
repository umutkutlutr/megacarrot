import { Button } from './Button';
import { Users, TrendingUp, Timer } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, useScroll, useTransform } from 'motion/react';
import { CountUpNumber } from './CountUpNumber';

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1762279389042-9439bfb6c155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwbmVvbiUyMGFic3RyYWN0JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjUzNzE2NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Futuristic background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/50 via-[#0a0a0f]/80 to-[#0a0a0f]" />
      </motion.div>

      {/* Animated Grid Background */}
      <motion.div 
        className="absolute inset-0 opacity-10 z-0"
        style={{
          backgroundImage: 'linear-gradient(#00d9ff 1px, transparent 1px), linear-gradient(90deg, #00d9ff 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          y: useTransform(scrollY, [0, 500], [0, 100])
        }}
      />

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00d9ff]/20 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#b537ff]/20 rounded-full blur-3xl"
        animate={{
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div 
        className="container mx-auto px-6 py-20 relative z-10"
        style={{ opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="px-4 py-2 bg-gradient-to-r from-[#00d9ff]/20 to-[#b537ff]/20 border border-[#00d9ff]/30 rounded-full backdrop-blur-sm inline-block">
                ⚡ Built on MegaETH · Real-time onchain gaming
              </span>
            </motion.div>
            
            <motion.h1 
              className="bg-gradient-to-r from-white via-[#00d9ff] to-[#b537ff] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Real-Time Reflex Battles on MegaETH
            </motion.h1>
            
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-xl">
                BlinkRush is a real-time onchain reflex arena built on the MegaETH blockchain.
              </p>
              <p className="text-xl max-w-xl">
                Stake BLINK, react faster than your opponents by milliseconds, and claim your share of the prize pool in every match.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button size="lg">Play Now</Button>
              <Button size="lg" variant="secondary">View Tokenomics</Button>
            </motion.div>
            
            <motion.div
              className="pt-4 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <p className="text-sm text-white/60 leading-relaxed">
                BlinkRush is currently in testnet. There is no real money risk while we test the game mechanics together with the community.
              </p>
            </motion.div>
          </div>

          {/* Right Side - Game Mockup */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div 
              className="relative bg-gradient-to-br from-[#1a1a24] to-[#13131a] rounded-3xl border-2 border-white/10 overflow-hidden shadow-2xl shadow-purple-500/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1577388219814-9b75a45cea09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZ2FtaW5nJTIwYXJlbmElMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY1MzcxNjczfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="BlinkRush game arena"
                className="w-full h-full object-cover opacity-60"
              />
              
              {/* Overlay Stats */}
              <motion.div 
                className="absolute top-6 right-6 space-y-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.div 
                  className="bg-black/60 backdrop-blur-md rounded-2xl px-4 py-3 border border-[#00d9ff]/30"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(0, 217, 255, 0.5)' }}
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#00d9ff]" />
                    <div>
                      <p className="text-xs text-white/60">Players Online</p>
                      <p className="text-white font-semibold">
                        <CountUpNumber end={1247} />
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-black/60 backdrop-blur-md rounded-2xl px-4 py-3 border border-[#b537ff]/30"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(181, 55, 255, 0.5)' }}
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#b537ff]" />
                    <div>
                      <p className="text-xs text-white/60">Prize Pool</p>
                      <p className="text-white font-semibold">
                        <CountUpNumber end={125000} /> BLINK
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-black/60 backdrop-blur-md rounded-2xl px-4 py-3 border border-[#00d9ff]/30"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(0, 217, 255, 0.5)' }}
                >
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-[#00d9ff]" />
                    <div>
                      <p className="text-xs text-white/60">Next Round</p>
                      <p className="text-white font-semibold">2m 34s</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Game UI Overlay */}
              <motion.div 
                className="absolute bottom-6 left-6 right-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <p className="text-sm text-white/80 mb-2">Ready to compete?</p>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[#00d9ff] to-[#b537ff] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1.5, delay: 1.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div 
              className="absolute -top-4 -left-4 w-24 h-24 bg-[#00d9ff]/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#b537ff]/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}