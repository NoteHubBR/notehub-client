import { usePathname } from "next/navigation";

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
    href?: string;
}

export const Field = (props: FieldProps) => {

    const { href } = props;

    const pathname = usePathname();

    return (
        <div
            className={`
                cursor-pointer
                py-1 px-2
                rounded-md
                ${pathname === href ? 'bg-violet-600' : 'hover:bg-neutral-50/15'}   
                transition-colors
            `}
            {...props}
        />
    )
    
}