import { User } from "@/core";
import Image from "next/image";

interface PictureProps {
    user: User;
    size?: number;
    className?:string;
}

export const Picture = (props: PictureProps) => {

    const { user, size = 30, className } = props;

    return (
        <Image src={user.avatar} width={size} height={size} alt={`Avatar de ${user.username}`} className={`rounded-full ${className}`} />
    )
}