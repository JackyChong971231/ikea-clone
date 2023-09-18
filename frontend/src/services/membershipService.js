import sha256 from 'crypto-js/sha256';
import * as React from 'react';

export const signUpMembershipRequest = {
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    phone: "",
    email: "",
    passwordHash: "",
    preferredStoreID: 0,
    promotionConsent: "",
    isReadConsentId0: false,
    role: 0
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
    .then(data => {
        if (data['signedInToken'] !== undefined) {
            localStorage.setItem('user', JSON.stringify(data));
            setSignInErrorMsg('');
            window.location.href = '/'
        } else {
            setSignInErrorMsg(data['responseMessage']);
        }
        // console.log(data['signedInToken'])
    })
}

export const signUpService = (e, signUpMembershipRequestTemp, setSignUpMessage) => {
    e.preventDefault();
    console.log(signUpMembershipRequestTemp);
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
    .then(data => {
        if (data['signedInToken'] !== undefined) {
            localStorage.setItem('user', JSON.stringify(data));
            setSignUpMessage(data['signedInToken']);
            // window.location.href = '/'
        } else {
            setSignUpMessage("Sth is wrong");
        }
        // console.log(data['signedInToken'])
    })
}