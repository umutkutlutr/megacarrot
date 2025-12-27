import { motion } from "motion/react";
import { X } from "lucide-react";

interface TierDetailsModalProps {
  onClose: () => void;
  farmTier: number;
}

export function TierDetailsModal({ onClose, farmTier }: TierDetailsModalProps) {
  // Tier names
  const getTierName = (tier: number) => {
    const names = [
      "PIONEER PLOT",
      "MODEST HOMESTEAD",
      "PRODUCTIVE FARMLAND",
      "COMMERCIAL OPERATION",
      "INDUSTRIAL COMPLEX",
      "CORPORATE PLANTATION",
      "AGRICULTURAL EMPIRE",
    ];
    return names[tier - 1] || "UNKNOWN";
  };

  // Calculate current tier specs
  const currentSlots = farmTier;
  const currentBaseOutput = (2.5 * farmTier * 3600).toFixed(2);
  const currentFarmSpace = 100 + (farmTier - 1) * 16;
  const initialCost = farmTier * 0.008;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-8"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="border-2 relative"
        style={{
          backgroundColor: "#0a0a0a",
          borderColor: "#cc5500",
          boxShadow: "0 0 40px rgba(204, 85, 0, 0.5), inset 0 0 60px rgba(0, 0, 0, 0.8)",
          maxWidth: "500px",
          width: "100%",
        }}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Premium corner accents */}
        <div
          className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2"
          style={{ borderColor: "#cc5500", opacity: 0.8 }}
        />
        <div
          className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2"
          style={{ borderColor: "#cc5500", opacity: 0.8 }}
        />
        <div
          className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2"
          style={{ borderColor: "#cc5500", opacity: 0.8 }}
        />
        <div
          className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2"
          style={{ borderColor: "#cc5500", opacity: 0.8 }}
        />

        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: "#222" }}
        >
          <div>
            <div
              className="pixel mb-2"
              style={{ fontSize: "18px", color: "#cc5500", letterSpacing: "0.05em" }}
            >
              {getTierName(farmTier)}
            </div>
            <div
              className="mono"
              style={{ fontSize: "10px", color: "#888", letterSpacing: "0.1em" }}
            >
              CURRENT TIER SPECIFICATIONS
            </div>
          </div>
          <motion.button
            className="border-2 p-2"
            style={{
              backgroundColor: "transparent",
              borderColor: "#333",
            }}
            onClick={onClose}
            whileHover={{
              borderColor: "#cc5500",
              backgroundColor: "rgba(204, 85, 0, 0.1)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={18} style={{ color: "#cc5500" }} />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Tier Badge */}
          <div className="flex items-center justify-center mb-8">
            <div
              className="border-2 px-10 py-4"
              style={{
                backgroundColor: "rgba(204, 85, 0, 0.05)",
                borderColor: "#cc5500",
                boxShadow: "0 0 20px rgba(204, 85, 0, 0.3), inset 0 0 30px rgba(204, 85, 0, 0.1)",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="pixel"
                  style={{ fontSize: "24px", color: "#cc5500", letterSpacing: "0.08em", lineHeight: "1" }}
                >
                  TIER
                </span>
                <span
                  className="pixel"
                  style={{ fontSize: "24px", color: "#cc5500", letterSpacing: "0.08em", lineHeight: "1" }}
                >
                  {farmTier}
                </span>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div
            className="border p-6 mb-6"
            style={{
              backgroundColor: "rgba(204, 85, 0, 0.03)",
              borderColor: "rgba(204, 85, 0, 0.3)",
              boxShadow: "inset 0 0 20px rgba(204, 85, 0, 0.05)",
            }}
          >
            <div
              className="mono mb-4"
              style={{ fontSize: "11px", color: "#cc5500", letterSpacing: "0.1em" }}
            >
              TIER-{farmTier} SPECIFICATIONS:
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 px-3 border-l-2" style={{ borderColor: "#33ff99", backgroundColor: "rgba(51, 255, 153, 0.03)" }}>
                <span
                  className="mono"
                  style={{ fontSize: "11px", color: "#999", letterSpacing: "0.05em" }}
                >
                  FARMER SLOTS:
                </span>
                <span
                  className="mono"
                  style={{ fontSize: "12px", color: "#33ff99", letterSpacing: "0.05em" }}
                >
                  {currentSlots} SLOTS
                </span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 border-l-2" style={{ borderColor: "#ff6a00", backgroundColor: "rgba(255, 106, 0, 0.03)" }}>
                <span
                  className="mono"
                  style={{ fontSize: "11px", color: "#999", letterSpacing: "0.05em" }}
                >
                  BASE OUTPUT / HOUR:
                </span>
                <span
                  className="mono"
                  style={{ fontSize: "12px", color: "#ff6a00", letterSpacing: "0.05em" }}
                >
                  {currentBaseOutput} $CARROT
                </span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 border-l-2" style={{ borderColor: "#00ccff", backgroundColor: "rgba(0, 204, 255, 0.03)" }}>
                <span
                  className="mono"
                  style={{ fontSize: "11px", color: "#999", letterSpacing: "0.05em" }}
                >
                  FARM SPACE:
                </span>
                <span
                  className="mono"
                  style={{ fontSize: "12px", color: "#00ccff", letterSpacing: "0.05em" }}
                >
                  {currentFarmSpace}px × {currentFarmSpace}px
                </span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 border-l-2" style={{ borderColor: "#33ff99", backgroundColor: "rgba(51, 255, 153, 0.03)" }}>
                <span
                  className="mono"
                  style={{ fontSize: "11px", color: "#999", letterSpacing: "0.05em" }}
                >
                  INITIAL COST:
                </span>
                <span
                  className="mono"
                  style={{ fontSize: "12px", color: "#33ff99", letterSpacing: "0.05em" }}
                >
                  {initialCost.toFixed(3)} ETH
                </span>
              </div>
            </div>
          </div>

          {/* Info Footer */}
          <div
            className="mono text-center py-3 border-t"
            style={{
              fontSize: "9px",
              color: "#666",
              letterSpacing: "0.05em",
              borderColor: "rgba(204, 85, 0, 0.2)",
            }}
          >
            These are your current tier specifications
          </div>
        </div>

        {/* Close Button */}
        <div className="p-6 pt-0">
          <motion.button
            className="w-full border-2 py-3 flex items-center justify-center gap-2"
            style={{
              backgroundColor: "#050505",
              borderColor: "#cc5500",
            }}
            onClick={onClose}
            whileHover={{
              backgroundColor: "rgba(204, 85, 0, 0.1)",
              boxShadow: "0 0 20px rgba(204, 85, 0, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span
              className="pixel"
              style={{ fontSize: "11px", color: "#cc5500", letterSpacing: "0.08em" }}
            >
              CLOSE
            </span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
