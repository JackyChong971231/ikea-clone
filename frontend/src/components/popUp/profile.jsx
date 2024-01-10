import React, { useEffect, useState } from 'react';

import { useSharedContext } from '../../SharedContext';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { navigate } from '../../utils/common';

export const Profile = () => {
    const { isDropdownComponentOpen, setIsDropdownComponentOpen, userDetail, setUserDetail, emptyUserDetail } = useSharedContext();

    const signInOrOutHandler = () => {
        if (userDetail.signedInToken) {
            // Sign Out
            setUserDetail(emptyUserDetail);
            setIsDropdownComponentOpen(false);
            navigate('/');
        } else {
            // Sign In
            navigate('/sign-in');
        }
    }

    return (
        <>
            <div className='profilePopUp__header pt-3'>
                <div className='profilePopUp__header__closeBtn pt-2 px-4' onClick={() => {setIsDropdownComponentOpen(false)}}>
                    <span></span>
                    <button><FontAwesomeIcon icon={faXmark} /></button>
                </div>
                <div className='profilePopUp__header__content pt-3 pb-4 px-4'>
                    
                    <h2><small><b>Hej <span className='profilePopUp__header__content__firstName'>{(userDetail.signedInToken)? userDetail.firstName : null}</span></b></small></h2>
                    <a className='profilePopUp__header__content__signIn' onClick={signInOrOutHandler}><b>{(userDetail.signedInToken)? 'Sign out' : 'Sign in'}</b></a>
                </div>
                <a className='profilePopUp__header__content__btn profilePopUp__header__content__btn--1 px-4'
                onClick={() => {navigate('/sign-in');}}>
                    <a><b>Join IKEA Family</b></a>
                    <button><FontAwesomeIcon icon={faArrowRight} /></button>
                </a>
                <a className='profilePopUp__header__content__btn profilePopUp__header__content__btn--2 px-4'>
                    <a><b>Join IKEA Business Network</b></a>
                    <span className='not-activated-yet'>Not activated yet</span>
                    <button><FontAwesomeIcon icon={faArrowRight} /></button>
                </a>
            </div>
            <div className='profilePopUp__family-offer py-4'>
                <button className='profilePopUp__family-offer__btn py-3 px-3'>
                    <span>
                        <b>See the latest IKEA Family offers</b><br/>
                        <span className='not-activated-yet'>Not activated yet</span>
                    </span>
                    <span><FontAwesomeIcon icon={faArrowRight} /></span>
                </button>
            </div>
            <div className='profilePopUp__buttons px-4'>
                <ul className='profilePopUp__buttons__ul'>
                    <li><a>Purchase history</a><span className='not-activated-yet'>Not activated yet</span></li>
                    <li><a>Shopping list</a><span className='not-activated-yet'>Not activated yet</span></li>
                    <li><a>Planners</a><span className='not-activated-yet'>Not activated yet</span></li>
                    <li><a>Track your order</a><span className='not-activated-yet'>Not activated yet</span></li>
                    <li><a>Design</a><span className='not-activated-yet'>Not activated yet</span></li>
                    {localStorage.getItem("user")? <li><a>Manage account</a><span className='not-activated-yet'>Not activated yet</span></li> : null}
                </ul>
            </div>
        </>
    )
}