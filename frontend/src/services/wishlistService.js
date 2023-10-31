import { addToWishlistItemAPI, deleteFromWishlistItemAPI } from "../apiCalls/apis/wishlistAPI";

export const addToWishlistItem = async (email, barcodeObject, wishlistObject) => {
    const responseBody = await addToWishlistItemAPI(email, barcodeObject, wishlistObject);
    if (responseBody.errorCode==="0000") {return [true, responseBody.data]}
    else {return [false, null]};
}

export const deleteFromWishlistItem = async(email, barcodeObject, wishlistObject) => {
    const responseBody = await deleteFromWishlistItemAPI(email, barcodeObject, wishlistObject);
    if (responseBody.errorCode==="0000") {return [true, responseBody.data]}
    else {return [false, null]};
}