import React, { useEffect, useState } from 'react';

import { useSharedContext } from '../../SharedContext';
import { Profile } from './profile';
import { Location } from './location';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { Store } from './store';

export const PopUp = () => {
    const { isProfileDropdownOpen, setIsProfileDropdownOpen, whichPopUp, setWhichPopUp, userDetail } = useSharedContext();
    const { popUpToShow, setPopUpToShow } = useState();

    const whichPopUpToShow = () => {
        switch(whichPopUp) {
            case 'profile': return <Profile/>;
            case 'location': 
                if (userDetail !== null) {
                    return <Location/>
                } else {
                    
                    return null
                }; // return <FindStore /> if null
            case 'store': return <Store/>;
            default: return null;
        }
    }

    return (
        <div className={'popUp '+ ((isProfileDropdownOpen)?'popUp--open':'popUp--close')}>
            {whichPopUpToShow()}
        </div>
    )
}

export default PopUp;