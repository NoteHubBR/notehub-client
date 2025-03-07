import { z } from "zod";

export const editUserFormSchema = z.object({
    username: z
        .string().trim().toLowerCase()
        .regex(/^[a-zA-Z0-9_.]+$/, "Use letras, números, _ ou .")
        .min(4, 'Mínimo de 4 caracteres.')
        .max(12, 'Máximo de 12 caracteres.'),
    displayName: z
        .string().trim()
        .min(4, 'Mínimo de 4 caracteres.')
        .max(24, 'Máximo de 24 caracteres.'),
    avatar: z
        .string().trim()
        .default("/imgs/avatar.png"),
    banner: z
        .string().trim()
        .default("/imgs/banner.png"),
    message: z
        .string().trim()
        .max(48, 'Máximo de 48 caracteres.'),
    profilePrivate: z
        .boolean()
})

export type EditUserFormData = z.infer<typeof editUserFormSchema>;