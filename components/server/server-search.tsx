"use client";

import { Hash, Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter, useParams } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

export const ServerSearch = ({ data }: ServerSearchProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: "channel" | "member";
  }) => {
    setOpen(false);

    if (type === "member") {
      router.push(`/servers/${params?.serverId}/conversations/${id}`);
    }

    if (type === "channel") {
      router.push(`/servers/${params?.serverId}/channels/${id}`);
    }
  };

  const getIcon = (type: "channel" | "member") => {
    return type === "channel" ? (
      <Hash className="h-4 w-4" />
    ) : (
      <User className="h-4 w-4" />
    );
  };

  return (
    <>
      {/* Search Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="
  group w-full
  flex items-center gap-3
  px-4 py-3
  rounded-xl
  bg-card
  hover:bg-muted
  border border-border
  transition-all duration-200
"
      >
        <Search className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Search channels or members
        </span>
        <kbd
          className="
    ml-auto px-2 py-0.5
    text-[10px]
    rounded-md
  bg-muted
text-muted-foreground
border border-border

    font-mono
  "
        >
          Ctrl + K
        </kbd>
      </button>

      {/* Command Dialog */}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="
bg-popover
border border-border

  rounded-2xl
  shadow-[0_30px_80px_rgba(0,0,0,0.6)]
"
      >
        <VisuallyHidden>
          <DialogTitle>Search</DialogTitle>
        </VisuallyHidden>

        <VisuallyHidden>
          <DialogDescription>
            Search through all channels and members
          </DialogDescription>
        </VisuallyHidden>

        <div className="px-4 pt-4 pb-2">
          <CommandInput
            placeholder="Type to search..."
            className="
              bg-background
              border border-border
              rounded-lg
              px-4 py-3
              text-sm
              placeholder:text-muted-foreground
              focus:outline-none
              focus:ring-2
              focus:ring-primary/40
            "
          />
        </div>

        <CommandList className="max-h-[380px] overflow-y-auto px-2 pb-3">
          <CommandEmpty className="py-8 text-center text-muted-foreground text-sm">
            No results found.
          </CommandEmpty>

          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup
                key={label}
                heading={label}
                className="
                  text-[10px]
                  uppercase
                  tracking-widest
                  text-muted-foreground
                  px-3 pt-4 pb-2
                "
              >
                {data.map(({ id, icon, name }) => (
                  <CommandItem
                    key={id}
                    onSelect={() => onClick({ id, type })}
                    className="
                      flex items-center gap-3
                      px-4 py-2.5
                      rounded-lg
                      cursor-pointer
                      transition-all duration-150
                      hover:bg-accent
                      data-[selected=true]:bg-primary/20
                    "
                  >
                    <div className="text-muted-foreground">
                      {icon || getIcon(type)}
                    </div>

                    <span className="text-sm text-foreground">{name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};
