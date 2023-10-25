import React, { useCallback, useEffect, useState } from "react";
import { useSharedContext } from "../../SharedContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons"

import { updateMembershipTable } from "../../services/membershipService";

export const Location = () => {
    const { setIsDropdownComponentOpen, userDetail, setUserDetail } = useSharedContext();
    const [ postalCodeShownOnTheScreen, setPostalCodeShownOnTheScreen ] = useState("")

    useEffect(() => {
        if (userDetail !== null) {
            setPostalCodeShownOnTheScreen(userDetail.postalCode);
        } else {
            setPostalCodeShownOnTheScreen("");
        }
    }, [userDetail])

    const saveButtonPressed = (postalCode, closePopUpAfterSave = true) => {
        if (userDetail !== null) { 
            setUserDetail({
                ...userDetail,
                postalCode: postalCode
            })
            if (userDetail.signedInToken) {
                // if signed in, update membership table in db
                updateMembershipTable(userDetail, 'postalCode');
            }
        }
        if (closePopUpAfterSave) { setIsDropdownComponentOpen(false) }
    }

    const forgetPostalCodeHandler = () => {
        setPostalCodeShownOnTheScreen("");
        saveButtonPressed("", false)
    }

    return (
        <>
            <div className="location__header py-3 px-3">
                <span></span>
                <button className="location__header__close-btn" onClick={() => {setIsDropdownComponentOpen(false)}}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
            <div className="location__content px-5" tabIndex="-1">
                <h2>Use your location</h2>
                <p className="py-2">Get updated information about product delivery and stock availability for your area.</p>
                <label for="postal-code__input-field">Enter a postal code</label>
                <div className="postal-code__input-field-wrapper">
                    <input id="postal-code__input-field" value={postalCodeShownOnTheScreen} onChange={(e) => setPostalCodeShownOnTheScreen(e.target.value)}></input>
                    <div className="postal-code__input-field-wrapper__border"></div>
                </div>
                <p className="location__content__reminder">e.g. M5J2X1</p>
                <p className="location__content__reminder">We use cookies to provide this service. Read more about how we use cookies in our policy. Please note that your location won’t be shared.</p>
            </div>
            <div className="location__footer py-3 px-3">
                <button className="py-3 my-2" onClick={() => {saveButtonPressed(postalCodeShownOnTheScreen)}}>Save</button>
                <button className="py-3 my-2" onClick={forgetPostalCodeHandler}>Forget postal code</button>
            </div>
        </>
    )
}