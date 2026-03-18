"use client";

import { useRouter } from "next/navigation";
import type { AppLocale } from "@/i18n/locales";

export function LogoutButton({ label, locale }: { label: string; locale: AppLocale }) {
  const router = useRouter();
  return (
    <button
      className="btn-secondary"
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push(`/${locale}`);
        router.refresh();
      }}
    >
      {label}
    </button>
  );
}
