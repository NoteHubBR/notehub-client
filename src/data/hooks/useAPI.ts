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

    const api = useMemo(() => createApiClient({
        deviceId: device,
        token: token ? token.access_token : null,
    }), [device, token])

    const services = useMemo(() => ({
        healthService: createHealthService(api),
        authService: createAuthService(api, updateToken),
        userService: createUserService(api, updateToken),
        sponsorshipService: createSponsorshipService(api, updateToken),
        feedService: createFeedService(api, updateToken),
        noteService: createNoteService(api, updateToken),
        flameService: createFlameService(api, updateToken),
        commentService: createCommentService(api, updateToken),
        replyService: createReplyService(api, updateToken),
    }), [api, updateToken])

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