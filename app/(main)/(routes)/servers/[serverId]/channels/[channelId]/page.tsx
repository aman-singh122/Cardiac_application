import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
  params: Promise<{
    serverId: string;
    channelId: string;
  }>;
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const { serverId, channelId } = await params;

  // current user
  const profile = await currentProfile();
  if (!profile) {
    redirect("/sign-in");
  }

  // fetch channel
  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  // check membership
  const member = await db.member.findFirst({
    where: {
      serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#313338]">
      <ChatHeader 
      name={channel.name}
      serverId={channel.serverId}
      type="channel" />
      <div className="flex-1">Future Messages</div>
      <ChatInput
      name={channel.name}
      type="channel"
      apiUrl="/api/socket/messages"
      query={{
        channelId:channel.id,
        serverId: channel.serverId
      }}/>
    </div>
  );
};

export default ChannelIdPage;
