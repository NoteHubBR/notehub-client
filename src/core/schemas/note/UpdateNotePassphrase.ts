import { z } from 'zod';

export const updateNotePassphraseFormSchema = z.object({
    passphrase: z
        .string()
        .trim()
        .min(1, 'Informe o segredo.'),
})

export type UpdateNotePassphraseFormData = z.infer<typeof updateNotePassphraseFormSchema>;