import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart, faPlus, faMinus, faShoppingCart, faRemove } from "@fortawesome/free-solid-svg-icons";
import { useSharedContext } from "../../SharedContext";
import { converPrice2String, starRatingGenerator } from "../../utils/common";
import { deleteFromWishlistItem, updateWishlistItemQuantity } from "../../services/wishlistService";


export const ShortProductInWishlist = (props) => {
    const { wishlistItem, wishlist, updateWishlistDisplay, ...other } = props;
    const {userDetail, setUserDetail} = useSharedContext();
    const [currentWishlistItem, setCurrentWishlistItem] = useState(wishlistItem)

    useEffect(() => {
        
    },[])

    const updateQuantity = async (val) => {
        const toQuantity = currentWishlistItem.quantity + val;
        if (toQuantity > 0) {
            const newWishlistItem = await updateWishlistItemQuantity({
                ... currentWishlistItem,
                quantity: toQuantity
            })
            setCurrentWishlistItem(newWishlistItem)
            updateWishlistDisplay(currentWishlistItem, toQuantity);
        } else {
            removeWishlistItemFromWishlist()
            updateWishlistDisplay(currentWishlistItem, toQuantity);
        }
    }

    const removeWishlistItemFromWishlist = async () => {
        const response = await deleteFromWishlistItem(userDetail.email, currentWishlistItem.barcode, wishlist);
        console.log(response);
    }

    return (
        <>
            <div className="wishlist-item-container h-100 border-bottom">
                <div className="wishlist-item-image p-2">
                    <img src={"data:image/png;base64,"+wishlistItem.barcode.productImage}
                    alt={'product-image for barcodeId: '+wishlistItem.barcode.barcodeId}/>
                </div>
                <div className="wishlist-item-detail">
                    <a className="wishlist-item-brand-name">{wishlistItem.barcode.product.brand.brandName}</a>
                    <p className="wishlist-item-description mb-0">{wishlistItem.barcode.product.description}</p>
                    <div className='wishlist-item__price'>
                        <span className='wishlist-item__price__currency'><b>$</b></span>
                        <span className='wishlist-item__price__integer'><b>{converPrice2String(currentWishlistItem.barcode.originalPrice*currentWishlistItem.quantity)[0]}</b></span>
                        <span className='wishlist-item__price__separator'><b>.</b></span>
                        <span className='wishlist-item__price__decimal'><b>{converPrice2String(currentWishlistItem.barcode.originalPrice*currentWishlistItem.quantity)[1]}</b></span>
                    </div>
                    {(currentWishlistItem.quantity > 1)? (<p><small>
                        <span>Price per item: </span>
                        <span className='wishlist-item__pricePer1__currency'>$</span>
                        <span className='wishlist-item__pricePer1__integer'>{converPrice2String(wishlistItem.barcode.originalPrice)[0]}</span>
                        <span className='wishlist-item__pricePer1__separator'>.</span>
                        <span className='wishlist-item__pricePer1__decimal'>{converPrice2String(wishlistItem.barcode.originalPrice)[1]}</span>
                    </small></p>):null}
                    <div className='wishlist-item__starRating'>
                        {starRatingGenerator(wishlistItem.barcode.avgRating)}
                        {wishlistItem.barcode.numOfReviews? 
                            <p className='wishlist-item__reviews'>{wishlistItem.barcode.numOfReviews.toString() + ' reviews'}</p>
                        : null}
                    </div>
                </div>
                <div className="wishlist-item-actions mt-2">
                    <div className="wishlist-item-quantity-stepper">
                        <button className="wishlist-item-quantity-stepper__btn wishlist-item-quantity-stepper__btn--decrease" type="button"
                        onClick={() => {updateQuantity(-1)}}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <input className="wishlist-item-quantity-stepper__input"
                        value={currentWishlistItem.quantity}></input>
                        <button className="wishlist-item-quantity-stepper__btn wishlist-item-quantity-stepper__btn--increase" type="button"
                        onClick={() => {updateQuantity(1)}}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                    <div className="wishlist-item-action-btns">
                        <button className="wishlist-item-action-btn__add-to-cart"><FontAwesomeIcon icon = {faShoppingCart} /></button>
                        <button className="wishlist-item-action-btn__remove"
                        onClick={removeWishlistItemFromWishlist}><FontAwesomeIcon icon = {faRemove} /></button>
                    </div>
                </div>
                <ul className="wishlist-item-availability">
                    <li>
                        <span className="wishlist-item-available__description">Available for delivery</span>
                        <span className="wishlist-item-available__dot"/>
                    </li>
                    <li>
                        <span className="wishlist-item-available__description">Available for Click and collect</span>
                        <span className="wishlist-item-available__dot"/>
                    </li>
                    <li>
                        <span className="wishlist-item-available__description">In stock in {userDetail.preferredStore.displayName}</span>
                        <span className="wishlist-item-available__dot"/>
                    </li>
                </ul>
                <a className="wishlist-item-more-option">More options</a>
            </div>
        </>
    )
}