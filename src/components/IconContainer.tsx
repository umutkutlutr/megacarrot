import { motion } from "motion/react";

interface IconContainerProps {
  children: React.ReactNode;
  color?: string;
  size?: number;
  animated?: boolean;
}

export function IconContainer({
  children,
  color = "#FF6A00",
  size = 80,
  animated = false,
}: IconContainerProps) {
  return (
    <div
      className="rounded-2xl flex items-center justify-center"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `${color}15`,
        border: `1px solid ${color}40`,
      }}
    >
      {children}
    </div>
  );
}