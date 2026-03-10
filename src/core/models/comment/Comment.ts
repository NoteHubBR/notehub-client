import { User } from "../user";
import { UUID } from "crypto";

export interface Comment {
    id: UUID,
    user: User | null;
    created_at: string;
    text: string;
    modified: boolean;
    replies_count: number;
}