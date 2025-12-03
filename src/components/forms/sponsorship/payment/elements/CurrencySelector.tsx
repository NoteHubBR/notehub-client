import { clsx } from 'clsx';
import { Country } from '../types';
import { IconChevronDown } from '@tabler/icons-react';

interface CurrencySelectorProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    country: Country
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CurrencySelector = ({ country, setIsDropdownOpen, ...rest }: CurrencySelectorProps) => {

    const handleClick = (): void => setIsDropdownOpen(prev => !prev);
    const handleBlur = (): void => setIsDropdownOpen(false);

    return (
        <button
            aria-label='Alterar moeda'
            type='button'
            onClick={handleClick}
            onBlur={handleBlur}
            className={clsx(
                'select-none cursor-pointer',
                'min-w-[64px] h-full p-2 rounded-s-md',
                'flex items-center justify-center gap-1',
                'bg-light',
                'hover:bg-middark/15 '
            )}
            {...rest}
        >
            <IconChevronDown aria-hidden='true' size={24} className='dark:text-secondary text-primary' />
            <span className='min-w-6 flex items-center justify-center font-medium text-middark/75'>
                {country.symbol}
            </span>
        </button>
    )

}