"use client";

import qs from "query-string"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu";

import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/type";
// import { DialogDescription } from "@radix-ui/react-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/user-avatar";
import {
  Check,
  MoreVertical,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  Gavel,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { MemberRole } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

const roleIconMap = {
  GUEST: <Shield className="h-4 w-4 text-gray-500" />,
  MODERATOR: <ShieldCheck className="h-4 w-4 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />
};

export const MembersModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string>("");

  const isModalOpen = isOpen && type === "members";
  const { server } = data as { server: ServerWithMembersWithProfiles };


  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.patch(url, { role });

      router.refresh();
      onOpen("members", { server: response.data })
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId("");
    }
  };


  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.delete(url);
      router.refresh();
      onOpen("members", { server: response.data });

    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId("");
    }
  };

  // const filteredMembers = server?.members?.filter((member) =>
  //   member.profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   member.profile.email.toLowerCase().includes(searchQuery.toLowerCase())
  // ) || [];

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-5 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-x-3 mb-6"
            >
              <UserAvatar src={member.profile.imageUrl} />

              {/* Name + Role LEFT */}
              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex items-center gap-x-2">
                  {member.profile.name}

                  {/* Role badge */}
                  <span className="flex items-center rounded-md bg-zinc-100 px-2 py-0.5 text-xs">
                    {roleIconMap[member.role]}
                    <span className="ml-1 capitalize">
                      {member.role.toLowerCase()}
                    </span>
                  </span>
                </div>

                <p className="text-xs text-zinc-500">
                  {member.profile.email}
                </p>
              </div>

              {/* Right side dots */}
              {server.profileId !== member.profileId && loadingId !== member.id && (
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button>
                        <MoreVertical className="h-4 w-4 text-zinc-500" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="left">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex items-center">
                          <ShieldQuestion className="w-4 h-4 mr-2" />
                          <span>Role</span>
                        </DropdownMenuSubTrigger>

                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => onRoleChange(member.id, "GUEST")}>
                              <Shield className="h-4 w-4 mr-2" />
                              Guest
                              {member.role === "GUEST" && (
                                <Check className="h-4 w-4 ml-auto" />
                              )}
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => onRoleChange(member.id, "MODERATOR")}>
                              <ShieldCheck className="h-4 w-4 mr-2" />
                              Moderator
                              {member.role === "MODERATOR" && (
                                <Check className="h-4 w-4 ml-auto" />
                              )}
                            </DropdownMenuItem>
                            {/* 
                            <DropdownMenuItem>
                              <ShieldAlert className="h-4 w-4 mr-2"/>
                              Admin
                              {member.role === "ADMIN" && (
                                <Check className="h-4 w-4 ml-auto" />
                              )}
                            </DropdownMenuItem> */}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator>
                        <DropdownMenuItem onClick={() => onKick(member.id)}>
                          <Gavel className="h-4 w-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuSeparator>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              {loadingId === member.id && (
                <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}