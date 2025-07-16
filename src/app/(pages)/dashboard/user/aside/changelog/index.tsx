import { IconGitCommit } from "@tabler/icons-react";

export const Changelog = () => {

    return (
        <section
            className="w-full min-h-[222px] p-3 rounded-[5px]
            flex items-center justify-center
            dark:bg-darker bg-lighter
            dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm
            inlg:h-full"
        >
            <div
                role="dialog"
                aria-labelledby="dialogTitle"
                aria-describedby="dialogDesc"
                className="flex flex-1 items-center justify-center gap-3"
            >
                <figure className="w-fit p-2 border-2 dark:border-neutral-500/75 border-neutral-400/75 rounded-full">
                    <IconGitCommit size={33} className="dark:text-neutral-500/75 text-neutral-400/75" />
                </figure>
                <section>
                    <h2 id="dialogTitle" className="text-lg dark:text-lighter/75 text-darker/75">
                        Changelog
                    </h2>
                    <p id="dialogDesc" className="text-sm dark:text-lighter/50 text-darker/50">
                        Em andamento...
                    </p>
                </section>
            </div>
        </section>
    )

}