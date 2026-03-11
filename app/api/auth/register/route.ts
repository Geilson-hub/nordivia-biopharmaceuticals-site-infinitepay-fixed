import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validation";
import { createSessionToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
    }

    const {
      fullName,
      phone,
      phoneIsWhats,
      email,
      password,
      cpf,
      address,
      marketingOpt,
    } = parsed.data;

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Este e-mail já está cadastrado." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName,
        phone,
        phoneIsWhats,
        email,
        passwordHash,
        cpf: cpf || null,
        address: address || null,
        marketingOpt,
      },
    });

    const token = await createSessionToken({
      uid: user.id,
      email: user.email,
    });

    const res = NextResponse.json({ ok: true });
    setSessionCookie(res, token);

    return res;
  } catch (error) {
    console.error("REGISTER_ERROR", error);
    return NextResponse.json(
      { error: "Erro interno no cadastro." },
      { status: 500 }
    );
  }
}