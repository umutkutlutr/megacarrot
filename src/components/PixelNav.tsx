import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sprout } from "lucide-react";

const tabs = [
  { id: "overview", label: "OVERVIEW" },
  { id: "farms", label: "FARMS" },
  { id: "operatives", label: "OPERATIVES" },
  { id: "upgrades", label: "UPGRADES" },
  { id: "vault", label: "VAULT" },
];

interface PixelNavProps {
  onTabChange?: (tabId: string) => void;
}

export function PixelNav({ onTabChange }: PixelNavProps) {
  const [activeTab, setActiveTab] = useState("overview");
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

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

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
                className="pixel mb-1"
                style={{ color: "#ff6600", fontSize: "18px" }}
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                CARROT.SYS
              </motion.div>
              <div className="mono text-xs" style={{ color: "#666666" }}>
                v1.0.7
              </div>
            </div>
          </motion.div>

          {/* Tabs - Made bigger with effects */}
          <div className="flex items-center gap-2">
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  className={`
                    mono px-6 h-12 border-4 transition-none relative overflow-hidden
                    ${
                      isActive
                        ? "border-[#ff6600] bg-[#ff6600] text-[#0a0a0a]"
                        : "border-[#333333] bg-[#1a1a1a] text-[#999999]"
                    }
                  `}
                  style={{
                    fontSize: isActive ? "14px" : "12px",
                  }}
                  onClick={() => handleTabClick(tab.id)}
                  whileHover={{
                    y: -4,
                    boxShadow: isActive
                      ? "4px 8px 0 rgba(255, 102, 0, 0.5)"
                      : "4px 8px 0 rgba(51, 51, 51, 0.5)",
                  }}
                  whileTap={{
                    y: 0,
                    boxShadow: "2px 2px 0 rgba(0, 0, 0, 0.5)",
                  }}
                  transition={{ duration: 0 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Active tab indicator pixels */}
                  {isActive && (
                    <>
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 flex gap-px"
                        style={{ backgroundColor: "#0a0a0a" }}
                      >
                        {[...Array(10)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="flex-1 h-full"
                            style={{ backgroundColor: "#0a0a0a" }}
                            animate={{
                              opacity: [1, 0.3, 1],
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.08,
                            }}
                          />
                        ))}
                      </motion.div>

                      {/* Corner pixels animation */}
                      <motion.div
                        className="absolute top-1 left-1 w-1 h-1 bg-[#0a0a0a]"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute top-1 right-1 w-1 h-1 bg-[#0a0a0a]"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
                      />
                    </>
                  )}

                  {tab.label}
                </motion.button>
              );
            })}
          </div>

          {/* Balance indicator - Made bigger with effects */}
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
                i % 10 === Math.floor(scanline / 10) % 10
                  ? "#ff6600"
                  : "#333333",
            }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </div>
    </nav>
  );
}