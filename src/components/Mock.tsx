import Image from "next/image";

interface MockProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    size: number;
}

export const Mock = ({ src, size, ...rest }: MockProps) => (
    <figure className="select-none overflow-hidden flex-none rounded-full" {...rest}>
        <Image
            src={src}
            width={size}
            height={size}
            alt="Avatar"
        />
        <figcaption className="sr-only">Avatar</figcaption>
    </figure>
)