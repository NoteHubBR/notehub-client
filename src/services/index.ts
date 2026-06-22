import { createApiClient } from '@/api';
import { createAuthService } from './auth';
import { createCommentQuery } from './comment';
import { createCommentService } from './comment';
import { createFeedQuery } from './feed';
import { createFeedService } from './feed';
import { createFlameQuery } from './flame';
import { createFlameService } from './flame';
import { createHealthService } from './health';
import { createNoteQuery } from './note';
import { createNoteService } from './note';
import { createReplyQuery } from './reply';
import { createReplyService } from './reply';
import { createSponsorshipService } from './sponsorship';
import { createUserQuery } from './user';
import { createUserService } from './user';
import { Token } from '@/core';

export const createProgress = (setOnProgress: (value: boolean) => void) =>
    async <T>(fn: () => Promise<T>): Promise<T> => {
        setOnProgress(true);
        try {
            return await fn();
        } finally {
            setOnProgress(false);
        }
    }

export const createServices = (device: string, token: string | null, updateToken: (token: Token) => void) => {
    const publicApi = createApiClient({ deviceId: device });
    const privateApi = createApiClient({ deviceId: device, token });
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
}

export const createQueries = {
    createUserQuery,
    createFeedQuery,
    createNoteQuery,
    createFlameQuery,
    createCommentQuery,
    createReplyQuery,
}