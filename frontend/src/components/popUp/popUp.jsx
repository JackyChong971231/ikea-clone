import React, { useEffect, useState } from 'react';

import { useSharedContext } from '../../SharedContext';
import { Profile } from './profile';
import { Location } from './location';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { StoreSelected } from './storeSelected';
import { StoreSelector } from './storeSelector';
import { Wishlist } from './wishlist';

export const PopUp = () => {
    const { isDropdownComponentOpen, setIsDropdownComponentOpen, whichDropdownContent, setWhichDropdownContent, userDetail, emptyUserDetail, isSignedIn } = useSharedContext();
    const { popUpToShow, setPopUpToShow } = useState();

    const whichDropdownContentToShow = () => {
        switch(whichDropdownContent) {
            case 'profile': return <Profile/>;
            case 'location': return <Location/>
            case 'store': 
                if (isSignedIn) {
                    return <StoreSelected/>;
                } else {
                    return <StoreSelector />
                }
            case 'storeSelector': return <StoreSelector />
            case 'wishlist': return <Wishlist />
            default: return null;
        }
    }

    return (
        <div className={'popUp '+ ((isDropdownComponentOpen)?'popUp--open':'popUp--close')}>
            {whichDropdownContentToShow()}
        </div>
    )
}

export default PopUp;