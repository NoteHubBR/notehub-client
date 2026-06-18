import { ApiClient } from '@/api';

export const createHealthService = (api: ApiClient) => {

    const check = async (): Promise<void> => {
        try {
            return await api.get('/health');
        } catch (error) {
            throw error;
        }
    }

    return { check };

}