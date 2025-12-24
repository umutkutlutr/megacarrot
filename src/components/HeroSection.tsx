import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";
import { AnimatedCounter } from "./AnimatedCounter";
import { Zap, TrendingUp, Clock } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-12">
      <div className="grid-container">
        {/* Protocol Title - Minimal */}
        <motion.div
          className="col-span-12 text-center mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="mb-1.5" style={{ fontSize: "2.5rem", fontWeight: 300, letterSpacing: "-0.03em" }}>
            CARROT PROTOCOL
          </h1>
          <p className="opacity-30 text-xs tracking-widest">
            AGRICULTURAL INFRASTRUCTURE CONTROL
          </p>
        </motion.div>

        {/* Core Metrics - Compact, connected to content below */}
        <motion.div
          className="col-span-12 grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Total Production */}
          <GlassCard depth="heavy">
            <div className="p-6 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-3 opacity-25">
                <Zap size={12} strokeWidth={1.5} />
                <p className="text-xs tracking-widest">OUTPUT</p>
              </div>
              <div className="mb-1">
                <span className="text-4xl mono" style={{ color: "#FF6A00", fontWeight: 200, lineHeight: 1 }}>
                  <AnimatedCounter value={2805} />
                </span>
              </div>
              <p className="text-xs opacity-15 tracking-wider">CARROT/HR</p>
            </div>
          </GlassCard>

          {/* Total Balance */}
          <GlassCard depth="heavy">
            <div className="p-6 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-3 opacity-25">
                <TrendingUp size={12} strokeWidth={1.5} />
                <p className="text-xs tracking-widest">BALANCE</p>
              </div>
              <div className="mb-1">
                <span className="text-4xl mono" style={{ color: "#3CFF8F", fontWeight: 200, lineHeight: 1 }}>
                  <AnimatedCounter value={156420} />
                </span>
              </div>
              <p className="text-xs opacity-15 tracking-wider">CARROT</p>
            </div>
          </GlassCard>

          {/* Efficiency */}
          <GlassCard depth="heavy">
            <div className="p-6 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-3 opacity-25">
                <Clock size={12} strokeWidth={1.5} />
                <p className="text-xs tracking-widest">EFFICIENCY</p>
              </div>
              <div className="mb-1">
                <span className="text-4xl mono" style={{ color: "#00E5FF", fontWeight: 200, lineHeight: 1 }}>
                  92
                </span>
                <span className="text-xl opacity-15">%</span>
              </div>
              <p className="text-xs opacity-15 tracking-wider">OPTIMAL</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
