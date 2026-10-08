import { Bone } from "@/components";

export const Skeleton = (props: React.HTMLAttributes<HTMLElement>) => {

    const Div = (props: React.HTMLAttributes<HTMLDivElement>) => (
        <Bone width={192} height={144} rounded="md" {...props}>
            <div className="center flex flex-col items-center gap-1">
                <Bone width={75} height={75} rounded="full" />
                <Bone width={70} height={25} rounded="md" />
            </div>
            <div className="absolute bottom-1 left-1 flex items-center gap-1">
                <Bone width={40} height={20} rounded="md" />
            </div>
        </Bone>
    )

    return (
        <main className="my-4 flex flex-1 justify-center gap-3 flex-wrap" {...props}>
            {Array.from({ length: 8 }).map((_, i) => (
                <Div key={i} />
            ))}
        </main>
    )

}