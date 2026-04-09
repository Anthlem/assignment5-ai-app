const fs = require("fs");
const path = require("path");

describe("processed notes file", () => {
  test("notes.json exists", () => {
    const filePath = path.join(__dirname, "..", "data", "processed", "notes.json");
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test("notes.json contains an array", () => {
    const filePath = path.join(__dirname, "..", "data", "processed", "notes.json");
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContents);

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  test("each note has id and content", () => {
    const filePath = path.join(__dirname, "..", "data", "processed", "notes.json");
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContents);

    for (const item of data) {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("content");
    }
  });
});