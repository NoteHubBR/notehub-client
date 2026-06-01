import { AuthService } from '../auth';
import { FeedEvent, Page } from '@/core';
import { useAPI } from '@/data/hooks';

export const FeedService = () => {

    const { httpGet } = useAPI();

    const handleExpiredToken = AuthService().handleExpiredToken;

    const getFeed = async (token: string, params?: string): Promise<Page<FeedEvent>> => {
        const endpoint: string = `/feed?${params}`;
        try {
            return await httpGet(endpoint, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpGet(endpoint, { useToken: newToken }));
        }
    }

    return { getFeed };

}