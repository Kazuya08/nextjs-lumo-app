import { z } from 'zod';

export const finishedGameSchema = z.object({
    title: z
        .string()
        .min(1, 'Título é obrigatório'),
    platform: z
        .string()
        .min(1, 'Plataforma é obrigatória'),
    finishedDate: z
        .string()
        .min(1, 'Data é obrigatória'),
    finishedTime: z.preprocess(
        (value) => (value === '' || value == null ? undefined : value),
        z
            .string()
            .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Hora inválida')
            .optional()
    ),
    totalHours: z.preprocess(
        (value) => (value === '' || value == null ? undefined : Number(value)),
        z
            .number({ invalid_type_error: 'Horas deve ser um número' })
            .min(0, 'Horas deve ser no mínimo 0')
            .optional()
    ),
    rating: z.preprocess(
        (value) => (value === '' || value == null ? undefined : Number(value)),
        z
            .number({ invalid_type_error: 'Nota deve ser um número' })
            .min(1, 'Nota deve ser no mínimo 1')
            .max(10, 'Nota deve ser no máximo 10')
            .optional()
    ),
});

export type FinishedGameFormData = z.infer<typeof finishedGameSchema>;