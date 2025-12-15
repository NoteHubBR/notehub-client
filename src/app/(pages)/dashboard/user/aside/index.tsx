import { Changelog } from "./changelog";
import { clsx } from "clsx";
import { Ranking } from "./ranking";
import { Sponsorship } from "./sponsorship";
import { useScreen, useSessionPref } from "@/data/hooks";

export const Aside = () => {

    const { onDesktop } = useScreen();
    const { pref: { isSponsorshipInviteAllowed } } = useSessionPref();

    if (onDesktop) return (
        <aside
            className={clsx(
                'max-w-[333px] inlg:max-w-full w-full mt-3',
                'flex flex-col gap-3',
                'inlg:grid inlg:grid-cols-2',
            )}
        >
            <Sponsorship isSponsorshipInviteAllowed={isSponsorshipInviteAllowed} />
            <Changelog />
            <Ranking />
        </aside>
    )

}