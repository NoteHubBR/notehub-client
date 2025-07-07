import { IconFlame } from "@tabler/icons-react";

export const Flame = ({ number }: { number: number }) => (
    <>
        <div
            className="group cursor-pointer
            p-1 rounded-full
            flex items-center
            !text-white
            dark:bg-lighter/25 bg-darker/25
            dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm
            active:scale-110 hover:!bg-primary
            transition-all"
        >
            <IconFlame size={18} fill="white" />
        </div>
        <span className="pointer-events-none select-none text-sm">{number}</span>
    </>
)