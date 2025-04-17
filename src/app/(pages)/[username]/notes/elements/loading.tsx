import Image from "next/image";

export const Loading = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        role="status"
        aria-labelledby="statusDesc"
        className="pointer-events-none select-none pt-4 flex-1 flex flex-col items-center justify-center gap-4 animate-pulse"
        {...props}
    >
        <Image
            src="/svgs/infinite-spinner.svg"
            width={66}
            height={0}
            priority
            alt=""
            aria-hidden="true"
        />
        <h2 id="statusDesc" className="text-md">
            Procurando
            <span aria-hidden="true" className="animated-dots"></span>
            <span aria-hidden="true" className="animated-dots"></span>
            <span aria-hidden="true" className="animated-dots"></span>
        </h2>
    </div>
)