import prismaPkg from "@prisma/client";

const { PrismaClient } = prismaPkg;
const prisma = new PrismaClient();

try {
  const count = await prisma.listings.count();
  console.log("listings", count);
} finally {
  await prisma.$disconnect();
}
