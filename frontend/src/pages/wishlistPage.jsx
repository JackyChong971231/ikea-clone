import React, { useEffect, useState } from 'react';
import { useSharedContext } from '../SharedContext';
import { createNewWishlist, getAllWishlistItems } from '../services/wishlistService';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faH, faHeart } from "@fortawesome/free-solid-svg-icons";
import { navigate } from '../utils/common';

export const WishlistPage = () => {
    const {userDetail, setUserDetail} = useSharedContext();
    const [wishlistContainer, setWishlistContainer] = useState();
    const [isAboutToCreateNewWishlist, setIsAboutToCreateNewWishlist] = useState(false);
    const [newWishlistName, setNewWishlistName] = useState("");

    const handleClick = (eachWishlist, wishlistItemsInEachWishlist) => {
        // navigate('wishlist');
        const wishlistSelected = {
            wishlist: eachWishlist,
            wishlistItems: wishlistItemsInEachWishlist
        }
        // console.log(wishlistId)
        localStorage.setItem('wishlistSelected',JSON.stringify(wishlistSelected));
        navigate('wishlist');
    }

    useEffect(() => {
        // const wishlistInfo = await getAllWishlistItems(userDetail.email, userDetail.signedInToken);
        getAllWishlistItems(userDetail.email, userDetail.signedInToken)
        .then(wishlistInfo => {
            const wishlists = wishlistInfo.wishlists;
            const wishlistItems = wishlistInfo.wishlistItems;
            var tempWishlistContainer = [];
            for (const eachWishlistObjId in wishlists) {
                const eachWishlist = wishlists[eachWishlistObjId];
                const wishlistItemsInEachWishlist = wishlistItems.filter((eachWishlistItem) => eachWishlistItem.wishlist.wishlistId === eachWishlist.wishlistId)
                tempWishlistContainer.push(
                    <div className='eachWishlist__container p-2 col-6 col-sm-4 col-md-3'
                    onClick={() => handleClick(eachWishlist, wishlistItemsInEachWishlist)}>
                        <div className='eachWishlist__container__content h-100'>
                            <div className='eachWishlist__image__container'>
                                {(wishlistItemsInEachWishlist.length > 0)?
                                    <img src={"data:image/png;base64,"+wishlistItemsInEachWishlist[0].barcode.productImage}></img>
                                :<div className='eachWishlist__image--noItems'>
                                    <FontAwesomeIcon icon={faHeart} />
                                    <p className='pt-2'>This list needs some love</p>
                                </div>}
                            </div>
                            <div className='eachWishlist__info__container'>
                                <div className='eachWishlist__info px-0 col-10'>
                                    <p className='eachWishlist__name pt-2'><b>{eachWishlist.wishlistName}</b></p>
                                    <p>Updated {eachWishlist.lastUpdate.slice(0,10)}</p>
                                </div>
                                <button className='eachWishlist__enterBtn px-0 col-2'><FontAwesomeIcon icon={faArrowRight}/></button>
                            </div>
                        </div>
                    </div>
                )
            }
            setWishlistContainer(tempWishlistContainer);
        })
    },[userDetail])

    const createNewWishlistFrontend = async (e) => {
        e.preventDefault()
        const [dbUpdateSuccess, responseBodyData] = await createNewWishlist(userDetail.email, newWishlistName);
        if (dbUpdateSuccess) {
            setUserDetail(responseBodyData);
            setIsAboutToCreateNewWishlist(false);
            setNewWishlistName("")
        }
    }

    return (
        <>
            <div className='wishlist__container px-3'>
                <div className='wishlist__header'>
                    <p><small>My lists</small></p>
                    <div className='py-4'>
                        <h3><b>Hej!</b></h3>
                        <p>Start organizing your dream space.</p>
                    </div>
                </div>
                <div className='wishlist__buttons'>
                    <button className='px-2 py-2'>Lists</button>
                    <button className='px-2 py-2'>Idea board</button>
                </div>
                <div className='wishlists__container row px-2 py-2'>
                    <div className='wishlists__header p-3 col-12'>
                        <h5><b>Many lists, one home</b></h5>
                        <p>Find all your lists in one place. Categorize your favourites into different lists and save them here.</p>
                    </div>
                    <div className='p-3 col-12'>
                        <div className='wishlists__create__container border p-3 col-12'>
                            <div className='wishlists__create'>
                                <div>
                                    <p className='mb-1'><b>Create a new list</b></p>
                                    <p className='m-0'>Create as many lists as you like to organize your favourite products</p>
                                </div>
                                <div className='wishlists__create__dropdown p-0'>
                                    <button className='wishlists__create__dropdown__button'
                                    onClick={() => {setIsAboutToCreateNewWishlist(prevState => !prevState)}}><b>{(isAboutToCreateNewWishlist)?"X":"Create"}</b></button>
                                </div>
                            </div>
                            {isAboutToCreateNewWishlist?
                            <form className="wishlistPage__createNewWishlist__form" onSubmit={(e) => {createNewWishlistFrontend(e)}}>
                                <div className="wishlistPage__createNewWishlist__field">
                                    <label for="wishlistPage__newWishlistName">Enter a list name</label>
                                    <div>
                                        <input id="wishlistPage__newWishlistName" value={newWishlistName} onChange={(e) => setNewWishlistName(e.target.value)}></input>
                                    </div>
                                </div>
                                <button className={
                                "wishlistPage__newWishlistNameSubmitBtn " +
                                ((newWishlistName!=="")? "wishlistPage__newWishlistNameSubmitBtn-clickable": "")
                                }
                                type="submit"
                                disabled={!newWishlistName}
                                >Create list</button>
                            </form>
                            : 
                            null}
                        </div>
                    </div>
                    {wishlistContainer}
                </div>
            </div>
        </>
    )
}