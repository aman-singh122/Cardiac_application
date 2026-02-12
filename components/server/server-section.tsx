"use client";

import { ServerWithMembersWithProfiles } from "@/type";
import { ChannelType, MemberRole } from "@prisma/client";
import { ActionTooltip } from "@/components/action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}

export const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between px-2 py-2 group">
      {/* Section Label */}
      <p
        className="
  p-1.5
  rounded-md
  text-zinc-500
  hover:text-white
  hover:bg-[#1c2436]
  transition
"
      >
        {label}
      </p>

      {/* Create Channel */}
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            onClick={() => onOpen("createChannel", { channelType })}
            className="
              p-1.5
              rounded-md
              text-muted-foreground
              hover:text-foreground
              hover:bg-accent
              transition
              cursor-pointer
            "
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}

      {/* Manage Members */}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Manage Members" side="top">
          <button
            onClick={() => onOpen("members", { server })}
            className="
              p-1.5
              rounded-md
              text-muted-foreground
              hover:text-foreground
              hover:bg-accent
              transition
              cursor-pointer
            "
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};
