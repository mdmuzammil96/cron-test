import { test, expect } from "@playwright/test";

test.describe("Cluster Onboard DepartureBoard", async () => {
  test.describe.configure({ mode: "serial" });
  const activeUrl =
    (process.env.ENV === "STAGE" && process.env.URL_STAGE) ||
    (process.env.ENV === "DEV" && process.env.URL_DEV) ||
    (process.env.ENV === "DEMO" && process.env.URL_DEMO) ||
    (process.env.ENV === "PROD" && process.env.URL_PROD);
  const names = `testing${Date.now()}`;

  test("Cluster Onboarding", async ({ page }) => {
    await page.goto(activeUrl);
    await page.goto(`${activeUrl}/settings/manage-cluster`);
    await page.getByRole("button", { name: "Onboard Now" }).click();
    await page.getByPlaceholder("Enter Cluster Name").click();
    await page.getByPlaceholder("Enter Cluster Name").fill(names);
    await page.getByRole("button", { name: "Save & Next" }).click();
    await page.waitForTimeout(1000);
    await page.waitForURL(
      `${activeUrl}/settings/manage-cluster/onboard/agents`
    );
    await page.getByText("List of Agents").click();
  });
  test("Cluster Deboarding", async ({ page }) => {
    await page.goto(activeUrl);
    await page.goto(`${activeUrl}/settings/manage-cluster`);
    await page.waitForTimeout(1000);
    await page.getByRole("heading", { name: names }).click();
    expect(page.getByRole("heading", { name: names })).toBeVisible();
    await page.getByRole("button", { name: "Delete" }).click();
    await page.getByRole("button", { name: "Delete" }).click();
    await page.waitForTimeout(3000);
    // expect(page.getByRole("heading", { name: "testing12" })).toBeHidden();
  });
});
