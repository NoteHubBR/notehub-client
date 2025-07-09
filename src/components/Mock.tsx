import Image from "next/image";

interface MockProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    size: number;
}

export const Mock = ({ src, size, className, ...rest }: MockProps) => (
    <figure
        className={`cursor-pointer select-none overflow-hidden flex-none rounded-full ${className}`}
        {...rest}
    >
        <Image
            src={src}
            width={size}
            height={size}
            alt="Avatar"
        />
        <figcaption className="sr-only">Avatar</figcaption>
    </figure>
)