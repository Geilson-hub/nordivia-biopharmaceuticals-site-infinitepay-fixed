import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth";
import { z } from "zod";

const SHIPPING_CENTS = 5000; // R$ 50,00 fixo para todo Brasil

const itemSchema = z.object({
  productId: z.string(),
  qty: z.number().int().min(1),
  unitCents: z.number().int().min(1),
});

const bodySchema = z.object({
  items: z.array(itemSchema).min(1),
});

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.uid },
    select: { cpf: true, address: true },
  });

  if (!user?.cpf || !user?.address) {
    return NextResponse.json(
      { error: "CPF e endereço são obrigatórios para concluir a compra." },
      { status: 400 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Carrinho inválido." }, { status: 400 });
  }

  // Validate products server-side (prevents tampering)
  const productIds = parsed.data.items.map((x) => x.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
  const byId = new Map(products.map((p) => [p.id, p]));

  let total = 0;
  const itemsCreate: { productId: string; qty: number; unitBrl: number }[] = [];

  for (const it of parsed.data.items) {
    const p = byId.get(it.productId);
    if (!p) return NextResponse.json({ error: "Produto inválido." }, { status: 400 });

    const unitBrl = p.brlPrice;
    total += unitBrl * it.qty;
    itemsCreate.push({ productId: p.id, qty: it.qty, unitBrl });
  }

  // + frete fixo
  total += SHIPPING_CENTS;

  const order = await prisma.order.create({
    data: {
      userId: session.uid,
      totalBrl: total,
      items: { create: itemsCreate },
      // Se quiser guardar frete separado depois, a gente ajusta o schema.prisma
    },
    select: { id: true },
  });

  return NextResponse.json({ orderId: order.id });
}