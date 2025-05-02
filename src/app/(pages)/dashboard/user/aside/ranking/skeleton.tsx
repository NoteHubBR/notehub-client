import { Component } from "@/components";

export const Skeleton = (props: React.HTMLAttributes<HTMLDivElement>) => {

    const Note = (props: React.HTMLAttributes<HTMLDivElement>) => (
        <div
            className="py-3 border-b dark:border-neutral-700 border-neutral-400 first:pt-0 last:pb-0 last:border-none"
            {...props}
        >
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Component.Bone width={25} height={25} rounded="full" />
                    <Component.Bone width={200} height={20} rounded="md" />
                </div>
                <Component.Bone width={200} height={16} rounded="md" />
                <Component.Bone width={23} height={23} rounded="full" />
            </div>
        </div>
    )

    return (
        <div
            className="w-full h-fit p-3 rounded-[5px]
            dark:bg-darker bg-lighter
            dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm
            inlg:h-full
            inmd:w-full"
            {...props}
        >
            <Component.Bone width={150} height={24} rounded="md" />
            <div className="py-3">
                <div className="py-3 border-b dark:border-neutral-700 border-neutral-400 first:pt-0 last:pb-0 last:border-none">
                    <Note />
                    <Note />
                    <Note />
                </div>
            </div>
        </div>
    )

}