import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Power, TrendingUp, Coins, Zap, Square, Wallet, Trophy, Users, Bell, User, HelpCircle, ArrowUpCircle, Clock } from "lucide-react";
import { BountyModal } from "./modals/BountyModal";
import { ReferModal } from "./modals/ReferModal";
import { AnnouncementsModal } from "./modals/AnnouncementsModal";
import { AccountModal } from "./modals/AccountModal";
import { HelpModal } from "./modals/HelpModal";
import { UpgradeFarmModal } from "./modals/UpgradeFarmModal";

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
  const [activeBalanceGlow, setActiveBalanceGlow] = useState(0);
  
  // Action menu state
  const [unreadAnnouncements, setUnreadAnnouncements] = useState(true);
  const [availableBounties, setAvailableBounties] = useState(3);

  // Modal states
  const [bountyModalOpen, setBountyModalOpen] = useState(false);
  const [referModalOpen, setReferModalOpen] = useState(false);
  const [announcementsModalOpen, setAnnouncementsModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  
  // Upgrade panel state
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);

  // Live metrics
  const [halvingCountdown, setHalvingCountdown] = useState(432156); // seconds
  const [totalBurnedSupply, setTotalBurnedSupply] = useState(20766757);
  const [systemOutputPerSec, setSystemOutputPerSec] = useState(1847.23);
  const [currentTokenSupply, setCurrentTokenSupply] = useState(51233243);
  const [tokenPrice, setTokenPrice] = useState(0.000368); // USD per token
  const [farmPower, setFarmPower] = useState(12450);
  const [userRank, setUserRank] = useState(1284);
  const [systemShare, setSystemShare] = useState(0.018);

  // Detect prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Calculate metrics
  const occupiedSlots = farmers.reduce((sum, f) => sum + (f.slotSize || 1), 0);
  const outputPerHour = 2.5 * farmTier * (1 + farmLevel * 0.1) * 3600; // converted to per hour

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

  // Format halving countdown
  const formatHalvingTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    return `${days}D ${hours}H`;
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

  useEffect(() => {
    const interval = setInterval(() => {
      const newOutput = output + (outputPerHour / 3600);
      const newYield = sessionYield + (outputPerHour / 3600);
      
      setOutput(newOutput);
      setCarrotBalance((prev) => prev + (outputPerHour / 3600));
      setSessionYield(newYield);
      
      // Update halving countdown
      setHalvingCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [output, sessionYield, outputPerHour]);

  const handleClaim = () => {
    setSessionYield(0);
    // Claim logic here
  };

  const handleUpgradeFarm = () => {
    // Direct wallet transaction
    console.log("Opening wallet transaction for farm upgrade...");
    // In real implementation, this would trigger MetaMask/wallet
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        backgroundColor: "#050505",
      }}
    >
      {/* Animated Grid Parallax Background */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 16px, rgba(0, 204, 255, 0.4) 16px, rgba(0, 204, 255, 0.4) 17px),
              repeating-linear-gradient(90deg, transparent, transparent 16px, rgba(0, 204, 255, 0.4) 16px, rgba(0, 204, 255, 0.4) 17px)
            `,
            backgroundSize: "100% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Scanline */}
      {!prefersReducedMotion && (
        <div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            top: `${scanlineY}%`,
            backgroundColor: "#00ccff",
            opacity: 0.08,
            boxShadow: "0 0 8px rgba(0, 204, 255, 0.4)",
          }}
        />
      )}

      {/* TOP BAR */}
      <div
        className="fixed top-0 left-0 right-0 h-16 border-b z-50"
        style={{ 
          backgroundColor: "rgba(5, 5, 5, 0.98)",
          borderColor: "#1a1a1a",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="max-w-[1600px] mx-auto px-8 h-full flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-4">
            <div
              className="w-8 h-8 border-2 flex items-center justify-center"
              style={{ 
                backgroundColor: "#ff6a00",
                borderColor: "#ff6a00",
                boxShadow: "0 0 12px rgba(255, 106, 0, 0.5)",
              }}
            >
              <Square size={16} style={{ color: "#050505" }} strokeWidth={3} />
            </div>
            <div>
              <div
                className="pixel"
                style={{ fontSize: "14px", color: "#ff6a00", letterSpacing: "0.05em" }}
              >
                MEGACARROT
              </div>
              <div
                className="mono"
                style={{ fontSize: "8px", color: "#555555", letterSpacing: "0.1em", marginTop: "2px" }}
              >
                PROTOCOL CONTROL INTERFACE
              </div>
            </div>
          </div>

          {/* Center: Action Menu */}
          <div className="flex items-center gap-2">
            <ActionMenuButton
              label="BOUNTY"
              onClick={() => setBountyModalOpen(true)}
            />
            <ActionMenuButton
              label="REFER"
              onClick={() => setReferModalOpen(true)}
            />
            <ActionMenuButton
              label="ANNOUNCEMENTS"
              onClick={() => {
                setUnreadAnnouncements(false);
                setAnnouncementsModalOpen(true);
              }}
            />
            <ActionMenuButton
              label="ACCOUNT"
              onClick={() => setAccountModalOpen(true)}
            />
            <ActionMenuButton
              label="HELP"
              onClick={() => setHelpModalOpen(true)}
            />
          </div>

          {/* Right: Protocol Balance + Exit */}
          <div className="flex items-center gap-4">
            {/* Compact Protocol Balance */}
            <div
              className="border px-5 py-2"
              style={{
                backgroundColor: "rgba(51, 255, 153, 0.05)",
                borderColor: "rgba(51, 255, 153, 0.3)",
                boxShadow: "0 0 16px rgba(51, 255, 153, 0.2)",
              }}
            >
              <div className="flex items-center gap-4">
                <div>
                  <div
                    className="mono"
                    style={{ fontSize: "8px", color: "#666", letterSpacing: "0.1em", marginBottom: "2px" }}
                  >
                    PROTOCOL BALANCE
                  </div>
                  <div
                    className="pixel"
                    style={{ fontSize: "16px", color: "#33ff99", letterSpacing: "-0.02em" }}
                  >
                    {carrotBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                <div
                  style={{ width: "1px", height: "32px", backgroundColor: "rgba(51, 255, 153, 0.2)" }}
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Ξ</span>
                    <span
                      className="mono"
                      style={{ fontSize: "11px", color: "#aaa", letterSpacing: "-0.02em" }}
                    >
                      {ethBalance.toFixed(4)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">◼︎</span>
                    <span
                      className="mono"
                      style={{ fontSize: "11px", color: "#aaa", letterSpacing: "-0.02em" }}
                    >
                      {megaBalance.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Exit Button */}
            <motion.button
              className="border-2 px-6 py-2"
              style={{
                backgroundColor: "#050505",
                borderColor: "#ff6a00",
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
                className="pixel"
                style={{ fontSize: "11px", color: "#ff6a00", letterSpacing: "0.08em" }}
              >
                EXIT
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div
        className="fixed inset-0 pt-16 overflow-hidden"
        style={{ maxWidth: "1600px", margin: "0 auto", padding: "80px 32px 48px" }}
      >
        {/* MAIN METRICS ROW */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* OUTPUT / HOUR */}
          <div
            className="border relative"
            style={{
              backgroundColor: "#0a0a0a",
              borderColor: "#222",
              boxShadow: "0 0 20px rgba(255, 106, 0, 0.15)",
              padding: "24px",
            }}
          >
            {/* Sci-fi brackets */}
            <div
              className="absolute top-0 left-0 w-4 h-4 border-t border-l"
              style={{ borderColor: "#ff6a00", opacity: 0.5 }}
            />
            <div
              className="absolute top-0 right-0 w-4 h-4 border-t border-r"
              style={{ borderColor: "#ff6a00", opacity: 0.5 }}
            />
            <div
              className="absolute bottom-0 left-0 w-4 h-4 border-b border-l"
              style={{ borderColor: "#ff6a00", opacity: 0.5 }}
            />
            <div
              className="absolute bottom-0 right-0 w-4 h-4 border-b border-r"
              style={{ borderColor: "#ff6a00", opacity: 0.5 }}
            />

            <div
              className="mono mb-3"
              style={{ fontSize: "10px", color: "#666", letterSpacing: "0.15em" }}
            >
              [ OUTPUT / HOUR ]
            </div>
            <div
              className="pixel mb-6"
              style={{
                fontSize: "42px",
                color: "#ff6a00",
                letterSpacing: "-0.02em",
                fontVariantNumeric: "tabular-nums",
                textShadow: "0 0 20px rgba(255, 106, 0, 0.4)",
              }}
            >
              {outputPerHour.toFixed(2)}
            </div>

            {/* Telemetry lines */}
            <div className="space-y-2">
              <div
                className="flex items-center justify-between py-1 px-2 border-l-2"
                style={{ borderColor: "#33ff99", backgroundColor: "rgba(51, 255, 153, 0.03)" }}
              >
                <span
                  className="mono"
                  style={{ fontSize: "9px", color: "#666", letterSpacing: "0.1em" }}
                >
                  NEXT HALVING IN:
                </span>
                <span
                  className="mono"
                  style={{ fontSize: "10px", color: "#33ff99", letterSpacing: "0.05em" }}
                >
                  {formatHalvingTime(halvingCountdown)}
                </span>
              </div>
              <div
                className="flex items-center justify-between py-1 px-2 border-l-2"
                style={{ borderColor: "#ff6a00", backgroundColor: "rgba(255, 106, 0, 0.03)" }}
              >
                <span
                  className="mono"
                  style={{ fontSize: "9px", color: "#666", letterSpacing: "0.1em" }}
                >
                  TOTAL BURNED SUPPLY:
                </span>
                <span
                  className="mono"
                  style={{ fontSize: "10px", color: "#ff6a00", letterSpacing: "0.05em" }}
                >
                  {totalBurnedSupply.toLocaleString()}
                </span>
              </div>
              <div
                className="flex items-center justify-between py-1 px-2 border-l-2"
                style={{ borderColor: "#00ccff", backgroundColor: "rgba(0, 204, 255, 0.03)" }}
              >
                <span
                  className="mono"
                  style={{ fontSize: "9px", color: "#666", letterSpacing: "0.1em" }}
                >
                  TOTAL SYSTEM OUTPUT / SEC:
                </span>
                <span
                  className="mono"
                  style={{ fontSize: "10px", color: "#00ccff", letterSpacing: "0.05em" }}
                >
                  {systemOutputPerSec.toFixed(2)}
                </span>
              </div>
              <div
                className="flex items-center justify-between py-1 px-2 border-l-2"
                style={{ borderColor: "#33ff99", backgroundColor: "rgba(51, 255, 153, 0.03)" }}
              >
                <span
                  className="mono"
                  style={{ fontSize: "9px", color: "#666", letterSpacing: "0.1em" }}
                >
                  CURRENT TOKEN SUPPLY:
                </span>
                <span
                  className="mono"
                  style={{ fontSize: "10px", color: "#33ff99", letterSpacing: "0.05em" }}
                >
                  {currentTokenSupply.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* YIELD (THIS SESSION) */}
          <div
            className="border relative"
            style={{
              backgroundColor: "#0a0a0a",
              borderColor: "#222",
              boxShadow: "0 0 20px rgba(51, 255, 153, 0.15)",
              padding: "24px",
            }}
          >
            {/* Sci-fi brackets */}
            <div
              className="absolute top-0 left-0 w-4 h-4 border-t border-l"
              style={{ borderColor: "#33ff99", opacity: 0.5 }}
            />
            <div
              className="absolute top-0 right-0 w-4 h-4 border-t border-r"
              style={{ borderColor: "#33ff99", opacity: 0.5 }}
            />
            <div
              className="absolute bottom-0 left-0 w-4 h-4 border-b border-l"
              style={{ borderColor: "#33ff99", opacity: 0.5 }}
            />
            <div
              className="absolute bottom-0 right-0 w-4 h-4 border-b border-r"
              style={{ borderColor: "#33ff99", opacity: 0.5 }}
            />

            <div
              className="mono mb-3"
              style={{ fontSize: "10px", color: "#666", letterSpacing: "0.15em" }}
            >
              [ YIELD (THIS SESSION) ]
            </div>
            
            {/* Yield value with inline CLAIM button */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-baseline gap-2">
                <span
                  className="pixel"
                  style={{
                    fontSize: "42px",
                    color: "#33ff99",
                    letterSpacing: "-0.02em",
                    fontVariantNumeric: "tabular-nums",
                    textShadow: "0 0 20px rgba(51, 255, 153, 0.4)",
                  }}
                >
                  {sessionYield.toFixed(2)}
                </span>
                <span
                  className="pixel"
                  style={{ fontSize: "18px", color: "#666", letterSpacing: "0.05em" }}
                >
                  $CARROT
                </span>
              </div>

              {/* Inline CLAIM button */}
              <motion.button
                className="border px-4 py-2 flex items-center gap-2"
                style={{
                  backgroundColor: sessionYield >= 1 ? "rgba(255, 106, 0, 0.1)" : "#050505",
                  borderColor: sessionYield >= 1 ? "#ff6a00" : "#333",
                }}
                onClick={handleClaim}
                disabled={sessionYield < 1}
                whileHover={
                  sessionYield >= 1
                    ? {
                        backgroundColor: "rgba(255, 106, 0, 0.2)",
                        boxShadow: "0 0 20px rgba(255, 106, 0, 0.4)",
                      }
                    : {}
                }
                whileTap={sessionYield >= 1 ? { scale: 0.95 } : {}}
              >
                <Coins size={14} style={{ color: sessionYield >= 1 ? "#ff6a00" : "#333" }} />
                <span
                  className="pixel"
                  style={{
                    fontSize: "10px",
                    color: sessionYield >= 1 ? "#ff6a00" : "#333",
                    letterSpacing: "0.08em",
                  }}
                >
                  CLAIM
                </span>
              </motion.button>
            </div>

            {/* Farm Power and Rank */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className="mono"
                  style={{ fontSize: "10px", color: "#666", letterSpacing: "0.1em" }}
                >
                  Farm Power:
                </span>
                <span
                  className="mono"
                  style={{ fontSize: "12px", color: "#aaa", letterSpacing: "0.05em" }}
                >
                  {farmPower.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="mono"
                  style={{ fontSize: "10px", color: "#666", letterSpacing: "0.1em" }}
                >
                  Your share of total system:
                </span>
                <span
                  className="mono"
                  style={{ fontSize: "12px", color: "#aaa", letterSpacing: "0.05em" }}
                >
                  {systemShare.toFixed(3)}% (Rank #{userRank.toLocaleString()})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FARM + FARMERS ROW */}
        <div className="grid grid-cols-[1fr_400px] gap-6 mb-8">
          {/* Left: Farm Visualization */}
          <div
            className="border relative"
            style={{
              backgroundColor: "#0a0a0a",
              borderColor: "#222",
              padding: "24px",
            }}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <div
                  className="pixel mb-2"
                  style={{
                    fontSize: "20px",
                    color: "#ff6a00",
                    letterSpacing: "0.05em",
                  }}
                >
                  {getTierName(farmTier)}
                </div>
                <div
                  className="mono"
                  style={{ fontSize: "10px", color: "#666", letterSpacing: "0.1em" }}
                >
                  SPACE: TIER-{farmTier}
                </div>
              </div>

              {/* Tier badge */}
              <motion.div
                className="border-2 px-4 py-2"
                style={{
                  backgroundColor: "#ff6a00",
                  borderColor: "#ff6a00",
                  boxShadow: "0 0 20px rgba(255, 106, 0, 0.5)",
                }}
                whileHover={{ scale: 1.05 }}
              >
                <span
                  className="pixel"
                  style={{ fontSize: "12px", color: "#050505", letterSpacing: "0.08em" }}
                >
                  TIER-{farmTier}
                </span>
              </motion.div>
            </div>

            {/* Simplified Farm Plot - Single Large Square */}
            <div className="flex items-center justify-center" style={{ height: "400px" }}>
              <div
                className="relative border-2"
                style={{
                  width: `${200 + farmTier * 30}px`,
                  height: `${200 + farmTier * 30}px`,
                  borderColor: "#3a2a1a",
                  backgroundColor: "#2a1a0a",
                  boxShadow: "inset 0 0 40px rgba(0, 0, 0, 0.5)",
                }}
              >
                {/* Soil texture */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(58, 42, 26, 0.5) 4px, rgba(58, 42, 26, 0.5) 5px)`,
                  }}
                />

                {/* Carrots growing */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-5 gap-6">
                    {[...Array(farmTier * 5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="flex flex-col items-center"
                        initial={{ y: 5, opacity: 0 }}
                        animate={{
                          y: [5, 0, 5],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      >
                        {/* Carrot top */}
                        <div
                          style={{
                            width: "4px",
                            height: "6px",
                            backgroundColor: "#33ff66",
                            boxShadow: "0 0 4px rgba(51, 255, 102, 0.6)",
                          }}
                        />
                        {/* Carrot body */}
                        <div
                          style={{
                            width: "3px",
                            height: "8px",
                            backgroundColor: "#ff6a00",
                            boxShadow: "0 0 6px rgba(255, 106, 0, 0.8)",
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Production particles */}
                {!prefersReducedMotion && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(10)].map((_, i) => (
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
              </div>
            </div>

            {/* Upgrade Farm Section */}
            <div className="mt-6 space-y-4">
              <motion.button
                className="w-full border-2 py-4 relative overflow-hidden"
                style={{
                  backgroundColor: "rgba(51, 255, 153, 0.05)",
                  borderColor: "#33ff99",
                  boxShadow: "0 0 20px rgba(51, 255, 153, 0.2)",
                }}
                onClick={() => {
                  setUpgradeModalOpen(!upgradeModalOpen);
                }}
                whileHover={{
                  backgroundColor: "rgba(51, 255, 153, 0.1)",
                  boxShadow: "0 0 30px rgba(51, 255, 153, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center gap-1">
                  <span
                    className="pixel"
                    style={{ fontSize: "14px", color: "#33ff99", letterSpacing: "0.08em" }}
                  >
                    UPGRADE FARM
                  </span>
                  <span
                    className="mono"
                    style={{ fontSize: "8px", color: "#666", letterSpacing: "0.1em" }}
                  >
                    Wallet confirmation required
                  </span>
                </div>
              </motion.button>

              {/* Static comparison panel */}
              <AnimatePresence>
                {upgradeModalOpen && farmTier < 7 && (
                  <motion.div
                    className="border p-4"
                    style={{
                      backgroundColor: "rgba(51, 255, 153, 0.05)",
                      borderColor: "rgba(51, 255, 153, 0.3)",
                    }}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="mono mb-3"
                      style={{ fontSize: "10px", color: "#33ff99", letterSpacing: "0.1em" }}
                    >
                      NEXT FARM TIER WILL UNLOCK:
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div
                          style={{
                            width: "4px",
                            height: "4px",
                            backgroundColor: "#33ff99",
                          }}
                        />
                        <span
                          className="mono"
                          style={{ fontSize: "10px", color: "#aaa", letterSpacing: "0.05em" }}
                        >
                          +1 Farmer Slot
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          style={{
                            width: "4px",
                            height: "4px",
                            backgroundColor: "#33ff99",
                          }}
                        />
                        <span
                          className="mono"
                          style={{ fontSize: "10px", color: "#aaa", letterSpacing: "0.05em" }}
                        >
                          +{(2.5 * 0.1 * 3600).toFixed(2)} Base Output/Hour
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          style={{
                            width: "4px",
                            height: "4px",
                            backgroundColor: "#33ff99",
                          }}
                        />
                        <span
                          className="mono"
                          style={{ fontSize: "10px", color: "#aaa", letterSpacing: "0.05em" }}
                        >
                          +30px Farm Space
                        </span>
                      </div>
                    </div>

                    {/* Direct upgrade button */}
                    <motion.button
                      className="w-full mt-4 border py-3"
                      style={{
                        backgroundColor: "#33ff99",
                        borderColor: "#33ff99",
                      }}
                      onClick={handleUpgradeFarm}
                      whileHover={{
                        boxShadow: "0 0 30px rgba(51, 255, 153, 0.6)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span
                        className="pixel"
                        style={{ fontSize: "11px", color: "#050505", letterSpacing: "0.08em" }}
                      >
                        CONFIRM UPGRADE → WALLET
                      </span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Farmers Panel */}
          <div
            className="border"
            style={{
              backgroundColor: "#0a0a0a",
              borderColor: "#222",
              padding: "24px",
            }}
          >
            {/* Active Farmers */}
            <div className="mb-6">
              <div
                className="mono mb-4"
                style={{ fontSize: "10px", color: "#666", letterSpacing: "0.15em" }}
              >
                [ ACTIVE FARMERS ]
              </div>
              <div className="space-y-3">
                {farmers.slice(0, farmTier).map((farmer) => (
                  <motion.div
                    key={farmer.id}
                    className="border p-3"
                    style={{
                      backgroundColor: "rgba(51, 255, 153, 0.05)",
                      borderColor: "rgba(51, 255, 153, 0.3)",
                    }}
                    whileHover={{
                      backgroundColor: "rgba(51, 255, 153, 0.1)",
                      boxShadow: "0 0 16px rgba(51, 255, 153, 0.3)",
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div
                        className="pixel"
                        style={{ fontSize: "10px", color: "#33ff99", letterSpacing: "0.05em" }}
                      >
                        {farmer.name}
                      </div>
                      <div
                        className="mono"
                        style={{ fontSize: "9px", color: "#666", letterSpacing: "0.05em" }}
                      >
                        LVL {farmer.level}
                      </div>
                    </div>
                    <div
                      className="mono"
                      style={{ fontSize: "9px", color: "#888", letterSpacing: "0.05em" }}
                    >
                      +{(farmer.boost * 3600 / 100).toFixed(2)} $CARROT/hour
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Farmer Capacity Visualization */}
            <div className="mb-6">
              <div
                className="mono mb-3"
                style={{ fontSize: "10px", color: "#666", letterSpacing: "0.15em" }}
              >
                FARMER CAPACITY
              </div>
              <div className="flex gap-2">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 aspect-square border-2"
                    style={{
                      borderColor: i < occupiedSlots ? "#33ff99" : "#222",
                      backgroundColor: i < occupiedSlots ? "rgba(51, 255, 153, 0.1)" : "#050505",
                      boxShadow: i < occupiedSlots ? "0 0 8px rgba(51, 255, 153, 0.3)" : "none",
                    }}
                  >
                    {i < occupiedSlots && (
                      <div className="w-full h-full flex items-center justify-center">
                        <Zap size={14} style={{ color: "#33ff99" }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Available Farmers */}
            <div>
              <div
                className="mono mb-4"
                style={{ fontSize: "10px", color: "#666", letterSpacing: "0.15em" }}
              >
                [ AVAILABLE FARMERS ]
              </div>
              <div className="space-y-3">
                <motion.div
                  className="border p-3"
                  style={{
                    backgroundColor: "rgba(255, 106, 0, 0.05)",
                    borderColor: "rgba(255, 106, 0, 0.3)",
                  }}
                  whileHover={{
                    backgroundColor: "rgba(255, 106, 0, 0.1)",
                    boxShadow: "0 0 16px rgba(255, 106, 0, 0.3)",
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div
                      className="pixel"
                      style={{ fontSize: "10px", color: "#ff6a00", letterSpacing: "0.05em" }}
                    >
                      OPERATIVE-{farmers.length + 1}
                    </div>
                    <div
                      className="mono"
                      style={{ fontSize: "9px", color: "#666", letterSpacing: "0.05em" }}
                    >
                      0.008 ETH
                    </div>
                  </div>
                  <div className="space-y-1 mb-3">
                    <div
                      className="mono"
                      style={{ fontSize: "9px", color: "#33ff99", letterSpacing: "0.05em" }}
                    >
                      +3.2 $CARROT / hour
                    </div>
                    <div
                      className="mono"
                      style={{ fontSize: "8px", color: "#888", letterSpacing: "0.05em" }}
                    >
                      ≈ $1.18 / hour (USD)
                    </div>
                  </div>
                  <motion.button
                    className="w-full border py-2"
                    style={{
                      backgroundColor: "#ff6a00",
                      borderColor: "#ff6a00",
                    }}
                    whileHover={{
                      boxShadow: "0 0 20px rgba(255, 106, 0, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span
                      className="pixel"
                      style={{ fontSize: "9px", color: "#050505", letterSpacing: "0.08em" }}
                    >
                      HIRE FARMER
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {bountyModalOpen && (
          <BountyModal onClose={() => setBountyModalOpen(false)} />
        )}
        {referModalOpen && (
          <ReferModal onClose={() => setReferModalOpen(false)} />
        )}
        {announcementsModalOpen && (
          <AnnouncementsModal onClose={() => setAnnouncementsModalOpen(false)} />
        )}
        {accountModalOpen && (
          <AccountModal onClose={() => setAccountModalOpen(false)} />
        )}
        {helpModalOpen && (
          <HelpModal onClose={() => setHelpModalOpen(false)} />
        )}
        {upgradeModalOpen && (
          <UpgradeFarmModal 
            onClose={() => setUpgradeModalOpen(false)} 
            farmTier={farmTier}
            onConfirm={handleUpgradeFarm}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Action Menu Button Component
function ActionMenuButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      className="border px-5 py-2.5 relative"
      style={{
        backgroundColor: "#050505",
        borderColor: "#333",
      }}
      onClick={onClick}
      whileHover={{
        backgroundColor: "#0a0a0a",
        borderColor: "#33ff99",
        boxShadow: "0 0 16px rgba(51, 255, 153, 0.3)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      <span
        className="pixel"
        style={{ fontSize: "11px", color: "#aaa", letterSpacing: "0.08em" }}
      >
        {label}
      </span>
    </motion.button>
  );
}