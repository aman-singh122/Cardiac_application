"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = () => {
  const { onOpen } = useModal();

  return (
    <ActionTooltip side="right" align="center" label="Add a Server">
      <button
        onClick={() => onOpen("createServer")}
        className="group relative flex items-center justify-center w-full cursor-pointer"
      >
        <div
          className="
            h-12 w-12
            flex items-center justify-center
            rounded-full
            bg-muted
            transition-all duration-200 ease-out
            shadow-md
            group-hover:rounded-2xl
            group-hover:bg-emerald-500
            group-hover:shadow-emerald-500/30
            group-hover:scale-105
          "
        >
          <Plus
            size={24}
            className="
              text-zinc-300
              transition-colors duration-200
              group-hover:text-white
            "
          />
        </div>
      </button>
    </ActionTooltip>
  );
};
