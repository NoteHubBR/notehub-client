import { IconCaretRight } from "@tabler/icons-react";

interface NextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    indexes: number;
    index: number;
}

export const Next = ({ indexes, index, ...rest }: NextProps) => (
    <button
        hidden={index + 1 === indexes}
        aria-label="Avançar"
        className="group z-30
        fixed top-1/2 -translate-y-1/2 right-5
        inlg:right-2
        rounded-full
        bg-dark/5
        dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm backdrop-blur-sm"
        {...rest}
    >
        <IconCaretRight
            size={33}
            className="dark:text-light/25 text-dark/25
            dark:fill-light/25 fill-dark/25
            group-hover:dark:text-light/75 group-hover:text-dark/75
            group-hover:dark:fill-light/75 group-hover:fill-dark/75
            transition-colors duration-300"
        />
    </button>
)