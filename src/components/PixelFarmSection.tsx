import { motion } from "motion/react";
import { PixelFarmCard } from "./PixelFarmCard";
import { useState } from "react";

export function PixelFarmSection() {
  const [farms] = useState([
    {
      level: 1,
      name: "GENESIS PLOT",
      production: 125,
      unlocked: true,
      color: "#ff6600",
      complexity: 1,
      efficiency: 85,
      cost: 2500,
    },
    {
      level: 2,
      name: "NEON FIELD",
      production: 340,
      unlocked: true,
      color: "#33ff66",
      complexity: 2,
      efficiency: 92,
      cost: 2500,
    },
    {
      level: 3,
      name: "CYBER GROVE",
      production: 780,
      unlocked: true,
      color: "#00ccff",
      complexity: 3,
      efficiency: 88,
      cost: 2500,
    },
    {
      level: 4,
      name: "QUANTUM PATCH",
      production: 1560,
      unlocked: true,
      color: "#ff6600",
      complexity: 4,
      efficiency: 95,
      cost: 2500,
    },
    {
      level: 5,
      name: "NEURAL GARDEN",
      production: 3200,
      unlocked: false,
      color: "#33ff66",
      complexity: 5,
      efficiency: 0,
      cost: 5000,
    },
    {
      level: 6,
      name: "VOID PLANTATION",
      production: 7800,
      unlocked: false,
      color: "#00ccff",
      complexity: 6,
      efficiency: 0,
      cost: 8000,
    },
    {
      level: 7,
      name: "OMEGA SANCTUM",
      production: 18500,
      unlocked: false,
      color: "#ff6600",
      complexity: 7,
      efficiency: 0,
      cost: 12000,
    },
  ]);

  return (
    <section className="py-16 border-t-4 border-[#333333]" id="farms">
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
              className="w-4 h-4 bg-[#ff6600] pixel-shadow-sm"
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <h2 className="pixel" style={{ color: "#ff6600" }}>
              FARM PRODUCTION TIERS
            </h2>
            <div className="flex-1 h-px bg-[#333333]" />
          </div>
          <div className="mono text-xs" style={{ color: "#666666" }}>
            // AGRICULTURAL OUTPUT INFRASTRUCTURE
          </div>
        </motion.div>

        {/* Farm platform grid */}
        <div className="space-y-3">
          {farms.map((farm, index) => (
            <PixelFarmCard
              key={farm.level}
              level={farm.level}
              name={farm.name}
              production={farm.production}
              efficiency={farm.efficiency}
              complexity={farm.complexity}
              unlocked={farm.unlocked}
              color={farm.color}
              cost={farm.cost}
              onBoost={() => console.log(`Boosting ${farm.name}`)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}