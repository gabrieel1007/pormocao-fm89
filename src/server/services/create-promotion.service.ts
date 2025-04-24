"use server";

import { initMinioClient, upload } from "@/server/bucket/bucket";
import { buildUrlBucket } from "@/server/bucket/functions/build-url-bucket";
import { convertToWebp } from "@/server/bucket/functions/convert-to-webp";
import { UploadInput } from "@/server/interfaces/bucket/upload-input";
import {
  dateRangeSchema,
  promotionInputSchema,
} from "@/server/interfaces/zod/promotion-input-schema";
import { createPromotion } from "@/server/promotions/create-promotion";
import { createPromotionDto } from "@/server/interfaces/promotions/create-promotion.dto";
import { errorMapper } from "@/server/shared/error-mapper";
import { errorDto } from "@/server/interfaces/error/error.dto";

export async function createPromotionService(formData: FormData) {
  const inputFormData = {
    bannerUrl: formData.get("banner") as File,
    title: formData.get("title") as string,
    linkUrl: formData.get("linkUrl") as string,
    description: formData.get("description") as string,
    startDate: new Date(formData.get("startDate") as string),
    endDate: new Date(formData.get("endDate") as string),
  };

  const inputFormDataValid = promotionInputSchema.safeParse(inputFormData);
  if (!inputFormDataValid.success) {
    return errorMapper(inputFormDataValid.error);
  }

  const verifyDate = dateRangeSchema.safeParse({
    startDate: inputFormData.startDate,
    endDate: inputFormData.endDate,
  });

  if (!verifyDate.success) {
    return errorMapper(verifyDate.error);
  }

  const formDataBanner: File = formData.get("banner") as File;
  const formDataTitle: string = formData.get("title") as string;

  const buffer = await buildBuffer(formDataBanner);
  const convertedImage = await convertToWebp(buffer);
  const fileName = buildFileName(formDataTitle);

  const input: UploadInput = {
    data: convertedImage,
    fileName: fileName,
  };

  await initMinioClient();

  const response = await upload(input);

  if (!response) {
    return errorMapper(response);
  }

  const urlBucketImage = await buildUrlBucket(fileName);

  const inputBd: createPromotionDto = {
    bannerUrl: urlBucketImage,
    title: formData.get("title") as string,
    linkUrl: formData.get("linkUrl") as string,
    description: formData.get("description") as string,
    startDate: new Date(formData.get("startDate") as string),
    endDate: new Date(formData.get("endDate") as string),
  };

  return createPromo(inputBd);
}

async function buildBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
}

function buildFileName(name: string): string {
  const formatName = name.toLowerCase().split(" ").join("_");
  return formatName + ".webp";
}

async function createPromo(inputBd: createPromotionDto): Promise<errorDto> {
  try {
    await createPromotion(inputBd);
  } catch (err) {
    return errorMapper(err);
  }
  return [true, { message: "" }];
}
