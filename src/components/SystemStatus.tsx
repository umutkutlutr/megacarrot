import { motion } from "motion/react";
import { PixelPanel } from "./PixelPanel";
import { AnimatedCounter } from "./AnimatedCounter";
import { useState, useEffect } from "react";

export function SystemStatus() {
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      label: "OUTPUT",
      value: 2805,
      unit: "C/HR",
      color: "#ff6600",
      icon: "▲",
    },
    {
      label: "BALANCE",
      value: 156420,
      unit: "CRRT",
      color: "#33ff66",
      icon: "■",
    },
    {
      label: "EFFICIENCY",
      value: 92,
      unit: "%",
      color: "#00ccff",
      icon: "●",
    },
  ];

  return (
    <section className="pt-24 pb-16">
      <div className="grid-container">
        {/* System header */}
        <div className="mb-8 text-center">
          <div className="pixel text-xs mb-2" style={{ color: "#666666" }}>
            // AGRICULTURAL INFRASTRUCTURE CONTROL //
          </div>
          <h1 className="pixel mb-4" style={{ color: "#ff6600" }}>
            MEGACARROT
          </h1>
          <div className="flex items-center justify-center gap-1">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-0.5 bg-[#333333]"
                animate={{
                  backgroundColor: i % 10 === (activeMetric * 3) % 10 ? "#ff6600" : "#333333",
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.1 }}
            >
              <PixelPanel>
                <div className="p-6 relative overflow-hidden">
                  {/* Animated background pulse */}
                  {activeMetric === index && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ backgroundColor: metric.color }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}

                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <span className="mono text-xs" style={{ color: "#666666" }}>
                      {metric.label}
                    </span>
                    <motion.span
                      style={{ color: metric.color, fontSize: "16px" }}
                      animate={{
                        scale: activeMetric === index ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {metric.icon}
                    </motion.span>
                  </div>

                  {/* Value */}
                  <div className="mb-2 relative z-10">
                    <span className="mono" style={{ color: metric.color, fontSize: "32px" }}>
                      <AnimatedCounter value={metric.value} />
                    </span>
                  </div>

                  {/* Unit */}
                  <div className="mono text-xs relative z-10" style={{ color: "#666666" }}>
                    {metric.unit}
                  </div>
                </div>

                {/* Bottom bar with pixel animation */}
                <div className="h-2 border-t-2 border-[#333333] flex" style={{ backgroundColor: "#141414" }}>
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 h-full"
                      style={{ backgroundColor: metric.color }}
                      animate={{
                        opacity: activeMetric === index && i % 3 === 0 ? [0.1, 0.5, 0.1] : 0.1,
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </div>
              </PixelPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}