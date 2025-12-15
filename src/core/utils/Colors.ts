import { DefaultColors } from "tailwindcss/types/generated/colors";
import colors from "tailwindcss/colors";

const excludedColors = ["slate", "gray", "zinc", "neutral", "stone", "warmGray", "trueGray", "coolGray", "blueGray", "lightBlue"];

export interface Colors {
    shades: keyof DefaultColors;
    primary: string;
    secondary: string;
    inverted: string;
}

export function hexToRGB(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : "";
}

export function invertRGB(rgb: string): string {
    const [r, g, b] = rgb.split(',').map(v => parseInt(v.trim()));
    return `${255 - r}, ${255 - g}, ${255 - b}`;
}

export function hexToInvertedRGB(hex: string): string {
    const rgb = hexToRGB(hex);
    return invertRGB(rgb);
}

export const colorNames = Object
    .entries(colors)
    .filter(
        ([name, value]) =>
            typeof value === "object" &&
            !excludedColors.includes(name)
    )
    .map(([name]) => name as keyof DefaultColors);