import React, { useEffect, useState } from 'react';

import { useSharedContext } from '../../SharedContext';

import ikeaLogo from '../../assets/images/ikeaLogo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart, faShoppingCart, faBars, faArrowLeft, faXmark, faMagnifyingGlass, faLayerGroup, faTruck, faStore } from "@fortawesome/free-solid-svg-icons"

import { ProfileDropdown } from '../popUp/popUp.jsx';
import { switchPopUpContent } from '../../utils/common';
import { getAllStores } from '../../services/storeService';

const searchSuggestions = {
    'keywords': [
        'shelves walls',
        'shelves and storage',
        'shelves units',
        'shelves storage',
        'shelves floating',
        'shelves with doors',

    ],
    'categories': [
        'Bookcases & shelving units',
        'Kitchen shelves'
    ]
}

export const NavBar = () => {
    const { isDropdownComponentOpen, setIsDropdownComponentOpen, setWhichDropdownContent, userDetail, emptyUserDetail } = useSharedContext();

    const [isInputFieldOnFocus, setIsInputFieldOnFocus] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [defaultStore, setDefaultStore] = useState("");

    const handleResize = () => {
        setIsMobile(window.innerWidth <768);
    }

    const switchPopUpContent = (whichDropdownContentToShow) => {
        setWhichDropdownContent(whichDropdownContentToShow);
        setIsDropdownComponentOpen(true);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        getAllStores()
        .then(data => {
            setDefaultStore(data[0].displayName);
        });
    }, [])

    return (
        <div className='navbar'>
            <div className='navbar__container'>
                <div className='navbar__logo py-3'>
                    <a href='https://www.ikea.com/ca/en/' data-tracking-label='ikea-logo'>
                        <img src={ikeaLogo} alt='ikea-logo'></img>
                    </a>
                </div>
                <div className='navbar__search'>
                    <form role='search' action='/search' className='navbar__search__search-box'>
                        <span className={(isMobile)? (isInputFieldOnFocus? 'navbar__search__search-box__close--show': 'navbar__search__search-box__close--hide'): 'navbar__search__search-box__close--hide'}
                        onClick={() => {setIsInputFieldOnFocus(false)}}>
                            <div aria-labelledby='navbar__search__search-box__close--tooltip'><FontAwesomeIcon icon={faArrowLeft} /></div>
                            <div role='tooltip' aria-hidden='true' id='navbar__search__search-box__close--tooltip' className='tooltip'>Close</div>
                        </span>
                        <input className='navbar__search__search-box__input' type='text' enterKeyHint='search' role='combobox' 
                        name='q' maxLength='150' aria-label='Search for products, inspiration or new arrivals'
                        placeholder='Find what you need to Bring Home to Life' autoComplete='off' spellCheck='false'
                        style={{paddingInlineStart: (isMobile && isInputFieldOnFocus)? '2.5rem': '1rem'}}
                        onClick={() => {setIsInputFieldOnFocus(true)}}></input>
                        <div className='navbar__search__search-box__buttons'>
                            <span className='px-3'><FontAwesomeIcon icon={faXmark} /></span>
                            <span className='px-3'><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                        </div>
                    </form>
                    <div className='dropdown' style={{display: (isInputFieldOnFocus? '': 'none')}}>
                        <div className='search-suggestions'>
                            {Object.keys(searchSuggestions).map(category => (
                                <>
                                    {searchSuggestions[category].map(suggestion => {
                                        return (
                                            <a className='search-suggestions__item py-2' aria-label={suggestion}>
                                                <span className='search-suggestions__item__logo px-4'><FontAwesomeIcon icon={(category==='keywords')? faMagnifyingGlass: faLayerGroup} /></span>
                                                <span className='search-suggestions__item__text'>{suggestion}</span>
                                            </a>
                                        )
                                    })}
                                </>

                            ))}
                        </div>
                    </div>
                </div>
                <ul className='navbar__icons'>
                    <a className='navbar__icons__item profile px-3' onClick={() => {switchPopUpContent('profile')}}><FontAwesomeIcon icon={faUser} /></a>
                    <a className='navbar__icons__item wishlist px-3'><FontAwesomeIcon icon={faHeart} /></a>
                    <a className='navbar__icons__item cart px-3'><FontAwesomeIcon icon={faShoppingCart} /></a>
                    <a className='navbar__icons__item bars px-3'><FontAwesomeIcon icon={faBars} /></a>
                </ul>
                <div className='navbar__location py-2'>
                    <div className='col-6 border-bottom' onClick={() => {switchPopUpContent('location')}}>
                        <div className='navbar__location__container postal-code py-3'>
                            <FontAwesomeIcon className='pr-3' icon={faTruck} />
                            {
                                ((userDetail === emptyUserDetail)? <p>Enter postal Code</p> : (userDetail.postalCode !== null && userDetail.postalCode !== "")? <p>{userDetail.postalCode}</p> : <p>Enter postal Code</p>)
                            }
                        </div>
                    </div>
                    <div className='col-6 border-bottom' onClick={() => {switchPopUpContent('store')}}>
                        <span></span>
                        <div className='navbar__location__container store py-3'>
                            <FontAwesomeIcon className='pr-3' icon={faStore} />
                            {
                                ((userDetail === emptyUserDetail)? <p>{defaultStore}</p>: (userDetail.preferredStore !== null)? <p>{userDetail.preferredStore.displayName}</p> : <p>{defaultStore}</p>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}