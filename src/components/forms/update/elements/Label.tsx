import { clsx } from "clsx";

export const Label = ({ className, ...rest }: { className?: string } & React.HTMLAttributes<HTMLLabelElement>) => {
    return (
        <label
            className={clsx(
                'pointer-events-none select-none',
                'absolute top-1/2 -translate-y-1/2 left-6',
                'font-semibold text-md dark:text-neutral-400 text-neutral-600',
                'peer-focus:text-sm peer-focus:top-1 peer-focus:-translate-y-0 peer-focus:text-violet-600',
                'peer-valid:text-sm peer-valid:top-1 peer-valid:-translate-y-0',
                'peer-invalid:text-red-500',
                'transition-all',
                className
            )}
            {...rest}
        />
    )
}