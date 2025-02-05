import { User } from "@/core";
import Image from "next/image";

interface PhotoProps {
    user: Partial<User>;
    size?: number;
    className?: string;
}

export const Photo = (props: PhotoProps) => {

    const { user, size = 30, className } = props;

    if (user.avatar && user.username) {
        return (
            <div style={{ width: size, height: size }} className={`overflow-hidden flex-none rounded-full ${className}`}>
                <Image
                    src={user.avatar}
                    width={size}
                    height={size}
                    alt={`Avatar de ${user.username}`}
                    className="w-full h-full object-cover"
                />
            </div>
        );
    }

    return null;

};