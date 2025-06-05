import { z } from "zod";

export const noteUpdateFormSchema = z.object({
    title: z
        .string().trim()
        .min(4, 'Mínimo de 4 caracteres.')
        .max(48, 'Máximo de 48 caracteres.'),
    description: z
        .string().trim()
        .max(255, 'Máximo de 255 caracteres.'),
    hidden: z.boolean(),
    closed: z.boolean(),
    tags: z
        .array(z
            .string()
            .trim()
            .min(2, 'Mínimo de 2 caracteres')
            .max(20, 'Máximo de 20 caracteres')
            .regex(/^(?!.*[\u00A0\u2007\u202F\s]).*$/, 'Não use espaços')
        )
        .max(12, "Máximo de 12 tags.")
        .optional()
})

export type NoteUpdateFormData = z.infer<typeof noteUpdateFormSchema>;