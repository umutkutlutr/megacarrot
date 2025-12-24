import { motion } from "motion/react";
import { PixelPanel } from "./PixelPanel";
import { PixelButton } from "./PixelButton";

interface PixelUpgradeCardProps {
  icon: React.ReactNode;
  title: string;
  category: string;
  description: string;
  level: number;
  maxLevel: number;
  cost: number;
  color: string;
  onUpgrade?: () => void;
  disabled?: boolean;
  index?: number;
}

export function PixelUpgradeCard({
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
}: PixelUpgradeCardProps) {
  const isMaxLevel = level >= maxLevel;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.02, duration: 0.1 }}
    >
      <PixelPanel>
        <div className="flex items-center h-20">
          {/* Icon section */}
          <div
            className="h-full w-20 border-r-2 border-[#333333] flex items-center justify-center"
            style={{ backgroundColor: color + "20" }}
          >
            <div style={{ color }}>{icon}</div>
          </div>

          {/* Info section */}
          <div className="flex-1 px-6 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="pixel text-xs" style={{ color: "#f5f5f5" }}>
                  {title}
                </h3>
                <span className="mono text-xs px-2 py-0.5 border border-[#333333]" style={{ color }}>
                  {category.toUpperCase()}
                </span>
              </div>
              <p className="mono text-xs" style={{ color: "#666666" }}>
                {description}
              </p>
            </div>

            {/* Level progress */}
            <div className="flex items-center gap-3 mx-8">
              <div className="flex gap-1">
                {[...Array(maxLevel)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-6 border border-[#333333]"
                    style={{
                      backgroundColor: i < level ? color : "transparent",
                    }}
                  />
                ))}
              </div>
              <span className="mono text-xs" style={{ color: "#666666" }}>
                {level}/{maxLevel}
              </span>
            </div>
          </div>

          {/* Action section */}
          <div className="h-full w-32 border-l-2 border-[#333333] flex items-center justify-center px-4">
            {!isMaxLevel ? (
              <PixelButton variant="orange" size="sm" onClick={onUpgrade} disabled={disabled} fullWidth>
                <div>
                  <div className="text-xs">UPGRADE</div>
                  <div className="text-xs opacity-60">{cost}</div>
                </div>
              </PixelButton>
            ) : (
              <div className="text-center mono text-xs" style={{ color }}>
                MAX
              </div>
            )}
          </div>
        </div>

        {/* Bottom status bar */}
        <div
          className="h-1 border-t-2 border-[#333333]"
          style={{
            backgroundColor: color,
            opacity: 0.3,
          }}
        />
      </PixelPanel>
    </motion.div>
  );
}
