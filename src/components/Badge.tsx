import { motion } from "motion/react";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  variant?: "default" | "glow";
}

export function Badge({ children, color = "#FF6A00", variant = "default" }: BadgeProps) {
  return (
    <motion.span
      className="inline-block px-3 py-1 rounded-full text-xs tracking-wider"
      style={{
        background: `${color}15`,
        color: color,
        border: `0.5px solid ${color}30`,
      }}
      animate={
        variant === "glow"
          ? {
              boxShadow: [
                `0 0 10px ${color}20`,
                `0 0 20px ${color}40`,
                `0 0 10px ${color}20`,
              ],
            }
          : undefined
      }
      transition={variant === "glow" ? { duration: 2, repeat: Infinity } : undefined}
    >
      {children}
    </motion.span>
  );
}
