import sha256 from 'crypto-js/sha256';
import * as React from 'react';
import { navigate } from '../utils/common';
import { refreshUserDetail, signIn, signUp, updatePostalCode, updateStore } from '../apiCalls/apis/membershipAPI';

export const signUpMembershipRequest = {
    firstName:              null,
    lastName:               null,
    dateOfBirth:            null,
    postalCode:             null,
    phone:                  null,
    email:                  null,
    passwordHash:           null,
    preferredStoreId:       null,
    promotionConsent:       "",
    isReadConsentId0:       false,
    role:                   0
};

export const addressRequest = {
    addressType:            0,
    streetAddress:          "",
    city:                   "",
    province:               "",
    postalCode:             "",
    country:                "Canada"
}



export const signInService = async (e, email, password, setSignInErrorMsg, setUserDetail, isSignedInForever) => {
    e.preventDefault();
    const passwordHash = sha256(password).toString();
    const responseBody = await signIn(email, passwordHash)

    if (responseBody.errorCode === "0000") {
        setUserDetail(responseBody.data);
        setSignInErrorMsg('');
        navigate('/');
    } else {
        setSignInErrorMsg(responseBody.responseMessage);
    }
}

export const signUpService = async (e, signUpForm, setSignUpMessage, setUserDetail) => {
    e.preventDefault();
    if (!signUpForm.isReadConsentId0) {
        setSignUpMessage("You need to read the policy")
        return
    }
    signUpForm = {
        ...signUpForm,
        addressType: 0,
        country: "Canada",
        passwordHash: sha256(signUpForm.passwordNotHash).toString()
    }
    const responseBody = await signUp(signUpForm)
    if (responseBody.errorCode === "0000") {
        setUserDetail(responseBody.data);
        setSignUpMessage(responseBody.data['signedInToken']);
        navigate('/');
    } else {
        setSignUpMessage(responseBody.responseMessage);
    }
}

export const reloadUserDetail = async (signedInToken, email) => {
    const responseBody = await refreshUserDetail(signedInToken, email)
    if (responseBody.errorCode === "0000") {
        return responseBody.data;
    } else {
        return null;
    }
}

// only updates membership table
export const updateMembershipPostalCode = async (profileSavedInLocalStorage, postalCodeToBe) => {
    const responseBody = await updatePostalCode(profileSavedInLocalStorage, postalCodeToBe);
    if (responseBody.errorCode==="0000") {return true}
    else {return false};
}

export const updateMembershipStore = async (profileSavedInLocalStorage, storeToBe) => {
    const responseBody = await updateStore(profileSavedInLocalStorage, storeToBe);
    if (responseBody.errorCode==="0000") {return true}
    else {return false};
}