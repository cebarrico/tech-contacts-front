import { z } from "zod";
import { contactSchema } from "./contacts.schemas";

export const userLoginSchema = z.object({
  main_email: z
    .string()
    .email({ message: "Must be a valid email" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty({ message: "Please enter your password" }),
});

export const userRegisterSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  main_email: z.string().email(),
  main_phone: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const userSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  main_email: z.string().email(),
  main_phone: z.string(),
  // contacts: z.array(contactSchema),
});

export const updateUserSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  main_email: z.string().email().optional(),
  main_phone: z.string().optional(),
});

export type Login = z.infer<typeof userLoginSchema>;
export type Register = z.infer<typeof userRegisterSchema>;
export type User = z.infer<typeof userSchema>;
