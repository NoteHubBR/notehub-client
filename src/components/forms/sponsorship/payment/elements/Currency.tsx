import { clsx } from "clsx";
import { Country } from "../types";
import { DonationFormData } from "@/core";
import { useFormContext } from "react-hook-form";
import Image from "next/image";

interface CurrencyProps extends React.LiHTMLAttributes<HTMLLIElement> {
    country: Country;
    currentCountry: Country;
    setCountry: React.Dispatch<React.SetStateAction<Country>>;
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Currency = ({ country, currentCountry, setCountry, setIsDropdownOpen, ...rest }: CurrencyProps) => {

    const { setValue } = useFormContext<DonationFormData>();

    const handleClick = (): void => {
        setCountry(country);
        setIsDropdownOpen(false);
        setValue('currency', country.currency);
    }

    return (
        <li className="py-1" {...rest}>
            <button
                type="button"
                onClick={handleClick}
                className={clsx(
                    'select-none',
                    'w-full h-full px-2 py-1 rounded-md',
                    'flex items-center justify-center gap-1',
                    'transition-colors duration-150',
                    country === currentCountry ? 'bg-primary/25' : 'hover:bg-middark/15'
                )}
            >
                <figure className="flex-1 pointer-events-none">
                    <Image
                        src={`/svgs/flags/${country.flag}.svg`}
                        alt={`Flag of ${country.flag}`}
                        width={30}
                        height={0}
                    />
                </figure>
                <div aria-hidden='true' className="border-l border-middark/25 h-6" />
                <p
                    className={clsx(
                        'flex-1 text-xs font-medium',
                        country === currentCountry ? 'text-primary' : 'text-middark'
                    )}
                >
                    {country.currency}
                </p>
            </button>
        </li>
    )

}