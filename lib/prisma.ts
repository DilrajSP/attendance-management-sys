export const runtime = "nodejs";

import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const caPath = path.join(process.cwd(), "ca.pem");
console.log("🔐 CA PEM exists:", fs.existsSync(caPath));

// 👇 declare prisma on globalThis (TS-safe)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
