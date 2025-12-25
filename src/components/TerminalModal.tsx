import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  accentColor?: string;
  children: ReactNode;
  footerCTA?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
}

export function TerminalModal({
  isOpen,
  onClose,
  title,
  subtitle,
  accentColor = "#ff6a00",
  children,
  footerCTA,
}: TerminalModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(4px)",
              backgroundImage: `
                radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.4) 100%),
                url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")
              `,
            }}
          />

          {/* MODAL */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-8 pointer-events-none">
            <motion.div
              className="pointer-events-auto relative"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: "100%",
                maxWidth: "800px",
                maxHeight: "85vh",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Double Border Container */}
              <div
                className="border-3 border-[#1a1a1a] relative"
                style={{
                  backgroundColor: "#0a0a0a",
                  boxShadow: "8px 8px 0 rgba(0, 0, 0, 0.6)",
                }}
              >
                {/* Inner neon border */}
                <div
                  className="absolute inset-0 border-2 pointer-events-none"
                  style={{
                    borderColor: accentColor,
                    opacity: 0.3,
                    margin: "4px",
                  }}
                />

                {/* Top-right close X */}
                <motion.button
                  className="absolute top-4 right-4 w-8 h-8 border-2 border-[#555555] flex items-center justify-center z-20"
                  style={{
                    backgroundColor: "#0a0a0a",
                    boxShadow: "2px 2px 0 rgba(0, 0, 0, 0.4)",
                  }}
                  onClick={onClose}
                  whileHover={{
                    borderColor: accentColor,
                    boxShadow: "3px 3px 0 rgba(0, 0, 0, 0.6)",
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                >
                  <X size={14} style={{ color: "#888888" }} strokeWidth={2.5} />
                </motion.button>

                {/* Content Container */}
                <div
                  className="relative"
                  style={{
                    padding: "32px",
                    maxHeight: "calc(85vh - 16px)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* HEADER */}
                  <div className="mb-6">
                    {/* Accent line */}
                    <div
                      className="h-px mb-4"
                      style={{
                        backgroundColor: accentColor,
                        opacity: 0.4,
                        boxShadow: `0 0 8px ${accentColor}`,
                      }}
                    />

                    {/* Title */}
                    <div
                      className="pixel mb-2"
                      style={{
                        fontSize: "24px",
                        color: accentColor,
                        letterSpacing: "0.05em",
                        textShadow: `0 0 12px ${accentColor}66`,
                      }}
                    >
                      {title}
                    </div>

                    {/* Subtitle */}
                    <div
                      className="mono text-xs"
                      style={{
                        color: "#666666",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {subtitle}
                    </div>
                  </div>

                  {/* BODY - Scrollable */}
                  <div
                    className="flex-1 overflow-y-auto pr-2"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: `${accentColor}44 #1a1a1a`,
                    }}
                  >
                    {children}
                  </div>

                  {/* FOOTER */}
                  <div className="mt-6 pt-6 border-t-2 border-[#1a1a1a] flex items-center justify-center gap-4">
                    {/* Primary CTA (optional) */}
                    {footerCTA && (
                      <motion.button
                        className="border-2 px-8 py-3 relative overflow-hidden"
                        style={{
                          borderColor: accentColor,
                          backgroundColor: "#0a0a0a",
                          boxShadow: `3px 3px 0 ${accentColor}44`,
                        }}
                        onClick={footerCTA.onClick}
                        disabled={footerCTA.disabled}
                        whileHover={
                          !footerCTA.disabled
                            ? {
                                boxShadow: `4px 4px 0 ${accentColor}88`,
                                y: -1,
                              }
                            : {}
                        }
                        whileTap={
                          !footerCTA.disabled
                            ? {
                                y: 0,
                                scale: 0.98,
                              }
                            : {}
                        }
                      >
                        <motion.div
                          className="absolute inset-0"
                          style={{ backgroundColor: accentColor }}
                          initial={{ opacity: 0 }}
                          whileHover={!footerCTA.disabled ? { opacity: 0.1 } : {}}
                        />
                        <span
                          className="pixel text-xs relative z-10"
                          style={{
                            color: footerCTA.disabled ? "#444444" : accentColor,
                            letterSpacing: "0.08em",
                          }}
                        >
                          {footerCTA.label}
                        </span>
                      </motion.button>
                    )}

                    {/* Close Terminal button */}
                    <motion.button
                      className="border-2 border-[#555555] px-10 py-3 relative"
                      style={{
                        backgroundColor: "#0a0a0a",
                        boxShadow: "3px 3px 0 rgba(85, 85, 85, 0.3)",
                      }}
                      onClick={onClose}
                      whileHover={{
                        borderColor: "#888888",
                        boxShadow: "4px 4px 0 rgba(85, 85, 85, 0.5)",
                        y: -1,
                      }}
                      whileTap={{
                        y: 0,
                        scale: 0.98,
                      }}
                    >
                      <span
                        className="pixel text-xs"
                        style={{
                          color: "#888888",
                          letterSpacing: "0.08em",
                        }}
                      >
                        CLOSE TERMINAL
                      </span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// Section separator component for modal content
export function ModalSection({
  title,
  children,
  accentColor = "#ff6a00",
}: {
  title?: string;
  children: ReactNode;
  accentColor?: string;
}) {
  return (
    <div className="mb-6">
      {title && (
        <>
          <div
            className="mono text-xs mb-3"
            style={{
              color: "#888888",
              letterSpacing: "0.1em",
            }}
          >
            {title}
          </div>
          <div
            className="h-px mb-4"
            style={{
              backgroundColor: accentColor,
              opacity: 0.15,
            }}
          />
        </>
      )}
      <div style={{ color: "#cccccc" }}>{children}</div>
    </div>
  );
}
