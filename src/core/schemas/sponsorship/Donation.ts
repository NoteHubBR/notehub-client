import { z } from 'zod';

export const donationFormSchema = z.object({
    locale: z
        .string().trim().toUpperCase()
        .default('PT_BR'),
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