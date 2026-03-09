import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AppLocale } from "@/i18n/locales";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getSessionFromCookies } from "@/lib/auth";

export async function Header({ locale }: { locale: AppLocale }) {
  const t = await getTranslations({ locale });
  const session = await getSessionFromCookies();

  return (
    <header className="sticky top-0 z-50">
      {/* “espaço” para parecer o mock */}
      <div className="pt-3">
        <div className="container-max">
          {/* Card do header */}
          <div className="rounded-2xl border border-black/10 bg-white/85 backdrop-blur shadow-sm">
            <div className="flex h-16 items-center justify-between gap-3 px-5">
              <Link href={`/${locale}`} className="flex items-center gap-3">
                <Image src="/brand/logo.svg" alt="Nordivia" width={160} height={44} priority />
              </Link>

              <nav className="hidden items-center gap-6 md:flex text-sm font-semibold text-black/70">
                {/* Se quiser igual o mock, “Quem somos” fica como âncora */}
                <Link href={`/${locale}#about`} className="hover:text-black">
                  {t("nav.about")}
                </Link>
                <Link href={`/${locale}/products`} className="hover:text-black">
                  {t("nav.products")}
                </Link>
                <Link href={`/${locale}/cart`} className="hover:text-black">
                  {t("nav.cart")}
                </Link>

                {/* Se você quiser manter contato, ok. No mock não tem. */}
                <Link href={`/${locale}/contact`} className="hover:text-black">
                  {t("nav.contact")}
                </Link>
              </nav>

              <div className="flex items-center gap-3">
                <LanguageSwitcher current={locale} />

                {session ? (
                  <form action={`/api/auth/logout`} method="post">
                    <button className="btn-secondary">{t("nav.logout")}</button>
                  </form>
                ) : (
                  <div className="hidden sm:flex items-center gap-2">
                    <Link className="btn-secondary" href={`/${locale}/login`}>
                      {t("nav.login")}
                    </Link>
                    <Link className="btn-primary" href={`/${locale}/register`}>
                      {t("nav.register")}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Linha de separação sutil (opcional) */}
          <div className="h-3" />
        </div>
      </div>
    </header>
  );
}
