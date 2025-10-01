import { z } from 'zod';

export const recoverFormSchema = z.object({
    email: z
        .string().trim().toLowerCase()
        .email('Email inválido.')
});

export type RecoverFormData = z.infer<typeof recoverFormSchema>;