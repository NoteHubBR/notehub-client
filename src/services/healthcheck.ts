import { useAPI } from '@/data/hooks';

export const HealthService = () => {

    const { httpGet } = useAPI();

    const check = async (): Promise<void> => {
        try {
            return await httpGet('/health');
        } catch (error) {
            throw error;
        }
    }

    return { check };

}