export const locales = ["pt-br", "en-ca"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "pt-br";
