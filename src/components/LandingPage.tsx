import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Sprout, FileText, Zap, Box, Flame, Lock } from "lucide-react";
import { PixelButton } from "./PixelButton";

interface LandingPageProps {
  onConnect: () => void;
}

export function LandingPage({ onConnect }: LandingPageProps) {
  const [scanlineY, setScanlineY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [outerRotation, setOuterRotation] = useState(0);
  const [glowPulse, setGlowPulse] = useState(0);

  // Scanline animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanlineY((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Emblem rotation (inner - faster)
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.8) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Outer rotation (slower, opposite direction)
  useEffect(() => {
    const interval = setInterval(() => {
      setOuterRotation((prev) => (prev - 0.4) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Glow pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowPulse((prev) => (prev + 1) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const glowOpacity = Math.sin((glowPulse / 100) * Math.PI * 2) * 0.25 + 0.4;

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* Multi-layer background */}
      
      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.6) 100%)",
        }}
      />

      {/* Primary pixel grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 7px, rgba(0, 188, 235, 0.5) 7px, rgba(0, 188, 235, 0.5) 8px),
            repeating-linear-gradient(90deg, transparent, transparent 7px, rgba(0, 188, 235, 0.5) 7px, rgba(0, 188, 235, 0.5) 8px)
          `,
        }}
      />

      {/* Diagonal pixel noise pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255, 102, 0, 0.3) 3px, rgba(255, 102, 0, 0.3) 4px),
            repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(51, 255, 102, 0.3) 3px, rgba(51, 255, 102, 0.3) 4px)
          `,
        }}
      />

      {/* Enhanced glowing pixel dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(60)].map((_, i) => {
          const isOrange = i % 4 === 0;
          const isGreen = i % 4 === 1;
          const isCyan = i % 4 === 2;
          const color = isOrange ? "#ff6a00" : isGreen ? "#2ed573" : isCyan ? "#00a8cc" : "#ff6a00";
          const size = i % 3 === 0 ? 2 : 1;
          
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                boxShadow: size === 2 ? `0 0 4px ${color}` : "none",
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + (i % 6),
                repeat: Infinity,
                delay: (i % 12) * 0.3,
              }}
            />
          );
        })}
      </div>

      {/* Scanline effect */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          top: `${scanlineY}%`,
          backgroundColor: "#00a8cc",
          opacity: 0.08,
          boxShadow: "0 0 8px rgba(0, 168, 204, 0.4)",
        }}
      />

      {/* Top bar */}
      <div
        className="fixed top-0 left-0 right-0 h-20 border-b-2 border-[#1a1a1a] z-50"
        style={{ backgroundColor: "rgba(10, 10, 10, 0.98)" }}
      >
        <div className="max-w-[1440px] mx-auto px-8 h-full flex items-center justify-between">
          {/* Left: Logo + Text */}
          <div className="flex items-center gap-4">
            <motion.div
              className="w-10 h-10 border-3 border-[#ff6a00] flex items-center justify-center relative"
              style={{ backgroundColor: "#ff6a00", boxShadow: "4px 4px 0 rgba(255, 106, 0, 0.3)" }}
              whileHover={{
                boxShadow: "6px 6px 0 rgba(255, 106, 0, 0.5)",
                y: -2,
              }}
            >
              <Sprout size={22} style={{ color: "#0a0a0a" }} strokeWidth={3} />
            </motion.div>
            <span className="pixel" style={{ color: "#ff6a00", fontSize: "18px", letterSpacing: "0.05em" }}>
              MEGACARROT
            </span>
          </div>

          {/* Center: Nav (disabled) */}
          <div className="flex items-center gap-12">
            {["ABOUT", "TOKEN", "FARMS"].map((item) => (
              <button
                key={item}
                className="mono text-sm relative group cursor-not-allowed"
                style={{ color: "#2a2a2a", letterSpacing: "0.08em", fontWeight: 500 }}
                disabled
              >
                {item}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  <div
                    className="border-2 border-[#333333] px-4 py-2 whitespace-nowrap mono text-xs"
                    style={{ backgroundColor: "#0a0a0a", color: "#666666", boxShadow: "4px 4px 0 rgba(0, 0, 0, 0.5)" }}
                  >
                    CONNECT WALLET TO ACCESS
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Docs & X - MUCH LARGER & MORE LEFT */}
          <div className="flex items-center gap-10 pr-40">
            <motion.a
              href="#"
              className="mono relative group"
              style={{ color: "#666666", letterSpacing: "0.12em", fontSize: "30px", fontWeight: 500 }}
              whileHover={{
                color: "#ff6a00",
                y: -3,
              }}
              transition={{ duration: 0.16 }}
            >
              DOCS
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#ff6a00]"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
            
            <motion.a
              href="#"
              className="mono relative group"
              style={{ color: "#666666", letterSpacing: "0.12em", fontSize: "30px", fontWeight: 500 }}
              whileHover={{
                color: "#00a8cc",
                y: -3,
              }}
              transition={{ duration: 0.16 }}
            >
              𝕏
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#00a8cc]"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Main content - centered */}
      <div className="fixed inset-0 flex items-center justify-center pt-20">
        <div className="w-full max-w-[1200px] px-8 flex flex-col items-center">
          {/* Hero headline - ANIMATED WITH TYPEWRITER EFFECT */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="pixel mb-6"
              style={{
                fontSize: "42px",
                lineHeight: 1.3,
                letterSpacing: "0.03em",
              }}
            >
              {/* Animated text with smooth cascade */}
              <motion.div className="flex flex-col items-center gap-1">
                {/* First line */}
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{
                    color: "#ff6a00",
                    textShadow: "4px 4px 0 rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {["P", "L", "A", "N", "T"].map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.3 + i * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  <motion.span
                    className="mx-3"
                    style={{ color: "#555555" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0.6] }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    .
                  </motion.span>
                  {["G", "R", "O", "W"].map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 1.0 + i * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  <motion.span
                    className="mx-3"
                    style={{ color: "#555555" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0.6] }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                  >
                    .
                  </motion.span>
                  {["H", "A", "R", "V", "E", "S", "T"].map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 1.6 + i * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  <motion.span
                    className="ml-2"
                    style={{ color: "#ff6a00" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1] }}
                    transition={{ duration: 0.4, delay: 2.3 }}
                  >
                    .
                  </motion.span>
                </motion.div>
                
                {/* Subtitle with smooth fade */}
                <motion.div
                  className="mono text-xs mt-5"
                  style={{ 
                    color: "#666666", 
                    letterSpacing: "0.28em",
                    fontWeight: 400,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.span
                    animate={{
                      opacity: [0.6, 0.8, 0.6],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Your passive crypto farming protocol
                  </motion.span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Stat chips - 3 in a row */}
          <motion.div
            className="flex gap-6 mb-16"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Total Farmer Power */}
            <div
              className="w-80 border-3 border-[#2a2a2a] p-6 relative overflow-hidden"
              style={{ 
                backgroundColor: "#0f0f0f",
                boxShadow: "5px 5px 0 rgba(0, 0, 0, 0.4)",
              }}
            >
              {/* Inner highlight border */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: "#ff6a00", opacity: 0.15 }} />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 border-2 border-[#ff6a00] flex items-center justify-center" style={{ backgroundColor: "#ff6a00" }}>
                  <Zap size={14} style={{ color: "#0a0a0a" }} strokeWidth={3} />
                </div>
                <span className="mono text-xs" style={{ color: "#555555", letterSpacing: "0.08em", opacity: 0.7 }}>
                  TOTAL FARMER POWER
                </span>
              </div>
              <motion.div
                className="pixel"
                style={{ color: "#ff6a00", fontSize: "42px", letterSpacing: "-0.02em" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  textShadow: [
                    "0 0 12px rgba(255, 106, 0, 0.4)",
                    "0 0 18px rgba(255, 106, 0, 0.6)",
                    "0 0 12px rgba(255, 106, 0, 0.4)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                12,847
              </motion.div>
            </div>

            {/* Supply */}
            <div
              className="w-80 border-3 border-[#2a2a2a] p-6 relative overflow-hidden"
              style={{ 
                backgroundColor: "#0f0f0f",
                boxShadow: "5px 5px 0 rgba(0, 0, 0, 0.4)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: "#2ed573", opacity: 0.15 }} />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 border-2 border-[#2ed573] flex items-center justify-center" style={{ backgroundColor: "#2ed573" }}>
                  <Box size={14} style={{ color: "#0a0a0a" }} strokeWidth={3} />
                </div>
                <span className="mono text-xs" style={{ color: "#555555", letterSpacing: "0.08em", opacity: 0.7 }}>
                  SUPPLY
                </span>
              </div>
              <motion.div
                className="pixel"
                style={{ color: "#2ed573", fontSize: "36px", letterSpacing: "-0.02em" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                1,000,000
              </motion.div>
            </div>

            {/* Burned */}
            <div
              className="w-80 border-3 border-[#2a2a2a] p-6 relative overflow-hidden"
              style={{ 
                backgroundColor: "#0f0f0f",
                boxShadow: "5px 5px 0 rgba(0, 0, 0, 0.4)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: "#00a8cc", opacity: 0.15 }} />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 border-2 border-[#00a8cc] flex items-center justify-center" style={{ backgroundColor: "#00a8cc" }}>
                  <Flame size={14} style={{ color: "#0a0a0a" }} strokeWidth={3} />
                </div>
                <span className="mono text-xs" style={{ color: "#555555", letterSpacing: "0.08em", opacity: 0.7 }}>
                  BURNED
                </span>
              </div>
              <motion.div
                className="pixel"
                style={{ color: "#00a8cc", fontSize: "42px", letterSpacing: "-0.02em" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                247,391
              </motion.div>
            </div>
          </motion.div>

          {/* Center animated emblem - LARGER & MORE PREMIUM */}
          <motion.div
            className="relative mb-16"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Stepped glow halo (no blur, layered opacity) */}
            {[40, 32, 24, 16, 8].map((offset, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  inset: -offset,
                  backgroundColor: "#ff6a00",
                  opacity: glowOpacity * (0.03 - i * 0.005),
                }}
              />
            ))}

            {/* Emblem container - LARGER */}
            <div
              className="relative w-64 h-64 border-3 border-[#ff6a00] flex items-center justify-center"
              style={{ 
                backgroundColor: "#0a0a0a",
                boxShadow: "6px 6px 0 rgba(255, 106, 0, 0.4), inset 0 0 40px rgba(255, 106, 0, 0.08)",
              }}
            >
              {/* Outer rotation ring (slower, opposite) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-56 h-56 relative"
                  style={{ transform: `rotate(${outerRotation}deg)` }}
                >
                  <svg width="224" height="224" viewBox="0 0 224 224">
                    {/* Outer square frame with corners */}
                    <rect x="16" y="16" width="192" height="192" fill="none" stroke="#ff6a00" strokeWidth="2" opacity="0.3" />
                    <rect x="12" y="12" width="8" height="8" fill="#ff6a00" opacity="0.5" />
                    <rect x="204" y="12" width="8" height="8" fill="#ff6a00" opacity="0.5" />
                    <rect x="12" y="204" width="8" height="8" fill="#ff6a00" opacity="0.5" />
                    <rect x="204" y="204" width="8" height="8" fill="#ff6a00" opacity="0.5" />
                    
                    {/* Diagonal cross lines */}
                    <line x1="16" y1="16" x2="48" y2="48" stroke="#ff6a00" strokeWidth="2" opacity="0.2" />
                    <line x1="208" y1="16" x2="176" y2="48" stroke="#ff6a00" strokeWidth="2" opacity="0.2" />
                    <line x1="16" y1="208" x2="48" y2="176" stroke="#ff6a00" strokeWidth="2" opacity="0.2" />
                    <line x1="208" y1="208" x2="176" y2="176" stroke="#ff6a00" strokeWidth="2" opacity="0.2" />
                  </svg>
                </motion.div>
              </div>

              {/* Inner rotating wireframe core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-40 h-40 relative"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {/* Enhanced hex wireframe */}
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    {/* Outer hex */}
                    <polygon
                      points="80,16 128,48 128,112 80,144 32,112 32,48"
                      fill="none"
                      stroke="#ff6a00"
                      strokeWidth="2.5"
                      opacity="0.7"
                    />
                    {/* Middle hex */}
                    <polygon
                      points="80,36 108,52 108,108 80,124 52,108 52,52"
                      fill="none"
                      stroke="#ff6a00"
                      strokeWidth="2.5"
                      opacity="0.85"
                    />
                    {/* Center hex - filled */}
                    <polygon
                      points="80,60 96,70 96,90 80,100 64,90 64,70"
                      fill="#ff6a00"
                      stroke="#ff6a00"
                      strokeWidth="2.5"
                      opacity="0.95"
                    />
                    {/* Connecting lines */}
                    <line x1="80" y1="16" x2="80" y2="60" stroke="#ff6a00" strokeWidth="2" opacity="0.4" />
                    <line x1="128" y1="48" x2="96" y2="70" stroke="#ff6a00" strokeWidth="2" opacity="0.4" />
                    <line x1="128" y1="112" x2="96" y2="90" stroke="#ff6a00" strokeWidth="2" opacity="0.4" />
                    <line x1="80" y1="144" x2="80" y2="100" stroke="#ff6a00" strokeWidth="2" opacity="0.4" />
                    <line x1="32" y1="112" x2="64" y2="90" stroke="#ff6a00" strokeWidth="2" opacity="0.4" />
                    <line x1="32" y1="48" x2="64" y2="70" stroke="#ff6a00" strokeWidth="2" opacity="0.4" />
                    
                    {/* Inner core details */}
                    <circle cx="80" cy="80" r="6" fill="#0a0a0a" stroke="#ff6a00" strokeWidth="2" />
                  </svg>
                </motion.div>
              </div>

              {/* Enhanced corner pixels */}
              {[
                { top: 6, left: 6 },
                { top: 6, right: 6 },
                { bottom: 6, left: 6 },
                { bottom: 6, right: 6 },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-[#ff6a00]"
                  style={{ ...pos, boxShadow: "0 0 4px rgba(255, 106, 0, 0.6)" }}
                  animate={{
                    opacity: [1, 0.4, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: i * 0.45,
                  }}
                />
              ))}

              {/* Periodic scanline sweep */}
              <motion.div
                className="absolute left-0 right-0 h-px"
                style={{
                  backgroundColor: "#ff6a00",
                  opacity: 0.7,
                  boxShadow: "0 0 4px rgba(255, 106, 0, 0.8)",
                }}
                animate={{
                  top: ["0%", "100%", "100%", "100%"],
                  opacity: [0, 0.7, 0, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  times: [0, 0.12, 0.13, 1],
                }}
              />
            </div>
          </motion.div>

          {/* Primary CTA - LARGER & MORE PREMIUM */}
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              className="border-4 border-[#ff6a00] px-12 py-6 relative overflow-hidden group"
              style={{ 
                backgroundColor: "#0a0a0a",
                boxShadow: "6px 6px 0 rgba(255, 106, 0, 0.4)",
              }}
              onClick={onConnect}
              whileHover={{
                y: -4,
                boxShadow: "8px 10px 0 rgba(255, 106, 0, 0.5)",
              }}
              whileTap={{
                y: 1,
                boxShadow: "3px 3px 0 rgba(255, 106, 0, 0.5)",
              }}
              transition={{ duration: 0.16 }}
            >
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: "#ff6a00" }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.08 }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Top edge highlight */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: "#ff6a00", opacity: 0.3 }} />
              
              <div className="flex items-center gap-4 relative z-10">
                <Sprout size={24} style={{ color: "#ff6a00" }} strokeWidth={3} />
                <span className="pixel" style={{ 
                  fontSize: "20px", 
                  letterSpacing: "0.08em",
                  color: "#ff6a00",
                }}>
                  CONNECT WALLET
                </span>
              </div>
            </motion.button>

            <div
              className="mono text-xs tracking-wider"
              style={{ color: "#555555", letterSpacing: "0.12em" }}
            >
              &gt;&gt; CONNECT WALLET TO INITIALIZE FARM CONTROL
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom mini nav */}
      <div className="fixed bottom-10 left-0 right-0 z-50">
        <div className="flex items-center justify-center gap-6">
          {[
            { label: "FARMS", icon: Sprout },
            { label: "OPERATIVES", icon: Zap },
            { label: "UPGRADES", icon: Box },
          ].map(({ label, icon: Icon }) => (
            <motion.button
              key={label}
              className="flex items-center gap-3 px-5 py-3 border-2 border-[#1a1a1a] relative group"
              style={{ backgroundColor: "#0a0a0a", color: "#2a2a2a", boxShadow: "3px 3px 0 rgba(0, 0, 0, 0.3)" }}
              disabled
              whileHover={{ borderColor: "#2a2a2a" }}
            >
              <Lock size={14} strokeWidth={2.5} />
              <span className="mono text-xs" style={{ letterSpacing: "0.08em" }}>{label}</span>
              
              {/* Tooltip */}
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div
                  className="border-2 border-[#333333] px-4 py-2 whitespace-nowrap mono text-xs"
                  style={{ backgroundColor: "#0a0a0a", color: "#666666", boxShadow: "4px 4px 0 rgba(0, 0, 0, 0.5)" }}
                >
                  CONNECT WALLET TO ACCESS
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}