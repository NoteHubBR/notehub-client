import { buildNameField } from './utils';
import { User } from '@/core/models';
import { z } from 'zod';

export const createNoteFormSchema = (username: User['username'], existingNames: string[] = []) => z.object({
    name: buildNameField(username, existingNames),
    description: z
        .string().trim()
        .max(255, 'Máximo de 255 caracteres.'),
    markdown: z
        .string()
        .optional(),
    hidden: z
        .enum(['true', 'false'])
        .transform((value) => value === 'true'),
    closed: z
        .enum(['true', 'false'])
        .transform((value) => value === 'true'),
})

export type CreateNoteFormSchema = ReturnType<typeof createNoteFormSchema>;
export type CreateNoteFormData = z.infer<CreateNoteFormSchema>;