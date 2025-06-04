import { IconSettings } from "@tabler/icons-react";

export const Settings = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        className="p-1 rounded-full
        dark:hover:bg-semilight/15 hover:bg-semidark/15
        dark:focus:bg-semilight/15 focus:bg-semidark/15
        transition-all"
        {...props}
    >
        <IconSettings size={22}/>
    </button>
)