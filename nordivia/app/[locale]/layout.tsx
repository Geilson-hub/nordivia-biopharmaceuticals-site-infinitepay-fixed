import * as React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type AppLocale } from "@/i18n/locales";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/cartStore";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: AppLocale };
}) {
  if (!locales.includes(locale)) notFound();

  // ✅ importantíssimo: fixa o locale desta renderização
  setRequestLocale(locale);

  // ✅ pega as mensagens do locale atual (config do next-intl)
  const messages = await getMessages();

  return (
    <html lang={locale === "pt-br" ? "pt-BR" : "en-CA"}>
      <body>
        <a
          href="https://wa.me/5511956970564"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-white shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="h-5 w-5 fill-white"
          >
            <path d="M16 0C7.164 0 0 7.163 0 16c0 2.82.735 5.476 2.02 7.783L0 32l8.478-2.21A15.92 15.92 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.505 0-4.935-.67-7.06-1.937l-.504-.298-5.03 1.31 1.344-4.9-.33-.513A13.274 13.274 0 0 1 2.667 16C2.667 8.65 8.65 2.667 16 2.667S29.333 8.65 29.333 16 23.35 29.333 16 29.333zm7.27-9.946c-.398-.199-2.356-1.16-2.72-1.292-.365-.133-.63-.199-.896.199-.265.398-1.027 1.292-1.26 1.557-.232.265-.464.298-.862.1-.398-.199-1.68-.619-3.198-1.972-1.18-1.052-1.977-2.35-2.21-2.748-.232-.398-.025-.613.174-.812.18-.18.398-.464.597-.697.199-.232.265-.398.398-.663.133-.265.066-.498-.033-.697-.1-.199-.896-2.16-1.227-2.958-.322-.774-.65-.67-.896-.683l-.764-.013c-.265 0-.697.1-1.06.498-.365.398-1.392 1.36-1.392 3.314 0 1.953 1.425 3.84 1.623 4.106.199.265 2.804 4.28 6.793 6.004.949.41 1.689.655 2.267.839.952.303 1.82.26 2.505.158.764-.114 2.356-.963 2.688-1.893.332-.93.332-1.728.232-1.893-.1-.166-.365-.265-.764-.464z" />
          </svg>
          <span className="text-sm font-bold hidden sm:inline">WhatsApp</span>
        </a>

        <NextIntlClientProvider locale={locale} messages={messages}>
          <CartProvider>
            <Header locale={locale} />
            {children}
            <Footer />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}