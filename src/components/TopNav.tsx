import { motion } from "motion/react";
import { Sprout } from "lucide-react";

interface TopNavProps {
  activeTab?: string;
}

export function TopNav({ activeTab = "overview" }: TopNavProps) {
  const tabs = [
    { id: "overview", label: "OVERVIEW" },
    { id: "farms", label: "FARMS" },
    { id: "operatives", label: "OPERATIVES" },
    { id: "upgrades", label: "UPGRADES" },
    { id: "vault", label: "VAULT" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(11, 14, 18, 0.85)",
        backdropFilter: "blur(40px)",
        borderBottom: "0.5px solid rgba(255, 255, 255, 0.05)",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid-container">
        <div className="col-span-12 flex items-center justify-between py-5">
          {/* Logo - minimal */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #FF6A00, #FF8C00)",
                boxShadow: "0 0 16px rgba(255, 106, 0, 0.15)",
              }}
            >
              <Sprout size={18} style={{ color: "#0B0E12" }} strokeWidth={2} />
            </div>
            <span className="tracking-wider opacity-70 text-xs">CARROT PROTOCOL</span>
          </div>

          {/* Nav tabs - restrained */}
          <div className="flex items-center gap-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className="relative py-2"
                style={{
                  color: activeTab === tab.id ? "#FF6A00" : "rgba(255, 255, 255, 0.35)",
                  transition: "color 0.25s ease",
                }}
              >
                <span className="text-xs tracking-widest">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{
                      background: "#FF6A00",
                      boxShadow: "0 0 6px rgba(255, 106, 0, 0.4)",
                    }}
                    layoutId="activeTab"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Balance indicator - minimal */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#3CFF8F", opacity: 0.8 }} />
            <span className="text-xs mono opacity-50">156,420</span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
