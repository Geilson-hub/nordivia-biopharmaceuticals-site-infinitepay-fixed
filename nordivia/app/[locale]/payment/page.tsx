"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/locales";
import { formatBRLFromCents } from "@/lib/money";
import { Button } from "@/components/ui/Button";

type Order = {
  id: string;
  totalBrl: number;
  status: string;
  items: {
    id: string;
    qty: number;
    unitBrl: number;
    product: {
      name: string;
      concentration: string;
    };
  }[];
};

export default function PaymentPage({
  params: { locale },
}: {
  params: { locale: AppLocale };
}) {
  const t = useTranslations("payment");
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = React.useState<Order | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loadingPay, setLoadingPay] = React.useState(false);

  React.useEffect(() => {
    let active = true;

    async function loadOrder() {
      if (!orderId) return;

      try {
        const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          if (active) setError(t("orderNotFound"));
          return;
        }

        const data = await res.json();

        if (active) setOrder(data);
      } catch {
        if (active) setError(t("orderNotFound"));
      }
    }

    loadOrder();

    return () => {
      active = false;
    };
  }, [orderId, t]);

  if (!orderId) {
    return (
      <main className="container-max py-12">
        <div className="card p-6 text-black/70">
          {t("missingOrderId")}
        </div>
      </main>
    );
  }

  return (
    <main className="container-max py-12">
      <h1 className="text-3xl font-extrabold">{t("title")}</h1>

      <p className="mt-2 text-black/70">
        {t("orderLabel")}:{" "}
        <span className="font-semibold">{orderId}</span>
      </p>

      {error && (
        <div className="mt-6 card p-6 text-maple">
          {error}
        </div>
      )}

      {!order ? (
        <div className="mt-6 card p-6 text-black/70">
          Carregando pedido...
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_360px]">

          {/* método pagamento */}

          <div className="card p-6">
            <div className="text-sm font-extrabold">
              {t("methodTitle")}
            </div>

            <div className="mt-4 rounded-2xl border border-black/10 bg-white p-5 text-sm text-black/70 leading-relaxed">
              <div className="font-extrabold text-black">
                {t("picpay")}
              </div>

              <div className="mt-2">
                {t("picpayHint")}
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="maple"
                disabled={loadingPay}
                onClick={async () => {
                  try {
                    setError(null);
                    setLoadingPay(true);

                    const res = await fetch("/api/payments/picpay/create", {
                      method: "POST",
                      headers: {
                        "content-type": "application/json",
                      },
                      body: JSON.stringify({ orderId }),
                    });

                    const data = await res.json().catch(() => ({}));

                    if (!res.ok)
                      throw new Error(data?.error || t("startError"));

                    if (data?.url) {
                      window.location.href = data.url;
                    } else {
                      throw new Error(t("missingUrl"));
                    }
                  } catch (err: any) {
                    setError(err?.message || t("startError"));
                  } finally {
                    setLoadingPay(false);
                  }
                }}
              >
                {loadingPay ? t("opening") : t("confirm")}
              </Button>
            </div>
          </div>

          {/* resumo pedido */}

          <div className="card p-6 h-fit">
            <div className="text-sm font-extrabold">
              {t("summaryTitle")}
            </div>

            <div className="mt-4 grid gap-3 text-sm text-black/70">

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-3"
                >
                  <div>
                    <div className="font-semibold text-black">
                      {item.product.name}
                    </div>

                    <div className="text-xs">
                      {item.product.concentration} • {t("qty")}{" "}
                      {item.qty}
                    </div>
                  </div>

                  <div className="font-extrabold text-black">
                    {formatBRLFromCents(item.unitBrl * item.qty)}
                  </div>
                </div>
              ))}

              <div className="mt-2 flex justify-between border-t border-black/10 pt-3">
                <span>{t("total")}</span>

                <span className="font-extrabold text-black">
                  {formatBRLFromCents(order.totalBrl)}
                </span>
              </div>
            </div>
          </div>

        </div>
      )}
    </main>
  );
}