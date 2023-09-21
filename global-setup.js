import { chromium } from "@playwright/test";
import * as OTPAuth from "otpauth";

const secretKey =
  (process.env.ENV === "STAGE" && process.env.SECRET_STAGE) ||
  (process.env.ENV === "DEV" && process.env.SECRET_DEV) ||
  (process.env.ENV === "DEMO" && process.env.SECRET_DEMO) ||
  (process.env.ENV === "PROD" && process.env.SECRET_PROD);

const totp = new OTPAuth.TOTP({
  issuer: "Accuknox",
  label: "Accuknox",
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: secretKey, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
});

async function globalSetup() {
  const activeUrl =
    (process.env.ENV === "STAGE" && process.env.URL_STAGE) ||
    (process.env.ENV === "DEV" && process.env.URL_DEV) ||
    (process.env.ENV === "DEMO" && process.env.URL_DEMO) ||
    (process.env.ENV === "PROD" && process.env.URL_PROD);

  const activeEmail =
    (process.env.ENV === "STAGE" && process.env.EMAIL_STAGE) ||
    (process.env.ENV === "DEV" && process.env.EMAIL_DEV) ||
    (process.env.ENV === "DEMO" && process.env.EMAIL_DEMO) ||
    (process.env.ENV === "PROD" && process.env.EMAIL_PROD);

  const activePass =
    (process.env.ENV === "STAGE" && process.env.PASSWORD_STAGE) ||
    (process.env.ENV === "DEV" && process.env.PASSWORD_DEV) ||
    (process.env.ENV === "DEMO" && process.env.PASSWORD_DEMO) ||
    (process.env.ENV === "PROD" && process.env.PASSWORD_PROD);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  // const page = await context.newPage();
  await page.goto(activeUrl);
  await page.getByPlaceholder("Enter Email address").click();
  await page.getByPlaceholder("Enter Email address").fill(activeEmail);
  await page.getByPlaceholder("Enter Password").click();
  await page.getByPlaceholder("Enter Password").fill(activePass);
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByPlaceholder("Enter code").fill(totp.generate());
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Login" }).press("Enter");
  await page.waitForTimeout(4000);
  await page.context().storageState({
    path: "./LoginAuth.json",
  });
  await browser.close();
}

export default globalSetup;
