import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type NoteItem = {
  id: number;
  content: string;
};

function findRelevantNotes(question: string, notes: NoteItem[]) {
  const keywords = question
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .filter((word) => word.length > 2);

  const scoredNotes = notes.map((note) => {
    const contentLower = note.content.toLowerCase();

    let score = 0;
    for (const word of keywords) {
      if (contentLower.includes(word)) {
        score++;
      }
    }

    return { ...note, score };
  });

  const filtered = scoredNotes
    .filter((note) => note.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return filtered;
}

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question || !question.trim()) {
      return NextResponse.json(
        { answer: "Please enter a question." },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "data", "processed", "notes.json");
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const notes: NoteItem[] = JSON.parse(fileContents);

    const relevantNotes = findRelevantNotes(question, notes);

    if (relevantNotes.length === 0) {
      return NextResponse.json({
        answer: "I could not find a relevant answer in the prepared notes.",
      });
    }

    const answer = relevantNotes.map((note) => `- ${note.content}`).join("\n");

return NextResponse.json({
  answer,
});
  } catch (error) {
    return NextResponse.json(
      { answer: "Server error while reading notes." },
      { status: 500 }
    );
  }
}