import { z } from "zod";

export const createCompetitionSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Name must be greater than 1 characters!" }),
    system: z
      .string()
      .min(4, { message: "System must be greater than 5 characters!" }),
  })

});

export const updateCompetitionSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      name: z
        .string()
        .min(1, { message: "Name must be greater than 1 characters!" }),
      system: z
        .string()
        .min(5, { message: "Descrition must be greater than 5 characters!" }),
    })
    .partial(),
});