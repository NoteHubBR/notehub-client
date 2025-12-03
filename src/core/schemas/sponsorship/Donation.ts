import { z } from 'zod';

export const donationFormSchema = z.object({
    currency: z
        .string().trim().toUpperCase()
        .max(3, 'Moeda inválida.')
        .default('BRL'),
    amount: z
        .number()
        .min(1, 'Valor inválido.')
        .default(0),
})

export type DonationFormData = z.infer<typeof donationFormSchema>;