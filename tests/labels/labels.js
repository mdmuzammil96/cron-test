import { test, expect } from "@playwright/test";

test.describe("Labels Creation and Deletion", () => {
  test.describe.configure({ mode: "serial" });
  const activeUrl =
    (process.env.ENV === "STAGE" && process.env.URL_STAGE) ||
    (process.env.ENV === "DEV" && process.env.URL_DEV) ||
    (process.env.ENV === "DEMO" && process.env.URL_DEMO) ||
    (process.env.ENV === "PROD" && process.env.URL_PROD);
  const names = `testing${Date.now()}`;

  test("Creating label", async ({ page }) => {
    await page.goto(`${activeUrl}/settings/labels`);
    await page.getByRole("button", { name: "Add labels" }).click();
    await page.getByRole("textbox").first().click();
    await page.getByRole("textbox").first().fill(names);
    await page.getByRole("textbox").nth(1).click();
    await page.getByRole("textbox").nth(1).fill(names);
    await page.getByRole("button", { name: "Save" }).click();
    await page.waitForTimeout(2000);
    // expect(page.getByText("Label created successfully")).toBeVisible();
  });
  test("Deleting label", async ({ page }) => {
    await page.goto(`${activeUrl}/settings/labels`);
    await page.waitForTimeout(2000);
    await page.getByRole("cell", { name: names }).click();
    await page.getByRole("button", { name: "Delete" }).click();
    await page.waitForTimeout(2000);
    // expect(page.getByText("Label deleted successfully")).toBeVisible();
  });
});
