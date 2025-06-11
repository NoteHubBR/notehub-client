import { z } from "zod";

export const createCommentFormSchema = z.object({
    text: z
        .string().trim()
        .min(1, 'Vazio.')
        .max(48, 'Tamanho excedido.'),
})

export type CreateCommentFormData = z.infer<typeof createCommentFormSchema>;