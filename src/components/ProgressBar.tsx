'use client';

import { clsx } from "clsx";
import { useProgress } from "@/data/hooks";

export const ProgressBar = () => {

    const { onProgress } = useProgress();

    return (
        <div className={clsx(
            'z-[999]',
            'fixed top-0', onProgress ? "left-0" : "right-0",
            'transition-all ease-out duration-700',
            'w-screen', onProgress ? "max-w-full" : "max-w-0", 'h-1',
            'bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-primary',
            'animate-gradient'
        )} />
    )

}