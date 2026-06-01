import { Desc, Target } from './elements';
import { FeedEvent, LowDetailNote, User } from '@/core'
import { Toggle } from '@/components/buttons';

interface Props extends React.HTMLAttributes<HTMLElement> {
    event: FeedEvent;
    note: LowDetailNote;
}

export const Section = ({ event, note, ...rest }: Props) => (
    <section
        className="p-3 rounded flex flex-col gap-2 dark:bg-semidark bg-semilight"
        {...rest}
    >
        <Target event={event} />
        <Desc event={event} />
        <Toggle.Flame size={18} note={note} useCount />
    </section>
)