import { Component } from "@/components";

export const Skeleton = (props: React.HTMLAttributes<HTMLDivElement>) => {

    const Article = (props: React.HTMLAttributes<HTMLDivElement>) => (
        <div
            className="p-3 rounded
            flex flex-col gap-2
            dark:bg-dark bg-light
            dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm"
            {...props}
        >
            <div className="flex items-center gap-3">
                <Component.Bone width={40} height={40} rounded="full" />
                <div className="flex flex-col gap-2">
                    <Component.Bone width={180} height={20} rounded="md" />
                    <Component.Bone width={90} height={16} rounded="md" />
                </div>
            </div>
            <div className="p-3 rounded flex flex-col gap-2 dark:bg-semidark bg-semilight">
                <div className="flex items-center gap-2">
                    <Component.Bone width={25} height={25} rounded="full" />
                    <Component.Bone width={200} height={20} rounded="md" />
                </div>
                <Component.Bone width={200} height={20} rounded="md" />
                <Component.Bone width={23} height={23} rounded="full" />
            </div>
        </div>
    )

    return (
        <div
            className="max-w-[777px] inlg:max-w-full w-full my-3 p-3 rounded-[5px]
            dark:bg-darker bg-lighter
            dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm
            inmd:drop-shadow-[none]"
            {...props}
        >
            <div className="pb-3 flex items-center justify-between">
                <Component.Bone width={56} height={32} rounded="md" />
                <Component.Bone width={70} height={32} rounded="xl" />
            </div>
            <div className="flex flex-col gap-4">
                <Article />
                <Article />
                <Article />
                <Article />
            </div>
        </div>
    )

}