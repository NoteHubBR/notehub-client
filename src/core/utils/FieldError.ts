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

export function handleInvalidTokenFieldError(
    error: FieldError,
    setInvalid: React.Dispatch<React.SetStateAction<boolean>>
): void {
    if (error.message === "Token inválido.") return setInvalid(true);
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

export function handleOAuthError(
    errors: FieldError[],
    setError: React.Dispatch<React.SetStateAction<{
        isRequesting: boolean;
        isGoogleAuthInProgress: boolean;
        isGitHubAuthInProgress: boolean;
        oAuthError: string | undefined;
    }>>
): void {
    for (const error of errors) {
        return setError((prev) => ({ ...prev, oAuthError: error.message }));
    }
    return;
}