import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/locales";
import { LoginForm } from "./ui";

export default async function LoginPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  const t = await getTranslations({ locale });
  return (
    <main className="container-max py-12">
      <div className="grid gap-6 md:grid-cols-2 md:items-start">
        <div className="card p-6">
          <h1 className="text-2xl font-extrabold">{t("auth.loginTitle")}</h1>
          <p className="mt-2 text-black/70">Acesso seguro para compras e suporte.</p>
          <div className="mt-6">
            <LoginForm locale={locale} />
          </div>
        </div>

        <div className="card p-6">
          <div className="badge mb-3">Demo</div>
          <div className="text-sm text-black/70 leading-relaxed">
            <div><span className="font-semibold">E-mail:</span> demo@nordivia.com</div>
            <div><span className="font-semibold">Senha:</span> Demo@12345</div>
            <div className="mt-3 text-xs">
              Observação: fluxo de pagamento é mock (UI/UX). Integre gateway em produção.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
