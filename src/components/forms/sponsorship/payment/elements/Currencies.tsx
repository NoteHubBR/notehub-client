import { clsx } from 'clsx';

interface CurrenciesProps extends React.HTMLAttributes<HTMLUListElement> {
    isDropdownOpen: boolean;
}

export const Currencies = ({ isDropdownOpen, ...rest }: CurrenciesProps) => {

    const handleMouseDown = (e: React.MouseEvent<HTMLUListElement>): void => e.preventDefault();

    return (
        <ul
            onMouseDown={handleMouseDown}
            className={clsx(
                'absolute left-0 top-12 origin-top-left',
                'w-28 rounded-md',
                'flex flex-col px-2 py-1',
                'bg-light',
                isDropdownOpen
                    ? 'scale-100 transition-transform duration-300'
                    : 'scale-0 transition-none'
            )}
            {...rest}
        />
    )

}