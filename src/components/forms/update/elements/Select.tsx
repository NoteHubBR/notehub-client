import { IconChevronDown, IconWorld } from '@tabler/icons-react';

export const Select = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className="w-full px-4 flex items-center gap-3" {...props}>
            <h2 className="dark:text-neutral-400 text-neutral-600">Perfil</h2>
            <button
                type="button"
                className="w-fit p-1 rounded border border-neutral-700/70 flex items-center gap-3
                hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-colors"
            >
                <IconWorld size={27} className="dark:text-neutral-400 text-neutral-600" />
                <div className="text-start flex flex-col">
                    <span className="font-medium text-sm dark:text-neutral-400 text-neutral-600">Público</span>
                    <span className="font-medium text-xs dark:text-neutral-400 text-neutral-600">Todos podem ver</span>
                </div>
                <IconChevronDown size={20} className="dark:text-neutral-400 text-neutral-600" />
            </button>
        </div>
    )
}