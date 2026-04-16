import { z } from "zod";

export const emailChangeFormSchema = z.object({
    email: z
        .string().trim().toLowerCase()
        .email('Email inválido.'),
    repeatEmail: z
        .string().trim().toLowerCase()
        .email('Email inválido.'),
    disconnectAll: z.boolean().default(true),
    keepCurrentSession: z.boolean().default(false),
})
    .refine((data) => data.repeatEmail === data.email, { message: "Emails diferentes.", path: ['repeatEmail'] });

export type EmailChangeFormData = z.infer<typeof emailChangeFormSchema>;