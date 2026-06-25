import { ApiClient } from '@/api';
import { FeedEvent, Page } from '@/core';
import { WithRetry } from '../auth';

export const createFeedService = (api: ApiClient, withRetry: WithRetry) => {

    const getFeed = async (token: string, params?: string): Promise<Page<FeedEvent>> => {
        const endpoint: string = `/feed?${params}`;
        return withRetry(token, (token) => api.get(endpoint, { token: token }));
    }

    return { getFeed };

}

export type FeedService = ReturnType<typeof createFeedService>;