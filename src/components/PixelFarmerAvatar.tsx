import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface PixelFarmerAvatarProps {
  id: number;
  color: string;
  unlocked: boolean;
}

export function PixelFarmerAvatar({ id, color, unlocked }: PixelFarmerAvatarProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!unlocked) return;
    
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 2);
    }, 800);

    return () => clearInterval(interval);
  }, [unlocked]);

  // Different pixel patterns for different farmers
  const patterns = [
    // ALPHA CULTIVATOR - orange farmer
    [
      "    ████    ",
      "   ██████   ",
      "   ██████   ",
      "    ████    ",
      "  ████████  ",
      "  ██████████",
      "    ████    ",
      "    ████    ",
      "   ██  ██   ",
      "   ██  ██   ",
      "  ██    ██  ",
      "  ██    ██  ",
    ],
    // NEON HARVESTER - green farmer
    [
      "   ██████   ",
      "  ████████  ",
      "  ████████  ",
      "   ██████   ",
      " ██████████ ",
      "████████████",
      "  ████████  ",
      "   ██████   ",
      "   ██  ██   ",
      "  ██    ██  ",
      " ██      ██ ",
      " ██      ██ ",
    ],
    // CYBER AGRONOMIST - cyan farmer
    [
      "   ██████   ",
      "  ████████  ",
      "  ████  ████",
      "  ████  ████",
      "  ██████████",
      "  ██████████",
      "   ████████ ",
      "    ██████  ",
      "   ██  ██   ",
      "   ██  ██   ",
      "  ██    ██  ",
      " ██      ██ ",
    ],
    // QUANTUM TENDER - orange farmer variant
    [
      "  ████████  ",
      "  ████████  ",
      "  ████████  ",
      "  ████████  ",
      " ██████████ ",
      "████████████",
      "  ████████  ",
      "  ████████  ",
      "  ██    ██  ",
      "  ██    ██  ",
      " ██      ██ ",
      " ██      ██ ",
    ],
    // VOID SHEPHERD - green farmer variant
    [
      "   ██████   ",
      "  ██████████",
      "  ██████████",
      "   ██████   ",
      "  ██████████",
      " ████████████",
      "  ████████  ",
      "   ██████   ",
      "  ██    ██  ",
      "  ██    ██  ",
      " ██      ██ ",
      "██        ██",
    ],
    // OMEGA OVERSEER - cyan farmer variant
    [
      "   ██████   ",
      "  ████████  ",
      " ██████████ ",
      " ██████████ ",
      " ██████████ ",
      "████████████",
      " ██████████ ",
      "  ████████  ",
      "  ██    ██  ",
      " ██      ██ ",
      " ██      ██ ",
      "██        ██",
    ],
    // PROTOCOL MASTER - final boss farmer
    [
      "  ████████  ",
      " ██████████ ",
      "████████████",
      "████████████",
      "████████████",
      "████████████",
      " ██████████ ",
      " ██████████ ",
      " ██      ██ ",
      " ██      ██ ",
      "██        ██",
      "██        ██",
    ],
  ];

  const pattern = patterns[id - 1] || patterns[0];

  // Pixel size
  const pixelSize = 4;

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ backgroundColor: "#141414" }}>
      {unlocked ? (
        <>
          {/* Pixel art farmer */}
          <motion.div
            className="relative"
            animate={{
              y: frame === 0 ? 0 : -4,
            }}
            transition={{ duration: 0 }}
          >
            {pattern.map((row, y) => (
              <div key={y} className="flex">
                {row.split("").map((pixel, x) => (
                  <div
                    key={`${x}-${y}`}
                    style={{
                      width: pixelSize,
                      height: pixelSize,
                      backgroundColor: pixel === "█" ? color : "transparent",
                    }}
                  />
                ))}
              </div>
            ))}
          </motion.div>

          {/* Tool animation - small pixel tool that moves */}
          <motion.div
            className="absolute"
            style={{
              width: pixelSize * 3,
              height: pixelSize * 3,
              backgroundColor: color,
              bottom: "30%",
            }}
            animate={{
              x: frame === 0 ? -20 : -28,
              rotate: frame === 0 ? -15 : -35,
            }}
            transition={{ duration: 0 }}
          />

          {/* Floating pixels effect */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: 2,
                height: 2,
                backgroundColor: color,
                opacity: 0.6,
              }}
              animate={{
                y: [0, -40, -80],
                opacity: [0.6, 0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "linear",
              }}
            />
          ))}

          {/* Scanlines */}
          <div className="absolute inset-0 scanline" />
        </>
      ) : (
        <div className="w-16 h-16 border-4 border-[#333333]" />
      )}
    </div>
  );
}
