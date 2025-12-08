import { IconInfinity } from '@tabler/icons-react';

export const Period = (props: React.HTMLAttributes<HTMLSpanElement>) => (
    <span
        aria-hidden='true'
        className="ml-2 mb-[2px]  flex items-end dark:text-midlight/50 text-middark/50"
        {...props}
    >
        / <IconInfinity size={22} className="ml-1 -mb-[2px]" />
    </span>
)