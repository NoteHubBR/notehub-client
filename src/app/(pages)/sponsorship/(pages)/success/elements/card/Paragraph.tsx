import { scrollTo } from "@/core";
import { clsx } from "clsx";
import Link from "next/link";

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
    status: 'pending' | 'success' | 'failed' | 'none';
}

export const Paragraph = ({ status, ...rest }: ParagraphProps) => (
    <p
        className="relative w-full h-[44px] font-medium text-sm dark:text-midlight/50 text-middark/50"
        {...rest}
    >
        <span
            aria-hidden={status !== 'pending'}
            className={clsx(
                'center w-full text-center',
                'transition-opacity ease-linear duration-500',
                status === 'pending' ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
        >
            Sua doação está sendo consultada, em instantes terá o resultado.
        </span>
        <span
            aria-hidden={status !== 'success'}
            className={clsx(
                'center w-full text-center',
                'transition-opacity ease-linear duration-500',
                status === 'success' ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
        >
            Agradecemos sua doação! Você já possui acesso a todos os benefícios exclusivos.
            <Link
                tabIndex={status === 'success' ? 0 : -1}
                href='/help'
                onClick={scrollTo('sponsors')}
                className="ml-1 dark:text-secondary text-primary hover:underline focus-visible:underline"
            >
                Saiba mais
            </Link>
        </span>
        <span
            aria-hidden={status !== 'failed'}
            className={clsx(
                'center w-full text-center',
                'transition-opacity ease-linear duration-500',
                status === 'failed' ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
        >
            Em um minuto você poderá requistar uma nova consulta, aguarde.
        </span>
    </p>
)