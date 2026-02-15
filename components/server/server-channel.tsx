"use client";

import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "../action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

export const ServerChannel = ({
  channel,
  server,
  role,
}: ServerChannelProps) => {
  const params = useParams();
  const router = useRouter();
  const { onOpen } = useModal();

  const Icon = iconMap[channel.type];
  const isActive = params?.channelId === channel.id;

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { channel, server });
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200 text-left",
        "hover:bg-muted",
        isActive && "bg-accent"
      )}
    >
      {/* Icon */}
      <Icon
        className={cn(
          "w-4 h-4 shrink-0 transition-colors",
          "text-muted-foreground group-hover:text-foreground",
          isActive && "text-foreground"
        )}
      />

      {/* Name */}
      <span
        className={cn(
          "text-sm font-medium truncate transition-colors",
          "text-muted-foreground group-hover:text-foreground",
          isActive && "text-foreground"
        )}
      >
        {channel.name}
      </span>

      {/* Actions */}
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ActionTooltip label="Edit">
            <Edit
              className="w-4 h-4 text-muted-foreground hover:text-foreground transition cursor-pointer"
              onClick={(e) => onAction(e, "editChannel")}
            />
          </ActionTooltip>

          <ActionTooltip label="Delete">
            <Trash
              className="w-4 h-4 text-muted-foreground hover:text-destructive transition cursor-pointer"
              onClick={(e) => onAction(e, "deleteChannel")}
            />
          </ActionTooltip>
        </div>
      )}

      {/* Lock */}
      {channel.name === "general" && (
        <Lock className="ml-auto w-4 h-4 text-muted-foreground" />
      )}
    </button>
  );
};
