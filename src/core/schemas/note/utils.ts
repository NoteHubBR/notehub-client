import { User } from '@/core/models';
import { z } from "zod";

export const FULLNAME_MAX = 255;

export const getNameMaxLength = (username: User['username']) => FULLNAME_MAX - username.length - 1;

export const buildNameField = (username: User['username'], existingNames: string[] = []) => {
    const max = getNameMaxLength(username);
    return z
        .string().trim()
        .regex(/^[a-zA-Z0-9_.-]+$/, "Use letras, números, _, . ou -")
        .min(1, "Mínimo de 1 caractere.")
        .max(max, `Máximo de ${max} caracteres.`)
        .refine((value) => !existingNames.includes(value), "Nome já existe");
}