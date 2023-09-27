import * as React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import signUpImage1 from '../assets/images/sign-up/signUp-image-1.jpg'
import { signUpService } from '../services/membershipService';
import { navigate } from '../utils/common';
import { useSharedContext } from '../SharedContext';
import { getAllStores } from '../services/storeService';

export const SignUp = () => {
    const {userDetail, setUserDetail} = useSharedContext();
    const [signUpForm, setSignUpForm] = React.useState({
        firstName:              null,
        lastName:               null,
        dateOfBirth:            null,
        streetAddress:          null,
        city:                   null,
        province:               null,
        postalCode:             null,
        preferredStoreId:       null,
        phone:                  null,
        email:                  null,
        passwordNotHash:           null,
        promotionConsent:       "",
        isReadConsentId0:       false,
        role:                   0,

    })
    const [signUpMessage, setSignUpMessage] = React.useState("")
    const [stores, setStores] = React.useState([]);

    const handleSignUpFormInput = (e) => {
        var value = e.target.value;
        if (e.target.name === "preferredStoreId") {value = parseInt(e.target.value)}
        setSignUpForm({
            ...signUpForm,
            [e.target.name]: value
        });
    }

    const handlePromotionConsent = (e) => {
        switch (e.target.name) {
            case "promotionConsent__all": {
                if (signUpForm.promotionConsent === "") {
                    setSignUpForm({
                        ...signUpForm,
                        promotionConsent: "ES"
                    })
                }
                else {
                    setSignUpForm({
                        ...signUpForm,
                        promotionConsent: ""
                    })
                }
                break
            }
            default: {
                if (signUpForm.promotionConsent.includes(e.target.value)) {
                    setSignUpForm(prevSignUpForm => ({
                        ...signUpForm,
                        promotionConsent: prevSignUpForm.promotionConsent.replace(e.target.value,"")
                    }));
                }
                else {
                    setSignUpForm(prevSignUpForm => ({
                        ...signUpForm,
                        promotionConsent: prevSignUpForm.promotionConsent + e.target.value
                    }));
                }
                break
            }
        }
    }

    const handleIsReadConsent = (e) => {
        setSignUpForm({
            ...signUpForm,
            isReadConsentId0: !signUpForm.isReadConsentId0
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
                    <form noValidate='' onSubmit={(e) => signUpService(e, signUpForm, setSignUpMessage, setUserDetail)}>
                        <div className='signUp__field'>
                            <label for="signUp_firstName">First name</label>
                            <div className='signUp__input-field'>
                                <input id="signUp_firstName" name="firstName" 
                                value={signUpForm.firstName} onChange={handleSignUpFormInput}></input>
                            </div>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_lastName">Last name</label>
                            <div className='signUp__input-field'>
                                <input id="signUp_lastName" name="lastName"
                                value={signUpForm.lastName} onChange={handleSignUpFormInput}></input>
                            </div>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_dob">Birthdate (Optional)</label>
                            <div className='signUp__input-field'>
                                <input id="signUp_dob" name="dateOfBirth"
                                value={signUpForm.dateOfBirth} onChange={handleSignUpFormInput}></input>
                            </div>
                            <p><small>YYYY-MM-DD</small></p>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_streetAddress">Street address</label>
                            <div className='signUp__input-field'>
                                <input id="signUp_streetAddress" name="streetAddress"
                                value={signUpForm.streetAddress} onChange={handleSignUpFormInput}></input>
                            </div>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_city">City</label>
                            <div className='signUp__input-field'>
                                <input id="signUp_city" name="city"
                                value={signUpForm.city} onChange={handleSignUpFormInput}></input>
                            </div>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_province">Province</label>
                            <div className='signUp__input-field'>
                                <input id="signUp_province" name="province"
                                value={signUpForm.province} onChange={handleSignUpFormInput}></input>
                            </div>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_postalCode">Post code</label>
                            <div className='signUp__input-field'>
                                <input id="signUp_postalCode" name="postalCode"
                                value={signUpForm.postalCode} onChange={handleSignUpFormInput}></input>
                            </div>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_preferredStoreID">Preferred store</label>
                            <div className='signUp__select-field__wrapper'>
                                <select className='signUp__select-field' id="signUp_preferredStoreID" name="preferredStoreId" onChange={handleSignUpFormInput}>
                                    <option>Please choose one store</option>
                                    {stores}
                                </select>
                            </div>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_phone">Mobile (Optional)</label>
                            <div className='signUp__input-field'>
                                <input name="phone"
                                value={signUpForm.phone} onChange={handleSignUpFormInput}></input>
                            </div>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_email">Email (username)</label>
                            <div className='signUp__input-field'>
                                <input id="signUp_email" name="email"
                                value={signUpForm.email} onChange={handleSignUpFormInput}></input>
                            </div>
                        </div>
                        <div className='signUp__field'>
                            <label for="signUp_passwordHash">Password</label>
                            <div className='signUp__input-field'>
                                <input id="signUp_passwordHash" name="passwordNotHash"
                                value={signUpForm.passwordNotHash} onChange={handleSignUpFormInput}></input>
                            </div>
                        </div>
                        <div className='signUp__input'>
                            <div className='pr-3'>
                                <input id="signUp_promotionConsent__all" name="promotionConsent__all" type="checkbox"
                                text="Yes, I would like to receive exclusive offers, sneak peeks at new products and inspiration from IKEA." 
                                value="ES" onChange={handlePromotionConsent} checked={(signUpForm.promotionConsent === "")? false: true}></input>
                            </div>
                            <label for="signUp_promotionConsent__all">Yes, I would like to receive exclusive offers, sneak peeks at new products and inspiration from IKEA.</label>
                        </div>
                        <div className='signUp__input pl-4'>
                            <div className='pr-3'>
                                <input id="signUp_promotionConsent__email" name="promotionConsent__email" type="checkbox"
                                text="Via Email" 
                                value="E" onChange={handlePromotionConsent} checked={(signUpForm.promotionConsent.includes("E"))? true: false}></input>
                            </div>
                            <label for="signUp_promotionConsent__email">Via Email</label>
                        </div>
                        <div className='signUp__input pl-4'>
                            <div className='pr-3'>
                                <input id="signUp_promotionConsent__sms" name="promotionConsent__sms" type="checkbox"
                                text="Via SMS (Standard message and data rates may apply.)" 
                                value="S" onChange={handlePromotionConsent} checked={(signUpForm.promotionConsent.includes("S"))? true: false}></input>
                            </div>
                            <label for="signUp_promotionConsent__sms">Via SMS (Standard message and data rates may apply.)</label>
                        </div>
                        <div className='signUp__input'>
                            <div className='pr-3'>
                                <input id="signUp_isReadConsentId0" name="isReadConsentId0" type="checkbox"
                                text="I have read and understood the Terms of Use and Privacy Policy." 
                                onChange={handleIsReadConsent} checked={signUpForm.isReadConsentId0}></input>
                            </div>
                            <label for="signUp_isReadConsentId0">I have read and understood the Terms of Use and Privacy Policy.</label>
                        </div>
                        <p className='signUp_apiResponseMessage'>{signUpMessage}</p>
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