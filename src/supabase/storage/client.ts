import { convertBlobUrlToFile } from "@/core";
import { createSupabaseClient } from "../client";
import { StoreProps, UploadProps } from "./types";
import { v4 as uuidv4 } from "uuid";
import imageCompression from 'browser-image-compression';

export const uploadImage = async ({ file, bucket, folder }: UploadProps): Promise<string> => {
    const path = `${folder}/${uuidv4()}.png`;
    file = await imageCompression(file, { maxSizeMB: 1, })
    const { storage } = createSupabaseClient();
    const { data } = await storage.from(bucket).upload(path, file);
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${data!.path}`
}

export const deleteImage = async (url: string | null) => {

    if (!url) return;

    const bucketAndPathString = url.split("/storage/v1/object/public/")[1];
    const firstSlashIndex = bucketAndPathString.indexOf("/");

    const bucket = bucketAndPathString.slice(0, firstSlashIndex);
    const path = bucketAndPathString.slice(firstSlashIndex + 1);

    const { storage } = createSupabaseClient();

    return await storage.from(bucket).remove([path]);

}

export const storeImg = async ({ folder, blobUrl }: StoreProps): Promise<string> => {
    const file = await convertBlobUrlToFile(blobUrl);
    return await uploadImage({
        file: file,
        bucket: "images",
        folder: folder,
    })
}