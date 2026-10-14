import { buildNameField } from './utils';
import { User } from '@/core/models';
import { z } from 'zod';

export const createNoteUpdateFormSchema = (username: User['username'], existingNames: string[] = []) => z.object({
    name: buildNameField(username, existingNames),
    description: z.string().trim().max(255, 'Máximo de 255 caracteres.'),
    hidden: z.boolean(),
    closed: z.boolean(),
    tags: z
        .array(z.string().trim()
            .min(2, 'Mínimo de 2 caracteres por tag.')
            .max(20, 'Máximo de 20 caracteres por tag.')
            .regex(/^(?!.*[\u00A0\u2007\u202F\s]).*$/, 'Não use espaços.'))
        .max(12, 'Máximo de 12 tags.')
        .default([] as string[]),
})

export type NoteUpdateFormSchema = ReturnType<typeof createNoteUpdateFormSchema>;
export type NoteUpdateFormData = z.infer<NoteUpdateFormSchema>;