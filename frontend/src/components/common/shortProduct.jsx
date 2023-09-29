import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";


export const ShortProduct = (props) => {
    const { eachShortProductResponse, ...other } = props;

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

    return (
        <div className='search__each-product__inner col-6 col-sm-4 col-md-3 border px-0'>
            <div className='product-image p-2'>
                <img src={eachShortProductResponse['image']} alt='product-image'></img>
            </div>
            <div className='product-mastercard px-2'>
                <p className='w-100 m-1'><b>{eachShortProductResponse['name-decorator']}</b></p>
                <p className='w-100 m-1'>{eachShortProductResponse['description']}</p>
                <div className='product__price m-1'>
                    <span className='product__price__currency'><b>$</b></span>
                    <span className='product__price__integer'><b>{eachShortProductResponse['price'].split('.')[0]}</b></span>
                    <span className='product__price__separator'><b>.</b></span>
                    <span className='product__price__decimal'><b>{eachShortProductResponse['price'].split('.')[1]}</b></span>
                </div>
            </div>
            <div className='product__starRating px-2'>
                {starRatingGenerator(eachShortProductResponse.rating)}
                <span className='product__reviews mx-2'>{'(' + eachShortProductResponse.reviews.toString() + ')'}</span>
            </div>
            <div className='product__buttons__container px-2 py-3'>
                <button className='product__button product__button--emphasised product__button__addToCart'><FontAwesomeIcon icon={faCartPlus} /></button>
                <button className='product__button product__button--tertiary product__button__wishlist'><FontAwesomeIcon icon={faHeart} /></button>
            </div>
        </div>
    )
}