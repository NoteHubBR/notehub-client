import { convertBlobUrlToFile } from "@/core";
import { createSupabaseClient } from "../client";
import { StoreProps, UploadProps } from "./types";
import { v4 as uuidv4 } from "uuid";
import imageCompression from 'browser-image-compression';

const uploadImage = async ({ file, bucket, folder, username, uploadGifAsVideo }: UploadProps): Promise<string> => {
    if (file.type === 'image/gif') {
        const res = await uploadGifAsVideo({ file, bucket, folder, username });
        return res.url;
    }
    file = file.type === 'image/png' ? await imageCompression(file, { maxSizeMB: 1, }) : file;
    const path = `${folder}/${username}/${uuidv4()}${file.type === 'image/png' ? '.png' : '.gif'}`;
    const { storage } = createSupabaseClient();
    const { data } = await storage.from(bucket).upload(path, file);
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${data!.path}`
}

export const deleteImage = async (url: string) => {

    if (!url) return;

    const bucketAndPathString = url.split("/storage/v1/object/public/")[1];
    const firstSlashIndex = bucketAndPathString.indexOf("/");

    const bucket = bucketAndPathString.slice(0, firstSlashIndex);
    const path = bucketAndPathString.slice(firstSlashIndex + 1);

    const { storage } = createSupabaseClient();

    return await storage.from(bucket).remove([path]);

}

export const storeImg = async ({ folder, username, blobUrl, uploadGifAsVideo }: StoreProps): Promise<string | void> => {
    if (blobUrl) {
        const file = await convertBlobUrlToFile(blobUrl);
        return await uploadImage({
            file: file,
            bucket: "images",
            folder: folder,
            username: username,
            uploadGifAsVideo,
        })
    }
    return;
}