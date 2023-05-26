import { z } from "zod";

export const contactSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  main_email: z.string().email(),
  main_phone: z.string(),
});
export const addContactSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  main_email: z.string().email(),
  main_phone: z.string(),
});

export type Contact = z.infer<typeof contactSchema>;
