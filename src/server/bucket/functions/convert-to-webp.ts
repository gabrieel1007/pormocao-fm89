"use server";

import sharp from "sharp";

export async function convertToWebp(input: Buffer) {
  return await sharp(input).webp().toBuffer();
}
