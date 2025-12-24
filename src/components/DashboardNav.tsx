import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sprout, LogOut } from "lucide-react";

interface DashboardNavProps {
  onDisconnect?: () => void;
}

export function DashboardNav({ onDisconnect }: DashboardNavProps) {
  const [scanline, setScanline] = useState(0);
  const [blinkState, setBlinkState] = useState(true);

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanline((prev) => (prev + 1) % 100);
    }, 30);
    return () => clearInterval(scanInterval);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b-4 border-[#333333] relative overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Animated scanline effect */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          backgroundColor: "#ff6600",
          opacity: 0.5,
          top: `${scanline}%`,
        }}
      />

      <div className="grid-container">
        <div className="flex items-center justify-between h-24">
          {/* Logo - Made bigger */}
          <motion.div
            className="flex items-center gap-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0 }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-[#ff6600] flex items-center justify-center pixel-shadow relative overflow-hidden"
              style={{ backgroundColor: "#ff6600" }}
              animate={{
                boxShadow: blinkState
                  ? "4px 4px 0 rgba(255, 102, 0, 0.5)"
                  : "6px 6px 0 rgba(255, 102, 0, 0.8)",
              }}
              transition={{ duration: 0 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sprout size={32} style={{ color: "#0a0a0a" }} strokeWidth={3} />
              </motion.div>

              {/* Pixel particles around logo */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#ff6600]"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    x: [0, Math.cos(i * Math.PI * 0.5) * 30],
                    y: [0, Math.sin(i * Math.PI * 0.5) * 30],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>

            <div>
              <motion.div
                className="pixel"
                style={{ color: "#ff6600", fontSize: "20px" }}
                animate={{
                  textShadow: [
                    "0 0 8px rgba(255, 102, 0, 0.5)",
                    "0 0 12px rgba(255, 102, 0, 0.8)",
                    "0 0 8px rgba(255, 102, 0, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                MEGACARROT
              </motion.div>
              <div className="mono text-xs" style={{ color: "#666666" }}>
                AGRICULTURAL CONTROL SYSTEM
              </div>
            </div>
          </motion.div>

          {/* Center title */}
          <div className="flex items-center gap-4">
            <motion.div
              className="w-3 h-3"
              style={{ backgroundColor: blinkState ? "#33ff66" : "#33ff66" }}
              animate={{
                scale: blinkState ? 1 : 0.8,
                opacity: blinkState ? 1 : 0.6,
              }}
              transition={{ duration: 0 }}
            />
            <div className="pixel" style={{ color: "#666666", fontSize: "14px" }}>
              COMMAND.INTERFACE
            </div>
            <motion.div
              className="w-3 h-3"
              style={{ backgroundColor: blinkState ? "#33ff66" : "#33ff66" }}
              animate={{
                scale: blinkState ? 1 : 0.8,
                opacity: blinkState ? 1 : 0.6,
              }}
              transition={{ duration: 0 }}
            />
          </div>

          {/* Right side - Balance and Disconnect */}
          <div className="flex items-center gap-4">
            {/* Balance indicator */}
            <motion.div
              className="flex items-center gap-3 px-6 h-12 border-4 border-[#333333] bg-[#1a1a1a] relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0 }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: "#33ff66" }}
                animate={{ opacity: [0, 0.05, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <motion.div
                className="w-3 h-3 relative z-10"
                style={{ backgroundColor: blinkState ? "#33ff66" : "#33ff66" }}
                animate={{
                  scale: blinkState ? 1 : 0.8,
                  opacity: blinkState ? 1 : 0.6,
                }}
                transition={{ duration: 0 }}
              />
              <motion.span
                className="mono relative z-10"
                style={{ color: "#33ff66", fontSize: "16px" }}
                animate={{
                  textShadow: blinkState
                    ? "0 0 8px rgba(51, 255, 102, 0.5)"
                    : "0 0 4px rgba(51, 255, 102, 0.3)",
                }}
                transition={{ duration: 0 }}
              >
                156,420
              </motion.span>

              {/* Pixel particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#33ff66]"
                  style={{
                    right: "20%",
                    top: "50%",
                  }}
                  animate={{
                    x: [0, 20],
                    y: [0, -15 - i * 5],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </motion.div>

            {/* Disconnect button */}
            <motion.button
              className="flex items-center gap-2 px-4 h-12 border-4 border-[#ff6600] mono text-sm relative overflow-hidden"
              style={{
                backgroundColor: "#1a1a1a",
                color: "#ff6600",
              }}
              whileHover={{
                backgroundColor: "#ff6600",
                color: "#0a0a0a",
                y: -4,
                boxShadow: "4px 8px 0 rgba(255, 102, 0, 0.5)",
              }}
              whileTap={{
                y: 0,
                boxShadow: "2px 2px 0 rgba(0, 0, 0, 0.5)",
              }}
              transition={{ duration: 0 }}
              onClick={onDisconnect}
            >
              <LogOut size={16} strokeWidth={2} />
              <span>EXIT</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom pixel bar animation */}
      <div className="h-2 border-t-2 border-[#333333] bg-[#0a0a0a] flex">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 h-full"
            style={{ backgroundColor: "#333333" }}
            animate={{
              backgroundColor:
                i % 10 === Math.floor(scanline / 10) % 10 ? "#ff6600" : "#333333",
            }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </div>
    </nav>
  );
}