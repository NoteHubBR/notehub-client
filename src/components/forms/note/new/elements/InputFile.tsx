import { IconNotes } from "@tabler/icons-react";

export const InputFile = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <>
        <input
            id="txt"
            type="file"
            accept="text/plain"
            className="hidden"
            {...props}
        />
        <label
            htmlFor="txt"
            className="cursor-pointer
            font-semibold text-center dark:text-middark text-midlight
            dark:hover:text-secondary hover:text-primary
            transition-color duration-300"
        >
            <IconNotes size={44} />
            txt
        </label>

    </>
)