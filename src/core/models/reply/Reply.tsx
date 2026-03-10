import { User } from "../user";
import { UUID } from "crypto";

export interface Reply {
    id: UUID,
    user: User | null;
    created_at: string;
    modified: boolean;
    to_user: string | null;
    text: string;
}