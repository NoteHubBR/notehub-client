'use client';

import { Header } from './elements';
import { usePref } from '@/data/hooks';

interface Props extends React.HTMLAttributes<HTMLElement> {
    title: string;
    children: React.ReactNode;
}

export const Legal = ({ title, children, ...rest }: Props) => {

    const { pref: { useDarkTheme } } = usePref();

    return (
        <main className="max-w-full w-screen insm:px-3 flex flex-col gap-12" {...rest}>
            <Header
                useDarkTheme={useDarkTheme}
                title={title}
            />
            <article className="max-w-[666px] w-full mx-auto pb-24 flex flex-col gap-12">
                {children}
            </article>
        </main>
    )

}