import Image from "next/image";

interface LoadingProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    size?: number;
}

export const Loading = ({ size = 75, className, ...rest }: LoadingProps) => (
    <figure role="status" className={`select-none pointer-events-none ${className}`} {...rest}>
        <Image
            aria-hidden="true"
            src="/svgs/infinite-spinner.svg"
            alt="Carregando"
            width={size}
            height={size}
            className="m-auto"
        />
    </figure>
)