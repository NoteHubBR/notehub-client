import { Component } from "@/components";
import { IconNotes } from "@tabler/icons-react";

export const Creator = ({ src }: { src: string }) => (
    <div className="relative cursor-pointer">
        <Component.Mock src={src} size={40} />
        <div className="absolute -bottom-1 -right-1 p-[2px] rounded-full border-2 dark:border-dark border-light bg-slate-400">
            <IconNotes size={18} className="text-white fill-primary" />
        </div>
    </div>
)