import { Component } from '@/components';

export const Skeleton = (props: React.HTMLAttributes<HTMLElement>) => {

    const Div = (props: React.HTMLAttributes<HTMLDivElement>) => (
        <div
            className="p-3
            flex items-start rounded-lg
            dark:bg-dark bg-light
            dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm"
            {...props}
        >
            <div className="w-full flex flex-col gap-3">
                <div className="relative pl-14 flex flex-col gap-1">
                    <Component.Bone width={44} height={44} rounded="full" className="absolute top-0 left-0" />
                    <Component.Bone width={130} height={20} rounded="xl" />
                    <Component.Bone width={100} height={15} rounded="xl" />
                </div>
                <div className="mt-1 pl-14 insm:pl-0 flex flex-col gap-3">
                    <Component.Bone width={175} height={30} rounded="xl" />
                    <Component.Bone width={225} height={20} rounded="xl" />
                    <div className="mt-1 flex items-center gap-3 flex-wrap">
                        <Component.Bone width={50} height={25} rounded="full" />
                        <Component.Bone width={50} height={25} rounded="full" />
                        <Component.Bone width={50} height={25} rounded="full" />
                        <Component.Bone width={50} height={25} rounded="full" />
                        <Component.Bone width={50} height={25} rounded="full" />
                    </div>
                </div>
                <div className="mt-1 pl-14 insm:pl-0 flex items-center justify-between">
                    <Component.Bone width={110} height={25} rounded="xl" />
                    <Component.Bone width={32} height={32} rounded="full" />
                </div>
            </div>
        </div>
    )

    return (
        <main className="w-full my-4 flex flex-col gap-3" {...props}>
            <Div />
            <Div />
            <Div />
            <Div />
            <Div />
        </main>
    )
    
}