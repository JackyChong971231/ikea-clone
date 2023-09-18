import sha256 from 'crypto-js/sha256';
import * as React from 'react';
import { navigate } from '../utils/common';

export const signUpMembershipRequest = {
    firstName:              null,
    lastName:               null,
    dateOfBirth:            null,
    phone:                  null,
    email:                  null,
    passwordHash:           null,
    preferredStoreId:       null,
    promotionConsent:       "",
    isReadConsentId0:       false,
    role:                   0
};

export const addressRequest = {
    addressType: null,
    streetAddress: "",
    city: "",
    province: "",
    postalCode: "",
    country: ""
}

export const signInService = (e, email, password, setSignInErrorMsg) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/v1/ikea-clone/membership/sign-in', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', 'Connection': 'keep-alive' },
        body: JSON.stringify({
            email: email,
            passwordHash: sha256(password).toString()
        })
    })
    .then(response => response.json())
    .then(body => {
        if (body.errorCode === "0000") {
            localStorage.setItem('user', JSON.stringify(body.data));
            setSignInErrorMsg('');
            navigate('/');
        } else {
            setSignInErrorMsg(body.data['responseMessage']);
        }
        // console.log(data['signedInToken'])
    })
}

export const signUpService = (e, signUpMembershipRequestTemp, setSignUpMessage) => {
    e.preventDefault();
    // console.log(signUpMembershipRequestTemp);
    if (!signUpMembershipRequestTemp.isReadConsentId0) {
        setSignUpMessage("You need to read the policy")
        return
    }
    fetch('http://localhost:8080/api/v1/ikea-clone/membership/sign-up', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', 'Connection': 'keep-alive' },
        body: JSON.stringify({
            ...signUpMembershipRequestTemp,
            passwordHash: sha256(signUpMembershipRequestTemp.passwordHash).toString()
        })
    })
    .then(response => response.json())
    .then(body => {
        if (body.errorCode === "0000") {
            localStorage.setItem('user', JSON.stringify(body.data));
            setSignUpMessage(body.data['signedInToken']);
            navigate('/');
        } else {
            setSignUpMessage("Sth is wrong");
        }
        // console.log(data['signedInToken'])
    })
}