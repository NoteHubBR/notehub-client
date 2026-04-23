import { z } from 'zod';

export const findSessionsFormSchema = z.object({
    password: z.string().trim()
})

export type FindSessionsFormData = z.infer<typeof findSessionsFormSchema>;