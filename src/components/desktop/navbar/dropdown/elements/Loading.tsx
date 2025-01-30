import Image from 'next/image';

export const Loading = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className="w-full py-2 flex items-center justify-center select-none pointer-events-none" {...props}>
            <Image
                src={'/svgs/infinite-spinner.svg'}
                width={50} height={0}
                priority
                alt={'aaaa'}
            />
        </div>
    )
}