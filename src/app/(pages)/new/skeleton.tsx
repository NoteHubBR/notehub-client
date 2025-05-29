import { Component } from "@/components";

export const Skeleton = () => (
    <section
        className="w-full h-full p-8 inmd:p-0
        flex items-center justify-center
        dark:bg-dark bg-light"
    >
        <div
            aria-hidden="true"
            className="max-w-[666px] w-full h-[90%] p-8 rounded
            inmd:max-w-full inmd:h-full inmd:p-4 inmd:border-0
            border dark:border-middark border-midlight
            flex flex-col
            dark:bg-darker bg-lighter"
        >
            <Component.Bone width={147.7} height={28} rounded="lg" />
            <div className="px-1 py-4 max-w-full border-b dark:border-middark border-midlight">
                <Component.Bone width={295.67} height={20} rounded="lg" className="max-w-full" />
            </div>
            <div className="py-4 border-b dark:border-middark border-midlight flex flex-col gap-3">
                <div>
                    <div className="px-1">
                        <Component.Bone width={51.33} height={20} rounded="lg" />
                    </div>
                    <Component.Bone width={300} height={30} rounded="lg" className="my-2 max-w-full" />
                </div>
                <div>
                    <div className="px-1">
                        <Component.Bone width={51.33} height={20} rounded="lg" />
                    </div>
                    <Component.Bone width={600} height={30} rounded="lg" className="my-2 max-w-full" />
                </div>
            </div>
            <div className="py-4 border-b dark:border-middark border-midlight flex flex-col gap-6">
                <div className="w-full p-4 rounded-md border dark:border-middark border-midlight flex gap-3">
                    <div className="w-fit flex items-center gap-1">
                        <Component.Bone width={16} height={16} rounded="full" />
                        <Component.Bone width={80.58} height={17} rounded="lg" />
                    </div>
                    <div className="w-fit flex items-center gap-1">
                        <Component.Bone width={16} height={16} rounded="full" />
                        <Component.Bone width={80.58} height={17} rounded="lg" />
                    </div>
                </div>
                <div className="w-full p-4 rounded-md border dark:border-middark border-midlight flex gap-3">
                    <div className="w-fit flex items-center gap-1">
                        <Component.Bone width={16} height={16} rounded="full" />
                        <Component.Bone width={80.58} height={17} rounded="lg" />
                    </div>
                    <div className="w-fit flex items-center gap-1">
                        <Component.Bone width={16} height={16} rounded="full" />
                        <Component.Bone width={80.58} height={17} rounded="lg" />
                    </div>
                </div>
            </div>
            <div className="py-4 border-b dark:border-middark border-midlight flex-1">
                <div className="w-full h-full rounded border-2 border-dashed dark:border-middark border-midlight" />
            </div>
            <div className="pt-4 flex items-center justify-between">
                <div className="w-full flex items-center gap-1">
                    <Component.Bone width={24} height={24} rounded="full" />
                    <Component.Bone width={240} height={24} rounded="lg" />
                </div>
                <Component.Bone width={81.26} height={36} rounded="md" />
            </div>
        </div>
    </section>
)