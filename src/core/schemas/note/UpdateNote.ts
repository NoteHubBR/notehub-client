import { buildNameField } from './utils';
import { User } from '@/core/models';
import { z } from 'zod';

export const createNoteUpdateFormSchema = (username: User['username'], existingNames: string[] = []) => z.object({
    name: buildNameField(username, existingNames),
    description: z
        .string().trim()
        .max(255, 'Máximo de 255 caracteres.'),
    markdown: z
        .string()
        .nullable(),
    hidden: z.boolean(),
    closed: z.boolean(),
    encrypted: z.boolean(),
    passphrase: z
        .string()
        .optional(),
    tags: z
        .array(z.string().trim()
            .min(2, 'Mínimo de 2 caracteres por tag.')
            .max(20, 'Máximo de 20 caracteres por tag.')
            .regex(/^(?!.*[\u00A0\u2007\u202F\s]).*$/, 'Não use espaços.'))
        .max(12, 'Máximo de 12 tags.')
        .default([] as string[]),
})

export const createNoteUpdateFormSchemaRefined = (username: User['username'], existingNames: string[] = []) =>
    createNoteUpdateFormSchema(username, existingNames)
        .superRefine((data, ctx) => {
            if (data.encrypted && !data.passphrase) {
                ctx.addIssue({
                    code: 'custom',
                    path: ['passphrase'],
                    message: 'Informe o segredo.',
                })
            }
        })

export type NoteUpdateFormSchema = ReturnType<typeof createNoteUpdateFormSchema>;
export type NoteUpdateFormSchemaRefined = ReturnType<typeof createNoteUpdateFormSchemaRefined>;
export type NoteUpdateFormData = z.infer<NoteUpdateFormSchemaRefined>;