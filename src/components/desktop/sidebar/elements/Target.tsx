import { LowDetailNote, LowDetailUser } from "@/core";
import Image from "next/image";

interface TargetProps extends React.HTMLAttributes<HTMLDivElement> {
    user: LowDetailUser;
    note?: LowDetailNote;
}

export const Target = (props: TargetProps) => {

    const { user, note, ...rest } = props;

    return (
        <div className="py-1 px-2 flex items-center gap-3" {...rest}>
            <Image src={user.avatar} alt={`avatar de ${user.username}`} width={27} height={27} className="rounded-full" />
            {note
                ?
                <span className="overflow-hidden whitespace-nowrap text-ellipsis text-sm">{note.title}</span>
                :
                <span className="overflow-hidden whitespace-nowrap text-ellipsis text-sm">{user.username}</span>
            }
        </div>
    )

}