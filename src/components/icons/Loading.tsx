import Image from "next/image";

export const Loading = ({ className, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <figure role="status" className={`select-none pointer-events-none ${className}`} {...rest}>
        <Image
            aria-hidden="true"
            src="/svgs/infinite-spinner.svg"
            alt="Carregando"
            width={75}
            height={75}
            className="m-auto"
        />
    </figure>
)