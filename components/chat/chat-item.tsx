"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member, MemberRole, Profile } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Edit, Trash, FileIcon, ShieldAlert, ShieldCheck } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { UserAvatar } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & { profile: Profile };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 text-indigo-400" />,
  ADMIN: <ShieldAlert className="h-4 w-4 text-rose-400" />,
};

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const isOwner = currentMember.id === member.id;
  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;

  const canDelete = !deleted && (isAdmin || isModerator || isOwner);
  const canEdit = !deleted && isOwner && !fileUrl;

  const fileType = fileUrl?.split(".").pop();
  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !!fileUrl && !isPDF;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { content },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });

      await axios.patch(url, values);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  // ESC to cancel edit
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="group relative flex gap-4 px-6 py-5 rounded-xl transition-all hover:bg-white/[0.04]">
      
      {/* Avatar */}
      <div className="flex-shrink-0">
        <UserAvatar
          src={member.profile?.imageUrl}
          className="h-10 w-10 rounded-full"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col w-full space-y-1">

        {/* Header */}
        <div className="flex items-center gap-2">
          <p className="font-semibold text-[14.5px] text-white tracking-wide">
            {member.profile.name}
          </p>

          {roleIconMap[member.role]}

          <span className="text-xs text-zinc-500 ml-1">
            {timestamp}
          </span>
        </div>

        {/* Image Attachment */}
        {isImage && (
          <a
            href={fileUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-3 rounded-xl overflow-hidden border border-white/10 shadow-md hover:shadow-xl transition"
          >
            <Image
              src={fileUrl!}
              alt="attachment"
              width={350}
              height={350}
              className="object-cover rounded-xl"
            />
          </a>
        )}

        {/* PDF Attachment */}
        {isPDF && (
          <div className="flex items-center gap-3 mt-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <FileIcon className="h-6 w-6 text-indigo-400" />
            <a
              href={fileUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-400 hover:underline break-all"
            >
              Open PDF File
            </a>
          </div>
        )}

        {/* Message Text */}
        {!fileUrl && !isEditing && (
          <p
            className={cn(
              "text-[14.5px] leading-relaxed text-zinc-300",
              deleted && "italic text-zinc-500 opacity-70"
            )}
          >
            {content}
            {isUpdated && !deleted && (
              <span className="ml-2 text-[10px] text-zinc-500">
                (edited)
              </span>
            )}
          </p>
        )}

        {/* Edit Mode */}
        {isEditing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center gap-2 pt-2"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        variant="ghost"
                        disabled={form.formState.isSubmitting}
                        {...field}
                        className="text-sm bg-white/5 px-3 py-2 rounded-md"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button size="sm">Save</Button>
            </form>
            <span className="text-[10px] text-zinc-500 mt-1">
              Press ESC to cancel
            </span>
          </Form>
        )}
      </div>

      {/* Hover Actions */}
      {canDelete && (
        <div className="absolute right-6 top-4 hidden group-hover:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/95 border border-white/10 shadow-xl">
          {canEdit && (
            <Edit
              onClick={() => setIsEditing(true)}
              className="h-4 w-4 cursor-pointer text-zinc-400 hover:text-white transition"
            />
          )}
          <Trash
            onClick={() =>
              onOpen("deleteMessage", {
                apiUrl: `${socketUrl}/${id}`,
                query: socketQuery,
              })
            }
            className="h-4 w-4 cursor-pointer text-zinc-400 hover:text-red-400 transition"
          />
        </div>
      )}
    </div>
  );
};
