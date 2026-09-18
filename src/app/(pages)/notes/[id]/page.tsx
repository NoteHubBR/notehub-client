'use client';

import { useApi, useUser } from '@/data/hooks';
import { useCallback, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { UUID } from 'crypto';

const Page = () => {

    const { noteService: { getNoteById } } = useApi();
    const router = useRouter();
    const { id } = useParams<{ id: UUID }>();
    const { isMounted, token } = useUser();

    const navigate = useCallback(async (): Promise<void> => {
        try {
            const note = await getNoteById(token ? token.access_token : null, id);
            const canonicalPath = note.user
                ? `/${note.user.username}/${note.name}`
                : `/${note.full_name}`;
            return router.replace(canonicalPath);
        } catch {
            return router.replace('/note/not/found');
        }
    }, [])

    useEffect(() => {
        if (isMounted) navigate();
        return;
    }, [isMounted])

    return null;

}

export default Page;