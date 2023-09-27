import { NewAddressRequest } from "./addressRequest"

export const SignInMembershipRequest = {
    email:                      null,
    passwordHash:               null
}

export const SignUpMembershipRequest = {
    firstName:                  null,
    lastName:                   null,
    dateOfBirth:                null,
    postalCode:                 null,
    phone:                      null,
    email:                      null,
    passwordHash:               null,
    preferredStoreId:           null,
    promotionConsent:           null,
    isReadConsentId0:           null,
    role:                       null,
    newAddressRequest:          NewAddressRequest
}