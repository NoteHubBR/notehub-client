import { Bone } from "@/components/Bone";
import { Section } from "../Section";

export const Skeleton = () => {

    const InfoSkeleton = ({ duplicate }: { duplicate?: boolean }) => (
        <div
            className="border-b p-3
            flex items-center gap-3
            dark:border-neutral-700/50 border-neutral-900/10
            last:border-none last:col-span-2 insm:last:col-span-1"
        >
            <Bone width={44} height={44} rounded="full" />
            <div className="flex flex-col gap-2">
                <Bone width={200} height={24} rounded="md" />
                {duplicate && <Bone width={200} height={24} rounded="md" />}
            </div>
        </div>
    )

    return (
        <Section className="w-full min-h-[300px] dark:bg-neutral-950 bg-neutral-50 animate-pulse">
            <header className="py-5 px-8 border-b inmd:flex inmd:justify-center dark:border-neutral-700/50 border-neutral-900/10">
                <Bone width={200} height={28} rounded="md" />
            </header>
            <div className="px-6 insm:px-0 insm:m-auto grid grid-cols-2 insm:grid-cols-1 gap-x-6">
                <InfoSkeleton duplicate />
                <InfoSkeleton duplicate />
                <InfoSkeleton />
                <InfoSkeleton />
                <InfoSkeleton />
            </div>
        </Section>
    )

}