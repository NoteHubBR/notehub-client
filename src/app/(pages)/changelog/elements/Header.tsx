'use client';

import { clsx } from "clsx";
import { GoBack } from "./GoBack";
import { Title } from "./Title";
import { usePref } from "@/data/hooks";

export const Header = (props: React.HTMLAttributes<HTMLElement>) => {

    const { pref: { useDarkTheme } } = usePref();

    return (
        <header
            className={clsx(useDarkTheme ? 'dark-changelog-header' : 'light-changelog-header')}
            {...props}
        >
            <div
                className="max-w-[666px] w-full mx-auto py-12 border-b dark:border-semidark border-semilight flex flex-col gap-6"
            >
                <GoBack />
                <Title>Changelog</Title>
            </div>
        </header>
    )

}