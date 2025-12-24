import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";
import { Button } from "./Button";
import { Circle } from "lucide-react";

export type UpgradeCategory = "Production" | "Efficiency" | "Speed" | "Boost";

interface UpgradeCardProps {
  icon: React.ReactNode;
  title: string;
  category: UpgradeCategory;
  description: string;
  level: number;
  maxLevel: number;
  cost: number;
  color: string;
  onUpgrade?: () => void;
  disabled?: boolean;
  index?: number;
}

export function UpgradeCard({
  icon,
  title,
  category,
  description,
  level,
  maxLevel,
  cost,
  color,
  onUpgrade,
  disabled = false,
  index = 0,
}: UpgradeCardProps) {
  const isMaxLevel = level >= maxLevel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: index * 0.015, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard hoverEffect={!isMaxLevel} depth="medium">
        <div className="flex items-center gap-9 px-9 py-8">
          {/* Left: Icon - Subtle */}
          <div
            className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
            style={{
              background: `${color}06`,
              border: `0.5px solid ${color}15`,
            }}
          >
            <div style={{ color, opacity: 0.6 }}>{icon}</div>
          </div>

          {/* Center: Content - Compact */}
          <div className="flex-1 min-w-0">
            <h4 className="tracking-tight text-sm mb-1.5 opacity-90">{title}</h4>
            <p className="text-xs opacity-30 mb-4 leading-relaxed">{description}</p>

            {/* Level indicators - Very quiet */}
            <div className="flex items-center gap-2.5">
              <span className="text-xs opacity-15 tracking-wider mono">
                {level}/{maxLevel}
              </span>
              <div className="flex gap-1">
                {[...Array(maxLevel)].map((_, i) => (
                  <Circle
                    key={i}
                    size={4}
                    fill={i < level ? color : "transparent"}
                    stroke={color}
                    strokeWidth={0.5}
                    style={{
                      opacity: i < level ? 0.5 : 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Action - Compact */}
          <div className="flex-shrink-0" style={{ width: "110px" }}>
            {!isMaxLevel ? (
              <Button
                variant="secondary"
                color={color}
                onClick={onUpgrade}
                disabled={disabled}
                fullWidth
                size="sm"
              >
                <div className="flex flex-col items-center">
                  <div className="text-xs tracking-wider opacity-70">UPGRADE</div>
                  <div className="text-xs mono opacity-30">{cost.toLocaleString()}</div>
                </div>
              </Button>
            ) : (
              <div
                className="py-2.5 text-center rounded-lg text-xs"
                style={{
                  border: `0.5px solid ${color}15`,
                  color: color,
                  opacity: 0.3,
                }}
              >
                MAX
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
