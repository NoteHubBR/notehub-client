import { clsx } from "clsx";
import { DefaultColors } from "tailwindcss/types/generated/colors";
import { hexToRGB } from "@/core";
import { usePref } from "@/data/hooks";
import colors from "tailwindcss/colors";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    setColors: React.Dispatch<React.SetStateAction<{ isDark: boolean; color: keyof DefaultColors }>>;
    gradient: string;
    useDark: boolean;
    color: keyof DefaultColors;
}

export const Button = ({ setColors, gradient, useDark, color, ...rest }: ButtonProps) => {

    const { pref: { useDarkTheme, useColors: { shades, primary } }} = usePref();

    const current = useDark === useDarkTheme && hexToRGB(colors[color][600]) === primary;

    const handleMouseEnter = (): void => {
        return setColors({
            isDark: useDark,
            color: color
        })
    }

    const handleMouseLeave = (): void => {
        return setColors({
            isDark: useDarkTheme,
            color: shades
        })
    }

    return (
        <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={clsx(
                'w-[40px] h-[40px] insm:w-[30px] insm:h-[30px] rounded-full',
                'dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm',
                current ? 'animate-spin' : 'hover:scale-110 transition-all',
            )}
            style={{ backgroundImage: gradient }}
            {...rest}
        />
    )

}