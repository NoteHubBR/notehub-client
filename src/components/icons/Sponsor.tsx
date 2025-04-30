import { IconCheck } from '@tabler/icons-react';
import { LowDetailUser, User } from '@/core';
import Image from 'next/image';

interface Sponsor extends React.ImgHTMLAttributes<HTMLImageElement> {
    user: User | LowDetailUser;
    size?: number;
    useWhite?: boolean;
}

export const Sponsor = ({ user, size = 24, useWhite, className, ...rest }: Sponsor) => {
    if (user.sponsor) return (
        <figure role="img" className={`select-none pointer-events-none relative flex-none inline-block align-middle ${className}`} {...rest}>
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