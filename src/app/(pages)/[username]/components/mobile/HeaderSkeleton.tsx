import { Component } from "@/components";

export const HeaderSkeleton = (props: React.HTMLAttributes<HTMLElement>) => {
    return (
        <header
            className="w-full h-[325px] py-5 flex flex-col items-center gap-3 dark:bg-darker bg-lighter animate-pulse"
            {...props}
        >
            <Component.Bone width={111} height={111} rounded="full" className="flex-none" />
            <Component.Bone width={111} height={44} rounded="none" className="flex-none rounded-tr-3xl rounded-bl-3xl" />
            <Component.Bone width={100} height={40} rounded="3xl" />
            <div className="mt-2 flex gap-3">
                <Component.Bone width={46} height={46} rounded="full" />
                <Component.Bone width={46} height={46} rounded="full" />
                <Component.Bone width={46} height={46} rounded="full" />
            </div>
        </header>
    )
}