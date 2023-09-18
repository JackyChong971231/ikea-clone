import React, { useEffect, useState } from 'react';

import { useSharedContext } from '../../SharedContext';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { navigate } from '../../utils/common';

export const Profile = () => {
    const { isProfileDropdownOpen, setIsProfileDropdownOpen, userDetail, setUserDetail } = useSharedContext();

    const signInOrOutHandler = () => {
        if (userDetail) {
            setUserDetail(null);
            setIsProfileDropdownOpen(false);
            navigate('/');
        } else {
            navigate('/sign-in');
        }
    }

    return (
        <>
            <div className='profilePopUp__header pt-3'>
                <div className='profilePopUp__header__closeBtn pt-2 px-4' onClick={() => {setIsProfileDropdownOpen(false)}}>
                    <span></span>
                    <button><FontAwesomeIcon icon={faXmark} /></button>
                </div>
                <div className='profilePopUp__header__content pt-3 pb-4 px-4'>
                    
                    <h2><small><b>Hej <span className='profilePopUp__header__content__firstName'>{userDetail? userDetail.firstName : null}</span></b></small></h2>
                    <a className='profilePopUp__header__content__signIn' onClick={signInOrOutHandler}><b>{userDetail? 'Sign out' : 'Sign in'}</b></a>
                </div>
                <a className='profilePopUp__header__content__btn profilePopUp__header__content__btn--1 px-4'>
                    <a><b>Join IKEA Family</b></a>
                    <button><FontAwesomeIcon icon={faArrowRight} /></button>
                </a>
                <a className='profilePopUp__header__content__btn profilePopUp__header__content__btn--2 px-4'>
                    <a><b>Join IKEA Business Network</b></a>
                    <button><FontAwesomeIcon icon={faArrowRight} /></button>
                </a>
            </div>
            <div className='profilePopUp__family-offer py-4'>
                <button className='profilePopUp__family-offer__btn py-3 px-3'>
                    <span><b>See the latest IKEA Family offers</b></span>
                    <span><FontAwesomeIcon icon={faArrowRight} /></span>
                </button>
            </div>
            <div className='profilePopUp__buttons px-4'>
                <ul className='profilePopUp__buttons__ul'>
                    <li><a>Purchase history</a></li>
                    <li><a>Shopping list</a></li>
                    <li><a>Planners</a></li>
                    <li><a>Track your order</a></li>
                    <li><a>Design</a></li>
                    {localStorage.getItem("user")? <li><a>Manage account</a></li> : null}
                </ul>
            </div>
        </>
    )
}