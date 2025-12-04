import { Colors, invertRGB } from "@/core/utils/Colors";

export default interface Preferences {
    useDarkTheme: boolean;
    useColors: Colors;
}

const defaultPreferences: Preferences = {
    useDarkTheme: false,
    useColors: {
        shades: "violet",
        primary: "124, 58, 237",
        secondary: "139, 92, 246",
        inverted: "131, 197, 18",
    }
}

const getDefaultPreferences = (): Preferences => ({
    useDarkTheme: typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false,
    useColors: defaultPreferences.useColors
})

const mergeData = (data: Partial<Preferences>): Preferences => {
    return {
        useDarkTheme: data.useDarkTheme ?? getDefaultPreferences().useDarkTheme,
        useColors: {
            shades: data.useColors?.shades ?? defaultPreferences.useColors.shades,
            primary: data.useColors?.primary ?? defaultPreferences.useColors.primary,
            secondary: data.useColors?.secondary ?? defaultPreferences.useColors.secondary,
            inverted: data.useColors?.inverted ?? invertRGB(defaultPreferences.useColors.primary),
        }
    }
}

const keys = ['useDarkTheme', 'useColors'] as (keyof Preferences)[];

const preferencesNeedMerge = (data: Partial<Preferences>): boolean => {
    if (keys.some(k => data[k] === undefined)) return true;
    if (data.useColors) {
        const defaultColorKeys = Object.keys(defaultPreferences.useColors) as (keyof Colors)[];
        const hasAllColorFields = defaultColorKeys.every(key => data.useColors![key] !== undefined);
        if (!hasAllColorFields) return true;
    }
    return false;
}

export function storePref() {
    if (typeof window === 'undefined') return;
    const prefereces = localStorage.getItem('preferences');
    const data = prefereces ? JSON.parse(prefereces) as Partial<Preferences> : undefined;
    if (data === undefined) return localStorage.setItem('preferences', JSON.stringify(getDefaultPreferences()));
    if (data && preferencesNeedMerge(data)) {
        const mergedPref = mergeData(data);
        return localStorage.setItem('preferences', JSON.stringify(mergedPref));
    }
    return;
}