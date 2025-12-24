import { motion } from "motion/react";
import { FarmCard } from "./FarmCard";

const farmTiers = [
  {
    level: 1,
    name: "GENESIS PLOT",
    production: 125,
    unlocked: true,
    color: "#FF6A00",
    complexity: 1,
    efficiency: 85,
    cost: 2500,
  },
  {
    level: 2,
    name: "NEON FIELD",
    production: 340,
    unlocked: true,
    color: "#3CFF8F",
    complexity: 2,
    efficiency: 92,
    cost: 2500,
  },
  {
    level: 3,
    name: "CYBER GROVE",
    production: 780,
    unlocked: true,
    color: "#00E5FF",
    complexity: 3,
    efficiency: 88,
    cost: 2500,
  },
  {
    level: 4,
    name: "QUANTUM PATCH",
    production: 1560,
    unlocked: true,
    color: "#FF6A00",
    complexity: 4,
    efficiency: 95,
    cost: 2500,
  },
  {
    level: 5,
    name: "NEURAL GARDEN",
    production: 3200,
    unlocked: false,
    color: "#3CFF8F",
    complexity: 5,
    efficiency: 0,
    cost: 5000,
  },
  {
    level: 6,
    name: "VOID PLANTATION",
    production: 7800,
    unlocked: false,
    color: "#00E5FF",
    complexity: 6,
    efficiency: 0,
    cost: 8000,
  },
  {
    level: 7,
    name: "OMEGA SANCTUM",
    production: 18500,
    unlocked: false,
    color: "#FF6A00",
    complexity: 7,
    efficiency: 0,
    cost: 12000,
  },
];

export function FarmSection() {
  return (
    <section className="snap-section relative" style={{ paddingTop: "var(--section-gap)", paddingBottom: "var(--section-gap)" }}>
      <div className="grid-container">
        {/* Section header - DOMINANT */}
        <motion.div
          className="col-span-12 mb-16 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mb-4" style={{ fontSize: "2.25rem", fontWeight: 300, letterSpacing: "-0.02em" }}>
            FARM NETWORK
          </h2>
          <div 
            className="h-px w-40 mx-auto" 
            style={{ 
              background: "linear-gradient(90deg, transparent, rgba(255, 106, 0, 0.25), transparent)",
              boxShadow: "0 0 8px rgba(255, 106, 0, 0.15)"
            }} 
          />
        </motion.div>

        {/* Farm platforms - Physical architectural blocks */}
        <div className="col-span-12 space-y-4">
          {farmTiers.map((farm, index) => (
            <FarmCard
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

      {/* Depth separator - stronger */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)",
          boxShadow: "0 1px 0 rgba(0, 0, 0, 0.5)",
        }}
      />
    </section>
  );
}
