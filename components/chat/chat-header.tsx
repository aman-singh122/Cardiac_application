import { Hash } from "lucide-react";
import { MobbileToggle } from "@/components/mobile-toggle";
import { UserAvatar } from "@/components/user-avatar";
import { SocketIndicatior } from "@/components/socket-indicator";
import { ChatVideoButton } from "./chat-video-button";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

export const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl,
}: ChatHeaderProps) => {
  return (
    <div
    className="
  flex items-center
  h-16
  px-8
  bg-card
  border-b border-border
"
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <MobbileToggle serverId={serverId} />

        {type === "channel" && <Hash className="w-5 h-5 text-zinc-400" />}

        {type === "conversation" && (
          <UserAvatar src={imageUrl} className="h-9 w-9 rounded-full" />
        )}

        <p className="font-semibold text-lg tracking-tight text-foreground">

          {name}
        </p>
      </div>

      {/* RIGHT */}
      <div className="ml-auto flex items-center gap-4">
        {type === "conversation" && <ChatVideoButton />}
        <SocketIndicatior />
      </div>
    </div>
  );
};
