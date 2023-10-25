import { apiGateway, POST, GET } from "../apiMaster";
import { SignInMembershipRequest, SignUpMembershipRequest } from "../requests/membershipRequest";

const endPoint = "/api/v1/ikea-clone/membership";

export const signIn = async (email, passwordHash) => {
    let controllerMapping = "/sign-in";
    var requestBody = SignInMembershipRequest;
    requestBody.email = email;
    requestBody.passwordHash = passwordHash;
    return apiGateway(POST, endPoint + controllerMapping, requestBody)
}

export const signUp = async (signUpForm) => {
    let controllerMapping = "/sign-up";
    var requestBody = SignUpMembershipRequest;
    requestBody.firstName                       = signUpForm.firstName;
    requestBody.lastName                        = signUpForm.lastName;
    requestBody.dateOfBirth                     = signUpForm.dateOfBirth;
    requestBody.postalCode                      = signUpForm.postalCode;
    requestBody.phone                           = signUpForm.phone;
    requestBody.email                           = signUpForm.email;
    requestBody.passwordHash                    = signUpForm.passwordHash;
    requestBody.preferredStoreId                = signUpForm.preferredStoreId;
    requestBody.promotionConsent                = signUpForm.promotionConsent;
    requestBody.isReadConsentId0                = signUpForm.isReadConsentId0;
    requestBody.role                            = signUpForm.role;
    requestBody.newAddressRequest.addressType   = signUpForm.addressType;
    requestBody.newAddressRequest.streetAddress = signUpForm.streetAddress;
    requestBody.newAddressRequest.city          = signUpForm.city;
    requestBody.newAddressRequest.province      = signUpForm.province;
    requestBody.newAddressRequest.country       = signUpForm.country;
    requestBody.newAddressRequest.postalCode    = signUpForm.postalCode;
    return apiGateway(POST, endPoint + controllerMapping, requestBody);
}

export const updateProfile = async (profileSavedInLocalStorage, membershipTableColumnName) => {
    let controllerMapping = "/update";
    const requestBody = {
        localStorageUserDetail: profileSavedInLocalStorage,
        columnName: membershipTableColumnName
    }
    return apiGateway(POST, endPoint + controllerMapping, requestBody);
}

export const addToWishlistItemAPI = async (barcode, wishlist) => {
    let controllerMapping = "/addWishlistItem";
    const requestBody ={
        barcode: barcode,
        wishlist: wishlist,
        quantity: 1
    }
    return apiGateway(POST, endPoint + controllerMapping, requestBody)
}