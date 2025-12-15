import { clsx } from "clsx";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    useDarkTheme: boolean;
}

export const Section = ({ useDarkTheme, ...rest }: SectionProps) => (
    <section
        className={clsx(
            'overflow-hidden',
            'relative w-2/3 inmd:w-full h-2/3 inmd:h-full rounded',
            'border inmd:border-none dark:border-middark border-midlight',
            useDarkTheme ? 'dark-vignette-checkered' : 'light-vignette-checkered'
        )}
        {...rest}
    />
)