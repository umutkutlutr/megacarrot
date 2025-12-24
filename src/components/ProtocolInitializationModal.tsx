import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Check, Square, User } from "lucide-react";

interface ProtocolInitializationModalProps {
  isOpen?: boolean;
  onPaymentComplete: () => void;
  onCancel: () => void;
}

export function ProtocolInitializationModal({
  isOpen = true,
  onPaymentComplete,
  onCancel,
}: ProtocolInitializationModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);

  const handlePay = () => {
    setIsProcessing(true);
    // Cursor blink effect during processing
    const blinkInterval = setInterval(() => {
      setCursorBlink((prev) => !prev);
    }, 500);

    // Simulate processing
    setTimeout(() => {
      clearInterval(blinkInterval);
      onPaymentComplete();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100]"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(2px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={!isProcessing ? onCancel : undefined}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-8">
            <motion.div
              className="relative w-full max-w-[640px]"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main modal box */}
              <div
                className="border-4 border-[#ff6a00] relative"
                style={{
                  backgroundColor: "#0a0a0a",
                  boxShadow:
                    "8px 8px 0 rgba(255, 106, 0, 0.4), inset 0 0 60px rgba(255, 106, 0, 0.06)",
                }}
              >
                {/* Corner accents */}
                {[
                  { top: -2, left: -2 },
                  { top: -2, right: -2 },
                  { bottom: -2, left: -2 },
                  { bottom: -2, right: -2 },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-[#ff6a00]"
                    style={pos}
                    animate={{
                      opacity: [1, 0.4, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}

                {/* Inner content */}
                <div className="p-12">
                  {/* HEADER */}
                  <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <h2
                      className="pixel mb-4"
                      style={{
                        fontSize: "40px",
                        color: "#ff6a00",
                        letterSpacing: "0.05em",
                        textShadow: "4px 4px 0 rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      PROTOCOL ACCESS
                    </h2>

                    <div
                      className="mono text-xs mb-6"
                      style={{
                        color: "#999999",
                        letterSpacing: "0.2em",
                      }}
                    >
                      ONE-TIME ENTRY FEE REQUIRED TO INITIALIZE SYSTEM
                    </div>

                    {/* Pixel divider */}
                    <div className="flex justify-center gap-1 mb-2">
                      {[...Array(48)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-1 bg-[#444444]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.6 }}
                          transition={{
                            duration: 0.2,
                            delay: 0.2 + i * 0.008,
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-center gap-1">
                      {[...Array(48)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-1 bg-[#444444]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.4 }}
                          transition={{
                            duration: 0.2,
                            delay: 0.24 + i * 0.008,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* BENEFITS SECTION */}
                  <motion.div
                    className="mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                  >
                    <div className="space-y-4">
                      {/* LAND */}
                      <motion.div
                        className="flex items-center gap-4 p-4 border-2 border-[#2a2a2a]"
                        style={{
                          backgroundColor: "#0f0f0f",
                          boxShadow: "4px 4px 0 rgba(0, 0, 0, 0.3)",
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.35 }}
                      >
                        {/* Icon box */}
                        <div
                          className="w-10 h-10 border-2 border-[#2ed573] flex items-center justify-center"
                          style={{
                            backgroundColor: "#2ed573",
                            boxShadow: "2px 2px 0 rgba(46, 213, 115, 0.3)",
                          }}
                        >
                          <Square
                            size={18}
                            style={{ color: "#0a0a0a" }}
                            strokeWidth={3}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div
                            className="pixel"
                            style={{ fontSize: "18px", color: "#ffffff" }}
                          >
                            1x TIER 1 LAND
                          </div>
                        </div>

                        {/* Checkmark */}
                        <div
                          className="w-6 h-6 border-2 border-[#2ed573] flex items-center justify-center"
                          style={{ backgroundColor: "#0a0a0a" }}
                        >
                          <Check
                            size={14}
                            style={{ color: "#2ed573" }}
                            strokeWidth={3}
                          />
                        </div>
                      </motion.div>

                      {/* FARMER */}
                      <motion.div
                        className="flex items-center gap-4 p-4 border-2 border-[#2a2a2a]"
                        style={{
                          backgroundColor: "#0f0f0f",
                          boxShadow: "4px 4px 0 rgba(0, 0, 0, 0.3)",
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.45 }}
                      >
                        {/* Icon box */}
                        <div
                          className="w-10 h-10 border-2 border-[#2ed573] flex items-center justify-center"
                          style={{
                            backgroundColor: "#2ed573",
                            boxShadow: "2px 2px 0 rgba(46, 213, 115, 0.3)",
                          }}
                        >
                          <User
                            size={18}
                            style={{ color: "#0a0a0a" }}
                            strokeWidth={3}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div
                            className="pixel"
                            style={{ fontSize: "18px", color: "#ffffff" }}
                          >
                            1x ENTRY LEVEL FARMER
                          </div>
                        </div>

                        {/* Checkmark */}
                        <div
                          className="w-6 h-6 border-2 border-[#2ed573] flex items-center justify-center"
                          style={{ backgroundColor: "#0a0a0a" }}
                        >
                          <Check
                            size={14}
                            style={{ color: "#2ed573" }}
                            strokeWidth={3}
                          />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* PRICING SECTION */}
                  <motion.div
                    className="mb-8 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.55 }}
                  >
                    <div
                      className="inline-block border-3 border-[#ff6a00] px-8 py-4"
                      style={{
                        backgroundColor: "#0a0a0a",
                        boxShadow: "4px 4px 0 rgba(255, 106, 0, 0.4)",
                      }}
                    >
                      <div
                        className="mono text-xs mb-2"
                        style={{ color: "#666666", letterSpacing: "0.15em" }}
                      >
                        ENTRY FEE
                      </div>
                      <motion.div
                        className="pixel"
                        style={{
                          fontSize: "42px",
                          color: "#ff6a00",
                          letterSpacing: "0.02em",
                        }}
                        animate={{
                          textShadow: [
                            "0 0 12px rgba(255, 106, 0, 0.4)",
                            "0 0 20px rgba(255, 106, 0, 0.6)",
                            "0 0 12px rgba(255, 106, 0, 0.4)",
                          ],
                        }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        0.008 ETH
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* SECONDARY TEXT */}
                  <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.65 }}
                  >
                    <div
                      className="mono text-xs"
                      style={{
                        color: "#555555",
                        opacity: 0.7,
                        letterSpacing: "0.12em",
                      }}
                    >
                      This transaction initializes your agricultural protocol
                      access.
                    </div>
                  </motion.div>

                  {/* ACTION BUTTONS */}
                  <motion.div
                    className="flex items-center justify-center gap-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.75 }}
                  >
                    {/* CANCEL Button */}
                    <motion.button
                      className="border-3 border-[#333333] px-8 py-4 relative"
                      style={{
                        backgroundColor: "#0a0a0a",
                        boxShadow: "3px 3px 0 rgba(0, 0, 0, 0.4)",
                      }}
                      onClick={onCancel}
                      disabled={isProcessing}
                      whileHover={
                        !isProcessing
                          ? {
                              borderColor: "#555555",
                              y: -2,
                              boxShadow: "4px 5px 0 rgba(0, 0, 0, 0.5)",
                            }
                          : {}
                      }
                      whileTap={
                        !isProcessing
                          ? {
                              y: 1,
                              boxShadow: "2px 2px 0 rgba(0, 0, 0, 0.5)",
                            }
                          : {}
                      }
                      transition={{ duration: 0.16 }}
                    >
                      <span
                        className="pixel"
                        style={{
                          fontSize: "16px",
                          color: isProcessing ? "#333333" : "#888888",
                          letterSpacing: "0.08em",
                        }}
                      >
                        CANCEL
                      </span>
                    </motion.button>

                    {/* PAY Button */}
                    <motion.button
                      className="border-4 border-[#ff6a00] px-10 py-4 relative overflow-hidden"
                      style={{
                        backgroundColor: isProcessing ? "#ff6a00" : "#0a0a0a",
                        boxShadow: "4px 4px 0 rgba(255, 106, 0, 0.5)",
                      }}
                      onClick={handlePay}
                      disabled={isProcessing}
                      whileHover={
                        !isProcessing
                          ? {
                              y: -2,
                              boxShadow: "6px 6px 0 rgba(255, 106, 0, 0.6)",
                            }
                          : {}
                      }
                      whileTap={
                        !isProcessing
                          ? {
                              y: 1,
                              boxShadow: "2px 2px 0 rgba(255, 106, 0, 0.5)",
                            }
                          : {}
                      }
                      transition={{ duration: 0.16 }}
                      animate={
                        isProcessing
                          ? {
                              scale: [1, 1.02, 1],
                            }
                          : {}
                      }
                    >
                      {/* Hover glow */}
                      {!isProcessing && (
                        <motion.div
                          className="absolute inset-0"
                          style={{ backgroundColor: "#ff6a00" }}
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 0.1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}

                      {/* Top edge highlight */}
                      <div
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{ backgroundColor: "#ff6a00", opacity: 0.4 }}
                      />

                      <div className="flex items-center gap-3 relative z-10">
                        <span
                          className="pixel"
                          style={{
                            fontSize: "18px",
                            color: isProcessing ? "#0a0a0a" : "#ff6a00",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {isProcessing ? "PROCESSING" : "PAY 0.008 ETH"}
                        </span>
                        {isProcessing && (
                          <motion.span
                            className="pixel"
                            style={{
                              fontSize: "18px",
                              color: "#0a0a0a",
                            }}
                            animate={{
                              opacity: cursorBlink ? 1 : 0,
                            }}
                          >
                            _
                          </motion.span>
                        )}
                      </div>
                    </motion.button>
                  </motion.div>
                </div>

                {/* Scanline effect */}
                <motion.div
                  className="absolute left-0 right-0 h-px pointer-events-none"
                  style={{
                    backgroundColor: "#ff6a00",
                    opacity: 0.5,
                    boxShadow: "0 0 4px rgba(255, 106, 0, 0.6)",
                  }}
                  animate={{
                    top: ["0%", "100%", "100%", "100%"],
                    opacity: [0, 0.5, 0, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    times: [0, 0.15, 0.16, 1],
                  }}
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}