import { UUID } from "crypto";

export default interface User {
    id: UUID;
    email: string;
    username: string;
    display_name: string;
    avatar: string;
    banner: string;
    message: string;
    password: string;
    profile_private: boolean;
    sponsor: boolean;
    score: number;
    created_at: string;
    notifications: number;
    followers_count: number;
    following_count: number;
}