import { IconArrowRight } from '@tabler/icons-react';
import Link, { LinkProps } from 'next/link';

export const Help = (props: LinkProps) => (
    <Link
        {...props}
        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold dark:text-secondary text-primary hover:underline"
    >
        Ver todos os benefícios <IconArrowRight size={16} />
    </Link>
)