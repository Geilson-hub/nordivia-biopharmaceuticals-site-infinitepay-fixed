import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validation";
import { createSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const data = parsed.data;
  const exists = await prisma.user.findUnique({ where: { email: data.email } });
  if (exists) {
    return NextResponse.json({ error: "E-mail já cadastrado." }, { status: 409 });
  }

  const hash = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      phone: data.phone,
      phoneIsWhats: data.phoneIsWhats,
      email: data.email,
      cpf: data.cpf ? String(data.cpf).trim() || null : null,
      address: data.address ? String(data.address).trim() || null : null,
      marketingOpt: data.marketingOpt,
      passwordHash: hash,
    },
    select: { id: true, email: true },
  });

  await createSessionCookie({ uid: user.id, email: user.email });
  return NextResponse.json({ ok: true });
}
