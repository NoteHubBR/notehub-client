import { noForbiddenWords } from '@/core/utils';
import { z } from 'zod';

export const createUserFormSchema = z.object({
    email: z
        .string().trim().toLowerCase()
        .email('Email inválido.'),
    username: noForbiddenWords('Não pode')(z
        .string().trim().toLowerCase()
        .regex(
            /^[a-z0-9]+([._-][a-z0-9]+)*$/,
            'Use letras, números e _ . - como separadores.'
        )
        .min(2, 'Mínimo de 2 caracteres.')
        .max(24, 'Máximo de 24 caracteres.')),
    displayName: noForbiddenWords('Não pode')(z
        .string().trim()
        .min(2, 'Mínimo de 2 caracteres.')
        .max(24, 'Máximo de 24 caracteres.')),
    password: z
        .string().trim()
        .min(4, 'Mínimo de 4 caracteres.')
        .max(255, 'Máximo de 255 caracteres.'),
    repeatPassword: z.string().trim()
})
    .refine((data) => data.repeatPassword === data.password, { message: 'Senhas diferentes.', path: ['repeatPassword'] });

export type CreateUserFormData = z.infer<typeof createUserFormSchema>;