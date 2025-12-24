import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { FarmerCard } from "./FarmerCard";
import { UpgradeModal } from "./Modal";
import { ChevronLeft, ChevronRight } from "lucide-react";

const farmers = [
  {
    id: 1,
    name: "ALPHA CULTIVATOR",
    level: 5,
    boost: 125,
    unlocked: true,
    color: "#FF6A00",
    specialty: "Genesis Operations",
    imageUrl: "https://images.unsplash.com/photo-1560731911-140d10257f19?w=400",
  },
  {
    id: 2,
    name: "NEON HARVESTER",
    level: 4,
    boost: 98,
    unlocked: true,
    color: "#3CFF8F",
    specialty: "Field Optimization",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
  },
  {
    id: 3,
    name: "CYBER AGRONOMIST",
    level: 3,
    boost: 76,
    unlocked: true,
    color: "#00E5FF",
    specialty: "Neural Enhancement",
    imageUrl: "https://images.unsplash.com/photo-1606041011872-596597976b25?w=400",
  },
  {
    id: 4,
    name: "QUANTUM TENDER",
    level: 2,
    boost: 54,
    unlocked: true,
    color: "#FF6A00",
    specialty: "Quantum Acceleration",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
  },
  {
    id: 5,
    name: "VOID SHEPHERD",
    level: 1,
    boost: 32,
    unlocked: false,
    color: "#3CFF8F",
    specialty: "Void Cultivation",
  },
  {
    id: 6,
    name: "OMEGA OVERSEER",
    level: 1,
    boost: 15,
    unlocked: false,
    color: "#00E5FF",
    specialty: "Elite Supervision",
  },
  {
    id: 7,
    name: "PROTOCOL MASTER",
    level: 1,
    boost: 8,
    unlocked: false,
    color: "#FF6A00",
    specialty: "System Mastery",
  },
];

export function FarmersSection() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<typeof farmers[0] | null>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const newIndex = direction === "left" 
      ? Math.max(0, activeIndex - 1)
      : Math.min(farmers.length - 1, activeIndex + 1);
    
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const cardWidth = 420;
      const gap = 24;
      scrollContainerRef.current.scrollTo({
        left: activeIndex * (cardWidth + gap) - 200,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  const handleUpgrade = (farmer: typeof farmers[0]) => {
    setSelectedFarmer(farmer);
    setShowUpgradeModal(true);
  };

  const handleConfirmUpgrade = () => {
    console.log(`Upgrading ${selectedFarmer?.name}`);
    setShowUpgradeModal(false);
    setSelectedFarmer(null);
  };

  const getCardPosition = (index: number): "left" | "center" | "right" => {
    if (index === activeIndex) return "center";
    if (index < activeIndex) return "left";
    return "right";
  };

  return (
    <>
      <section className="snap-section relative" style={{ paddingTop: "calc(var(--section-gap) * 0.85)", paddingBottom: "calc(var(--section-gap) * 0.85)" }}>
        <div className="grid-container">
          {/* Section header - Secondary */}
          <motion.div
            className="col-span-12 mb-14 text-center"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mb-4" style={{ fontSize: "1.875rem", fontWeight: 300, letterSpacing: "-0.02em" }}>
              OPERATIVE ROSTER
            </h2>
            <div 
              className="h-px w-32 mx-auto" 
              style={{ background: "linear-gradient(90deg, transparent, rgba(60, 255, 143, 0.2), transparent)" }} 
            />
          </motion.div>

          {/* Depth-stacked operative carousel */}
          <div className="col-span-12 relative">
            {/* Left arrow */}
            <motion.button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(11, 14, 18, 0.95)",
                border: "0.5px solid rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(20px)",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scroll("left")}
              disabled={activeIndex === 0}
              transition={{ duration: 0.15 }}
            >
              <ChevronLeft 
                size={18} 
                style={{ 
                  color: "#FF6A00", 
                  opacity: activeIndex === 0 ? 0.2 : 0.7 
                }} 
                strokeWidth={1.5} 
              />
            </motion.button>

            {/* Scrollable farmer cards with depth */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-hidden flex gap-6 px-16 py-8"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {farmers.map((farmer, index) => (
                <FarmerCard
                  key={farmer.id}
                  {...farmer}
                  onUpgrade={() => handleUpgrade(farmer)}
                  index={index}
                  isActive={index === activeIndex}
                  position={getCardPosition(index)}
                />
              ))}
            </div>

            {/* Right arrow */}
            <motion.button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(11, 14, 18, 0.95)",
                border: "0.5px solid rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(20px)",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scroll("right")}
              disabled={activeIndex === farmers.length - 1}
              transition={{ duration: 0.15 }}
            >
              <ChevronRight 
                size={18} 
                style={{ 
                  color: "#FF6A00", 
                  opacity: activeIndex === farmers.length - 1 ? 0.2 : 0.7 
                }} 
                strokeWidth={1.5} 
              />
            </motion.button>
          </div>
        </div>

        {/* Depth separator */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent)",
            boxShadow: "0 1px 0 rgba(0, 0, 0, 0.5)",
          }}
        />
      </section>

      {/* Upgrade modal */}
      {selectedFarmer && (
        <UpgradeModal
          isOpen={showUpgradeModal}
          onClose={() => {
            setShowUpgradeModal(false);
            setSelectedFarmer(null);
          }}
          farmerName={selectedFarmer.name}
          currentLevel={selectedFarmer.level}
          currentBoost={selectedFarmer.boost}
          newLevel={selectedFarmer.level + 1}
          newBoost={selectedFarmer.boost + 25}
          cost={2500}
          color={selectedFarmer.color}
          onConfirm={handleConfirmUpgrade}
        />
      )}
    </>
  );
}
