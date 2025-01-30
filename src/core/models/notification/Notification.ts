import { User } from "../user";
import { UUID } from "crypto";

export enum Type {
    FOLLOWER = "FOLLOWER",
    FLAME = "FLAME",
    COMMENT = "COMMENT",
    REPLY = "REPLY"
}

interface Info {
    type: Type;
    message: string;
    target: string;
}

export interface Notification {
    id: UUID,
    read: boolean;
    created_at: string;
    from_user: Partial<User>;
    info: Info
}