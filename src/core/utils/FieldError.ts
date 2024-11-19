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