import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  height?: number;
  animated?: boolean;
  showDot?: boolean;
  delay?: number;
}

export function ProgressBar({
  progress,
  color = "#FF6A00",
  height = 8,
  animated = true,
  showDot = true,
  delay = 0,
}: ProgressBarProps) {
  const [currentProgress, setCurrentProgress] = useState(animated ? 0 : progress);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setCurrentProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [progress, animated]);

  const displayProgress = animated ? currentProgress : progress;

  return (
    <div className="relative w-full">
      <div
        className="rounded-full overflow-hidden"
        style={{
          height: `${height}px`,
          background: "rgba(255, 255, 255, 0.05)",
        }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            boxShadow: `0 0 10px ${color}60`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${displayProgress}%` }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {showDot && (
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: `${height + 4}px`,
            height: `${height + 4}px`,
            background: color,
            boxShadow: `0 0 10px ${color}`,
            left: `${displayProgress}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ left: 0 }}
          animate={{ left: `${displayProgress}%` }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </div>
  );
}
