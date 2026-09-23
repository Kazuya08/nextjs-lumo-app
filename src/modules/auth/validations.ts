import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email é obrigatório')
        .email('Email inválido'),
    password: z
        .string()
        .min(1, 'Senha é obrigatória')
        .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const registerSchema = z.object({
    name: z
        .string()
        .min(1, 'Nome é obrigatório')
        .min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z
        .string()
        .min(1, 'Email é obrigatório')
        .email('Email inválido'),
    username: z
        .string()
        .min(1, 'Nome de usuário é obrigatório')
        .min(3, 'O username deve ter pelo menos 3 caracteres'),
    birthDate: z
        .string()
        .min(1, 'Data de nascimento é obrigatória'),
    password: z
        .string()
        .min(1, 'Senha é obrigatória')
        .min(8, 'A senha deve ter pelo menos 8 caracteres'),
    confirmPassword: z
        .string()
        .min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;