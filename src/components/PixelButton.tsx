import { motion } from "motion/react";
import { useState } from "react";

interface PixelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "orange" | "green" | "cyan" | "gray";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function PixelButton({
  children,
  onClick,
  variant = "orange",
  size = "md",
  disabled = false,
  fullWidth = false,
  className = "",
}: PixelButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    orange: {
      bg: "#ff6600",
      bgDark: "#cc5200",
      border: "#ff8800",
      text: "#0a0a0a",
      glow: "rgba(255, 102, 0, 0.5)",
      glowBright: "rgba(255, 102, 0, 0.8)",
      particle: "#ff6600",
    },
    green: {
      bg: "#33ff66",
      bgDark: "#29cc52",
      border: "#55ff88",
      text: "#0a0a0a",
      glow: "rgba(51, 255, 102, 0.5)",
      glowBright: "rgba(51, 255, 102, 0.8)",
      particle: "#33ff66",
    },
    cyan: {
      bg: "#00ccff",
      bgDark: "#00aacc",
      border: "#33ddff",
      text: "#0a0a0a",
      glow: "rgba(0, 204, 255, 0.5)",
      glowBright: "rgba(0, 204, 255, 0.8)",
      particle: "#00ccff",
    },
    gray: {
      bg: "#333333",
      bgDark: "#222222",
      border: "#444444",
      text: "#999999",
      glow: "rgba(51, 51, 51, 0.5)",
      glowBright: "rgba(68, 68, 68, 0.8)",
      particle: "#666666",
    },
  };

  const sizes = {
    sm: { padding: "px-6 py-3", text: "text-xs", height: "h-10" },
    md: { padding: "px-8 py-4", text: "text-sm", height: "h-14" },
    lg: { padding: "px-12 py-6", text: "text-base", height: "h-20" },
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  return (
    <motion.button
      className={`
        mono uppercase tracking-wider
        border-4 relative overflow-hidden
        ${currentSize.padding}
        ${currentSize.height}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      style={{
        backgroundColor: currentVariant.bg,
        borderColor: currentVariant.border,
        color: currentVariant.text,
        boxShadow: disabled
          ? "4px 4px 0 rgba(0, 0, 0, 0.2)"
          : `6px 6px 0 ${currentVariant.bgDark}`,
      }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onHoverStart={() => !disabled && setIsHovered(true)}
      onHoverEnd={() => !disabled && setIsHovered(false)}
      whileHover={
        !disabled
          ? {
              y: -6,
              boxShadow: `8px 14px 0 ${currentVariant.bgDark}, 0 0 20px ${currentVariant.glow}`,
              borderColor: currentVariant.border,
            }
          : undefined
      }
      whileTap={
        !disabled
          ? {
              y: 2,
              boxShadow: `3px 3px 0 ${currentVariant.bgDark}`,
            }
          : undefined
      }
      transition={{ duration: 0, type: "tween" }}
    >
      {/* Corner accent pixels - Top Left */}
      <motion.div
        className="absolute top-1 left-1 w-2 h-2"
        style={{ backgroundColor: currentVariant.text }}
        animate={
          isHovered
            ? {
                opacity: [1, 0, 1],
              }
            : { opacity: 0.3 }
        }
        transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0 }}
      />

      {/* Corner accent pixels - Top Right */}
      <motion.div
        className="absolute top-1 right-1 w-2 h-2"
        style={{ backgroundColor: currentVariant.text }}
        animate={
          isHovered
            ? {
                opacity: [1, 0, 1],
              }
            : { opacity: 0.3 }
        }
        transition={{
          duration: 0.3,
          repeat: isHovered ? Infinity : 0,
          delay: 0.15,
        }}
      />

      {/* Corner accent pixels - Bottom Left */}
      <motion.div
        className="absolute bottom-1 left-1 w-2 h-2"
        style={{ backgroundColor: currentVariant.text }}
        animate={
          isHovered
            ? {
                opacity: [1, 0, 1],
              }
            : { opacity: 0.3 }
        }
        transition={{
          duration: 0.3,
          repeat: isHovered ? Infinity : 0,
          delay: 0.3,
        }}
      />

      {/* Corner accent pixels - Bottom Right */}
      <motion.div
        className="absolute bottom-1 right-1 w-2 h-2"
        style={{ backgroundColor: currentVariant.text }}
        animate={
          isHovered
            ? {
                opacity: [1, 0, 1],
              }
            : { opacity: 0.3 }
        }
        transition={{
          duration: 0.3,
          repeat: isHovered ? Infinity : 0,
          delay: 0.45,
        }}
      />

      {/* Scanline effect on hover */}
      {isHovered && !disabled && (
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            backgroundColor: currentVariant.text,
            opacity: 0.5,
          }}
          initial={{ top: "0%" }}
          animate={{ top: "100%" }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Glowing edge effect */}
      {isHovered && !disabled && (
        <>
          <motion.div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: currentVariant.text }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ backgroundColor: currentVariant.text }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
          />
        </>
      )}

      {/* Particle effects on hover */}
      {isHovered && !disabled && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1"
              style={{
                backgroundColor: currentVariant.particle,
                left: `${20 + i * 12}%`,
                top: "50%",
              }}
              animate={{
                y: [0, -20 - i * 3],
                opacity: [0, 1, 0],
                scale: [1, 1.5, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      {/* Inner glow pulse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: currentVariant.particle }}
        animate={
          isHovered
            ? {
                opacity: [0, 0.15, 0],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Edge pixel decoration - Left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 flex flex-col gap-px py-2">
        {[...Array(size === "lg" ? 6 : size === "md" ? 4 : 3)].map((_, i) => (
          <motion.div
            key={i}
            className="flex-1"
            style={{ backgroundColor: currentVariant.text }}
            animate={
              isHovered
                ? {
                    opacity: [0.2, 0.6, 0.2],
                  }
                : { opacity: 0.2 }
            }
            transition={{
              duration: 0.6,
              repeat: isHovered ? Infinity : 0,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Edge pixel decoration - Right */}
      <div className="absolute right-0 top-0 bottom-0 w-1 flex flex-col gap-px py-2">
        {[...Array(size === "lg" ? 6 : size === "md" ? 4 : 3)].map((_, i) => (
          <motion.div
            key={i}
            className="flex-1"
            style={{ backgroundColor: currentVariant.text }}
            animate={
              isHovered
                ? {
                    opacity: [0.2, 0.6, 0.2],
                  }
                : { opacity: 0.2 }
            }
            transition={{
              duration: 0.6,
              repeat: isHovered ? Infinity : 0,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Button content */}
      <motion.span
        className={`relative z-10 block ${currentSize.text}`}
        style={{ fontWeight: 700 }}
        animate={
          isHovered
            ? {
                letterSpacing: "0.15em",
              }
            : {
                letterSpacing: "0.1em",
              }
        }
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>

      {/* Bottom pixel bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 flex gap-px px-1">
        {[...Array(size === "lg" ? 20 : size === "md" ? 15 : 10)].map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 h-full"
            style={{ backgroundColor: currentVariant.text }}
            animate={
              isHovered
                ? {
                    opacity: [0.1, 0.5, 0.1],
                  }
                : { opacity: 0.1 }
            }
            transition={{
              duration: 0.8,
              repeat: isHovered ? Infinity : 0,
              delay: i * 0.05,
            }}
          />
        ))}
      </div>
    </motion.button>
  );
}
