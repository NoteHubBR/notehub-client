import { Event } from '@/core';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    event: Event;
    events: string[];
    onCheck: (event: Event) => () => void;
}

export const Checkbox = ({ event, events, onCheck, ...rest }: Props) => {
    const isChecked = events.some(e => e === event);
    return (
        <input
            onChange={onCheck(event)}
            checked={isChecked}
            type='checkbox'
            className='self-start mt-1'
            {...rest}
        />
    )
}