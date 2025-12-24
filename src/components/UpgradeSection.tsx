import { motion } from "motion/react";
import { UpgradeCard } from "./UpgradeCard";
import { Zap, TrendingUp, Clock, Target } from "lucide-react";

const upgradeCategories = {
  Production: [
    {
      id: 1,
      name: "Quantum Accelerator",
      description: "Increases all farm production output by 25%",
      level: 3,
      maxLevel: 10,
      cost: 3500,
      color: "#FF6A00",
      icon: Zap,
    },
    {
      id: 5,
      name: "Neon Fertilizer",
      description: "Tier 1-3 farms receive 35% production bonus",
      level: 5,
      maxLevel: 7,
      cost: 6800,
      color: "#FF6A00",
      icon: Zap,
    },
  ],
  Efficiency: [
    {
      id: 2,
      name: "Neural Optimizer",
      description: "Reduces upgrade costs by 15% system-wide",
      level: 2,
      maxLevel: 5,
      cost: 2800,
      color: "#3CFF8F",
      icon: Target,
    },
    {
      id: 6,
      name: "Void Conduit",
      description: "Unlocks passive production during offline",
      level: 0,
      maxLevel: 3,
      cost: 12000,
      color: "#3CFF8F",
      icon: Target,
    },
  ],
  Speed: [
    {
      id: 3,
      name: "Time Compression",
      description: "Decreases production intervals by 10%",
      level: 4,
      maxLevel: 8,
      cost: 4200,
      color: "#00E5FF",
      icon: Clock,
    },
  ],
  Boost: [
    {
      id: 4,
      name: "Farmer Synergy",
      description: "Enhances farmer bonuses by 20%",
      level: 1,
      maxLevel: 5,
      cost: 5000,
      color: "#FF6A00",
      icon: TrendingUp,
    },
  ],
};

export function UpgradeSection() {
  return (
    <section className="snap-section relative" style={{ paddingTop: "calc(var(--section-gap) * 0.75)", paddingBottom: "calc(var(--section-gap) * 0.75)" }}>
      <div className="grid-container">
        {/* Section header - Support level */}
        <motion.div
          className="col-span-12 mb-12 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mb-4" style={{ fontSize: "1.625rem", fontWeight: 300, letterSpacing: "-0.02em" }}>
            PROTOCOL UPGRADES
          </h2>
          <div 
            className="h-px w-28 mx-auto" 
            style={{ background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent)" }} 
          />
        </motion.div>

        {/* Grouped upgrades - Reduce list feeling */}
        <div className="col-span-12 space-y-10">
          {Object.entries(upgradeCategories).map(([category, upgrades], catIndex) => (
            <div key={category}>
              {/* Category label - very subtle */}
              <div className="mb-5 flex items-center gap-5">
                <div className="h-px flex-1" style={{ background: "rgba(255, 255, 255, 0.02)" }} />
                <span className="text-xs tracking-widest opacity-15">{category.toUpperCase()}</span>
                <div className="h-px flex-1" style={{ background: "rgba(255, 255, 255, 0.02)" }} />
              </div>

              {/* Category upgrades */}
              <div className="space-y-3.5">
                {upgrades.map((upgrade, index) => {
                  const Icon = upgrade.icon;
                  return (
                    <UpgradeCard
                      key={upgrade.id}
                      icon={<Icon size={20} strokeWidth={1.5} />}
                      title={upgrade.name}
                      category={category as any}
                      description={upgrade.description}
                      level={upgrade.level}
                      maxLevel={upgrade.maxLevel}
                      cost={upgrade.cost}
                      color={upgrade.color}
                      onUpgrade={() => console.log(`Upgrading ${upgrade.name}`)}
                      index={catIndex * 2 + index}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Depth separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent)",
          boxShadow: "0 1px 0 rgba(0, 0, 0, 0.5)",
        }}
      />
    </section>
  );
}
