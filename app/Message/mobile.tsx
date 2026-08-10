"use client";

import { useState } from "react";
import Image from "next/image";

import { usePageContent } from "@/lib/content/client";

interface MessageTab {
  title: string;
  heading: string;
  body: string;
  bullets: string;
  emphasis: string;
  image: string;
}

function lines(value: string) {
  return (value ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export default function MessagesPage() {
  // Same content as the desktop view, so an edit updates both.
  const { t, list } = usePageContent("message");
  const messages = list<MessageTab>("tabs").filter((m) => m.title);
  const [selected, setSelected] = useState<MessageTab | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
        {t("mobileTitle", "Messages")}
      </h1>
      <div className="grid grid-cols-1 gap-4">
        {messages.map((msg) => (
          <div
            key={msg.title}
            className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelected(msg)}
          >
            {msg.image && (
              <Image
                alt={msg.title}
                className="w-48 h-48 object-cover rounded-lg mb-2"
                height={250}
                src={msg.image}
                width={250}
              />
            )}
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {msg.title}
            </h2>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-lg w-full shadow-lg relative flex flex-col max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 text-lg"
              onClick={() => setSelected(null)}
            >
              ✖
            </button>
            {selected.image && (
              <Image
                alt={selected.title}
                className="w-full h-60 object-cover rounded-lg mb-4"
                height={300}
                src={selected.image}
                width={300}
              />
            )}
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
              {selected.heading || selected.title}
            </h2>
            <div className="max-h-60 overflow-y-auto p-2 space-y-3">
              {lines(selected.body).map((p, i) => (
                <p key={i} className="text-gray-800 dark:text-gray-200 text-justify">
                  {p}
                </p>
              ))}
              {lines(selected.bullets).length > 0 && (
                <ul className="list-disc pl-5 space-y-1.5 text-gray-800 dark:text-gray-200 text-left">
                  {lines(selected.bullets).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
              {selected.emphasis && (
                <p className="font-bold text-gray-900 dark:text-gray-100 text-justify">
                  {selected.emphasis}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
