import { User } from '@/core/models';
import { z } from 'zod';

export const validateName = (value: string, ctx: z.RefinementCtx, existingNames: string[] = []) => {
    const hasSpaces = /\s/.test(value);
    const hasInvalidChars = /[^a-zA-Z0-9_.-]/.test(value);
    const hasInvalidStartEnd = !/^[a-zA-Z0-9].*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/.test(value);
    const hasConsecutiveSeparators = /[._-]{2,}/.test(value);
    if (hasSpaces) return ctx.addIssue({
        code: 'custom',
        message: 'Não use espaços.',
    });
    if (hasInvalidChars) return ctx.addIssue({
        code: 'custom',
        message: 'Apenas letras, números, ., _ ou -.',
    });
    if (hasInvalidStartEnd) return ctx.addIssue({
        code: 'custom',
        message: 'Sem símbolos no início ou fim.',
    });
    if (hasConsecutiveSeparators) return ctx.addIssue({
        code: 'custom',
        message: 'Não use símbolos consecutivos.',
    });
    if (existingNames.includes(value)) return ctx.addIssue({
        code: 'custom',
        message: 'Nome já existe.',
    });
}

const FULLNAME_MAX = 255;
const getNameMaxLength = (username: User['username']) => FULLNAME_MAX - username.length - 1;
export const buildNameField = (username: User['username'], existingNames: string[] = []) => {
    const max = getNameMaxLength(username);
    return z
        .string().trim()
        .min(1, 'Mínimo de 1 caractere.')
        .max(max, `Máximo de ${max} caracteres.`)
        .superRefine((value, ctx) => validateName(value, ctx, existingNames));
}