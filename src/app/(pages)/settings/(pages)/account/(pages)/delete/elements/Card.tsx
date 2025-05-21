import Image from "next/image";

export const Card = () => (
    <div
        aria-hidden="true"
        className="pointer-events-none select-none
        p-2 rounded-lg
        border dark:border-middark border-midlight
        dark:bg-dark bg-light"
    >
        <div className="relative">
            <Image
                src={'/imgs/avatar.png'}
                width={44}
                height={44}
                alt="Deletado"
                className="absolute top-0 left-0 rounded-full"
            />
        </div>
        <div className="pl-14 flex flex-col gap-3">
            <div className="flex flex-col">
                <p className="text-sm line-through">Deletado</p>
                <time className="text-xs dark:text-lighter/50 text-darker/50">
                    14 de junho de 1957
                </time>
            </div>
            <div className="flex flex-col">
                <h4 className="underline font-bold text-md">4x3</h4>
                <p className="text-sm">Real Madrid?</p>
            </div>
            <div className="-ml-2 flex items-center gap-1">
                <div
                    className="w-fit px-2 py-1 rounded-full
                    border border-primary/25
                    font-semibold text-xs text-primary
                    dark:bg-primary/25 bg-primary/10"
                >
                    Di Stéfano
                </div>
                <div
                    className="w-fit px-2 py-1 rounded-full
                    border border-primary/25
                    font-semibold text-xs text-primary
                    dark:bg-primary/25 bg-primary/10"
                >
                    Puskas
                </div>
            </div>
        </div>
    </div>
)