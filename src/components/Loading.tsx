'use client';

import { Container } from "./template/Container";
import { useLoading } from "@/data/hooks";
import Image from "next/image";

export const Loading = () => {

    const { isLoaded } = useLoading();

    if (isLoaded) return null;
    
    return (
        <Container className="z-[998] absolute top-0 left-0 dark:bg-neutral-900 bg-neutral-50 flex items-center justify-center">
            <Image
                src={'/imgs/logo.png'}
                alt="Logo"
                width={180}
                height={0}
                priority
                className="animate-pulse"
            />
        </Container>
    )

}