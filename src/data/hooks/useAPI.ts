import { createApiClient } from '@/api';
import { createAuthService, createUserService, createUserQuery, createNoteService, createNoteQuery, createFlameService, createFlameQuery, createFeedService, createFeedQuery, createReplyService, createReplyQuery, createCommentService, createCommentQuery, createSponsorshipService, createHealthService } from '@/services';
import { useMemo } from 'react';
import { useProgress } from './useProgress';
import { useStore } from './useStore';
import { useUser } from './useUser';

export const useApi = () => {

    const { store: { device } } = useStore();
    const { setOnProgress } = useProgress();
    const { token, updateToken } = useUser();

    const publicApi = useMemo(() => createApiClient({
        deviceId: device
    }), [device])

    const privateApi = useMemo(() => createApiClient({
        deviceId: device,
        token: token ? token.access_token : null,
    }), [device, token])

    const services = useMemo(() => {
        const authService = createAuthService(publicApi, privateApi, updateToken);
        return {
            authService,
            healthService: createHealthService(publicApi),
            userService: createUserService(publicApi, privateApi, authService.withRetry),
            sponsorshipService: createSponsorshipService(privateApi, authService.withRetry),
            feedService: createFeedService(privateApi, authService.withRetry),
            noteService: createNoteService(publicApi, privateApi, authService.withRetry),
            flameService: createFlameService(privateApi, authService.withRetry),
            commentService: createCommentService(privateApi, authService.withRetry),
            replyService: createReplyService(privateApi, authService.withRetry),
        }
    }, [privateApi, updateToken])

    const queries = useMemo(() => ({
        userQueries: createUserQuery(services.userService),
        feedQueries: createFeedQuery(services.feedService),
        noteQueries: createNoteQuery(services.noteService),
        flameQueries: createFlameQuery(services.flameService),
        commentQueries: createCommentQuery(services.commentService),
        replyQueries: createReplyQuery(services.replyService),
    }), [services])

    const withProgress = useMemo(() =>
        async <T>(fn: () => Promise<T>): Promise<T> => {
            setOnProgress(true);
            try { return await fn(); }
            finally { setOnProgress(false); }
        }, [setOnProgress])

    return { ...services, ...queries, withProgress };

}