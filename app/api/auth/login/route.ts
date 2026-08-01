import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { loginSchema } from "@/lib/validation";
import { createSessionToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "E-mail ou senha inválidos." }, { status: 400 });
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, passwordHash: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "E-mail ou senha inválidos." },
        { status: 401 }
      );
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);

    if (!passwordValid) {
      return NextResponse.json(
        { error: "E-mail ou senha inválidos." },
        { status: 401 }
      );
    }

    const token = await createSessionToken({
      uid: user.id,
      email: user.email,
    });

    const res = NextResponse.json({ ok: true });
    setSessionCookie(res, token);

    return res;
  } catch (error) {
    console.error("LOGIN_ERROR", error);
    return NextResponse.json(
      { error: "Erro interno no login." },
      { status: 500 }
    );
  }
}