import { clsx } from "clsx";
import { DefaultColors } from "tailwindcss/types/generated/colors";
import { hexToRGB } from "@/core";
import colors from "tailwindcss/colors";

interface CardProps {
    useDark?: boolean;
    color: keyof DefaultColors;
}

export const Card = ({ useDark, color }: CardProps) => {

    const alphaPrimary = `rgba(${hexToRGB(colors[color][600])}, .33)`;
    const primary = colors[color][600];
    const secondary = colors[color][500];

    return (
        <div aria-hidden="true">
            <div
                className={clsx(
                    'select-none pointer-events-none overflow-hidden',
                    'w-full h-full aspect-[2/1] rounded-t',
                    'flex flex-col',
                    'border border-b-0 dark:border-middark border-midlight',
                    'transition-colors duration-300'
                )}
            >
                <div
                    className={clsx(
                        'px-4 py-2',
                        'flex justify-between',
                        useDark ? 'bg-dark' : 'bg-light',
                        'drop-shadow-alpha-d-sm',
                        'transition-colors duration-300'
                    )}
                >
                    <div className="flex-1 flex gap-1">
                        <div className={`w-[25%] h-full rounded ${useDark ? 'bg-semidark' : 'bg-semilight'} transition-colors duration-300`} />
                        <div className={`w-[25%] h-full rounded ${useDark ? 'bg-semidark' : 'bg-semilight'} transition-colors duration-300`} />
                        <div className={`w-[25%] h-full rounded ${useDark ? 'bg-semidark' : 'bg-semilight'} transition-colors duration-300`} />
                    </div>
                    <div className="flex gap-1">
                        <div className={`w-[25px] h-[25px] rounded-full transition-colors duration-300`} style={{ backgroundColor: primary }} />
                        <div className={`w-[25px] h-[25px] rounded-full transition-colors duration-300`} style={{ backgroundColor: secondary }} />
                    </div>
                </div>
                <div className={`w-full h-full px-4 py-2 flex flex-col gap-2 ${useDark ? 'bg-neutral-950' : 'bg-neutral-50'} transition-colors duration-300`}>
                    <div className={`w-[25%] h-[15%] rounded ${useDark ? 'bg-middark' : 'bg-midlight'} transition-colors duration-300`} />
                    <div className="w-full h-full flex items-center gap-4">
                        <div className={clsx(
                            'w-full h-full px-4 py-2 rounded',
                            ' flex items-center justify-center',
                            useDark ? 'bg-dark' : 'bg-light',
                            'drop-shadow-alpha-d-sm',
                            'transition-colors duration-300'
                        )}>
                            <div className={`w-[50%] h-[50%] px-4 py-2 rounded transition-colors duration-300`} style={{ backgroundColor: alphaPrimary }}>
                                <div className={`w-full h-full rounded transition-colors duration-300`} style={{ backgroundColor: primary }} />
                            </div>
                        </div>
                        <div className={`w-[25%] h-full rounded ${useDark ? 'bg-dark' : 'bg-light'} drop-shadow-alpha-d-sm transition-colors duration-300`} />
                    </div>
                </div>
            </div>
            <div
                className={clsx(
                    'select-none pointer-events-none capitalize',
                    'px-4 py-2 rounded-b',
                    'flex items-center gap-1',
                    'border dark:border-middark border-midlight',
                    useDark ? '!border-t-middark bg-neutral-950' : '!border-t-midlight bg-neutral-50',
                    'transition-colors duration-300'
                )}
            >
                <p className={`px-2 py-1 rounded font-semibold text-sm transition-colors duration-300`} style={{ backgroundColor: alphaPrimary }}>
                    <span className="transition-colors duration-300" style={{ color: primary }}>{useDark ? 'Dark' : 'Light'} </span>
                    <span className="transition-colors duration-300" style={{ color: primary }}>{color} </span>
                </p>
            </div>
        </div>
    )

}