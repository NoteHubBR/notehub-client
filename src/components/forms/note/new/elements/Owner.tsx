import { clsx } from 'clsx';
import { Photo } from '@/components/medias/avatar';
import { useUser } from '@/data/hooks';

export const Owner = (props: React.HTMLAttributes<HTMLElement>) => {

    const { user } = useUser();

    if (user) return (
        <div
            className='select-none pointer-events-none flex-none flex items-center gap-2'
            {...props}
        >
            <div
                className={clsx(
                    'px-2 py-1 rounded-md    ',
                    'border dark:border-middark border-midlight',
                    'flex items-center gap-2',
                    'text-sm dark:text-midlight/75 text-middark/75',
                    'dark:bg-semidark bg-semilight',
                )}
            >
                <Photo size={20} user={user} />
                <span>{user.username}</span>
            </div>
            <span className='text-xl dark:text-midlight/50 text-middark/50'>/</span>
        </div>
    )

    return null;

}