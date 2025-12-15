import { Amount, Currencies, CurrenciesDropdown, Currency, CurrencySelector, Icon, Submit } from "./elements";
import { countries, Country } from "./types";
import { DonationFormData, donationFormSchema, Token } from "@/core";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useServices } from "@/data/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    token: Token | null
}

export const Form = ({ token, ...rest }: FormProps) => {

    const { sponsorshipService: { buySponsorship } } = useServices();

    const donationForm = useForm<DonationFormData>({
        resolver: zodResolver(donationFormSchema)
    })

    const { handleSubmit, setError } = donationForm;

    const selectorRef = useRef<HTMLButtonElement | null>(null);

    const [amount, setAmount] = useState<string>('0');
    const [country, setCountry] = useState<Country>(countries.BR);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    useEffect(() => {
        return setAmount(country.isZeroDecimal ? '0' : country.locale === 'pt-BR' ? '0,00' : '0.00');
    }, [country.isZeroDecimal, country.locale]);

    const onSubmit = (data: DonationFormData) => startTransition(async (): Promise<void> => {
        if (token) {
            await buySponsorship(token.access_token, data)
                .then(res => router.push(res.sessionUrl))
                .catch(error => setError('amount', { type: 'value', message: error }))
        }
        return;
    })

    return (
        <FormProvider {...donationForm}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm"
                {...rest}
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