import { Carousel } from 'bootstrap';
import React, { useEffect, useState } from 'react';

const dummy = {
    'Order by phone': {'logo': '! ', 'link': 'https://www.ikea.com/ca/en/customer-service/support/a/5a47Y4JWTxWKBV5DM0zgDc/'},
    'Join IKEA Family': {'logo': '! ', 'link': 'https://www.ikea.com/ca/en/profile/signup/family/'},
    'IKEA Summer SALE': {'logo': '! ', 'link': 'https://www.ikea.com/ca/en/campaigns/ikea-summer-sale-pub5e3f1020'},
    'Download Mobile App': {'logo': '! ', 'link': 'https://www.ikea.com/ca/en/campaigns/ikea-summer-sale-pub5e3f1020'}
};



export const Campaigns = () => {
    // const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [intervalID, setIntervalID] = useState(0)
    const [toDisplayOrder, setToDisplayOrder] = useState(Object.keys(dummy));

    const handleResize = () => {
        clearInterval(intervalID);
        setIsMobile(window.innerWidth <768);

    }

    useEffect(() => {
        clearInterval(intervalID);
        window.removeEventListener('resize', handleResize);
        console.log('call api to see how many messages!'); // add a method to get news from db
        
        setIntervalID(setInterval(() => {
            // setCurrentIndex((prevIndex) => (prevIndex + (isMobile? 1: 3)) % Object.keys(dummy).length);

            setToDisplayOrder(prevToDisplayOrder => [
                ...prevToDisplayOrder.slice((isMobile? 1: 3)),
                ...prevToDisplayOrder.slice(0,(isMobile? 1: 3))
            ]);

        }, 5000));
        
        window.addEventListener('resize', handleResize);
    }, [isMobile])

    return (
        <div className='campaigns carousel slide' data-ride='carousel' data-interval="1000">
            {/* <div className='campaigns__content row py-2 carousel-inner'>
                {campaignsContent}
            </div>
            <div>{currentIndex}</div> */}
            <div className='campaigns__content py-2'>
                {toDisplayOrder.slice(0,(isMobile? 1: 3)).map((displayName) => (
                    <a className='campaigns__content__item__link--white mx-5' href={dummy[displayName]['link']}
                    data-tracking-label='campaigns-local'>
                        <span>{dummy[displayName]['logo']}</span>
                        <span>{displayName}</span>
                    </a>
                ))}
            </div>
        </div>
    );
}