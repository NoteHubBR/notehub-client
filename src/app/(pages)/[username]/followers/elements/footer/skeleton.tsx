import { Bone } from "@/components";

export const Skeleton = (props: React.HTMLAttributes<HTMLElement>) => {
    return (
        <footer className="pb-2" {...props}>
            <div className="flex items-center justify-center gap-3">
                <Bone width={24} height={24} rounded="full" />
                <Bone width={24} height={24} rounded="full" />
                <Bone width={24} height={24} rounded="full" />
            </div>
        </footer>
    )
}