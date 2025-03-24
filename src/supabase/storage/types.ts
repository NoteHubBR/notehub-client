import { User } from "@/core";

export type UploadProps = {
    file: File;
    bucket: string;
    folder: "avatars" | "banners";
    username: User["username"];
}

export type StoreProps = {
    blobUrl: string;
    folder: "avatars" | "banners";
    username: User["username"];
}