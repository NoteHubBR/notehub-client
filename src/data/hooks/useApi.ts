import { createProgress, createQueries, createServices } from '@/services';
import { useMemo } from 'react';
import { useProgress } from './useProgress';
import { useStore } from './useStore';
import { useUser } from './useUser';

export const useApi = () => {

    const { store: { device } } = useStore();
    const { setOnProgress } = useProgress();
    const { token, updateToken } = useUser();

    const services = useMemo(() => createServices(device, token ? token.access_token : null, updateToken), [device, token, updateToken])

    const queries = useMemo(() => ({
        userQueries: createQueries.createUserQuery(services.userService),
        feedQueries: createQueries.createFeedQuery(services.feedService),
        noteQueries: createQueries.createNoteQuery(services.noteService),
        flameQueries: createQueries.createFlameQuery(services.flameService),
        commentQueries: createQueries.createCommentQuery(services.commentService),
        replyQueries: createQueries.createReplyQuery(services.replyService),
    }), [services])

    const withProgress = useMemo(() => createProgress(setOnProgress), [setOnProgress])

    return { ...services, ...queries, withProgress };

}