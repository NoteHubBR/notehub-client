import { DefaultColors } from "tailwindcss/types/generated/colors";
import colors from "tailwindcss/colors";

const excludedColors = ["slate", "gray", "zinc", "neutral", "stone", "warmGray", "trueGray", "coolGray", "blueGray", "lightBlue"];

export interface Colors {
    shades: keyof DefaultColors;
    primary: string;
    secondary: string;
}

export function hexToRGB(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : "";
}

export const colorNames = Object
    .entries(colors)
    .filter(
        ([name, value]) =>
            typeof value === "object" &&
            !excludedColors.includes(name)
    )
    .map(([name]) => name as keyof DefaultColors);