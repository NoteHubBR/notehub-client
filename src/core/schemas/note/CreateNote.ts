import { z } from "zod";

export const createNoteFormSchema = z.object({
    title: z
        .string().trim()
        .min(2, 'Mínimo de 2 caracteres.')
        .max(48, 'Máximo de 48 caracteres.'),
    description: z
        .string().trim()
        .max(255, 'Máximo de 255 caracteres.'),
    markdown: z
        .string()
        .optional(),
    hidden: z
        .enum(["true", "false"])
        .transform((value) => value === "true"),
    closed: z
        .enum(["true", "false"])
        .transform((value) => value === "true"),
})

export type CreateNoteFormData = z.infer<typeof createNoteFormSchema>;