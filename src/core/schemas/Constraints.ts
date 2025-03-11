import { z } from "zod";

export const getSchemaStringConstraints = <T extends z.ZodObject<any>>(schema: T, fieldName: keyof T["shape"]): {
    min: number;
    max: number;
} => {
    const fieldSchema = schema.shape[fieldName];
    const checks = (fieldSchema as any)._def.checks;
    const min = checks.find((c: any) => c.kind === "min")?.value;
    const max = checks.find((c: any) => c.kind === "max")?.value;
    return { min, max };
}