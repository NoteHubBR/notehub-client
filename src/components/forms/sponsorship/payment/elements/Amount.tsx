import { Country } from "../types";
import { DonationFormData } from "@/core";
import { clsx } from "clsx";
import { useFormContext } from "react-hook-form";

interface AmountProps extends React.InputHTMLAttributes<HTMLInputElement> {
    amount: string;
    setAmount: React.Dispatch<React.SetStateAction<string>>;
    country: Country;
}

export const Amount = ({ amount, setAmount, country, ...rest }: AmountProps) => {

    const { setValue, setError } = useFormContext<DonationFormData>();

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
        )
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
        )
    }

    const formatCurrency = (amount: number, country: Country): string => {
        const countryData = country;
        if (countryData.isZeroDecimal) return amount.toLocaleString(countryData.locale, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })
        const mainValue = amount / 100;
        return mainValue.toLocaleString(countryData.locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const rawValue = e.target.value.replace(/\D/g, '');
        if (rawValue === '') return setAmount(country.locale === 'ja-JP' ? '0' : country.locale === 'pt-BR' ? '0,00' : '0.00');
        const amount = parseInt(rawValue, 10);
        setAmount(formatCurrency(amount, country));
        setValue('amount', amount);
        setError('amount', { type: 'value', message: '' });
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = ['Backspace', 'Delete', 'Tab'];
        if (!allowedKeys.includes(e.key) && (e.key < '0' || e.key > '9')) e.preventDefault();
    }

    return (
        <input
            type="text"
            value={amount}
            autoComplete="off"
            onFocus={handleFocus}
            onClick={handleClick}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={country.isZeroDecimal ? '0' : (country.locale === 'pt-BR' ? '0,00' : '0.00')}
            className={clsx(
                'insm:max-w-[177px] p-2 border dark:border-middark/50 border-midlight/50',
                'font-semibold dark:text-midlight text-middark',
                'dark:bg-darker bg-lighter',
            )}
            {...rest}
        />
    )

}