"use client";

import { useEffect, useState } from "react";

import { useModal } from "@/hooks/use-modal-store";
import { MembersModal } from "./members-modal";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerModal } from "@/components/modals/edit-server-modal";

export const ModalProvider = () => {
   const { type } = useModal();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  if (!isMounted) {
    return null;
  }

  
  return (
    <>
        {type === "invite" && <InviteModal />}
      {type === "editServer" && <EditServerModal />}
      {/* {type === "members" && <MembersModal />} */}

      <CreateServerModal />
      <InviteModal />
      <EditServerModal/>
    </>
  );
}