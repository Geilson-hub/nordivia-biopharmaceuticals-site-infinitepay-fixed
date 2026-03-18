"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { AppLocale } from "@/i18n/locales";
import { useRouter } from "next/navigation";

export function RegisterForm({ locale }: { locale: AppLocale }) {
  const t = useTranslations("auth.register.form");
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget as HTMLFormElement);

    const payload = {
      fullName: String(fd.get("fullName") || ""),
      phone: String(fd.get("phone") || ""),
      phoneIsWhats: fd.get("phoneIsWhats") === "on",
      email: String(fd.get("email") || ""),
      password: String(fd.get("password") || ""),
      cpf: String(fd.get("cpf") || ""),
      address: String(fd.get("address") || ""),
      marketingOpt: fd.get("marketingOpt") === "on"
    };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || t("errors.default"));
      return;
    }

    router.push(`/${locale}/products`);
    router.refresh();
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="label">{t("fullName.label")}</div>
          <Input name="fullName" required placeholder={t("fullName.placeholder")} />
        </div>

        <div>
          <div className="label">{t("phone.label")}</div>
          <Input name="phone" required placeholder={t("phone.placeholder")} />
          <label className="mt-2 flex items-center gap-2 text-sm text-black/70">
            <input name="phoneIsWhats" type="checkbox" className="h-4 w-4" />
            {t("phoneIsWhats")}
          </label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="label">{t("email.label")}</div>
          <Input name="email" type="email" required placeholder={t("email.placeholder")} />
        </div>

        <div>
          <div className="label">{t("password.label")}</div>
          <Input name="password" type="password" required placeholder={t("password.placeholder")} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="label">{t("cpf.label")}</div>
          <Input name="cpf" placeholder={t("cpf.placeholder")} />
        </div>

        <div>
          <div className="label">{t("address.label")}</div>
          <Input name="address" placeholder={t("address.placeholder")} />
        </div>
      </div>

      <label className="flex items-start gap-2 text-sm text-black/70">
        <input name="marketingOpt" type="checkbox" className="mt-1 h-4 w-4" defaultChecked />
        {t("marketingOpt")}
      </label>

      {error ? (
        <div className="rounded-xl border border-maple/30 bg-maple/5 p-3 text-sm text-maple">
          {error}
        </div>
      ) : null}

      <Button disabled={loading} type="submit">
        {loading ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}