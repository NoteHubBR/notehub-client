import { Note } from "../note";
import { User } from "../user";
import { UUID } from "crypto";

export interface Comment {
    id: UUID,
    user: User | null;
    note: Note;
    created_at: string;
    text: string;
    modified_at: string;
    modified: boolean;
    replies_count: number;
}