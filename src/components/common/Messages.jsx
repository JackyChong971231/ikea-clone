import React, { useEffect, useState } from 'react';

const dummy = {
    'Order by phone': {'logo': '! ', 'link': 'https://www.ikea.com/ca/en/customer-service/support/a/5a47Y4JWTxWKBV5DM0zgDc/'},
    'Join IKEA Family': {'logo': '! ', 'link': 'https://www.ikea.com/ca/en/profile/signup/family/'},
    'IKEA Summer SALE': {'logo': '! ', 'link': 'https://www.ikea.com/ca/en/campaigns/ikea-summer-sale-pub5e3f1020'}
};

export const Messages = () => {
    useEffect(() => {
        console.log('call api to see how many messages!'); // add a method to get news from db
    })

    return (
        <div className='Messages'>
            <div className='Messages__Wrapper'>
                <div className='Messages_Content'>
                    <div className='Messages_Content_Item'>
                        <span>Order by phone</span>
                    </div>
                    <div className='Messages_Content_Item'>
                        <span>Join IKEA Family</span>
                    </div>
                    <div className='Messages_Content_Item'>
                        <span>IKEA Summer SALE</span>
                    </div>
                </div>
            </div>
        </div>
    )
}