import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faPrint, faEllipsisV, faShoppingBag, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { ShortProduct } from '../components/common/shortProduct';
import { ShortProductInWishlist } from '../components/common/shortProductInWishlist';
import { PriceTag } from '../components/common/priceTag';
import { useSharedContext } from '../SharedContext';
import { getAllWishlistItems } from '../services/wishlistService';
import { useSearchParams } from 'react-router-dom';

export const OneWishlist = () => {
    const {userDetail, setUserDetail} = useSharedContext();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [isWishlistSwitchBuyOnline, setIsWishlistSwitchBuyOnline] = useState(true);
    const [reactComponent, setReactComponent] = useState();

    const [wishlistObject, setWishlistObject] = useState();
    const [wishlistItemMap, setWishlistItemMap] = useState();

    let wishlistObject1 = null;
    let wishlistItemMap1 = null;
    const [totalPrice, setTotalPrice] = useState(0);

    const updateWishlistDisplay = async (wishlistItem, toQuantity) => {
        if (toQuantity <= 0) {
            // setWishlistItemMap(prevWishlistItemMap => (
            //     {
            //         ...prevWishlistItemMap,
            //         [wishlistItem.id]: wishlistItem
            //     }
            // ))
            // const wishlistItemId = wishlistItem.id;
            // wishlistItemMapToReactComponent({
            //     ...wishlistItemMap,
            //     [wishlistItem.id]: null
            // },wishlistObject)
            wishlistItemMap1 = {
                ...wishlistItemMap1,
                [wishlistItem.id]: null
            }
            wishlistItemMapToReactComponent();
        }
        setTotalPrice(prevTotalPrice => 
            prevTotalPrice += (toQuantity - wishlistItem.quantity)*wishlistItem.barcode.originalPrice
        )
    }

    useEffect(() => {
        const wishlistId = searchParams.get('id');
        getAllWishlistItems(userDetail.email, userDetail.signedInToken, wishlistId)
        .then(wishlistAndWishlistItems => {
            wishlistObject1 = wishlistAndWishlistItems.wishlists[0]
            wishlistItemMap1 = wishlistAndWishlistItems.wishlistItems
            wishlistItemMapToReactComponent();
            calculateTotalPrice(wishlistAndWishlistItems.wishlistItems)
        })
    },[])

    const calculateTotalPrice = (wishlistItemMap) => {
        let tempPrice = 0;
        Object.keys(wishlistItemMap).forEach(wishlistItemId => {
            const quantity = wishlistItemMap[wishlistItemId].quantity
            const pricePerItem = wishlistItemMap[wishlistItemId].barcode.originalPrice
            tempPrice += quantity*pricePerItem
        })
        setTotalPrice(tempPrice);
    }

    const wishlistItemMapToReactComponent = () => {
        let tempReactComponent = [];
        Object.keys(wishlistItemMap1).forEach((wishlistItemId) => {
            if (wishlistItemMap1[wishlistItemId] !== null) {
                tempReactComponent.push(
                    <div className='col-6 col-sm-6 col-md-4 border-right'>
                        <ShortProductInWishlist 
                        wishlistItem={wishlistItemMap1[wishlistItemId]} 
                        wishlist={wishlistObject1} 
                        updateWishlistDisplay={updateWishlistDisplay} />
                    </div>
                );
            }
        })
        setReactComponent(tempReactComponent);
    }

    return (
        <>
            <div className='wishlist-path'>
                <ol>
                    <li className=''>
                        <a href='/allWishlists'>Lists</a>
                    </li>
                    <li className=''>{(wishlistObject)? wishlistObject.wishlistName:''}</li>
                </ol>
            </div>
            <div className='wishlist-header-container'>
                <header className='py-4'><h1><b>{wishlistObject? (wishlistObject.wishlistName): ""}</b></h1></header>
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
                    <div className='border-bottom wishlist-item-download-app'>
                        <h2>Benefit from discounts and bring your list with you, wherever you go</h2>
                        <p>Get easy access to your list in the IKEA store, at a café, or anywhere.</p>
                        <button>Download IKEA app</button>
                    </div>
                </div>
                {reactComponent}
            </div>
            <div className='wishlist-price-summary px-3 pt-4'>
                <div className='wishlist-price-row'>
                    <p>Total price</p>
                    <div className="wishlist-price-tag"><PriceTag amount={totalPrice} /></div>
                </div>
                <button className='wishlist-add-to-cart w-100'>
                    <FontAwesomeIcon className="mr-2" icon={faShoppingCart} />
                    <p className="ml-2">Add available products to shopping bag</p>
                </button>
            </div>
        </>
    )
}