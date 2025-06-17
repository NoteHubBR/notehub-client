import { z } from "zod";

export const createReplyFormSchema = z.object({
    text: z
        .string().trim()
        .min(1, 'Vazio.')
        .max(3333, 'Tamanho excedido.'),
})

export type CreateReplyFormData = z.infer<typeof createReplyFormSchema>;

// This schema serves edit reply form as well