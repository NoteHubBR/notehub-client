import { clsx } from "clsx";
import { IconEyeOff } from "@tabler/icons-react";
import { LowDetailNote } from "@/core";

export const Status = ({ note, className, ...rest }: { note: LowDetailNote; } & React.HTMLAttributes<HTMLSpanElement>) => {

    if (note.hidden) return (
        <span
            className={clsx(
                'absolute top-0 right-0',
                'p-[2px] rounded-full',
                'border dark:border-light/25 border-dark/25',
                'dark:text-light/25 text-dark/25',
                'dark:bg-dark bg-light',
                className
            )}
            {...rest}
        >
            <IconEyeOff size={20} />
        </span>
    )

}