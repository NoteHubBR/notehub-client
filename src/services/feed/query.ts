import { FeedEvent, Page } from '@/core';
import { FeedService } from './service';
import { useInfinitePagedQuery } from '../utils';

export const createFeedQuery = (service: FeedService) => {

    const useGetFeed = (token: string, params?: string, enabled: boolean = true) => {
        return useInfinitePagedQuery<Page<FeedEvent>>({
            keys: ['feed', token, params],
            function: (page) => service.getFeed(token, `${params}&page=${page}`),
            enabled: enabled
        })
    }

    return { useGetFeed };

}