import { Component } from "@/components";

export const Skeleton = (props: React.HTMLAttributes<HTMLDivElement>) => {

    const Log = (props: React.HTMLAttributes<HTMLDivElement>) => (
        <div
            className="relative
            px-3 pb-5 flex flex-col
            border-l dark:border-neutral-700 border-neutral-400
            after:absolute after:top-0 after:-left-1 after:w-2 after:h-2 after:rounded-full after:dark:bg-neutral-700 after:bg-neutral-400
            last:pb-0"
            {...props}
        >
            <Component.Bone width={75} height={16} rounded="md" className="relative -top-1" />
            <Component.Bone width={200} height={20} rounded="md" />
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
            <div className="px-3 py-6">
                <Log />
                <Log />
                <Log />
                <Log />
                <Log />
            </div>
        </div>
    )

}