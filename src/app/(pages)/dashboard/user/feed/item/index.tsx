import { Event, FeedEvent, User } from "@/core";
import { Toggle } from "@/components/buttons";
import { Article, Header, Section } from './elements';

export const Item = ({ user, event }: { user: User, event: FeedEvent }) => {

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

    if (related) return (
        <Article>
            <Header user={user} event={event} />
            <Section.User event={event} related={related} />
        </Article>
    )

    if (note) return (
        <Article>
            <Header user={user} event={event} />
            <Section.Note event={event} note={note} />
        </Article>
    )

    return null;

}