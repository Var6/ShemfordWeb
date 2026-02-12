"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { MessageCircle, X, Send, Loader } from "lucide-react";
import Image from "next/image";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE = {
  id: "1",
  role: "assistant" as const,
  content: `👋 Hello! I'm Shemford Bot.\n\nI can help you with:\n\n✓ 📚 Courses & Programs\n✓ 🏫 School Facilities\n✓ 🎓 Admission Process\n✓ 📞 Contact Information\n✓ ✨ Achievements & Events\n\nWhat would you like to know?`,
  timestamp: new Date(),
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content:
          "Sorry, I encountered an error. Please try again or contact us directly at admissions@shemfordpatna.com",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-to-br from-[#ebeae9] to-[#d8caac] text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:scale-110"
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
            <Image src="/icon.png" alt="AI" width={28} height={28} />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-40 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-900 rounded-lg shadow-2xl flex flex-col max-h-[70vh] border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#e2a522] to-[#e9890b] text-white p-4 rounded-t-lg flex-shrink-0">
            <h3 className="font-semibold text-lg">Shem Bot </h3>
            <p className="text-xs opacity-90">Ask anything about our school</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-950">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br from-[#e2a522] to-[#e9890b]">
                    <Image src="/icon.png" alt="Shem Bot" width={28} height={28} />
                  </div>
                )}
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-[#d4a574] to-[#e5b85a] text-white rounded-br-none shadow-md"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none shadow-sm border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.role === "user"
                        ? "opacity-80 text-white"
                        : "opacity-50 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 justify-start">
                <div className="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br from-[#e2a522] to-[#e9890b]">
                  <Image src="/icon.png" alt="Shem Bot" width={28} height={28} />
                </div>
                <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-2xl rounded-bl-none shadow-sm border border-gray-200 dark:border-gray-700">
                  <Loader className="w-4 h-4 animate-spin text-[#e9890b]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2 flex-shrink-0 bg-gray-50 dark:bg-gray-800"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type..."
              disabled={loading}
              className="flex-1 text-sm"
              size="sm"
            />
            <Button
              isIconOnly
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-[#e69f1c] to-[#e4b314] hover:from-[#e0a911] hover:to-[#ee8f13] text-white flex-shrink-0"
              size="sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
