import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Sprout, Wallet, Terminal, Cpu, Zap } from "lucide-react";
import { PixelButton } from "./PixelButton";

interface LandingPageProps {
  onConnect: () => void;
}

export function LandingPage({ onConnect }: LandingPageProps) {
  const [scanline, setScanline] = useState(0);
  const [blinkState, setBlinkState] = useState(true);
  const [glitchFrame, setGlitchFrame] = useState(0);

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanline((prev) => (prev + 1) % 100);
    }, 40);
    return () => clearInterval(scanInterval);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState((prev) => !prev);
    }, 600);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchFrame((prev) => (prev + 1) % 4);
    }, 800);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Animated scanline */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 pointer-events-none z-50"
        style={{
          backgroundColor: "#ff6600",
          opacity: 0.3,
          top: `${scanline}%`,
          boxShadow: "0 0 10px rgba(255, 102, 0, 0.5)",
        }}
      />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 7px, rgba(255, 102, 0, 0.3) 7px, rgba(255, 102, 0, 0.3) 8px),
            repeating-linear-gradient(90deg, transparent, transparent 7px, rgba(255, 102, 0, 0.3) 7px, rgba(255, 102, 0, 0.3) 8px)
          `,
        }}
      />

      {/* Floating pixel particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1"
          style={{
            backgroundColor: i % 3 === 0 ? "#ff6600" : i % 3 === 1 ? "#33ff66" : "#00ccff",
            left: `${10 + (i * 5) % 80}%`,
          }}
          animate={{
            y: ["100vh", "-10vh"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 8 + i % 4,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "linear",
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8">
        {/* Top system info */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <motion.div
            className="w-2 h-2 bg-[#33ff66]"
            animate={{ opacity: blinkState ? 1 : 0.3 }}
            transition={{ duration: 0 }}
          />
          <span className="mono text-xs" style={{ color: "#666666" }}>
            SYSTEM.ONLINE
          </span>
          <div className="w-px h-4 bg-[#333333]" />
          <span className="mono text-xs" style={{ color: "#666666" }}>
            PROTOCOL.v1.0.7
          </span>
          <div className="w-px h-4 bg-[#333333]" />
          <span className="mono text-xs" style={{ color: "#666666" }}>
            NETWORK: MAINNET
          </span>
        </motion.div>

        {/* Logo */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <motion.div
            className="w-32 h-32 border-8 border-[#ff6600] flex items-center justify-center relative overflow-hidden"
            style={{
              backgroundColor: "#ff6600",
              boxShadow: "8px 8px 0 rgba(255, 102, 0, 0.3)",
            }}
            animate={{
              boxShadow: blinkState
                ? "8px 8px 0 rgba(255, 102, 0, 0.5)"
                : "12px 12px 0 rgba(255, 102, 0, 0.7)",
            }}
            transition={{ duration: 0 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sprout size={64} style={{ color: "#0a0a0a" }} strokeWidth={3} />
            </motion.div>

            {/* Pixel explosion from logo */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#ff6600]"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  x: [0, Math.cos(i * Math.PI * 0.25) * 60],
                  y: [0, Math.sin(i * Math.PI * 0.25) * 60],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <motion.h1
            className="pixel mb-8"
            style={{ fontSize: "80px", color: "#ff6600", lineHeight: 1 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0 }}
          >
            MEGACARROT
          </motion.h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-16 bg-[#333333]" />
            <span className="pixel text-xs" style={{ color: "#666666" }}>
              DYSTOPIAN CRYPTO FARMING SYSTEM
            </span>
            <div className="h-px w-16 bg-[#333333]" />
          </div>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          {[
            { icon: Terminal, label: "TERMINAL UI", color: "#ff6600" },
            { icon: Cpu, label: "7 FARM TIERS", color: "#33ff66" },
            { icon: Zap, label: "ELITE OPS", color: "#00ccff" },
          ].map((feature, index) => (
            <motion.div
              key={feature.label}
              className="border-4 border-[#333333] p-6 relative overflow-hidden"
              style={{ backgroundColor: "#141414" }}
              whileHover={{
                borderColor: feature.color,
                y: -4,
                boxShadow: `4px 8px 0 ${feature.color}40`,
              }}
              transition={{ duration: 0 }}
              animate={{
                y: index === 1 ? [0, -4, 0] : 0,
              }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: feature.color }}
                animate={{ opacity: [0, 0.05, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              />
              <div className="relative z-10">
                <feature.icon
                  size={32}
                  style={{ color: feature.color }}
                  strokeWidth={2}
                  className="mb-3"
                />
                <div className="mono text-xs" style={{ color: feature.color }}>
                  {feature.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Connect button */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1 }}
        >
          <div className="relative">
            {/* Glow effect around button */}
            <motion.div
              className="absolute inset-0 blur-xl"
              style={{ backgroundColor: "#ff6600" }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Rotating pixel border */}
            <motion.div
              className="absolute -inset-3 border-4 border-[#ff6600]"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ opacity: 0.3 }}
            />

            <PixelButton
              variant="orange"
              size="lg"
              onClick={onConnect}
              className="relative"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Wallet size={28} strokeWidth={3} />
                </motion.div>
                <span style={{ fontSize: "20px", fontWeight: 700 }}>
                  CONNECT WALLET
                </span>
              </div>
            </PixelButton>
          </div>

          <motion.div
            className="mono text-xs text-center"
            style={{ color: "#666666" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            &gt;&gt; INITIALIZE AGRICULTURAL CONTROL INTERFACE
          </motion.div>
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          className="flex items-center justify-center gap-8 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.2 }}
        >
          {[
            { label: "FARMS", value: "7", color: "#ff6600" },
            { label: "OPERATIVES", value: "7", color: "#33ff66" },
            { label: "UPGRADES", value: "∞", color: "#00ccff" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.div
                className="pixel mb-2"
                style={{ color: stat.color, fontSize: "32px" }}
                animate={{
                  textShadow: blinkState
                    ? `0 0 8px ${stat.color}80`
                    : `0 0 4px ${stat.color}40`,
                }}
                transition={{ duration: 0 }}
              >
                {stat.value}
              </motion.div>
              <div className="mono text-xs" style={{ color: "#666666" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom terminal bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-3 border-t-4 border-[#333333] flex"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 h-full"
            style={{ backgroundColor: "#333333" }}
            animate={{
              backgroundColor:
                i % 20 === Math.floor(scanline / 5) % 20 ? "#ff6600" : "#333333",
            }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}