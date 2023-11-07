import React, { useCallback, useEffect, useState } from "react";
import { useSharedContext } from "../../SharedContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { addToWishlistItem, createNewWishlist } from "../../services/wishlistService";
import { reloadUserDetail } from "../../services/membershipService";

export const Wishlist = () => {
    const {setUserDetail, userDetail, setIsDropdownComponentOpen, barcodesInWishlists, barcodeToBeAddedToWishlist} = useSharedContext();
    const [wishlistsButtons, setWishlistsButtons] = useState();
    const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false);
    const [newWishlistName, setNewWishlistName] = useState("");

    useEffect(() => {
        setWishlistsButtons(
        userDetail.wishlists.map((eachWishlist) => (
            <button className="wishlist__add-to-name px-5 py-3 border-top"
            onClick={() => {addWishlistItem(barcodeToBeAddedToWishlist, eachWishlist)}}>
                <p>Add to <span><b>{eachWishlist.wishlistName}</b></span></p>
            </button>
        )))
    }, [barcodesInWishlists])

    const addWishlistItem = async (barcodeObject, wishlistObject) => {
        const [dbUpdateSuccess, responseBodyData] = await addToWishlistItem(userDetail.email, barcodeObject, wishlistObject);
        if(dbUpdateSuccess) {
            setUserDetail(responseBodyData);
            setIsDropdownComponentOpen(false);
        }
    }

    const createNewWishlistFrontend = async (e) => {
        e.preventDefault()
        const [dbUpdateSuccess, responseBodyData] = await createNewWishlist(userDetail.email, newWishlistName);
        if (dbUpdateSuccess) {
            setUserDetail(responseBodyData);
            setIsCreateButtonClicked(false);
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
            <div className="wishlist__create-new-list px-5 py-4" onClick={() => {setIsCreateButtonClicked(true)}}>
                <div className="wishlist__create-new-list__button">
                    <p><b>Create a new list</b></p>
                    <h4>+</h4>
                </div>
                <div className="wishlist__create-new-list__form">
                    {isCreateButtonClicked?
                        <form onSubmit={(e) => {createNewWishlistFrontend(e)}}>
                            <div className="newWishlistName-field">
                                <label for="newWishlistName">Enter a list name</label>
                                <div>
                                    <input id="newWishlistName" value={newWishlistName} onChange={(e) => setNewWishlistName(e.target.value)}></input>
                                </div>
                            </div>
                            <button className={
                            "newWishlistNameSubmitBtn " +
                            ((newWishlistName!=="")? "newWishlistNameSubmitBtn-clickable": "")
                            }
                            type="submit"
                            disabled={!newWishlistName}
                            >Create list</button>
                        </form>
                    : 
                        null}
                </div>
            </div>
            <div className="wishlist__container">
                {wishlistsButtons}
            </div>
        </>
    )
}