import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LandingPage } from "./components/LandingPage";
import { ProtocolInitializationModal } from "./components/ProtocolInitializationModal";
import { PremiumDashboard } from "./components/PremiumDashboard";

export default function App() {
  const [gameState, setGameState] = useState<"landing" | "payment" | "dashboard">("landing");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Game data
  const [farmTier, setFarmTier] = useState(5);
  const [farmLevel, setFarmLevel] = useState(12);
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
    {
      id: 2,
      name: "OPERATIVE-2",
      level: 1,
      boost: 35,
      unlocked: true,
      color: "#ff6600",
      specialty: "Production Specialist",
      slotSize: 1,
    },
    {
      id: 3,
      name: "OPERATIVE-3",
      level: 1,
      boost: 45,
      unlocked: true,
      color: "#00ccff",
      specialty: "Efficiency Expert",
      slotSize: 1,
    },
    {
      id: 4,
      name: "OPERATIVE-4",
      level: 1,
      boost: 55,
      unlocked: true,
      color: "#ff00ff",
      specialty: "Speed Optimizer",
      slotSize: 1,
    },
  ]);

  // Farm tier determines max farmer slots
  const maxFarmerSlots = farmTier; // Tier 1 = 1 slot, Tier 7 = 7 slots
  const farmProduction = 100 * farmTier * (1 + farmLevel * 0.1);
  const upgradeCost = farmTier * 5000;

  const handleConnect = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = () => {
    setShowPaymentModal(false);
    setGameState("dashboard");
  };

  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
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

      {showPaymentModal && (
        <ProtocolInitializationModal
          onPaymentComplete={handlePaymentComplete}
          onCancel={handlePaymentCancel}
        />
      )}

      {gameState === "dashboard" && (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <PremiumDashboard
            onDisconnect={handleDisconnect}
            farmTier={farmTier}
            farmLevel={farmLevel}
            farmers={farmers}
            maxFarmerSlots={maxFarmerSlots}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}