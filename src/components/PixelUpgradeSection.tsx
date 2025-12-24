import { motion } from "motion/react";
import { PixelPanel } from "./PixelPanel";
import { PixelButton } from "./PixelButton";
import { ArrowRight } from "lucide-react";

interface PixelUpgradeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  level: number;
  maxLevel: number;
  cost: number;
  color: string;
  onUpgrade: () => void;
  index: number;
}

function PixelUpgradeCard({
  icon,
  title,
  description,
  level,
  maxLevel,
  cost,
  color,
  onUpgrade,
  index,
}: PixelUpgradeCardProps) {
  const isMaxLevel = level >= maxLevel;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03, duration: 0.1 }}
    >
      <PixelPanel variant="dark">
        <div className="flex items-center p-4 gap-4">
          {/* Icon */}
          <div
            className="w-16 h-16 border-2 border-[#333333] flex items-center justify-center"
            style={{ backgroundColor: "#0a0a0a" }}
          >
            <div style={{ color }}>{icon}</div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="mono" style={{ color, fontSize: "14px" }}>
                {title}
              </h3>
              <div className="flex gap-1">
                {[...Array(maxLevel)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 border border-[#333333]"
                    style={{
                      backgroundColor: i < level ? color : "transparent",
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="mono text-xs" style={{ color: "#999999" }}>
              {description}
            </div>
          </div>

          {/* Level */}
          <div className="text-center">
            <div className="mono text-xs mb-1" style={{ color: "#666666" }}>
              LVL
            </div>
            <div className="mono" style={{ color, fontSize: "18px" }}>
              {level}/{maxLevel}
            </div>
          </div>

          {/* Cost & button */}
          <div className="flex flex-col gap-2 w-32">
            <div className="mono text-xs text-center" style={{ color: "#666666" }}>
              {isMaxLevel ? "MAX" : `${cost.toLocaleString()} C`}
            </div>
            <PixelButton
              variant={isMaxLevel ? "gray" : "cyan"}
              size="sm"
              onClick={onUpgrade}
              disabled={isMaxLevel}
              fullWidth
            >
              {isMaxLevel ? "MAX" : "UPGRADE"}
            </PixelButton>
          </div>
        </div>
      </PixelPanel>
    </motion.div>
  );
}

export function PixelUpgradeSection() {
  const upgrades = [
    {
      id: 1,
      name: "QUANTUM ACCELERATOR",
      description: "+25% farm production output",
      level: 3,
      maxLevel: 10,
      cost: 3500,
      color: "#ff6600",
    },
    {
      id: 2,
      name: "NEURAL OPTIMIZER",
      description: "-15% upgrade costs",
      level: 2,
      maxLevel: 5,
      cost: 2800,
      color: "#33ff66",
    },
    {
      id: 3,
      name: "TIME COMPRESSION",
      description: "-10% production intervals",
      level: 4,
      maxLevel: 8,
      cost: 4200,
      color: "#00ccff",
    },
    {
      id: 4,
      name: "FARMER SYNERGY",
      description: "+20% farmer bonuses",
      level: 1,
      maxLevel: 5,
      cost: 5000,
      color: "#ff6600",
    },
    {
      id: 5,
      name: "NEON FERTILIZER",
      description: "+35% bonus for Tier 1-3",
      level: 5,
      maxLevel: 7,
      cost: 6800,
      color: "#33ff66",
    },
    {
      id: 6,
      name: "VOID CONDUIT",
      description: "Offline production enabled",
      level: 0,
      maxLevel: 3,
      cost: 12000,
      color: "#00ccff",
    },
  ];

  return (
    <section className="py-16 border-t-4 border-[#333333]" id="upgrades">
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
              className="w-4 h-4 bg-[#00ccff] pixel-shadow-sm"
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <h2 className="pixel" style={{ color: "#00ccff" }}>
              PROTOCOL UPGRADES
            </h2>
            <div className="flex-1 h-px bg-[#333333]" />
          </div>
          <div className="mono text-xs" style={{ color: "#666666" }}>
            // SYSTEM ENHANCEMENT TERMINAL
          </div>
        </motion.div>

        {/* Upgrade list */}
        <div className="space-y-2">
          {upgrades.map((upgrade, index) => (
            <PixelUpgradeCard
              key={upgrade.id}
              icon={<ArrowRight size={24} strokeWidth={2} />}
              title={upgrade.name}
              description={upgrade.description}
              level={upgrade.level}
              maxLevel={upgrade.maxLevel}
              cost={upgrade.cost}
              color={upgrade.color}
              onUpgrade={() => console.log(`Upgrading ${upgrade.name}`)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
