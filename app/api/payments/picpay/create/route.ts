import { NextResponse, NextRequest } from "next/server";
import { getPrisma } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const prisma = await getPrisma();
    const body = await req.json().catch(() => null);
    const { orderId } = body ?? {};

    if (!orderId) {
      return NextResponse.json({ error: "orderId obrigat\u00f3rio" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Pedido n\u00e3o encontrado" }, { status: 404 });
    }

    if (order.status !== "PENDING") {
      return NextResponse.json({ error: "Pedido j\u00e1 processado" }, { status: 400 });
    }

    const session = await getSessionFromRequest(req);
    if (!session || session.uid !== order.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const invoiceSlug = `inv_${crypto.randomBytes(8).toString("hex")}`;
    const paymentUrl = `https://api.picpay.com/ecommerce/public/orders/${orderId}/payments`;

    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentProvider: "PICPAY",
        invoiceSlug,
        paymentUrl,
      },
    });

    const url = `https://app.picpay.com/pay/${invoiceSlug}`;
    return NextResponse.json({ url, orderId, invoiceSlug });
  } catch (error) {
    console.error("PICPAY_CREATE_ERROR", error);
    return NextResponse.json({ error: "Erro interno ao iniciar pagamento." }, { status: 500 });
  }
}

