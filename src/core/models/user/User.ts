import { Hosts } from "./Hosts";
import { UUID } from "crypto";

export default interface User {
    id: UUID;
    email: string;
    username: string;
    displayName: string;
    avatar: string;
    banner: string;
    message: string;
    password: string;
    host: Hosts;
    profilePrivate: boolean;
    sponsor: boolean;
    score: number;
    createdAt: string;
    token: string;
};