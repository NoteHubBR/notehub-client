import { clsx } from 'clsx';
import { Icon } from '@/components/icons';

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
    state: boolean;
}

export const Loading = ({ state, ...rest }: LoadingProps) => (
    <div
        role='status'
        className={clsx(
            state ? '' : 'hidden',
            'h-full w-full py-2 flex items-center justify-center select-none pointer-events-none'
        )}
        {...rest}
    >
        <Icon.Loading size={50} />
    </div>
)