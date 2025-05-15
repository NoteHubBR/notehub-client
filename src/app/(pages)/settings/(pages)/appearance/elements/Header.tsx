import { usePref } from "@/data/hooks";

export const Header = (props: React.HTMLAttributes<HTMLElement>) => {

    const { pref: { useDarkTheme, useColors } } = usePref();

    return (
        <header
            className="relative px-1 border-x-4 border-primary/25 flex items-center justify-between"
            {...props}
        >
            <h3
                className="capitalize w-full px-4 py-2 rounded font-semibold dark:text-white text-black bg-primary/25"
            >
                {useDarkTheme ? "Dark" : "Light"} {useColors.shades}
            </h3>
            <p className="absolute top-1/2 -translate-y-1/2 right-6 p-1 rounded-full font-semibold text-sm text-primary">
                Atual
            </p>
        </header>
    )

}