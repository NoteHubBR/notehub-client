import { clsx } from "clsx";
import { IconChevronRight, IconHelp } from "@tabler/icons-react";
import { Link } from "./Link";

interface AsideProps extends React.HTMLAttributes<HTMLElement> {
    onDesktop: boolean;
    onPathname: boolean
}

export const Aside = ({ onDesktop, onPathname, ...rest }: AsideProps) => {

    if (onDesktop || onPathname) return (
        <aside
            className={clsx(
                onPathname ? 'w-full' : 'w-1/2 inlg:w-fit',
                'p-4 flex-none'
            )}
            {...rest}
        >
            <h1 className="font-semibold text-xl">Configurações</h1>
            <ul className="mt-6">
                <Link icon={IconChevronRight} href={'/settings/account'}>Conta</Link>
                <Link icon={IconChevronRight} href={'/settings/appearance'}>Aparência</Link>
                <Link icon={IconChevronRight} href={'/settings/sponsorship'}>Patrocínio</Link>
                <Link icon={IconHelp} href={'/help'}>Ajuda</Link>
            </ul>
        </aside>
    )

}