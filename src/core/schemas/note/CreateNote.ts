import { z } from "zod";

export const createNoteFormSchema = z.object({
    title: z
        .string().trim()
        .min(4, 'Mínimo de 4 caracteres.')
        .max(48, 'Máximo de 12 caracteres.'),
    description: z
        .string().trim()
        .max(255, 'Máximo de 12 caracteres.'),
    markdown: z
        .string().trim()
        .optional(),
    hidden: z
        .enum(["true", "false"])
        .transform((value) => value === "true"),
    closed: z
        .enum(["true", "false"])
        .transform((value) => value === "true"),
})

export type CreateNoteFormData = z.infer<typeof createNoteFormSchema>;