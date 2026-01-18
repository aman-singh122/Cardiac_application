"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import {  useRouter } from "next/navigation";
import qs from "query-string"

export const DeleteChannelModal  = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const router = useRouter();

   const [isLoading, setIsLoading] = useState(false);

  // const isModalOpen = isOpen && type === "invite";
  const { server,channel } = data;

  // console.log("Invite modal open:", isModalOpen, type);

   const onClick = async () => {
    try {
      setIsLoading(true);
    const url = qs.stringifyUrl({
  url: `/api/channels/${channel?.id}`,
  query: {
    serverId: server?.id
  }
})

      
      // await axios.delete(`/api/servers/${server?.id}`);
      await axios.delete(url);
      
     onClose();
router.push(`/servers/${server?.id}`);
router.refresh();

    } catch (error) {
      console.error("Failed to leave server:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black p-5 overflow-hidden ">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Channel
          </DialogTitle>
         <DialogDescription className="text-center text-zinc-500">
  Are you sure you want to do this? <br />
  <span className="text-indigo-500 font-semibold">
    #{channel?.name}
  </span>{" "}
  will be permanently deleted.
</DialogDescription>
        </DialogHeader>
         <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isLoading}
              onClick={onClose}
              variant="ghost"
              // className="hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onClick}
              variant="primary"
              // className="bg-red-600 hover:bg-red-700 text-white"
            >
              {/* {isLoading ? "Leaving..." : "Leave Server"} */}
              Confirm
            </Button>
          </div>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

