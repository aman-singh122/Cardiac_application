"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  // console.log("Invite modal open:", isModalOpen, type);
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);
      onOpen("invite", { server: response.data });
      // , {
      //   method: "PATCH",
      // }
      // if (response.ok) {
      //   const updatedServer = await response.json();
      //   // You might want to update the server data here
      //   // For example: update the server invite code in the UI
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black p-5 overflow-hidden ">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70 mb-2 block">
            Server invite link
          </Label>

          <div className="flex items-center gap-x-2 mb-4">
            <Input
              disabled={isLoading}
              className="bg-zinc-100/50 border-zinc-300 focus-visible:ring-0 text-black focus-visible:ring-offset-0 flex-1"
              value={inviteUrl}
            readOnly
            />
            <Button
              disabled={isLoading}
              onClick={onCopy}
              size="icon"
            //   className="bg-indigo-600 hover:bg-indigo-700"
            >
              {copied ?
                <Check className="h-4 w-4" /> :
                <Copy className="h-4 w-4" />
              }
              {/* <Copy className="w-4 h-4"/> */}
            </Button>
          </div>
          <Button
            onClick={onNew}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

