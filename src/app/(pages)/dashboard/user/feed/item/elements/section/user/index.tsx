import { Info, Target } from './elements';
import { FeedEvent, LowDetailUser } from '@/core'
import { Toggle } from '@/components/buttons';

interface Props extends React.HTMLAttributes<HTMLElement> {
    event: FeedEvent;
    related: LowDetailUser;
}

export const Section = ({ event, related, ...rest }: Props) => (
    <section
        className="p-3 rounded flex flex-col gap-0.5 dark:bg-semidark bg-semilight"
        {...rest}
    >
        <Target event={event} />
        <div className='flex flex-col insm:items-start justify-between gap-1.5'>
            <Info event={event} />
            <Toggle.Follow
                user={related}
                size={16}
                useIcon
                useText
                className='!max-w-fit !mx-[30px] !px-[20px] !justify-start !text-xs !drop-shadow-none'
            />
        </div>
    </section>
)