import { clsx } from 'clsx';
import { Icon } from '@/components/icons';
import Link, { LinkProps } from 'next/link';

export const GoHome = (props: LinkProps) => (
    <Link
        className={clsx(
            'z-10',
            'absolute left-1/2 top-16 inlg:top-10 insm:top-8 -translate-x-1/2',
            'dark:hover:drop-shadow-primary dark:focus-visible:drop-shadow-primary',
            'hover:drop-shadow-primary focus-visible:drop-shadow-primary'
        )}
        {...props}
    >
        <Icon.Logo
            width={55}
            height={0}
            className="dark:invert invert-0"
        />
    </Link>
)