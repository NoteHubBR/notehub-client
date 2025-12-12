import { clsx } from "clsx";
import Link from "next/link";

interface AnswerProps extends React.HTMLAttributes<HTMLDivElement> {
    currentId: string;
    hash: string;
    useSupport?: boolean;
}

export const Answer = ({ currentId, hash, useSupport, children, ...rest }: AnswerProps) => {

    const isActive: boolean = hash === currentId;

    return (
        <>
            <div
                className={clsx(
                    'overflow-hidden origin-top-left',
                    isActive ? 'h-auto mt-3 scale-100' : 'h-0 mt-0 scale-0',
                    'text-sm dark:text-midlight/75 text-middark/75',
                    'transition-all duration-500'
                )}
                {...rest}
            >
                {children}
                {useSupport &&
                    <span className="font-medium text-sm text-primary hover:underline transition-all">
                        <Link href="mailto:suporte@notehub.com.br">
                            Acessar o suporte
                        </Link>
                    </span>
                }
            </div>
        </>
    )

}