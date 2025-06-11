import { User } from "../user";
import { UUID } from "crypto";

export interface Comment {
    id: UUID,
    created_at: string;
    text: string;
    user: User;
}