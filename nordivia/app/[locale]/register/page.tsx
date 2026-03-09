import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/locales";
import { RegisterForm } from "./ui";

export default async function RegisterPage({
  params: { locale }
}: {
  params: { locale: AppLocale };
}) {
  const t = await getTranslations({ locale, namespace: "auth.register" });

  return (
    <main className="container-max py-12">
      <div className="card p-6">
        <h1 className="text-2xl font-extrabold">{t("title")}</h1>
        <p className="mt-2 text-black/70">{t("subtitle")}</p>

        <div className="mt-6">
          <RegisterForm locale={locale} />
        </div>
      </div>
    </main>
  );
}