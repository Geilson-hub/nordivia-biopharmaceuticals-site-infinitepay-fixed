import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(3),
  phone: z.string().min(8),
  phoneIsWhats: z.boolean(),
  email: z.string().email(),
  password: z.string().min(8),
  cpf: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  marketingOpt: z.boolean()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const updateProfileSchema = z.object({
  cpf: z.string().min(11, "CPF inválido").max(14, "CPF inválido"),
  address: z.string().min(10, "Endereço inválido")
});

export const contactSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(8),
  message: z.string().min(10)
});
