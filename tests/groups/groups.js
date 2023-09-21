import { test, expect } from "@playwright/test";

test.describe("Groups Creation and Deletion", () => {
  test.describe.configure({ mode: "serial" });
  const activeUrl =
    (process.env.ENV === "STAGE" && process.env.URL_STAGE) ||
    (process.env.ENV === "DEV" && process.env.URL_DEV) ||
    (process.env.ENV === "DEMO" && process.env.URL_DEMO) ||
    (process.env.ENV === "PROD" && process.env.URL_PROD);

  const name = `testing${Date.now()}`;
  test("Groups Creation", async ({ page }) => {
    await page.goto(`${activeUrl}/settings/groups`);
    await page.getByRole("button", { name: "Create group" }).click();
    await page.getByRole("textbox").first().click();
    await page.getByRole("textbox").first().fill(name);
    await page.locator(".css-v39smt").click();
    await page.waitForTimeout(2000);
    await page.getByText("vol-0f8894b6afe41f67f", { exact: true }).click();
    await page.getByRole("button", { name: "Save" }).click();
    await page.waitForTimeout(2000);
    // expect(page.getByText("Group created successfully")).toBeVisible();
  });
  test("Groups Deletion", async ({ page }) => {
    await page.goto(`${activeUrl}/settings/groups`);
    await page.waitForTimeout(2000);
    await page.getByPlaceholder("Search").click();
    await page.getByPlaceholder("Search").fill(name);
    await page.waitForTimeout(2000);
    await page.getByLabel("Select row").check();
    await page.getByRole("button", { name: "Delete" }).click();
    await page.waitForTimeout(2000);
    // expect(page.getByText("Group successfully deleted")).toBeVisible();
  });
});
