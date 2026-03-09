"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/locales";
import { useCart, type CartItem } from "@/components/cart/cartStore";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export function AddToCartButton({
  product,
  locale,
}: {
  product: Omit<CartItem, "qty">;
  locale: AppLocale;
}) {
  const tProducts = useTranslations("products");
  const tNav = useTranslations("nav");

  const { add } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="btn-primary"
        onClick={() => {
          add(product, 1);
          setOpen(true);
        }}
      >
        {tProducts("addToCart")}
      </button>

      <Link className="btn-secondary" href={`/${locale}/cart`}>
        {tNav("cart")}
      </Link>

      <Modal open={open} onClose={() => setOpen(false)} title={tProducts("modalAdded")}>
        <div className="text-sm text-black/70">
          <div className="mb-4">{tProducts("modalAdded")}.</div>

          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              {tProducts("continueShopping")}
            </Button>

            <Link className="btn-primary" href={`/${locale}/checkout`}>
              {tProducts("goToCheckout")}
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
