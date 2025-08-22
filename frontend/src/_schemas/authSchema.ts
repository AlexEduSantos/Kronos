import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "O e-mail é inválido."
    ),
  password: z.string().min(1, "A senha é obrigatória."),
});

export const registerFormSchema = loginFormSchema
  .extend({
    confirmPassword: z.string().min(1, "A senha é obrigatória."),
    username: z.string().min(1, "O nome é obrigatório."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais.",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginFormSchema>;
export type RegisterFormData = z.infer<typeof registerFormSchema>;
