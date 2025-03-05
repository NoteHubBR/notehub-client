import { Bone } from "@/components/Bone";

export const HeaderSkeleton = (props: React.HTMLAttributes<HTMLElement>) => {
    return (
        <header
            className="w-full h-[325px] py-5 flex flex-col items-center gap-3 dark:bg-neutral-950 bg-neutral-50 animate-pulse"
            {...props}
        >
            <Bone width={111} height={111} rounded="full" className="flex-none" />
            <Bone width={111} height={44} rounded="none" className="flex-none rounded-tr-3xl rounded-bl-3xl" />
            <Bone width={100} height={40} rounded="3xl" />
            <div className="mt-2 flex gap-3">
                <Bone width={46} height={46} rounded="full" />
                <Bone width={46} height={46} rounded="full" />
                <Bone width={46} height={46} rounded="full" />
            </div>
        </header>
    )
}