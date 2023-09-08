import React from "react";
import { useSharedContext } from "../../SharedContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons"

export const Location = () => {
    const { setIsProfileDropdownOpen } = useSharedContext();

    return (
        <>
            <div className="location__header py-3 px-3">
                <span></span>
                <button className="location__header__close-btn" onClick={() => {setIsProfileDropdownOpen(false)}}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
            <div className="location__content px-5" tabindex="-1">
                <h2>Use your location</h2>
                <p className="py-2">Get updated information about product delivery and stock availability for your area.</p>
                <label for="postal-code">Enter a postal code</label>
                <div className="postal-code__input-field-wrapper">
                    <input id="postal-code__input-field"></input>
                    <div className="postal-code__input-field-wrapper__border"></div>
                </div>
                <p className="location__content__reminder">e.g. M5J2X1</p>
                <p className="location__content__reminder">We use cookies to provide this service. Read more about how we use cookies in our policy. Please note that your location won’t be shared.</p>
            </div>
            <div className="location__footer py-3 px-3">
                <button className="py-3 my-2">Save</button>
                <button className="py-3 my-2">Forget postal code</button>
            </div>
        </>
    )
}