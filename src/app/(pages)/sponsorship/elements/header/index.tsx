import { clsx } from 'clsx';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

export const Header = (props: React.HTMLAttributes<HTMLElement>) => (
    <header
        className="hidden w-fit insm:w-full p-8 inmd:py-3 insm:pl-10 inlg:flex items-center justify-between gap-2 dark:bg-darker bg-lighter"
        {...props}
    >
        <Link
            aria-label="Voltar"
            href='/'
            className={clsx(
                'p-1 rounded-full',
                'transition-colors',
                'hover:dark:bg-lighter/10 hover:bg-dark/10',
                'focus-visible:dark:bg-lighter/10 focus-visible:bg-dark/10',
            )}
        >
            <IconArrowLeft />
        </Link>
        <h1 className="w-full m-auto text-lg">Patrocínio</h1>
    </header>
)