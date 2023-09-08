import React from "react";
import { useSharedContext } from "../../SharedContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons"

export const Store = () => {
    const { setIsProfileDropdownOpen, userDetail } = useSharedContext();

    return (
        <>
            <div className="store__header py-3 px-3">
                <span></span>
                <button className="store__header__close-btn" onClick={() => {setIsProfileDropdownOpen(false)}}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
            <div className="store__content px-4">
                <div className="store__content__info pt-1 pb-4">
                    <h2>{userDetail['preferredStore']['displayName']}</h2>
                    <p>Open until 9:00 p.m.</p>
                    <p>{userDetail['preferredStore']['address']['streetAddress']}, {userDetail['preferredStore']['address']['city']}</p>
                </div>
                <div className="opening-hours__container border-top pt-3">
                    <h2 className="store__hours__title">Normal opening hours</h2>
                    <div className="opening-hours__container__content">
                        <p>Mon - Fri</p>
                        <p>{userDetail['preferredStore']['weekdaysHours']}</p>
                    </div>
                    <div className="opening-hours__container__content">
                        <p>Sat</p>
                        <p>{userDetail['preferredStore']['satHours']}</p>
                    </div>
                    <div className="opening-hours__container__content">
                        <p>Sun</p>
                        <p>{userDetail['preferredStore']['sunHours']}</p>
                    </div>
                </div>
                <div className="opening-hours__container pt-3">
                    <h2 className="store__hours__title">Holiday hours</h2>
                    <div className="opening-hours__container__content">
                        <p>{userDetail['preferredStore']['holidayHours']}</p>
                    </div>
                </div>
                <div className="store-picker-message my-5 py-3">
                    <div className="px-3"><FontAwesomeIcon icon={faInfoCircle} /></div>
                    <p className="mb-0">Choose an IKEA Design studio or Pick-up location instead</p>
                </div>
                <div className="store-picker-btns">
                    <button>Visit store page</button>
                    <button>Select a different store</button>
                </div>
            </div>
        </>
    )
}