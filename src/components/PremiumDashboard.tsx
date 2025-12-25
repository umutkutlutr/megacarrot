import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Power, TrendingUp, Coins, Zap, Square, Wallet, Trophy, Users, Bell, User, HelpCircle } from "lucide-react";
import { BountyModal } from "./modals/BountyModal";
import { ReferModal } from "./modals/ReferModal";
import { AnnouncementsModal } from "./modals/AnnouncementsModal";
import { AccountModal } from "./modals/AccountModal";
import { HelpModal } from "./modals/HelpModal";
import { UpgradeModal } from "./modals/UpgradeModal";

interface PremiumDashboardProps {
  onDisconnect: () => void;
  farmTier: number;
  farmLevel: number;
  farmers: any[];
  maxFarmerSlots: number;
}

export function PremiumDashboard({
  onDisconnect,
  farmTier,
  farmLevel,
  farmers,
  maxFarmerSlots,
}: PremiumDashboardProps) {
  // State
  const [output, setOutput] = useState(0);
  const [carrotBalance, setCarrotBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0.05);
  const [megaBalance, setMegaBalance] = useState(1250);
  const [sessionYield, setSessionYield] = useState(0);
  const [scanlineY, setScanlineY] = useState(0);
  const [systemLog, setSystemLog] = useState("");
  const [activeBalanceGlow, setActiveBalanceGlow] = useState(0);
  const [vaultSweepY, setVaultSweepY] = useState(-100);
  
  // Action menu state
  const [unreadAnnouncements, setUnreadAnnouncements] = useState(true);
  const [availableBounties, setAvailableBounties] = useState(3);

  // Modal states
  const [bountyModalOpen, setBountyModalOpen] = useState(false);
  const [referModalOpen, setReferModalOpen] = useState(false);
  const [announcementsModalOpen, setAnnouncementsModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

  // Animation states
  const [prevOutput, setPrevOutput] = useState(0);
  const [prevSessionYield, setPrevSessionYield] = useState(0);
  const [numberFlash, setNumberFlash] = useState<{ [key: string]: boolean }>({});

  // Detect prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Calculate metrics
  const occupiedSlots = farmers.reduce((sum, f) => sum + (f.slotSize || 1), 0);
  const outputPerSec = 2.5 * farmTier * (1 + farmLevel * 0.1);

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

  // Animations
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setScanlineY((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 30);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveBalanceGlow((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Vault sweep animation
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setVaultSweepY(-100);
      setTimeout(() => {
        setVaultSweepY(100);
      }, 50);
    }, 8000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newOutput = output + outputPerSec;
      const newYield = sessionYield + outputPerSec;
      
      // Trigger number flash animation
      if (!prefersReducedMotion) {
        setNumberFlash({ output: true, yield: true });
        setTimeout(() => setNumberFlash({}), 200);
      }
      
      setPrevOutput(output);
      setPrevSessionYield(sessionYield);
      setOutput(newOutput);
      setCarrotBalance((prev) => prev + outputPerSec);
      setSessionYield(newYield);
    }, 1000);
    return () => clearInterval(interval);
  }, [output, sessionYield, outputPerSec, prefersReducedMotion]);

  useEffect(() => {
    const logs = [
      "SYSTEM >> Protocol active... monitoring yield",
      "BLOCKCHAIN >> Transaction confirmed on chain",
      "FARM >> Production cycle 247 complete",
      "OPERATIVE >> Efficiency optimal",
      "NETWORK >> Synchronization stable",
    ];
    let logIndex = 0;
    const interval = setInterval(() => {
      setSystemLog(logs[logIndex]);
      logIndex = (logIndex + 1) % logs.length;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleClaim = () => {
    setSessionYield(0);
    // Claim logic here
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* Animated Grid Parallax Background */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(0, 188, 235, 0.3) 15px, rgba(0, 188, 235, 0.3) 16px),
              repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(0, 188, 235, 0.3) 15px, rgba(0, 188, 235, 0.3) 16px)
            `,
            backgroundSize: "100% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Drifting Pixel Particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#00a8cc]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.1,
              }}
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      )}

      {/* Background layers */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 7px, rgba(0, 188, 235, 0.5) 7px, rgba(0, 188, 235, 0.5) 8px),
            repeating-linear-gradient(90deg, transparent, transparent 7px, rgba(0, 188, 235, 0.5) 7px, rgba(0, 188, 235, 0.5) 8px)
          `,
        }}
      />

      {/* Scanline */}
      {!prefersReducedMotion && (
        <div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            top: `${scanlineY}%`,
            backgroundColor: "#00a8cc",
            opacity: 0.06,
            boxShadow: "0 0 6px rgba(0, 168, 204, 0.3)",
          }}
        />
      )}

      {/* TOP BAR */}
      <div
        className="fixed top-0 left-0 right-0 h-16 border-b-2 border-[#1a1a1a] z-50"
        style={{ backgroundColor: "rgba(10, 10, 10, 0.98)" }}
      >
        <div className="max-w-[1440px] mx-auto px-8 h-full flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-4">
            <div
              className="w-8 h-8 border-2 border-[#ff6a00] flex items-center justify-center"
              style={{ backgroundColor: "#ff6a00" }}
            >
              <Square size={16} style={{ color: "#0a0a0a" }} strokeWidth={3} />
            </div>
            <div>
              <div
                className="pixel"
                style={{ fontSize: "16px", color: "#ff6a00", letterSpacing: "0.05em" }}
              >
                MEGACARROT
              </div>
              <div
                className="mono text-xs"
                style={{ color: "#555555", letterSpacing: "0.1em", marginTop: "2px" }}
              >
                AGRICULTURAL CONTROL SYSTEM
              </div>
            </div>
          </div>

          {/* Center-Left: Action Menu */}
          <div className="flex items-center gap-2">
            {/* BOUNTY */}
            <ActionMenuButton
              icon={Trophy}
              label="BOUNTY"
              onClick={() => setBountyModalOpen(true)}
            />

            {/* REFER */}
            <ActionMenuButton
              icon={Users}
              label="REFER"
              onClick={() => setReferModalOpen(true)}
            />

            {/* ANNOUNCEMENTS */}
            <ActionMenuButton
              icon={Bell}
              label="ANNOUNCEMENTS"
              onClick={() => {
                console.log("Announcements clicked");
                setUnreadAnnouncements(false);
                setAnnouncementsModalOpen(true);
              }}
            />

            {/* ACCOUNT */}
            <ActionMenuButton
              icon={User}
              label="ACCOUNT"
              onClick={() => setAccountModalOpen(true)}
            />

            {/* HELP */}
            <ActionMenuButton
              icon={HelpCircle}
              label="HELP"
              onClick={() => setHelpModalOpen(true)}
            />
          </div>

          {/* Center-Right: Status */}
          <div className="flex items-center gap-3">
            <motion.div
              className="w-2 h-2 bg-[#33ff99]"
              animate={{
                opacity: [1, 0.4, 1],
                boxShadow: [
                  "0 0 4px rgba(51, 255, 153, 0.6)",
                  "0 0 8px rgba(51, 255, 153, 0.9)",
                  "0 0 4px rgba(51, 255, 153, 0.6)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span
              className="mono"
              style={{ fontSize: "10px", color: "#33ff99", letterSpacing: "0.1em" }}
            >
              COMMAND INTERFACE
            </span>
          </div>

          {/* Right: Exit */}
          <motion.button
            className="border-2 border-[#ff6a00] px-6 py-2 relative"
            style={{
              backgroundColor: "#0a0a0a",
              boxShadow: "3px 3px 0 rgba(255, 106, 0, 0.3)",
            }}
            onClick={onDisconnect}
            whileHover={{
              boxShadow: "4px 4px 0 rgba(255, 106, 0, 0.5)",
              y: -1,
            }}
            whileTap={{
              y: 0,
              boxShadow: "2px 2px 0 rgba(255, 106, 0, 0.5)",
            }}
          >
            <span
              className="pixel text-xs"
              style={{ color: "#ff6a00", letterSpacing: "0.08em" }}
            >
              EXIT
            </span>
          </motion.button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div
        className="fixed inset-0 pt-16 pb-12"
        style={{ maxWidth: "1440px", margin: "0 auto", padding: "64px 32px 48px" }}
      >
        {/* MAIN METRICS ROW */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* OUTPUT */}
          <div
            className="border-3 border-[#2a2a2a] relative"
            style={{
              backgroundColor: "#0f0f0f",
              boxShadow: "4px 4px 0 rgba(0, 0, 0, 0.4)",
              padding: "20px",
            }}
          >
            <div
              className="mono text-xs mb-3"
              style={{ color: "#888888", letterSpacing: "0.1em" }}
            >
              OUTPUT / SEC
            </div>
            <div
              className="pixel"
              style={{
                fontSize: "32px",
                color: "#ff6a00",
                letterSpacing: "-0.02em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {outputPerSec.toFixed(2)}
            </div>
            {/* Animated progress line */}
            <div className="mt-4 h-px bg-[#1a1a1a] relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#ff6a00]"
                animate={{
                  width: ["0%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ opacity: 0.6 }}
              />
            </div>
          </div>

          {/* PROTOCOL BALANCE (Main Focus) */}
          <div
            className="border-3 border-[#33ff99] relative"
            style={{
              backgroundColor: "#0f0f0f",
              boxShadow: "5px 5px 0 rgba(51, 255, 153, 0.2)",
              padding: "20px",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-[#33ff99]" style={{ opacity: 0.3 }} />
            <div
              className="pixel text-sm mb-4"
              style={{ color: "#33ff99", letterSpacing: "0.08em" }}
            >
              PROTOCOL BALANCE
            </div>

            {/* 3 Stacked Balances */}
            <div className="space-y-3">
              {[
                { icon: "🥕", label: "CARROT", value: carrotBalance, glow: activeBalanceGlow === 0 },
                { icon: "Ξ", label: "ETH", value: ethBalance, glow: activeBalanceGlow === 1 },
                { icon: "◼︎", label: "MEGA", value: megaBalance, glow: activeBalanceGlow === 2 },
              ].map(({ icon, label, value, glow }, i) => (
                <motion.div
                  key={label}
                  className="flex items-center gap-3"
                  animate={{
                    boxShadow: glow
                      ? [
                          "0 0 0 rgba(51, 255, 153, 0)",
                          "0 0 12px rgba(51, 255, 153, 0.4)",
                          "0 0 0 rgba(51, 255, 153, 0)",
                        ]
                      : "0 0 0 rgba(51, 255, 153, 0)",
                  }}
                  transition={{ duration: 1.5 }}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: glow ? "rgba(51, 255, 153, 0.05)" : "transparent",
                    border: glow ? "1px solid rgba(51, 255, 153, 0.2)" : "1px solid transparent",
                  }}
                >
                  <span className="text-lg">{icon}</span>
                  <span
                    className="mono text-xs flex-1"
                    style={{ color: "#888888", letterSpacing: "0.08em" }}
                  >
                    {label}
                  </span>
                  <span
                    className="pixel text-sm"
                    style={{
                      color: glow ? "#33ff99" : "#cccccc",
                      fontVariantNumeric: "tabular-nums",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {typeof value === "number" && value < 1
                      ? value.toFixed(4)
                      : value.toLocaleString()}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* YIELD (with CLAIM button) */}
          <div
            className="border-3 border-[#2a2a2a] relative"
            style={{
              backgroundColor: "#0f0f0f",
              boxShadow: "4px 4px 0 rgba(0, 0, 0, 0.4)",
              padding: "20px",
            }}
          >
            <div
              className="mono text-xs mb-3"
              style={{ color: "#888888", letterSpacing: "0.1em" }}
            >
              YIELD (THIS SESSION)
            </div>
            <div
              className="pixel mb-4"
              style={{
                fontSize: "32px",
                color: "#33ff99",
                letterSpacing: "-0.02em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {sessionYield.toFixed(2)}
            </div>

            {/* CLAIM Button */}
            <motion.button
              className="border-2 border-[#ff6a00] px-8 py-3 w-full relative overflow-hidden"
              style={{
                backgroundColor: "#0a0a0a",
                boxShadow: "3px 3px 0 rgba(255, 106, 0, 0.3)",
              }}
              onClick={handleClaim}
              disabled={sessionYield < 1}
              whileHover={
                sessionYield >= 1
                  ? {
                      boxShadow: "4px 4px 0 rgba(255, 106, 0, 0.5)",
                      y: -1,
                    }
                  : {}
              }
              whileTap={
                sessionYield >= 1
                  ? {
                      y: 0,
                      scale: 0.98,
                    }
                  : {}
              }
              animate={
                sessionYield >= 1
                  ? {
                      boxShadow: [
                        "3px 3px 0 rgba(255, 106, 0, 0.3)",
                        "4px 4px 0 rgba(255, 106, 0, 0.6)",
                        "3px 3px 0 rgba(255, 106, 0, 0.3)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div
                className="absolute inset-0 bg-[#ff6a00]"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: sessionYield >= 1 ? 0.1 : 0 }}
              />
              <span
                className="pixel text-xs relative z-10"
                style={{
                  color: sessionYield >= 1 ? "#ff6a00" : "#444444",
                  letterSpacing: "0.08em",
                }}
              >
                CLAIM
              </span>
            </motion.button>
          </div>
        </div>

        {/* FARM SECTION + FARMER SLOTS */}
        <div className="grid grid-cols-[500px_1fr] gap-6 mb-8">
          {/* Left: Farm Visual */}
          <div
            className="border-3 border-[#2a2a2a] relative aspect-square overflow-hidden"
            style={{
              backgroundColor: "#0f0f0f",
              boxShadow: "5px 5px 0 rgba(0, 0, 0, 0.4)",
              padding: "24px",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-[#ff6a00]" style={{ opacity: 0.2 }} />

            {/* Tier Badge */}
            <motion.div
              className="absolute top-4 right-4 border-2 border-[#ff6a00] px-4 py-2 cursor-pointer"
              style={{
                backgroundColor: "#ff6a00",
                boxShadow: "3px 3px 0 rgba(255, 106, 0, 0.3)",
              }}
              onClick={() => setUpgradeModalOpen(true)}
              animate={{
                boxShadow: [
                  "3px 3px 0 rgba(255, 106, 0, 0.3)",
                  "4px 4px 0 rgba(255, 106, 0, 0.5)",
                  "3px 3px 0 rgba(255, 106, 0, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              whileHover={{
                scale: 1.05,
                boxShadow: "5px 5px 0 rgba(255, 106, 0, 0.7)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span
                className="pixel text-xs"
                style={{ color: "#0a0a0a", letterSpacing: "0.08em" }}
              >
                TIER-{farmTier}
              </span>
            </motion.div>

            {/* Dystopian Farm Visual */}
            <div className="flex items-center justify-center h-full">
              <div
                className="relative"
                style={{ width: "320px", height: "320px" }}
              >
                {/* Soil Rows - Dystopian Farm Fields */}
                <div className="absolute inset-0 grid grid-rows-7 gap-2">
                  {[...Array(7)].map((_, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="relative overflow-hidden"
                      style={{
                        opacity: rowIndex < farmTier ? 1 : 0.2,
                      }}
                    >
                      {/* Soil Row */}
                      <div
                        className="h-full border-y border-[#3a2a1a]"
                        style={{
                          backgroundColor: rowIndex < farmTier ? "#2a1a0a" : "#1a1a1a",
                          position: "relative",
                        }}
                      >
                        {/* Soil texture lines */}
                        <div
                          className="absolute inset-0 opacity-30"
                          style={{
                            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(58, 42, 26, 0.5) 3px, rgba(58, 42, 26, 0.5) 4px)`,
                          }}
                        />
                        
                        {/* Carrots growing - only in active tiers */}
                        {rowIndex < farmTier && (
                          <div className="absolute inset-0 flex items-center justify-around px-2">
                            {[...Array(5)].map((_, carrotIndex) => (
                              <motion.div
                                key={carrotIndex}
                                className="flex flex-col items-center"
                                initial={{ y: 5, opacity: 0 }}
                                animate={{
                                  y: [5, 0, 5],
                                  opacity: [0.6, 1, 0.6],
                                }}
                                transition={{
                                  duration: 3 + Math.random() * 2,
                                  repeat: Infinity,
                                  delay: carrotIndex * 0.3 + rowIndex * 0.2,
                                }}
                              >
                                {/* Carrot top (green leaves) */}
                                <div
                                  style={{
                                    width: "3px",
                                    height: "4px",
                                    backgroundColor: "#33ff66",
                                    boxShadow: "0 0 2px rgba(51, 255, 102, 0.5)",
                                  }}
                                />
                                {/* Carrot body */}
                                <div
                                  style={{
                                    width: "2px",
                                    height: "6px",
                                    backgroundColor: "#ff6a00",
                                    boxShadow: "0 0 3px rgba(255, 106, 0, 0.6)",
                                  }}
                                />
                              </motion.div>
                            ))}
                          </div>
                        )}
                        
                        {/* Locked overlay for inactive tiers */}
                        {rowIndex >= farmTier && (
                          <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                              backgroundColor: "rgba(10, 10, 10, 0.8)",
                            }}
                          >
                            <div
                              className="pixel text-xs"
                              style={{
                                color: "#555555",
                                letterSpacing: "0.08em",
                                textShadow: "0 0 4px rgba(0, 0, 0, 0.8)",
                              }}
                            >
                              LOCKED
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Row number indicator */}
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 mono text-xs"
                        style={{
                          color: rowIndex < farmTier ? "#ff6a00" : "#333333",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {rowIndex + 1}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Production particles floating up */}
                {!prefersReducedMotion && farmTier > 0 && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          backgroundColor: "#ff6a00",
                          boxShadow: "0 0 4px rgba(255, 106, 0, 0.8)",
                        }}
                        initial={{ bottom: "0%", opacity: 0 }}
                        animate={{
                          bottom: "100%",
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 4 + Math.random() * 2,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </div>
                )}
                
                {/* Upgrade prompt overlay */}
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 border-2 border-[#33ff99] px-4 py-2 cursor-pointer"
                  style={{
                    backgroundColor: "rgba(10, 10, 10, 0.95)",
                    boxShadow: "3px 3px 0 rgba(51, 255, 153, 0.3)",
                  }}
                  onClick={() => setUpgradeModalOpen(true)}
                  animate={{
                    boxShadow: [
                      "3px 3px 0 rgba(51, 255, 153, 0.3)",
                      "4px 4px 0 rgba(51, 255, 153, 0.6)",
                      "3px 3px 0 rgba(51, 255, 153, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "5px 5px 0 rgba(51, 255, 153, 0.8)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span
                    className="pixel text-xs"
                    style={{ color: "#33ff99", letterSpacing: "0.08em" }}
                  >
                    UPGRADE FARM
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right: Farm Stats + Farmer Slots */}
          <div
            className="border-3 border-[#2a2a2a]"
            style={{
              backgroundColor: "#0f0f0f",
              boxShadow: "5px 5px 0 rgba(0, 0, 0, 0.4)",
              padding: "24px",
            }}
          >
            {/* Dynamic Title */}
            <div
              className="pixel mb-6"
              style={{
                fontSize: "24px",
                color: "#ff6a00",
                letterSpacing: "0.05em",
              }}
            >
              {getTierName(farmTier)}
            </div>

            {/* Metrics */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <span
                  className="mono text-xs"
                  style={{ color: "#888888", letterSpacing: "0.08em" }}
                >
                  PRODUCTION / SEC
                </span>
                <span
                  className="pixel text-sm"
                  style={{ color: "#33ff99", fontVariantNumeric: "tabular-nums" }}
                >
                  {outputPerSec.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="mono text-xs"
                  style={{ color: "#888888", letterSpacing: "0.08em" }}
                >
                  FARM LEVEL
                </span>
                <span
                  className="pixel text-sm"
                  style={{ color: "#00a8cc", fontVariantNumeric: "tabular-nums" }}
                >
                  {farmLevel}
                </span>
              </div>
            </div>

            {/* FARMER CAPACITY - Horizontal Slot Rack */}
            <div>
              <div
                className="mono text-xs mb-4"
                style={{ color: "#888888", letterSpacing: "0.08em" }}
              >
                FARMER CAPACITY
              </div>
              <div className="flex gap-2">
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 aspect-square border-2 relative group"
                    style={{
                      borderColor: i < occupiedSlots ? "#33ff99" : "#2a2a2a",
                      backgroundColor: i < occupiedSlots ? "rgba(51, 255, 153, 0.08)" : "#0a0a0a",
                      boxShadow:
                        i < occupiedSlots
                          ? "0 0 8px rgba(51, 255, 153, 0.3)"
                          : "2px 2px 0 rgba(0, 0, 0, 0.3)",
                    }}
                    animate={
                      i < occupiedSlots
                        ? {
                            boxShadow: [
                              "0 0 6px rgba(51, 255, 153, 0.2)",
                              "0 0 12px rgba(51, 255, 153, 0.4)",
                              "0 0 6px rgba(51, 255, 153, 0.2)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                      <div
                        className="border-2 border-[#333333] px-3 py-2 mono text-xs"
                        style={{
                          backgroundColor: "#0a0a0a",
                          color: "#888888",
                          boxShadow: "3px 3px 0 rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        {i < maxFarmerSlots
                          ? i < occupiedSlots
                            ? "SLOT OCCUPIED"
                            : "SLOT AVAILABLE"
                          : "UPGRADE FARM TO UNLOCK"}
                      </div>
                    </div>

                    {/* Slot indicator */}
                    {i < occupiedSlots && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Zap size={20} style={{ color: "#33ff99" }} strokeWidth={2.5} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DIGITAL VAULT */}
        <div
          className="border-3 border-[#00a8cc] relative overflow-hidden"
          style={{
            backgroundColor: "#0f0f0f",
            boxShadow: "5px 5px 0 rgba(0, 168, 204, 0.2)",
            padding: "24px",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-[#00a8cc]" style={{ opacity: 0.3 }} />
          
          {/* Terminal Sweep Effect */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent 0%, rgba(0, 168, 204, 0.2) 50%, transparent 100%)",
                height: "200%",
                top: `${vaultSweepY}%`,
              }}
              animate={{
                top: vaultSweepY === -100 ? "-100%" : "100%",
              }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
              }}
            />
          )}
          
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div
                className="pixel text-sm mb-2"
                style={{ color: "#00a8cc", letterSpacing: "0.08em" }}
              >
                DIGITAL VAULT
              </div>
              <div
                className="mono text-xs"
                style={{ color: "#666666", letterSpacing: "0.1em" }}
              >
                Treasury Terminal
              </div>
            </div>
            <div className="text-right">
              <div
                className="mono text-xs mb-2"
                style={{ color: "#888888", letterSpacing: "0.08em" }}
              >
                TOTAL BALANCE
              </div>
              <div
                className="pixel"
                style={{
                  fontSize: "32px",
                  color: "#00a8cc",
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "-0.02em",
                }}
              >
                {(carrotBalance + megaBalance).toLocaleString()}
              </div>
            </div>
            <motion.button
              className="border-2 border-[#00a8cc] px-10 py-4 relative overflow-hidden"
              style={{
                backgroundColor: "#0a0a0a",
                boxShadow: "3px 3px 0 rgba(0, 168, 204, 0.3)",
              }}
              onClick={handleClaim}
              whileHover={{
                boxShadow: "4px 4px 0 rgba(0, 168, 204, 0.5)",
                y: -1,
              }}
              whileTap={{
                y: 0,
                scale: 0.98,
              }}
            >
              {/* Hover sweep */}
              <motion.div
                className="absolute inset-0 bg-[#00a8cc]"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
              />
              <span
                className="pixel text-xs relative z-10"
                style={{ color: "#00a8cc", letterSpacing: "0.08em" }}
              >
                CLAIM
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* BOTTOM STATUS BAR */}
      <div
        className="fixed bottom-0 left-0 right-0 h-12 border-t-2 border-[#1a1a1a] z-50"
        style={{ backgroundColor: "rgba(10, 10, 10, 0.98)" }}
      >
        <div className="max-w-[1440px] mx-auto px-8 h-full flex items-center justify-between">
          {/* Left: System status */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 bg-[#33ff99]"
                animate={{
                  opacity: [1, 0.4, 1],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span
                className="mono text-xs"
                style={{ color: "#33ff99", letterSpacing: "0.08em" }}
              >
                ONLINE
              </span>
            </div>
            <span
              className="mono text-xs"
              style={{ color: "#666666", letterSpacing: "0.08em" }}
            >
              FARM TIER: <span style={{ color: "#ff6a00" }}>{farmTier}</span>
            </span>
            <span
              className="mono text-xs"
              style={{ color: "#666666", letterSpacing: "0.08em" }}
            >
              FARMERS: <span style={{ color: "#33ff99" }}>{occupiedSlots}/{maxFarmerSlots}</span>
            </span>
            <span
              className="mono text-xs"
              style={{ color: "#666666", letterSpacing: "0.08em" }}
            >
              WALLET ACTIVE
            </span>
          </div>

          {/* Right: Scrolling system log */}
          <motion.div
            className="mono text-xs overflow-hidden"
            style={{
              color: "#555555",
              letterSpacing: "0.08em",
              maxWidth: "600px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {systemLog}
          </motion.div>
        </div>
      </div>

      {/* MODALS */}
      <BountyModal isOpen={bountyModalOpen} onClose={() => setBountyModalOpen(false)} />
      <ReferModal isOpen={referModalOpen} onClose={() => setReferModalOpen(false)} />
      <AnnouncementsModal isOpen={announcementsModalOpen} onClose={() => setAnnouncementsModalOpen(false)} />
      <AccountModal isOpen={accountModalOpen} onClose={() => setAccountModalOpen(false)} />
      <HelpModal isOpen={helpModalOpen} onClose={() => setHelpModalOpen(false)} />
      <UpgradeModal 
        isOpen={upgradeModalOpen} 
        onClose={() => setUpgradeModalOpen(false)}
        currentTier={farmTier}
        currentLevel={farmLevel}
      />
    </div>
  );
}

// Action Menu Button Component
interface ActionMenuButtonProps {
  icon: any;
  label: string;
  counter?: number;
  hasNotification?: boolean;
  onClick: () => void;
}

function ActionMenuButton({
  icon: Icon,
  label,
  counter,
  hasNotification,
  onClick,
}: ActionMenuButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      className="relative"
      style={{
        backgroundColor: "transparent",
        padding: "4px 8px",
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
    >
      {/* Label */}
      <span
        className="pixel"
        style={{ 
          fontSize: "14px",
          color: hovered ? "#ff8833" : "#ff6a00", 
          letterSpacing: "0.05em",
          transition: "color 0.2s",
        }}
      >
        {label}
      </span>

      {/* Counter badge (for BOUNTY) */}
      {counter !== undefined && counter > 0 && (
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 border border-[#ff6a00] flex items-center justify-center"
          style={{
            backgroundColor: "#ff6a00",
            boxShadow: "0 0 8px rgba(255, 106, 0, 0.6)",
          }}
          animate={{
            boxShadow: [
              "0 0 6px rgba(255, 106, 0, 0.4)",
              "0 0 12px rgba(255, 106, 0, 0.8)",
              "0 0 6px rgba(255, 106, 0, 0.4)",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span
            className="pixel"
            style={{ fontSize: "9px", color: "#0a0a0a", lineHeight: 1 }}
          >
            {counter}
          </span>
        </motion.div>
      )}

      {/* Notification dot (for ANNOUNCEMENTS) */}
      {hasNotification && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3"
          style={{
            backgroundColor: "#ff6a00",
            boxShadow: "0 0 8px rgba(255, 106, 0, 0.8)",
          }}
          animate={{
            opacity: [1, 0.5, 1],
            boxShadow: [
              "0 0 6px rgba(255, 106, 0, 0.6)",
              "0 0 12px rgba(255, 106, 0, 1)",
              "0 0 6px rgba(255, 106, 0, 0.6)",
            ],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}