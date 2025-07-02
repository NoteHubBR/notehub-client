import Image from "next/image";

export const Brands = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className="pointer-events-none select-none
        p-2 rounded
        flex items-center gap-3
        border dark:border-middark/75 border-midlight/75
        dark:bg-darker bg-lighter"
        {...props}
    >
        <Image
            src="/imgs/logo.png"
            width={50} height={0}
            priority alt={"Logo de XYZ"}
            className="dark:invert"
        />
        <Image
            src="/svgs/google-icon.svg"
            width={22} height={0}
            priority alt={"Logo do Google"}
        />
        <Image
            src="/svgs/github-icon.svg"
            width={24} height={0}
            priority alt={"Logo do GitHub"}
            className="dark:invert"
        />
    </div>
)