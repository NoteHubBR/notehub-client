import { clsx } from "clsx";
import { usePathname } from "next/navigation";

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
    href?: string;
}

export const Field = (props: FieldProps) => {

    const { href } = props;

    const pathname = usePathname();

    return (
        <div
            className={clsx(
                'cursor-pointer',
                'rounded-md',
                pathname === href
                    ? 'text-lighter bg-primary'
                    : 'hover:dark:bg-lighter/15 hover:bg-dark/15',
                'transition-colors'
            )}
            {...props}
        />
    )

}