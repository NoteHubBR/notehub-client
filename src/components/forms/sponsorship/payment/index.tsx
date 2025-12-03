import { Amount, Currencies, Currency, CurrencySelector } from "./elements";
import { countries, Country } from "./types";
import { DonationFormData, donationFormSchema } from "@/core";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const Form = (props: React.FormHTMLAttributes<HTMLFormElement>) => {

    const donationForm = useForm<DonationFormData>({
        resolver: zodResolver(donationFormSchema)
    })

    const { handleSubmit } = donationForm;

    const [amount, setAmount] = useState<string>('0');
    const [country, setCountry] = useState<Country>(countries.BR);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

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
                className="flex"
                {...props}
            >
                <div className="relative">
                    <CurrencySelector country={country} setIsDropdownOpen={setIsDropdownOpen} />
                    <Currencies isDropdownOpen={isDropdownOpen}>
                        {Object.entries(countries).map(([k, c]) => (
                            <Currency
                                key={k}
                                country={c}
                                currentCountry={country}
                                setCountry={setCountry}
                                setIsDropdownOpen={setIsDropdownOpen}
                            />
                        ))}
                    </Currencies>
                </div>
                <fieldset className="relative flex">
                    <label htmlFor="amount" className="absolute left-0 bottom-12 font-medium text-sm">Quantia</label>
                    <Amount
                        id="amount"
                        amount={amount}
                        setAmount={setAmount}
                        country={country}
                    />
                </fieldset>
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    )

}