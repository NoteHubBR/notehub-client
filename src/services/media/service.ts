import { ApiClient } from '@/api';

type UploadAvatarREQ = {
    file: File,
    bucket: string,
    folder: string,
    username: string,
}

type UploadAvatarRES = {
    url: string,
}

export const createMediaService = (publicApi: ApiClient) => {

    const uploadGifAsVideo = async (data: UploadAvatarREQ): Promise<UploadAvatarRES> => {
        const endpoint = '/medias/gif/avatar';
        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('bucket', data.bucket);
        formData.append('folder', data.folder);
        formData.append('username', data.username);
        return await publicApi.post(endpoint, formData);
    }

    return {
        uploadGifAsVideo,
    }

}

export type MediaService = ReturnType<typeof createMediaService>;