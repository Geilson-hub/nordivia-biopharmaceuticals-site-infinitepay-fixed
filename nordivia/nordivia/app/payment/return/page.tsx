"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function PaymentReturnPage() {
  const sp = useSearchParams();
  const router = useRouter();

  // Parâmetros enviados pela PicPay (conforme docs):
  const receiptUrl = sp.get("receipt_url");
  const orderNsu = sp.get("order_nsu");
  const slug = sp.get("slug");
  const transactionNsu = sp.get("transaction_nsu");
  const captureMethod = sp.get("capture_method");

  const [status, setStatus] = React.useState<string>("Verificando pagamento...");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      if (!orderNsu || !slug || !transactionNsu) {
        setStatus("Retorno recebido. Se o pedido ainda não estiver como pago, o webhook irá atualizar em instantes.");
        return;
      }
      // Confirmação manual (opcional). Webhook continua sendo o caminho principal.
      const res = await fetch("/api/payments/PicPay/check", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ order_nsu: orderNsu, slug, transaction_nsu: transactionNsu }),
      });
      const j = await res.json().catch(() => null);
      if (!res.ok) {
        setStatus("Retorno recebido. Não foi possível confirmar automaticamente.");
        setError(j?.error || "Erro ao confirmar.");
        return;
      }
      if (j?.paid) setStatus("Pagamento confirmado. Obrigado!");
      else setStatus("Retorno recebido. Pagamento ainda não confirmado.");
    })();
  }, [orderNsu, slug, transactionNsu]);

  return (
    <main className="container-max py-12">
      <h1 className="text-3xl font-extrabold">Pagamento</h1>
      <p className="mt-3 text-black/70">{status}</p>
      {error ? <div className="mt-4 card p-4 text-maple">{error}</div> : null}
      <div className="mt-6 grid gap-3 text-sm text-black/70">
        {orderNsu ? <div><span className="font-semibold text-black">Pedido:</span> {orderNsu}</div> : null}
        {captureMethod ? <div><span className="font-semibold text-black">Método:</span> {captureMethod}</div> : null}
        {receiptUrl ? (
          <div>
            <span className="font-semibold text-black">Comprovante:</span> {" "}
            <a className="underline" href={receiptUrl} target="_blank" rel="noreferrer">abrir</a>
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex gap-3">
        <Button variant="maple" onClick={() => router.push("/pt-br/products")}>Voltar à loja</Button>
        {orderNsu ? (
          <Button variant="secondary" onClick={() => router.push(`/pt-br/payment?orderId=${encodeURIComponent(orderNsu)}`)}>
            Ver pedido
          </Button>
        ) : null}
      </div>
    </main>
  );
}
