import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons"

export const ProfileDropdown = () => {
    return (
        <div className='profileDropdown w-100 w-md-'>
                <div className='profileDropdown__header pt-3'>
                    <div className='profileDropdown__header__closeBtn pt-2 px-4'>
                        <span></span>
                        <button><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                    <div className='profileDropdown__header__content pt-3 pb-4 px-4'>
                        <h2><small><b>Hej</b></small></h2>
                        <a className='profileDropdown__header__content__signIn'><b>Sign in</b></a>
                    </div>
                    <a className='profileDropdown__header__content__btn profileDropdown__header__content__btn--1 px-4'>
                        <p><b>Join IKEA Family</b></p>
                        <button><FontAwesomeIcon icon={faArrowRight} /></button>
                    </a>
                    <a className='profileDropdown__header__content__btn profileDropdown__header__content__btn--2 px-4'>
                        <p><b>Join IKEA Business Network</b></p>
                        <button><FontAwesomeIcon icon={faArrowRight} /></button>
                    </a>
                </div>
                <div className='profileDropdown__family-offer'>Hej</div>
                <div className='profileDropdown__buttons'>Hej</div>
        </div>
    )
}