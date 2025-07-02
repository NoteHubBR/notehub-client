import { Component } from "@/components";

export const Skeleton = () => (
    <div
        className="w-full py-2 px-4
        flex items-center justify-between
        dark:bg-darker bg-lighter animate-pulse"
    >
        <div className="flex gap-4">
            <Component.Bone width={77} height={28} rounded="none" />
        </div>
        <div className="flex gap-4">
            <Component.Bone width={32} height={32} rounded="full" />
            <Component.Bone width={32} height={32} rounded="full" />
            <Component.Bone width={32} height={32} rounded="full" />
        </div>
    </div>
)