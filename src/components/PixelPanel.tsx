import { motion } from "motion/react";

interface PixelPanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "dark" | "accent";
  border?: boolean;
  shadow?: boolean;
  onClick?: () => void;
}

export function PixelPanel({
  children,
  className = "",
  variant = "default",
  border = true,
  shadow = true,
  onClick,
}: PixelPanelProps) {
  const variants = {
    default: "bg-[#1a1a1a]",
    dark: "bg-[#141414]",
    accent: "bg-[#1a1a1a]",
  };

  const borderColors = {
    default: "border-[#333333]",
    dark: "border-[#222222]",
    accent: "border-[#ff6600]",
  };

  return (
    <motion.div
      className={`
        ${variants[variant]}
        ${border ? `border-2 ${borderColors[variant]}` : ""}
        ${shadow ? "pixel-shadow" : ""}
        ${className}
      `}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
