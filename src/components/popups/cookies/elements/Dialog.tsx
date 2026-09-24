import { clsx } from 'clsx';

export const Dialog = (props: React.HTMLAttributes<HTMLDialogElement>) => (
    <dialog
        {...props}
        open
        role='alertdialog'
        aria-describedby='cookie-consent-text'
        className={clsx(
            'z-[999]',
            'fixed w-fit bottom-2 right-1/2 translate-x-1/2',
            'inmd:w-[95%] inmd:right-0 inmd:translate-x-0',
            'p-3 rounded-md',
            'flex insm:flex-col gap-3 insm:gap-1 items-center ',
            'dark:bg-midlight bg-middark',
        )}
    />
)