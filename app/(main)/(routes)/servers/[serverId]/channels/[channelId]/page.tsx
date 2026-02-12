import { redirect } from "next/navigation";
import { ChannelType } from "@prisma/client";
import { Gamepad2, Activity } from "lucide-react";
import { AIAssistant } from "@/components/right-panel/ai-assistant";

import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface ChannelIdPageProps {
  params: Promise<{
    serverId: string;
    channelId: string;
  }>;
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const { serverId, channelId } = await params;

  if (!serverId || !channelId) redirect("/");

  const profile = await currentProfile();
  if (!profile) redirect("/sign-in");

  const channel = await db.channel.findUnique({
    where: { id: channelId },
  });

  if (!channel) redirect("/");

  const member = await db.member.findFirst({
    where: {
      serverId,
      profileId: profile.id,
    },
  });

  if (!member) redirect("/");

  return (
    <div className="flex h-full">

      {/* ================= MAIN CHAT AREA ================= */}
      <div className="flex flex-col flex-1 min-w-0 bg-gradient-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black">

        <ChatHeader
          name={channel.name}
          serverId={channel.serverId}
          type="channel"
        />

        {channel.type === ChannelType.TEXT && (
          <>
            <ChatMessages
              member={member}
              name={channel.name}
              chatId={channel.id}
              type="channel"
              apiUrl="/api/messages"
              socketUrl="/api/socket/messages"
              socketQuery={{
                channelId: channel.id,
                serverId: channel.serverId,
              }}
              paramKey="channelId"
              paramValue={channel.id}
            />

            <ChatInput
              name={channel.name}
              type="channel"
              apiUrl="/api/socket/messages"
              query={{
                channelId: channel.id,
                serverId: channel.serverId,
              }}
            />
          </>
        )}

        {channel.type === ChannelType.AUDIO && (
          <MediaRoom chatId={channel.id} video={false} audio={true} />
        )}

        {channel.type === ChannelType.VIDEO && (
          <MediaRoom chatId={channel.id} video={true} audio={true} />
        )}
      </div>

      {/* ================= RIGHT SIDE PANEL ================= */}
      <div className="hidden xl:flex w-[320px] border-l border-white/10 bg-zinc-950/70 backdrop-blur-xl">

        <div className="flex flex-col w-full h-full p-4 gap-4">

          {/* -------- AI ASSISTANT -------- */}
          <div className="flex-1 rounded-xl border border-white/10 bg-zinc-900/60 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">

            <div className="p-4 border-b border-white/5">
              <h2 className="text-sm font-semibold text-white">
                AI Assistant
              </h2>
            </div>

            <div className="p-4 h-[350px] overflow-hidden">
              <AIAssistant />
            </div>

          </div>

          {/* -------- GAMES -------- */}
          <div className="flex-1 rounded-xl border border-white/10 bg-zinc-900/60 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">

            <div className="flex items-center gap-3 p-4 border-b border-white/5">
              <Gamepad2 className="w-5 h-5 text-purple-400" />
              <h2 className="text-sm font-semibold text-white">
                Games
              </h2>
            </div>

            <div className="p-4 text-sm text-zinc-400">
              Multiplayer mini games coming soon...
            </div>

          </div>

          {/* -------- ACTIVITY -------- */}
          <div className="h-[130px] rounded-xl border border-white/10 bg-zinc-900/60 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">

            <div className="flex items-center gap-3 p-4 border-b border-white/5">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h2 className="text-sm font-semibold text-white">
                Activity
              </h2>
            </div>

            <div className="p-4 text-xs text-zinc-400">
              Live user activity & analytics
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default ChannelIdPage;
