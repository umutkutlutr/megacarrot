import { motion } from "motion/react";
import { HelpCircle, Zap, TrendingUp, Gift, Keyboard } from "lucide-react";
import { TerminalModal, ModalSection } from "../TerminalModal";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const steps = [
    {
      number: "01",
      icon: Zap,
      text: "Your farm produces Yield automatically.",
      color: "#33ff99",
    },
    {
      number: "02",
      icon: Gift,
      text: "Claim Yield to move it to your balance.",
      color: "#ff6a00",
    },
    {
      number: "03",
      icon: TrendingUp,
      text: "Upgrade tiers to unlock more farmer slots.",
      color: "#00a8cc",
    },
    {
      number: "04",
      icon: Zap,
      text: "Farmers increase production.",
      color: "#33ff99",
    },
    {
      number: "05",
      icon: Gift,
      text: "Bounties give temporary boosts.",
      color: "#ff6a00",
    },
  ];

  const hotkeys = [
    { key: "ESC", action: "Close modals" },
    { key: "HOVER", action: "View details" },
    { key: "CLAIM", action: "Available when yield ready" },
  ];

  return (
    <TerminalModal
      isOpen={isOpen}
      onClose={onClose}
      title="HOW TO PLAY"
      subtitle="// QUICK START GUIDE"
      accentColor="#888888"
    >
      {/* Quick Guide */}
      <ModalSection title="QUICK START" accentColor="#888888">
        <div className="space-y-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                className="border border-[#2a2a2a] p-4 flex items-center gap-4"
                style={{
                  backgroundColor: "#0f0f0f",
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.08 }}
              >
                {/* Number + Icon */}
                <div
                  className="w-12 h-12 border-2 flex items-center justify-center flex-shrink-0 relative"
                  style={{
                    borderColor: step.color,
                    backgroundColor: `${step.color}11`,
                  }}
                >
                  <Icon size={18} style={{ color: step.color }} strokeWidth={2.5} />
                  <div
                    className="absolute -top-2 -left-2 w-6 h-6 border flex items-center justify-center"
                    style={{
                      borderColor: step.color,
                      backgroundColor: "#0a0a0a",
                    }}
                  >
                    <span
                      className="pixel"
                      style={{
                        fontSize: "10px",
                        color: step.color,
                        lineHeight: 1,
                      }}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div
                  className="mono text-xs flex-1"
                  style={{
                    color: "#cccccc",
                    letterSpacing: "0.05em",
                    lineHeight: 1.6,
                  }}
                >
                  {step.text}
                </div>
              </motion.div>
            );
          })}
        </div>
      </ModalSection>

      {/* Hotkeys & UI Tips */}
      <ModalSection title="HOTKEYS / UI TIPS" accentColor="#888888">
        <div
          className="border-2 border-[#2a2a2a]"
          style={{
            backgroundColor: "#0f0f0f",
          }}
        >
          {hotkeys.map((hotkey, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 border-b border-[#2a2a2a] last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className="border border-[#555555] px-3 py-1 flex items-center gap-2"
                  style={{
                    backgroundColor: "#0a0a0a",
                  }}
                >
                  <Keyboard size={12} style={{ color: "#888888" }} strokeWidth={2.5} />
                  <span
                    className="pixel text-xs"
                    style={{
                      color: "#888888",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {hotkey.key}
                  </span>
                </div>
              </div>
              <span
                className="mono text-xs"
                style={{ color: "#666666", letterSpacing: "0.05em" }}
              >
                {hotkey.action}
              </span>
            </div>
          ))}
        </div>
      </ModalSection>

      {/* Farm Tiers Quick Reference */}
      <ModalSection title="FARM TIERS" accentColor="#888888">
        <div
          className="border border-[#2a2a2a]"
          style={{
            backgroundColor: "#0f0f0f",
          }}
        >
          {/* Header */}
          <div
            className="grid grid-cols-3 gap-3 p-3 border-b border-[#2a2a2a]"
            style={{ backgroundColor: "#0a0a0a" }}
          >
            {["TIER", "SLOTS", "MULTIPLIER"].map((header) => (
              <div
                key={header}
                className="mono text-xs"
                style={{ color: "#888888", letterSpacing: "0.08em" }}
              >
                {header}
              </div>
            ))}
          </div>

          {/* Rows */}
          {[
            { tier: 1, slots: 1, mult: "1.0x" },
            { tier: 2, slots: 2, mult: "1.2x" },
            { tier: 3, slots: 3, mult: "1.5x" },
            { tier: 4, slots: 4, mult: "1.8x" },
            { tier: 5, slots: 5, mult: "2.2x" },
            { tier: 6, slots: 6, mult: "2.7x" },
            { tier: 7, slots: 7, mult: "3.5x" },
          ].map((row) => (
            <div
              key={row.tier}
              className="grid grid-cols-3 gap-3 p-3 border-b border-[#2a2a2a] last:border-b-0"
            >
              <div
                className="pixel text-xs"
                style={{
                  color: "#ff6a00",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                T{row.tier}
              </div>
              <div
                className="pixel text-xs"
                style={{
                  color: "#33ff99",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {row.slots}
              </div>
              <div
                className="pixel text-xs"
                style={{
                  color: "#00a8cc",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {row.mult}
              </div>
            </div>
          ))}
        </div>
      </ModalSection>
    </TerminalModal>
  );
}
