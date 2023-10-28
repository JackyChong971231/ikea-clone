import { apiGateway, POST, GET } from "../apiMaster";

const endPoint = "/api/v1/ikea-clone/wishlist";

export const addToWishlistItemAPI = async (email, barcodeObject, wishlistObject) => {
    let controllerMapping = "/addWishlistItem";
    var requestBody = {
        email: email,
        barcodeId: barcodeObject.barcodeId,
        wishlistId: wishlistObject.wishlistId,
        quantity: 1
    };
    return apiGateway(POST, endPoint + controllerMapping, requestBody);
}