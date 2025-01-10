import { User } from "../user";

export default interface Page {
    totalPages: number;
    totalElements: number;
    size: number;
    page: number;
    first: boolean;
    last: boolean;
    content: Partial<User>[]
}