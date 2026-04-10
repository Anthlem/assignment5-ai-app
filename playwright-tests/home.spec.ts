import { test, expect } from "@playwright/test";

test("homepage loads and returns an answer", async ({ page }) => {
  await page.route("**/api/ask", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        answer:
          "- Supervised learning uses labeled data, which means the correct output is already known during training.",
      }),
    });
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await expect(page.getByText("Study Notes Assistant")).toBeVisible();

  await page.getByPlaceholder("Type your question here...").fill("What is supervised learning?");
  await Promise.all([
    page.waitForResponse("**/api/ask"),
    page.getByRole("button", { name: "Ask" }).click(),
  ]);

  await expect(page.getByText(/Supervised learning uses labeled data/i)).toBeVisible();
});
