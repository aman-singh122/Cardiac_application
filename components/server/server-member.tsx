"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { UserAvatar } from "@/components/user-avatar";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 text-indigo-400 ml-auto" />
  ),
  [MemberRole.ADMIN]: (
    <ShieldAlert className="h-4 w-4 text-rose-400 ml-auto" />
  ),
};

export const ServerMember = ({ member }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const isActive = params?.memberId === member.id;
  const icon = roleIconMap[member.role];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200",
        "hover:bg-[#1a2233]",
        isActive && "bg-[#1f2937]"
      )}
    >
      <UserAvatar
        src={member.profile.imageUrl}
        className="h-9 w-9 shrink-0"
      />

      <span
        className={cn(
          "text-sm font-medium truncate transition-colors",
          "text-zinc-400 group-hover:text-zinc-200",
          isActive && "text-white"
        )}
      >
        {member.profile.name}
      </span>

      {icon}
    </button>
  );
};
