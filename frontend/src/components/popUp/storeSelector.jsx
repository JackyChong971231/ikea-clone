import React, { useEffect, useState } from "react";
import { useSharedContext } from "../../SharedContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { getAllStores } from "../../services/storeService";

export const StoreSelector = () => {
    const {setIsProfileDropdownOpen, userDetail, setUserDetail} = useSharedContext();
    const [stores, setStores] = useState([]);


    const selectStore = (store) => {
        if(userDetail) {
            // console.log(store)
            setUserDetail({
                ...userDetail,
                preferredStore: store
            })
            setIsProfileDropdownOpen(false);
        }
    }

    useEffect(() => {
        getAllStores()
        .then(data => {
            console.log(data);
            setStores(data.map((eachStore) => (
                <li className="storeSelector__eachStore py-3"
                onClick={() => {selectStore(eachStore)}}>
                    <button>
                        <div>
                            <strong>{eachStore.displayName}</strong><br/>
                            <small>{eachStore.address.streetAddress}</small>
                        </div>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </li>
            )))
        })
    },[])

    return (
        <>
            <div className="storeSelector__header py-3 px-3">
                <span></span>
                <button className="storeSelector__header__close-btn" onClick={() => {setIsProfileDropdownOpen(false)}}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
            <div className="storeSelector__content px-3">
                <h1>Select your preferred store</h1>
                <div className="storeSelector__input py-3">
                    <label for="storeSelector__input-field">Search by city</label>
                    <div className="storeSelector__input-wrapper mb-3">
                        <input id="storeSelector__input-field"></input>
                    </div>
                    <p>Use your current location</p>
                </div>
                <ul className="storeSelector__allStores px-0">
                    {stores}
                </ul>
            </div>
        </>
    )
}