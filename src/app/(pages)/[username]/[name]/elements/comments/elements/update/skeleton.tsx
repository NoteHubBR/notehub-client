import { Component } from "@/components";

export const Skeleton = () => (
    <div className="w-full py-4 flex gap-3">
        <div>
            <Component.Bone width={40} height={40} rounded="full" />
        </div>
        <div className="min-w-0 flex-1 flex flex-col gap-2">
            <div className="w-full flex gap-2">
                <Component.Bone width={75} height={20} rounded="lg" />
                <Component.Bone width={50} height={20} rounded="lg" />
            </div>
            <div className="w-full flex flex-col gap-2">
                <Component.Bone width={666} height={20} rounded="lg" className="max-w-full" />
                <Component.Bone width={555} height={20} rounded="lg" className="max-w-[75%]" />
                <Component.Bone width={444} height={20} rounded="lg" className="max-w-[50%]" />
            </div>
        </div>
    </div>
)