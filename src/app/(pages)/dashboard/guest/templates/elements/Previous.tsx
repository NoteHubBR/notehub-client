import { IconCaretLeft } from "@tabler/icons-react";

interface PreviousProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    index: number;
}

export const Previous = ({ index, ...rest }: PreviousProps) => (
    <button
        hidden={index === 0}
        aria-label="Voltar"
        className="group z-30
        fixed top-1/2 -translate-y-1/2 left-5
        inlg:left-2
        rounded-full
        bg-dark/5
        dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm backdrop-blur-sm"
        {...rest}
    >
        <IconCaretLeft
            size={33}
            className="dark:text-light/25 text-dark/25
            dark:fill-light/25 fill-dark/25
            group-hover:dark:text-light/75 group-hover:text-dark/75
            group-hover:dark:fill-light/75 group-hover:fill-dark/75
            transition-colors duration-300"
        />
    </button>
)