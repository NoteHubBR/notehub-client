import { z } from "zod";

export const noteUpdateFormSchema = z.object({
    name: z
        .string().trim()
        .regex(/^[a-zA-Z0-9_.-]+$/, "Use letras, números, _, . ou -")
        .min(1, 'Mínimo de 1 caractere.')
        .max(255, 'Máximo de 255 caracteres.'),
    description: z
        .string().trim()
        .max(255, 'Máximo de 255 caracteres.'),
    hidden: z.boolean(),
    closed: z.boolean(),
    tags: z
        .array(z
            .string()
            .trim()
            .min(2, 'Mínimo de 2 caracteres por tag.')
            .max(20, 'Máximo de 20 caracteres por tag.')
            .regex(/^(?!.*[\u00A0\u2007\u202F\s]).*$/, 'Não use espaços.')
        )
        .max(12, "Máximo de 12 tags.")
        .default([] as string[])
})

export type NoteUpdateFormData = z.infer<typeof noteUpdateFormSchema>;