"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";


export const NavigationAction = () => {

  const {onOpen} = useModal();

  return (
  <ActionTooltip side="right" align="center" label="Add a Server">
      <button onClick={()=>onOpen("createServer")} className="group flex items-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-700 transition-all duration-200 ease-out group-hover:rounded-2xl group-hover:bg-emerald-500">
        <Plus
          size={25}
          className="text-white transition-colors duration-200"
        />
      </div>
    </button>
  </ActionTooltip>
  );
};
