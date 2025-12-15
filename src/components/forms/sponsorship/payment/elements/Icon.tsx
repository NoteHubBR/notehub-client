import { clsx } from "clsx";
import { IconGiftFilled } from "@tabler/icons-react";

export const Icon = (props: React.HTMLAttributes<HTMLElement>) => (
    <div
        aria-hidden='true'
        className={clsx(
            'insm:hidden p-2 rounded-e-md',
            'bg-gradient-to-b',
            'dark:from-semidark dark:via-dark dark:to-dark',
            'from-semilight via-light to-light'
        )}
        {...props}
    >
        <IconGiftFilled
            size={28}
            className="dark:fill-semilight fill-semidark"
        />
    </div>
)