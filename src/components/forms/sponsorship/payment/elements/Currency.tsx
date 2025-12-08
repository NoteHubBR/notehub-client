import { clsx } from "clsx";
import { Country } from "../types";
import { DonationFormData } from "@/core";
import { useFormContext } from "react-hook-form";
import Image from "next/image";

interface CurrencyProps extends React.LiHTMLAttributes<HTMLButtonElement> {
    country: Country;
    currentCountry: Country;
    setCountry: React.Dispatch<React.SetStateAction<Country>>;
}

export const Currency = ({ country, currentCountry, setCountry, ...rest }: CurrencyProps) => {

    const { setValue } = useFormContext<DonationFormData>();

    const handleClick = (): void => {
        setCountry(country);
        setValue('currency', country.currency);
    }

    const handleKeydown = (e: React.KeyboardEvent): void => {
        const key = e.key;
        if (key === 'Enter' || key === ' ') {
            setCountry(country);
            setValue('currency', country.currency);
            return;
        }
        return;
    }

    return (
        <li className="p-1">
            <button
                type="button"
                onClick={handleClick}
                onKeyDown={handleKeydown}
                className={clsx(
                    'select-none',
                    'w-full h-full px-2 py-1 rounded-md',
                    'flex items-center justify-center gap-1',
                    'transition-colors duration-150',
                    'dark:hover:bg-midlight/15 hover:bg-middark/15 dark:focus-visible:bg-midlight/15 focus-visible:bg-middark/15',
                    country === currentCountry && 'bg-primary/25'
                )}
                {...rest}
            >
                <figure className="flex-1 pointer-events-none flex items-center justify-center">
                    <Image
                        src={`/svgs/flags/${country.flag}.svg`}
                        alt={`Flag of ${country.flag}`}
                        width={24}
                        height={0}
                    />
                </figure>
                <div
                    aria-hidden='true'
                    className={clsx(
                        'h-3 border-l',
                        'dark:border-semilight/25 border-semidark/25',
                        country === currentCountry && 'dark:border-secondary border-primary'
                    )}
                />
                <p
                    className={clsx(
                        'flex-1 text-xs font-medium',
                        'dark:text-midlight/75 text-middark/75',
                        country === currentCountry && 'dark:text-secondary text-primary'
                    )}
                >
                    {country.currency}
                </p>
            </button>
        </li>
    )

}