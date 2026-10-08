import { Bone } from "@/components";

export const Skeleton = (props: React.HTMLAttributes<HTMLElement>) => {
    return (
        <header className="py-4 border-b dark:border-light/20 border-dark/20" {...props}>
            <div className="insm:max-w-[244px] mx-auto flex insm:flex-col items-center justify-between gap-2">
                <div className="w-full flex-1">
                    <Bone width={0} height={30} rounded="lg" className="!w-full" />
                </div>
                <div className="flex justify-center gap-2 flex-wrap">
                    <Bone width={123} height={30} rounded="lg" />
                    <Bone width={113} height={30} rounded="lg" />
                </div>
            </div>
        </header>
    )
}