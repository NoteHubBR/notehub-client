import { clsx } from "clsx";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

interface AnswerProps extends React.HTMLAttributes<HTMLParagraphElement> {
    hash: string;
    useSupport?: boolean;
}

export const Answer = ({ hash, useSupport, children, ...rest }: AnswerProps) => {

    const [isActive, setIsActive] = useState<boolean>(hash === window.location.hash);

    const handleHashChange = useCallback(() => {
        if (hash === window.location.hash) return setIsActive(true);
        else return setIsActive(false);
    }, [hash])

    useEffect(() => {
        window.addEventListener("hashchange", handleHashChange);
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        }
    }, [handleHashChange])

    return (
        <>
            <p
                className={clsx(
                    'overflow-hidden',
                    isActive ? 'mt-3 max-h-[333px]' : 'mt-0 max-h-0',
                    'text-sm dark:text-midlight/75 text-middark/75',
                    'transition-all duration-300'
                )}
                {...rest}
            >
                {children}
                {useSupport &&
                    <span className="font-medium text-sm text-primary hover:underline transition-all">
                        <Link href="mailto:suporte@xisyz.xyz">
                            Acessar o suporte
                        </Link>
                    </span>
                }
            </p>
        </>
    )

}