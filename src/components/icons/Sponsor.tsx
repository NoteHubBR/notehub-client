import { IconCheck } from '@tabler/icons-react';
import Image from 'next/image';

interface Sponsor extends React.ImgHTMLAttributes<HTMLImageElement> {
    isSponsor: boolean;
    size: number;
    useWhite?: boolean;
    className?: string;
}

export const Sponsor = ({ isSponsor, size, useWhite, className, ...rest }: Sponsor) => {
    if (isSponsor) return (
        <figure role="img" className={`relative flex-none ${className}`} {...rest}>
            <Image
                aria-hidden="true"
                src={useWhite ? "/svgs/white-ten-pointed-star.svg" : "/svgs/violet-ten-pointed-star.svg"}
                alt="Patrocinador"
                width={size}
                height={size}
            />
            <IconCheck size={size - 10} className={`center ${useWhite ? 'text-primary' : 'text-white'}`} />
        </figure>
    )
}