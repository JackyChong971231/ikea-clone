import React, { useCallback, useEffect, useState } from "react";
import { useSharedContext } from "../../SharedContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faHeart } from "@fortawesome/free-solid-svg-icons"
import { addToWishlistItem, deleteFromWishlistItem } from "../../services/wishlistService";

export const WishlistEdit = () => {
    const {userDetail, setUserDetail, barcodeToBeAddedToWishlist, setIsDropdownComponentOpen} = useSharedContext();
    const [wishlistsButtons, setWishlistsButtons] = useState();

    useEffect(() => {

        setWishlistsButtons(
            userDetail.wishlists.map((eachWishlist) => (
                <button className="wishlist__edit-name px-5 py-3 border-top"
                onClick={() => {editWishlistItem(barcodeToBeAddedToWishlist, eachWishlist)}}>
                    <p><span><b>{eachWishlist.wishlistName}</b></span></p>
                    <button className={'product__button product__button--tertiary ' + (isBarcodeSelectedInWishlist(userDetail.wishlistItems, barcodeToBeAddedToWishlist, eachWishlist)?'text-danger':'')}>
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                    {/* <p>{isBarcodeSelectedInWishlist(userDetail.wishlistItems, barcodeToBeAddedToWishlist, eachWishlist)? "yes": "no"}</p> */}
                </button>
            ))
        );
    },[barcodeToBeAddedToWishlist, userDetail])

    const isBarcodeSelectedInWishlist = (wishlistItemIdOnlyArray, barcodeObject, wishlistObject) => {
        return wishlistItemIdOnlyArray.some(wishlistItemIdOnly => 
            wishlistItemIdOnly.barcodeId === barcodeObject.barcodeId
            && wishlistItemIdOnly.wishlistId === wishlistObject.wishlistId);
    }

    const editWishlistItem = async (barcodeObject, wishlistObject) => {
        if (isBarcodeSelectedInWishlist(userDetail.wishlistItems, barcodeObject, wishlistObject)) {
            const [dbUpdateSuccess, responseBodyData] = await deleteFromWishlistItem(userDetail.email, barcodeObject, wishlistObject);
            if(dbUpdateSuccess) {
                setUserDetail(responseBodyData);
            }
            // console.log("del");
        } else {
            const [dbUpdateSuccess, responseBodyData] = await addToWishlistItem(userDetail.email, barcodeObject, wishlistObject);
            if(dbUpdateSuccess) {
                setUserDetail(responseBodyData);
            }
        }
    }

    return (
        <>
            <div className="wishlist__header pt-4 px-3">
                <span></span>
                <button className="wishlist__header__close-btn" onClick={() => {setIsDropdownComponentOpen(false)}}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
            <h4 className="wishlistEdit__header py-3 px-4">Remove or save this product to another list</h4>
            <div className="wishlist__container">
                {wishlistsButtons}
            </div>
        </>
    )
}