import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { PixelPanel } from "./PixelPanel";
import { PixelButton } from "./PixelButton";
import { ArrowUp, TrendingUp, Users } from "lucide-react";
import { PixelFarmGraphic } from "./PixelFarmGraphic";

interface SingleFarmCardProps {
  tier: number;
  production: number;
  level: number;
  upgradeCost: number;
  farmerSlots: number;
  assignedFarmers: number;
  onUpgrade: () => void;
}

export function SingleFarmCard({
  tier,
  production,
  level,
  upgradeCost,
  farmerSlots,
  assignedFarmers,
  onUpgrade,
}: SingleFarmCardProps) {
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings((prev) => prev + production / 10);
    }, 1000);
    return () => clearInterval(interval);
  }, [production]);

  const tierColors = [
    "#ff6600", // Tier 1
    "#ff8800",
    "#33ff66",
    "#00ccff",
    "#ff00ff",
    "#ffff00",
    "#ff0066", // Tier 7
  ];

  const tierNames = [
    "MICRO PLOT",
    "SMALL FARM",
    "MEDIUM FARM",
    "LARGE FARM",
    "INDUSTRIAL FARM",
    "MEGA COMPLEX",
    "AGRICULTURAL EMPIRE",
  ];

  const color = tierColors[tier - 1];
  const name = tierNames[tier - 1];
  const canUpgrade = tier < 7;

  return (
    <div className="max-w-6xl mx-auto">
      <PixelPanel variant="default">
        <div className="grid grid-cols-12 gap-8 p-8">
          {/* Left: Farm visualization */}
          <div className="col-span-5">
            <div
              className="relative border-4 border-[#333333] overflow-hidden"
              style={{
                backgroundColor: "#0a0a0a",
                height: "400px",
              }}
            >
              {/* Farm graphic */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <PixelFarmGraphic tier={tier} size={tier === 7 ? 320 : 200 + tier * 20} />
                </motion.div>
              </div>

              {/* Tier badge */}
              <div className="absolute top-4 left-4">
                <div
                  className="border-4 px-4 py-2 pixel-shadow"
                  style={{
                    backgroundColor: color,
                    borderColor: "#0a0a0a",
                  }}
                >
                  <span className="pixel" style={{ color: "#0a0a0a", fontSize: "14px" }}>
                    TIER-{tier}
                  </span>
                </div>
              </div>

              {/* Size indicator */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="border-2 border-[#333333] bg-[#0a0a0a] p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="mono text-xs" style={{ color: "#666666" }}>
                      PLOT SIZE
                    </span>
                    <span className="mono text-xs" style={{ color }}>
                      {tier * 100}m²
                    </span>
                  </div>
                  <div className="h-2 border-2 border-[#333333] flex">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 h-full"
                        style={{
                          backgroundColor: i < tier ? color : "transparent",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info and controls */}
          <div className="col-span-7 flex flex-col">
            {/* Header */}
            <div className="mb-6">
              <h2 className="pixel mb-2" style={{ color, fontSize: "24px" }}>
                {name}
              </h2>
              <div className="mono text-xs" style={{ color: "#666666" }}>
                // YOUR AGRICULTURAL INFRASTRUCTURE
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Production rate */}
              <div className="border-4 border-[#333333] bg-[#141414] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={16} style={{ color: "#33ff66" }} strokeWidth={2} />
                  <span className="mono text-xs" style={{ color: "#666666" }}>
                    PRODUCTION/SEC
                  </span>
                </div>
                <motion.div
                  className="pixel"
                  style={{ color: "#33ff66", fontSize: "28px" }}
                  animate={{
                    textShadow: ["0 0 8px rgba(51, 255, 102, 0.3)", "0 0 12px rgba(51, 255, 102, 0.6)", "0 0 8px rgba(51, 255, 102, 0.3)"],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {production.toLocaleString()}
                </motion.div>
                <div className="mono text-xs mt-1" style={{ color: "#666666" }}>
                  CARROTS/SEC
                </div>
              </div>

              {/* Farm level */}
              <div className="border-4 border-[#333333] bg-[#141414] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowUp size={16} style={{ color: "#00ccff" }} strokeWidth={2} />
                  <span className="mono text-xs" style={{ color: "#666666" }}>
                    FARM LEVEL
                  </span>
                </div>
                <div className="pixel" style={{ color: "#00ccff", fontSize: "28px" }}>
                  {level}
                </div>
                <div className="mono text-xs mt-1" style={{ color: "#666666" }}>
                  UPGRADES APPLIED
                </div>
              </div>

              {/* Farmer capacity */}
              <div className="border-4 border-[#333333] bg-[#141414] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Users size={16} style={{ color: "#ff6600" }} strokeWidth={2} />
                  <span className="mono text-xs" style={{ color: "#666666" }}>
                    FARMER SLOTS
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="pixel" style={{ color: "#ff6600", fontSize: "28px" }}>
                    {assignedFarmers}
                  </span>
                  <span className="pixel" style={{ color: "#666666", fontSize: "20px" }}>
                    / {farmerSlots}
                  </span>
                </div>
                <div className="mono text-xs mt-1" style={{ color: "#666666" }}>
                  ACTIVE WORKERS
                </div>
              </div>

              {/* Current earnings */}
              <div className="border-4 border-[#333333] bg-[#141414] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <motion.div
                    className="w-3 h-3 bg-[#33ff66]"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="mono text-xs" style={{ color: "#666666" }}>
                    EARNINGS
                  </span>
                </div>
                <div className="pixel" style={{ color: "#33ff66", fontSize: "20px" }}>
                  +{Math.floor(earnings).toLocaleString()}
                </div>
                <div className="mono text-xs mt-1" style={{ color: "#666666" }}>
                  THIS SESSION
                </div>
              </div>
            </div>

            {/* Farmer slots visualization */}
            <div className="border-4 border-[#333333] bg-[#141414] p-4 mb-6">
              <div className="mono text-xs mb-3" style={{ color: "#666666" }}>
                WORKER ALLOCATION
              </div>
              <div className="flex gap-2">
                {[...Array(farmerSlots)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 h-16 border-4 flex items-center justify-center"
                    style={{
                      backgroundColor: i < assignedFarmers ? color : "#0a0a0a",
                      borderColor: i < assignedFarmers ? color : "#333333",
                    }}
                    animate={
                      i < assignedFarmers
                        ? {
                            boxShadow: [`2px 2px 0 ${color}40`, `4px 4px 0 ${color}80`, `2px 2px 0 ${color}40`],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  >
                    {i < assignedFarmers && (
                      <Users size={24} style={{ color: "#0a0a0a" }} strokeWidth={3} />
                    )}
                  </motion.div>
                ))}
                {farmerSlots < 7 && (
                  <div className="flex-1 h-16 border-4 border-[#222222] bg-[#0a0a0a] flex items-center justify-center opacity-30">
                    <span className="mono text-xs" style={{ color: "#666666" }}>
                      LOCKED
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Upgrade section */}
            <div className="mt-auto">
              {canUpgrade ? (
                <div className="border-4 border-[#ff6600] bg-[#141414] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="mono text-xs mb-2" style={{ color: "#666666" }}>
                        NEXT TIER UPGRADE
                      </div>
                      <div className="pixel" style={{ color: "#ff6600", fontSize: "18px" }}>
                        {tierNames[tier]} → {tierNames[tier]}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mono text-xs mb-2" style={{ color: "#666666" }}>
                        COST
                      </div>
                      <div className="pixel" style={{ color: "#ff6600", fontSize: "24px" }}>
                        {upgradeCost.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <PixelButton variant="orange" size="md" onClick={onUpgrade} fullWidth>
                    <div className="flex items-center justify-center gap-2">
                      <ArrowUp size={20} strokeWidth={2.5} />
                      <span>UPGRADE TO TIER-{tier + 1}</span>
                    </div>
                  </PixelButton>
                </div>
              ) : (
                <div className="border-4 border-[#33ff66] bg-[#141414] p-6 text-center">
                  <div className="pixel mb-2" style={{ color: "#33ff66", fontSize: "20px" }}>
                    MAXIMUM TIER ACHIEVED
                  </div>
                  <div className="mono text-xs" style={{ color: "#666666" }}>
                    Your farm has reached peak agricultural capacity
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </PixelPanel>
    </div>
  );
}
