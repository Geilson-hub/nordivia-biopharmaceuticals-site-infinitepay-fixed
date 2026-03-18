// app/[locale]/products/page.tsx

import { ProductsClient } from "./ui";
import type { AppLocale } from "@/i18n/locales";
import { productsBase } from "./data";

function formatBRL(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

function formatUSD(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default function ProductsPage({
  params,
}: {
  params: { locale: AppLocale };
}) {
  // taxa simples por enquanto (depois você me manda a regra real)
  const brlPerUsd = 5.50; // 1 USD = 5 BRL (exemplo)

  const data = productsBase.map((p) => {
    // converte BRL cents -> USD cents (mantendo precisão em cents)
    const usdCents = Math.round(p.brlCents / brlPerUsd);

    return {
      ...p,
      slug: p.id,
      leafletPath: `/leaflets/${p.id}.pdf`,
      brlFormatted: formatBRL(p.brlCents),
      usd: usdCents,
      usdFormatted: formatUSD(usdCents),
    };
  });

  return (
    <main className="py-20 max-w-7xl mx-auto px-4">
      <ProductsClient locale={params.locale} products={data} />
    </main>
  );
}
