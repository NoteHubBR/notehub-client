'use client'

import { Container } from "@/components/template/Container";
import { IconChevronRight, IconClick, IconMailCheck } from "@tabler/icons-react";
import { SVG } from "@/components/SVG";
import { useState } from "react";
import { useUser } from "@/data/hooks";
import Image from "next/image";
import Link from "next/link";

const Page = () => {

    const { store: { isDarkModeUser } } = useUser();

    const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);

    const [count, setCount] = useState<number>(0);

    const toggle = () => { setCount(1); setIsMessageOpen(prev => !prev); }

    return (
        <Container className={`flex flex-col gap-8 items-center justify-center ${isDarkModeUser ? "dark-checkered-background" : "light-checkered-background"}`}>
            <SVG className="absolute" />
            <header>
                <Link href={'/'} target="blank" className="z-[1] relative">
                    <Image src="/imgs/logo.png" alt="Logo" priority width={300} height={0} />
                </Link>
            </header>
            <section className="z-[1] flex items-center justify-center px-1">
                <div className={`
                    relative
                    p-3 border-2 rounded-full
                    dark:bg-neutral-900  dark:border-neutral-800
                    bg-neutral-50/70 border-neutral-100
                    backdrop-blur-sm
                `}>
                    <div className={`
                        absolute
                        top-[3px] left-[3px]
                        w-3 h-3 p-1
                        rounded-full
                        bg-violet-600
                        transition-all duration-500
                    `}>
                        <div className="
                            absolute
                            top-0 left-0
                            w-3 h-3 p-1
                            rounded-full
                            bg-violet-600
                            animate-ping
                        "/>
                    </div>
                    <IconMailCheck size={45} className="px-1 rounded-full text-slate-50 bg-violet-600" />
                </div>
                <button className="relative" onClick={toggle}>
                    <IconChevronRight size={30} fill={isDarkModeUser ? "#fafafa" : "#171717"} className={`
                        dark:text-neutral-50 text-neutral-900 
                        transition-all duration-300
                        ${isMessageOpen && "rotate-180"} 
                    `} />
                    {count < 1 &&
                        <IconClick size={40} fill="#7c3aed" className={`
                            absolute top-0 left-0 
                            text-violet-600 
                            transition-all
                            animate-click
                    `} />
                    }
                </button>
                <aside className={`
                    ${isMessageOpen ? "w-fit" : "w-0"}
                    ${isMessageOpen && "py-5 px-1 border-2"} rounded-2xl
                    dark:bg-neutral-900  dark:border-neutral-800
                    bg-neutral-50/70 border-neutral-100
                    backdrop-blur-sm
                    transition-all duration-300
                `}>
                    {isMessageOpen &&
                        <p className="font-semibold text-lg text-violet-600">Confirme seu email.</p>
                    }
                </aside>
            </section>
        </Container >
    )
}

export default Page;