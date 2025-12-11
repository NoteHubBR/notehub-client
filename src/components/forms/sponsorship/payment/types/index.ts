export type Country = {
    currency: string;
    symbol: string;
    flag: string;
    locale: string;
    stripeLocale: string;
    isZeroDecimal: boolean;
}

export type CountriesMap = Record<"BR" | "US" | "CA" | "EU" | "UK" | "JP" | "AU", Country>;

export const countries: CountriesMap = {
    BR: {
        currency: 'BRL',
        symbol: 'R$',
        flag: 'br',
        locale: 'pt-BR',
        stripeLocale: 'PT_BR',
        isZeroDecimal: false,
    },
    US: {
        currency: 'USD',
        symbol: '$',
        flag: 'us',
        locale: 'en-US',
        stripeLocale: 'EN',
        isZeroDecimal: false,
    },
    CA: {
        currency: 'CAD',
        symbol: '$',
        flag: 'ca',
        locale: 'en-CA',
        stripeLocale: 'EN',
        isZeroDecimal: false,
    },
    EU: {
        currency: 'EUR',
        symbol: '€',
        flag: 'eu',
        locale: 'de-DE',
        stripeLocale: 'DE',
        isZeroDecimal: false,
    },
    UK: {
        currency: 'GBP',
        symbol: '£',
        flag: 'uk',
        locale: 'en-GB',
        stripeLocale: 'EN',
        isZeroDecimal: false,
    },
    JP: {
        currency: 'JPY',
        symbol: '¥',
        flag: 'jp',
        locale: 'ja-JP',
        stripeLocale: 'JA',
        isZeroDecimal: true,
    },
    AU: {
        currency: 'AUD',
        symbol: '$',
        flag: 'au',
        locale: 'en-AU',
        stripeLocale: 'EN',
        isZeroDecimal: false,
    }
}