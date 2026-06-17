import { createApiClient } from '@/api';
import { createAuthService, createUserService, createUserQueries, createNoteService, createNoteQuery, createFlameService, createFlameQuery } from '@/services';
import { useMemo } from 'react';
import { useProgress } from './useProgress';
import { useStore } from './useStore';
import { useUser } from './useUser';

export const useApiTest = () => {

    const { store: { device } } = useStore();
    const { setOnProgress } = useProgress();
    const { token, updateToken } = useUser();

    const api = useMemo(() => createApiClient({
        deviceId: device,
        token: token ? token.access_token : null,
    }), [device, token])

    const services = useMemo(() => ({
        authService: createAuthService(api, updateToken),
        userService: createUserService(api, updateToken),
        noteService: createNoteService(api, updateToken),
        flameService: createFlameService(api, updateToken),
    }), [api, updateToken]);

    const queries = useMemo(() => ({
        userQueries: createUserQueries(services.userService),
        noteQueries: createNoteQuery(services.noteService),
        flameQueries: createFlameQuery(services.flameService),
    }), [services])

    const withProgress = useMemo(() =>
        async <T>(fn: () => Promise<T>): Promise<T> => {
            setOnProgress(true);
            try { return await fn(); }
            finally { setOnProgress(false); }
        }, [setOnProgress])

    return { ...services, ...queries, withProgress };

}