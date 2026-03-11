import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale } from "./i18n/locales";

export default getRequestConfig(async ({ locale }) => {
  const currentLocale =
    typeof locale === "string" && locales.includes(locale as (typeof locales)[number])
      ? locale
      : defaultLocale;

  return {
    locale: currentLocale,
    messages: (await import(`./messages/${currentLocale}.json`)).default
  };
});