import sha256 from 'crypto-js/sha256';
import * as React from 'react';
import { navigate } from '../utils/common';
import { signIn, signUp, updateProfile } from '../apiCalls/apis/membershipAPI';

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

// only updates membership table
export const updateUserDetail = async (profileSavedInLocalStorage) => {
    return await updateProfile(profileSavedInLocalStorage);
}