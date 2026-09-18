import { z } from "zod";

export const buildNoteSchema = (existingNames: string[] = []) => z.object({
    name: z
        .string().trim()
        .regex(/^[a-zA-Z0-9_.-]+$/, "Use letras, números, _, . ou -")
        .min(1, 'Mínimo de 1 caractere.')
        .max(255, 'Máximo de 255 caracteres.')
        .refine((value) => existingNames.includes(value) === false, "Nome já existe"),
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

export const createNoteFormSchema = buildNoteSchema;
export const createNoteFormSchemaShape = buildNoteSchema();
export type CreateNoteFormData = z.infer<typeof createNoteFormSchemaShape>;