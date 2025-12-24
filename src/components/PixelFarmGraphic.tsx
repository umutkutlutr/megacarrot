import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface PixelFarmGraphicProps {
  level: number;
  color: string;
  unlocked: boolean;
}

export function PixelFarmGraphic({ level, color, unlocked }: PixelFarmGraphicProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!unlocked) return;

    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 4);
    }, 600);

    return () => clearInterval(interval);
  }, [unlocked]);

  const pixelSize = 2;

  // Different farm graphics based on tier
  const getFarmPattern = () => {
    switch (level) {
      case 1: // GENESIS PLOT - simple rows
        return [
          "    ████████████    ",
          "  ██████████████████",
          "  ████  ████  ██████",
          "  ████  ████  ██████",
        ];
      case 2: // NEON FIELD - glowing crops
        return [
          "  ██  ██  ██  ██  ██",
          "  ██  ██  ██  ██  ██",
          "████████████████████",
          "████████████████████",
        ];
      case 3: // CYBER GROVE - tech trees
        return [
          "  ████    ████    ██",
          " ██████  ██████  ████",
          "████████████████████",
          "  ██      ██      ██",
        ];
      case 4: // QUANTUM PATCH - complex structure
        return [
          "██  ██  ██  ██  ██  ",
          "████████████████████",
          "██  ████  ████  ████",
          "████████████████████",
        ];
      case 5: // NEURAL GARDEN - interconnected
        return [
          "████  ████  ████  ██",
          "████████████████████",
          "  ████████████████  ",
          "████████████████████",
        ];
      case 6: // VOID PLANTATION - dark matter
        return [
          "██████████████████  ",
          "████████  ██████████",
          "██████████  ████████",
          "████████████████████",
        ];
      case 7: // OMEGA SANCTUM - ultimate
        return [
          "████████████████████",
          "████████████████████",
          "████████████████████",
          "████████████████████",
        ];
      default:
        return [
          "                    ",
          "                    ",
          "                    ",
          "                    ",
        ];
    }
  };

  const pattern = getFarmPattern();

  return (
    <div className="relative h-full flex items-center justify-center">
      {unlocked ? (
        <>
          {/* Farm base platform */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 border-t-2"
            style={{
              backgroundColor: color,
              borderColor: color,
              opacity: 0.5,
            }}
          />

          {/* Main farm graphic */}
          <motion.div
            className="relative z-10"
            animate={{
              y: frame % 2 === 0 ? 0 : -2,
            }}
            transition={{ duration: 0 }}
          >
            {pattern.map((row, y) => (
              <div key={y} className="flex">
                {row.split("").map((pixel, x) => (
                  <motion.div
                    key={`${x}-${y}`}
                    style={{
                      width: pixelSize,
                      height: pixelSize,
                      backgroundColor: pixel === "█" ? color : "transparent",
                    }}
                    animate={{
                      opacity: pixel === "█" && frame === y % 4 ? [1, 0.6, 1] : 1,
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>
            ))}
          </motion.div>

          {/* Production particles */}
          {unlocked && [...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: 2,
                height: 2,
                backgroundColor: color,
                bottom: "40%",
                left: `${20 + i * 15}%`,
              }}
              animate={{
                y: [0, -30, -60],
                opacity: [0, 1, 0],
                scale: [0, 1, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "linear",
              }}
            />
          ))}

          {/* Glow effect on active farms */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundColor: color,
              opacity: 0.05,
            }}
            animate={{
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-8 h-8 border-2 border-[#333333]" />
          <div className="flex gap-1">
            <div className="w-2 h-2 border border-[#333333]" />
            <div className="w-2 h-2 border border-[#333333]" />
            <div className="w-2 h-2 border border-[#333333]" />
          </div>
        </div>
      )}
    </div>
  );
}
