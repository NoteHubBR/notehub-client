'use client'

import { clsx } from "clsx";
import { Icon } from "@/components/icons";
import { usePref } from "@/data/hooks";
import Link from "next/link";

const Header = () => {

    const { pref: { useDarkTheme } } = usePref();

    return (
        <header>
            <Link href="/"
                className={clsx(
                    'group overflow-hidden block',
                    useDarkTheme ? "dark-navigate-logo" : "light-navigate-logo",
                    'w-fit p-2 m-auto rounded-xl',
                    'border-2 dark:border-primary/25 border-primary/25',
                    'dark:bg-primary/5 bg-primary/5'
                )}
            >
                <Icon.Logo width={125} height={0} />
            </Link>
        </header>
    );
};

export default Header;