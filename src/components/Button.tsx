import { motion } from "motion/react";
import { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "success" | "disabled";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  children,
  variant = "primary",
  color = "#FF6A00",
  onClick,
  disabled = false,
  fullWidth = false,
  size = "md",
  className = "",
}: ButtonProps) {
  const variantStyles =
    variant === "primary"
      ? {
          background: color,
          color: "#0B0E12",
          border: "none",
          boxShadow: `0 0 20px ${color}20`,
        }
      : {
          background: `${color}08`,
          color: color,
          border: `0.5px solid ${color}25`,
          boxShadow: "none",
        };

  return (
    <motion.button
      className={`rounded-xl tracking-wider ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      style={{
        ...variantStyles,
      }}
      onClick={onClick}
      disabled={disabled}
      whileHover={
        !disabled
          ? {
              scale: 1.005,
              boxShadow: variant === "secondary" ? `0 0 12px ${color}15` : `0 0 24px ${color}25`,
            }
          : undefined
      }
      whileTap={!disabled ? { scale: 0.99 } : undefined}
      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.button>
  );
}