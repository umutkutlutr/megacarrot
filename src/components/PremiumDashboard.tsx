import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Power, TrendingUp, Coins, Zap, Square, Wallet, Trophy, Users, Bell, User, HelpCircle, ArrowUpCircle, Clock } from "lucide-react";
import { BountyModal } from "./modals/BountyModal";
import { ReferModal } from "./modals/ReferModal";
import { AnnouncementsModal } from "./modals/AnnouncementsModal";
import { AccountModal } from "./modals/AccountModal";
import { HelpModal } from "./modals/HelpModal";
import { UpgradeFarmModal } from "./modals/UpgradeFarmModal";
import { TierDetailsModal } from "./modals/TierDetailsModal";

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
  const [tierDetailsModalOpen, setTierDetailsModalOpen] = useState(false);
  
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
              className="border px-6 py-3"
              style={{
                backgroundColor: "rgba(51, 255, 153, 0.05)",
                borderColor: "rgba(51, 255, 153, 0.3)",
                boxShadow: "0 0 16px rgba(51, 255, 153, 0.2)",
              }}
            >
              <div className="flex items-center gap-6">
                <div>
                  <div
                    className="mono"
                    style={{ fontSize: "9px", color: "#666", letterSpacing: "0.1em", marginBottom: "4px" }}
                  >
                    PROTOCOL BALANCE
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="pixel"
                      style={{ fontSize: "20px", color: "#33ff99", letterSpacing: "-0.02em" }}
                    >
                      {carrotBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <span
                      className="pixel"
                      style={{ fontSize: "12px", color: "#ff6a00", letterSpacing: "0.05em" }}
                    >
                      $CARROT
                    </span>
                  </div>
                </div>
                <div
                  style={{ width: "1px", height: "40px", backgroundColor: "rgba(51, 255, 153, 0.2)" }}
                />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: "16px" }}>Ξ</span>
                    <span
                      className="mono"
                      style={{ fontSize: "13px", color: "#aaa", letterSpacing: "-0.02em" }}
                    >
                      {ethBalance.toFixed(4)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: "16px" }}>🥕</span>
                    <span
                      className="mono"
                      style={{ fontSize: "13px", color: "#aaa", letterSpacing: "-0.02em" }}
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
              className="pixel mb-5"
              style={{
                fontSize: "34px",
                color: "#ff6a00",
                letterSpacing: "-0.02em",
                fontVariantNumeric: "tabular-nums",
                textShadow: "0 0 20px rgba(255, 106, 0, 0.4)",
              }}
            >
              {outputPerHour.toFixed(2)}
            </div>

            {/* Telemetry lines */}
            <div className="space-y-3">
              <div
                className="flex items-center justify-between py-2 px-3 border-l-2"
                style={{ borderColor: "#33ff99", backgroundColor: "rgba(51, 255, 153, 0.03)" }}
              >
                <span
                  className="mono"
                  style={{ fontSize: "11px", color: "#999", letterSpacing: "0.1em" }}
                >
                  NEXT HALVING IN:
                </span>
                <span
                  className="mono"
                  style={{ fontSize: "12px", color: "#33ff99", letterSpacing: "0.05em" }}
                >
                  {formatHalvingTime(halvingCountdown)}
                </span>
              </div>
              <div
                className="flex items-center justify-between py-2 px-3 border-l-2"
                style={{ borderColor: "#ff6a00", backgroundColor: "rgba(255, 106, 0, 0.03)" }}
              >
                <span
                  className="mono"
                  style={{ fontSize: "11px", color: "#999", letterSpacing: "0.1em" }}
                >
                  TOTAL BURNED SUPPLY:
                </span>
                <span
                  className="mono"
                  style={{ fontSize: "12px", color: "#ff6a00", letterSpacing: "0.05em" }}
                >
                  {totalBurnedSupply.toLocaleString()}
                </span>
              </div>
              <div
                className="flex items-center justify-between py-2 px-3 border-l-2"
                style={{ borderColor: "#00ccff", backgroundColor: "rgba(0, 204, 255, 0.03)" }}
              >
                <span
                  className="mono"
                  style={{ fontSize: "11px", color: "#999", letterSpacing: "0.1em" }}
                >
                  TOTAL SYSTEM OUTPUT / SEC:
                </span>
                <span
                  className="mono"
                  style={{ fontSize: "12px", color: "#00ccff", letterSpacing: "0.05em" }}
                >
                  {systemOutputPerSec.toFixed(2)}
                </span>
              </div>
              <div
                className="flex items-center justify-between py-2 px-3 border-l-2"
                style={{ borderColor: "#33ff99", backgroundColor: "rgba(51, 255, 153, 0.03)" }}
              >
                <span
                  className="mono"
                  style={{ fontSize: "11px", color: "#999", letterSpacing: "0.1em" }}
                >
                  CURRENT TOKEN SUPPLY:
                </span>
                <span
                  className="mono"
                  style={{ fontSize: "12px", color: "#33ff99", letterSpacing: "0.05em" }}
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
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-baseline gap-3">
                <span
                  className="pixel"
                  style={{
                    fontSize: "34px",
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
                  style={{ fontSize: "34px", color: "#ff6a00", letterSpacing: "0.05em" }}
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
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 px-3 border-l-2" style={{ borderColor: "#33ff99", backgroundColor: "rgba(51, 255, 153, 0.03)" }}>
                <span
                  className="mono"
                  style={{ fontSize: "11px", color: "#999", letterSpacing: "0.1em" }}
                >
                  FARM POWER:
                </span>
                <span
                  className="mono"
                  style={{ fontSize: "12px", color: "#33ff99", letterSpacing: "0.05em" }}
                >
                  {farmPower.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 border-l-2" style={{ borderColor: "#00ccff", backgroundColor: "rgba(0, 204, 255, 0.03)" }}>
                <span
                  className="mono"
                  style={{ fontSize: "11px", color: "#999", letterSpacing: "0.1em" }}
                >
                  YOUR SHARE OF TOTAL SYSTEM:
                </span>
                <span
                  className="mono"
                  style={{ fontSize: "12px", color: "#00ccff", letterSpacing: "0.05em" }}
                >
                  {systemShare.toFixed(3)}% (Rank #{userRank.toLocaleString()})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FARM + FARMERS ROW */}
        <div className="grid grid-cols-[320px_1fr] gap-6 mb-8">
          {/* Left: Farm Visualization */}
          <div
            className="border relative"
            style={{
              backgroundColor: "#0a0a0a",
              borderColor: "#222",
              padding: "24px",
              boxShadow: "0 0 30px rgba(255, 106, 0, 0.1), inset 0 0 40px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Premium corner accents */}
            <div
              className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2"
              style={{ borderColor: "#ff6a00", opacity: 0.6 }}
            />
            <div
              className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2"
              style={{ borderColor: "#ff6a00", opacity: 0.6 }}
            />
            <div
              className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2"
              style={{ borderColor: "#ff6a00", opacity: 0.6 }}
            />
            <div
              className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2"
              style={{ borderColor: "#ff6a00", opacity: 0.6 }}
            />

            {/* Compact header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div
                  className="pixel"
                  style={{
                    fontSize: "16px",
                    color: "#ff6a00",
                    letterSpacing: "0.05em",
                  }}
                >
                  {getTierName(farmTier)}
                </div>
                <motion.button
                  className="border-2 px-6 py-2"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "#cc5500",
                    boxShadow: "0 0 12px rgba(204, 85, 0, 0.3)",
                  }}
                  onClick={() => setTierDetailsModalOpen(true)}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 16px rgba(204, 85, 0, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-1">
                    <span
                      className="pixel"
                      style={{ fontSize: "11px", color: "#cc5500", letterSpacing: "0.08em", lineHeight: "1" }}
                    >
                      TIER
                    </span>
                    <span
                      className="pixel"
                      style={{ fontSize: "11px", color: "#cc5500", letterSpacing: "0.08em", lineHeight: "1" }}
                    >
                      {farmTier}
                    </span>
                  </div>
                </motion.button>
              </div>
              <div
                className="mono"
                style={{ fontSize: "10px", color: "#888", letterSpacing: "0.1em" }}
              >
                FARM SPACE: TIER-{farmTier} CONFIGURATION
              </div>
            </div>

            {/* Compact Farm Plot */}
            <div className="flex items-center justify-center mb-6">
              <div
                className="relative border-2"
                style={{
                  width: `${140 + farmTier * 20}px`,
                  height: `${140 + farmTier * 20}px`,
                  borderColor: "#4a3a2a",
                  backgroundColor: "#2a1a0a",
                  boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 106, 0, 0.2)",
                }}
              >
                {/* Enhanced soil texture with depth */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(74, 58, 42, 0.6) 3px, rgba(74, 58, 42, 0.6) 4px),
                      repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(58, 42, 26, 0.4) 3px, rgba(58, 42, 26, 0.4) 4px)
                    `,
                  }}
                />

                {/* Soil particles effect */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 20% 30%, rgba(139, 90, 43, 0.3) 1px, transparent 1px),
                                      radial-gradient(circle at 60% 70%, rgba(139, 90, 43, 0.2) 1px, transparent 1px),
                                      radial-gradient(circle at 80% 20%, rgba(139, 90, 43, 0.25) 1px, transparent 1px)`,
                    backgroundSize: "20px 20px, 30px 30px, 25px 25px",
                  }}
                />

                {/* Dense Carrot Grid - More carrots! */}
                <div className="absolute inset-0 flex items-center justify-center p-3">
                  <div 
                    className="grid w-full h-full"
                    style={{
                      gridTemplateColumns: `repeat(${Math.min(farmTier + 3, 8)}, 1fr)`,
                      gridTemplateRows: `repeat(${Math.min(farmTier + 3, 8)}, 1fr)`,
                      gap: `${Math.max(4, 8 - farmTier * 0.3)}px`,
                    }}
                  >
                    {[...Array((farmTier + 3) * (farmTier + 3))].map((_, i) => {
                      const row = Math.floor(i / (farmTier + 3));
                      const col = i % (farmTier + 3);
                      
                      return (
                        <motion.div
                          key={i}
                          className="flex flex-col items-center justify-end"
                          initial={{ y: 5, opacity: 0 }}
                          animate={{
                            y: [5, 0, 5],
                            opacity: [0.7, 1, 0.7],
                            scale: [0.95, 1, 0.95],
                          }}
                          transition={{
                            duration: 2.5 + Math.random() * 1.5,
                            repeat: Infinity,
                            delay: i * 0.05,
                            ease: "easeInOut",
                          }}
                        >
                          {/* Carrot leaves/top - more detailed */}
                          <div className="relative flex gap-[1px]">
                            <div
                              style={{
                                width: `${Math.max(3 - farmTier * 0.1, 1.5)}px`,
                                height: `${Math.max(5 - farmTier * 0.12, 3)}px`,
                                backgroundColor: "#2d5016",
                                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                              }}
                            />
                            <div
                              style={{
                                width: `${Math.max(3.5 - farmTier * 0.1, 2)}px`,
                                height: `${Math.max(6 - farmTier * 0.12, 3.5)}px`,
                                backgroundColor: "#33ff66",
                                boxShadow: "0 0 4px rgba(51, 255, 102, 0.6)",
                                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                              }}
                            />
                            <div
                              style={{
                                width: `${Math.max(3 - farmTier * 0.1, 1.5)}px`,
                                height: `${Math.max(5 - farmTier * 0.12, 3)}px`,
                                backgroundColor: "#2d5016",
                                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                              }}
                            />
                          </div>
                          
                          {/* Carrot body - more realistic shape */}
                          <div className="relative">
                            <div
                              style={{
                                width: `${Math.max(4 - farmTier * 0.12, 2.5)}px`,
                                height: `${Math.max(8 - farmTier * 0.15, 5)}px`,
                                backgroundColor: "#ff6a00",
                                clipPath: "polygon(20% 0%, 80% 0%, 100% 70%, 50% 100%, 0% 70%)",
                                boxShadow: "0 0 5px rgba(255, 106, 0, 0.7), inset -1px 0 2px rgba(0, 0, 0, 0.3)",
                              }}
                            />
                            {/* Carrot highlight */}
                            <div
                              className="absolute top-0 left-0"
                              style={{
                                width: "40%",
                                height: "60%",
                                background: "linear-gradient(135deg, rgba(255, 140, 0, 0.4) 0%, transparent 100%)",
                              }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Advanced Production Visualization - Circular Radar */}
                {!prefersReducedMotion && (
                  <>
                    {/* Rotating radar sweep - enhanced */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: "conic-gradient(from 0deg, transparent 0%, rgba(255, 106, 0, 0.4) 5%, rgba(255, 140, 0, 0.3) 10%, transparent 15%)",
                        mixBlendMode: "screen",
                      }}
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* Secondary sweep */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: "conic-gradient(from 180deg, transparent 0%, rgba(51, 255, 102, 0.3) 5%, transparent 10%)",
                        mixBlendMode: "screen",
                      }}
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* Concentric pulse rings - enhanced */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={`ring-${i}`}
                        className="absolute border rounded-full"
                        style={{
                          top: "50%",
                          left: "50%",
                          borderColor: i % 2 === 0 ? "rgba(51, 255, 102, 0.4)" : "rgba(255, 106, 0, 0.3)",
                          borderWidth: "1px",
                        }}
                        initial={{
                          width: "0%",
                          height: "0%",
                          x: "-50%",
                          y: "-50%",
                          opacity: 0.9,
                        }}
                        animate={{
                          width: "120%",
                          height: "120%",
                          opacity: 0,
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 1,
                          ease: "easeOut",
                        }}
                      />
                    ))}

                    {/* Energy particles rising - more particles */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={`particle-${i}`}
                          className="absolute rounded-full"
                          style={{
                            left: `${15 + Math.random() * 70}%`,
                            width: `${2 + Math.random() * 2}px`,
                            height: `${2 + Math.random() * 2}px`,
                            backgroundColor: i % 2 === 0 ? "#ff6a00" : "#33ff66",
                            boxShadow: i % 2 === 0 
                              ? "0 0 8px rgba(255, 106, 0, 0.9)" 
                              : "0 0 8px rgba(51, 255, 102, 0.9)",
                          }}
                          initial={{ bottom: "5%", opacity: 0, scale: 0.5 }}
                          animate={{
                            bottom: "95%",
                            opacity: [0, 1, 1, 0],
                            scale: [0.5, 1, 1, 0.3],
                            x: [0, Math.random() * 20 - 10, 0],
                          }}
                          transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                    </div>

                    {/* Glowing energy field */}
                    <motion.div
                      className="absolute inset-0 rounded-sm"
                      style={{
                        background: "radial-gradient(circle at 50% 50%, rgba(255, 106, 0, 0.15) 0%, transparent 70%)",
                      }}
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Corner scan lines */}
                    {[...Array(4)].map((_, i) => {
                      const positions = [
                        { top: 0, left: 0, width: "30%", height: "1px" },
                        { top: 0, right: 0, width: "30%", height: "1px" },
                        { bottom: 0, left: 0, width: "30%", height: "1px" },
                        { bottom: 0, right: 0, width: "30%", height: "1px" },
                      ];
                      
                      return (
                        <motion.div
                          key={`scan-${i}`}
                          className="absolute"
                          style={{
                            ...positions[i],
                            backgroundColor: "#00ccff",
                            boxShadow: "0 0 8px rgba(0, 204, 255, 0.6)",
                          }}
                          animate={{
                            opacity: [0.2, 0.8, 0.2],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                        />
                      );
                    })}

                    {/* Data grid overlay - refined */}
                    <div
                      className="absolute inset-0 opacity-8"
                      style={{
                        backgroundImage: `
                          linear-gradient(0deg, transparent 24%, rgba(51, 255, 102, 0.6) 25%, rgba(51, 255, 102, 0.6) 26%, transparent 27%, transparent 74%, rgba(51, 255, 102, 0.6) 75%, rgba(51, 255, 102, 0.6) 76%, transparent 77%, transparent),
                          linear-gradient(90deg, transparent 24%, rgba(51, 255, 102, 0.6) 25%, rgba(51, 255, 102, 0.6) 26%, transparent 27%, transparent 74%, rgba(51, 255, 102, 0.6) 75%, rgba(51, 255, 102, 0.6) 76%, transparent 77%, transparent)
                        `,
                        backgroundSize: "50% 50%",
                      }}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Expanded Upgrade Farm Section */}
            <div>
              <motion.button
                className="w-full border-2 py-4 relative overflow-hidden flex items-center justify-center gap-2 mb-4"
                style={{
                  backgroundColor: "rgba(51, 255, 153, 0.05)",
                  borderColor: "#33ff99",
                  boxShadow: "0 0 16px rgba(51, 255, 153, 0.2), inset 0 0 20px rgba(51, 255, 153, 0.05)",
                }}
                onClick={handleUpgradeFarm}
                whileHover={{
                  backgroundColor: "rgba(51, 255, 153, 0.15)",
                  boxShadow: "0 0 30px rgba(51, 255, 153, 0.5), inset 0 0 30px rgba(51, 255, 153, 0.1)",
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
              >
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(51, 255, 153, 0.2), transparent)",
                    }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                )}
                <ArrowUpCircle size={18} style={{ color: "#33ff99" }} />
                <span
                  className="pixel relative z-10"
                  style={{ fontSize: "13px", color: "#33ff99", letterSpacing: "0.08em" }}
                >
                  UPGRADE FARM
                </span>
              </motion.button>

              {/* Always visible upgrade info */}
              {farmTier < 7 && (
                <div
                  className="border p-5"
                  style={{
                    backgroundColor: "rgba(51, 255, 153, 0.05)",
                    borderColor: "rgba(51, 255, 153, 0.3)",
                    boxShadow: "inset 0 0 20px rgba(51, 255, 153, 0.05)",
                  }}
                >
                  <div
                    className="mono mb-4"
                    style={{ fontSize: "11px", color: "#33ff99", letterSpacing: "0.1em" }}
                  >
                    TIER-{farmTier + 1} UPGRADES:
                  </div>
                  <div className="space-y-2.5 mb-4">
                    <div className="flex items-center gap-2">
                      <div style={{ width: "4px", height: "4px", backgroundColor: "#33ff99" }} />
                      <span className="mono" style={{ fontSize: "11px", color: "#bbb", letterSpacing: "0.05em" }}>
                        +1 Farmer Slot
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div style={{ width: "4px", height: "4px", backgroundColor: "#33ff99" }} />
                      <span className="mono" style={{ fontSize: "11px", color: "#bbb", letterSpacing: "0.05em" }}>
                        +{(2.5 * 0.1 * 3600).toFixed(2)} Base Output/Hour
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div style={{ width: "4px", height: "4px", backgroundColor: "#33ff99" }} />
                      <span className="mono" style={{ fontSize: "11px", color: "#bbb", letterSpacing: "0.05em" }}>
                        +16px Farm Space
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div style={{ width: "4px", height: "4px", backgroundColor: "#33ff99" }} />
                      <span className="mono" style={{ fontSize: "11px", color: "#bbb", letterSpacing: "0.05em" }}>
                        Cost: 0.008 ETH
                      </span>
                    </div>
                  </div>
                  <div
                    className="mono text-center py-2 border-t"
                    style={{ 
                      fontSize: "9px", 
                      color: "#666", 
                      letterSpacing: "0.05em",
                      borderColor: "rgba(51, 255, 153, 0.2)",
                    }}
                  >
                    Click button above to upgrade
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Farmers Panel */}
          <div
            className="border"
            style={{
              backgroundColor: "#0a0a0a",
              borderColor: "#222",
              padding: "28px",
              boxShadow: "0 0 30px rgba(51, 255, 153, 0.08), inset 0 0 40px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Active Farmers */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-5">
                <div
                  className="mono"
                  style={{ fontSize: "12px", color: "#666", letterSpacing: "0.15em" }}
                >
                  [ ACTIVE FARMERS ]
                </div>
                <div
                  className="pixel px-3 py-1 border"
                  style={{ 
                    fontSize: "11px", 
                    color: "#33ff99",
                    borderColor: "rgba(51, 255, 153, 0.3)",
                    backgroundColor: "rgba(51, 255, 153, 0.05)",
                  }}
                >
                  {farmers.length}/{maxFarmerSlots} MAX FARMER
                </div>
              </div>
              <div className="space-y-4">
                {farmers.slice(0, farmTier).map((farmer) => (
                  <motion.div
                    key={farmer.id}
                    className="border p-5"
                    style={{
                      backgroundColor: "rgba(51, 255, 153, 0.05)",
                      borderColor: "rgba(51, 255, 153, 0.3)",
                    }}
                    whileHover={{
                      backgroundColor: "rgba(51, 255, 153, 0.1)",
                      boxShadow: "0 0 20px rgba(51, 255, 153, 0.3)",
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div
                          className="pixel mb-2"
                          style={{ fontSize: "14px", color: "#33ff99", letterSpacing: "0.05em" }}
                        >
                          {farmer.name}
                        </div>
                        <div className="flex items-center gap-3">
                          <div
                            className="mono px-2 py-1 border"
                            style={{ 
                              fontSize: "10px", 
                              color: "#ff6a00", 
                              letterSpacing: "0.05em",
                              borderColor: "rgba(255, 106, 0, 0.3)",
                              backgroundColor: "rgba(255, 106, 0, 0.05)",
                            }}
                          >
                            SPACE: {farmer.slotSize || 1} SLOT{(farmer.slotSize || 1) > 1 ? 'S' : ''}
                          </div>
                          <div style={{ width: "1px", height: "12px", backgroundColor: "#333" }} />
                          <div
                            className="mono px-2 py-0.5 border"
                            style={{ 
                              fontSize: "10px", 
                              color: "#33ff99", 
                              letterSpacing: "0.05em",
                              borderColor: "rgba(51, 255, 153, 0.3)",
                              backgroundColor: "rgba(51, 255, 153, 0.05)",
                            }}
                          >
                            LVL {farmer.level}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div
                          className="mono mb-1"
                          style={{ fontSize: "13px", color: "#33ff99", letterSpacing: "0.05em" }}
                        >
                          +{(farmer.boost * 3600 / 100).toFixed(2)} $CARROT/hour
                        </div>
                        <div
                          className="mono"
                          style={{ fontSize: "9px", color: "#666", letterSpacing: "0.05em" }}
                        >
                          ≈ ${((farmer.boost * 3600 / 100) * tokenPrice).toFixed(4)}/hour USD
                        </div>
                      </div>
                      <motion.button
                        className="border-2 px-5 py-2.5 flex items-center gap-2"
                        style={{
                          backgroundColor: "rgba(51, 255, 153, 0.1)",
                          borderColor: "#33ff99",
                        }}
                        whileHover={{
                          backgroundColor: "rgba(51, 255, 153, 0.2)",
                          boxShadow: "0 0 16px rgba(51, 255, 153, 0.4)",
                          scale: 1.02,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowUpCircle size={14} style={{ color: "#33ff99" }} />
                        <span
                          className="pixel"
                          style={{ fontSize: "11px", color: "#33ff99", letterSpacing: "0.08em" }}
                        >
                          UPGRADE
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Available Farmers */}
            <div>
              <div
                className="mono mb-5"
                style={{ fontSize: "12px", color: "#666", letterSpacing: "0.15em" }}
              >
                [ AVAILABLE FARMERS ]
              </div>
              <div className="space-y-4">
                <motion.div
                  className="border p-5"
                  style={{
                    backgroundColor: "rgba(255, 106, 0, 0.05)",
                    borderColor: "rgba(255, 106, 0, 0.3)",
                  }}
                  whileHover={{
                    backgroundColor: "rgba(255, 106, 0, 0.1)",
                    boxShadow: "0 0 20px rgba(255, 106, 0, 0.3)",
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div
                        className="pixel mb-2"
                        style={{ fontSize: "14px", color: "#ff6a00", letterSpacing: "0.05em" }}
                      >
                        OPERATIVE-{farmers.length + 1}
                      </div>
                      <div
                        className="mono"
                        style={{ fontSize: "10px", color: "#888", letterSpacing: "0.05em" }}
                      >
                        Occupies: 1 Slot
                      </div>
                    </div>
                    <div
                      className="mono px-3 py-1.5 border"
                      style={{ 
                        fontSize: "11px", 
                        color: "#ff6a00",
                        borderColor: "rgba(255, 106, 0, 0.3)",
                        backgroundColor: "rgba(255, 106, 0, 0.1)",
                      }}
                    >
                      0.008 ETH
                    </div>
                  </div>
                  <div className="mb-5">
                    <div
                      className="mono mb-1"
                      style={{ fontSize: "13px", color: "#33ff99", letterSpacing: "0.05em" }}
                    >
                      +3.2 $CARROT / hour
                    </div>
                    <div
                      className="mono"
                      style={{ fontSize: "10px", color: "#888", letterSpacing: "0.05em" }}
                    >
                      ≈ $1.18 / hour (USD)
                    </div>
                  </div>
                  <motion.button
                    className="w-full border-2 py-3.5 flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: "#ff6a00",
                      borderColor: "#ff6a00",
                    }}
                    whileHover={{
                      boxShadow: "0 0 30px rgba(255, 106, 0, 0.6)",
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Coins size={16} style={{ color: "#050505" }} />
                    <span
                      className="pixel"
                      style={{ fontSize: "12px", color: "#050505", letterSpacing: "0.08em" }}
                    >
                      BUY FARMER
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
        {tierDetailsModalOpen && (
          <TierDetailsModal
            onClose={() => setTierDetailsModalOpen(false)}
            farmTier={farmTier}
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