import { motion } from "motion/react";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hoverEffect?: boolean;
  depth?: "light" | "medium" | "heavy";
}

export function GlassCard({ children, className = "", glow = false, hoverEffect = false, depth = "medium" }: GlassCardProps) {
  const depthStyles = {
    light: {
      background: "rgba(255, 255, 255, 0.02)",
      border: "0.5px solid rgba(255, 255, 255, 0.06)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
    },
    medium: {
      background: "rgba(255, 255, 255, 0.03)",
      border: "0.5px solid rgba(255, 255, 255, 0.08)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.06), inset 0 -1px 0 rgba(0, 0, 0, 0.2)",
    },
    heavy: {
      background: "rgba(255, 255, 255, 0.04)",
      border: "0.5px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 12px 48px rgba(0, 0, 0, 0.6), inset 0 3px 0 rgba(255, 255, 255, 0.08), inset 0 -2px 0 rgba(0, 0, 0, 0.3)",
    },
  };

  const currentDepth = depthStyles[depth];

  return (
    <motion.div
      className={`rounded-2xl relative ${className}`}
      style={{
        ...currentDepth,
        backdropFilter: "blur(32px)",
        ...(glow && {
          boxShadow: `${currentDepth.boxShadow}, 0 0 32px rgba(255, 106, 0, 0.06)`,
        }),
      }}
      whileHover={
        hoverEffect
          ? {
              y: -1,
              boxShadow: glow
                ? `${currentDepth.boxShadow}, 0 0 40px rgba(255, 106, 0, 0.08)`
                : `0 14px 56px rgba(0, 0, 0, 0.7), inset 0 3px 0 rgba(255, 255, 255, 0.1), inset 0 -2px 0 rgba(0, 0, 0, 0.3)`,
            }
          : undefined
      }
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}