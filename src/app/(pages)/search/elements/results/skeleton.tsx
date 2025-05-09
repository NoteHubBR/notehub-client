import { Component } from "@/components";

export const Skeleton = () => {

    const { Bone } = Component;

    const Article = () => (
        <div
            className="w-full p-3 rounded-md
            flex flex-col items-start gap-3
            dark:bg-darker bg-lighter
            dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm"
        >
            <div className="relative pl-14 flex flex-col gap-1">
                <Bone width={44} height={44} rounded="full" className="absolute top-0 left-0" />
                <Bone width={125} height={20} rounded="md" />
                <Bone width={75} height={20} rounded="md" />
            </div>
            <div className="-mt-1 pl-14 insm:pl-0 flex flex-col gap-2">
                <Bone width={175} height={22} rounded="md" />
                <Bone width={250} height={22} rounded="md" />
                <div className="mt-1 flex items-center gap-1 flex-wrap">
                    <Bone width={75} height={24} rounded="full" />
                    <Bone width={75} height={24} rounded="full" />
                    <Bone width={75} height={24} rounded="full" />
                </div>
            </div>
            <div className="w-full mt-1 pl-14 insm:pl-0 flex items-center justify-between">
                <Bone width={109} height={24} rounded="md" />
                <Bone width={24} height={24} rounded="full" />
            </div>
        </div>
    )

    return (
        <div className="px-2 py-4 rounded-[5px] flex-1">
            <div className="pt-2 pb-4 flex inmd:flex-col items-center justify-between gap-4">
                <Bone width={188} height={28} rounded="md" />
                <div className="flex items-center justify-center gap-3">
                    <Bone width={24} height={24} rounded="full" />
                    <Bone width={24} height={24} rounded="full" />
                    <Bone width={24} height={24} rounded="full" />
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <Article />
                <Article />
                <Article />
            </div>
        </div>
    )

}