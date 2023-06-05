import { fireEvent, render, screen } from '@testing-library/react';
import MarketCard from '../components/marketCard/marketCard';

const summary = {
    "symbol": "1ECO-BTC",
    "high": "0.000021530000",
    "low": "0.000013010000",
    "volume": "52.69027946",
    "quoteVolume": "0.00094688",
    "percentChange": "-39.57",
    "updatedAt": "2023-06-05T05:08:17.827Z"
};
const currencies = [
    {
        "symbol": "1ECO",
        "name": "1eco",
        "coinType": "ETH_CONTRACT",
        "status": "ONLINE",
        "minConfirmations": 36,
        "notice": "",
        "txFee": "14.00000000",
        "logoUrl": "https://bittrex.com/content/dynamic/currencies/logos/2b6c1053-c142-42a2-882b-0c3fbfb8185d.png",
        "prohibitedIn": [
            "US"
        ],
        "baseAddress": "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98",
        "associatedTermsOfService": [],
        "tags": []
    },
    {
        "symbol": "BTC",
        "name": "Bitcoin",
        "coinType": "ETH_CONTRACT",
        "status": "ONLINE",
        "minConfirmations": 36,
        "notice": "",
        "txFee": "27.00000000",
        "logoUrl": "https://bittrex.com/content/dynamic/currencies/logos/af3cb287-9bc2-460d-bfc4-0ccbf0981cfc.png",
        "prohibitedIn": [],
        "baseAddress": "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98",
        "associatedTermsOfService": [],
        "tags": []
    }
]
test('renders markets card', () => {
    render(<MarketCard summary={summary} currencies={currencies} />);
    expect(screen.getByText('(1ECO-BTC)')).toBeInTheDocument();
});