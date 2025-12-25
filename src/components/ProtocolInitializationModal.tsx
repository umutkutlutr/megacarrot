import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Check, Square, User } from "lucide-react";
import { ProcessingState } from "./ProcessingState";
import { ResultState } from "./ResultState";

interface ProtocolInitializationModalProps {
  isOpen?: boolean;
  onPaymentComplete: () => void;
  onCancel: () => void;
}

type ModalState = "ready" | "processing" | "success" | "error";

export function ProtocolInitializationModal({
  isOpen = true,
  onPaymentComplete,
  onCancel,
}: ProtocolInitializationModalProps) {
  const [modalState, setModalState] = useState<ModalState>("ready");
  const [currentStep, setCurrentStep] = useState(0);

  const handlePay = () => {
    setModalState("processing");
    setCurrentStep(0);

    // Simulate transaction steps
    const steps = [
      { delay: 500, step: 1 }, // TX sent
      { delay: 1500, step: 2 }, // Confirming
      { delay: 3000, step: 3 }, // Finalizing
    ];

    steps.forEach(({ delay, step }) => {
      setTimeout(() => setCurrentStep(step), delay);
    });

    // Simulate success (or error for testing)
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1; // 90% success rate for demo
      setModalState(isSuccess ? "success" : "error");
      
      if (isSuccess) {
        // Auto-close after 1.5s on success
        setTimeout(() => {
          onPaymentComplete();
        }, 1500);
      }
    }, 4000);
  };

  const handleRetry = () => {
    setModalState("ready");
    setCurrentStep(0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced Backdrop with vignette and grain */}
          <motion.div
            className="fixed inset-0 z-[100] retro-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={modalState === "ready" ? onCancel : undefined}
          >
            {/* Vignette overlay */}
            <div className="retro-vignette" />
            
            {/* Film grain noise */}
            <div className="retro-grain" />
          </motion.div>

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-8">
            <motion.div
              className="relative w-full max-w-[720px]"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ 
                duration: 0.25, 
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main modal box */}
              <div
                className="border-4 border-[#ff6a00] relative overflow-hidden"
                style={{
                  backgroundColor: "#0a0a0a",
                  boxShadow:
                    "8px 8px 0 rgba(255, 106, 0, 0.4), inset 0 0 60px rgba(255, 106, 0, 0.06)",
                }}
              >
                {/* Scanline effect */}
                <div className="retro-scanline" style={{ opacity: 0.2 }} />

                {/* Corner accents with enhanced animation */}
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
                      boxShadow: [
                        "0 0 0 rgba(255, 106, 0, 0)",
                        "0 0 8px rgba(255, 106, 0, 0.6)",
                        "0 0 0 rgba(255, 106, 0, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}

                {/* Inner content with state switching */}
                <div className="p-12">
                  <AnimatePresence mode="wait">
                    {/* READY STATE */}
                    {modalState === "ready" && (
                      <motion.div
                        key="ready"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                      >
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

                        {/* SECONDARY TEXT */}
                        <motion.div
                          className="text-center mb-12"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.5 }}
                        >
                          <div
                            className="mono text-xs"
                            style={{
                              color: "#555555",
                              opacity: 0.7,
                              letterSpacing: "0.12em",
                            }}
                          >
                            This transaction initializes your agricultural protocol access.
                          </div>
                        </motion.div>

                        {/* ACTION BUTTONS */}
                        <motion.div
                          className="flex gap-6 justify-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.55 }}
                        >
                          {/* CANCEL Button */}
                          <motion.button
                            className="border-3 border-[#333333] px-12 py-5 relative flex-1 max-w-[200px]"
                            style={{
                              backgroundColor: "#0a0a0a",
                              boxShadow: "4px 4px 0 rgba(0, 0, 0, 0.4)",
                            }}
                            onClick={onCancel}
                            whileHover={{
                              borderColor: "#555555",
                              y: -3,
                              boxShadow: "5px 6px 0 rgba(0, 0, 0, 0.5)",
                            }}
                            whileTap={{
                              y: 1,
                              boxShadow: "2px 2px 0 rgba(0, 0, 0, 0.5)",
                            }}
                            transition={{ duration: 0.16 }}
                          >
                            <motion.span
                              className="pixel"
                              style={{
                                fontSize: "18px",
                                color: "#888888",
                                letterSpacing: "0.08em",
                              }}
                              whileHover={{
                                color: "#cccccc",
                                textShadow: [
                                  "0 0 8px rgba(255, 255, 255, 0.3)",
                                  "0 0 16px rgba(255, 255, 255, 0.5)",
                                  "0 0 8px rgba(255, 255, 255, 0.3)",
                                ],
                              }}
                              transition={{
                                textShadow: {
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                },
                                color: {
                                  duration: 0.2,
                                },
                              }}
                            >
                              CANCEL
                            </motion.span>
                          </motion.button>

                          {/* PAY Button */}
                          <motion.button
                            className="border-4 border-[#ff6a00] px-12 py-5 relative flex-1 max-w-[280px] overflow-hidden"
                            style={{
                              backgroundColor: "#0a0a0a",
                              boxShadow: "6px 6px 0 rgba(255, 106, 0, 0.4)",
                            }}
                            onClick={handlePay}
                            whileHover={{
                              y: -3,
                              boxShadow: "8px 8px 0 rgba(255, 106, 0, 0.5)",
                            }}
                            whileTap={{
                              y: 1,
                              boxShadow: "3px 3px 0 rgba(255, 106, 0, 0.5)",
                            }}
                            transition={{ duration: 0.16 }}
                          >
                            {/* Hover glow */}
                            <motion.div
                              className="absolute inset-0"
                              style={{ backgroundColor: "#ff6a00" }}
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 0.1 }}
                              transition={{ duration: 0.2 }}
                            />

                            {/* Top highlight */}
                            <div
                              className="absolute top-0 left-0 right-0 h-px"
                              style={{ backgroundColor: "#ff6a00", opacity: 0.4 }}
                            />

                            <div className="flex items-center justify-center gap-3 relative z-10">
                              <motion.span
                                className="pixel"
                                style={{
                                  fontSize: "20px",
                                  color: "#ff6a00",
                                  letterSpacing: "0.06em",
                                }}
                                whileHover={{
                                  color: "#ff8833",
                                  textShadow: [
                                    "0 0 12px rgba(255, 106, 0, 0.6)",
                                    "0 0 24px rgba(255, 106, 0, 0.9)",
                                    "0 0 12px rgba(255, 106, 0, 0.6)",
                                  ],
                                }}
                                transition={{
                                  textShadow: {
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  },
                                  color: {
                                    duration: 0.2,
                                  },
                                }}
                              >
                                PAY 0.008 ETH
                              </motion.span>
                            </div>
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* PROCESSING STATE */}
                    {modalState === "processing" && (
                      <motion.div
                        key="processing"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ProcessingState currentStep={currentStep} />
                      </motion.div>
                    )}

                    {/* SUCCESS STATE */}
                    {modalState === "success" && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ResultState type="success" onClose={onPaymentComplete} />
                      </motion.div>
                    )}

                    {/* ERROR STATE */}
                    {modalState === "error" && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ResultState type="error" onRetry={handleRetry} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
