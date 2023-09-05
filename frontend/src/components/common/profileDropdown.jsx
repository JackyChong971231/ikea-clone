import React, { useEffect, useState } from 'react';

import { useSharedContext } from '../../SharedContext';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons"



export const ProfileDropdown = () => {
    const { isProfileDropdownOpen, setIsProfileDropdownOpen } = useSharedContext();

    return (
        <div className={'profileDropdown '+ ((isProfileDropdownOpen)?'profileDropdown--open':'profileDropdown--close')}>
                <div className='profileDropdown__header pt-3'>
                    <div className='profileDropdown__header__closeBtn pt-2 px-4' onClick={() => {setIsProfileDropdownOpen(false)}}>
                        <span></span>
                        <button><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                    <div className='profileDropdown__header__content pt-3 pb-4 px-4'>
                        <h2><small><b>Hej</b></small></h2>
                        <a className='profileDropdown__header__content__signIn' onClick={() => {window.location.href = '/sign-in'}}><b>Sign in</b></a>
                    </div>
                    <a className='profileDropdown__header__content__btn profileDropdown__header__content__btn--1 px-4'>
                        <a><b>Join IKEA Family</b></a>
                        <button><FontAwesomeIcon icon={faArrowRight} /></button>
                    </a>
                    <a className='profileDropdown__header__content__btn profileDropdown__header__content__btn--2 px-4'>
                        <a><b>Join IKEA Business Network</b></a>
                        <button><FontAwesomeIcon icon={faArrowRight} /></button>
                    </a>
                </div>
                <div className='profileDropdown__family-offer py-4'>
                    <button className='profileDropdown__family-offer__btn py-3 px-3'>
                        <span><b>See the latest IKEA Family offers</b></span>
                        <span><FontAwesomeIcon icon={faArrowRight} /></span>
                    </button>
                </div>
                <div className='profileDropdown__buttons px-4'>
                    <ul className='profileDropdown__buttons__ul'>
                        <li><a>Purchase history</a></li>
                        <li><a>Shopping list</a></li>
                        <li><a>Planners</a></li>
                        <li><a>Track your order</a></li>
                        <li><a>Design</a></li>
                    </ul>
                </div>
        </div>
    )
}