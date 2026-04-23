'use client';

import { Form } from '@/components/forms';
import { Header } from '../../../Header';
import { Item } from './elements';
import { Session } from '@/core';
import { useState } from 'react';
import { useStore, useUser } from '@/data/hooks';

const Page = () => {

    const { token } = useUser();
    const { store: { device } } = useStore();
    const [sessions, setSessions] = useState<Session[] | null>(null);

    if (!token) return null;

    if (sessions) return (
        <section>
            <Header goBack="/settings/account" title="Sessões" />
            <ul className="mt-6 flex flex-col gap-6">
                {sessions.map((session) => (
                    <Item
                        key={session.id}
                        device={device}
                        session={session}
                        setSessions={setSessions}
                    />
                ))}
            </ul>
        </section>
    )

    return (
        <section>
            <Header goBack="/settings/account" title="Acesse suas sessões" />
            <Form.Auth.Sessions
                onSuccess={(data) => {
                    const current = data.find((s) => s.device === device);
                    if (current) {
                        const others = data.filter((s) => s.device !== device);
                        return setSessions([current, ...others]);
                    }
                    return setSessions(data);
                }}
            />
        </section>
    )

}

export default Page;