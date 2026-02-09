// "use client";

// import React from "react";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import qs from "query-string";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useModal } from "@/hooks/use-modal-store";
// import { Plus, Smile } from "lucide-react";
// import {EmojiPicker} from "@/components/emoji-picker";

// interface ChatInputProps {
//   apiUrl: string;
//   query: Record<string, any>;
//   name: string;
//   type: "conversation" | "channel";
// }

// const formSchema = z.object({
//   content: z.string().min(1, "Message cannot be empty"),
// });

// export function ChatInput({ apiUrl, query, name, type }: ChatInputProps) {
//   const { onOpen } = useModal();
//   const router = useRouter();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       content: "",
//     },
//   });

//   const isLoading = form.formState.isSubmitting;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
//     console.log("✅ MESSAGE SUBMITTED:", values);
    
// try {
//       const url = qs.stringifyUrl({
//         url: apiUrl,
//         query
//       });

//       await axios.post(url, values);

//       form.reset();
//       router.refresh();
//     } catch (error) {
//       console.error(error);
//     }
//   };
//     // future use (API / socket)
//     // await axios.post(...)
//     // socket.emit(...)

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="w-full"
//       >
//         <FormField
//           control={form.control}
//           name="content"
//           render={({ field }) => (
//             <FormItem>
//               <FormControl>
//                 <div className="relative p-4 pb-6">
                  
//                   {/* ➕ button */}
//                   <button
//                     type="button"
//                     onClick={() => onOpen("messageFile",{apiUrl,query})}
//                     className="absolute top-7 left-8 h-[24px] w-[24px] 
//                     bg-zinc-500 dark:bg-zinc-400 
//                     hover:bg-zinc-600 dark:hover:bg-zinc-300 
//                     transition rounded-full p-1 flex items-center justify-center"
//                   >
//                     <Plus className="text-white dark:text-[#313338]" />
//                   </button>

//                   {/* 💬 input */}
//                   <Input
//                     disabled={isLoading}
//                     placeholder={`Message ${
//                       type === "conversation" ? name : "#" + name
//                     }`}
//                     className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 
//                     border-none focus-visible:ring-0 
//                     text-zinc-600 dark:text-zinc-200"
//                     {...field}
//                   />

//                   {/* 😊 emoji icon */}
//                   <div className="absolute top-7 right-8 text-zinc-500">
//                     <EmojiPicker/>
//                   </div>

//                   {/* ✅ IMPORTANT: hidden submit button */}
//                   <button type="submit" className="hidden" />
//                 </div>
//               </FormControl>
//             </FormItem>
//           )}
//         />
//       </form>
//     </Form>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import qs from "query-string";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";
import { EmojiPicker } from "@/components/emoji-picker";

const formSchema = z.object({
  content: z.string().min(1),
});

export function ChatInput({ apiUrl, query, name, type }: any) {
  const { onOpen } = useModal();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { content: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({ url: apiUrl, query });
      await axios.post(url, values);
      form.reset();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">

                  <button
                    type="button"
                    onClick={() => onOpen("messageFile", { apiUrl, query })}
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 rounded-full"
                  >
                    <Plus className="text-white" />
                  </button>

                  <Input
                    disabled={isLoading}
                    placeholder={`Message ${
                      type === "conversation" ? name : "#" + name
                    }`}
                    className="px-14 py-6"
                    {...field}
                  />

                  <div className="absolute top-7 right-8">
                    {isMounted && (
                      <EmojiPicker
                        onChange={(emoji) =>
                          form.setValue("content", field.value + emoji)
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
  );
}
