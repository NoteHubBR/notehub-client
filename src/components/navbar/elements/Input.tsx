import { IconSearch } from "@tabler/icons-react"

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {

    return (
        <div className="flex items-center justify-between">
            <input
                {...props}
                className="
                    outline-none
                    peer
                    w-[444px] p-2
                    text-md text-violet-500 font-semibold
                    border-2 dark:border-violet-600/50 border-violet-600/50 rounded-s-2xl
                    dark:bg-neutral-900 bg-neutral-100
                    dark:focus:border-violet-600 dark:valid:border-violet-600
                    focus:border-violet-600 valid:border-violet-600
                "
            />
            <div className="
                    cursor-pointer
                    py-2 px-4
                    border-2 border-transparent rounded-e-2xl
                    dark:bg-violet-600/50 bg-violet-600/50
                    dark:peer-focus:bg-violet-600 dark:peer-valid:bg-violet-600
                    peer-focus:bg-violet-600 peer-valid:bg-violet-600" >
                <IconSearch />
            </div>
        </div>
    )

}