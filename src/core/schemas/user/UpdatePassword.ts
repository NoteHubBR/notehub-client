import { z } from "zod";

export const passwordUpdateFormSchema = z.object({
    password: z
        .string().trim()
        .min(4, 'Mínimo de 4 caracteres.')
        .max(8, 'Máximo de 8 caracteres.'),
    repeatPassword: z
        .string().trim()
        .min(4, 'Mínimo de 4 caracteres.')
        .max(8, 'Máximo de 8 caracteres.'),
})
    .refine((data) => data.repeatPassword === data.password, { message: "Senhas diferentes.", path: ['repeatPassword'] });

export type PasswordUpdateFormData = z.infer<typeof passwordUpdateFormSchema>;