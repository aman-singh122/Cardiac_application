"use client";

import { useState } from "react";
import {
  Gamepad2,
  Activity,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AIAssistant } from "@/components/right-panel/ai-assistant";

export const RightPanel = () => {
  const [open, setOpen] = useState<string | null>("ai");

  const toggle = (section: string) => {
    setOpen(open === section ? null : section);
  };

  return (
    <div className="flex flex-col w-full h-full p-4 gap-4">

      {/* ---------- AI ASSISTANT ---------- */}
      <PanelCard
        title="AI Assistant"
        isOpen={open === "ai"}
        onClick={() => toggle("ai")}
        large
      >
        <div className="h-[350px] overflow-hidden">
          <AIAssistant />
        </div>
      </PanelCard>

      {/* ---------- GAMES ---------- */}
      <PanelCard
        title="Games"
        icon={<Gamepad2 className="w-5 h-5" />}
        isOpen={open === "games"}
        onClick={() => toggle("games")}
        large
      >
        <div className="text-sm text-zinc-400">
          Multiplayer games section
        </div>
      </PanelCard>

      {/* ---------- ACTIVITY ---------- */}
      <PanelCard
        title="Activity"
        icon={<Activity className="w-5 h-5" />}
        isOpen={open === "activity"}
        onClick={() => toggle("activity")}
      >
        <div className="text-xs text-zinc-400">
          Live user activity
        </div>
      </PanelCard>
    </div>
  );
};

/* ---------- REUSABLE PANEL CARD ---------- */

interface PanelCardProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  large?: boolean;
}

const PanelCard = ({
  title,
  icon,
  children,
  isOpen,
  onClick,
  large,
}: PanelCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-zinc-900/60 backdrop-blur-md transition-all duration-300",
        "hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10",
        large ? "flex-1" : "h-[120px]"
      )}
    >
      <div
        onClick={onClick}
        className="flex items-center justify-between p-4 cursor-pointer"
      >
        <div className="flex items-center gap-3 text-white">
          {icon}
          <span className="font-medium text-sm">{title}</span>
        </div>

        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-zinc-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        )}
      </div>

      {isOpen && (
        <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </div>
  );
};
