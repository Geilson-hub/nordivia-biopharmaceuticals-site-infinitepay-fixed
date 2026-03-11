"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import type { AppLocale } from "@/i18n/locales";

export function LoginForm({ locale }: { locale: AppLocale }) {
  const t = useTranslations();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const payload = {
      email: String(fd.get("email") || ""),
      password: String(fd.get("password") || ""),
    };

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Falha no login.");
      return;
    }

    router.push(`/${locale}/products`);
    router.refresh();
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div>
        <div className="label">{t("auth.email")}</div>
        <Input name="email" type="email" required placeholder="email@exemplo.com" />
      </div>
      <div>
        <div className="label">{t("auth.password")}</div>
        <Input name="password" type="password" required />
      </div>

      {error ? <div className="rounded-xl border border-maple/30 bg-maple/5 p-3 text-sm text-maple">{error}</div> : null}

      <Button disabled={loading} type="submit">
        {loading ? "..." : t("auth.submitLogin")}
      </Button>
    </form>
  );
}
