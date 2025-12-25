import { motion } from "motion/react";
import { TrendingUp, Lock, CheckCircle2, Zap } from "lucide-react";
import { TerminalModal, ModalSection } from "../TerminalModal";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: number;
  currentLevel: number;
}

export function UpgradeModal({
  isOpen,
  onClose,
  currentTier,
  currentLevel,
}: UpgradeModalProps) {
  const tiers = [
    {
      tier: 1,
      name: "PIONEER PLOT",
      slots: 1,
      multiplier: "1.0x",
      cost: "0.008 ETH",
      unlocked: true,
    },
    {
      tier: 2,
      name: "MODEST HOMESTEAD",
      slots: 2,
      multiplier: "1.2x",
      cost: "0.016 ETH",
      unlocked: currentTier >= 1,
    },
    {
      tier: 3,
      name: "PRODUCTIVE FARMLAND",
      slots: 3,
      multiplier: "1.5x",
      cost: "0.032 ETH",
      unlocked: currentTier >= 2,
    },
    {
      tier: 4,
      name: "COMMERCIAL OPERATION",
      slots: 4,
      multiplier: "1.8x",
      cost: "0.064 ETH",
      unlocked: currentTier >= 3,
    },
    {
      tier: 5,
      name: "INDUSTRIAL COMPLEX",
      slots: 5,
      multiplier: "2.2x",
      cost: "0.128 ETH",
      unlocked: currentTier >= 4,
    },
    {
      tier: 6,
      name: "CORPORATE PLANTATION",
      slots: 6,
      multiplier: "2.7x",
      cost: "0.256 ETH",
      unlocked: currentTier >= 5,
    },
    {
      tier: 7,
      name: "AGRICULTURAL EMPIRE",
      slots: 7,
      multiplier: "3.5x",
      cost: "0.512 ETH",
      unlocked: currentTier >= 6,
    },
  ];

  const handleUpgrade = (tier: number) => {
    console.log(`Upgrading to tier ${tier}`);
  };

  return (
    <TerminalModal
      isOpen={isOpen}
      onClose={onClose}
      title="FARM UPGRADE TERMINAL"
      subtitle="// EXPAND YOUR AGRICULTURAL OPERATION"
      accentColor="#ff6a00"
    >
      {/* Current Status */}
      <div
        className="border-2 border-[#ff6a00] p-6 mb-6"
        style={{
          backgroundColor: "rgba(255, 106, 0, 0.05)",
          boxShadow: "3px 3px 0 rgba(255, 106, 0, 0.2)",
        }}
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div
              className="mono text-xs mb-2"
              style={{ color: "#888888", letterSpacing: "0.08em" }}
            >
              CURRENT TIER
            </div>
            <div
              className="pixel"
              style={{
                fontSize: "28px",
                color: "#ff6a00",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              T{currentTier}
            </div>
          </div>
          <div>
            <div
              className="mono text-xs mb-2"
              style={{ color: "#888888", letterSpacing: "0.08em" }}
            >
              FARM LEVEL
            </div>
            <div
              className="pixel"
              style={{
                fontSize: "28px",
                color: "#33ff99",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {currentLevel}
            </div>
          </div>
        </div>
      </div>

      {/* Tier List */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {tiers.map((tierData) => {
          const isCurrent = tierData.tier === currentTier;
          const isNext = tierData.tier === currentTier + 1;
          const isLocked = !tierData.unlocked;

          return (
            <motion.div
              key={tierData.tier}
              className="border-2 relative"
              style={{
                borderColor: isCurrent
                  ? "#ff6a00"
                  : isNext
                  ? "#33ff99"
                  : isLocked
                  ? "#2a2a2a"
                  : "#555555",
                backgroundColor: isCurrent
                  ? "rgba(255, 106, 0, 0.08)"
                  : isNext
                  ? "rgba(51, 255, 153, 0.05)"
                  : "#0f0f0f",
                boxShadow: isCurrent
                  ? "3px 3px 0 rgba(255, 106, 0, 0.3)"
                  : isNext
                  ? "3px 3px 0 rgba(51, 255, 153, 0.2)"
                  : "2px 2px 0 rgba(0, 0, 0, 0.3)",
                padding: "20px",
                opacity: isLocked ? 0.5 : 1,
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isLocked ? 0.5 : 1, x: 0 }}
              transition={{ delay: tierData.tier * 0.05 }}
            >
              {/* Current Badge */}
              {isCurrent && (
                <div
                  className="absolute -top-2 left-4 border border-[#ff6a00] px-3 py-1"
                  style={{
                    backgroundColor: "#ff6a00",
                    boxShadow: "0 0 8px rgba(255, 106, 0, 0.6)",
                  }}
                >
                  <span
                    className="pixel text-xs"
                    style={{
                      color: "#0a0a0a",
                      letterSpacing: "0.08em",
                    }}
                  >
                    ACTIVE
                  </span>
                </div>
              )}

              {/* Next Badge */}
              {isNext && (
                <div
                  className="absolute -top-2 left-4 border border-[#33ff99] px-3 py-1"
                  style={{
                    backgroundColor: "#33ff99",
                    boxShadow: "0 0 8px rgba(51, 255, 153, 0.6)",
                  }}
                >
                  <span
                    className="pixel text-xs"
                    style={{
                      color: "#0a0a0a",
                      letterSpacing: "0.08em",
                    }}
                  >
                    AVAILABLE
                  </span>
                </div>
              )}

              <div className="flex items-center gap-6">
                {/* Tier Icon */}
                <div
                  className="w-16 h-16 border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: isCurrent
                      ? "#ff6a00"
                      : isNext
                      ? "#33ff99"
                      : "#555555",
                    backgroundColor: isCurrent
                      ? "rgba(255, 106, 0, 0.1)"
                      : isNext
                      ? "rgba(51, 255, 153, 0.1)"
                      : "#0a0a0a",
                  }}
                >
                  {isLocked ? (
                    <Lock
                      size={24}
                      style={{ color: "#555555" }}
                      strokeWidth={2.5}
                    />
                  ) : isCurrent ? (
                    <CheckCircle2
                      size={24}
                      style={{ color: "#ff6a00" }}
                      strokeWidth={2.5}
                    />
                  ) : (
                    <TrendingUp
                      size={24}
                      style={{ color: isNext ? "#33ff99" : "#888888" }}
                      strokeWidth={2.5}
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div
                    className="pixel mb-2"
                    style={{
                      fontSize: "16px",
                      color: isCurrent
                        ? "#ff6a00"
                        : isNext
                        ? "#33ff99"
                        : "#cccccc",
                      letterSpacing: "0.05em",
                    }}
                  >
                    TIER {tierData.tier}: {tierData.name}
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className="border px-3 py-1"
                      style={{
                        borderColor: "#33ff99",
                        backgroundColor: "rgba(51, 255, 153, 0.1)",
                      }}
                    >
                      <span
                        className="mono text-xs"
                        style={{
                          color: "#33ff99",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {tierData.slots} SLOTS
                      </span>
                    </div>
                    <div
                      className="border px-3 py-1"
                      style={{
                        borderColor: "#00a8cc",
                        backgroundColor: "rgba(0, 168, 204, 0.1)",
                      }}
                    >
                      <span
                        className="mono text-xs"
                        style={{
                          color: "#00a8cc",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {tierData.multiplier}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cost & Action */}
                <div className="text-right">
                  <div
                    className="mono mb-3"
                    style={{
                      fontSize: "14px",
                      color: "#888888",
                      letterSpacing: "0.08em",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {tierData.cost}
                  </div>
                  {isNext && !isLocked && (
                    <motion.button
                      className="border-2 border-[#33ff99] px-8 py-3"
                      style={{
                        backgroundColor: "#0a0a0a",
                        boxShadow: "3px 3px 0 rgba(51, 255, 153, 0.3)",
                      }}
                      onClick={() => handleUpgrade(tierData.tier)}
                      whileHover={{
                        boxShadow: "4px 4px 0 rgba(51, 255, 153, 0.5)",
                        y: -2,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span
                        className="pixel"
                        style={{
                          fontSize: "14px",
                          color: "#33ff99",
                          letterSpacing: "0.08em",
                        }}
                      >
                        UPGRADE
                      </span>
                    </motion.button>
                  )}
                  {isCurrent && (
                    <div
                      className="border px-4 py-2"
                      style={{
                        borderColor: "#ff6a00",
                        backgroundColor: "rgba(255, 106, 0, 0.1)",
                      }}
                    >
                      <span
                        className="mono text-xs"
                        style={{ color: "#ff6a00", letterSpacing: "0.08em" }}
                      >
                        ACTIVE
                      </span>
                    </div>
                  )}
                  {isLocked && (
                    <div
                      className="border px-4 py-2"
                      style={{
                        borderColor: "#555555",
                        backgroundColor: "#0a0a0a",
                      }}
                    >
                      <span
                        className="mono text-xs"
                        style={{ color: "#555555", letterSpacing: "0.08em" }}
                      >
                        LOCKED
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Level Up Section */}
      <ModalSection title="LEVEL UP FARM" accentColor="#33ff99">
        <div
          className="border-2 border-[#2a2a2a] p-6"
          style={{
            backgroundColor: "#0f0f0f",
          }}
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div
                className="mono text-xs mb-2"
                style={{ color: "#888888", letterSpacing: "0.08em" }}
              >
                NEXT LEVEL COST
              </div>
              <div
                className="pixel"
                style={{
                  fontSize: "20px",
                  color: "#33ff99",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {(currentLevel * 100).toLocaleString()} MEGA
              </div>
            </div>
            <div>
              <div
                className="mono text-xs mb-2"
                style={{ color: "#888888", letterSpacing: "0.08em" }}
              >
                BOOST GAINED
              </div>
              <div
                className="pixel"
                style={{
                  fontSize: "20px",
                  color: "#ff6a00",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                +10% YIELD
              </div>
            </div>
          </div>
          <motion.button
            className="border-2 border-[#33ff99] px-10 py-4 w-full mt-6 relative overflow-hidden"
            style={{
              backgroundColor: "#0a0a0a",
              boxShadow: "3px 3px 0 rgba(51, 255, 153, 0.3)",
            }}
            whileHover={{
              boxShadow: "4px 4px 0 rgba(51, 255, 153, 0.5)",
              y: -2,
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => console.log("Level up")}
          >
            <motion.div
              className="absolute inset-0 bg-[#33ff99]"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.1 }}
            />
            <div className="flex items-center justify-center gap-3 relative z-10">
              <Zap size={18} style={{ color: "#33ff99" }} strokeWidth={2.5} />
              <span
                className="pixel"
                style={{
                  fontSize: "14px",
                  color: "#33ff99",
                  letterSpacing: "0.08em",
                }}
              >
                LEVEL UP TO {currentLevel + 1}
              </span>
            </div>
          </motion.button>
        </div>
      </ModalSection>
    </TerminalModal>
  );
}
