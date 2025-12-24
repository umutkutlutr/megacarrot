import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Wallet, Sprout, AlertTriangle, Check } from "lucide-react";
import { PixelButton } from "./PixelButton";

interface EntryPaymentProps {
  onPaymentComplete: () => void;
  onCancel: () => void;
}

export function EntryPayment({ onPaymentComplete, onCancel }: EntryPaymentProps) {
  const [scanline, setScanline] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const ENTRY_FEE = "0.05"; // ETH

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanline((prev) => (prev + 1) % 100);
    }, 30);
    return () => clearInterval(scanInterval);
  }, []);

  const handlePayment = () => {
    setProcessing(true);
    setProgress(0);

    // Simulate blockchain transaction
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onPaymentComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(10, 10, 10, 0.95)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Scanline effect */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          backgroundColor: "#ff6600",
          opacity: 0.3,
          top: `${scanline}%`,
        }}
      />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 7px, rgba(255, 102, 0, 0.3) 7px, rgba(255, 102, 0, 0.3) 8px),
            repeating-linear-gradient(90deg, transparent, transparent 7px, rgba(255, 102, 0, 0.3) 7px, rgba(255, 102, 0, 0.3) 8px)
          `,
        }}
      />

      {/* Payment modal */}
      <motion.div
        className="relative w-full max-w-2xl mx-8"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Border decoration */}
        <div className="absolute -inset-4 border-4 border-[#ff6600]" style={{ opacity: 0.2 }} />
        <div className="absolute -inset-2 border-2 border-[#ff6600]" style={{ opacity: 0.3 }} />

        <div
          className="relative border-4 border-[#ff6600] p-12"
          style={{
            backgroundColor: "#0a0a0a",
            boxShadow: "8px 8px 0 rgba(255, 102, 0, 0.3)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="w-20 h-20 border-4 border-[#ff6600] mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: "#ff6600" }}
              animate={{
                boxShadow: ["4px 4px 0 rgba(255, 102, 0, 0.5)", "6px 6px 0 rgba(255, 102, 0, 0.8)", "4px 4px 0 rgba(255, 102, 0, 0.5)"],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sprout size={40} style={{ color: "#0a0a0a" }} strokeWidth={3} />
            </motion.div>

            <h2 className="pixel mb-3" style={{ color: "#ff6600", fontSize: "24px" }}>
              PROTOCOL ACCESS
            </h2>
            <div className="mono text-xs" style={{ color: "#666666" }}>
              // ENTRY FEE REQUIRED TO INITIALIZE SYSTEM
            </div>
          </div>

          {/* Entry package */}
          <div className="mb-8 border-4 border-[#333333] p-6" style={{ backgroundColor: "#141414" }}>
            <div className="flex items-center justify-between mb-6">
              <div className="mono text-xs" style={{ color: "#666666" }}>
                STARTER PACKAGE
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-[#33ff66]" />
                <div className="w-2 h-2 bg-[#33ff66]" />
                <div className="w-2 h-2 bg-[#33ff66]" />
              </div>
            </div>

            {/* What you get */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Check size={16} style={{ color: "#33ff66" }} strokeWidth={3} />
                <span className="mono text-sm" style={{ color: "#f5f5f5" }}>
                  1x TIER-1 FARM PLOT
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check size={16} style={{ color: "#33ff66" }} strokeWidth={3} />
                <span className="mono text-sm" style={{ color: "#f5f5f5" }}>
                  1x ENTRY-LEVEL FARMER
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check size={16} style={{ color: "#33ff66" }} strokeWidth={3} />
                <span className="mono text-sm" style={{ color: "#f5f5f5" }}>
                  UPGRADE CAPABILITIES
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Check size={16} style={{ color: "#33ff66" }} strokeWidth={3} />
                <span className="mono text-sm" style={{ color: "#f5f5f5" }}>
                  UNLIMITED PRODUCTION
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="border-t-2 border-[#333333] pt-6">
              <div className="flex items-center justify-between">
                <span className="mono" style={{ color: "#666666" }}>
                  ENTRY FEE:
                </span>
                <div className="flex items-center gap-3">
                  <motion.span
                    className="pixel"
                    style={{ color: "#ff6600", fontSize: "32px" }}
                    animate={{
                      textShadow: ["0 0 10px rgba(255, 102, 0, 0.5)", "0 0 20px rgba(255, 102, 0, 0.8)", "0 0 10px rgba(255, 102, 0, 0.5)"],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {ENTRY_FEE}
                  </motion.span>
                  <span className="mono" style={{ color: "#ff6600", fontSize: "18px" }}>
                    ETH
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="mb-8 border-2 border-[#ff6600] bg-[#141414] p-4 flex items-start gap-3">
            <AlertTriangle size={20} style={{ color: "#ff6600" }} strokeWidth={2} />
            <div className="flex-1">
              <div className="mono text-xs mb-2" style={{ color: "#ff6600" }}>
                BLOCKCHAIN TRANSACTION
              </div>
              <div className="mono text-xs" style={{ color: "#999999" }}>
                This will initiate an Ethereum transaction. Ensure you have sufficient ETH + gas fees in your wallet.
              </div>
            </div>
          </div>

          {/* Processing progress */}
          {processing && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.2 }}
            >
              <div className="border-2 border-[#33ff66] bg-[#141414] p-4">
                <div className="mono text-xs mb-3" style={{ color: "#33ff66" }}>
                  PROCESSING TRANSACTION... {progress}%
                </div>
                <div className="h-4 border-2 border-[#33ff66] flex">
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 h-full"
                      style={{
                        backgroundColor: i < progress / 2 ? "#33ff66" : "transparent",
                      }}
                      animate={
                        i < progress / 2
                          ? {
                              opacity: [0.5, 1, 0.5],
                            }
                          : {}
                      }
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.02,
                      }}
                    />
                  ))}
                </div>
                <div className="mono text-xs mt-3 text-center" style={{ color: "#666666" }}>
                  DO NOT CLOSE THIS WINDOW
                </div>
              </div>
            </motion.div>
          )}

          {/* Buttons */}
          {!processing && (
            <div className="flex gap-4">
              <PixelButton variant="gray" size="md" onClick={onCancel} fullWidth>
                <span>CANCEL</span>
              </PixelButton>
              <PixelButton variant="orange" size="md" onClick={handlePayment} fullWidth>
                <div className="flex items-center justify-center gap-3">
                  <Wallet size={20} strokeWidth={2.5} />
                  <span>PAY {ENTRY_FEE} ETH</span>
                </div>
              </PixelButton>
            </div>
          )}

          {processing && (
            <div className="text-center">
              <div className="mono text-xs" style={{ color: "#666666" }}>
                Waiting for blockchain confirmation...
              </div>
            </div>
          )}
        </div>

        {/* Corner decorations */}
        <motion.div
          className="absolute top-0 left-0 w-4 h-4 bg-[#ff6600]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-0 w-4 h-4 bg-[#ff6600]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.25 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-4 h-4 bg-[#ff6600]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-4 h-4 bg-[#ff6600]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.75 }}
        />
      </motion.div>
    </motion.div>
  );
}
