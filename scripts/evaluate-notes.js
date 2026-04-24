const fs = require("fs");
const path = require("path");

const notesPath = path.join(__dirname, "..", "data", "processed", "notes.json");
const casesPath = path.join(__dirname, "..", "evaluation", "evaluation-cases.json");

const notes = JSON.parse(fs.readFileSync(notesPath, "utf-8"));
const cases = JSON.parse(fs.readFileSync(casesPath, "utf-8"));

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

function getKeywords(question) {
  return question
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .map((word) => word.trim())
    .filter((word) => word.length > 2 && !stopWords.has(word));
}

function findRelevantNotes(question) {
  const keywords = getKeywords(question);

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

  return scoredNotes
    .filter((note) => note.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function evaluateCase(testCase, shouldFindAnswer) {
  const matches = findRelevantNotes(testCase.question);
  const passed = shouldFindAnswer ? matches.length > 0 : matches.length === 0;

  return {
    id: testCase.id,
    question: testCase.question,
    passed,
    matchedNoteIds: matches.map((note) => note.id),
  };
}

const representativeResults = cases.representativeCases.map((testCase) =>
  evaluateCase(testCase, true)
);

const failureResults = cases.failureCases.map((testCase) =>
  evaluateCase(testCase, false)
);

const allResults = [...representativeResults, ...failureResults];

console.log("Assignment 6 Evaluation Results");
console.log("--------------------------------");
console.table(allResults);

const passedCount = allResults.filter((result) => result.passed).length;
console.log(`${passedCount}/${allResults.length} cases passed.`);