import { IconHash, IconNotes, IconUsers } from "@tabler/icons-react";
import { Sorter } from "./Sorter";

export { Skeleton as aside } from "./skeleton";
export const Aside = (props: React.HTMLAttributes<HTMLElement>) => {

    return (
        <aside
            className="w-[122px] py-4
            inlg:w-full
            inmd:py-0"
            {...props}
        >
            <nav>
                <ul
                    className="flex flex-col gap-3
                    inlg:flex-row inlg:justify-center inmd:gap-1"
                >
                    <Sorter sParam="type" values={["notes", null]} icon={IconNotes}>Notas</Sorter>
                    <Sorter sParam="type" values={["tags"]} icon={IconHash}>Tags</Sorter>
                    <Sorter sParam="type" values={["users"]} icon={IconUsers}>Pessoas</Sorter>
                </ul>
            </nav>
        </aside>
    )

}