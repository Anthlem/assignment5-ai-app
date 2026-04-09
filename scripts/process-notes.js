const fs = require("fs");
const path = require("path");

const rawFilePath = path.join(__dirname, "..", "data", "raw", "notes.txt");
const outputFilePath = path.join(__dirname, "..", "data", "processed", "notes.json");

function processNotes(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line, index) => ({
      id: index + 1,
      content: line,
    }));
}

try {
  const rawText = fs.readFileSync(rawFilePath, "utf-8");
  const processed = processNotes(rawText);

  fs.writeFileSync(outputFilePath, JSON.stringify(processed, null, 2), "utf-8");
  console.log("Processed notes saved to data/processed/notes.json");
} catch (error) {
  console.error("Error processing notes:", error.message);
}