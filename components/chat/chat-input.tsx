"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import qs from "query-string";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";
import { EmojiPicker } from "@/components/emoji-picker";

/* ---------------- Schema ---------------- */

const formSchema = z.object({
  content: z.string().optional(),
});

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

export function ChatInput({ apiUrl, query, name, type }: ChatInputProps) {
  const router = useRouter();
  const { onOpen } = useModal();

  const [isMounted, setIsMounted] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    if (!values.content && !fileUrl) return; // nothing to send

    const url = qs.stringifyUrl({
      url: apiUrl,
      query,
    });

    await axios.post(url, {
      content: fileUrl ? "" : values.content,
      fileUrl: fileUrl || null,
    });

    form.reset();
    setFileUrl(null);
    router.refresh();
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="px-6 py-6 bg-gradient-to-t from-black/40 via-black/20 to-transparent">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div
                    className="
                    relative flex items-center 
                    bg-white/10 dark:bg-white/5 
                    backdrop-blur-xl 
                    rounded-2xl 
                    px-5 py-4 
                    shadow-xl 
                    border border-white/10 
                    transition-all 
                    focus-within:ring-2 focus-within:ring-indigo-500
                  "
                  >
                    {/* ➕ Upload */}
                    <button
                      type="button"
                      onClick={() =>
                        onOpen("messageFile", {
                          apiUrl,
                          query,
                        })
                      }
                      className="mr-4 flex items-center justify-center text-zinc-400 hover:text-indigo-400 transition"
                    >
                      <Plus className="h-5 w-5" />
                    </button>

                    {/* 💬 Input */}
                    <Input
                      variant="ghost"
                      disabled={isLoading}
                      {...field}
                      placeholder={`Message ${
                        type === "conversation" ? name : "#" + name
                      }`}
                      className="flex-1 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                    />

                    {/* 😊 Emoji */}
                    <div className="ml-4">
                      {isMounted && (
                        <EmojiPicker
                          onChange={(emoji) =>
                            form.setValue(
                              "content",
                              (field.value || "") + emoji,
                            )
                          }
                        />
                      )}
                    </div>

                    <button type="submit" className="hidden" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
