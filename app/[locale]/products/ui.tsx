"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/locales";
import { useCart } from "@/components/cart/cartStore";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export type P = {
  id: string;
  slug: string;
  name: string;
  concentration: string;
  brlCents: number;
  brlFormatted: string;
  usd: number;
  usdFormatted: string;
  imagePath: string;
  leafletPath: string;
};

export function ProductsClient({
  locale,
  products,
}: {
  locale: AppLocale;
  products: P[];
}) {
  const t = useTranslations("products");
  const { add } = useCart();
  const [q, setQ] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);

  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products;
    return products.filter((p) =>
      (p.name + " " + p.concentration).toLowerCase().includes(s)
    );
  }, [q, products]);

  function addToCart(p: P) {
    add(
      {
        productId: p.id,
        slug: p.slug,
        name: p.name,
        concentration: p.concentration,
        imagePath: p.imagePath,
        unitCents: p.brlCents,
      },
      1
    );
    setModalOpen(true);
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <input
          className="input max-w-md"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("search")}
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div key={p.id} className="card overflow-hidden">
            <div className="bg-black/5 p-4">
              <Image
                src={p.imagePath}
                alt={p.name}
                width={900}
                height={1200}
                className="h-[260px] w-full object-contain"
              />
            </div>

            <div className="p-5">
              <div className="text-lg font-extrabold">{p.name}</div>
              <div className="text-sm text-black/70">
                {p.concentration}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-xl border border-black/10 bg-white p-3">
                  <div className="text-xs text-black/50">BRL</div>
                  <div className="font-extrabold">{p.brlFormatted}</div>
                </div>
                <div className="rounded-xl border border-black/10 bg-white p-3">
                  <div className="text-xs text-black/50">USD</div>
                  <div className="font-extrabold">{p.usdFormatted}</div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  className="btn-primary"
                  onClick={() => addToCart(p)}
                >
                  {t("addToCart")}
                </button>

                <Link
                  className="btn-secondary"
                  href={`/${locale}/products/${p.slug}`}
                >
                   {t("viewDetails")}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t("modalAdded")}
      >
        <div className="text-sm text-black/70">
          <div className="mb-4">{t("modalAdded")}.</div>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setModalOpen(false)}
            >
              {t("continueShopping")}
            </Button>

            <Link
              className="btn-primary"
              href={`/${locale}/checkout`}
            >
              {t("goToCheckout")}
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
