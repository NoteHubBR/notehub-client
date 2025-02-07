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
                    ? 'text-neutral-50 bg-violet-600'
                    : 'hover:dark:bg-neutral-50/15 hover:bg-neutral-900/15',
                'transition-colors'
            )}
            {...props}
        />
    )

}