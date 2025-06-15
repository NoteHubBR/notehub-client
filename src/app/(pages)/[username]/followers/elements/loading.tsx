import { Icon } from "@/components/icons";

export const Loading = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        role="status"
        aria-labelledby="statusDesc"
        className="pointer-events-none select-none pt-4 flex-1 flex flex-col items-center justify-center gap-4 animate-pulse"
        {...props}
    >
        <Icon.Loading size={66} />
        <h2 id="statusDesc" className="text-md">Procurando<Icon.Dots /></h2>
    </div>
)