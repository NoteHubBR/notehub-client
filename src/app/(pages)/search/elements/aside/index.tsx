import { Element } from "..";
import { IconHash, IconNotes, IconUsers } from "@tabler/icons-react";

export const Aside = (props: React.HTMLAttributes<HTMLElement>) => {

    const { Li } = Element;

    return (
        <aside
            className="w-[222px] py-4
            inlg:w-full
            inmd:py-0"
            {...props}
        >
            <nav>
                <ul
                    className="flex flex-col gap-3
                    inlg:flex-row inlg:justify-center inmd:gap-1"
                >
                    <Li onParam useBg icon={IconNotes}>Notas</Li>
                    <Li useBg icon={IconHash}>Tags</Li>
                    <Li useBg icon={IconUsers}>Pessoas</Li>
                </ul>
            </nav>
        </aside>
    )

}