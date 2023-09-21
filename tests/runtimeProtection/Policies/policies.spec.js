import { expect, test } from "@playwright/test";

const activeUrl =
  (process.env.ENV === "STAGE" && process.env.URL_STAGE) ||
  (process.env.ENV === "DEV" && process.env.URL_DEV) ||
  (process.env.ENV === "DEMO" && process.env.URL_DEMO) ||
  (process.env.ENV === "PROD" && process.env.URL_PROD);

test.describe("Activate/Apply Policies", () => {
  test.describe.configure({ mode: "parallel" });
  test("Activating Inactive Discovered Policy", async ({ page }) => {
    await page.goto(activeUrl);
    await page.waitForTimeout(5000);
    await page.locator("li").click();
    await page.getByText("Policies", { exact: true }).click();
    await page.getByRole("tab", { name: "Discovered" }).click();
    await page.waitForTimeout(2000);
    await page
      .locator(
        ".MuiDataGrid-cellCheckbox > .MuiCheckbox-root > .PrivateSwitchBase-input"
      )
      .first()
      .check();
    await page.getByRole("button", { name: "Activate" }).click();
    await page.getByRole("button", { name: "Confirm" }).click();
    await page.waitForTimeout(3000);
    // expect(page.getByText("Policies activated successfully")).toBeVisible();
  });

  test("test apply/activate for hardening ", async ({ page }) => {
    await page.goto(activeUrl);
    await page.waitForTimeout(5000);
    await page.locator("li");
    await page.waitForTimeout(5000);

    await page.getByRole("tab", { name: "Hardening" }).click();
    await page.waitForTimeout(2000);
    await page
      .locator(
        ".MuiDataGrid-cellCheckbox > .MuiCheckbox-root > .PrivateSwitchBase-input"
      )
      .first()
      .check();
    await page.getByRole("button", { name: "Activate" }).click();
    await page.getByRole("button", { name: "Confirm" }).click();
    await page.waitForTimeout(2000);
    // expect(page.getByText("Policies activated successfully")).toBeVisible();
  });

  test("test apply/activate for custom policy", async ({ page }) => {
    await page.goto(activeUrl);
    await page.waitForTimeout(5000);
    await page.locator("li");
    await page.getByText("Policies", { exact: true }).click();
    await page.waitForTimeout(5000);
    await page.getByRole("tab", { name: "Custom" }).click();
    await page.waitForTimeout(2000);
    await page
      .locator(
        ".MuiDataGrid-cellCheckbox > .MuiCheckbox-root > .PrivateSwitchBase-input"
      )
      .first()
      .check();
    await page.getByRole("button", { name: "Activate" }).click();
    await page.getByRole("button", { name: "Confirm" }).click();
    await page.waitForTimeout(2000);
    // expect(page.getByText("Policies activated successfully")).toBeVisible();
  });
});

test.describe("Inactivate Policies", () => {
  test.describe.configure({ mode: "parallel" });
  test("Inactivate for Discovered ", async ({ page }) => {
    await page.goto(activeUrl);
    await page.waitForTimeout(5000);
    await page.locator("li");
    await page.getByText("Policies", { exact: true }).click();
    await page.waitForTimeout(5000);
    await page.getByRole("tab", { name: "Discovered" }).click();
    await page.waitForTimeout(2000);
    await page
      .locator(
        ".MuiDataGrid-cellCheckbox > .MuiCheckbox-root > .PrivateSwitchBase-input"
      )
      .first()
      .check();
    await page.getByRole("button", { name: "Make Inactive" }).click();
    await page.getByRole("button", { name: "Confirm" }).click();
    await page.waitForTimeout(2000);
    // expect(page.getByText("Policies status changed to Inactive")).toBeVisible();
  });

  test("Inactivate for hardening ", async ({ page }) => {
    await page.goto(activeUrl);
    await page.waitForTimeout(5000);
    await page.locator("li");
    await page.getByText("Policies", { exact: true }).click();
    await page.waitForTimeout(5000);
    await page.getByRole("tab", { name: "Hardening" }).click();
    await page.waitForTimeout(2000);

    await page.locator(
      ".MuiDataGrid-cellCheckbox > .MuiCheckbox-root > .PrivateSwitchBase-input"
    );
    await page.getByRole("button", { name: "Make Inactive" }).click();
    await page.getByRole("button", { name: "Confirm" }).click();
    await page.waitForTimeout(2000);
    // expect(page.getByText("Policies status changed to Inactive")).toBeVisible();
  });

  test("Inactivate for Custom ", async ({ page }) => {
    await page.goto(activeUrl);
    await page.waitForTimeout(5000);

    await expect(page.getByText("CNAPP Dashboard")).toBeVisible();
    await page.locator("li").filter({ hasText: "Runtime Protection" });
    await page.getByText("Policies", { exact: true }).click();
    await page.waitForTimeout(5000);
    await page.getByRole("tab", { name: "Custom" }).click();
    await page.waitForTimeout(2000);
    await page
      .locator(
        ".MuiDataGrid-cellCheckbox > .MuiCheckbox-root > .PrivateSwitchBase-input"
      )
      .first()
      .check();
    await page.getByRole("button", { name: "Make Inactive" }).click();
    await page.getByRole("button", { name: "Confirm" }).click();
    await page.waitForTimeout(2000);
    // expect(page.getByText("Policies status changed to Inactive")).toBeVisible();
  });
});

