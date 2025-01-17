import Image from "next/image";

interface NoteLinkProps extends React.HTMLAttributes<HTMLDivElement> {
    avatar: string;
    username: string;
    title: string;
}

export const NoteLink = (props: NoteLinkProps) => {

    const { avatar, username, title, ...rest } = props;

    return (
        <div className="py-1 px-2 flex items-center gap-1" {...rest}>
            <Image src={avatar} alt={`avatar de ${username}`} width={24} height={24} className="rounded-full" />
            <span className="text-sm">{title.slice(0, 14)}...</span>
        </div>
    )

}