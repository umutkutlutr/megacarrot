import { motion } from "motion/react";
import { PixelPanel } from "./PixelPanel";
import { PixelButton } from "./PixelButton";
import { PixelFarmGraphic } from "./PixelFarmGraphic";
import { AnimatedCounter } from "./AnimatedCounter";
import { Lock } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface PixelFarmCardProps {
  level: number;
  name: string;
  production: number;
  efficiency: number;
  complexity: number;
  unlocked: boolean;
  color: string;
  cost: number;
  onUpgrade?: () => void;
  index?: number;
}

export function PixelFarmCard({
  level,
  name,
  production,
  efficiency,
  complexity,
  unlocked,
  color,
  cost,
  onUpgrade,
  index = 0,
}: PixelFarmCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.1 }}
    >
      <PixelPanel
        variant={unlocked ? "default" : "dark"}
        className={`${!unlocked ? "opacity-50" : ""}`}
      >
        <div className="flex items-center h-24">
          {/* Left: Tier number block with farm graphic */}
          <div
            className="h-full w-32 border-r-2 border-[#333333] flex flex-col items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: unlocked ? color + "20" : "#141414" }}
          >
            {unlocked ? (
              <>
                {/* Farm graphic background */}
                <div className="absolute inset-0">
                  <PixelFarmGraphic level={level} color={color} unlocked={unlocked} />
                </div>
                {/* Tier number overlay */}
                <div className="relative z-10 text-center">
                  <div className="pixel text-4xl mb-1" style={{ color, textShadow: "2px 2px 0 #0a0a0a" }}>
                    {level}
                  </div>
                  <div className="mono text-xs px-2 py-1" style={{ color: "#0a0a0a", backgroundColor: color }}>
                    TIER
                  </div>
                </div>
              </>
            ) : (
              <Lock size={32} style={{ color: "#333333" }} strokeWidth={2} />
            )}
          </div>

          {/* Center: Farm info */}
          <div className="flex-1 px-8 flex items-center justify-between">
            <div>
              <h3 className="pixel text-xs mb-3" style={{ color: unlocked ? "#f5f5f5" : "#666666" }}>
                {name}
              </h3>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(complexity)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2"
                    style={{ backgroundColor: unlocked ? color : "#333333" }}
                  />
                ))}
                {[...Array(7 - complexity)].map((_, i) => (
                  <div
                    key={i + complexity}
                    className="w-2 h-2 border border-[#333333]"
                    style={{ backgroundColor: "transparent" }}
                  />
                ))}
              </div>
            </div>

            {/* Production */}
            <div className="text-right">
              <div className="mono text-xs mb-1" style={{ color: "#666666" }}>
                PRODUCTION
              </div>
              {unlocked ? (
                <div className="mono text-2xl" style={{ color }}>
                  <AnimatedCounter value={production} />
                  <span className="text-xs ml-1" style={{ color: "#666666" }}>
                    C/HR
                  </span>
                </div>
              ) : (
                <div className="mono text-2xl" style={{ color: "#333333" }}>
                  ----
                </div>
              )}
            </div>

            {/* Efficiency */}
            <div className="text-right">
              <div className="mono text-xs mb-1" style={{ color: "#666666" }}>
                EFFICIENCY
              </div>
              {unlocked ? (
                <div className="mono text-2xl" style={{ color: "#33ff66" }}>
                  {efficiency}
                  <span className="text-xs" style={{ color: "#666666" }}>
                    %
                  </span>
                </div>
              ) : (
                <div className="mono text-2xl" style={{ color: "#333333" }}>
                  --
                </div>
              )}
            </div>
          </div>

          {/* Right: Boost button */}
          <div className="h-full w-40 border-l-2 border-[#333333] flex items-center justify-center px-4">
            {unlocked ? (
              <PixelButton
                variant="orange"
                size="sm"
                onClick={onUpgrade}
                fullWidth
              >
                <div className="flex items-center justify-center gap-2">
                  <span>UPGRADE</span>
                  <ArrowRight size={14} strokeWidth={2.5} />
                </div>
              </PixelButton>
            ) : (
              <div className="text-center mono text-xs" style={{ color: "#333333" }}>
                LOCKED
              </div>
            )}
          </div>
        </div>

        {/* Bottom status bar */}
        <div
          className="h-1 border-t-2 border-[#333333]"
          style={{
            backgroundColor: unlocked ? color : "#141414",
            opacity: unlocked ? 0.3 : 1,
          }}
        />
      </PixelPanel>
    </motion.div>
  );
}