import { clsx } from 'clsx';
import { Country } from '../types';
import { forwardRef } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

interface CurrencySelectorProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    country: Country
    isDropdownOpen: boolean;
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CurrencySelector = forwardRef<HTMLButtonElement, CurrencySelectorProps>((props, ref) => {

    CurrencySelector.displayName = 'CurrencySelector';

    const { country, isDropdownOpen, setIsDropdownOpen, children, ...rest } = props;

    const handleClick = (): void => setIsDropdownOpen(prev => !prev);

    return (
        <button
            ref={ref}
            aria-label='Alterar moeda'
            type='button'
            onClick={handleClick}
            className={clsx(
                'group select-none cursor-pointer disabled:pointer-events-none',
                'p-2 rounded-s-md',
                'flex items-center justify-center gap-1',
                'dark:bg-darker bg-lighter',
                'transition-colors ease-linear',
                'hover:bg-gradient-to-b hover:dark:from-semidark hover:dark:via-dark hover:dark:to-dark',
                'hover:bg-gradient-to-b hover:from-semilight hover:via-light hover:to-light',
                'focus:bg-gradient-to-b focus:dark:from-semidark focus:dark:via-dark focus:dark:to-dark',
                'focus:bg-gradient-to-b focus:from-semilight focus:via-light focus:to-light',
                'focus-visible:bg-gradient-to-b focus-visible:dark:from-semidark focus-visible:dark:via-dark focus-visible:dark:to-dark',
                'focus-visible:bg-gradient-to-b focus-visible:from-semilight focus-visible:via-light focus-visible:to-light',
            )}
            {...rest}
        >
            <IconChevronDown
                aria-hidden='true'
                size={24}
                className={clsx(
                    'dark:text-midlight/75 text-middark/75',
                    'transition-all ease-linear',
                    'group-hover:text-primary group-focus:text-primary group-focus-visible:text-primary',
                    isDropdownOpen ? 'rotate-180' : 'rotate-0'
                )}
            />
            <span className='min-w-6 flex items-center justify-center font-medium dark:text-midlight/75 text-middark/75'>
                {country.symbol}
            </span>
            {children}
        </button>
    )

})