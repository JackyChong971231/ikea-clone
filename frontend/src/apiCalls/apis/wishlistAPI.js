import { apiGateway, POST, GET } from "../apiMaster";

const endPoint = "/api/v1/ikea-clone/wishlist";

export const addToWishlistItemAPI = async (email, barcodeObject, wishlistObject) => {
    let controllerMapping = "/wishlistItem/add";
    var requestBody = {
        email: email,
        barcodeId: barcodeObject.barcodeId,
        wishlistId: wishlistObject.wishlistId,
        quantity: 1
    };
    return apiGateway(POST, endPoint + controllerMapping, requestBody);
}

export const deleteFromWishlistItemAPI = async (email, barcodeObject, wishlistObject) => {
    let controllerMapping = "/wishlistItem/del";
    var requestBody = {
        email: email,
        barcodeId: barcodeObject.barcodeId,
        wishlistId: wishlistObject.wishlistId,
    };
    return apiGateway(POST, endPoint + controllerMapping, requestBody);
}

export const createNewWishlistAPICall = async(email, wishlistName) => {
    let controllerMapping = "/create";
    var requestBody = {
        email: email,
        wishlistName: wishlistName,
    };
    return apiGateway(POST, endPoint + controllerMapping, requestBody);
}

export const getAllWishlistItemsAPI = async (email, signedInToken, wishlistId) => {
    let controllerMapping = "/wishlistItem/get";
    var requestBody = {
        shortUserDetail: {
            email: email,
            signedInToken: signedInToken,
        },
        wishlistId: wishlistId
    };
    return apiGateway(POST, endPoint + controllerMapping, requestBody);
}
export const updateWishlistItemAPI = async (wishlistItem) => {
    let controllerMapping = "/wishlistItem/update";
    const requestBody = {
        wishlistItemId: wishlistItem.id,
        quantity: wishlistItem.quantity
    };
    return apiGateway(POST, endPoint + controllerMapping, requestBody);

}