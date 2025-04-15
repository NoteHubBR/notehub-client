import Image from "next/image";

export const Loading = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div role="status" aria-labelledby="statusDesc" className="p-4 flex flex-col items-center gap-3" {...props}>
            <Image
                src="/svgs/infinite-spinner.svg"
                width={75}
                height={0}
                priority
                alt=""
                aria-hidden="true"
            />
            <span id="statusDesc" className="text-sm">Procurando...</span>
        </div>
    )
}