import { motion } from "motion/react";
import { Trophy, Zap, Gift, TrendingUp, Target } from "lucide-react";
import { TerminalModal, ModalSection } from "../TerminalModal";

interface BountyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BountyModal({ isOpen, onClose }: BountyModalProps) {
  const bounties = [
    {
      id: 1,
      icon: Gift,
      name: "FIRST CLAIM",
      difficulty: "EASY",
      difficultyColor: "#33ff99",
      reward: "+500 CARROT",
      rewardType: "CARROT",
      status: "AVAILABLE",
      statusColor: "#33ff99",
      cta: "ACCEPT",
      isDaily: false,
    },
    {
      id: 2,
      icon: Zap,
      name: "DAILY HARVEST",
      difficulty: "MED",
      difficultyColor: "#ff6a00",
      reward: "2x YIELD BOOST",
      rewardType: "MULTIPLIER",
      status: "IN PROGRESS",
      statusColor: "#ff6a00",
      cta: "VIEW",
      isDaily: true,
    },
    {
      id: 3,
      name: "UPGRADE SPECIALIST",
      icon: TrendingUp,
      difficulty: "MED",
      difficultyColor: "#ff6a00",
      reward: "+1000 MEGA",
      rewardType: "MEGA",
      status: "AVAILABLE",
      statusColor: "#33ff99",
      cta: "ACCEPT",
      isDaily: false,
    },
    {
      id: 4,
      name: "MASTER FARMER",
      icon: Target,
      difficulty: "HARD",
      difficultyColor: "#ff0066",
      reward: "3x YIELD (24H)",
      rewardType: "MULTIPLIER",
      status: "COMPLETED",
      statusColor: "#666666",
      cta: "CLAIM",
      isDaily: false,
    },
  ];

  return (
    <TerminalModal
      isOpen={isOpen}
      onClose={onClose}
      title="BOUNTY BOARD"
      subtitle="// COMPLETE MISSIONS TO EARN REWARDS"
      accentColor="#ff6a00"
    >
      {/* Intro */}
      <div
        className="mono text-xs mb-6"
        style={{
          color: "#888888",
          letterSpacing: "0.05em",
          lineHeight: 1.6,
        }}
      >
        Complete missions to earn MEGA boosts and CARROT drops.
      </div>

      {/* Bounties List */}
      <div className="space-y-3">
        {bounties.map((bounty) => {
          const Icon = bounty.icon;
          return (
            <motion.div
              key={bounty.id}
              className="border-2 relative"
              style={{
                borderColor: bounty.isDaily ? "#ff6a00" : "#2a2a2a",
                backgroundColor: bounty.isDaily
                  ? "rgba(255, 106, 0, 0.05)"
                  : "#0f0f0f",
                padding: "16px",
                boxShadow: bounty.isDaily
                  ? "3px 3px 0 rgba(255, 106, 0, 0.3)"
                  : "2px 2px 0 rgba(0, 0, 0, 0.3)",
              }}
              animate={
                bounty.isDaily
                  ? {
                      borderColor: ["#ff6a00", "#ff8833", "#ff6a00"],
                      boxShadow: [
                        "3px 3px 0 rgba(255, 106, 0, 0.3)",
                        "4px 4px 0 rgba(255, 106, 0, 0.5)",
                        "3px 3px 0 rgba(255, 106, 0, 0.3)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{
                borderColor: bounty.isDaily ? "#ff8833" : "#555555",
              }}
            >
              {/* Daily Badge */}
              {bounty.isDaily && (
                <div
                  className="absolute -top-2 left-4 border border-[#ff6a00] px-2 py-1"
                  style={{
                    backgroundColor: "#ff6a00",
                    boxShadow: "0 0 8px rgba(255, 106, 0, 0.6)",
                  }}
                >
                  <span
                    className="pixel"
                    style={{
                      fontSize: "9px",
                      color: "#0a0a0a",
                      letterSpacing: "0.08em",
                    }}
                  >
                    DAILY BOUNTY
                  </span>
                </div>
              )}

              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className="w-12 h-12 border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: bounty.difficultyColor,
                    backgroundColor: `${bounty.difficultyColor}11`,
                  }}
                >
                  <Icon
                    size={20}
                    style={{ color: bounty.difficultyColor }}
                    strokeWidth={2.5}
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div
                    className="pixel text-sm mb-1"
                    style={{ color: "#cccccc", letterSpacing: "0.05em" }}
                  >
                    {bounty.name}
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Difficulty */}
                    <div
                      className="border px-2 py-1"
                      style={{
                        borderColor: bounty.difficultyColor,
                        backgroundColor: `${bounty.difficultyColor}11`,
                      }}
                    >
                      <span
                        className="mono"
                        style={{
                          fontSize: "9px",
                          color: bounty.difficultyColor,
                          letterSpacing: "0.08em",
                        }}
                      >
                        {bounty.difficulty}
                      </span>
                    </div>

                    {/* Reward */}
                    <span
                      className="pixel text-xs"
                      style={{
                        color: "#33ff99",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {bounty.reward}
                    </span>

                    {/* Status Pill */}
                    <div
                      className="border px-2 py-1"
                      style={{
                        borderColor: bounty.statusColor,
                        backgroundColor: `${bounty.statusColor}11`,
                      }}
                    >
                      <span
                        className="mono"
                        style={{
                          fontSize: "9px",
                          color: bounty.statusColor,
                          letterSpacing: "0.08em",
                        }}
                      >
                        {bounty.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  className="border-2 px-6 py-2"
                  style={{
                    borderColor:
                      bounty.status === "COMPLETED" ? "#33ff99" : "#ff6a00",
                    backgroundColor: "#0a0a0a",
                    boxShadow:
                      bounty.status === "COMPLETED"
                        ? "2px 2px 0 rgba(51, 255, 153, 0.3)"
                        : "2px 2px 0 rgba(255, 106, 0, 0.3)",
                  }}
                  whileHover={{
                    boxShadow:
                      bounty.status === "COMPLETED"
                        ? "3px 3px 0 rgba(51, 255, 153, 0.5)"
                        : "3px 3px 0 rgba(255, 106, 0, 0.5)",
                    y: -1,
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => console.log(`${bounty.cta} bounty ${bounty.id}`)}
                >
                  <span
                    className="pixel text-xs"
                    style={{
                      color:
                        bounty.status === "COMPLETED" ? "#33ff99" : "#ff6a00",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {bounty.cta}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </TerminalModal>
  );
}
