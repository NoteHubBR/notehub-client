import { Component } from "@/components";

export const Skeleton = () => (
    <div
        className="z-[997] fixed bottom-0
        w-full h-[45px] px-4
        border-t dark:border-lighter/10 border-dark/10
        dark:bg-darker bg-lighter"
    >
        <div className="w-full h-full px-2 flex items-center justify-between insm:justify-between">
            <Component.Bone width={24} height={24} rounded="full" />
            <Component.Bone width={24} height={24} rounded="full" />
            <Component.Bone width={24} height={24} rounded="full" />
            <Component.Bone width={24} height={24} rounded="full" />
            <Component.Bone width={24} height={24} rounded="full" />
        </div>
    </div>
)