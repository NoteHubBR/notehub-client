'use client';

import { colorNames } from "@/core";
import { DefaultColors } from "tailwindcss/types/generated/colors";
import { Element } from "./elements";
import { Header } from "../Header";
import { usePref } from "@/data/hooks";
import { useState } from "react";
import tailwindColors from "tailwindcss/colors";

const Page = () => {

    const { pref: { useDarkTheme, useColors: { shades } } } = usePref();

    const [colors, setColors] = useState<{ isDark: boolean; color: keyof DefaultColors }>({
        isDark: useDarkTheme,
        color: shades
    })

    const { Header: SectionHeader, Card, Button } = Element;

    return (
        <section>
            <Header title="Aparência" />
            <section className="mt-6 flex flex-col gap-6">
                <SectionHeader />
                <Card useDark={colors.isDark} color={colors.color} />
                <footer className="flex items-center gap-3 flex-wrap dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm">
                    {colorNames.map((c) => (
                        <Button
                            key={c}
                            setColors={setColors}
                            useDark
                            color={c as keyof DefaultColors}
                            gradient={`linear-gradient(to bottom right, #0a0a0a, ${tailwindColors[c][600]})`}
                        />
                    ))}
                    {colorNames.map((c) => (
                        <Button
                            key={c}
                            setColors={setColors}
                            useDark={false}
                            color={c as keyof DefaultColors}
                            gradient={`linear-gradient(to bottom right, #fafafa, ${tailwindColors[c][600]})`}
                        />
                    ))}
                </footer>
            </section>
        </section>
    )

}

export default Page;