import { clsx } from "clsx";
import { SVG } from "@/components/svgs";
import { usePref } from "@/data/hooks";

export const Preview = ({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) => {

    const { pref: { useDarkTheme } } = usePref();

    return (
        <div
            className={clsx(
                'relative',
                'w-full h-full',
                'flex items-center justify-center',
                useDarkTheme ? 'dark-vignette-checkered' : 'light-vignette-checkered'
            )}
        >
            <SVG.Flare className="absolute z-10" flip />
            <div
                className={clsx(
                    'z-10 overflow-hidden relative',
                    'max-w-[555px] w-full max-h-[666px] h-full p-1 rounded-md',
                    'dark:bg-lighter/10 bg-darker/10',
                    'after:absolute after:left-[-25%] after:top-[-25%] after:h-[150%] after:w-[150%] after:animate-border-spin after:conic-gradient'
                )}
                {...rest}
            >
                <div
                    className={clsx(
                        'inset-1 absolute z-[1] rounded-md dark:bg-darker bg-lighter',
                        className
                    )}
                >
                    {children}
                </div>
            </div>
        </div>
    )

}