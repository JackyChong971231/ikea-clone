import React, { useEffect, useState } from 'react';
import { converPrice2String } from '../../utils/common';

export const PriceTag = (props) => {
    const { amount, ...other } = props;
    return (
        <div className='price-tag'>
            <span className='price-tag__currency'><b>$</b></span>
            <span className='price-tag__integer'><b>{converPrice2String(amount)[0]}</b></span>
            <span className='price-tag__separator'><b>.</b></span>
            <span className='price-tag__decimal'><b>{converPrice2String(amount)[1]}</b></span>
        </div>
    )
}
