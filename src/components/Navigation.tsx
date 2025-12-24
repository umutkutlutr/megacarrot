import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from './Button';

export function Navigation() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 10, 15, 0)', 'rgba(10, 10, 15, 0.8)']
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(12px)']
  );
  const height = useTransform(scrollY, [0, 100], ['80px', '64px']);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

  return (
    <motion.nav
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        height,
        borderBottomColor: `rgba(255, 255, 255, ${borderOpacity})`
      }}
      className="fixed top-0 left-0 right-0 z-40 border-b border-white/0 transition-all"
    >
      <div className="container mx-auto px-6 h-full max-w-7xl">
        <div className="flex items-center justify-between h-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="bg-gradient-to-r from-[#00d9ff] to-[#b537ff] bg-clip-text text-transparent">
              BlinkRush
            </h3>
          </motion.div>

          <motion.div 
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="#how-it-works" className="text-white/80 hover:text-[#00d9ff] transition-colors">
              How It Works
            </a>
            <a href="#arenas" className="text-white/80 hover:text-[#00d9ff] transition-colors">
              Arenas
            </a>
            <a href="#tokenomics" className="text-white/80 hover:text-[#00d9ff] transition-colors">
              Tokenomics
            </a>
            <a href="#roadmap" className="text-white/80 hover:text-[#00d9ff] transition-colors">
              Roadmap
            </a>
            <a href="#faq" className="text-white/80 hover:text-[#00d9ff] transition-colors">
              FAQ
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="sm">Connect Wallet</Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
