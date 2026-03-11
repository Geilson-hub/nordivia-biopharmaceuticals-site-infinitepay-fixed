import Image from "next/image";
import { prisma } from "@/lib/db";
import type { AppLocale } from "@/i18n/locales";
import { getTranslations } from "next-intl/server";

export default async function LeafletsPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  const t = await getTranslations({ locale });
  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });

  return (
    <main className="container-max py-12">
      <h1 className="text-3xl font-extrabold">{t("leaflets.title")}</h1>
      <p className="mt-2 text-black/70">Clique para baixar a bula do produto.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <a
            key={p.id}
            href={p.leafletPath}
            download
            className="card overflow-hidden hover:opacity-95 transition"
          >
            <div className="bg-black/5 p-4">
              <Image src={p.imagePath} alt={p.name} width={900} height={1200} className="h-[260px] w-full object-contain" />
            </div>
            <div className="p-5">
              <div className="text-lg font-extrabold">{p.name}</div>
              <div className="text-sm text-black/70">{p.concentration}</div>
              <div className="mt-3 inline-flex rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold">
                {t("leaflets.download")}
              </div>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
