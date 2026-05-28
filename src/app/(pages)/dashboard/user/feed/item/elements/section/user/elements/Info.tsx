import { Event, FeedEvent, LowDetailUser } from '@/core';

interface DescProps extends React.HTMLAttributes<HTMLParagraphElement> {
    event: FeedEvent;
}

const D = ({ term, desc }: { term: number, desc: string } & React.HTMLAttributes<HTMLElement>) => (
    <div className="flex items-center gap-1">
        <dt className="text-sm">
            {term}
        </dt>
        <dd className="text-sm dark:text-midlight text-middark">
            {desc}
        </dd>
    </div>
)

export const Info = ({ event, ...rest }: DescProps) => {

    const related: LowDetailUser | null = (() => {
        switch (event.event) {
            case Event.User_Followed: return event.related;
            default: return null;
        }
    })()

    if (related) return (
        <dl className="px-[52px] flex flex-col">
            <D term={related.notes_count} desc='notas' />
            <D term={related.followers_count} desc='seguidores' />
        </dl>
    )

}