test.describe("Ignore Policies", () => {
  test.describe.configure({ mode: "parallel" });
  test("Ignore for Discovered ", async ({ page }) => {
    await page.goto(activeUrl);
    await page.waitForTimeout(5000);
    await expect(page.getByText("CNAPP Dashboard")).toBeVisible();
    await page.locator("li").filter({ hasText: "Runtime Protection" });
    await page.getByText("Policies", { exact: true }).click();
    await page.waitForTimeout(5000);
    await page.getByRole("tab", { name: "Discovered" }).click();
    await page.waitForTimeout(2000);
    await page
      .locator(
        ".MuiDataGrid-cellCheckbox > .MuiCheckbox-root > .PrivateSwitchBase-input"
      )
      .first()
      .check();
    await page.getByRole("button", { name: "Ignore" }).click();
    await page.getByRole("button", { name: "Confirm" }).click();
    await page.waitForTimeout(2000);
    // expect(page.getByText("Discovered / Hardening policies ignored successfully")).toBeVisible();
  });

  test("Ignore for hardening ", async ({ page }) => {
    await page.goto(activeUrl);
    await page.waitForTimeout(5000);
    await expect(page.getByText("CNAPP Dashboard")).toBeVisible();
    await page.locator("li").filter({ hasText: "Runtime Protection" });
    await page.waitForTimeout(5000);

    await page.getByRole("tab", { name: "Hardening" }).click();

    await page.waitForTimeout(2000);
    await page
      .locator(
        ".MuiDataGrid-cellCheckbox > .MuiCheckbox-root > .PrivateSwitchBase-input"
      )
      .first()
      .check();
    await page.getByRole("button", { name: "Ignore" }).click();
    await page.getByRole("button", { name: "Confirm" }).click();
    await page.waitForTimeout(2000);
    // expect(page.getByText("Discovered / Hardening policies ignored successfully")).toBeVisible();
  });

  test("Ignore for Custom ", async ({ page }) => {
    await page.goto(activeUrl);
    await page.waitForTimeout(5000);
    await expect(page.getByText("CNAPP Dashboard")).toBeVisible();
    await page.locator("li").filter({ hasText: "Runtime Protection" });
    await page.getByText("Policies", { exact: true }).click();
    await page.waitForTimeout(5000);
    await page.getByRole("tab", { name: "Custom" }).click();
    await page.waitForTimeout(2000);
    await page
      .locator(
        ".MuiDataGrid-cellCheckbox > .MuiCheckbox-root > .PrivateSwitchBase-input"
      )
      .first()
      .check();
    await page.getByRole("button", { name: "Ignore" }).click();
    await page.getByRole("button", { name: "Confirm" }).click();
    await page.waitForTimeout(2000);
    // expect(page.getByText("Custom policies cannot be ignored.")).toBeVisible();
  });
});

test.describe("Delete Policies", () => {
  test.describe.configure({ mode: "parallel" });
  test("Delete for Discovered ", async ({ page }) => {
    await page.goto(activeUrl);
    await page.waitForTimeout(5000);
    await page.locator("li");
    await page.getByText("Policies", { exact: true }).click();
    await page.waitForTimeout(5000);
    await page.getByRole("tab", { name: "Discovered" }).click();
    await page.waitForTimeout(2000);
    await page
      .locator(
        ".MuiDataGrid-cellCheckbox > .MuiCheckbox-root > .PrivateSwitchBase-input"
      )
      .first()
      .check();
    await page.getByRole("button", { name: "Delete" }).click();
    await page.getByRole("button", { name: "Confirm" }).click();
    await page.waitForTimeout(2000);
    // expect(
    //   page.getByText(
    //     "Discovered / Hardening policies are inactivated. Discovered / Hardening policies cannot be deleted."
    //   )
    // ).toBeVisible();
  });

  test("Delete for hardening ", async ({ page }) => {
    await page.goto(activeUrl);
    await page.waitForTimeout(5000);
    await page.locator("li");
    await page.getByText("Policies", { exact: true }).click();
    await page.waitForTimeout(5000);
    await page.getByRole("tab", { name: "Hardening" }).click();
    await page.waitForTimeout(2000);
    await page
      .locator(
        ".MuiDataGrid-cellCheckbox > .MuiCheckbox-root > .PrivateSwitchBase-input"
      )
      .first()
      .check();
    await page.getByRole("button", { name: "Delete" }).click();
    await page.getByRole("button", { name: "Confirm" }).click();
    await page.waitForTimeout(2000);
    // expect(
    //   page.getByText(
    //     "Discovered / Hardening policies are inactivated. Discovered / Hardening policies cannot be deleted."
    //   )
    // ).toBeVisible();
  });

  test("Delete for Custom ", async ({ page }) => {
    await page.goto(activeUrl);
    await page.waitForTimeout(5000);
    await expect(page.getByText("CNAPP Dashboard")).toBeVisible();
    await page.locator("li").filter({ hasText: "Runtime Protection" });
    await page.getByText("Policies", { exact: true }).click();
    await page.waitForTimeout(5000);
    await page.getByRole("tab", { name: "Custom" }).click();
    await page.waitForTimeout(2000);
    await page
      .locator(
        ".MuiDataGrid-cellCheckbox > .MuiCheckbox-root > .PrivateSwitchBase-input"
      )
      .first()
      .check();
    await page.getByRole("button", { name: "Delete" }).click();
    await page.getByRole("button", { name: "Confirm" }).click();
    await page.waitForTimeout(2000);
    // expect(page.getByText("Custom policies deleted successfully.")).toBeVisible();
  });
});
