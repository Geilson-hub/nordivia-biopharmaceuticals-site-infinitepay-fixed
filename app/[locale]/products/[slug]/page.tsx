// app/[locale]/products/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { AppLocale } from "@/i18n/locales";
import { getTranslations } from "next-intl/server";

import { getProductBySlug, productsBase, getDetailsByLocale } from "../data";

export function generateStaticParams() {
  return productsBase.map((p) => ({ slug: p.slug }));
}

function hasText(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export default async function ProductDetailsPage({
  params
}: {
  params: { locale: AppLocale; slug: string };
}) {
  const t = await getTranslations({ locale: params.locale, namespace: "products.details" });

  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  // ✅ pega o details no idioma certo (com fallback)
  const details = getDetailsByLocale(product.details, params.locale);

  const showIndication = hasText(details?.indication);
  const showMechanism = hasText(details?.mechanism);
  const showBenefits = Array.isArray(details?.benefits) && details.benefits.length > 0;

  return (
    <main className="mt-6 flex flex-wrap gap-2">
      <Link className="btn-primary" href={`/${params.locale}/contact`}>
        {t("actions.requestInfo")}
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="card overflow-hidden">
          <div className="bg-black/5 p-6">
            <Image
              src={product.imagePath}
              alt={`${product.name} ${product.concentration}`}
              width={1200}
              height={1200}
              className="h-[420px] w-full object-contain"
              priority
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold">{product.name}</h1>
          <div className="mt-1 text-black/70">{product.concentration}</div>

          {showIndication || showMechanism || showBenefits ? (
            <div className="mt-6 space-y-6">
              {showIndication && (
                <section className="rounded-2xl border border-black/10 bg-white p-5">
                  <h2 className="text-lg font-extrabold">{t("sections.indication")}</h2>
                  <p className="mt-2 text-sm text-black/70 leading-relaxed">{details.indication}</p>
                </section>
              )}

              {showMechanism && (
                <section className="rounded-2xl border border-black/10 bg-white p-5">
                  <h2 className="text-lg font-extrabold">{t("sections.mechanism")}</h2>
                  <p className="mt-2 text-sm text-black/70 leading-relaxed">{details.mechanism}</p>
                </section>
              )}

              {showBenefits && (
                <section className="rounded-2xl border border-black/10 bg-white p-5">
                  <h2 className="text-lg font-extrabold">{t("sections.benefits")}</h2>
                  <ul className="mt-2 list-disc pl-5 text-sm text-black/70 space-y-1">
                    {details.benefits.map((b, i) => (
                      <li key={`${product.slug}-benefit-${i}`}>{b}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5 text-sm text-black/70">
              {t("empty")}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            <Link className="btn-primary" href={`/${params.locale}/contact`}>
              {t("actions.requestInfo")}
            </Link>
          </div>
        </div>
      </div>
    </main>

  );
}