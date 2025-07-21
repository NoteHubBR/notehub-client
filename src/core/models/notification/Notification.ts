import { LowDetailUser } from "../user";
import { UUID } from "crypto";

export enum Type {
    FOLLOWER = "FOLLOWER",
    FLAME = "FLAME",
    COMMENT = "COMMENT",
    REPLY = "REPLY"
}

interface Info {
    type: Type;
    target: string;
    message: string;
}

export interface Notification {
    id: UUID,
    read: boolean;
    created_at: string;
    from: LowDetailUser;
    to: LowDetailUser;
    related: LowDetailUser;
    info: Info
}