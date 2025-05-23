import { clsx } from "clsx";
import { usePref } from "@/data/hooks";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {

    const { pref: { useDarkTheme } } = usePref();

    return (
        <header>
            <Link
                href="/"
                target="blank"
                className={clsx(
                    'block',
                    useDarkTheme ? "dark-navigate-logo" : "light-navigate-logo",
                    'w-fit p-2 m-auto',
                    'bg-primary/5 border-2 dark:border-primary/10 border-primary/40 rounded-xl'
                )}
            >
                <Image src="/imgs/logo.png" alt="Logo" priority width={125} height={0} />
            </Link>
        </header>
    )

}