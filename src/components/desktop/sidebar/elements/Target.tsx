import { LowDetailNote, LowDetailUser } from "@/core";
import { Photo } from "@/components/Photo";

interface TargetProps extends React.HTMLAttributes<HTMLDivElement> {
    user: LowDetailUser;
    note?: LowDetailNote;
}

export const Target = (props: TargetProps) => {

    const { user, note, ...rest } = props;

    return (
        <div className="py-1 px-2 flex items-center gap-3" {...rest}>
            <Photo user={user} />
            {note
                ?
                <span className="text-sm truncate">{note.title}</span>
                :
                <span className="text-sm truncate">{user.username}</span>
            }
        </div>
    )

}