import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LandingPage } from "./components/LandingPage";
import { EntryPayment } from "./components/EntryPayment";
import { DashboardNav } from "./components/DashboardNav";
import { SystemStatus } from "./components/SystemStatus";
import { SingleFarmCard } from "./components/SingleFarmCard";
import { FarmerSlotSection } from "./components/FarmerSlotSection";
import { PixelUpgradeSection } from "./components/PixelUpgradeSection";
import { PixelVault } from "./components/PixelVault";

export default function App() {
  const [gameState, setGameState] = useState<"landing" | "payment" | "dashboard">("landing");
  
  // Game data
  const [farmTier, setFarmTier] = useState(1);
  const [farmLevel, setFarmLevel] = useState(0);
  const [farmers, setFarmers] = useState([
    {
      id: 1,
      name: "STARTER OPERATIVE",
      level: 1,
      boost: 25,
      unlocked: true,
      color: "#33ff66",
      specialty: "Entry-level farmer",
      slotSize: 1,
    },
  ]);

  // Farm tier determines max farmer slots
  const maxFarmerSlots = farmTier; // Tier 1 = 1 slot, Tier 7 = 7 slots
  const farmProduction = 100 * farmTier * (1 + farmLevel * 0.1);
  const upgradeCost = farmTier * 5000;

  const handleConnect = () => {
    setGameState("payment");
  };

  const handlePaymentComplete = () => {
    setGameState("dashboard");
  };

  const handlePaymentCancel = () => {
    setGameState("landing");
  };

  const handleDisconnect = () => {
    setGameState("landing");
    // Reset game state
    setFarmTier(1);
    setFarmLevel(0);
    setFarmers([
      {
        id: 1,
        name: "STARTER OPERATIVE",
        level: 1,
        boost: 25,
        unlocked: true,
        color: "#33ff66",
        specialty: "Entry-level farmer",
        slotSize: 1,
      },
    ]);
  };

  const handleFarmUpgrade = () => {
    if (farmTier < 7) {
      setFarmTier(farmTier + 1);
      setFarmLevel(0);
      console.log(`Farm upgraded to Tier ${farmTier + 1}`);
    }
  };

  const handleHireFarmer = () => {
    const newFarmer = {
      id: farmers.length + 1,
      name: `OPERATIVE-${farmers.length + 1}`,
      level: 1,
      boost: 25 + farmers.length * 10,
      unlocked: true,
      color: ["#ff6600", "#33ff66", "#00ccff", "#ff00ff", "#ffff00", "#ff0066"][farmers.length % 6],
      specialty: ["Production Specialist", "Efficiency Expert", "Speed Optimizer", "Yield Maximizer", "Resource Manager", "Growth Accelerator"][farmers.length % 6],
      slotSize: 1,
    };
    setFarmers([...farmers, newFarmer]);
    console.log("Hired new farmer");
  };

  const handleAssignFarmer = (farmerId: number) => {
    console.log(`Assigning farmer ${farmerId}`);
  };

  const handleUpgradeFarmer = (farmerId: number) => {
    setFarmers(
      farmers.map((f) =>
        f.id === farmerId
          ? { ...f, level: f.level + 1, boost: f.boost + 15, slotSize: Math.min(3, Math.floor((f.level + 1) / 2)) }
          : f
      )
    );
    console.log(`Upgraded farmer ${farmerId}`);
  };

  const assignedFarmers = farmers.filter((f) => f.unlocked).length;

  return (
    <AnimatePresence mode="wait">
      {gameState === "landing" && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <LandingPage onConnect={handleConnect} />
        </motion.div>
      )}

      {gameState === "payment" && (
        <EntryPayment
          onPaymentComplete={handlePaymentComplete}
          onCancel={handlePaymentCancel}
        />
      )}

      {gameState === "dashboard" && (
        <motion.div
          key="dashboard"
          className="min-h-screen relative"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Pixel dithering background pattern */}
          <div
            className="fixed inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 1px,
                  rgba(255, 255, 255, 0.1) 1px,
                  rgba(255, 255, 255, 0.1) 2px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 1px,
                  rgba(255, 255, 255, 0.1) 1px,
                  rgba(255, 255, 255, 0.1) 2px
                )
              `,
            }}
          />

          {/* Navigation */}
          <DashboardNav onDisconnect={handleDisconnect} />

          {/* Main content - All sections in one page */}
          <main className="relative pt-28">
            {/* System Status / Overview */}
            <SystemStatus />

            {/* Single Farm Section */}
            <section className="py-16 border-t-4 border-[#333333]" id="farm">
              <div className="grid-container">
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      className="w-4 h-4 bg-[#ff6600] pixel-shadow-sm"
                      animate={{
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                    <h2 className="pixel" style={{ color: "#ff6600" }}>
                      YOUR FARM
                    </h2>
                    <div className="flex-1 h-px bg-[#333333]" />
                  </div>
                  <div className="mono text-xs" style={{ color: "#666666" }}>
                    // AGRICULTURAL PRODUCTION FACILITY
                  </div>
                </motion.div>

                <SingleFarmCard
                  tier={farmTier}
                  production={farmProduction}
                  level={farmLevel}
                  upgradeCost={upgradeCost}
                  farmerSlots={maxFarmerSlots}
                  assignedFarmers={assignedFarmers}
                  onUpgrade={handleFarmUpgrade}
                />
              </div>
            </section>

            {/* Farmer Management Section */}
            <FarmerSlotSection
              maxSlots={maxFarmerSlots}
              farmers={farmers}
              onHireFarmer={handleHireFarmer}
              onAssignFarmer={handleAssignFarmer}
              onUpgradeFarmer={handleUpgradeFarmer}
            />

            {/* Upgrades Section */}
            <PixelUpgradeSection />

            {/* Vault Section */}
            <PixelVault />
          </main>

          {/* Bottom terminal bar */}
          <div
            className="fixed bottom-0 left-0 right-0 h-10 border-t-4 border-[#333333] flex items-center px-4 z-40"
            style={{ backgroundColor: "#0a0a0a" }}
          >
            <div className="grid-container">
              <div className="flex items-center justify-between w-full">
                <div
                  className="flex items-center gap-6 mono"
                  style={{ color: "#666666", fontSize: "12px" }}
                >
                  <div className="flex items-center gap-2">
                    <span>SYSTEM.STATUS:</span>
                    <motion.span
                      style={{ color: "#33ff66" }}
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ONLINE
                    </motion.span>
                  </div>
                  <div className="w-px h-4 bg-[#333333]" />
                  <span>FARM.TIER: {farmTier}</span>
                  <div className="w-px h-4 bg-[#333333]" />
                  <span>FARMERS: {assignedFarmers}/{maxFarmerSlots}</span>
                  <div className="w-px h-4 bg-[#333333]" />
                  <span>WALLET: 0x7F3a...d91c</span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 bg-[#33ff66]"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span
                    className="mono"
                    style={{ color: "#33ff66", fontSize: "12px" }}
                  >
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
