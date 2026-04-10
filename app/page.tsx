"use client";

import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setAnswer(data.answer || "No answer returned.");
    } catch (error) {
      setAnswer("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-black p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Study Notes Assistant</h1>
        <p className="text-gray-700">
          Ask a question about your prepared study notes.
        </p>

        <textarea
          className="w-full border rounded-lg p-4 min-h-[140px]"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={handleAsk}
          className="bg-black text-white px-5 py-3 rounded-lg"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>

        <div className="border rounded-lg p-4 whitespace-pre-wrap">
          <h2 className="text-xl font-semibold mb-2">Answer</h2>
          <p>{answer || "Your answer will appear here."}</p>
        </div>
      </div>
    </main>
  );
}
