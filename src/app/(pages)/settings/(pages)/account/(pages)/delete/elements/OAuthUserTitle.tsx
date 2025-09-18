import { clsx } from "clsx";
import { IconSend } from "@tabler/icons-react";
import { useServices, useUser } from "@/data/hooks";
import { useState } from "react";

export const OAuthUserTitle = (props: React.HTMLAttributes<HTMLElement>) => {

    const { authService: { sendSecretKeyRequest } } = useServices();
    const { user } = useUser();

    const [isPending, setIsPending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);

    const handleClick = async () => {
        if (user) {
            setIsPending(true);
            return await sendSecretKeyRequest({ email: user.email })
                .then(() => {
                    setIsPending(false);
                    setSent(true);
                })
        }
    }

    return (
        <header className="flex flex-col gap-y-3 pb-3" {...props}>
            <p className={clsx(
                'relative origin-bottom-right',
                sent ? 'visible scale-100 h-auto mt-6' : 'invisible scale-0 h-0 nt-0',
                'p-2 rounded-lg',
                'border-l-8 dark:border-middark border-midlight',
                'text-sm dark:text-midlight text-middark',
                'dark:bg-middark/50 bg-midlight/50',
                'transition-all duration-300')}
            >
                Chave enviada via email
            </p>
            <div className="relative px-2 py-3 flex items-center justify-between">
                <h3>Não tem chave?</h3>
                <button
                    disabled={sent || isPending}
                    onClick={handleClick}
                    className={clsx(
                        'select-none',
                        'absolute top-1/2 -translate-y-1/2 right-2',
                        'px-4 py-2 rounded-full',
                        'text-sm text-white',
                        'dark:bg-midlight/50 bg-middark/50',
                        'hover:!bg-primary',
                        'active:top-[calc(50%+3px)]',
                        'disabled:cursor-not-allowed disabled:active:top-1/2 disabled:!bg-primary/50',
                        'transition-all'
                    )}
                >
                    <IconSend className="inline-block align-top" size={20} /> Solicitar
                </button>
            </div>
        </header>
    )

}