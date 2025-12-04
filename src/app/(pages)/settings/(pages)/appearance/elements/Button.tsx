import { clsx } from "clsx";
import { DefaultColors } from "tailwindcss/types/generated/colors";
import { hexToRGB, invertRGB } from "@/core";
import { usePref } from "@/data/hooks";
import colors from "tailwindcss/colors";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    setColors: React.Dispatch<React.SetStateAction<{ isDark: boolean; color: keyof DefaultColors }>>;
    gradient: string;
    useDark: boolean;
    color: keyof DefaultColors;
}

export const Button = ({ setColors, gradient, useDark, color, ...rest }: ButtonProps) => {

    const { pref: { useDarkTheme, useColors: { shades, primary } }, setPref } = usePref();

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

    const handleClick = (): void => {
        if (current) return;
        return setPref({
            useDarkTheme: useDark ? true : false,
            useColors: {
                shades: color,
                primary: hexToRGB(colors[color][600]),
                secondary: hexToRGB(colors[color][500]),
                inverted: invertRGB(hexToRGB(colors[color][600]))
            }
        })
    }

    return (
        <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className={clsx(
                'w-[40px] h-[40px] rounded-full',
                'dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm',
                current ? 'animate-spin' : 'hover:scale-110 transition-all',
            )}
            style={{ backgroundImage: gradient }}
            {...rest}
        />
    )

}