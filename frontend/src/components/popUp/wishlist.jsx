import React, { useCallback, useEffect, useState } from "react";
import { useSharedContext } from "../../SharedContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { addToWishlistItem } from "../../services/membershipService";

export const Wishlist = () => {
    const {userDetail, setIsDropdownComponentOpen, barcodeToBeAddedToWishlist} = useSharedContext();
    const [wishlistsButtons, setWishlistsButtons] = useState();

    useEffect(() => {
        setWishlistsButtons(
        userDetail.wishlists.map((eachWishlist) => (
            <button className="wishlist__add-to-name px-5 py-3 border-top"
            onClick={() => {addToWishlistItem(barcodeToBeAddedToWishlist, eachWishlist)}}>
                <p>Add to <span><b>{eachWishlist.wishlistName}</b></span></p>
            </button>
        )))
    }, [userDetail])

    return (
        <>
            <div className="wishlist__header pt-4 px-3">
                <span></span>
                <button className="wishlist__header__close-btn" onClick={() => {setIsDropdownComponentOpen(false)}}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
            <button className="wishlist__create-new-list px-5 py-4">
                <p>Create a new list</p>
                <h4>+</h4>
            </button>
            <div className="wishlist__container">
                {wishlistsButtons}
            </div>
        </>
    )
}