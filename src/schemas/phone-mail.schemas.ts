import { z } from "zod";

export const phoneSchema = z
  .object({
    id: z.string(),
    phone: z.string(),
    userId: z.string().optional(),
    contactId: z.string().optional(),
  })
  .partial();

export const addPhoneSchema = z.object({
  phone: z.string(),
});

export const emailSchema = z
  .object({
    id: z.string(),
    email: z.string(),
    userId: z.string().optional(),
    contactId: z.string().optional(),
  })
  .partial();

export const addEmailSchema = z.object({
  email: z.string(),
});

export type Phone = z.infer<typeof phoneSchema>;
export type Email = z.infer<typeof emailSchema>;
