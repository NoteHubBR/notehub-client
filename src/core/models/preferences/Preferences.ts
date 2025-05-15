import { Colors } from "@/core/utils/Colors";

export default interface Preferences {
    useDarkTheme: boolean;
    useColors: Colors;
}

export function storePref() {
    if (!localStorage.getItem('preferences')) {
        const pref: Preferences = {
            useDarkTheme: window.matchMedia('(prefers-color-scheme: dark)').matches,
            useColors: {
                shades: "violet",
                primary: "124, 58, 237",
                secondary: "139, 92, 246"
            }
        }
        localStorage.setItem('preferences', JSON.stringify(pref));
    }
}