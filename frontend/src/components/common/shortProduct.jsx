import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSharedContext } from "../../SharedContext";


export const ShortProduct = (props) => {
    const { userDetail, barcodesInWishlists, expandPopUpWindow, setBarcodeToBeAddedToWishlist, imageDisplayType } = useSharedContext(); 

    const { barcodesThatBelongToTheSameProductId, ...other } = props;
    const [currentBarcode, setCurrentBarcode] = useState(barcodesThatBelongToTheSameProductId[0]);
    const [optionsButton, setOptionsButton] = useState((barcodesThatBelongToTheSameProductId.length > 1)? 
    barcodesThatBelongToTheSameProductId.map(eachBarcode => (
        <div className="product__availableOptions__buttons__eachButton" onClick={() => setCurrentBarcode(eachBarcode)}>
            <img src={"data:image/png;base64,"+eachBarcode.productImage} alt=""></img>    
        </div>
    )): null);
    const [isShowProductImg, setIsShowProductImg] = useState(true);

    const starRatingGenerator = (rating) => {
        if (rating !== null) {
            let starRatingContainer = [];
            let tempRating = rating;
            for (let i=0; i<5; i++) {
                if (tempRating >= 1) {
                    starRatingContainer.push(<svg focusable="false" viewBox="0 0 24 24" className="plp-svg-icon plp-rating__star plp-rating__star--filled" aria-hidden="true"><path d="m12 6 2.1245 3.6818 4.1255.9018-2.8125 3.1773L15.8627 18 12 16.2818 8.1373 18l.4252-4.2391L5.75 10.5836l4.1255-.9018L12 6z"></path></svg>)
                } else if (tempRating >= 0 && tempRating < 1) {
                    starRatingContainer.push(<svg focusable="false" viewBox="0 0 24 24" className="plp-svg-icon plp-rating__star plp-rating__star--half-filled" aria-hidden="true"><path d="M12 6v10.2818L8.1373 18l.4252-4.2391L5.75 10.5836l4.1255-.9018L12 6z"></path><path d="m12 6 2.1245 3.6818 4.1255.9018-2.8125 3.1773L15.8627 18 12 16.2818V6z" fill="rgb(var(--colour-neutral-3, 223, 223, 223))"></path></svg>)
                } else if (tempRating <= 0) {
                    starRatingContainer.push(<svg focusable="false" viewBox="0 0 24 24" className="plp-svg-icon plp-rating__star plp-rating__star--empty" aria-hidden="true"><path d="m12 6 2.1245 3.6818 4.1255.9018-2.8125 3.1773L15.8627 18 12 16.2818 8.1373 18l.4252-4.2391L5.75 10.5836l4.1255-.9018L12 6z" fill="rgb(var(--colour-neutral-3, 223, 223, 223))"></path></svg>)
                }
                tempRating -= 1;
            }
            return starRatingContainer
        } else {
            return null
        }
    }

    const converPrice2String = (priceInt) => {
        let priceStr = priceInt.toFixed(2).split('.');
        return priceStr
    }

    const addToOrDeleteFromWishlist = () => {
        if (barcodesInWishlists.includes(currentBarcode.barcodeId)) {
            setBarcodeToBeAddedToWishlist(currentBarcode);
            expandPopUpWindow('wishlistDelete');
        } else {
            setBarcodeToBeAddedToWishlist(currentBarcode);
            expandPopUpWindow('wishlist');
        }
    }

    useEffect(() => {
        setIsShowProductImg((imageDisplayType==="product"))
    },[imageDisplayType])

    return (
        <>
            <div className='search__each-product__inner col-6 col-sm-4 col-md-3 border px-0'>
                <div className='product-image p-2'>
                    {/* <p>{currentBarcode.barcodeId}</p> */}

                    <img 
                    src={(isShowProductImg)?"data:image/png;base64,"+currentBarcode.productImage: "data:image/png;base64,"+currentBarcode.roomImage} 
                    alt={'product-image for barcodeId: '+currentBarcode.barcodeId}
                    onMouseEnter={() => {setIsShowProductImg(!(imageDisplayType==="product"))}}
                    onMouseLeave={() => {setIsShowProductImg((imageDisplayType==="product"))}}></img>
                </div>
                <div className='product-mastercard px-2'>
                    <a className='w-100 m-1'><b>{currentBarcode.product.brand.brandName}</b></a>
                    <br></br>
                    <a className='w-100 m-1'><a>{currentBarcode.product.description}</a></a>
                    <div className='product__price m-1'>
                        <span className='product__price__currency'><b>$</b></span>
                        <span className='product__price__integer'><b>{converPrice2String(currentBarcode.originalPrice)[0]}</b></span>
                        <span className='product__price__separator'><b>.</b></span>
                        <span className='product__price__decimal'><b>{converPrice2String(currentBarcode.originalPrice)[1]}</b></span>
                    </div>
                </div>
                <div className='product__starRating px-2'>
                    {starRatingGenerator(currentBarcode.avgRating)}
                    {currentBarcode.numOfReviews? 
                        <span className='product__reviews mx-2'>{'(' + currentBarcode.numOfReviews.toString() + ')'}</span>
                    : null}
                </div>
                <div className='product__buttons__container px-2 py-3'>
                    <button className='product__button product__button--emphasised product__button__addToCart'><FontAwesomeIcon icon={faCartPlus} /></button>
                    <button className={'product__button product__button--tertiary ' + (barcodesInWishlists.includes(currentBarcode.barcodeId)?'text-danger':'')}
                    onClick={addToOrDeleteFromWishlist}><FontAwesomeIcon icon={faHeart} /></button>
                </div>
                <div className="product__availableOptions__container">
                    {(barcodesThatBelongToTheSameProductId.length > 1)? <p className="pl-2">Available in more options</p>: null}
                    <div className="product__availableOptions__buttons pl-2">{optionsButton}</div>
                </div>
                
            </div>
        </>
    )
}