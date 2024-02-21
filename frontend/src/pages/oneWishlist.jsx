import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faPrint, faEllipsisV, faShoppingBag, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { ShortProduct } from '../components/common/shortProduct';
import { ShortProductInWishlist } from '../components/common/shortProductInWishlist';
import { PriceTag } from '../components/common/priceTag';

export const OneWishlist = () => {
    const [wishlistDetail, setWishlistDetail] = useState();
    const [isWishlistSwitchBuyOnline, setIsWishlistSwitchBuyOnline] = useState(true);

    useEffect(() => {
        setWishlistDetail(JSON.parse(localStorage.getItem('wishlistSelected'))) 
    },[])

    return (
        <>
            <div className='wishlist-path'>
                <ol>
                    <li className=''>
                        <a href='/allWishlists'>Lists</a>
                    </li>
                    <li className=''>{(wishlistDetail)? wishlistDetail.wishlist.wishlistName:''}</li>
                </ol>
            </div>
            <div className='wishlist-header-container'>
                <header className='py-4'><h1><b>{wishlistDetail? (wishlistDetail.wishlist.wishlistName): ""}</b></h1></header>
                <button className='wishlist-switch'
                onClick={() => {setIsWishlistSwitchBuyOnline(prevState => !prevState)}}>
                    <div className={'wishlist-switch-button' + ((isWishlistSwitchBuyOnline)? ' wishlist-switch-button--active': '')}>Buy Online</div>
                    <div className={'wishlist-switch-button' + ((isWishlistSwitchBuyOnline)? '': ' wishlist-switch-button--active')}>Shopping list</div>
                </button>
            </div>
            <div className='product-list-control-panel px-3'>
                <div className='product-list-option-btns'>
                    <button className='product-list-option-btn'><FontAwesomeIcon icon={faShare}/></button>
                    <button className='product-list-option-btn'><FontAwesomeIcon icon={faPrint}/></button>
                    <button className='product-list-option-btn'><FontAwesomeIcon icon={faEllipsisV}/></button>
                </div>
                <div className='product-list-filter-btns py-3 border-bottom'></div>
            </div>
            <div className='product-list-container row px-3'>
                <div className='col-6 col-sm-6 col-md-4 border-right'>
                    <div className='border-bottom h-100 wishlist-item-download-app'>
                        <h2>Benefit from discounts and bring your list with you, wherever you go</h2>
                        <p>Get easy access to your list in the IKEA store, at a café, or anywhere.</p>
                        <button>Download IKEA app</button>
                    </div>
                </div>
                {wishlistDetail? (
                    wishlistDetail.wishlistItems.map(
                        eachItem => (
                            // <ShortProduct barcodesThatBelongToTheSameProductId={[eachItem.barcode]}></ShortProduct>
                            <div className='col-6 col-sm-6 col-md-4 border-right'><ShortProductInWishlist wishlistItem={eachItem}/></div>
                            // <div className='wishlist-each-product-container col-6'>{eachItem.barcode.product.brand.brandName}</div>
                        )
                )): null
                }
            </div>
            <div className='wishlist-price-summary px-3 pt-4'>
                <div className='wishlist-price-row'>
                    <p>Total price</p>
                    <div className="wishlist-price-tag"><PriceTag amount={19.99} /></div>
                </div>
                <button className='wishlist-add-to-cart w-100'>
                    <FontAwesomeIcon className="mr-2" icon={faShoppingCart} />
                    <p className="ml-2">Add available products to shopping bag</p>
                </button>
            </div>
        </>
    )
}