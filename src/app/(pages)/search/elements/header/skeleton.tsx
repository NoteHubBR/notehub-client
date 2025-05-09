import { Component } from "@/components";

export const Skeleton = () => {

    const { Bone } = Component

    return (
        <div
            className="max-w-[888px] w-full m-auto my-3 flex items-center justify-between
            inmd:flex-col gap-3"
        >
            <Bone width={195} height={28} rounded="md" />
            <div>
                <div className="flex gap-3 inlg:gap-1 justify-center">
                <Bone width={80} height={40} rounded="md" />
                <Bone width={80} height={40} rounded="md" />
                <Bone width={80} height={40} rounded="md" />
            </div>
            </div>
        </div>
    )

}