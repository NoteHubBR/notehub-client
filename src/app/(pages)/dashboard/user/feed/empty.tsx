import { Header } from "./header";
import { IconMoodPuzzled } from "@tabler/icons-react";

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: React.ElementType;
    title: string;
    desc: string;
}

const Dialog = ({ icon: Icon, title, desc, ...rest }: DialogProps) => (
    <div
        role="dialog"
        aria-labelledby="dialogTitle"
        aria-describedby="dialogDesc"
        className="py-6
        rounded flex flex-1 items-center justify-center gap-3 
        dark:bg-dark bg-light
        dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm"
        {...rest}
    >
        <figure className="w-fit">
            <Icon size={50} className="dark:text-neutral-500 text-neutral-400" />
        </figure>
        <section>
            <h2 id="dialogTitle" className="text-lg dark:text-lighter/75 text-darker/75">
                {title}
            </h2>
            <p id="dialogDesc" className="text-sm dark:text-lighter/50 text-darker/50">
                {desc}
            </p>
        </section>
    </div>
)

export const Empty = () => (
    <section
        className="max-w-[777px] inlg:max-w-full w-full my-3 p-3 rounded-[5px]
        dark:bg-darker bg-lighter
        dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm"
    >
        <Header />
        <Dialog icon={IconMoodPuzzled} title="uai?" desc="Feed vazio." />
    </section>
)