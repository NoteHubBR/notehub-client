import { Component } from "@/components";
import { Section } from "../Section";

export const HeaderSkeleton = (props: React.HTMLAttributes<HTMLElement>) => {
    return (
        <header {...props}>
            <Section className="w-full h-[394.33px] p-4 flex items-end gap-4 dark:bg-darker bg-lighter animate-pulse">
                <Component.Bone width={111} height={111} rounded="full" className="flex-none" />
                <div className="w-full flex flex-col gap-4">
                    <Component.Bone width={144} height={36} rounded="md" />
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex gap-4">
                            <Component.Bone width={111} height={36} rounded="md" />
                            <Component.Bone width={111} height={36} rounded="md" />
                            <Component.Bone width={111} height={36} rounded="md" />
                        </div>
                        <Component.Bone width={111} height={36} rounded="3xl" />
                    </div>
                </div>
            </Section>
        </header>
    )
}