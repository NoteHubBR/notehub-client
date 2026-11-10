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
    encrypted: z
        .enum(['true', 'false'])
        .transform((value) => value === 'true'),
    passphrase: z
        .string()
        .optional()
})

export const createNoteFormSchemaRefined = (username: User['username'], existingNames: string[] = []) =>
    createNoteFormSchema(username, existingNames)
        .superRefine((data, ctx) => {
            if (data.encrypted && !data.passphrase) {
                ctx.addIssue({
                    code: 'custom',
                    path: ['passphrase'],
                    message: 'Informe o segredo.',
                })
            }
        })

export type CreateNoteFormSchema = ReturnType<typeof createNoteFormSchema>;
export type CreateNoteFormSchemaRefined = ReturnType<typeof createNoteFormSchemaRefined>;
export type CreateNoteFormData = z.infer<CreateNoteFormSchemaRefined>;