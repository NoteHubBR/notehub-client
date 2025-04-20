import { UseFormSetError } from "react-hook-form";

export default interface FieldError {
    field: string;
    message: string;
}

export function handleFieldErrors(errors: FieldError[], setError: UseFormSetError<any>) {
    errors.forEach(error => {
        setError(error.field, { message: error.message });
    });
}

export function handleFieldErrorsMsg(errors: FieldError[]): { notMutual: boolean; notCurrent: boolean } {
    for (const error of errors) {
        if (error.message === "Usuário sem permissão.") {
            return { notMutual: false, notCurrent: true };
        }
        if (error.message === "Não há vínculo bidirecional entre os usuários.") {
            return { notMutual: true, notCurrent: false };
        }
    }
    return { notMutual: false, notCurrent: false };
}