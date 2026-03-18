"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { WHATSAPP_NUMBER_E164 } from "../../../lib/whatsapp";

type Me = {
  fullName: string;
  phone: string;
  email: string;
};

export default function ContactPage() {
  const t = useTranslations("contact");
  const [me, setMe] = React.useState<Me | null>(null);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      const res = await fetch("/api/me", { cache: "no-store" });
      if (!res.ok) return;

      const j = await res.json();
      setMe({
        fullName: j.fullName,
        phone: j.phone,
        email: j.email,
      });
    })();
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(false);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !email || !phone || !message) {
      setError(t("errorRequired"));
      return;
    }

    const text =
      `${t("wa.header")}\n\n` +
      `${t("wa.name")}: ${name}\n` +
      `${t("wa.email")}: ${email}\n` +
      `${t("wa.phone")}: ${phone}\n\n` +
      `${t("wa.message")}:\n${message}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(text)}`;

    setSent(true);
    window.open(url, "_blank", "noopener,noreferrer");
    e.currentTarget.reset();
  }

  return (
    <main className="container-max py-12">
      <h1 className="text-3xl font-extrabold">{t("title")}</h1>
      <p className="mt-2 text-black/70">{t("subtitle")}</p>

      <div className="mt-8 card p-6 max-w-2xl">
        <form className="grid gap-4" onSubmit={onSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="label">{t("name")}</div>
              <Input name="name" required defaultValue={me?.fullName ?? ""} />
            </div>

            <div>
              <div className="label">{t("phone")}</div>
              <Input name="phone" required defaultValue={me?.phone ?? ""} />
            </div>
          </div>

          <div>
            <div className="label">{t("email")}</div>
            <Input
              name="email"
              required
              type="email"
              defaultValue={me?.email ?? ""}
            />
          </div>

          <div>
            <div className="label">{t("message")}</div>
            <Textarea name="message" required />
          </div>

          {sent ? (
            <div className="rounded-xl border border-black/10 bg-black/5 p-3 text-sm">
              {t("sentWhatsapp")}
            </div>
          ) : null}

          {error ? (
            <div className="rounded-xl border border-maple/30 bg-maple/5 p-3 text-sm text-maple">
              {error}
            </div>
          ) : null}

          <Button type="submit">{t("sendWhatsapp")}</Button>
        </form>
      </div>
    </main>
  );
}