import { Component } from "@/components";

export const Skeleton = () => {

    const { Bone } = Component;

    return (
        <div
            className="w-[122px] py-4
            inlg:w-full
            inmd:py-0"
        >
            <div
                className="flex flex-col gap-3
                inlg:flex-row inlg:justify-center inmd:gap-1"
            >
                <Bone width={90} height={40} rounded="md" />
                <Bone width={90} height={40} rounded="md" />
                <Bone width={90} height={40} rounded="md" />
            </div>
        </div>
    )

}