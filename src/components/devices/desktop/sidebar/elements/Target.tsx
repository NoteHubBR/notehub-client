import { Component } from "@/components";
import { LowDetailNote, LowDetailUser } from "@/core";

interface TargetProps extends React.HTMLAttributes<HTMLDivElement> {
    user: LowDetailUser;
    note?: LowDetailNote;
}

export const Target = (props: TargetProps) => {

    const { user, note, ...rest } = props;

    return (
        <div className="py-1 px-2 flex items-center gap-3" {...rest}>
            <Component.Photo user={user} />
            {note
                ?
                <span className="text-sm truncate">{note.title}</span>
                :
                <span className="text-sm truncate">{user.username}</span>
            }
        </div>
    )

}