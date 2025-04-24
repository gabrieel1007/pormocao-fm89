"use server";

import prisma from "@/server/shared/prisma";
import { randomUUID } from "node:crypto";

export async function createForm(formData: FormData) {
  const inputData = {
    //bannerUrl: formData.get("bannerUrl") as string,
    bannerUrl: "urlqualqueraqui",
    title: formData.get("title") as string,
    linkUrl: formData.get("linkUrl") as string,
    description: formData.get("description") as string,
    startDate: new Date(formData.get("startDate") as string),
    endDate: new Date(formData.get("endDate") as string),
  };

  await prisma.promotion.create({
    data: {
      id: randomUUID(),
      ...inputData,
    },
  });
}
