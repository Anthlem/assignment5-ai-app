const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: ["<rootDir>/tests/**/*.test.[jt]s?(x)"],
  testPathIgnorePatterns: ["<rootDir>/playwright-tests/", "<rootDir>/node_modules/"],
};

module.exports = createJestConfig(customJestConfig);
