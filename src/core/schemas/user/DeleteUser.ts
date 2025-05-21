import { z } from 'zod';

export const deleteUserFormSchema = z.object({
    password: z.string().trim()
})

export type DeleteUserFormData = z.infer<typeof deleteUserFormSchema>;