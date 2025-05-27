import { z } from 'zod'

export const getSchemaStringConstraints = <T extends z.ZodObject<any>>(schema: T, fieldName: keyof T["shape"]): { min?: number; max?: number } => {

    let fieldSchema = schema.shape[fieldName] as z.ZodTypeAny;

    if (!fieldSchema) return {};

    while (fieldSchema instanceof z.ZodOptional || fieldSchema instanceof z.ZodNullable) {
        fieldSchema = fieldSchema.unwrap();
    }

    while (fieldSchema instanceof z.ZodEffects) {
        fieldSchema = (fieldSchema as any).innerType();
    }

    if (!(fieldSchema instanceof z.ZodString)) return {};
    const checks = (fieldSchema as any)._def.checks as Array<{ kind: string, value: number }>;

    const minCheck = checks.find(check => check.kind === "min");
    const maxCheck = checks.find(check => check.kind === "max");
    const lengthCheck = checks.find(check => check.kind === "length");

    const result: { min?: number; max?: number } = {};
    if (minCheck) result.min = minCheck.value;
    if (maxCheck) result.max = maxCheck.value;
    if (lengthCheck) {
        result.min = lengthCheck.value;
        result.max = lengthCheck.value;
    }

    return result;

}