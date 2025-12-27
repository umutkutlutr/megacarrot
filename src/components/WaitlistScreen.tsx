import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronRight, Lock, AlertCircle } from "lucide-react";

interface WaitlistScreenProps {
  onBack?: () => void;
  onEnterGame?: () => void;
}

export function WaitlistScreen({ onBack, onEnterGame }: WaitlistScreenProps) {
  const [walletAddress, setWalletAddress] = useState("");
  const [queueCount, setQueueCount] = useState(3418);
  const [showCursor, setShowCursor] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Queue counter animation (slowly ticking up)
  useEffect(() => {
    const interval = setInterval(() => {
      setQueueCount((prev) => {
        if (prev < 10000) {
          return prev + Math.floor(Math.random() * 3);
        }
        return prev;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Hex particles
  const HexParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => {
        const size = Math.random() * 8 + 4;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              border: "1px solid",
              borderColor: i % 3 === 0 ? "rgba(255, 106, 0, 0.3)" : i % 3 === 1 ? "rgba(51, 255, 153, 0.3)" : "rgba(0, 204, 255, 0.3)",
            }}
            animate={{
              rotate: [0, 360],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Allow empty submission to enter the game
    if (onEnterGame) {
      onEnterGame();
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen relative overflow-hidden flex items-center justify-center"
        style={{
          backgroundColor: "#000000",
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(10, 10, 10, 1) 0%, rgba(0, 0, 0, 1) 100%)",
        }}
      >
        <HexParticles />

        {/* Success Panel */}
        <motion.div
          className="relative border"
          style={{
            width: "600px",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            borderColor: "#33ff99",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 60px rgba(51, 255, 153, 0.4), inset 0 0 40px rgba(51, 255, 153, 0.05)",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Inner glow border */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              border: "1px solid rgba(51, 255, 153, 0.3)",
              margin: "8px",
            }}
          />

          <div className="p-16 text-center">
            {/* Success Icon */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <div
                className="w-20 h-20 border-2 flex items-center justify-center"
                style={{
                  borderColor: "#33ff99",
                  boxShadow: "0 0 30px rgba(51, 255, 153, 0.5)",
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <ChevronRight size={40} color="#33ff99" />
                </motion.div>
              </div>
            </motion.div>

            {/* Success Title */}
            <motion.h2
              className="pixel mb-6"
              style={{
                fontSize: "32px",
                color: "#33ff99",
                letterSpacing: "0.15em",
                textShadow: "0 0 30px rgba(51, 255, 153, 0.6)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              ACCESS REQUEST RECEIVED
            </motion.h2>

            {/* Success Message */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p
                className="mono"
                style={{
                  fontSize: "12px",
                  color: "#33ff99",
                  letterSpacing: "0.1em",
                  lineHeight: 1.8,
                }}
              >
                Your channel has been logged in the protocol queue.
              </p>
              <p
                className="mono"
                style={{
                  fontSize: "11px",
                  color: "#666",
                  letterSpacing: "0.1em",
                  lineHeight: 1.8,
                }}
              >
                You will be notified when initialization permissions are granted.
              </p>

              {/* Email display */}
              <div
                className="mt-8 p-4 border inline-block"
                style={{
                  borderColor: "rgba(51, 255, 153, 0.3)",
                  backgroundColor: "rgba(51, 255, 153, 0.05)",
                }}
              >
                <div
                  className="mono"
                  style={{
                    fontSize: "10px",
                    color: "#666",
                    letterSpacing: "0.15em",
                    marginBottom: "8px",
                  }}
                >
                  REGISTERED CHANNEL:
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: "13px",
                    color: "#33ff99",
                    letterSpacing: "0.05em",
                  }}
                >
                  {walletAddress}
                </div>
              </div>
            </motion.div>

            {/* Back button */}
            {onBack && (
              <motion.button
                className="mt-12 px-8 py-3 border"
                style={{
                  backgroundColor: "rgba(51, 255, 153, 0.05)",
                  borderColor: "#33ff99",
                  color: "#33ff99",
                }}
                onClick={onBack}
                whileHover={{
                  backgroundColor: "rgba(51, 255, 153, 0.15)",
                  boxShadow: "0 0 30px rgba(51, 255, 153, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span
                  className="pixel"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.15em",
                  }}
                >
                  RETURN TO PROTOCOL
                </span>
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        backgroundColor: "#000000",
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(10, 10, 10, 1) 0%, rgba(0, 0, 0, 1) 100%)",
      }}
    >
      {/* Background effects */}
      <HexParticles />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to bottom, transparent 50%, rgba(255, 106, 0, 0.01) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%)",
        }}
      />

      {/* Main Panel */}
      <motion.div
        className="relative border"
        style={{
          width: "700px",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          borderColor: "#ff6a00",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 80px rgba(255, 106, 0, 0.3), inset 0 0 60px rgba(255, 106, 0, 0.05)",
        }}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Animated scanline sweep across panel */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            opacity: 0.4,
          }}
        >
          <motion.div
            className="absolute left-0 right-0 h-[2px]"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(255, 106, 0, 0.8), transparent)",
              boxShadow: "0 0 20px rgba(255, 106, 0, 0.8)",
            }}
            animate={{
              top: ["-2px", "100%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 3,
            }}
          />
        </motion.div>

        {/* Inner border glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            border: "1px solid rgba(255, 106, 0, 0.4)",
            margin: "8px",
          }}
        />

        {/* Lock icon header */}
        <div className="flex justify-center pt-12 pb-8">
          <motion.div
            className="w-16 h-16 border-2 flex items-center justify-center"
            style={{
              borderColor: "#ff6a00",
            }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(255, 106, 0, 0.4)",
                "0 0 40px rgba(255, 106, 0, 0.8)",
                "0 0 20px rgba(255, 106, 0, 0.4)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Lock size={32} color="#ff6a00" />
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1
          className="pixel text-center mb-4"
          style={{
            fontSize: "40px",
            color: "#ff6a00",
            letterSpacing: "0.15em",
            textShadow: "0 0 40px rgba(255, 106, 0, 0.5)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          ACCESS RESTRICTED
        </motion.h1>

        {/* Divider */}
        <motion.div
          className="mx-auto mb-8"
          style={{
            width: "400px",
            height: "1px",
            backgroundColor: "rgba(255, 106, 0, 0.3)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        />

        {/* Subtext */}
        <motion.div
          className="px-16 mb-12 text-center space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p
            className="mono"
            style={{
              fontSize: "13px",
              color: "#999",
              letterSpacing: "0.1em",
              lineHeight: 1.8,
            }}
          >
            This protocol is currently in closed initialization.
          </p>
          <p
            className="mono"
            style={{
              fontSize: "13px",
              color: "#999",
              letterSpacing: "0.1em",
              lineHeight: 1.8,
            }}
          >
            Join the waitlist to be considered for early access.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          className="px-16 pb-16"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {/* Email Input */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => {
                  setWalletAddress(e.target.value);
                  setError("");
                }}
                placeholder="enter your email…"
                className="w-full border bg-transparent mono"
                style={{
                  fontSize: "14px",
                  color: "#33ff99",
                  borderColor: error ? "#ff3366" : "rgba(51, 255, 153, 0.4)",
                  letterSpacing: "0.05em",
                  outline: "none",
                  backgroundColor: "rgba(51, 255, 153, 0.02)",
                  paddingLeft: "28px",
                  paddingRight: "24px",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = error ? "#ff3366" : "#33ff99";
                  e.target.style.boxShadow = error
                    ? "0 0 30px rgba(255, 51, 102, 0.3)"
                    : "0 0 30px rgba(51, 255, 153, 0.3)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = error ? "#ff3366" : "rgba(51, 255, 153, 0.4)";
                  e.target.style.boxShadow = "none";
                }}
              />
              {/* Blinking cursor inside input when focused */}
              {walletAddress === "" && (
                <motion.div
                  className="absolute top-1/2 pointer-events-none"
                  style={{
                    left: "28px",
                    width: "2px",
                    height: "16px",
                    backgroundColor: "#33ff99",
                    transform: "translateY(-50%)",
                    opacity: showCursor ? 1 : 0,
                  }}
                />
              )}
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                className="flex items-center gap-2 mt-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <AlertCircle size={14} color="#ff3366" />
                <span
                  className="mono"
                  style={{
                    fontSize: "10px",
                    color: "#ff3366",
                    letterSpacing: "0.1em",
                  }}
                >
                  {error}
                </span>
              </motion.div>
            )}
          </div>

          {/* CTA Button */}
          <motion.button
            type="submit"
            className="w-full py-5 border relative overflow-hidden group"
            style={{
              backgroundColor: "rgba(255, 106, 0, 0.1)",
              borderColor: "#ff6a00",
            }}
            whileHover={{
              backgroundColor: "rgba(255, 106, 0, 0.2)",
              boxShadow: "0 0 50px rgba(255, 106, 0, 0.5)",
            }}
            whileTap={{
              scale: 0.98,
              boxShadow: "0 0 80px rgba(255, 106, 0, 0.8)",
            }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(255, 106, 0, 0.2)",
                "0 0 40px rgba(255, 106, 0, 0.4)",
                "0 0 20px rgba(255, 106, 0, 0.2)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 3,
                repeat: Infinity,
              },
            }}
          >
            <span
              className="pixel relative z-10"
              style={{
                fontSize: "16px",
                color: "#ff6a00",
                letterSpacing: "0.15em",
              }}
            >
              REQUEST ACCESS
            </span>

            {/* Hover glow sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255, 106, 0, 0.3), transparent)",
                opacity: 0,
              }}
              whileHover={{
                opacity: 1,
                x: ["-100%", "100%"],
              }}
              transition={{
                x: { duration: 0.6, ease: "linear" },
              }}
            />
          </motion.button>

          {/* Tease text */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p
              className="mono"
              style={{
                fontSize: "10px",
                color: "#666",
                letterSpacing: "0.1em",
                lineHeight: 1.8,
              }}
            >
              Early participants may receive{" "}
              <span style={{ color: "#33ff99" }}>protocol advantages</span>.
            </p>
          </motion.div>
        </motion.form>

        {/* Queue Counter */}
        <motion.div
          className="border-t px-16 py-6 flex items-center justify-between"
          style={{
            borderColor: "rgba(255, 106, 0, 0.2)",
            backgroundColor: "rgba(255, 106, 0, 0.03)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div
            className="mono"
            style={{
              fontSize: "10px",
              color: "#666",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Initialization Queue:
          </div>
          <div className="flex items-center gap-3">
            <motion.span
              className="mono"
              style={{
                fontSize: "16px",
                color: "#ff6a00",
                letterSpacing: "0.1em",
              }}
              key={queueCount}
              initial={{ opacity: 0.5, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {queueCount.toLocaleString()}
            </motion.span>
            <span
              className="mono"
              style={{
                fontSize: "14px",
                color: "#444",
                letterSpacing: "0.1em",
              }}
            >
              / 10,000
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Back button */}
      {onBack && (
        <motion.button
          className="absolute top-8 left-8 px-6 py-3 border"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderColor: "rgba(255, 106, 0, 0.5)",
            backdropFilter: "blur(10px)",
            color: "#666",
          }}
          onClick={onBack}
          whileHover={{
            backgroundColor: "rgba(255, 106, 0, 0.1)",
            borderColor: "#ff6a00",
            boxShadow: "0 0 30px rgba(255, 106, 0, 0.3)",
            color: "#ff6a00",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        >
          <span
            className="pixel"
            style={{
              fontSize: "12px",
              letterSpacing: "0.15em",
            }}
          >
            BACK
          </span>
        </motion.button>
      )}
    </div>
  );
}