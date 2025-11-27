"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SuggestMessagesStream() {
  const [message, setMessage] = useState(""); // Accumulating text
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setMessage(""); // Clear previous
    setLoading(true);

    const response = await fetch("/api/suggest-messages", { method: "POST" });
    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Append new chunk character by character
      const chunk = decoder.decode(value);
      for (let i = 0; i < chunk.length; i++) {
        setMessage((prev) => prev + chunk[i]);
        await new Promise((r) => setTimeout(r, 20)); // typing speed
      }
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <Button
        onClick={handleFetch}
        disabled={loading}
        className="px-4 py-2  text-white rounded mb-4"
      >
        {loading ? "Generating..." : "Get Suggestions"}
      </Button>

      <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap font-mono text-black">
        {message}
      </div>
    </div>
  );
}
