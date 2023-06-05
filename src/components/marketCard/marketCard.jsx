import React from "react";
import moment from 'moment';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { TfiExchangeVertical } from 'react-icons/tfi';

const MarketCard = ({summary, currencies}) => {

    const getNames = (symbols) => {
        const splitSymbol = symbols.split('-');
        const baseSymbol = splitSymbol[0];
        const quoteSymbol = splitSymbol[1];
        const baseName = currencies.find((currency) => currency.symbol === baseSymbol).name;
        const quoteName = currencies.find((currency) => currency.symbol === quoteSymbol).name;

        return `${baseName} / ${quoteName}`;
    }

    return (
        <div className='card' data-testid={summary.symbol}>
            <div className='card-header'>
                <h2>
                    {getNames(summary.symbol)}
                    <span>({summary.symbol})</span>
                </h2>
                <p className='last-updated'>{<AiOutlineClockCircle />}{moment(summary.updatedAt).fromNow()}</p>
            </div>
            <div className='card-body'>
                <p><b>Volume:</b> {parseFloat(summary.volume)}</p>
                <p><b>Quote Volume:</b> {parseFloat(summary.quoteVolume)}</p>
                <p><b>High:</b> {parseFloat(summary.high).toFixed(8)}</p>
                <p>
                    <b>Low:</b> {parseFloat(summary.low).toFixed(8)}

                    {summary.percentChange && <span>({<TfiExchangeVertical className='change' />}{parseFloat(summary.percentChange)}%)</span>}
                </p>
            </div>
        </div>
    )
}

export default MarketCard;