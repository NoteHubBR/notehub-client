import { clsx } from "clsx";
import Image from "next/image";

interface OAuthButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    src: string;
    alt: string;
    brand: string;
    isRequesting: boolean;
    isGoogleAuthInProgress?: boolean;
    isGitHubAuthInProgress?: boolean;
}

const OAuthButton = (props: OAuthButtonProps) => {

    const { src, alt, brand, isRequesting, isGoogleAuthInProgress, isGitHubAuthInProgress, ...rest } = props;

    const disabled = isRequesting || isGoogleAuthInProgress || isGitHubAuthInProgress;

    return (
        <button type='button' className={clsx(
            disabled ? 'cursor-not-allowed' : 'request-btn',
            'select-none',
            'w-full',
            'flex items-center justify-center gap-4',
            'p-2 rounded-md',
            isGoogleAuthInProgress || isGitHubAuthInProgress
                ? "dark:bg-primary bg-primary"
                : "dark:bg-slate-100/5 bg-dark/25",
            'transition-all'
        )} disabled={disabled} {...rest}>
            <Image
                src={src}
                width={25} height={0}
                priority
                alt={alt}
            />
            <span className='font-faculty text-md text-lighter'>Continuar com o {brand}</span>
        </button>
    )

}

export default OAuthButton;