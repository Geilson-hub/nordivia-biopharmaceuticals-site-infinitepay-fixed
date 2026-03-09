"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/locales";
import { useCart } from "@/components/cart/cartStore";
import { formatBRLFromCents } from "@/lib/money";
import { Input } from "@/components/ui/Input";

const SHIPPING_CENTS = 5000; // R$ 50 fixo

export default function CartPage({ params: { locale } }: { params: { locale: AppLocale } }) {
  const t = useTranslations("cart");
  const { items, setQty, remove } = useCart();

  const subtotalCents = items.reduce((acc, it) => acc + it.unitCents * it.qty, 0);
  const shippingCents = items.length > 0 ? SHIPPING_CENTS : 0;
  const totalCents = subtotalCents + shippingCents;

  return (
    <main className="container-max py-12">
      <div className="flex items-end justify-between gap-3">
        <h1 className="text-3xl font-extrabold">{t("title")}</h1>

        <Link className="btn-secondary" href={`/${locale}/products`}>
          {t("continue")}
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-8 card p-6 text-black/70">{t("empty")}</div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_320px]">
          <div className="card p-5">
            <div className="grid gap-4">
              {items.map((it) => (
                <div
                  key={it.productId}
                  className="flex gap-4 border-b border-black/10 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="w-24 rounded-xl bg-black/5 p-2">
                    <Image
                      src={it.imagePath}
                      alt={it.name}
                      width={900}
                      height={1200}
                      className="h-24 w-full object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="font-extrabold">{it.name}</div>
                    <div className="text-sm text-black/70">{it.concentration}</div>
                    <div className="mt-2 text-sm text-black/70">
                      {formatBRLFromCents(it.unitCents)} / un
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="text-xs font-semibold text-black/60">{t("qty")}</div>

                    <Input
                      type="number"
                      min={1}
                      value={it.qty}
                      onChange={(e) => setQty(it.productId, Number(e.target.value || 1))}
                      className="w-20 text-center"
                    />

                    <button className="text-sm font-semibold text-maple" onClick={() => remove(it.productId)}>
                      {t("remove")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5 h-fit">
            <div className="text-sm font-extrabold">{t("total")}</div>

            <div className="mt-3 grid gap-2 text-sm text-black/70">
              <div className="flex items-center justify-between">
                <span>{t("subtotal")}</span>
                <span className="font-extrabold text-black">{formatBRLFromCents(subtotalCents)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>{t("shipping")}</span>
                <span className="font-extrabold text-black">{formatBRLFromCents(shippingCents)}</span>
              </div>

              <div className="flex items-center justify-between border-t border-black/10 pt-2">
                <span className="font-semibold">{t("grandTotal")}</span>
                <span className="font-extrabold text-black">{formatBRLFromCents(totalCents)}</span>
              </div>
            </div>

            <div className="mt-5">
              <Link className="btn-primary w-full" href={`/${locale}/checkout`}>
                {t("checkout")}
              </Link>
            </div>

            <div className="mt-3 text-xs text-black/60">
              {t("installmentsHint")}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}