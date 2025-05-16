import { IconArrowLeft } from "@tabler/icons-react";
import { useScreen } from "@/data/hooks";
import Link from "next/link";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    goBack: string;
    title: string;
}

export const Header = ({ title, goBack, ...rest }: HeaderProps) => {

    const { onMobile } = useScreen();

    return (
        <header className="flex items-center gap-3" {...rest}>
            {onMobile &&
                <Link
                    href={goBack}
                    className="cursor-pointer p-1 rounded-full hover:dark:bg-middark/30 hover:bg-midlight/30"
                >
                    <IconArrowLeft size={24} />
                </Link>
            }
            <h2 className="font-semibold text-xl">{title}</h2>
        </header>
    )

}