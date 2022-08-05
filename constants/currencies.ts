interface SingleCurrency {
    name: string,
    symbol: string
}

const currencies: SingleCurrency[] = [
    {
        name: 'EUR',
        symbol: '€'
    },
    {
        name: 'GBP',
        symbol: '£'
    },
    {
        name: 'USD',
        symbol: '$'
    },
    {
        name: 'CZK',
        symbol: 'Kč'
    },
    {
        name: 'GTQ',
        symbol: 'Q'
    },
    {
        name: 'MXN',
        symbol: 'MX$'
    }
];

export default currencies;
