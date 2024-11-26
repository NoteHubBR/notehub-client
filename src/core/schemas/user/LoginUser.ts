import { z } from 'zod';

export const loginUserFormSchema = z.object({
    username: z
        .string().toLowerCase()
        .regex(/^[a-zA-Z0-9_.]+$/, "Use letras, números, _ ou ."),
    password: z.string()
});

export type LoginUserFormData = z.infer<typeof loginUserFormSchema>;