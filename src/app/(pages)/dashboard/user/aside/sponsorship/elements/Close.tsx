import { clsx } from "clsx";
import { IconX } from "@tabler/icons-react";
import { useSessionPref } from "@/data/hooks";

export const Close = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {

    const { setPref } = useSessionPref();

    return (
        <button
            type='button'
            aria-label='Fechar convite'
            onClick={() => setPref({ isSponsorshipInviteAllowed: false })}
            className={clsx(
                'group',
                'absolute top-3 right-3',
                'p-1 rounded-full',
                'bg-darker/25',
                'transition-colors ease-linear',
                'hover:bg-darker/50',
                'focus-visible:bg-darker/50'
            )}
            {...props}
        >
            <span
                className={clsx(
                    'pointer-events-none',
                    'invisible opacity-0',
                    'absolute break-keep top-[125%] right-1/2 translate-x-1/3',
                    'px-2 py-1 rounded-md',
                    'text-sm',
                    'bg-semidark text-light',
                    'transition-all ease-linear',
                    'group-hover:opacity-100 group-hover:visible',
                    'group-focus-visible:opacity-100 group-focus-visible:visible',
                )}
            >
                Fechar
            </span>
            <IconX aria-hidden='true' size={18} className='text-light' />
        </button>
    )

}