'use client'

import { clsx } from "clsx";
import { Container } from "@/components/template/Container";
import { IconChevronRight, IconClick, IconMailCheck } from "@tabler/icons-react";
import { SVG } from "@/components/SVG";
import { usePref } from "@/data/hooks";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {

    const { pref: { useDarkTheme } } = usePref();

    const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);

    const [count, setCount] = useState<number>(0);

    const toggle = () => { setCount(1); setIsMessageOpen(prev => !prev); }

    return (
        <Container
            className={clsx(
                'flex flex-col gap-8 items-center justify-center',
                useDarkTheme ? 'dark-checkered-background' : 'light-checkered-background')}
        >
            <SVG className="absolute" />
            <header>
                <Link href={'/'} target="blank" className="z-[1] relative">
                    <Image src="/imgs/logo.png" alt="Logo" priority width={300} height={0} />
                </Link>
            </header>
            <section className="z-[1] flex items-center justify-center px-1">
                <div className={clsx(
                    'relative',
                    'p-3 border-2 rounded-full',
                    'dark:bg-dark  dark:border-semidark',
                    'bg-lighter/70 border-light',
                    'backdrop-blur-sm'
                )}>
                    <div className="absolute
                        top-[3px] left-[3px]
                        w-3 h-3 p-1
                        rounded-full
                        bg-primary
                        transition-all duration-500"
                    >
                        <div className="absolute
                            top-0 left-0
                            w-3 h-3 p-1
                            rounded-full
                            bg-primary
                            animate-ping"
                        />
                    </div>
                    <IconMailCheck size={45} className="px-1 rounded-full text-slate-50 bg-primary" />
                </div>
                <button className="relative" onClick={toggle}>
                    <IconChevronRight
                        size={30}
                        fill={useDarkTheme ? "#fafafa" : "#171717"}
                        className={clsx(
                            'dark:text-lighter text-dark ',
                            'transition-all duration-300',
                            isMessageOpen && "rotate-180"
                        )}
                    />
                    {count < 1 &&
                        <IconClick
                            size={40}
                            fill="#7c3aed"
                            className="absolute top-0 left-0 
                                text-primary 
                                transition-all
                                animate-click"
                        />
                    }
                </button>
                <aside className={clsx(
                    isMessageOpen ? "w-fit" : "w-0",
                    isMessageOpen && "py-5 px-1 border-2", 'rounded-2xl',
                    'dark:bg-dark  dark:border-semidark',
                    'bg-lighter/70 border-light',
                    'backdrop-blur-sm',
                    'transition-all duration-300',
                )}>
                    {isMessageOpen &&
                        <p className="font-semibold text-lg text-primary">Confirme seu email.</p>
                    }
                </aside>
            </section>
        </Container >
    )
}

export default Page;