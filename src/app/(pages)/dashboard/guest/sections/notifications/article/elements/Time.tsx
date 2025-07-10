import { clsx } from 'clsx';

interface TimeProps extends React.TimeHTMLAttributes<HTMLTimeElement> {
    isMouseOnDateField: boolean;
    date: string;
    createdAt: string;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
}

export const Time = ({ isMouseOnDateField, date, createdAt, handleMouseEnter, handleMouseLeave, ...rest }: TimeProps) => (
    <time
        className="flex gap-2 px-2 text-xs dark:text-lighter/50 text-darker/50"
        {...rest}
    >
        <span
            className={clsx(
                isMouseOnDateField ? 'opacity-100' : 'opacity-0',
                'px-2 rounded-full',
                'font-semibold dark:text-white text-black',
                'dark:bg-black bg-white',
                'transition-opacity duration-200'
            )}
        >
            {date === "agora" ? "agora" : `${date}h`}
        </span>
        <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {createdAt === "agora" ? "agora" : createdAt}
        </span>
    </time>
)