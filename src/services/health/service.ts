import { ApiClient } from '@/api';

export const createHealthService = (api: ApiClient) => {

    const check = async (): Promise<void> => {
        return await api.get('/health');
    }

    return { check };

}