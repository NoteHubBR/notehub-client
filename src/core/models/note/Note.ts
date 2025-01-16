import { User } from "../user";
import { UUID } from "crypto";

export interface Note {
    id: UUID,
    title: string;
    tags: string[];
    user: User;
    created_at: string;
    modified: false;
    closed: false;
    comments_count: number;
    flames_count: number;
}

export interface LowDetailNote {
    id: UUID,
    title: string;
    tags: string[];
    user: User;
    created_at: string;
    modified: false;
    closed: false;
    hidden?: boolean;
    markdown?: string;
    comments_count: number;
    flames_count: number;
}