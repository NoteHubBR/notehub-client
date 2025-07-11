import { Button, Card } from "./elements";
import { colorNames } from "@/core";
import { DefaultColors } from "tailwindcss/types/generated/colors";
import { useEffect, useState } from "react";
import { usePref } from "@/data/hooks";
import tailwindColors from "tailwindcss/colors";

export const Color = () => {

    const { pref: { useDarkTheme, useColors: { shades } } } = usePref();

    const [colors, setColors] = useState<{ isDark: boolean; color: keyof DefaultColors }>({
        isDark: useDarkTheme,
        color: shades
    })

    useEffect(() => { setColors({ isDark: useDarkTheme, color: shades }) }, [shades, useDarkTheme]);

    return (
        <div className="w-full h-full p-4 flex flex-col gap-4 justify-center">
            <p className="font-semibold text-2xl">Cores</p>
            <Card useDark={colors.isDark} color={colors.color} />
            <div className="flex items-center gap-3 flex-wrap dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm">
                {colorNames.map((c) => (
                    <Button
                        key={c}
                        setColors={setColors}
                        useDark={colors.isDark}
                        color={c as keyof DefaultColors}
                        gradient={colors.isDark
                            ? `linear-gradient(to bottom right, #0a0a0a, ${tailwindColors[c][600]})`
                            : `linear-gradient(to bottom right, #fafafa, ${tailwindColors[c][600]})`
                        }
                    />
                ))}
            </div>
        </div>
    )

}