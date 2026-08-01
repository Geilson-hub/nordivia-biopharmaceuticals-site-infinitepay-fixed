const globalForPrisma = globalThis as unknown as {
  // eslint-disable-next-line
  prisma: any;
};

// eslint-disable-next-line
let _client: any;

export async function getPrisma() {
  if (!_client) {
    const { PrismaClient } = await import("@prisma/client");
    _client = new PrismaClient({
      log: process.env.NODE_ENV === "production" ? ["error"] : ["error", "warn"],
    });
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = _client;
    }
  }
  return _client;
}
