import { Creator, Message, Time } from './elements';
import { FeedEvent, User } from '@/core';

interface Props extends React.HTMLAttributes<HTMLElement> {
    user: User;
    event: FeedEvent;
}

export const Header = ({ event, user, ...rest }: Props) => (
    <header className="flex items-center gap-3">
        <Creator event={event} />
        <div className="flex flex-col">
            <Message user={user} event={event} />
            <Time time={event.created_at} />
        </div>
    </header>
)