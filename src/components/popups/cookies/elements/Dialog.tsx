import { clsx } from 'clsx';

export const Dialog = (props: React.HTMLAttributes<HTMLDialogElement>) => (
    <dialog
        {...props}
        open
        role='alertdialog'
        aria-describedby='cookie-consent-text'
        className={clsx(
            'z-[999]',
            'fixed inlg:w-[85%] inmd:w-[95%] m-0 bottom-2 left-1/2 -translate-x-1/2',
            'p-3 rounded-md',
            'flex insm:flex-col gap-3 insm:gap-1 items-center',
            'dark:bg-midlight bg-middark',
        )}
    />
)