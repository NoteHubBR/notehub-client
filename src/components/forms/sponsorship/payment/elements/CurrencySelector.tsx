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
                'group select-none cursor-pointer',
                'min-w-[64px] h-full p-2 rounded-s-md',
                'border-y border-l dark:border-middark/50 border-midlight/50',
                'flex items-center justify-center gap-1',
                'dark:bg-darker bg-lighter',
                'transition-colors ease-linear',
                'hover:bg-semilight dark:hover:bg-semidark',
                'focus:bg-semilight dark:focus:bg-semidark',
                'focus-visible:bg-semilight dark:focus-visible:bg-semidark'
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