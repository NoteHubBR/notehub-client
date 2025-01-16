import { LowDetailNote } from "../note";
import { User } from "../user";

export interface UsersPage {
    totalPages: number;
    totalElements: number;
    size: number;
    page: number;
    first: boolean;
    last: boolean;
    content: Partial<User>[];
}

export interface NotesPage {
    totalPages: number;
    totalElements: number;
    size: number;
    page: number;
    first: boolean;
    last: boolean;
    content: LowDetailNote[];
}