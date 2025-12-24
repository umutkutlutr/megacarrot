import { motion } from "motion/react";
import { PixelPanel } from "./PixelPanel";
import { PixelButton } from "./PixelButton";
import { AnimatedCounter } from "./AnimatedCounter";
import { ArrowUpRight, ArrowDownRight, RotateCw } from "lucide-react";
import { useState, useEffect } from "react";

export function PixelVault() {
  const [scanlinePosition, setScanlinePosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePosition((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const transactions = [
    { id: 1, type: "FARM.PROD", amount: 1247, time: "02m", positive: true },
    { id: 2, type: "UPGRADE.COST", amount: -3500, time: "15m", positive: false },
    { id: 3, type: "OPERATIVE.BOOST", amount: 892, time: "01h", positive: true },
    { id: 4, type: "FARM.PROD", amount: 1247, time: "02h", positive: true },
    { id: 5, type: "SYSTEM.REWARD", amount: 2500, time: "04h", positive: true },
  ];

  return (
    <section className="py-16 pb-32 border-t-4 border-[#333333]" id="vault">
      <div className="grid-container">
        {/* Section header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className="w-4 h-4 bg-[#33ff66] pixel-shadow-sm"
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <h2 className="pixel" style={{ color: "#33ff66" }}>
              DIGITAL VAULT
            </h2>
            <div className="flex-1 h-px bg-[#333333]" />
          </div>
          <div className="mono text-xs" style={{ color: "#666666" }}>
            // PROTOCOL TREASURY ACCESS
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-4">
          {/* Main balance terminal */}
          <div className="col-span-2">
            <PixelPanel>
              <div className="p-8 relative overflow-hidden">
                {/* Animated scanline effect */}
                <motion.div
                  className="absolute left-0 right-0 h-px pointer-events-none z-20"
                  style={{
                    backgroundColor: "#33ff66",
                    opacity: 0.3,
                    top: `${scanlinePosition}%`,
                  }}
                />

                {/* Terminal header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-[#333333]">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-[#33ff66]"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="mono text-xs" style={{ color: "#666666" }}>
                      PROTOCOL.BALANCE
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2"
                        style={{ backgroundColor: i === 0 ? "#33ff66" : "#333333" }}
                        animate={{
                          backgroundColor: i === (Math.floor(scanlinePosition / 33) % 3) ? "#33ff66" : "#333333",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                </div>

                {/* Balance display */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="mono" style={{ color: "#33ff66", fontSize: "56px" }}>
                      <AnimatedCounter value={156420} />
                    </span>
                    <span className="mono text-lg" style={{ color: "#666666" }}>
                      CARROT
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mono text-sm" style={{ color: "#666666" }}>
                    <motion.div
                      animate={{ y: [-2, 0, -2] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowUpRight size={12} style={{ color: "#33ff66" }} />
                    </motion.div>
                    <span style={{ color: "#33ff66" }}>+12.4%</span>
                    <span>CYCLE.CHANGE</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-3 gap-4">
                  <PixelButton variant="green" size="md" fullWidth>
                    <div className="flex items-center justify-center gap-2">
                      <ArrowDownRight size={18} strokeWidth={2.5} />
                      <span>CLAIM</span>
                    </div>
                  </PixelButton>
                  <PixelButton variant="orange" size="md" fullWidth>
                    <div className="flex items-center justify-center gap-2">
                      <RotateCw size={18} strokeWidth={2.5} />
                      <span>REINVEST</span>
                    </div>
                  </PixelButton>
                  <PixelButton variant="cyan" size="md" fullWidth>
                    <div className="flex items-center justify-center gap-2">
                      <ArrowUpRight size={18} strokeWidth={2.5} />
                      <span>BOOST</span>
                    </div>
                  </PixelButton>
                </div>
              </div>

              {/* Bottom terminal bar */}
              <div className="h-3 border-t-2 border-[#333333] bg-[#141414] flex items-center px-2 gap-1">
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-px h-1.5"
                    style={{ backgroundColor: "#333333" }}
                    animate={{
                      backgroundColor: i % 5 === Math.floor(scanlinePosition / 20) % 5 ? "#33ff66" : "#333333",
                    }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </div>
            </PixelPanel>
          </div>

          {/* Transaction log */}
          <div>
            <PixelPanel variant="dark">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-[#333333]">
                  <motion.div
                    className="w-2 h-2 border border-[#666666]"
                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="mono text-xs" style={{ color: "#666666" }}>
                    ACTIVITY.LOG
                  </span>
                </div>

                <div className="space-y-3">
                  {transactions.map((tx, index) => (
                    <motion.div
                      key={tx.id}
                      className="flex items-center justify-between py-2 border-b border-[#222222]"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.2 }}
                    >
                      <div>
                        <div className="mono text-xs mb-1" style={{ color: "#f5f5f5" }}>
                          {tx.type}
                        </div>
                        <div className="mono text-xs" style={{ color: "#666666" }}>
                          {tx.time}
                        </div>
                      </div>
                      <motion.div
                        className="mono text-sm"
                        style={{
                          color: tx.positive ? "#33ff66" : "#999999",
                        }}
                        animate={tx.positive ? { opacity: [1, 0.7, 1] } : {}}
                        transition={tx.positive ? { duration: 2, repeat: Infinity } : {}}
                      >
                        {tx.positive ? "+" : ""}{tx.amount}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom bar */}
              <div className="h-2 border-t-2 border-[#333333]" style={{ backgroundColor: "#0a0a0a" }} />
            </PixelPanel>
          </div>
        </div>
      </div>
    </section>
  );
}