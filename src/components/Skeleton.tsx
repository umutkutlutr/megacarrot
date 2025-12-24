import { motion } from "motion/react";

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export function Skeleton({ width = "100%", height = "20px", className = "" }: SkeletonProps) {
  return (
    <motion.div
      className={`rounded-xl ${className}`}
      style={{
        width,
        height,
        background: "linear-gradient(90deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03))",
        backgroundSize: "200% 100%",
      }}
      animate={{
        backgroundPosition: ["0% 0%", "100% 0%"],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div
      className="rounded-2xl p-8"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(24px)",
        border: "0.5px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div className="flex items-center gap-8">
        {/* Icon skeleton */}
        <Skeleton width="80px" height="80px" />

        {/* Content skeleton */}
        <div className="flex-1 space-y-4">
          <Skeleton width="60%" height="24px" />
          <Skeleton width="80%" height="16px" />
          <Skeleton width="100%" height="8px" />
        </div>

        {/* Button skeleton */}
        <Skeleton width="180px" height="56px" />
      </div>
    </div>
  );
}

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #FF6A00, #FF8C00)",
            boxShadow: "0 0 40px rgba(255, 106, 0, 0.4)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-8 h-8 rounded-lg" style={{ background: "rgba(255, 255, 255, 0.3)" }} />
        </motion.div>

        <motion.p
          className="text-sm tracking-widest opacity-60"
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          LOADING PROTOCOL
        </motion.p>
      </div>
    </div>
  );
}
