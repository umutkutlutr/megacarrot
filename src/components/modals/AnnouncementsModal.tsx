import { motion } from "motion/react";
import { Bell } from "lucide-react";
import { TerminalModal } from "../TerminalModal";

interface AnnouncementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMarkAllRead?: () => void;
}

export function AnnouncementsModal({
  isOpen,
  onClose,
  onMarkAllRead,
}: AnnouncementsModalProps) {
  const announcements = [
    {
      id: 1,
      date: "2025-01-20",
      headline: "NEW FARM TIERS ONLINE",
      summary: "Tier 6-7 unlocked. Upgrade your farm to access premium slots.",
      status: "NEW",
      statusColor: "#33ff99",
    },
    {
      id: 2,
      date: "2025-01-18",
      headline: "VAULT OPTIMIZATION PATCH",
      summary: "Claim speed improved. Gas optimization for all transactions.",
      status: "NEW",
      statusColor: "#33ff99",
    },
    {
      id: 3,
      date: "2025-01-15",
      headline: "AIRDROP SNAPSHOT NOTICE",
      summary: "Snapshot taken on Jan 31. Active farmers receive bonus allocation.",
      status: "ARCHIVED",
      statusColor: "#666666",
    },
  ];

  return (
    <TerminalModal
      isOpen={isOpen}
      onClose={onClose}
      title="SYSTEM ANNOUNCEMENTS"
      subtitle="// PROTOCOL UPDATES & NOTICES"
      accentColor="#00a8cc"
    >
      {/* Terminal Feed */}
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <motion.div
            key={announcement.id}
            className="border-2 p-4"
            style={{
              borderColor:
                announcement.status === "NEW" ? announcement.statusColor : "#2a2a2a",
              backgroundColor:
                announcement.status === "NEW"
                  ? `${announcement.statusColor}05`
                  : "#0f0f0f",
              boxShadow:
                announcement.status === "NEW"
                  ? `2px 2px 0 ${announcement.statusColor}33`
                  : "2px 2px 0 rgba(0, 0, 0, 0.3)",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: announcement.id * 0.05 }}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                className="w-10 h-10 border-2 flex items-center justify-center flex-shrink-0"
                style={{
                  borderColor:
                    announcement.status === "NEW"
                      ? announcement.statusColor
                      : "#2a2a2a",
                  backgroundColor:
                    announcement.status === "NEW"
                      ? `${announcement.statusColor}11`
                      : "#0a0a0a",
                }}
              >
                <Bell
                  size={16}
                  style={{
                    color:
                      announcement.status === "NEW"
                        ? announcement.statusColor
                        : "#555555",
                  }}
                  strokeWidth={2.5}
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {/* Date */}
                  <span
                    className="mono text-xs"
                    style={{
                      color: "#666666",
                      letterSpacing: "0.05em",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {announcement.date}
                  </span>

                  {/* Status Badge */}
                  <div
                    className="border px-2 py-1"
                    style={{
                      borderColor: announcement.statusColor,
                      backgroundColor: `${announcement.statusColor}11`,
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        fontSize: "9px",
                        color: announcement.statusColor,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {announcement.status}
                    </span>
                  </div>
                </div>

                {/* Headline */}
                <div
                  className="pixel text-sm mb-1"
                  style={{
                    color:
                      announcement.status === "NEW" ? "#cccccc" : "#888888",
                    letterSpacing: "0.05em",
                  }}
                >
                  {announcement.headline}
                </div>

                {/* Summary */}
                <div
                  className="mono text-xs"
                  style={{
                    color: "#666666",
                    letterSpacing: "0.05em",
                    lineHeight: 1.6,
                  }}
                >
                  {announcement.summary}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </TerminalModal>
  );
}
