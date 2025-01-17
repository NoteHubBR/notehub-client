export interface Page<T> {
    totalPages: number;
    totalElements: number;
    size: number;
    page: number;
    first: boolean;
    last: boolean;
    content: T[];
}