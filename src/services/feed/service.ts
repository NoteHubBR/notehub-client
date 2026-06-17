import { ApiClient } from '@/api';
import { createAuthService } from '../auth';
import { FeedEvent, Page, Token } from '@/core';

export const createFeedService = (api: ApiClient, updateToken: (token: Token) => void) => {

    const { withRetry } = createAuthService(api, updateToken);

    const getFeed = async (token: string, params?: string): Promise<Page<FeedEvent>> => {
        const endpoint: string = `/feed?${params}`;
        return withRetry(token, (token) => api.get(endpoint, { token: token }));
    }

    return { getFeed };

}

export type FeedService = ReturnType<typeof createFeedService>;