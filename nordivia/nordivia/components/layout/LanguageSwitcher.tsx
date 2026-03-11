"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AppLocale, locales } from "@/i18n/locales";

function replaceLocale(pathname: string, locale: AppLocale) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${locale}`;
  if (locales.includes(parts[0] as any)) parts[0] = locale;
  else parts.unshift(locale);
  return "/" + parts.join("/");
}

function FlagButton({
  href,
  active,
  src,
  alt,
  label,
}: {
  href: string;
  active: boolean;
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={`flex items-center justify-center rounded-full w-9 h-9 transition
        ${active ? "bg-black/90 ring-2 ring-black/10" : "hover:bg-black/5"}`}
    >
      <span className="relative w-6 h-6 rounded-full overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover" sizes="24px" />
      </span>
    </Link>
  );
}

export function LanguageSwitcher({ current }: { current: AppLocale }) {
  const pathname = usePathname() || "/";

  return (
    <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white/80 backdrop-blur px-1 py-1 shadow-sm">
      <FlagButton
        href={replaceLocale(pathname, "pt-br")}
        active={current === "pt-br"}
        src="/flags/br.webp"
        alt="Brasil"
        label="Português (Brasil)"
      />
      <FlagButton
        href={replaceLocale(pathname, "en-ca")}
        active={current === "en-ca"}
        src="/flags/ca.webp"
        alt="Canadá"
        label="English (Canada)"
      />
    </div>
  );
}
