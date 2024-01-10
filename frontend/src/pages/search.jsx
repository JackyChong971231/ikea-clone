import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import {ShortProduct} from '../components/common/shortProduct';

import product0jpg from '../assets/images/product-id/0.jpg';
import product1jpg from '../assets/images/product-id/1.jpg';
import product2jpg from '../assets/images/product-id/2.jpg';
import { searchProductByKeywordLike } from '../services/productService';
import { useSharedContext } from '../SharedContext';
import { reloadUserDetail } from '../services/membershipService';

export const Search = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ filterBarScrollLocation, setFilterBarScrollLocation ] = useState('L') // L, M, R
    const [ productComponent, setProductComponent ] = useState([]);
    const {userDetail, setUserDetail, imageDisplayType, setImageDisplayType} = useSharedContext();

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

    useEffect(() => {
        var keyword = searchParams.get('q');
        if (keyword === null) {keyword = 'table'};
        setSearchQuery(keyword);
        searchProductByKeywordLike(keyword)
        .then(productsArray => { // already ordered by product id

            let barcodesGroupedByProductId = {};
            let tempProductComponents = [];
            productsArray.map((eachBarcode) => {
                if (eachBarcode.product.productId in barcodesGroupedByProductId) {
                    if (eachBarcode.isDefaultForThumbnail) {
                        barcodesGroupedByProductId[eachBarcode.product.productId].unshift(eachBarcode)
                    } else {
                        barcodesGroupedByProductId[eachBarcode.product.productId].push(eachBarcode)
                    }
                } else {
                    barcodesGroupedByProductId[eachBarcode.product.productId] = [eachBarcode]
                }
            });
            for (var productId of Object.keys(barcodesGroupedByProductId)) {
                tempProductComponents.push(<ShortProduct barcodesThatBelongToTheSameProductId={barcodesGroupedByProductId[productId]}/>)
            }
            setProductComponent(tempProductComponents);
        });
        if (userDetail.signedInToken) {
            // const tempUserDetail = await reloadUserDetail(userDetail.signedInToken, userDetail.email);
            reloadUserDetail(userDetail.signedInToken, userDetail.email)
            .then(tempUserDetail => {
                if (tempUserDetail) {setUserDetail(tempUserDetail)};
            })
        }
    },[])

    return (
        <div className='search'>
            <div className='search__container py-3 px-3'>
                <div className='search__container__summary px-1'>
                    <h4>Showing matches for "<b>{searchQuery}</b>"</h4>
                    <p>
                        <span>
                            We found&nbsp;
                            <a href='#product-list'>{Object.keys(productComponent).length} products</a>
                            &nbsp;and&nbsp;
                            <a href='#content-list'>{3} content results</a>
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
                    {productComponent}
                </div>
            </div>
        </div>
    )
}