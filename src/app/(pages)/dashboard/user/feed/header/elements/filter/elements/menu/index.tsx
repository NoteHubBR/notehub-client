import { Checkbox, Item, Label } from './elements';
import { clsx } from 'clsx';
import { events } from './events';

interface Props extends React.HTMLAttributes<HTMLUListElement> { }

export const Menu = (props: Props) => (
    <div className={clsx(
        'py-2',
    )}>
        <header className='px-4'>
            <p className='text-sm'>Eventos</p>
            <span className='text-xs dark:text-lighter/50 text-darker/50'>
                Atividades de seu interesse
            </span>
        </header>
        <ul className='py-2' {...props}>
            {Object.values(events).map((item, key) => (
                <li key={item.event}>
                    <Label htmlFor={item.event}>
                        <Checkbox id={item.event} />
                        <Item
                            icon={item.icon}
                            label={item.label}
                            tip={item.tip}
                        />
                    </Label>
                </li>
            ))}
        </ul>
    </div>
)