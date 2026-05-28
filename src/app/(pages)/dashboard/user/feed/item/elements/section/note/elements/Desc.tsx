import { Event, FeedEvent, User } from '@/core';

interface DescProps extends React.HTMLAttributes<HTMLParagraphElement> {
    event: FeedEvent;
}

export const Desc = ({ event, ...rest }: DescProps) => {

    const desc = (() => {
        switch (event.event) {
            case Event.User_Followed: return event.related.message;
            case Event.Note_Created: return event.note.description;
            case Event.Note_Flamed: return event.flame.note.description;
            case Event.Note_Commented: return event.comment.note.description;
        }
    })()

    return (
        <p className="text-sm" {...rest}>
            {desc}
        </p>
    )

}