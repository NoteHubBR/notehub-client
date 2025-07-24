import { noForbiddenWords } from "@/core/utils";
import { z } from "zod";

export const editUserFormSchema = z.object({
    username: noForbiddenWords("Não pode")(z
        .string().trim().toLowerCase()
        .regex(/^[a-zA-Z0-9_.]+$/, "Use letras, números, _ ou .")
        .min(2, 'Mínimo de 2 caracteres.')
        .max(12, 'Máximo de 12 caracteres.')),
    displayName: noForbiddenWords("Não pode")(z
        .string().trim()
        .min(2, 'Mínimo de 2 caracteres.')
        .max(24, 'Máximo de 24 caracteres.')),
    avatar: z
        .string().trim().nullable(),
    banner: z
        .string().trim().nullable(),
    message: z
        .string().trim()
        .max(144, 'Máximo de 144 caracteres.'),
    profilePrivate: z
        .boolean()
})

export type EditUserFormData = z.infer<typeof editUserFormSchema>;