import { z } from "zod";

export const createNoteFormSchema = z.object({
    title: z
        .string().trim()
        .min(4, 'Mínimo de 4 caracteres.')
        .max(48, 'Máximo de 12 caracteres.'),
    description: z
        .string()
        .min(4, 'Mínimo de 4 caracteres.')
        .max(255, 'Máximo de 12 caracteres.')
        .nullable(),
    markdown: z
        .string()
        .nullable(),
    closed: z
        .boolean()
        .nullable(),
    hidden: z
        .boolean()
        .nullable(),
    tags: z
        .array(z
            .string().trim()
            .min(2, 'Mínimo de 2 caracteres')
            .max(20, 'Máximo de 12 caracteres.')
        )
        .max(12, 'Capacidade máxima excedida')
        .nullable()
})

export type CreateNoteFormData = z.infer<typeof createNoteFormSchema>;