import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";


export const ShortProduct = (props) => {
    const { barcodesThatBelongToTheSameProductId, ...other } = props;
    const [currentBarcode, setCurrentBarcode] = useState(barcodesThatBelongToTheSameProductId[0]);
    const [optionsButton, setOptionsButton] = useState();

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

    useEffect(() => {
        if (barcodesThatBelongToTheSameProductId.length > 1) {
            setOptionsButton(barcodesThatBelongToTheSameProductId.map(eachBarcode => (
                <button onClick={() => setCurrentBarcode(eachBarcode)}>{eachBarcode.barcodeId}</button>
            )))
        } else {setOptionsButton(null)}
    },[])

    return (
        <>
            <div className='search__each-product__inner col-6 col-sm-4 col-md-3 border px-0'>
                <div className='product-image p-2'>
                    {/* <p>{currentBarcode.barcodeId}</p> */}
                    <img src={currentBarcode['image']} alt={'product-image for barcodeId: '+currentBarcode.barcodeId}></img>
                </div>
                <div className='product-mastercard px-2'>
                    <p className='w-100 m-1'><b>{currentBarcode.product.brand.brandName}</b></p>
                    <p className='w-100 m-1'>{currentBarcode.product.description}</p>
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
                    <button className='product__button product__button--tertiary product__button__wishlist'><FontAwesomeIcon icon={faHeart} /></button>
                </div>
                <div className="product__availableOptions__container">
                    {(barcodesThatBelongToTheSameProductId.length > 1)? <p className="pl-2">Available in more options</p>: null}
                    <div className="product__availableOptions__buttons pl-2">{optionsButton}</div>
                </div>
            </div>
        </>
    )
}