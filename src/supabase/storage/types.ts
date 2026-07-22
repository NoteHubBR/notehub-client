import { User } from "@/core";

export type UploadGifFn = (props: {
    file: File;
    bucket: string;
    folder: "avatars" | "banners";
    username: User["username"];
}) => Promise<{ url: string }>;

export type UploadProps = {
    file: File;
    bucket: string;
    folder: "avatars" | "banners";
    username: User["username"];
    uploadGifAsVideo: UploadGifFn;
}

export type StoreProps = {
    blobUrl: string | null;
    folder: "avatars" | "banners";
    username: User["username"];
    uploadGifAsVideo: UploadGifFn;
}