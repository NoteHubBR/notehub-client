import { Changelog } from "./changelog";
import { Ranking } from "./ranking";
import { useScreen } from "@/data/hooks";

export const Aside = () => {

    const { onDesktop } = useScreen();

    if (onDesktop) return (
        <aside
            className="max-w-[333px] w-full mt-3 flex flex-col 
            inlg:max-w-full inlg:flex-row gap-3"
        >
            <Changelog />
            <Ranking />
        </aside>
    )

}