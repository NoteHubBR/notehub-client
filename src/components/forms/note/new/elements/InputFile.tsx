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
        <label htmlFor="txt">
            <IconNotes
                size={44}
                className="cursor-pointer
                dark:text-middark text-midlight
                hover:!text-primary
                transition-color duration-300"
            />
        </label>
    </>
)