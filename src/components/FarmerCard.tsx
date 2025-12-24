import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";
import { Button } from "./Button";
import { Lock, TrendingUp } from "lucide-react";

interface FarmerCardProps {
  id: number;
  name: string;
  level: number;
  boost: number;
  unlocked: boolean;
  color: string;
  specialty: string;
  imageUrl?: string;
  onUpgrade?: () => void;
  index?: number;
  isActive?: boolean;
  position?: "left" | "center" | "right";
}

export function FarmerCard({
  id,
  name,
  level,
  boost,
  unlocked,
  color,
  specialty,
  imageUrl,
  onUpgrade,
  index = 0,
  isActive = false,
  position = "center",
}: FarmerCardProps) {
  const getScale = () => {
    if (position === "center") return 1;
    return 0.88;
  };

  const getBlur = () => {
    if (position === "center") return 0;
    return 1.5;
  };

  const getOpacity = () => {
    if (position === "center") return 1;
    return 0.4;
  };

  return (
    <motion.div
      className="flex-shrink-0"
      style={{
        width: position === "center" ? "440px" : "380px",
        scrollSnapAlign: "start",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: getOpacity(),
        scale: getScale(),
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard 
        hoverEffect={position === "center" && unlocked} 
        depth={position === "center" ? "heavy" : "medium"}
      >
        <div style={{ filter: `blur(${getBlur()}px)` }}>
          {/* Avatar - Taller, more dramatic */}
          <div className="relative h-[420px] overflow-hidden">
            {unlocked ? (
              <>
                <img
                  src={imageUrl || "https://images.unsplash.com/photo-1560731911-140d10257f19?w=400"}
                  alt={name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E12] via-[#0B0E12]/60 to-transparent" />

                {/* Hologram shimmer - only on center */}
                {position === "center" && (
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(45deg, transparent 30%, ${color}06 50%, transparent 70%)`,
                    }}
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                  />
                )}
              </>
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${color}02, transparent)`,
                }}
              >
                <Lock size={72} style={{ color, opacity: 0.08 }} strokeWidth={0.5} />
              </div>
            )}

            {/* Level badge - cleaner */}
            <div
              className="absolute top-7 right-7 w-16 h-16 rounded-xl flex items-center justify-center mono text-2xl"
              style={{
                background: unlocked ? `${color}20` : "rgba(255, 255, 255, 0.03)",
                border: unlocked ? `1px solid ${color}35` : "1px solid rgba(255, 255, 255, 0.04)",
                fontWeight: 200,
              }}
            >
              {unlocked ? level : "?"}
            </div>
          </div>

          {/* Info - More spacious */}
          <div className="p-9">
            <h3 className="mb-1.5 text-lg tracking-tight opacity-90">{name}</h3>
            <p className="text-sm opacity-30 mb-8">{specialty}</p>

            {unlocked && (
              <>
                {/* Stats - Cleaner */}
                <div className="space-y-5 mb-7">
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-25 tracking-wider">BOOST</span>
                    <span className="mono text-3xl" style={{ color, fontWeight: 200 }}>
                      +{boost}%
                    </span>
                  </div>
                </div>

                {/* Upgrade button - only on center */}
                {position === "center" && (
                  <Button variant="secondary" color={color} onClick={onUpgrade} fullWidth size="md">
                    <div className="flex items-center justify-center gap-2">
                      <TrendingUp size={16} strokeWidth={1.5} />
                      <span className="tracking-wider text-xs">UPGRADE</span>
                    </div>
                  </Button>
                )}
              </>
            )}

            {!unlocked && (
              <div
                className="py-4 text-center rounded-xl text-sm"
                style={{
                  background: "rgba(255, 255, 255, 0.005)",
                  border: "0.5px solid rgba(255, 255, 255, 0.02)",
                  color: "rgba(255, 255, 255, 0.15)",
                }}
              >
                LOCKED
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
