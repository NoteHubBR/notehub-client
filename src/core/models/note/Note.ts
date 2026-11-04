import { User } from "../user";
import { UUID } from "crypto";

export interface Note {
    id: UUID,
    name: string;
    full_name: string;
    description: string;
    tags: string[];
    user: User | null;
    created_at: string;
    modified_at: string;
    modified: boolean;
    closed: boolean;
    hidden: boolean;
    encrypted: boolean;
    markdown: string | null;
    comments_count: number;
    flames_count: number;
}

export type LowDetailNote = Omit<Note, 'markdown'>;