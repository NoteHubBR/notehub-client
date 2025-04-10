import { clsx } from "clsx";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PageableProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    sParam: string;
    page: number;
}

export const Pageable = ({ sParam, page, children, className, ...rest }: PageableProps) => {

    const pathname = usePathname();
    const sParams = useSearchParams();
    const router = useRouter();

    const current = Number(sParams.get('page') || 1);
    const onRoute = page === current;

    const handleParamUpdate = useCallback(() => {
        const newSearchParams = new URLSearchParams(sParams);
        newSearchParams.set(sParam, String(page));
        router.replace(`${pathname}?${newSearchParams}`);
    }, [pathname, router, sParam, sParams, page])

    return (
        <li>
            <button
                aria-current="page"
                className={clsx(
                    'cursor-pointer',
                    'rounded-full',
                    'w-6 h-6 flex items-center justify-center',
                    'border',
                    'text-md',
                    onRoute && !children
                        ? 'border-primary bg-primary text-white'
                        : 'border-transparent bg-transparent hover:text-primary',
                    className
                )}
                onClick={handleParamUpdate}
                disabled={onRoute}
                {...rest}
            >
                {children ? children : page}
            </button>
        </li>
    )

}