import { User } from "../user";
import { UUID } from "crypto";

export interface Note {
    id: UUID,
    title: string;
    description: string;
    tags: string[];
    user: User;
    created_at: string;
    modified_at: string;
    modified: false;
    closed: false;
    hidden: boolean;
    markdown: string;
    comments_count: number;
    flames_count: number;
}

export type LowDetailNote = Omit<Note, 'markdown'>;