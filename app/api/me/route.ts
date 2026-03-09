import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth";
import { updateProfileSchema } from "@/lib/validation";

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.uid },
    select: {
      id: true,
      fullName: true,
      phone: true,
      phoneIsWhats: true,
      email: true,
      cpf: true,
      address: true,
      marketingOpt: true,
    },
  });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(user);
}

export async function PATCH(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = updateProfileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "CPF e endereço são obrigatórios e devem ser válidos." }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: session.uid },
    data: {
      cpf: parsed.data.cpf.trim(),
      address: parsed.data.address.trim(),
    },
    select: {
      id: true,
      fullName: true,
      phone: true,
      phoneIsWhats: true,
      email: true,
      cpf: true,
      address: true,
    },
  });

  return NextResponse.json(user);
}
