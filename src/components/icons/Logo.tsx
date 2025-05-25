import { clsx } from "clsx";
import Image from "next/image";

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    width: number;
    height: number;
}

export const Logo = ({ width, height, className, ...rest }: LogoProps) => (
    <Image
        src="/imgs/logo.png"
        alt="Logo"
        priority
        width={width}
        height={height}
        className={clsx(
            'select-none',
            'dark:invert',
            'dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm',
            'dark:group-hover:invert-0 group-hover:invert',
            'transition-all',
            className
        )}
        {...rest}
    />
)