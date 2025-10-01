import { noForbiddenWords } from '@/core/utils';
import { z } from 'zod';

export const loginFormSchema = z.object({
    username: noForbiddenWords("Não pode")(z
        .string().trim().toLowerCase()
        .regex(/^[a-zA-Z0-9_.-]+$/, "Use letras, números, _, . ou -")
        .min(2, 'Mínimo de 2 caracteres.')
        .max(12, 'Máximo de 12 caracteres.')),
    password: z
        .string().trim()
        .min(4, 'Mínimo de 4 caracteres.')
        .max(255, 'Máximo de 255 caracteres.'),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;