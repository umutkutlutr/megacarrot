import { motion, AnimatePresence } from "motion/react";
import { GlassCard } from "./GlassCard";
import { Button } from "./Button";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, children, maxWidth = "600px" }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(11, 14, 18, 0.85)",
              backdropFilter: "blur(20px)",
            }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full"
            style={{ maxWidth }}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <GlassCard>
              {/* Close button */}
              <motion.button
                className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center z-10"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "0.5px solid rgba(255, 255, 255, 0.1)",
                }}
                whileHover={{
                  background: "rgba(255, 255, 255, 0.1)",
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                <X size={20} style={{ color: "rgba(255, 255, 255, 0.6)" }} />
              </motion.button>

              {/* Content */}
              {children}
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmerName: string;
  currentLevel: number;
  currentBoost: number;
  newLevel: number;
  newBoost: number;
  cost: number;
  color: string;
  onConfirm: () => void;
}

export function UpgradeModal({
  isOpen,
  onClose,
  farmerName,
  currentLevel,
  currentBoost,
  newLevel,
  newBoost,
  cost,
  color,
  onConfirm,
}: UpgradeModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="680px">
      <div className="p-14">
        <h2 className="mb-2 text-center" style={{ fontSize: "1.5rem", fontWeight: 300, letterSpacing: "-0.01em" }}>
          UPGRADE OPERATIVE
        </h2>
        <div className="h-px w-24 mx-auto mb-12" style={{ background: "rgba(255, 255, 255, 0.1)" }} />

        {/* Farmer name */}
        <div className="text-center mb-14">
          <h3 style={{ color, fontSize: "1.125rem", fontWeight: 400, opacity: 0.9 }}>{farmerName}</h3>
        </div>

        {/* Before/After comparison */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <h4 className="mb-7 text-center opacity-30 text-xs tracking-widest">CURRENT</h4>
            <div className="space-y-5">
              <StatRow label="LEVEL" value={currentLevel.toString()} />
              <StatRow label="BOOST" value={`+${currentBoost}%`} />
              <StatRow label="PRODUCTION" value="+15%" />
              <StatRow label="EFFICIENCY" value="+20%" />
            </div>
          </div>

          <div>
            <h4 className="mb-7 text-center text-xs tracking-widest" style={{ color, opacity: 0.7 }}>
              UPGRADED
            </h4>
            <div className="space-y-5">
              <StatRow label="LEVEL" value={newLevel.toString()} color={color} />
              <StatRow label="BOOST" value={`+${newBoost}%`} color={color} />
              <StatRow label="PRODUCTION" value="+35%" color={color} />
              <StatRow label="EFFICIENCY" value="+42%" color={color} />
            </div>
          </div>
        </div>

        {/* Cost */}
        <div
          className="p-6 rounded-xl mb-9 flex items-center justify-between"
          style={{ background: "rgba(255, 255, 255, 0.015)", border: "0.5px solid rgba(255, 255, 255, 0.04)" }}
        >
          <span className="text-xs opacity-30 tracking-wider">UPGRADE COST</span>
          <span className="text-3xl mono" style={{ color: "#3CFF8F", fontWeight: 200 }}>
            {cost.toLocaleString()} <span className="text-sm opacity-30">CARROT</span>
          </span>
        </div>

        {/* Confirm button */}
        <Button variant="secondary" color={color} onClick={onConfirm} fullWidth size="lg">
          <span className="tracking-widest">CONFIRM UPGRADE</span>
        </Button>
      </div>
    </Modal>
  );
}

function StatRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.025)" }}>
      <span className="text-xs opacity-25 tracking-wider">{label}</span>
      <span className="mono text-xl" style={{ color: color || "rgba(255, 255, 255, 0.5)", fontWeight: 200 }}>
        {value}
      </span>
    </div>
  );
}