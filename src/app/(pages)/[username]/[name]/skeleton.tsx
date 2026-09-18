import { Component } from "@/components";

export const Skeleton = () => (
    <div className="max-w-[999px] w-full m-auto flex inlg:flex-col-reverse">
        <div
            className="relative min-h-[90vh] inmd:min-h-[100svh] rounded-[5px]
                border inmd:dark:border-none dark:border-middark/50 border-midlight/50
                flex flex-col flex-1
                dark:bg-darker bg-lighter"
        >
            <div className="px-4 inmd:px-2 flex items-center justify-between gap-3 border-b dark:border-middark/50 border-midlight/50">
                <Component.Bone width={296.37} height={36} rounded="lg" className="max-w-full my-3 insm:rounded-none" />
                <Component.Bone width={28} height={28} rounded="full" className="flex-none" />
            </div>
            <div className="flex-1 p-4" />
        </div>
        <div className="max-w-[275px] inlg:max-w-full w-full inmd:dark:bg-darker inmd:bg-lighter">
            <div className="px-4 flex items-center justify-between border-y border-transparent dark:border-b-middark/50 border-b-midlight/50">
                <Component.Bone width={136} height={36} rounded="xl" className="my-3 inlg:my-2" />
                <Component.Bone width={28} height={28} rounded="full" />
            </div>
            <div className="px-4 pt-4 flex flex-col gap-4">
                <Component.Bone width={140} height={16} rounded="xl" />
                <Component.Bone width={70} height={16} rounded="xl -mt-2" />
                <Component.Bone width={240} height={70} rounded="xl" className="inmd:!w-full" />
                <div className="flex items-center gap-3 flex-wrap">
                    <Component.Bone width={50} height={25} rounded="full" />
                    <Component.Bone width={50} height={25} rounded="full" />
                    <Component.Bone width={50} height={25} rounded="full" />
                    <Component.Bone width={50} height={25} rounded="full" />
                    <Component.Bone width={50} height={25} rounded="full" />
                    <Component.Bone width={50} height={25} rounded="full" />
                    <Component.Bone width={50} height={25} rounded="full" />
                    <Component.Bone width={50} height={25} rounded="full" />
                </div>
            </div>
            <div className="px-4 py-6 flex flex-col inlg:flex-row gap-4">
                <Component.Bone width={28} height={28} rounded="full" />
                <Component.Bone width={28} height={28} rounded="full" />
            </div>
        </div>
    </div >
)