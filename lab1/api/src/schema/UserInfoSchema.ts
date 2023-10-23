import { z } from "zod";

export const createUserInfoSchema = z.object({
  body: z.object({
    id: z
      .string()
      .min(1, { message: "Id must be greater than 1 characters!" })
  }),
});

export const updateUserInfoSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      id: z
        .string()
        .min(1, { message: "Id must be greater than 1 characters!" })})
    .partial(),
});