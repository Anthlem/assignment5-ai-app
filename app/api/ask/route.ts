import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type NoteItem = {
  id: number;
  content: string;
};

const stopWords = new Set([
  "what",
  "when",
  "where",
  "why",
  "how",
  "the",
  "and",
  "for",
  "with",
  "about",
  "does",
  "are",
  "is",
  "was",
  "were",
  "can",
  "you",
  "tell",
  "explain",
  "give",
  "into",
  "from",
  "this",
  "that",
]);

function getKeywords(question: string) {
  return question
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .map((word) => word.trim())
    .filter((word) => word.length > 2 && !stopWords.has(word));
}

function findRelevantNotes(question: string, notes: NoteItem[]) {
  const keywords = getKeywords(question);

  if (keywords.length === 0) {
    return {
      keywords,
      matches: [],
    };
  }

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

  const matches = scoredNotes
    .filter((note) => note.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return {
    keywords,
    matches,
  };
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

    const result = findRelevantNotes(question, notes);
    const relevantNotes = result.matches;

    if (relevantNotes.length === 0) {
      return NextResponse.json({
        answer: "I could not find a relevant answer in the prepared notes.",
        debug: {
          keywords: result.keywords,
          matchedNoteIds: [],
        },
      });
    }

    const answer = relevantNotes.map((note) => `- ${note.content}`).join("\n");

    return NextResponse.json({
      answer,
      debug: {
        keywords: result.keywords,
        matchedNoteIds: relevantNotes.map((note) => note.id),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { answer: "Server error while reading notes." },
      { status: 500 }
    );
  }
}