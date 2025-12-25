import { motion } from "motion/react";
import { Copy, CheckCircle2, Power } from "lucide-react";
import { useState } from "react";
import { TerminalModal, ModalSection } from "../TerminalModal";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const [copied, setCopied] = useState(false);

  const accountData = {
    address: "0x742d35Cc6634C0532925a3b844Bc9e3a8f",
    ethBalance: 0.05,
    carrotBalance: 12847,
    megaBalance: 1250,
    network: "MegaETH Testnet",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(accountData.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDisconnect = () => {
    console.log("Disconnect wallet");
    onClose();
  };

  return (
    <TerminalModal
      isOpen={isOpen}
      onClose={onClose}
      title="ACCOUNT TERMINAL"
      subtitle="// WALLET & BALANCE INFO"
      accentColor="#00a8cc"
    >
      {/* Wallet Address */}
      <ModalSection title="WALLET ADDRESS" accentColor="#00a8cc">
        <div className="flex gap-2">
          <div
            className="flex-1 border-2 border-[#2a2a2a] px-4 py-3 overflow-hidden"
            style={{
              backgroundColor: "#0a0a0a",
            }}
          >
            <div
              className="mono text-xs truncate"
              style={{
                color: "#00a8cc",
                letterSpacing: "0.05em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {accountData.address}
            </div>
          </div>
          <motion.button
            className="border-2 border-[#00a8cc] px-6 py-3 flex items-center gap-2"
            style={{
              backgroundColor: copied ? "#00a8cc" : "#0a0a0a",
              boxShadow: "2px 2px 0 rgba(0, 168, 204, 0.3)",
            }}
            onClick={handleCopy}
            whileHover={{
              boxShadow: "3px 3px 0 rgba(0, 168, 204, 0.5)",
              y: -1,
            }}
            whileTap={{ scale: 0.98 }}
          >
            {copied ? (
              <CheckCircle2
                size={14}
                style={{ color: "#0a0a0a" }}
                strokeWidth={2.5}
              />
            ) : (
              <Copy size={14} style={{ color: "#00a8cc" }} strokeWidth={2.5} />
            )}
            <span
              className="pixel text-xs"
              style={{
                color: copied ? "#0a0a0a" : "#00a8cc",
                letterSpacing: "0.08em",
              }}
            >
              {copied ? "COPIED" : "COPY"}
            </span>
          </motion.button>
        </div>
      </ModalSection>

      {/* Balances */}
      <ModalSection title="BALANCES" accentColor="#00a8cc">
        <div className="space-y-3">
          {[
            { label: "ETH BALANCE", value: accountData.ethBalance, suffix: "ETH", color: "#00a8cc" },
            { label: "CARROT BALANCE", value: accountData.carrotBalance, suffix: "CARROT", color: "#33ff99" },
            { label: "MEGA BALANCE", value: accountData.megaBalance, suffix: "MEGA", color: "#ff6a00" },
          ].map((balance, i) => (
            <div
              key={i}
              className="border-2 border-[#2a2a2a] p-4 flex items-center justify-between"
              style={{
                backgroundColor: "#0f0f0f",
                boxShadow: "2px 2px 0 rgba(0, 0, 0, 0.3)",
              }}
            >
              <span
                className="mono text-xs"
                style={{ color: "#888888", letterSpacing: "0.08em" }}
              >
                {balance.label}
              </span>
              <div className="flex items-baseline gap-2">
                <span
                  className="pixel"
                  style={{
                    fontSize: "20px",
                    color: balance.color,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {typeof balance.value === "number" && balance.value < 1
                    ? balance.value.toFixed(4)
                    : balance.value.toLocaleString()}
                </span>
                <span
                  className="mono text-xs"
                  style={{ color: "#666666", letterSpacing: "0.08em" }}
                >
                  {balance.suffix}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ModalSection>

      {/* Network Info */}
      <div
        className="border border-[#2a2a2a] p-4"
        style={{
          backgroundColor: "#0a0a0a",
        }}
      >
        <div
          className="mono text-xs"
          style={{ color: "#888888", letterSpacing: "0.08em" }}
        >
          NETWORK:{" "}
          <span style={{ color: "#00a8cc" }}>{accountData.network}</span>
        </div>
      </div>

      {/* Disconnect Button */}
      <div className="mt-6 pt-6 border-t-2 border-[#1a1a1a]">
        <motion.button
          className="border-2 border-[#ff0066] px-8 py-3 w-full relative overflow-hidden"
          style={{
            backgroundColor: "#0a0a0a",
            boxShadow: "3px 3px 0 rgba(255, 0, 102, 0.3)",
          }}
          onClick={handleDisconnect}
          whileHover={{
            boxShadow: "4px 4px 0 rgba(255, 0, 102, 0.5)",
            y: -1,
          }}
          whileTap={{
            y: 0,
            scale: 0.98,
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: "#ff0066" }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.1 }}
          />
          <div className="flex items-center justify-center gap-2 relative z-10">
            <Power size={14} style={{ color: "#ff0066" }} strokeWidth={2.5} />
            <span
              className="pixel text-xs"
              style={{
                color: "#ff0066",
                letterSpacing: "0.08em",
              }}
            >
              DISCONNECT WALLET
            </span>
          </div>
        </motion.button>
      </div>
    </TerminalModal>
  );
}
