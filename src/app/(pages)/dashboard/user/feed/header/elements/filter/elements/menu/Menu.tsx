import { clsx } from 'clsx';

interface Props extends React.HTMLAttributes<HTMLUListElement> { }

export const Menu = ({ children, ...rest }: Props) => (
    <div className={clsx(
        'py-2',
    )}>
        <header className='px-4'>
            <p className='text-sm'>Eventos</p>
            <span className='text-xs dark:text-lighter/50 text-darker/50'>
                Atividades de seu interesse
            </span>
        </header>
        <ul className='py-2' {...rest}>
            {children}
        </ul>
    </div>
)