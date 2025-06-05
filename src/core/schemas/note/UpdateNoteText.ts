import { z } from "zod";

export const noteTextUpdateFormSchema = z.object({
    markdown: z
        .string().trim()
        .min(1, "Não poder ser vazia.")
})

export type NoteTextUpdateFormData = z.infer<typeof noteTextUpdateFormSchema>;