import { useState, useRef } from 'react';
import { GlassCard } from './GlassCard';
import { ChevronDown } from 'lucide-react';
import { motion, useInView } from 'motion/react';

const faqs = [
  {
    question: 'What is BlinkRush?',
    answer: 'BlinkRush is a real-time onchain reflex arena built on the MegaETH blockchain. Players stake BLINK to enter arenas, react to visual patterns within milliseconds, and compete for a share of the prize pool in each round.'
  },
  {
    question: 'What is BLINK and what is it used for?',
    answer: 'BLINK is the native token of the BlinkRush ecosystem. It is used for arena entry, reward distribution, cosmetics and visual effects, and—over time—tournament access, season passes, and other utilities. A portion of BLINK used in matches can be burned, creating a deflationary pressure on the supply.'
  },
  {
    question: 'Are you live on mainnet?',
    answer: 'Right now, we are in testnet. The goal is to refine the game mechanics, token economy, and infrastructure with the community before moving to mainnet. Mainnet deployment will be considered once Phase 1 and Phase 2 are successfully completed.'
  },
  {
    question: 'How do I start playing?',
    answer: 'Get a wallet connected to the MegaETH network. Acquire test ETH and BLINK from a faucet (for the testnet version). Visit the BlinkRush website and connect your wallet. Choose an arena, stake BLINK, and try to react faster than everyone else.'
  },
  {
    question: 'How are match rewards calculated?',
    answer: 'Each arena has its own entry fee and prize structure. The total BLINK staked forms the base for the prize pool. At the end of the round, a predefined percentage of that pool is distributed to top-ranked players (for example, top 3), based on their performance that round. Exact distribution details are shown in the UI for each arena.'
  },
  {
    question: 'Can bots ruin the game?',
    answer: 'BlinkRush is designed as a timing and pattern-recognition game, which already makes botting non-trivial. On top of that, we are implementing anti-bot and fairness mechanisms such as commit–reveal patterns, randomized pattern generation, timing thresholds, and behavioral analysis. The goal is to maintain a fair environment where real players and real skill dominate.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-24 px-6" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4 bg-gradient-to-r from-white to-[#b537ff] bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl">
            Everything you need to know about BlinkRush
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="overflow-hidden">
                <motion.button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between text-left group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-white group-hover:text-[#00d9ff] transition-colors pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-[#00d9ff] flex-shrink-0" />
                  </motion.div>
                </motion.button>
                
                <motion.div 
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                    marginTop: openIndex === index ? 16 : 0
                  }}
                  transition={{ 
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="overflow-hidden"
                >
                  <p className="text-sm leading-relaxed">{faq.answer}</p>
                </motion.div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
