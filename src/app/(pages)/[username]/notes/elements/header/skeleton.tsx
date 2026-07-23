import { Component } from "@/components";

export const Skeleton = (props: React.HTMLAttributes<HTMLElement>) => {
    return (
        <header className="py-4 border-b dark:border-light/20 border-dark/20" {...props}>
            <div className="inlg:max-w-[432px] mx-auto flex inlg:flex-col items-center justify-between inlg:justify-center gap-2">
                <div className="w-full flex-1">
                    <Component.Bone width={0} height={30} rounded="lg" className="!w-full" />
                </div>
                <div className="flex justify-center gap-2 flex-wrap">
                    <Component.Bone width={80} height={30} rounded="lg" />
                    <Component.Bone width={80} height={30} rounded="lg" />
                    <Component.Bone width={80} height={30} rounded="lg" />
                    <Component.Bone width={80} height={30} rounded="lg" />
                    <Component.Bone width={80} height={30} rounded="lg" />
                </div>
            </div>
        </header>
    )
}