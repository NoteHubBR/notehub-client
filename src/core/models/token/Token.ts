import { UUID } from "crypto";

export default interface Token {
    refresh_token: UUID;
    access_token: string;
    created_at: string;
    expires_at: string;
};