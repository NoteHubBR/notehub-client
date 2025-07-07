import { clsx } from "clsx";
import { SVG } from "@/components/svgs";
import { usePref } from "@/data/hooks";

interface PreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    flip?: boolean;
}

export const Preview = ({ flip, children, ...rest }: PreviewProps) => {

    const { pref: { useDarkTheme } } = usePref();

    return (
        <div
            className={clsx(
                'relative',
                'w-full h-full px-4 insm:py-4',
                'flex items-center justify-center',
                useDarkTheme ? 'dark-vignette-checkered' : 'light-vignette-checkered'
            )}
        >
            <SVG.Flare className="absolute z-20 select-none pointer-events-none" flip={flip} />
            <div
                className="z-10
                max-w-[666px] w-full rounded-xl
                border-4 dark:border-light/5 border-dark/5
                dark:bg-darker bg-lighter"
                {...rest}
            >
                {children}
            </div>
        </div>
    )

}