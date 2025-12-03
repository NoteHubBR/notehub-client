export type Country = {
    currency: string;
    symbol: string;
    flag: string;
    locale: string;
    isZeroDecimal: boolean;
}

export type CountriesMap = Record<"BR" | "US" | "CA" | "EU" | "UK" | "JP" | "AU", Country>;

export const countries: CountriesMap = {
    BR: {
        currency: 'BRL',
        symbol: 'R$',
        flag: 'br',
        locale: 'pt-BR',
        isZeroDecimal: false,
    },
    US: {
        currency: 'USD',
        symbol: '$',
        flag: 'us',
        locale: 'en-US',
        isZeroDecimal: false,
    },
    CA: {
        currency: 'CAD',
        symbol: '$',
        flag: 'ca',
        locale: 'en-CA',
        isZeroDecimal: false,
    },
    EU: {
        currency: 'EUR',
        symbol: '€',
        flag: 'eu',
        locale: 'de-DE',
        isZeroDecimal: false,
    },
    UK: {
        currency: 'GBP',
        symbol: '£',
        flag: 'uk',
        locale: 'en-GB',
        isZeroDecimal: false,
    },
    JP: {
        currency: 'JPY',
        symbol: '¥',
        flag: 'jp',
        locale: 'ja-JP',
        isZeroDecimal: true,
    },
    AU: {
        currency: 'AUD',
        symbol: '$',
        flag: 'au',
        locale: 'en-AU',
        isZeroDecimal: false,
    }
}