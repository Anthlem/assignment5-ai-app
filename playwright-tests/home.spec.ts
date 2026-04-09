import { test, expect } from "@playwright/test";

test("homepage loads and returns an answer", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.getByText("Study Notes AI Assistant")).toBeVisible();

  await page.getByPlaceholder("Type your question here...").fill("What is supervised learning?");
  await page.getByRole("button", { name: "Ask" }).click();

  await expect(page.getByText(/Supervised learning uses labeled data/i)).toBeVisible();
});