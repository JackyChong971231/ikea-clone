import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

import product0jpg from '../assets/images/product-id/0.jpg';
import product1jpg from '../assets/images/product-id/1.jpg';
import product2jpg from '../assets/images/product-id/2.jpg';

const dummy ={
    'products': [
        {
            'name-decorator': 'SUNNERSTA',
            'product-id': 0,
            'image': product0jpg,
            'description': 'Shelf/ dish drainer',
            'price': '3.99',
            'rating': 4.5,
            'reviews': 20
        },
        {
            'name-decorator': 'BURHULT',
            'product-id': 1,
            'image': product1jpg,
            'description': 'Shelf, 59x20 cm (23 1/4x7 7/8 ")',
            'price': '5.00',
            'rating': 3.7,
            'reviews': 87
        },
        {
            'name-decorator': 'RÅGRUND',
            'product-id': 2,
            'image': product2jpg,
            'description': 'Shelf unit, 37x37x104 cm (14 5/8x14 5/8x41 ")',
            'price': '79.00',
            'rating': null,
            'reviews': 0
        },
    ],
    'contents': [
        {
            'title': 'Your shelf, your self',
            'type': 'Gallery',
            'image': 'https://www.ikea.com/images/zoomed-in-image-of-a-section-of-a-shelf-featuring-a-hektar-l-f31bf8c08660d878d34abe2ae466373e.jpg?f=xxxs',
        },
        {
            'title': 'Your foodie nirvana on shelves',
            'type': 'Gallery',
            'image': 'https://www.ikea.com/images/omar-shelving-units-in-different-heights-displaying-packages-04771b183e94d24fb128f244bd9d7d2a.jpg?f=xxxs',
        }
    ]
}

