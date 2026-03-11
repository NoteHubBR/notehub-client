import { clsx } from 'clsx';

interface ScopeProps extends React.HTMLAttributes<HTMLParagraphElement> {
    scope: 'server' | 'client' | 'server & client';
}

export const Scope = ({ scope, ...rest }: ScopeProps) => (
    <p
        className={clsx(
            'px-1 py-0.5 rounded',
            'uppercase tracking-wider text-2xs dark:text-lighter text-darker ',
            'dark:bg-lighter/15 bg-darker/15'
        )}
        {...rest}
    >
        {scope}
    </p>
)