import FieldError from '@/core/utils/FieldError';

type CustomResponse<T> =
    | { type: 'ok', data: T }
    | { type: 'notfound', data: FieldError[] }
    | { type: 'forbidden', data: FieldError[] }

const customQueryFn = <T>(fn: () => Promise<T>) => {
    return async (): Promise<CustomResponse<T>> => {
        try {
            const data = await fn();
            return { type: 'ok', data };
        } catch (error: any) {
            if (error.response.status === 403) return { type: 'forbidden', data: error.data };
            if (error.response.status === 404) return { type: 'notfound', data: error.data };
            throw error;
        }
    }
}

const customRetry = (failureCount: number, error: any) => {
    if (error.response.status < 500) return false;
    return failureCount < 3;
}

export { customQueryFn, customRetry };