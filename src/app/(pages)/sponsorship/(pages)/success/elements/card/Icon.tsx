import { clsx } from "clsx";
import { Icon as IconComponent } from "@/components/icons";
import { IconMoodPuzzled, IconMoodSmileBeam } from "@tabler/icons-react";

interface IconProps {
    status: 'pending' | 'success' | 'failed' | 'none';
}

export const Icon = ({ status }: IconProps) => (
    <div
        aria-hidden='true'
        className="relative w-[50px] h-[50px]"
    >
        <IconComponent.Loading
            size={50}
            className={clsx(
                'center ',
                'transition-opacity ease-linear duration-500',
                status === 'pending' ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
        />
        <figure
            className="center"
        >
            <IconMoodSmileBeam
                size={65}
                className={clsx(
                    'dark:text-secondary text-primary dark:fill-secondary/25 fill-primary/25',
                    'origin-center transition-all ease-linear duration-500',
                    status === 'success' ? 'scale-100 opacity-100' : 'pointer-events-none scale-0 opacity-0')}
            />
        </figure>
        <figure
            className="center"
        >
            <IconMoodPuzzled
                size={65}
                className={clsx(
                    'dark:text-yellow-600 text-yellow-500 dark:fill-yellow-600/25 fill-yellow-500/25',
                    'origin-center transition-all ease-linear duration-500',
                    status === 'failed' ? 'scale-100 opacity-100' : 'pointer-events-none scale-0 opacity-0')}
            />
        </figure>
    </div>
)