import { Component } from "@/components";

export const Skeleton = () => {
    return (
        <div
            className="w-full h-[8vh] inmd:h-[8svh] p-4
            flex items-center justify-between
            dark:bg-darker bg-lighter animate-pulse"
        >
            <div className="flex gap-4">
                <Component.Bone width={38} height={38} rounded="full" />
                <Component.Bone width={99} height={38} rounded="none" />
            </div>
            <div>
                <Component.Bone width={422} height={36} rounded="3xl" />
            </div>
            <div className="flex gap-4">
                <Component.Bone width={35} height={35} rounded="full" />
                <Component.Bone width={35} height={35} rounded="full" />
                <Component.Bone width={35} height={35} rounded="full" />
            </div>
        </div>
    )
}