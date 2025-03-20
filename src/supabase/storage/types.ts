export type UploadProps = {
    file: File;
    bucket: string;
    folder: "avatars" | "banners";
}

export type StoreProps = {
    blobUrl: string;
    folder: "avatars" | "banners";
}