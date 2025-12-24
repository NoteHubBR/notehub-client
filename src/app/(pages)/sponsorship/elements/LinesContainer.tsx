import { clsx } from "clsx";
import { usePref } from "@/data/hooks";

export const LinesContainer = ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>) => {

    const { pref: { useDarkTheme } } = usePref();

    const SideStripes = ({ pos, className, ...rest }: { pos: 'right' | 'left' } & React.HTMLAttributes<HTMLDivElement>) => <div
        className={clsx(
            'overflow-hidden w-64 inxl:w-32 inmd:w-full h-full',
            useDarkTheme
                ? pos === 'right'
                    ? 'dark-right-diagonal-stripes'
                    : 'dark-left-diagonal-stripes'
                : pos === 'left'
                    ? 'light-left-diagonal-stripes'
                    : 'light-right-diagonal-stripes',
            className
        )}
        {...rest}
    />

    const SideStripesSeparator = ({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => <div className={clsx(
        'block inmd:hidden overflow-hidden flex-1 dark:bg-darker bg-lighter',
        className
    )} {...rest} />

    return (
        <div
            className="overflow-hidden w-full h-full flex flex-col gap-[1px] dark:bg-middark bg-midlight"
            {...rest}
        >
            <div className="w-full h-16 inmd:h-8 flex gap-[1px]">
                <SideStripes pos='left' className="rounded-br-2xl" />
                <SideStripesSeparator className="rounded-b-2xl" />
                <SideStripes pos='right' className="rounded-bl-2xl" />
            </div>
            <div className="flex-1 flex items-center justify-center gap-[1px]">
                <div className="block inmd:hidden w-64 inxl:w-32 h-full rounded-r-2xl dark:bg-darker bg-lighter" />
                <main
                    className={clsx(
                        'overflow-hidden',
                        'w-full h-full px-48 in2xl:px-24 inlg:px-0 rounded-2xl inmd:rounded-none',
                        'flex-1 flex inlg:flex-col items-center justify-center',
                        'dark:bg-darker bg-lighter'
                    )}
                >
                    {children}
                </main>
                <div className="block inmd:hidden w-64 inxl:w-32 h-full rounded-l-2xl dark:bg-darker bg-lighter" />
            </div>
            <div className="w-full h-16 inmd:h-8 flex gap-[1px]">
                <SideStripes pos='left' className="rounded-tr-2xl" />
                <SideStripesSeparator className="rounded-t-2xl" />
                <SideStripes pos='right' className="rounded-tl-2xl" />
            </div>
        </div>
    )

}