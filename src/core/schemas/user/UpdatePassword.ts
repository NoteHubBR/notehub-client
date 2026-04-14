import { z } from "zod";

export const passwordUpdateFormSchema = z.object({
    password: z
        .string().trim()
        .min(4, 'Mínimo de 4 caracteres.')
        .max(255, 'Máximo de 255 caracteres.'),
    repeatPassword: z
        .string().trim()
        .min(4, 'Mínimo de 4 caracteres.')
        .max(255, 'Máximo de 255 caracteres.'),
    disconnectAll: z.boolean().default(true),
    keepCurrentSession: z.boolean().default(false),
})
    .refine((data) => data.repeatPassword === data.password, { message: "Senhas diferentes.", path: ['repeatPassword'] });

export type PasswordUpdateFormData = z.infer<typeof passwordUpdateFormSchema>;