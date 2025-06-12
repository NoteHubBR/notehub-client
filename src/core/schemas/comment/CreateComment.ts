import { z } from "zod";

export const createCommentFormSchema = z.object({
    text: z
        .string().trim()
        .min(1, 'Vazio.')
        .max(3333, 'Tamanho excedido.'),
})

export type CreateCommentFormData = z.infer<typeof createCommentFormSchema>;

// This schema serves edit comment form as well