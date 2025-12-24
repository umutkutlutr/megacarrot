import { motion } from "motion/react";
import { PixelPanel } from "./PixelPanel";
import { PixelButton } from "./PixelButton";
import { PixelFarmerAvatar } from "./PixelFarmerAvatar";
import { Lock, TrendingUp, Play, ArrowRight } from "lucide-react";

interface PixelOperativeCardProps {
  id: number;
  name: string;
  level: number;
  boost: number;
  unlocked: boolean;
  color: string;
  specialty: string;
  imageUrl?: string;
  onUpgrade?: () => void;
  isActive?: boolean;
  onAssign?: () => void;
}

export function PixelOperativeCard({
  id,
  name,
  level,
  boost,
  unlocked,
  color,
  specialty,
  imageUrl,
  onUpgrade,
  isActive = false,
  onAssign,
}: PixelOperativeCardProps) {
  return (
    <motion.div
      className={`w-80 ${!isActive ? "opacity-40" : ""}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: isActive ? 1 : 0.4,
        scale: isActive ? 1 : 0.95,
      }}
      transition={{ duration: 0.1 }}
    >
      <PixelPanel variant={isActive ? "default" : "dark"}>
        {/* Avatar section */}
        <div className="relative h-64 border-b-2 border-[#333333] overflow-hidden">
          <PixelFarmerAvatar id={id} color={color} unlocked={unlocked} />

          {/* Level badge */}
          <div
            className="absolute top-4 right-4 w-12 h-12 border-2 flex items-center justify-center pixel-shadow-sm"
            style={{
              backgroundColor: unlocked ? color : "#141414",
              borderColor: unlocked ? "#0a0a0a" : "#333333",
            }}
          >
            <span className="pixel text-lg" style={{ color: unlocked ? "#0a0a0a" : "#333333" }}>
              {unlocked ? level : "?"}
            </span>
          </div>
        </div>

        {/* Info section */}
        <div className="p-6">
          <h3 className="pixel text-xs mb-2" style={{ color: unlocked ? "#f5f5f5" : "#666666" }}>
            {name}
          </h3>
          <div className="mono text-xs mb-6" style={{ color: "#666666" }}>
            {specialty}
          </div>

          {unlocked && (
            <>
              {/* Stats */}
              <div className="mb-6 p-4 border-2 border-[#333333] bg-[#141414]">
                <div className="flex items-center justify-between mb-2">
                  <span className="mono text-xs" style={{ color: "#666666" }}>
                    BOOST
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(Math.min(5, Math.floor(boost / 25)))].map((_, i) => (
                      <div key={i} className="w-2 h-2" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
                <div className="mono text-2xl" style={{ color }}>
                  +{boost}
                  <span className="text-sm" style={{ color: "#666666" }}>
                    %
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <PixelButton
                  variant="green"
                  size="sm"
                  onClick={onAssign}
                  fullWidth
                  disabled={!unlocked}
                >
                  <div className="flex items-center justify-center gap-1">
                    <Play size={14} strokeWidth={2.5} />
                    <span>ASSIGN</span>
                  </div>
                </PixelButton>
                <PixelButton
                  variant="cyan"
                  size="sm"
                  onClick={onUpgrade}
                  fullWidth
                  disabled={!unlocked}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>BOOST</span>
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </div>
                </PixelButton>
              </div>
            </>
          )}

          {!unlocked && (
            <div
              className="py-4 text-center border-2 border-[#333333] bg-[#141414] mono text-xs"
              style={{ color: "#666666" }}
            >
              LOCKED
            </div>
          )}
        </div>
      </PixelPanel>
    </motion.div>
  );
}