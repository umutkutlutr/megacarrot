import { motion } from "motion/react";
import { useState } from "react";
import { PixelPanel } from "./PixelPanel";
import { PixelButton } from "./PixelButton";
import { PixelOperativeCard } from "./PixelOperativeCard";
import { Plus, Lock, ChevronLeft, ChevronRight } from "lucide-react";

interface Farmer {
  id: number;
  name: string;
  level: number;
  boost: number;
  unlocked: boolean;
  color: string;
  specialty: string;
  slotSize: number; // How many slots this farmer occupies
}

interface FarmerSlotSectionProps {
  maxSlots: number; // Based on farm tier
  farmers: Farmer[];
  onHireFarmer: () => void;
  onAssignFarmer: (farmerId: number) => void;
  onUpgradeFarmer: (farmerId: number) => void;
}

export function FarmerSlotSection({
  maxSlots,
  farmers,
  onHireFarmer,
  onAssignFarmer,
  onUpgradeFarmer,
}: FarmerSlotSectionProps) {
  const [selectedFarmer, setSelectedFarmer] = useState(0);

  const assignedFarmers = farmers.filter((f) => f.unlocked);
  const totalSlotsUsed = assignedFarmers.reduce((sum, f) => sum + f.slotSize, 0);
  const availableSlots = maxSlots - totalSlotsUsed;

  return (
    <section className="py-16 border-t-4 border-[#333333]" id="farmers">
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
              className="w-4 h-4 bg-[#33ff66] pixel-shadow-sm"
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <h2 className="pixel" style={{ color: "#33ff66" }}>
              FARMER MANAGEMENT
            </h2>
            <div className="flex-1 h-px bg-[#333333]" />
          </div>
          <div className="mono text-xs" style={{ color: "#666666" }}>
            // WORKFORCE ALLOCATION SYSTEM
          </div>
        </motion.div>

        {/* Slot capacity overview */}
        <div className="mb-8">
          <PixelPanel variant="dark">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="mono text-xs mb-2" style={{ color: "#666666" }}>
                    FARM CAPACITY
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="pixel" style={{ color: "#33ff66", fontSize: "32px" }}>
                      {totalSlotsUsed}
                    </span>
                    <span className="pixel" style={{ color: "#666666", fontSize: "24px" }}>
                      / {maxSlots}
                    </span>
                    <span className="mono text-sm" style={{ color: "#666666" }}>
                      SLOTS USED
                    </span>
                  </div>
                </div>

                <div>
                  <div className="mono text-xs mb-2" style={{ color: "#666666" }}>
                    AVAILABLE SLOTS
                  </div>
                  <motion.div
                    className="pixel"
                    style={{
                      color: availableSlots > 0 ? "#33ff66" : "#ff6600",
                      fontSize: "32px",
                    }}
                    animate={
                      availableSlots === 0
                        ? {
                            textShadow: ["0 0 8px rgba(255, 102, 0, 0.5)", "0 0 12px rgba(255, 102, 0, 0.8)", "0 0 8px rgba(255, 102, 0, 0.5)"],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {availableSlots}
                  </motion.div>
                </div>
              </div>

              {/* Visual slot representation */}
              <div className="mb-4">
                <div className="mono text-xs mb-3" style={{ color: "#666666" }}>
                  SLOT ALLOCATION
                </div>
                <div className="flex gap-2">
                  {[...Array(maxSlots)].map((_, i) => {
                    let slotFarmer: Farmer | null = null;
                    let slotIndex = 0;
                    let currentSlot = 0;

                    for (const farmer of assignedFarmers) {
                      if (i >= currentSlot && i < currentSlot + farmer.slotSize) {
                        slotFarmer = farmer;
                        slotIndex = i - currentSlot;
                        break;
                      }
                      currentSlot += farmer.slotSize;
                    }

                    const isOccupied = slotFarmer !== null;

                    return (
                      <motion.div
                        key={i}
                        className="flex-1 h-20 border-4 flex items-center justify-center relative overflow-hidden"
                        style={{
                          backgroundColor: isOccupied ? slotFarmer!.color : "#0a0a0a",
                          borderColor: isOccupied ? slotFarmer!.color : "#333333",
                        }}
                        animate={
                          isOccupied
                            ? {
                                boxShadow: [
                                  `2px 2px 0 ${slotFarmer!.color}40`,
                                  `4px 4px 0 ${slotFarmer!.color}80`,
                                  `2px 2px 0 ${slotFarmer!.color}40`,
                                ],
                              }
                            : {}
                        }
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                      >
                        {isOccupied && slotIndex === 0 && (
                          <span className="mono text-xs font-bold" style={{ color: "#0a0a0a" }}>
                            F{slotFarmer!.id}
                          </span>
                        )}
                        {isOccupied && slotIndex > 0 && (
                          <motion.div
                            className="w-1 h-1 bg-[#0a0a0a]"
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                  {/* Locked slots */}
                  {[...Array(Math.max(0, 7 - maxSlots))].map((_, i) => (
                    <div
                      key={`locked-${i}`}
                      className="flex-1 h-20 border-4 border-[#222222] bg-[#0a0a0a] flex items-center justify-center opacity-20"
                    >
                      <Lock size={16} style={{ color: "#666666" }} strokeWidth={2} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Slot info */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="border-2 border-[#333333] bg-[#0a0a0a] p-3 text-center">
                  <div className="mono text-xs mb-1" style={{ color: "#666666" }}>
                    ACTIVE FARMERS
                  </div>
                  <div className="pixel" style={{ color: "#33ff66", fontSize: "20px" }}>
                    {assignedFarmers.length}
                  </div>
                </div>
                <div className="border-2 border-[#333333] bg-[#0a0a0a] p-3 text-center">
                  <div className="mono text-xs mb-1" style={{ color: "#666666" }}>
                    TOTAL BOOST
                  </div>
                  <div className="pixel" style={{ color: "#ff6600", fontSize: "20px" }}>
                    +{assignedFarmers.reduce((sum, f) => sum + f.boost, 0)}%
                  </div>
                </div>
                <div className="border-2 border-[#333333] bg-[#0a0a0a] p-3 text-center">
                  <div className="mono text-xs mb-1" style={{ color: "#666666" }}>
                    EFFICIENCY
                  </div>
                  <div className="pixel" style={{ color: "#00ccff", fontSize: "20px" }}>
                    {Math.floor((totalSlotsUsed / maxSlots) * 100)}%
                  </div>
                </div>
              </div>
            </div>
          </PixelPanel>
        </div>

        {/* Farmer carousel */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="mono text-xs" style={{ color: "#666666" }}>
              YOUR WORKFORCE ({farmers.length} FARMERS)
            </div>
            <div className="flex gap-2">
              <PixelButton
                variant="cyan"
                size="sm"
                onClick={() => setSelectedFarmer(Math.max(0, selectedFarmer - 1))}
                disabled={selectedFarmer === 0}
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </PixelButton>
              <PixelButton
                variant="cyan"
                size="sm"
                onClick={() => setSelectedFarmer(Math.min(farmers.length - 1, selectedFarmer + 1))}
                disabled={selectedFarmer === farmers.length - 1}
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </PixelButton>
            </div>
          </div>

          {/* Farmer display */}
          <div className="flex justify-center">
            {farmers[selectedFarmer] && (
              <PixelOperativeCard
                {...farmers[selectedFarmer]}
                isActive={true}
                onAssign={() => onAssignFarmer(farmers[selectedFarmer].id)}
                onUpgrade={() => onUpgradeFarmer(farmers[selectedFarmer].id)}
              />
            )}
          </div>
        </div>

        {/* Hire new farmer */}
        <div className="text-center">
          <PixelButton
            variant="green"
            size="lg"
            onClick={onHireFarmer}
            disabled={availableSlots === 0}
          >
            <div className="flex items-center justify-center gap-3">
              <Plus size={24} strokeWidth={3} />
              <span>HIRE NEW FARMER</span>
              {availableSlots === 0 && (
                <span className="mono text-xs">
                  (UPGRADE FARM FOR MORE SLOTS)
                </span>
              )}
            </div>
          </PixelButton>
        </div>
      </div>
    </section>
  );
}
