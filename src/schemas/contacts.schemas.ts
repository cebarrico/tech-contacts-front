import { z } from "zod";

export const contactSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  main_email: z.string().email(),
  main_phone: z.string().min(8),
});

export const addContactSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  main_email: z.string().email(),
  main_phone: z.string(),
});

export const updateContactSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  main_email: z.string().email().optional(),
  main_phone: z.string().optional(),
});

export type Contact = z.infer<typeof contactSchema>;
