import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";
import { Button } from "./Button";
import { AnimatedCounter } from "./AnimatedCounter";
import { Lock, Circle } from "lucide-react";

interface FarmCardProps {
  level: number;
  name: string;
  production: number;
  efficiency: number;
  complexity: number;
  unlocked: boolean;
  color: string;
  cost: number;
  onBoost?: () => void;
  index?: number;
}

export function FarmCard({
  level,
  name,
  production,
  efficiency,
  complexity,
  unlocked,
  color,
  cost,
  onBoost,
  index = 0,
}: FarmCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.02, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <GlassCard 
        hoverEffect={unlocked} 
        depth="heavy"
        className={`relative overflow-hidden ${!unlocked ? "opacity-40" : ""}`}
      >
        <div className="flex items-center gap-12 px-14 py-12">
          {/* Left: Tier Badge - Architectural Monument */}
          <div className="flex-shrink-0">
            <motion.div
              className="w-36 h-36 rounded-2xl flex flex-col items-center justify-center relative"
              style={{
                background: unlocked 
                  ? `linear-gradient(135deg, ${color}15, ${color}05)`
                  : "rgba(255, 255, 255, 0.015)",
                border: `1px solid ${unlocked ? color + '35' : 'rgba(255, 255, 255, 0.03)'}`,
                boxShadow: unlocked ? `inset 0 2px 0 ${color}10` : "none",
              }}
            >
              {unlocked ? (
                <>
                  <div className="text-6xl mono" style={{ color, fontWeight: 200, lineHeight: 1 }}>
                    {level}
                  </div>
                  <div 
                    className="text-xs tracking-widest mt-3 opacity-40" 
                    style={{ color }}
                  >
                    TIER
                  </div>
                </>
              ) : (
                <Lock size={42} style={{ color: "rgba(255, 255, 255, 0.06)" }} strokeWidth={1} />
              )}
            </motion.div>
          </div>

          {/* Center: Dominant Production Display */}
          <div className="flex-1 flex items-center gap-20">
            {/* Primary: Output Rate - DOMINANT */}
            <div className="flex-1">
              <div className="mb-7">
                <h3 className="mb-2 tracking-tight text-xl opacity-90">{name}</h3>
                <div className="flex items-center gap-2">
                  {[...Array(7)].map((_, i) => (
                    <Circle
                      key={i}
                      size={4}
                      fill={i < complexity && unlocked ? color : "transparent"}
                      stroke={i < complexity ? color : "rgba(255, 255, 255, 0.06)"}
                      strokeWidth={1}
                      style={{
                        opacity: i < complexity && unlocked ? 0.4 : 0.15,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Main Production - VISUAL ANCHOR */}
              <div>
                <p className="text-xs opacity-20 mb-2.5 tracking-widest">PRODUCTION OUTPUT</p>
                <div className="flex items-baseline gap-3">
                  {unlocked ? (
                    <>
                      <span className="text-6xl mono" style={{ color, fontWeight: 200, lineHeight: 0.9 }}>
                        <AnimatedCounter value={production} />
                      </span>
                      <span className="text-sm opacity-20 tracking-wider">CARROT/HR</span>
                    </>
                  ) : (
                    <span className="text-6xl mono opacity-05" style={{ fontWeight: 200 }}>
                      ─────
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Secondary: Efficiency - Subdued */}
            <div className="flex-shrink-0">
              <p className="text-xs opacity-20 mb-2.5 tracking-widest">EFFICIENCY</p>
              <div className="flex items-baseline gap-1.5">
                {unlocked ? (
                  <>
                    <span className="text-4xl mono" style={{ color: "#3CFF8F", fontWeight: 200 }}>
                      {efficiency}
                    </span>
                    <span className="text-xs opacity-15">%</span>
                  </>
                ) : (
                  <span className="text-4xl mono opacity-05" style={{ fontWeight: 200 }}>──</span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Boost Action - Restrained */}
          <div className="flex-shrink-0" style={{ width: "120px" }}>
            {unlocked ? (
              <Button 
                variant="secondary" 
                color={color} 
                onClick={onBoost} 
                fullWidth 
                size="md"
              >
                <div className="flex flex-col items-center gap-0.5">
                  <div className="text-xs tracking-widest opacity-70">BOOST</div>
                  <div className="text-xs mono opacity-30">{cost.toLocaleString()}</div>
                </div>
              </Button>
            ) : (
              <div
                className="py-4 text-center rounded-xl"
                style={{
                  background: "rgba(255, 255, 255, 0.005)",
                  border: "0.5px solid rgba(255, 255, 255, 0.02)",
                }}
              >
                <Lock size={14} className="mx-auto opacity-05" />
              </div>
            )}
          </div>
        </div>

        {/* Locked frost overlay - heavier */}
        {!unlocked && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: "rgba(11, 14, 18, 0.75)",
              backdropFilter: "blur(3px)",
            }}
          />
        )}
      </GlassCard>
    </motion.div>
  );
}
