import { motion } from "motion/react";
import { Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { TerminalModal, ModalSection } from "../TerminalModal";

interface ReferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReferModal({ isOpen, onClose }: ReferModalProps) {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://megacarrot.farm/ref/MEGA-X7K9-2F4L";

  const stats = {
    totalReferrals: 12,
    totalEarned: 2450,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TerminalModal
      isOpen={isOpen}
      onClose={onClose}
      title="REFER A FARMER"
      subtitle="// INVITE FRIENDS & EARN REWARDS"
      accentColor="#33ff99"
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
        Invite friends. Earn 5% of their Yield for 7 days.
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Total Referrals */}
        <div
          className="border-2 border-[#2a2a2a] p-4"
          style={{
            backgroundColor: "#0f0f0f",
            boxShadow: "2px 2px 0 rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            className="mono text-xs mb-2"
            style={{ color: "#666666", letterSpacing: "0.08em" }}
          >
            TOTAL REFERRALS
          </div>
          <div
            className="pixel"
            style={{
              fontSize: "32px",
              color: "#33ff99",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {stats.totalReferrals}
          </div>
        </div>

        {/* Total Earned */}
        <div
          className="border-2 border-[#2a2a2a] p-4"
          style={{
            backgroundColor: "#0f0f0f",
            boxShadow: "2px 2px 0 rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            className="mono text-xs mb-2"
            style={{ color: "#666666", letterSpacing: "0.08em" }}
          >
            TOTAL EARNED
          </div>
          <div className="flex items-baseline gap-2">
            <div
              className="pixel"
              style={{
                fontSize: "28px",
                color: "#33ff99",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {stats.totalEarned.toLocaleString()}
            </div>
            <span
              className="mono text-xs"
              style={{ color: "#666666", letterSpacing: "0.08em" }}
            >
              CARROT
            </span>
          </div>
        </div>
      </div>

      {/* Referral Link Section */}
      <ModalSection title="YOUR REFERRAL LINK" accentColor="#33ff99">
        <div className="flex gap-2">
          <div
            className="flex-1 border-2 border-[#2a2a2a] px-4 py-3 overflow-hidden"
            style={{
              backgroundColor: "#0a0a0a",
            }}
          >
            <div
              className="mono text-xs truncate"
              style={{
                color: "#33ff99",
                letterSpacing: "0.05em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {referralLink}
            </div>
          </div>
          <motion.button
            className="border-2 border-[#33ff99] px-6 py-3 flex items-center gap-2"
            style={{
              backgroundColor: copied ? "#33ff99" : "#0a0a0a",
              boxShadow: "2px 2px 0 rgba(51, 255, 153, 0.3)",
            }}
            onClick={handleCopy}
            whileHover={{
              boxShadow: "3px 3px 0 rgba(51, 255, 153, 0.5)",
              y: -1,
            }}
            whileTap={{ scale: 0.98 }}
          >
            {copied ? (
              <CheckCircle2
                size={14}
                style={{ color: "#0a0a0a" }}
                strokeWidth={2.5}
              />
            ) : (
              <Copy size={14} style={{ color: "#33ff99" }} strokeWidth={2.5} />
            )}
            <span
              className="pixel text-xs"
              style={{
                color: copied ? "#0a0a0a" : "#33ff99",
                letterSpacing: "0.08em",
              }}
            >
              {copied ? "COPIED" : "COPY"}
            </span>
          </motion.button>
        </div>
      </ModalSection>

      {/* Note */}
      <div
        className="border border-[#2a2a2a] p-4 mt-6"
        style={{
          backgroundColor: "#0a0a0a",
        }}
      >
        <div
          className="mono text-xs"
          style={{
            color: "#666666",
            letterSpacing: "0.05em",
            lineHeight: 1.6,
          }}
        >
          Rewards appear in your Yield automatically. Share your link to maximize
          earnings.
        </div>
      </div>
    </TerminalModal>
  );
}
