import Image from 'next/image';

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
    state: boolean;
}

export const Loading = ({ state, ...rest }: LoadingProps) => {
    return (
        <div
            className={`w-full py-2 flex items-center justify-center select-none pointer-events-none ${state ? '' : 'hidden'}`}
            {...rest}>
            <Image
                src={'/svgs/infinite-spinner.svg'}
                width={50} height={0}
                priority
                alt={'infinite-spinner'}
            />
        </div>
    )
}