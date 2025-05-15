import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useScreen } from "@/data/hooks";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    title: string;
}

export const Header = ({ title, ...rest }: HeaderProps) => {

    const router = useRouter();

    const { onMobile } = useScreen();

    return (
        <header className="flex items-center gap-3" {...rest}>
            {onMobile &&
                <figure className="cursor-pointer p-1 rounded-full hover:dark:bg-middark/30 hover:bg-midlight/30">
                    <IconArrowLeft onClick={() => router.push("/settings")} size={24} />
                </figure>
            }
            <h1 className="font-semibold text-xl">{title}</h1>
        </header>
    )

}