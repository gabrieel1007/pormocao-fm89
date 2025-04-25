import prisma from "@/server/shared/prisma";

export async function getPromotions() {
  return await prisma.promotion.findMany();
}
