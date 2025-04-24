import { errorDto } from "@/server/interfaces/error/error.dto";

export function errorMapper(error: any): errorDto {
  const errorFormat = JSON.parse(error.message);

  if (errorFormat[0].message) {
    return [false, { message: errorFormat[0].message }];
  }
  if (errorFormat[0].path) {
    return [false, { message: errorFormat[0].path }];
  }
  return [false, { message: "Um erro desconhecido aconteceu." }];
}
