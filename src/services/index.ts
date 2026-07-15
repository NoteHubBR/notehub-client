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
import { createTokenService } from './token';
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
    const tokenService = createTokenService(publicApi, privateApi, updateToken);
    return {
        tokenService,
        healthService: createHealthService(publicApi),
        authService: createAuthService(publicApi),
        userService: createUserService(publicApi, privateApi, tokenService.withRetry),
        sponsorshipService: createSponsorshipService(privateApi, tokenService.withRetry),
        feedService: createFeedService(privateApi, tokenService.withRetry),
        noteService: createNoteService(publicApi, privateApi, tokenService.withRetry),
        flameService: createFlameService(privateApi, tokenService.withRetry),
        commentService: createCommentService(privateApi, tokenService.withRetry),
        replyService: createReplyService(privateApi, tokenService.withRetry),
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