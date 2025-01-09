import { IconSearch } from "@tabler/icons-react"

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {

    return (
        <div className="flex items-center justify-between">
            <input
                {...props}
                className="
                    outline-none
                    peer
                    w-[444px] py-2 px-4
                    text-md dark:text-neutral-50 text-neutral-900
                    border-2 dark:border-neutral-50/15 border-neutral-900/15 rounded-s-2xl
                    dark:bg-neutral-900 bg-neutral-100
                    dark:focus:border-violet-600 dark:valid:border-violet-600
                    focus:border-violet-600 valid:border-violet-600
                    dark:placeholder:text-neutral-100/30
                    transition-colors
                "
            />
            <div className="
                    cursor-pointer
                    py-2 px-4
                    border-2 border-transparent rounded-e-2xl
                    dark:bg-neutral-50/15 bg-neutral-900/15
                    dark:peer-focus:bg-violet-600 dark:peer-valid:bg-violet-600
                    peer-focus:bg-violet-600 peer-valid:bg-violet-600
                    transition-colors
                "
            >
                <IconSearch className="text-white"/>
            </div>
        </div>
    )

}