import * as React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEye, faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

import sha256 from 'crypto-js/sha256';
import {signInService} from '../services/membershipService';

import signUpImage1 from '../assets/images/sign-up/signUp-image-1.jpg'
import { signUpMembershipRequest, addressRequest, signUpService } from '../services/membershipService';
import { navigate } from '../utils/common';
import { useSharedContext } from '../SharedContext';
import { getAllStores } from '../services/storeService';

export const SignUp = () => {
    const {userDetail, setUserDetail} = useSharedContext();
    const [signUpMembershipRequestTemp, setSignUpMembershipRequestTemp] = React.useState(signUpMembershipRequest);
    const [addressRequestTemp, setAddressRequestTemp] = React.useState(addressRequest);
    const [signUpMessage, setSignUpMessage] = React.useState("")
    const [stores, setStores] = React.useState([]);

    const handleChangeMembership = (e) => {
        var value = e.target.value;
        setSignUpMembershipRequestTemp({
            ...signUpMembershipRequestTemp,
            [e.target.name]: value
        })
    } 

    const handleChangeAddress = (e) => {
        const value = e.target.value;
        setAddressRequestTemp({
            ...addressRequestTemp,
            [e.target.name]: value
        })
    }

    const handleChangeMembershipNAddress = (e) => {
        const value = e.target.value;
        setAddressRequestTemp({
            ...addressRequestTemp,
            [e.target.name]: value
        })
        setSignUpMembershipRequestTemp({
            ...signUpMembershipRequestTemp,
            [e.target.name]: value
        })
    }

    const handleStore = (e) => {
        const value = e.target.value;
        setSignUpMembershipRequestTemp({
            ...signUpMembershipRequestTemp,
            preferredStoreId: parseInt(value)
        })
        // console.log(value);
    }

    const handlePromotionConsent = (e) => {
        switch (e.target.name) {
            case "promotionConsent__all": {
                if (signUpMembershipRequestTemp.promotionConsent === "") {
                    setSignUpMembershipRequestTemp({
                        ...signUpMembershipRequestTemp,
                        promotionConsent: "ES"
                    })
                }
                else {
                    setSignUpMembershipRequestTemp({
                        ...signUpMembershipRequestTemp,
                        promotionConsent: ""
                    })
                }
                break
            }
            default: {
                if (signUpMembershipRequestTemp.promotionConsent.includes(e.target.value)) {
                    // setPromotionConsent(prevPromotionConsent => prevPromotionConsent.replace(e.target.value,""));
                    setSignUpMembershipRequestTemp(prevSignUpMembershipRequestTemp => ({
                        ...signUpMembershipRequestTemp,
                        promotionConsent: prevSignUpMembershipRequestTemp.promotionConsent.replace(e.target.value,"")
                    }));
                }
                else {
                    // setPromotionConsent(prevPromotionConsent => prevPromotionConsent + e.target.value)
                    setSignUpMembershipRequestTemp(prevSignUpMembershipRequestTemp => ({
                        ...signUpMembershipRequestTemp,
                        promotionConsent: prevSignUpMembershipRequestTemp.promotionConsent + e.target.value
                    }));
                }
                break
            }
        }
    }

    const handleIsReadConsent = (e) => {
        setSignUpMembershipRequestTemp({
            ...signUpMembershipRequestTemp,
            isReadConsentId0: !signUpMembershipRequestTemp.isReadConsentId0
        })
    }

    React.useEffect(() => {
        getAllStores()
        .then(data => {
            setStores(data.map((eachStore) => (
                <option value={eachStore.storeId}>{eachStore.displayName}</option>
            )))
        })
    },[])

    return (
        <div className='signUpOutermostContainer'>
            <div className='signUp__header py-4 px-4'>
                <button onClick={() => {navigate('/')}}><FontAwesomeIcon icon={faArrowLeft}/></button>
            </div>
            <div className='row h-100 w-100 mx-0'>
                <div className='signUp__description px-0 pb-5 col-12 pt-sm-5 col-sm-5 col-md-4 col-xl-3'>
                    <h2 className='px-4'>Create an <span>IKEA Family</span> Profile</h2>
                    <p className='px-4'>Already have an account? <span className="signUp_go-to-sign-in" onClick={() => {navigate('/sign-in')}}>Login</span></p>
                    <img className="px-sm-4" src={signUpImage1} alt=""></img>
                </div>
                <div className='signUp__form px-4 col-12 pt-sm-5 col-sm-7 col-md-6 col-xl-4'>
                    <p>Join our IKEA Family loyalty program today for rewards, discounts, inspiration and a few surprises along the way. It’s quick, easy and free. Learn more</p>
                    <form noValidate='' onSubmit={(e) => signUpService(e, signUpMembershipRequestTemp, addressRequestTemp, setSignUpMessage, setUserDetail)}>
                        <div className='signUp__field'>
                            <label for="signUp_firstName">First name</label>
                            <div className='signUp__input-field'>
                                <input id="signUp_firstName" name="firstName" 
                                value={signUpMembershipRequestTemp.firstName} onChange={handleChangeMembership}></input>
                            </div>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_lastName">Last name</label>
                            <div className='signUp__input-field'>
                                <input id="signUp_lastName" name="lastName"
                                value={signUpMembershipRequestTemp.lastName} onChange={handleChangeMembership}></input>
                            </div>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_dob">Birthdate (Optional)</label>
                            <div className='signUp__input-field'>
                                <input id="signUp_dob" name="dateOfBirth"
                                value={signUpMembershipRequestTemp.dateOfBirth} onChange={handleChangeMembership}></input>
                            </div>
                            <p><small>YYYY-MM-DD</small></p>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_streetAddress">Street address</label>
                            <div className='signUp__input-field'>
                                <input id="signUp_streetAddress" name="streetAddress"
                                value={addressRequestTemp.streetAddress} onChange={handleChangeAddress}></input>
                            </div>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_city">City</label>
                            <div className='signUp__input-field'>
                                <input id="signUp_city" name="city"
                                value={addressRequestTemp.city} onChange={handleChangeAddress}></input>
                            </div>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_province">Province</label>
                            <div className='signUp__input-field'>
                                <input id="signUp_province" name="province"
                                value={addressRequestTemp.province} onChange={handleChangeAddress}></input>
                            </div>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_postalCode">Post code</label>
                            <div className='signUp__input-field'>
                                <input id="signUp_postalCode" name="postalCode"
                                value={addressRequestTemp.postalCode} onChange={handleChangeMembershipNAddress}></input>
                            </div>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_preferredStoreID">Preferred store</label>
                            {/* <div className='signUp__input-field'>
                                <input id="signUp_preferredStoreID" name="preferredStoreID"
                                value={signUpMembershipRequestTemp.preferredStoreID} onChange={handleChangeMembership}></input>
                            </div> */}
                            <div className='signUp__select-field__wrapper'>
                                <select className='signUp__select-field' id="signUp_preferredStoreID" onChange={handleStore}>
                                    <option>Please choose one store</option>
                                    {stores}
                                </select>
                            </div>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_phone">Mobile (Optional)</label>
                            <div className='signUp__input-field'>
                                <input name="phone"
                                value={signUpMembershipRequestTemp.phone} onChange={handleChangeMembership}></input>
                            </div>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_email">Email (username)</label>
                            <div className='signUp__input-field'>
                                <input id="signUp_email" name="email"
                                value={signUpMembershipRequestTemp.email} onChange={handleChangeMembership}></input>
                            </div>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_passwordHash">Password</label>
                            <div className='signUp__input-field'>
                                <input id="signUp_passwordHash" name="passwordHash"
                                value={signUpMembershipRequestTemp.passwordHash} onChange={handleChangeMembership}></input>
                            </div>
                        </div>
                        <div className='signUp__input'>
                            <div className='pr-3'>
                                <input id="signUp_promotionConsent__all" name="promotionConsent__all" type="checkbox"
                                text="Yes, I would like to receive exclusive offers, sneak peeks at new products and inspiration from IKEA." 
                                value="ES" onChange={handlePromotionConsent} checked={(signUpMembershipRequestTemp.promotionConsent === "")? false: true}></input>
                            </div>
                            <label for="signUp_promotionConsent__all">Yes, I would like to receive exclusive offers, sneak peeks at new products and inspiration from IKEA.</label>
                        </div>
                        <div className='signUp__input pl-4'>
                            <div className='pr-3'>
                                <input id="signUp_promotionConsent__email" name="promotionConsent__email" type="checkbox"
                                text="Via Email" 
                                value="E" onChange={handlePromotionConsent} checked={(signUpMembershipRequestTemp.promotionConsent.includes("E"))? true: false}></input>
                            </div>
                            <label for="signUp_promotionConsent__email">Via Email</label>
                        </div>
                        <div className='signUp__input pl-4'>
                            <div className='pr-3'>
                                <input id="signUp_promotionConsent__sms" name="promotionConsent__sms" type="checkbox"
                                text="Via SMS (Standard message and data rates may apply.)" 
                                value="S" onChange={handlePromotionConsent} checked={(signUpMembershipRequestTemp.promotionConsent.includes("S"))? true: false}></input>
                            </div>
                            <label for="signUp_promotionConsent__sms">Via SMS (Standard message and data rates may apply.)</label>
                        </div>
                        <div className='signUp__input'>
                            <div className='pr-3'>
                                <input id="signUp_isReadConsentId0" name="isReadConsentId0" type="checkbox"
                                text="I have read and understood the Terms of Use and Privacy Policy." 
                                onChange={handleIsReadConsent} checked={signUpMembershipRequestTemp.isReadConsentId0}></input>
                            </div>
                            <label for="signUp_isReadConsentId0">I have read and understood the Terms of Use and Privacy Policy.</label>
                        </div>
                        <p>{signUpMessage}</p>
                        <button className="sign-up-form__submit-btn py-2" type='submit'>Register</button>
                    </form>
                    <div className='signUp__footnote py-3 mb-5'>
                        <p1><small>
                            IKEA.ca - Cookie Policy and Privacy Policy<br/>
                            © This is not the real IKEA website
                        </small></p1>
                    </div>
                </div>
            </div>
        </div>
    )
}