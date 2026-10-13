import { clsx } from 'clsx';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    icon: React.ElementType;
}

export const PipFallback = ({ icon: Icon, ...rest }: Props) => (
    <div
        id='note-pip-fallback'
        role="status"
        className={clsx(
            'scroll-mt-[9vh] inmd:scroll-mt-0',
            'relative',
            'min-h-[90vh] max-h-[90vh] inmd:min-h-[93.25svh] inmd:max-h-[93.25svh]',
            'rounded-[5px] border inmd:dark:border-none dark:border-middark/50 border-midlight/50',
            'flex-1 flex items-center justify-center',
            'dark:bg-darker bg-lighter',
        )}
        {...rest}
    >
        <span className="sr-only">Nota aberta na janela flutuante</span>
        <div className="w-fit p-2 border-2 dark:border-neutral-500 border-neutral-400 rounded-full">
            <Icon
                size={33}
                className="dark:text-neutral-500 text-neutral-400"
            />
        </div>
    </div>
)