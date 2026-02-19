import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.ts";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

try {
  const count = await prisma.listings.count();
  console.log("listings", count);
} finally {
  await prisma.$disconnect();
}
