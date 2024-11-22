'use client'

import { Container } from "@/components/template/Container";
import { IconMailCheck } from "@tabler/icons-react";
import { SVG } from "@/components/SVG";
import { useTheme } from "@/data/hooks";
import Image from "next/image";
import Link from "next/link";

const Page = () => {

    const { isDarkMode } = useTheme();

    return (
        <Container className={`flex flex-col gap-8 items-center justify-center ${isDarkMode ? "dark-checkered-background" : "light-checkered-background"}`}>
            <SVG className="absolute" />
            <div className="relative">
                <Link href={'/'} target="blank" className="z-[1] relative">
                    <Image src="/logo.png" alt="Logo" priority width={256} height={256} className="w-auto h-auto drop-shadow-md" />
                </Link>
                <div className="
                    z-[1] 
                    cursor-default
                    absolute top-[125%] left-1/2 -translate-x-1/2
                    w-[300px]
                    flex items-center justify-center gap-2
                    p-4 border-2 rounded-md
                    dark:bg-neutral-900  dark:border-neutral-800
                    bg-neutral-50/70 border-neutral-100
                    backdrop-blur-sm
                ">
                    <IconMailCheck size={40} className="px-1 rounded-lg text-slate-50 bg-violet-600" />
                    <p className="text-center text-lg font-semibold dark:text-neutral-50 text-neutral-900">
                        Confirme seu email.
                    </p>
                </div>
            </div>
        </Container>
    )
}

export default Page;