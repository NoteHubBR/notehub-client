'use client';

import { clsx } from 'clsx';
import { Form } from "@/components/forms";
import { Skeleton } from "./skeleton";
import { Unauthorized } from "./unauthorized";
import { useUser } from "@/data/hooks";

const Page = () => {

    const { isMounted, token, user } = useUser();

    if (!isMounted) return <Skeleton />;

    if (!token || !user) return <Unauthorized />;

    return (
        <section className="w-full h-full flex items-center justify-center dark:bg-dark bg-light">
            <div className={clsx(
                'overflow-y-auto overscroll-contain inmd:overscroll-auto',
                'scrollbar-desktop inmd:scrollbar-mobile',
                'max-w-[666px] inmd:max-w-full w-full',
                'min-h-[90vh] max-h-[90vh] inmd:min-h-[93.25svh] inmd:max-h-[93.25svh]',
                'px-8 py-6 inmd:p-4 rounded',
                'border inmd:border-0 dark:border-middark border-midlight',
                'flex flex-col',
                'dark:bg-darker bg-lighter',
            )}>
                <header>
                    <h1 className="w-fit font-semibold text-xl">Criar nova nota</h1>
                </header>
                <Form.Note.New token={token.access_token} username={user.username} />
            </div>
        </section>
    )

}

export default Page;