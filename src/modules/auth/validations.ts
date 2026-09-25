import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    password: z
        .string()
        .min(1, "Senha é obrigatória")
        .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, "Nome é obrigatório")
            .min(2, "Nome deve ter pelo menos 2 caracteres"),
        email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
        username: z
            .string()
            .min(1, "Nome de usuário é obrigatório")
            .min(3, "O username deve ter pelo menos 3 caracteres"),
        birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
        password: z
            .string()
            .min(1, "Senha é obrigatória")
            .min(8, "A senha deve ter pelo menos 8 caracteres"),
        confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

export const socialsSchema = z.object({
    youtube: z.string().optional().default(""),
    discord: z.string().optional().default(""),
    twitch: z.string().optional().default(""),
    instagram: z.string().optional().default(""),
    twitter: z.string().optional().default(""),
    steam: z.string().optional().default(""),
});

export const updateProfileSchema = z.object({
    displayName: z
        .string()
        .trim()
        .min(1, "Nome de exibição é obrigatório")
        .min(2, "Nome de exibição deve ter pelo menos 2 caracteres")
        .optional(),
    country: z.string().trim().min(1, "País é obrigatório").optional(),
    socials: socialsSchema.optional(),
    avatarUrl: z.string().url("URL de avatar inválida").nullable().optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
