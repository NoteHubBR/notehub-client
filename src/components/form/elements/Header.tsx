'use client'

import { usePref } from "@/data/hooks";
import Image from "next/image";
import Link from "next/link";

const Header = () => {

    const { pref: { useDarkTheme } } = usePref();

    return (
        <header>
            <Link href="/" className={`
                block
                ${useDarkTheme ? "dark-navigate-logo" : "light-navigate-logo"}
                w-fit p-2 m-auto 
                bg-violet-600/5 border-2 dark:border-violet-600/10 border-violet-600/40 rounded-xl
            `}>
                <Image src="/imgs/logo.png" alt="Logo" priority width={125} height={0} />
            </Link>
        </header>
    );
};

export default Header;