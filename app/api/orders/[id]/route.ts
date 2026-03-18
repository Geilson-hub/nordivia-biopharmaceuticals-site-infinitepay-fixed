import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      items: { include: { product: true } },
    },
  });

  if (!order || order.userId !== session.uid) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: order.id,
    totalBrl: order.totalBrl,
    status: order.status,
    items: order.items.map((it) => ({
      id: it.id,
      qty: it.qty,
      unitBrl: it.unitBrl,
      product: { name: it.product.name, concentration: it.product.concentration },
    })),
  });
}
