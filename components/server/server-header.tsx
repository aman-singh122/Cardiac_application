"use client";

import { ServerWithMembersWithProfiles } from "@/type";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
     <button
  className="
    w-full
    flex items-center justify-between
    px-4 py-3
    rounded-lg
    bg-[#151c2b]
    hover:bg-[#1c2436]
    transition-all duration-200
    border border-white/5
  "
>
  <span className="text-sm font-semibold tracking-wide text-zinc-200 truncate">
    {server.name}
  </span>
  <ChevronDown className="h-4 w-4 text-zinc-400" />
</button>

      </DropdownMenuTrigger>

      <DropdownMenuContent
className="
  w-56
  bg-[#111827]
  border border-white/5
  text-zinc-200
  shadow-2xl
  rounded-xl
"

      >
        {isModerator && (
          <DropdownMenuItem
            onSelect={() => onOpen("invite", { server })}
            className="cursor-pointer"
          >
            Invite People
            <UserPlus className="h-4 w-4 ml-auto text-muted-foreground" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            onSelect={() => onOpen("editServer", { server })}
            className="cursor-pointer"
          >
            Server Settings
            <Settings className="h-4 w-4 ml-auto text-muted-foreground" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            onSelect={() => onOpen("members", { server })}
            className="cursor-pointer"
          >
            Manage Members
            <Users className="h-4 w-4 ml-auto text-muted-foreground" />
          </DropdownMenuItem>
        )}

        {(isModerator || isAdmin) && (
          <DropdownMenuItem
            onSelect={() => onOpen("createChannel")}
            className="cursor-pointer"
          >
            Create Channel
            <PlusCircle className="h-4 w-4 ml-auto text-muted-foreground" />
          </DropdownMenuItem>
        )}

        {(isModerator || isAdmin) && <DropdownMenuSeparator />}

        {isAdmin && (
          <DropdownMenuItem
            onSelect={() => onOpen("deleteServer", { server })}
            className="text-destructive cursor-pointer"
          >
            Delete Server
            <Trash2 className="h-4 w-4 ml-auto text-destructive" />
          </DropdownMenuItem>
        )}

        {!isAdmin && (
          <DropdownMenuItem
            onSelect={() => onOpen("leaveServer", { server })}
            className="text-destructive cursor-pointer"
          >
            Leave Server
            <LogOut className="h-4 w-4 ml-auto text-destructive" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
