import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface ProcessingStateProps {
  currentStep: number; // 0: Wallet prompt, 1: Tx sent, 2: Confirming, 3: Finalizing
}

export function ProcessingState({ currentStep }: ProcessingStateProps) {
  const [loaderRotation, setLoaderRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoaderRotation((prev) => (prev + 45) % 360);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: "WALLET PROMPT", step: 0 },
    { label: "TX SENT", step: 1 },
    { label: "CONFIRMING", step: 2 },
    { label: "FINALIZING", step: 3 },
  ];

  return (
    <div className="flex flex-col items-center py-8">
      {/* Pixel Loader */}
      <div className="relative w-24 h-24 mb-8">
        {/* Rotating pixel ring */}
        <motion.div
          className="absolute inset-0"
          style={{
            transform: `rotate(${loaderRotation}deg)`,
          }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 32;
            const y = Math.sin(rad) * 32;
            
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#ff6a00]"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 4px rgba(255, 106, 0, 0.6)",
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            );
          })}
        </motion.div>

        {/* Center carrot chip */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-8 h-8 border-2 border-[#ff6a00] flex items-center justify-center"
            style={{
              backgroundColor: "#ff6a00",
              boxShadow: "2px 2px 0 rgba(255, 106, 0, 0.3)",
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-3 h-4 bg-[#0a0a0a]" style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
          </motion.div>
        </div>
      </div>

      {/* Progress Status */}
      <motion.div
        className="pixel text-center mb-8"
        style={{
          fontSize: "16px",
          color: "#ff6a00",
          letterSpacing: "0.08em",
        }}
        animate={{
          opacity: [1, 0.6, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        BLOCK CONFIRMING...
      </motion.div>

      {/* Pixel Progress Bar */}
      <div
        className="w-full max-w-md border-2 border-[#2a2a2a] relative overflow-hidden mb-10"
        style={{
          height: "16px",
          backgroundColor: "#0f0f0f",
        }}
      >
        {/* Indeterminate shimmer */}
        <motion.div
          className="absolute inset-y-0"
          style={{
            width: "40%",
            background: "linear-gradient(90deg, transparent, rgba(255, 106, 0, 0.4), transparent)",
          }}
          animate={{
            x: ["-100%", "250%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Pixel segments */}
        <div className="flex h-full">
          {[...Array(32)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 border-r border-[#1a1a1a]"
              style={{
                backgroundColor: i % 4 === 0 ? "#1a1a1a" : "transparent",
              }}
              animate={{
                backgroundColor: [
                  i % 4 === 0 ? "#1a1a1a" : "transparent",
                  "#ff6a00",
                  i % 4 === 0 ? "#1a1a1a" : "transparent",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.05,
              }}
            />
          ))}
        </div>
      </div>

      {/* Mini Stepper */}
      <div className="flex items-center gap-2">
        {steps.map(({ label, step }, i) => (
          <div key={step} className="flex items-center gap-2">
            {/* Step indicator */}
            <motion.div
              className="flex items-center gap-2 px-4 py-2 border-2"
              style={{
                borderColor: currentStep >= step ? "#ff6a00" : "#2a2a2a",
                backgroundColor: currentStep === step ? "rgba(255, 106, 0, 0.1)" : "#0a0a0a",
                boxShadow:
                  currentStep === step
                    ? "0 0 12px rgba(255, 106, 0, 0.4)"
                    : "2px 2px 0 rgba(0, 0, 0, 0.3)",
              }}
              animate={
                currentStep === step
                  ? {
                      boxShadow: [
                        "0 0 8px rgba(255, 106, 0, 0.4)",
                        "0 0 16px rgba(255, 106, 0, 0.6)",
                        "0 0 8px rgba(255, 106, 0, 0.4)",
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              {/* Icon */}
              <div
                className="w-2 h-2"
                style={{
                  backgroundColor: currentStep >= step ? "#ff6a00" : "#333333",
                }}
              />
              
              {/* Label */}
              <span
                className="mono text-xs"
                style={{
                  color: currentStep >= step ? "#ff6a00" : "#555555",
                  letterSpacing: "0.08em",
                }}
              >
                {label}
              </span>
            </motion.div>

            {/* Connector */}
            {i < steps.length - 1 && (
              <div
                className="w-3 h-px"
                style={{
                  backgroundColor: currentStep > step ? "#ff6a00" : "#2a2a2a",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
