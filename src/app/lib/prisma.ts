import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!(globalThis as any).prisma) {
    (globalThis as any).prisma = new PrismaClient({
      log: ["query", "error", "warn"],
    });
  }
  prisma = (globalThis as any).prisma;
}

export default prisma;
