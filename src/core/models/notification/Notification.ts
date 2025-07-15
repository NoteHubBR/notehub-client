import { LowDetailUser } from "../user";
import { UUID } from "crypto";

export enum Type {
    FOLLOWER = "FOLLOWER",
    FLAME = "FLAME",
    COMMENT = "COMMENT",
    REPLY = "REPLY"
}

interface Info {
    from: LowDetailUser;
    to: LowDetailUser;
    related: LowDetailUser;
    type: Type;
    message: string;
    target: string;
}

export interface Notification {
    id: UUID,
    read: boolean;
    created_at: string;
    info: Info
}