import { test, expect } from "@playwright/test";

test.describe("Tags Creation and Deletion", () => {
  test.describe.configure({ mode: "serial" });
  const activeUrl =
    (process.env.ENV === "STAGE" && process.env.URL_STAGE) ||
    (process.env.ENV === "DEV" && process.env.URL_DEV) ||
    (process.env.ENV === "DEMO" && process.env.URL_DEMO) ||
    (process.env.ENV === "PROD" && process.env.URL_PROD);
  const name = `testing${Date.now()}`;
  test("Tags Creation", async ({ page }) => {
    await page.goto(`${activeUrl}/settings/tags`);
    await page.waitForTimeout(2000);
    await page.getByRole("button", { name: "Create tag" }).click();
    await page.getByPlaceholder("Name").click();
    await page.getByPlaceholder("Name").fill(name);
    await page.getByRole("button", { name: "Save" }).click();
    await page.waitForTimeout(2000);
    // expect(page.getByText("Tag created successfully")).toBeVisible();
  });
  test("Tags Deletion", async ({ page }) => {
    await page.goto(`${activeUrl}/settings/tags`);
    await page.waitForTimeout(2000);
    await page.getByPlaceholder("Search").click();
    await page.getByPlaceholder("Search").fill(name);
    await page.waitForTimeout(2000);
    await page.getByLabel("Select row").check();
    await page.getByRole("button", { name: "Delete" }).click();
    await page.waitForTimeout(1000);
    // expect(page.getByText("Tag deleted successfully")).toBeVisible();
  });
});
