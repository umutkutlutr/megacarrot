import { motion } from "motion/react";
import { PixelOperativeCard } from "./PixelOperativeCard";
import { PixelButton } from "./PixelButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function PixelOperativeSection() {
  const [operatives] = useState([
    {
      id: 1,
      name: "ALPHA CULTIVATOR",
      level: 5,
      boost: 125,
      unlocked: true,
      color: "#ff6600",
      specialty: "Genesis Operations",
      imageUrl: "https://images.unsplash.com/photo-1560731911-140d10257f19?w=400",
    },
    {
      id: 2,
      name: "NEON HARVESTER",
      level: 4,
      boost: 98,
      unlocked: true,
      color: "#33ff66",
      specialty: "Field Optimization",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    },
    {
      id: 3,
      name: "CYBER AGRONOMIST",
      level: 3,
      boost: 76,
      unlocked: true,
      color: "#00ccff",
      specialty: "Neural Enhancement",
      imageUrl: "https://images.unsplash.com/photo-1606041011872-596597976b25?w=400",
    },
    {
      id: 4,
      name: "QUANTUM TENDER",
      level: 2,
      boost: 54,
      unlocked: true,
      color: "#ff6600",
      specialty: "Quantum Acceleration",
      imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
    },
    {
      id: 5,
      name: "VOID SHEPHERD",
      level: 1,
      boost: 32,
      unlocked: false,
      color: "#33ff66",
      specialty: "Void Cultivation",
    },
    {
      id: 6,
      name: "OMEGA OVERSEER",
      level: 1,
      boost: 15,
      unlocked: false,
      color: "#00ccff",
      specialty: "Elite Supervision",
    },
    {
      id: 7,
      name: "PROTOCOL MASTER",
      level: 1,
      boost: 8,
      unlocked: false,
      color: "#ff6600",
      specialty: "System Mastery",
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((i) => Math.max(0, i - 1));
  };

  const next = () => {
    setActiveIndex((i) => Math.min(operatives.length - 1, i + 1));
  };

  return (
    <section className="py-16 border-t-4 border-[#333333]" id="operatives">
      <div className="grid-container">
        {/* Section header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className="w-4 h-4 bg-[#33ff66] pixel-shadow-sm"
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <h2 className="pixel" style={{ color: "#33ff66" }}>
              ELITE OPERATIVES
            </h2>
            <div className="flex-1 h-px bg-[#333333]" />
          </div>
          <div className="mono text-xs" style={{ color: "#666666" }}>
            // AUTOMATED FARMING INTELLIGENCE
          </div>
        </motion.div>

        {/* Operative carousel */}
        <div className="relative">
          {/* Navigation */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <PixelButton
              variant="gray"
              size="sm"
              onClick={prev}
              disabled={activeIndex === 0}
              className="!p-2"
            >
              <ChevronLeft size={16} />
            </PixelButton>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <PixelButton
              variant="gray"
              size="sm"
              onClick={next}
              disabled={activeIndex === operatives.length - 1}
              className="!p-2"
            >
              <ChevronRight size={16} />
            </PixelButton>
          </div>

          {/* Cards */}
          <div className="flex justify-center items-center gap-6 px-16 py-8 overflow-hidden">
            {/* Left card */}
            {activeIndex > 0 && (
              <PixelOperativeCard
                {...operatives[activeIndex - 1]}
                onUpgrade={() => console.log("Upgrade")}
                isActive={false}
              />
            )}

            {/* Center card (active) */}
            <PixelOperativeCard
              {...operatives[activeIndex]}
              onUpgrade={() => console.log("Upgrade")}
              isActive={true}
            />

            {/* Right card */}
            {activeIndex < operatives.length - 1 && (
              <PixelOperativeCard
                {...operatives[activeIndex + 1]}
                onUpgrade={() => console.log("Upgrade")}
                isActive={false}
              />
            )}
          </div>

          {/* Page indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {operatives.map((_, i) => (
              <button
                key={i}
                className="w-3 h-3 border border-[#333333]"
                style={{
                  backgroundColor: i === activeIndex ? "#ff6600" : "transparent",
                }}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}