import { Element } from "./elements";
import { Event, FeedEvent, User } from "@/core";
import { Toggle } from "@/components/buttons";

export const Item = ({ user, event }: { user: User, event: FeedEvent }) => {

    const {
        Article,
        Header: { Creator, Message, Time },
        Section: { Target, Desc }
    } = Element;

    const getRelated = ((event: FeedEvent) => {
        return event.event === Event.User_Followed ? event.related : null;
    })

    const getNote = ((event: FeedEvent) => {
        switch (event.event) {
            case Event.Note_Created: return event.note;
            case Event.Note_Flamed: return event.flame.note;
            case Event.Note_Commented: return event.comment.note;
            default: return null;
        }
    })

    const related = getRelated(event);
    const note = getNote(event);

    return (
        <Article>
            <header className="flex items-center gap-3">
                <Creator event={event} />
                <div className="flex flex-col">
                    <Message user={user} event={event} />
                    <Time time={event.createdAt} />
                </div>
            </header>
            <section className="p-3 rounded flex flex-col gap-2 dark:bg-semidark bg-semilight">
                <Target event={event} />
                <Desc user={user} event={event} />
                {related ? <Toggle.Follow user={event.actor} useIcon useText className='!m-0'/> : null}
                {note ? <Toggle.Flame size={18} note={note} useCount /> : null}
            </section>
        </Article>
    )

}