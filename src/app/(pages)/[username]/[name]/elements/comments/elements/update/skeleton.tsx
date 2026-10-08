import { Bone } from "@/components";

export const Skeleton = () => (
    <div className="w-full py-4 flex gap-3">
        <div>
            <Bone width={40} height={40} rounded="full" />
        </div>
        <div className="min-w-0 flex-1 flex flex-col gap-2">
            <div className="w-full flex gap-2">
                <Bone width={75} height={20} rounded="lg" />
                <Bone width={50} height={20} rounded="lg" />
            </div>
            <div className="w-full flex flex-col gap-2">
                <Bone width={666} height={20} rounded="lg" className="max-w-full" />
                <Bone width={555} height={20} rounded="lg" className="max-w-[75%]" />
                <Bone width={444} height={20} rounded="lg" className="max-w-[50%]" />
            </div>
        </div>
    </div>
)