import { clsx } from "clsx";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    labelFor: string;
}

export const Label = ({ labelFor, ...rest }: LabelProps) => {
    return (
        <>
            <label
                className={clsx(
                    'absolute top-0 left-0 w-full h-full',
                    'border border-neutral-700/70 rounded',
                    'peer-focus:border-violet-600',
                    'peer-invalid:border-red-600',
                )}
                {...rest}
            />
            <span
                aria-hidden
                className={clsx(
                    'pointer-events-none select-none',
                    'z-20 absolute top-1 left-2 translate-y-0',
                    'font-semibold text-md dark:text-neutral-400 text-neutral-600',
                    'peer-valid:top-1 peer-valid:translate-y-0 peer-valid:text-sm',
                    'peer-invalid:top-1/2 peer-invalid:-translate-y-1/2 peer-invalid:text-red-600',
                    'peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-violet-600',
                    'dark:bg-black bg-white',
                    'transition-all'
                )}
            >
                {labelFor}
            </span>
        </>
    )
}