import { getRequestConfig } from "next-intl/server";
import { readFileSync } from "fs";
import { join } from "path";
import { locales, defaultLocale } from "./i18n/locales";

export default getRequestConfig(async ({ locale }) => {
  const currentLocale =
    typeof locale === "string" && locales.includes(locale as (typeof locales)[number])
      ? locale
      : defaultLocale;

  const filePath = join(process.cwd(), "messages", `${currentLocale}.json`);
  const messages = JSON.parse(readFileSync(filePath, "utf-8"));

  return {
    locale: currentLocale,
    messages,
  };
});