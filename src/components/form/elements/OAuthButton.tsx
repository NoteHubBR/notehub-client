import Image from "next/image";

interface OAuthButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    src: string;
    alt: string;
    brand: string;
    isRequesting: boolean;
}

const OAuthButton = ({ src, alt, brand, isRequesting, ...rest }: OAuthButtonProps) => {
    return (
        <button type='button' className={`
            request-btn
            select-none
            w-full
            flex items-center justify-center gap-4
            p-2 rounded-md
            dark:bg-slate-100/5 bg-neutral-900/25
            ${isRequesting ? "dark:bg-white/25 bg-black/25" : "dark:bg-slate-100/5 bg-neutral-900/25"}
            transition-all
        `} disabled={isRequesting} {...rest}>
            <Image
                src={src}
                width={24} height={0}
                priority
                alt={alt}
            />
            <span className='font-faculty text-md text-neutral-50'>Continuar com o {brand}</span>
        </button>
    )
}

export default OAuthButton;