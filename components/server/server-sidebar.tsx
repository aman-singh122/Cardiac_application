import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerSearch } from "./server-search";
import { ServerHeader } from "./server-header";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

interface ServerSidebarProps {
    serverId: string;
}
const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />
};

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
};

export const ServerSidebar = async ({
    serverId
}: ServerSidebarProps) => {
    const profile = await currentProfile();

    if (!profile) {
        redirect("/sign-in");
    }


    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc"
                }
            },

            members: {
                include: {
                    profile: true
                },
                orderBy: {
                    role: "asc"
                }
            }
        }
    });

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)
    const members = server?.members.filter((member) => member.profileId !== profile.id)

    if (!server) {
        return redirect("/");
    }

    const role = server.members.find((member) => member.profileId === profile.id)?.role;

return (
  <div className="
    flex flex-col h-full w-full
    bg-[#0f141f]
    border-r border-white/5
    shadow-[4px_0_30px_rgba(0,0,0,0.5)]
  ">
    <div className="px-4 py-4 border-b border-white/5 bg-[#111827]">
      <ServerHeader server={server} role={role} />
    </div>

    <ScrollArea className="flex-1 px-3 py-4">

      {/* Search */}
      <div className="mb-5">
        <ServerSearch
          data={[
            {
              label: "Text Channels",
              type: "channel",
              data: textChannels?.map((channel) => ({
                id: channel.id,
                name: channel.name,
                icon: iconMap[channel.type],
              }))
            },
            {
              label: "Voice Channels",
              type: "channel",
              data: audioChannels?.map((channel) => ({
                id: channel.id,
                name: channel.name,
                icon: iconMap[channel.type],
              }))
            },
            {
              label: "Video Channels",
              type: "channel",
              data: videoChannels?.map((channel) => ({
                id: channel.id,
                name: channel.name,
                icon: iconMap[channel.type],
              }))
            },
            {
              label: "Members",
              type: "member",
              data: members?.map((member) => ({
                id: member.id,
                name: member.profile.name,
                icon: roleIconMap[member.role],
              }))
            }
          ]}
        />
      </div>

      <Separator className="my-4" />

      {/* TEXT CHANNELS */}
      {!!textChannels?.length && (
        <div className="mb-6">
          <ServerSection
            sectionType="channels"
            channelType={ChannelType.TEXT}
            role={role}
            label="TEXT CHANNELS"
            server={server}
          />
          <div className="mt-2 space-y-1">
            {textChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        </div>
      )}

      {/* VOICE CHANNELS */}
      {!!audioChannels?.length && (
        <div className="mb-6">
          <ServerSection
            sectionType="channels"
            channelType={ChannelType.AUDIO}
            role={role}
            label="VOICE CHANNELS"
            server={server}
          />
          <div className="mt-2 space-y-1">
            {audioChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        </div>
      )}

      {/* VIDEO CHANNELS */}
      {!!videoChannels?.length && (
        <div className="mb-6">
          <ServerSection
            sectionType="channels"
            channelType={ChannelType.VIDEO}
            role={role}
            label="VIDEO CHANNELS"
            server={server}
          />
          <div className="mt-2 space-y-1">
            {videoChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        </div>
      )}

      {/* MEMBERS */}
      {!!members?.length && (
        <div className="mb-6">
          <ServerSection
            sectionType="members"
            role={role}
            label="MEMBERS"
            server={server}
          />
          <div className="mt-2 space-y-1">
            {members.map((member) => (
              <ServerMember
                key={member.id}
                member={member}
                server={server}
              />
            ))}
          </div>
        </div>
      )}

    </ScrollArea>
  </div>
);



};