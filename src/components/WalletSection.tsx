import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";
import { Button } from "./Button";
import { AnimatedCounter } from "./AnimatedCounter";
import { Wallet, ArrowUpRight, ArrowDownRight, RotateCw } from "lucide-react";

export function WalletSection() {
  const transactions = [
    { id: 1, type: "Farm Production", amount: 1247, time: "2 min ago", positive: true },
    { id: 2, type: "Upgrade Purchase", amount: -3500, time: "15 min ago", positive: false },
    { id: 3, type: "Operative Boost", amount: 892, time: "1 hr ago", positive: true },
    { id: 4, type: "Farm Production", amount: 1247, time: "2 hr ago", positive: true },
  ];

  return (
    <section className="snap-section relative" style={{ paddingTop: "calc(var(--section-gap) * 0.7)", paddingBottom: "calc(var(--section-gap) * 1.2)" }}>
      <div className="grid-container">
        {/* Section header - Tertiary */}
        <motion.div
          className="col-span-12 mb-12 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: 300, letterSpacing: "-0.02em" }}>
            DIGITAL VAULT
          </h2>
          <div 
            className="h-px w-24 mx-auto" 
            style={{ background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)" }} 
          />
        </motion.div>

        <div className="col-span-12 grid grid-cols-3 gap-5">
          {/* Balance terminal - Terminal style */}
          <div className="col-span-2">
            <GlassCard depth="heavy">
              <div className="p-11">
                {/* Terminal header */}
                <div className="flex items-center justify-between mb-9 pb-6" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                  <div className="flex items-center gap-2.5">
                    <Wallet size={14} style={{ color: "#3CFF8F", opacity: 0.5 }} strokeWidth={1.5} />
                    <span className="text-xs tracking-widest opacity-30">PROTOCOL BALANCE</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: i === 0 ? "#3CFF8F" : "rgba(255, 255, 255, 0.08)" }}
                      />
                    ))}
                  </div>
                </div>

                {/* Balance display - Large, calm, authoritative */}
                <div className="mb-11">
                  <div className="flex items-baseline gap-3.5">
                    <span className="text-7xl mono" style={{ color: "#3CFF8F", fontWeight: 200, lineHeight: 0.9 }}>
                      <AnimatedCounter value={156420} />
                    </span>
                    <span className="text-xl opacity-20 tracking-wider">CARROT</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <ArrowUpRight size={13} style={{ color: "#3CFF8F" }} strokeWidth={1.5} />
                    <span className="text-xs mono" style={{ color: "#3CFF8F", opacity: 0.6 }}>+12.4%</span>
                    <span className="text-xs opacity-25">vs last cycle</span>
                  </div>
                </div>

                {/* Actions - Minimal and intentional */}
                <div className="grid grid-cols-3 gap-3.5">
                  <Button variant="secondary" color="#3CFF8F" size="md" fullWidth>
                    <div className="flex items-center justify-center gap-2">
                      <ArrowDownRight size={15} strokeWidth={1.5} />
                      <span className="text-xs tracking-wider">CLAIM</span>
                    </div>
                  </Button>
                  <Button variant="secondary" color="#FF6A00" size="md" fullWidth>
                    <div className="flex items-center justify-center gap-2">
                      <RotateCw size={15} strokeWidth={1.5} />
                      <span className="text-xs tracking-wider">REINVEST</span>
                    </div>
                  </Button>
                  <Button variant="secondary" color="#00E5FF" size="md" fullWidth>
                    <div className="flex items-center justify-center gap-2">
                      <ArrowUpRight size={15} strokeWidth={1.5} />
                      <span className="text-xs tracking-wider">BOOST</span>
                    </div>
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Activity log - Compact terminal */}
          <div>
            <GlassCard depth="medium">
              <div className="p-7">
                <div className="mb-5 pb-4" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                  <span className="text-xs tracking-widest opacity-30">RECENT ACTIVITY</span>
                </div>
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-start justify-between py-2.5">
                      <div>
                        <p className="text-xs mb-1 opacity-70">{tx.type}</p>
                        <p className="text-xs opacity-25">{tx.time}</p>
                      </div>
                      <span
                        className="text-sm mono"
                        style={{
                          color: tx.positive ? "#3CFF8F" : "rgba(255, 255, 255, 0.3)",
                          fontWeight: 200,
                        }}
                      >
                        {tx.positive ? "+" : ""}{tx.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
