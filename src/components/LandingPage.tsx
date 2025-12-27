import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronRight, FileText, Send } from "lucide-react";

interface LandingPageProps {
  onConnect: () => void;
}

export function LandingPage({ onConnect }: LandingPageProps) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Animated counters
  const [totalFarmPower, setTotalFarmPower] = useState(0);
  const [remainingSupply, setRemainingSupply] = useState(0);
  const [burnedAmount, setBurnedAmount] = useState(0);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Track mouse for parallax
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 20);
      setMouseY((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  // Animated counters - slow to fast progression
  useEffect(() => {
    const targetFarmPower = 247851;
    const targetRemainingSupply = 51233243;
    const targetBurnedAmount = 20766757;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      // Ease-in progression (slow to fast)
      const duration = 3000; // 3 seconds
      const easeInProgress = Math.min(progress / duration, 1);
      const eased = easeInProgress * easeInProgress; // quadratic ease-in

      setTotalFarmPower(Math.floor(targetFarmPower * eased));
      setRemainingSupply(Math.floor(targetRemainingSupply * eased));
      setBurnedAmount(Math.floor(targetBurnedAmount * eased));

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setTotalFarmPower(targetFarmPower);
        setRemainingSupply(targetRemainingSupply);
        setBurnedAmount(targetBurnedAmount);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  // Star particles
  const StarField = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 100 }).map((_, i) => {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              backgroundColor: i % 3 === 0 ? "#ff6a00" : i % 3 === 1 ? "#33ff99" : "#00ccff",
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
            }}
          />
        );
      })}
    </div>
  );

  // Animated grid background with parallax
  const GridBackground = () => (
    <motion.div
      className="absolute inset-0 overflow-hidden pointer-events-none opacity-15"
      style={{
        x: mouseX,
        y: mouseY,
      }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(51, 255, 153, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(51, 255, 153, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "center center",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "80px 80px"],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );

  // Floating particles
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => {
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = prefersReducedMotion ? 0 : Math.random() * 20 + 15;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${startX}%`,
              top: `${startY}%`,
              backgroundColor: i % 3 === 0 ? "#ff6a00" : i % 3 === 1 ? "#33ff99" : "#00ccff",
              opacity: 0.3,
            }}
            animate={prefersReducedMotion ? {} : {
              y: [0, -150, 0],
              x: [0, (Math.random() - 0.5) * 40, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );

  // Data line flickers - occasional horizontal lines that flash across screen
  const DataLineFlickers = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 5 }).map((_, i) => {
        const yPos = Math.random() * 100;
        const delay = i * 4 + Math.random() * 3;

        return (
          <motion.div
            key={i}
            className="absolute left-0 right-0"
            style={{
              height: "1px",
              top: `${yPos}%`,
              background: "linear-gradient(to right, transparent, rgba(51, 255, 153, 0.8), transparent)",
              boxShadow: "0 0 10px rgba(51, 255, 153, 0.6)",
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={prefersReducedMotion ? {} : {
              opacity: [0, 1, 0],
              scaleX: [0, 1, 1],
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              repeatDelay: 8,
              delay,
              times: [0, 0.2, 1],
            }}
          />
        );
      })}
    </div>
  );

  // Noise texture overlay
  const NoiseTexture = () => (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        backgroundColor: "#000000",
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(10, 10, 10, 1) 0%, rgba(0, 0, 0, 1) 100%)",
      }}
    >
      {/* Background layers */}
      <StarField />
      <GridBackground />
      <FloatingParticles />
      <DataLineFlickers />
      <NoiseTexture />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to bottom, transparent 50%, rgba(0, 200, 255, 0.015) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
        {/* Status Indicator */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="w-2 h-2"
            style={{ backgroundColor: "#33ff99" }}
            animate={{
              opacity: [1, 0.3, 1],
              boxShadow: [
                "0 0 8px rgba(51, 255, 153, 0.8)",
                "0 0 20px rgba(51, 255, 153, 1)",
                "0 0 8px rgba(51, 255, 153, 0.8)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span
            className="mono"
            style={{
              fontSize: "10px",
              color: "#33ff99",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            System Online
          </span>
        </motion.div>

        {/* Hero Headline */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Scan sweep over hero text - passes every 6s */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{
              maskImage: "linear-gradient(to bottom, transparent, black, transparent)",
            }}
          >
            <motion.div
              className="absolute left-0 right-0 h-[3px]"
              style={{
                background: "linear-gradient(to bottom, transparent, rgba(255, 106, 0, 0.9), transparent)",
                boxShadow: "0 0 30px rgba(255, 106, 0, 1)",
                filter: "blur(2px)",
              }}
              initial={{ top: "-10px" }}
              animate={prefersReducedMotion ? {} : {
                top: ["0%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 6,
                ease: "linear",
              }}
            />
          </motion.div>

          <motion.h1
            className="pixel mb-2 relative"
            style={{
              fontSize: "72px",
              color: "#ff6a00",
              letterSpacing: "0.15em",
              lineHeight: 1.1,
            }}
            animate={prefersReducedMotion ? {} : {
              textShadow: [
                "0 0 40px rgba(255, 106, 0, 0.5)",
                "0 0 60px rgba(255, 106, 0, 0.8)",
                "0 0 40px rgba(255, 106, 0, 0.5)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            MEGACARROT
          </motion.h1>
          <motion.h2
            className="pixel mb-8 relative"
            style={{
              fontSize: "48px",
              color: "#ff6a00",
              letterSpacing: "0.15em",
              lineHeight: 1.1,
            }}
            animate={prefersReducedMotion ? {} : {
              textShadow: [
                "0 0 40px rgba(255, 106, 0, 0.5)",
                "0 0 60px rgba(255, 106, 0, 0.8)",
                "0 0 40px rgba(255, 106, 0, 0.5)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            PROTOCOL
          </motion.h2>
        </motion.div>

        {/* Animated Divider */}
        <motion.div
          className="relative mb-8 mx-auto"
          style={{ width: "400px", height: "2px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "rgba(255, 106, 0, 0.2)",
            }}
          />
          <motion.div
            className="absolute left-0 top-0 h-full"
            style={{
              width: "100px",
              background: "linear-gradient(to right, transparent, rgba(255, 106, 0, 1), transparent)",
              boxShadow: "0 0 20px rgba(255, 106, 0, 0.8)",
            }}
            animate={{
              x: ["-100px", "400px"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Subheadline */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p
            className="mono"
            style={{
              fontSize: "14px",
              color: "#33ff99",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              textShadow: "0 0 20px rgba(51, 255, 153, 0.4)",
            }}
          >
            Autonomous On-Chain Agricultural Infrastructure
          </p>
        </motion.div>

        {/* System Info Grid */}
        <motion.div
          className="grid grid-cols-3 gap-8 mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {/* Total Farm Power */}
          <div className="border" style={{ borderColor: "rgba(51, 255, 153, 0.3)", padding: "32px 16px" }}>
            <div
              className="mono mb-3"
              style={{
                fontSize: "9px",
                color: "#666",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Total Farm Power
            </div>
            <div
              className="pixel"
              style={{
                fontSize: "24px",
                color: "#33ff99",
                letterSpacing: "0.05em",
              }}
            >
              {totalFarmPower.toLocaleString()}
            </div>
          </div>

          {/* Remaining Supply */}
          <div className="border" style={{ borderColor: "rgba(0, 204, 255, 0.3)", padding: "32px 16px" }}>
            <div
              className="mono mb-3"
              style={{
                fontSize: "9px",
                color: "#666",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Remaining Supply
            </div>
            <div
              className="pixel"
              style={{
                fontSize: "20px",
                color: "#00ccff",
                letterSpacing: "0.03em",
              }}
            >
              {remainingSupply.toLocaleString()}
            </div>
          </div>

          {/* Burned Amount */}
          <div className="border" style={{ borderColor: "rgba(255, 106, 0, 0.3)", padding: "32px 16px" }}>
            <div
              className="mono mb-3"
              style={{
                fontSize: "9px",
                color: "#666",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Burned Amount
            </div>
            <div
              className="pixel"
              style={{
                fontSize: "20px",
                color: "#ff6a00",
                letterSpacing: "0.03em",
              }}
            >
              {burnedAmount.toLocaleString()}
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <motion.button
            className="relative px-12 py-5 border group"
            style={{
              backgroundColor: "rgba(255, 106, 0, 0.05)",
              borderColor: "#ff6a00",
              backdropFilter: "blur(8px)",
            }}
            onClick={onConnect}
            whileHover={{
              backgroundColor: "rgba(255, 106, 0, 0.15)",
              boxShadow: "0 0 40px rgba(255, 106, 0, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-4">
              <span
                className="pixel"
                style={{
                  fontSize: "16px",
                  color: "#ff6a00",
                  letterSpacing: "0.15em",
                }}
              >
                REQUEST PROTOCOL ACCESS
              </span>
              <motion.div
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <ChevronRight size={20} color="#ff6a00" />
              </motion.div>
            </div>

            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255, 106, 0, 0.2), transparent)",
                opacity: 0,
              }}
              whileHover={{
                opacity: 1,
                x: ["-100%", "100%"],
              }}
              transition={{
                x: { duration: 0.8, ease: "linear" },
              }}
            />
          </motion.button>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <div
            className="mono"
            style={{
              fontSize: "10px",
              color: "#444",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Decentralized Yield Infrastructure · Ethereum Mainnet · Est. 2025
          </div>
        </motion.div>
      </div>

      {/* Corner Ornaments */}
      <motion.div
        className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2"
        style={{ borderColor: "rgba(51, 255, 153, 0.3)" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2"
        style={{ borderColor: "rgba(255, 106, 0, 0.3)" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Top Right Navigation Links */}
      <motion.div
        className="absolute top-10 right-32 flex items-center gap-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* About */}
        <motion.a
          href="#"
          className="mono flex items-center gap-2"
          style={{
            fontSize: "16px",
            color: "#666",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
          whileHover={{
            color: "#33ff99",
          }}
          onClick={(e) => {
            e.preventDefault();
            console.log("About clicked");
          }}
        >
          About
        </motion.a>

        {/* Docs */}
        <motion.a
          href="#"
          className="mono flex items-center gap-2"
          style={{
            fontSize: "16px",
            color: "#666",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
          whileHover={{
            color: "#00ccff",
          }}
          onClick={(e) => {
            e.preventDefault();
            console.log("Docs clicked");
          }}
        >
          Docs
        </motion.a>

        {/* X (Twitter) */}
        <motion.a
          href="#"
          className="mono flex items-center gap-2"
          style={{
            fontSize: "16px",
            color: "#666",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
          whileHover={{
            color: "#ff6a00",
          }}
          onClick={(e) => {
            e.preventDefault();
            window.open("https://twitter.com", "_blank");
          }}
        >
          𝕏
        </motion.a>

        {/* Telegram */}
        <motion.a
          href="#"
          className="mono flex items-center gap-2"
          style={{
            fontSize: "16px",
            color: "#666",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
          whileHover={{
            color: "#33ff99",
          }}
          onClick={(e) => {
            e.preventDefault();
            window.open("https://t.me", "_blank");
          }}
        >
          <Send size={18} />
          TG
        </motion.a>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2"
        style={{ borderColor: "rgba(0, 204, 255, 0.3)" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2"
        style={{ borderColor: "rgba(51, 255, 153, 0.3)" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
}