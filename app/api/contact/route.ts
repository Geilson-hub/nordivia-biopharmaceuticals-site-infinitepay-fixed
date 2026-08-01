import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth";
import { contactSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const prisma = await getPrisma();
  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const session = await getSessionFromRequest(req);

  await prisma.contactMessage.create({
    data: {
      userId: session?.uid ?? null,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message,
    },
  });

  return NextResponse.json({ ok: true });
}
