import { motion } from "motion/react";
import { X, ArrowUpCircle } from "lucide-react";

interface UpgradeFarmModalProps {
  onClose: () => void;
  farmTier: number;
  onConfirm: () => void;
}

export function UpgradeFarmModal({ onClose, farmTier, onConfirm }: UpgradeFarmModalProps) {
  if (farmTier >= 7) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(8px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Modal Panel */}
      <motion.div
        className="relative border-2"
        style={{
          width: "600px",
          backgroundColor: "#0a0a0a",
          borderColor: "#33ff99",
          boxShadow: "0 0 60px rgba(51, 255, 153, 0.4), inset 0 0 40px rgba(51, 255, 153, 0.05)",
        }}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 w-8 h-8 border flex items-center justify-center"
          style={{
            backgroundColor: "#050505",
            borderColor: "#333",
          }}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#ff6a00";
            e.currentTarget.style.boxShadow = "0 0 12px rgba(255, 106, 0, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#333";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <X size={16} color="#666" />
        </button>

        {/* Content */}
        <div className="p-12">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 border-2 flex items-center justify-center"
              style={{
                borderColor: "#33ff99",
                backgroundColor: "rgba(51, 255, 153, 0.1)",
                boxShadow: "0 0 30px rgba(51, 255, 153, 0.3)",
              }}
            >
              <ArrowUpCircle size={36} color="#33ff99" strokeWidth={2} />
            </div>
          </div>

          {/* Title */}
          <h2
            className="pixel text-center mb-8"
            style={{
              fontSize: "24px",
              color: "#33ff99",
              letterSpacing: "0.1em",
              textShadow: "0 0 20px rgba(51, 255, 153, 0.5)",
            }}
          >
            FARM UPGRADE
          </h2>

          {/* Divider */}
          <div
            className="mx-auto mb-8"
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "rgba(51, 255, 153, 0.3)",
            }}
          />

          {/* Info */}
          <div className="mb-8">
            <div
              className="mono mb-6"
              style={{
                fontSize: "12px",
                color: "#888",
                letterSpacing: "0.1em",
                textAlign: "center",
              }}
            >
              Upgrading to TIER-{farmTier + 1} will unlock:
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              <div
                className="border p-4 flex items-start gap-3"
                style={{
                  backgroundColor: "rgba(51, 255, 153, 0.05)",
                  borderColor: "rgba(51, 255, 153, 0.2)",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#33ff99",
                    marginTop: "6px",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    className="pixel mb-1"
                    style={{
                      fontSize: "12px",
                      color: "#33ff99",
                      letterSpacing: "0.05em",
                    }}
                  >
                    +1 Farmer Slot
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: "10px",
                      color: "#666",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Increase your workforce capacity
                  </div>
                </div>
              </div>

              <div
                className="border p-4 flex items-start gap-3"
                style={{
                  backgroundColor: "rgba(51, 255, 153, 0.05)",
                  borderColor: "rgba(51, 255, 153, 0.2)",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#33ff99",
                    marginTop: "6px",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    className="pixel mb-1"
                    style={{
                      fontSize: "12px",
                      color: "#33ff99",
                      letterSpacing: "0.05em",
                    }}
                  >
                    +{(2.5 * 0.1 * 3600).toFixed(2)} Output / Hour
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: "10px",
                      color: "#666",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Boost your base production rate
                  </div>
                </div>
              </div>

              <div
                className="border p-4 flex items-start gap-3"
                style={{
                  backgroundColor: "rgba(51, 255, 153, 0.05)",
                  borderColor: "rgba(51, 255, 153, 0.2)",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#33ff99",
                    marginTop: "6px",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    className="pixel mb-1"
                    style={{
                      fontSize: "12px",
                      color: "#33ff99",
                      letterSpacing: "0.05em",
                    }}
                  >
                    +30px Farm Space
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: "10px",
                      color: "#666",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Expand your agricultural territory
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Info */}
          <div
            className="border p-4 mb-8"
            style={{
              backgroundColor: "rgba(255, 106, 0, 0.05)",
              borderColor: "rgba(255, 106, 0, 0.3)",
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="mono"
                style={{
                  fontSize: "11px",
                  color: "#888",
                  letterSpacing: "0.1em",
                }}
              >
                UPGRADE COST:
              </span>
              <span
                className="pixel"
                style={{
                  fontSize: "16px",
                  color: "#ff6a00",
                  letterSpacing: "0.05em",
                }}
              >
                0.008 ETH
              </span>
            </div>
          </div>

          {/* Confirm Button */}
          <motion.button
            className="w-full border-2 py-4 relative overflow-hidden"
            style={{
              backgroundColor: "#33ff99",
              borderColor: "#33ff99",
              boxShadow: "0 0 30px rgba(51, 255, 153, 0.4)",
            }}
            onClick={onConfirm}
            whileHover={{
              boxShadow: "0 0 50px rgba(51, 255, 153, 0.6)",
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span
              className="pixel"
              style={{
                fontSize: "14px",
                color: "#050505",
                letterSpacing: "0.1em",
              }}
            >
              CONFIRM UPGRADE → WALLET
            </span>
          </motion.button>

          {/* Warning */}
          <div
            className="mt-6 text-center mono"
            style={{
              fontSize: "9px",
              color: "#555",
              letterSpacing: "0.1em",
            }}
          >
            This action will open your wallet for transaction confirmation
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
