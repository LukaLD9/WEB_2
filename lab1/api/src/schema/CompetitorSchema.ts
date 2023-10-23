import { z } from "zod";

export const createCompetitorSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: "Name must be greater than 1 characters!" }),
  }),
});

export const updateCompetitorSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      name: z
        .string()
        .min(1, { message: "Name must be greater than 1 characters!" }),
    })
    .partial(),
});