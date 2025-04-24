import { date, z } from "zod";

export const promotionInputSchema = z.object({
  title: z
    .string()
    .min(5, "Titulo menor que o permitido.")
    .max(30, "Titulo maior que o permitido."),
  linkUrl: z.string().url("O link de URl não é válido"),
  description: z
    .string()
    .min(10, "A descrição é menor que o permitido")
    .max(500, "A descrição é maior que o permitido"),
  startDate: date({ message: "Data de início inválida." }),
  endDate: date({ message: "Data de fim inválida" }),
  bannerUrl: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/svg+xml",
          "image/gif",
        ].includes(file.type),
      { message: "Arquivo de imagem invalida" }
    )
    .refine((file) => file.size < 40 * 1024 * 1024, {
      message: "Tamanho máximo de imagem é 40MB.",
    }),
});

export const dateRangeSchema = z
  .object({
    startDate: z.date(),
    endDate: z.date(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "Data final maior que a inicial",
    path: ["endDate"],
  });
