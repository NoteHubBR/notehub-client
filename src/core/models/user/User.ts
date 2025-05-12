import { UUID } from "crypto";

export interface User {
    id: UUID;
    email: string;
    username: string;
    display_name: string;
    avatar: string;
    banner: string;
    message: string;
    host: string;
    profile_private: boolean;
    sponsor: boolean;
    score: number;
    created_at: string;
    notifications: number;
    notes_count: number;
    followers_count: number;
    following_count: number;
}

export type LowDetailUser = Omit<User, 'id' | 'email' | 'password' | 'score' | 'notifications'>;