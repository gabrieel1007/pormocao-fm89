"use server";

import { createPromotionDto } from "@/server/interfaces/promotions/create-promotion.dto";
import prisma from "@/server/shared/prisma";
import { randomUUID } from "node:crypto";

export async function createPromotion(input: createPromotionDto) {
  await prisma.promotion.create({
    data: {
      id: randomUUID(),
      ...input,
    },
  });
}
