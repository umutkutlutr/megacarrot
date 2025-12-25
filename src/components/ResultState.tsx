import { motion } from "motion/react";
import { Check, X } from "lucide-react";

interface ResultStateProps {
  type: "success" | "error";
  onRetry?: () => void;
  onClose?: () => void;
}

export function ResultState({ type, onRetry, onClose }: ResultStateProps) {
  const isSuccess = type === "success";

  return (
    <motion.div
      className="flex flex-col items-center py-12"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Status Icon */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          duration: 0.4, 
          delay: 0.1,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
      >
        {/* Glow rings */}
        {isSuccess && (
          <>
            {[80, 64, 48].map((size, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: "translate(-50%, -50%)",
                  border: "2px solid #2ed573",
                  opacity: 0.2 - i * 0.05,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2 - i * 0.05, 0.1 - i * 0.05, 0.2 - i * 0.05],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </>
        )}

        {/* Main icon box */}
        <motion.div
          className="w-16 h-16 border-3 flex items-center justify-center relative z-10"
          style={{
            borderColor: isSuccess ? "#2ed573" : "#ff3366",
            backgroundColor: isSuccess ? "#2ed573" : "#ff3366",
            boxShadow: isSuccess
              ? "4px 4px 0 rgba(46, 213, 115, 0.3)"
              : "4px 4px 0 rgba(255, 51, 102, 0.3)",
          }}
          animate={
            isSuccess
              ? {
                  boxShadow: [
                    "4px 4px 0 rgba(46, 213, 115, 0.3), 0 0 0 rgba(46, 213, 115, 0)",
                    "4px 4px 0 rgba(46, 213, 115, 0.3), 0 0 24px rgba(46, 213, 115, 0.6)",
                    "4px 4px 0 rgba(46, 213, 115, 0.3), 0 0 0 rgba(46, 213, 115, 0)",
                  ],
                }
              : {
                  x: [-2, 2, -2, 2, 0],
                }
          }
          transition={
            isSuccess
              ? { duration: 2, repeat: Infinity }
              : { duration: 0.4, delay: 0.2 }
          }
        >
          {isSuccess ? (
            <Check size={32} style={{ color: "#0a0a0a" }} strokeWidth={4} />
          ) : (
            <X size={32} style={{ color: "#0a0a0a" }} strokeWidth={4} />
          )}
        </motion.div>

        {/* Corner accents */}
        {[
          { top: -3, left: -3 },
          { top: -3, right: -3 },
          { bottom: -3, left: -3 },
          { bottom: -3, right: -3 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3"
            style={{
              backgroundColor: isSuccess ? "#2ed573" : "#ff3366",
              ...pos,
            }}
            animate={{
              opacity: [1, 0.4, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Status Text */}
      <motion.div
        className="pixel text-center mb-3"
        style={{
          fontSize: "28px",
          color: isSuccess ? "#2ed573" : "#ff3366",
          letterSpacing: "0.05em",
          textShadow: isSuccess
            ? "3px 3px 0 rgba(0, 0, 0, 0.4)"
            : "3px 3px 0 rgba(0, 0, 0, 0.4)",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {isSuccess ? "ACCESS GRANTED" : "TX FAILED"}
      </motion.div>

      {/* Description */}
      <motion.div
        className="mono text-xs text-center mb-10"
        style={{
          color: "#888888",
          letterSpacing: "0.12em",
          maxWidth: "320px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        {isSuccess
          ? "Protocol initialization complete. Farm access unlocked."
          : "Transaction rejected or failed. Please try again."}
      </motion.div>

      {/* Success Glow Sweep Effect */}
      {isSuccess && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute top-0 bottom-0 w-32"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(46, 213, 115, 0.2), transparent)",
              filter: "blur(8px)",
            }}
            animate={{
              left: ["-20%", "120%"],
            }}
            transition={{
              duration: 1.5,
              delay: 0.5,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}

      {/* Action Buttons */}
      {!isSuccess && onRetry && (
        <motion.button
          className="border-3 border-[#ff6a00] px-10 py-4 relative overflow-hidden"
          style={{
            backgroundColor: "#0a0a0a",
            boxShadow: "4px 4px 0 rgba(255, 106, 0, 0.4)",
          }}
          onClick={onRetry}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          whileHover={{
            y: -2,
            boxShadow: "6px 6px 0 rgba(255, 106, 0, 0.5)",
          }}
          whileTap={{
            y: 0,
            boxShadow: "2px 2px 0 rgba(255, 106, 0, 0.5)",
          }}
        >
          <motion.span
            className="pixel"
            style={{
              fontSize: "16px",
              color: "#ff6a00",
              letterSpacing: "0.08em",
            }}
            whileHover={{
              color: "#ff8833",
              textShadow: [
                "0 0 8px rgba(255, 106, 0, 0.4)",
                "0 0 16px rgba(255, 106, 0, 0.6)",
                "0 0 8px rgba(255, 106, 0, 0.4)",
              ],
            }}
            transition={{
              textShadow: {
                duration: 1.5,
                repeat: Infinity,
              },
            }}
          >
            RETRY PAYMENT
          </motion.span>
        </motion.button>
      )}
    </motion.div>
  );
}
