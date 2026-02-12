"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavigationItem = ({
  id,
  imageUrl,
  name,
}: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const isActive = params?.serverId === id;

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button
        onClick={onClick}
        className="group relative flex items-center justify-center w-full cursor-pointer"
      >
        {/* Left Active Indicator */}
        <span
          className={cn(
            "absolute left-0 w-1 bg-white rounded-r-full transition-all duration-200",
            isActive
              ? "h-10"
              : "h-2 group-hover:h-6"
          )}
        />

        {/* Server Icon */}
        <div
          className={cn(
            "relative h-12 w-12 rounded-full overflow-hidden transition-all duration-200 ease-out",
            "group-hover:rounded-2xl group-hover:scale-105",
            isActive &&
              "rounded-2xl scale-105 ring-2 ring-white/20"
          )}
        >
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </button>
    </ActionTooltip>
  );
};
