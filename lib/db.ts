import type { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let _client: PrismaClient | undefined;

export async function getPrisma(): Promise<PrismaClient> {
  if (!_client) {
    const { PrismaClient: PC } = await import("@prisma/client");
    _client = new PC({
      log: process.env.NODE_ENV === "production" ? ["error"] : ["error", "warn"],
    });
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = _client;
    }
  }
  return _client;
}
