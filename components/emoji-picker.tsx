"use client";

import React, { useState, memo } from "react";
import { Smile } from "lucide-react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/* 🔥 Lazy load emoji picker (BIG performance win) */
const Picker = dynamic(() => import("@emoji-mart/react"), {
  ssr: false,
});

/* Heavy data ko alag rakho */
import data from "@emoji-mart/data";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

export const EmojiPicker = memo(function EmojiPicker({
  onChange,
}: EmojiPickerProps) {
  const { resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className="focus:outline-none">
          <Smile className="h-5 w-5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="right"
        sideOffset={40}
        align="end"
        className="bg-transparent border-none shadow-none p-0"
      >
        {open && (
          <Picker
            data={data}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            onEmojiSelect={(emoji: any) => onChange(emoji.native)}
            previewPosition="none"
            maxFrequentRows={2}
          />
        )}
      </PopoverContent>
    </Popover>
  );
});
