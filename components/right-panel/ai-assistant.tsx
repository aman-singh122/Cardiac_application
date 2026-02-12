"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export const AIAssistant = () => {
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    // Fake AI response (temporary)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "This is a smart AI response. Real AI integration coming next.",
        },
      ]);
    }, 700);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 shadow-xl">

      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <Bot className="w-4 h-4 text-indigo-400" />
        <span className="text-sm font-semibold text-white">
          AI Assistant
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
        {messages.length === 0 && (
          <p className="text-zinc-500 text-xs">
            Ask anything...
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "max-w-[85%] px-3 py-2 rounded-lg",
              msg.role === "user"
                ? "ml-auto bg-indigo-600 text-white"
                : "bg-white/10 text-zinc-200"
            )}
          >
            {msg.content}
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 border-t border-white/10">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask AI..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button
          onClick={handleSend}
          className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
6