import { GlassCard } from './GlassCard';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Flame, Gift, TrendingUp, Lock, Coins, Users } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { CountUpNumber } from './CountUpNumber';

const allocationData = [
  { name: 'Game & Rewards Pool', value: 40, color: '#00d9ff' },
  { name: 'Liquidity & Market Making', value: 20, color: '#b537ff' },
  { name: 'Team & Advisors', value: 15, color: '#8b5cf6' },
  { name: 'Ecosystem & Partnerships', value: 10, color: '#06b6d4' },
  { name: 'Seed / Private / Public', value: 10, color: '#6366f1' },
  { name: 'Marketing & Community', value: 5, color: '#a855f7' }
];

const keyFeatures = [
  {
    icon: Coins,
    title: 'Token Name',
    value: 'BLINK',
    color: 'text-[#00d9ff]'
  },
  {
    icon: TrendingUp,
    title: 'Total Supply',
    value: '1,000,000,000',
    color: 'text-[#00d9ff]'
  },
  {
    icon: Lock,
    title: 'Network',
    value: 'MegaETH',
    color: 'text-[#b537ff]'
  }
];

const matchEconomy = [
  {
    icon: Gift,
    title: 'Prize Pool',
    value: '75%',
    description: 'Distributed to top players',
    color: 'text-green-400'
  },
  {
    icon: TrendingUp,
    title: 'Treasury',
    value: '15%',
    description: 'Development & operations',
    color: 'text-[#00d9ff]'
  },
  {
    icon: Flame,
    title: 'Burn',
    value: '10%',
    description: 'Permanently removed',
    color: 'text-orange-500'
  }
];

export function Tokenomics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tokenomics" className="py-24 px-6" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4 bg-gradient-to-r from-white to-[#b537ff] bg-clip-text text-transparent">
            BLINK Tokenomics
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            BLINK is the native token of the BlinkRush ecosystem. It powers arena entry, reward distribution, cosmetics, seasonal passes, and future ecosystem utilities.
          </p>
        </motion.div>

        {/* Key Features */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {keyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
            >
              <GlassCard hover>
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center border border-white/10 flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm text-white/60 mb-1">{feature.title}</p>
                    <h3 className={`text-white ${feature.color}`}>{feature.value}</h3>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
          {/* Left: Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <GlassCard className="h-full">
              <h3 className="text-white mb-6">Token Distribution</h3>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={110}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={isInView ? 0 : 1000}
                    animationDuration={1500}
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value, entry: any) => (
                      <span className="text-white/80 text-sm">
                        {value} (<CountUpNumber end={entry.payload.value} />%)
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>

          {/* Right: Distribution Details */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {allocationData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
              >
                <GlassCard hover>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-white">{item.name}</span>
                    </div>
                    <motion.span 
                      className="text-xl font-medium"
                      style={{ color: item.color }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <CountUpNumber end={item.value} />%
                    </motion.span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Match Economy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <GlassCard className="bg-gradient-to-br from-[#b537ff]/10 to-transparent border-[#b537ff]/30">
            <h3 className="text-white mb-2">In-Game Economy</h3>
            <p className="text-sm text-white/60 mb-6">
              Match-level mechanics: How BLINK flows through each arena
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {matchEconomy.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.9 + (index * 0.1) }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-3"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </motion.div>
                  <motion.div 
                    className={`text-3xl font-semibold mb-1 ${item.color}`}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                  >
                    {item.value}
                  </motion.div>
                  <h3 className="text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-white/60">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Utility Description */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <GlassCard>
            <h3 className="text-white mb-3">Token Utility</h3>
            <p className="text-sm leading-relaxed">
              BLINK is used for <span className="text-[#00d9ff]">arena entry</span>, <span className="text-[#00d9ff]">reward distribution</span>, <span className="text-[#b537ff]">cosmetics & effects</span>, <span className="text-[#b537ff]">tournament access</span>, <span className="text-purple-400">season passes</span>, and future <span className="text-cyan-400">SDK/ecosystem integrations</span>. This creates a loop where players earn BLINK by winning, BLINK is continuously recycled into new matches and cosmetics, and a portion is burned to support long-term scarcity.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
