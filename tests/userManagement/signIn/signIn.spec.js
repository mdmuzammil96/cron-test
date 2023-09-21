import { expect, test } from "@playwright/test";

test("Successfull Signin", async ({ page }) => {
  const activeUrl =
    (process.env.ENV === "STAGE" && process.env.URL_STAGE) ||
    (process.env.ENV === "DEV" && process.env.URL_DEV) ||
    (process.env.ENV === "DEMO" && process.env.URL_DEMO) ||
    (process.env.ENV === "PROD" && process.env.URL_PROD);
  await page.goto(activeUrl);
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(activeUrl);
});