export const Search = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ imageDisplayType, setImageDisplayType ] = useState('product')
    const [ filterBarScrollLocation, setFilterBarScrollLocation ] = useState('L') // L, M, R

    const filterBar = useRef(null);

    const buttonLeftOnClick = () => {
        filterBar.current.scrollLeft -= 150;
        if (filterBar.current.scrollLeft===0) {setFilterBarScrollLocation('L')} else { setFilterBarScrollLocation('M') }
    }

    const buttonRightOnClick = () => {
        const prevScrollLeft = filterBar.current.scrollLeft;
        filterBar.current.scrollLeft += 150;
        if (prevScrollLeft + 150 !== filterBar.current.scrollLeft) {
            setFilterBarScrollLocation('R')
        } else { setFilterBarScrollLocation('M') }
    }

    const starRatingGenerator = (rating) => {
        if (rating !== null) {
            let starRatingContainer = [];
            let tempRating = rating;
            for (let i=0; i<5; i++) {
                if (tempRating >= 1) {
                    starRatingContainer.push(<svg focusable="false" viewBox="0 0 24 24" class="plp-svg-icon plp-rating__star plp-rating__star--filled" aria-hidden="true"><path d="m12 6 2.1245 3.6818 4.1255.9018-2.8125 3.1773L15.8627 18 12 16.2818 8.1373 18l.4252-4.2391L5.75 10.5836l4.1255-.9018L12 6z"></path></svg>)
                } else if (tempRating >= 0 && tempRating < 1) {
                    starRatingContainer.push(<svg focusable="false" viewBox="0 0 24 24" class="plp-svg-icon plp-rating__star plp-rating__star--half-filled" aria-hidden="true"><path d="M12 6v10.2818L8.1373 18l.4252-4.2391L5.75 10.5836l4.1255-.9018L12 6z"></path><path d="m12 6 2.1245 3.6818 4.1255.9018-2.8125 3.1773L15.8627 18 12 16.2818V6z" fill="rgb(var(--colour-neutral-3, 223, 223, 223))"></path></svg>)
                } else if (tempRating <= 0) {
                    starRatingContainer.push(<svg focusable="false" viewBox="0 0 24 24" class="plp-svg-icon plp-rating__star plp-rating__star--empty" aria-hidden="true"><path d="m12 6 2.1245 3.6818 4.1255.9018-2.8125 3.1773L15.8627 18 12 16.2818 8.1373 18l.4252-4.2391L5.75 10.5836l4.1255-.9018L12 6z" fill="rgb(var(--colour-neutral-3, 223, 223, 223))"></path></svg>)
                }
                tempRating -= 1;
            }
            return starRatingContainer
        } else {
            return null
        }
    }

    useEffect(() => {
        setSearchQuery(searchParams.get('q'));
    })

    return (
        <div className='search'>
            <div className='search__container py-3 px-3'>
                <div className='search__container__summary px-1'>
                    <h4>Showing matches for "<b>{searchQuery}</b>"</h4>
                    <p>
                        <span>
                            We found&nbsp;
                            <a href='#product-list'>{dummy['products'].length} products</a>
                            &nbsp;and&nbsp;
                            <a href='#content-list'>{dummy['contents'].length} content results</a>
                            .
                        </span>
                    </p>
                </div>
                <div className='search__container__image-type pt-4 pb-2'>
                    <span></span>
                    <div className='search__container__image-type__inner'>
                        <button 
                        className={'product-image-type__toggle-button'+((imageDisplayType==='product')?' product-image-type__toggle-button--active':'')}
                        onClick={() => {setImageDisplayType('product')}}>Product</button>
                        <button
                        className={'product-image-type__toggle-button'+((imageDisplayType==='room')?' product-image-type__toggle-button--active':'')}
                        onClick={() => {setImageDisplayType('room')}}>Room</button>
                    </div>
                </div>
                <div className='search__container__compare py-3'>
                    <span></span>
                    <div>
                        <span className='px-2'>Compare</span>
                        <label className='search__container__compare__toggle-switch'>
                            <input className='search__container__compare__checkbox' type='checkbox' name='switchname'
                            aria-label='Activate product comparison selection'></input>
                            <span className='slider round'></span>
                        </label>
                    </div>
                </div>
                <div className='search__container__filter-bar'>
                    <button className='filter__carousel__overflowBtn filter__carousel__overflowBtn--left'
                    onClick={buttonLeftOnClick}
                    style={{ display: (filterBarScrollLocation==='L')? 'none': '' }}><FontAwesomeIcon icon={faArrowLeft} /></button>
                    <div className='search__container__filter-bar__carousel' ref={filterBar}>
                        <button className='filter-pill filter-pill--active'>Sort</button>
                        <button className='filter-pill'>Size</button>
                        <button className='filter-pill'>Color</button>
                        <button className='filter-pill'>Category</button>
                    </div>
                    <button className='filter__carousel__overflowBtn filter__carousel__overflowBtn--right'
                    onClick={buttonRightOnClick}
                    style={{ display: (filterBarScrollLocation==='R')? 'none': '' }}><FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
                <div className='search__products__container row'>
                    {
                        dummy['products'].map((product) => (
                            <div className='search__each-product__inner col-6 col-sm-4 col-md-3 border px-0'>
                                <div className='product-image p-2'>
                                    <img src={product['image']} alt='product-image'></img>
                                </div>
                                <div className='product-mastercard px-2'>
                                    <p className='w-100 m-1'><b>{product['name-decorator']}</b></p>
                                    <p className='w-100 m-1'>{product['description']}</p>
                                    <div className='product__price m-1'>
                                        <span className='product__price__currency'><b>$</b></span>
                                        <span className='product__price__integer'><b>{product['price'].split('.')[0]}</b></span>
                                        <span className='product__price__separator'><b>.</b></span>
                                        <span className='product__price__decimal'><b>{product['price'].split('.')[1]}</b></span>
                                    </div>
                                </div>
                                <div className='product__starRating px-2'>
                                    {starRatingGenerator(product.rating)}
                                    <span className='product__reviews mx-2'>{'(' + product.reviews.toString() + ')'}</span>
                                </div>
                                <div className='product__buttons__container px-2 py-3'>
                                    <button className='product__button product__button--emphasised product__button__addToCart'><FontAwesomeIcon icon={faCartPlus} /></button>
                                    <button className='product__button product__button--tertiary product__button__wishlist'><FontAwesomeIcon icon={faHeart} /></button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}