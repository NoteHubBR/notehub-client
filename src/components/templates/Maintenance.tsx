'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface MaintenanceProps extends React.HTMLAttributes<HTMLElement> {
    checkHealth: () => Promise<void>;
}

export const Maintenance = ({ checkHealth, ...rest }: MaintenanceProps) => {

    useEffect(() => {
        const interval = setInterval(checkHealth, 12000)
        return () => clearInterval(interval)
    }, [])

    return (
        <main className='max-w-full w-screen h-screen inmd:h-svh dark:bg-darker bg-lighter'>
            <section className='max-w-[777px] w-full h-full mx-auto px-8 flex insm:flex-col-reverse items-center'>
                <header className='w-full insm:pb-24 flex flex-col gap-3'>
                    <h1 className='text-end inlg:text-center font-bold text-5xl insm:text-4xl dark:text-light text-dark'>
                        Indo ali
                    </h1>
                    <p className='text-end inlg:text-center font-medium text-2xl insm:text-base dark:text-light text-dark'>
                        Ver com os caras
                    </p>
                    <span className='text-end inlg:text-center font-medium text-sm inmd:text-xs dark:text-midlight/50 text-middark/50'>
                        — servidor em manutenção —
                    </span>
                </header>
                <figure className='pointer-events-none select-none insm:min-h-0 insm:flex-1'>
                    <Image
                        src="/imgs/indoali.png"
                        alt=""
                        width={0}
                        height={0}
                        className='w-full h-full object-contain mt-2'
                        loading='eager'
                        unoptimized
                    />
                </figure>
            </section>
        </main>
    )

}