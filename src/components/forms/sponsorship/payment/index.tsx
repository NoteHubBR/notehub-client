import { Amount, Currencies, CurrenciesDropdown, Currency, CurrencySelector, Icon, Submit } from "./elements";
import { countries, Country } from "./types";
import { DonationFormData, donationFormSchema } from "@/core";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const Form = (props: React.FormHTMLAttributes<HTMLFormElement>) => {

    const donationForm = useForm<DonationFormData>({
        resolver: zodResolver(donationFormSchema)
    })

    const { handleSubmit } = donationForm;

    const selectorRef = useRef<HTMLButtonElement | null>(null);

    const [amount, setAmount] = useState<string>('0');
    const [country, setCountry] = useState<Country>(countries.BR);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const isPending: boolean = false;

    useEffect(() => {
        return setAmount(country.isZeroDecimal ? '0' : country.locale === 'pt-BR' ? '0,00' : '0.00');
    }, [country.isZeroDecimal, country.locale]);

    const onSubmit = async (data: DonationFormData) => {
        console.log(data);
    }

    const onError = (errors: any) => {
        console.log(errors);
    }

    return (
        <FormProvider {...donationForm}>
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="flex flex-col gap-6 dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm"
                {...props}
            >
                <fieldset className="relative flex">
                    <CurrencySelector
                        ref={selectorRef}
                        disabled={isPending}
                        id="currencySelector"
                        aria-controls="currenciesDropdown"
                        aria-haspopup="menu"
                        aria-expanded={isDropdownOpen}
                        country={country}
                        isDropdownOpen={isDropdownOpen}
                        setIsDropdownOpen={setIsDropdownOpen}
                    />
                    <CurrenciesDropdown
                        triggerRef={selectorRef}
                        isDropdownOpen={isDropdownOpen}
                        setIsDropdownOpen={setIsDropdownOpen}
                    >
                        <Currencies
                            id="currenciesDropdown"
                            role="menu"
                            aria-orientation="vertical"
                            aria-hidden={!isDropdownOpen}
                            aria-labelledby="currencySelector"
                            hidden={!isDropdownOpen}
                        >
                            {Object.entries(countries).map(([k, c]) => (
                                <Currency
                                    key={k}
                                    role="menuitem"
                                    country={c}
                                    currentCountry={country}
                                    setCountry={setCountry}
                                />
                            ))}
                        </Currencies>
                    </CurrenciesDropdown>
                    <label htmlFor="amount" className="hidden">Quantia</label>
                    <Amount
                        disabled={isPending}
                        id="amount"
                        amount={amount}
                        setAmount={setAmount}
                        country={country}
                    />
                    <Icon />
                </fieldset>
                <Submit disabled={isPending} amount={amount} />
            </form>
        </FormProvider>
    )

}