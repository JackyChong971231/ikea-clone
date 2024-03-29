import { addToWishlistItemAPI, createNewWishlistAPICall, deleteFromWishlistItemAPI, getAllWishlistItemsAPI, updateWishlistItemAPI } from "../apiCalls/apis/wishlistAPI";

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

export const createNewWishlist = async(email, wishlistName) => {
    // console.log("create new list")
    const responseBody = await createNewWishlistAPICall(email, wishlistName);
    if (responseBody.errorCode==="0000") {return [true, responseBody.data]}
    else {return [false, null]};
}

export const getAllWishlistItems = async(email, signedInToken, wishlistId = null) => {
    const responseBody = await getAllWishlistItemsAPI(email, signedInToken, wishlistId);
    // console.log(responseBody.data)
    let wishlistAndWishlistItem = responseBody.data;
    let wishlistItemsMap = {};
    wishlistAndWishlistItem.wishlistItems.map(eachWishlistItem => {
        wishlistItemsMap[eachWishlistItem.id] = eachWishlistItem;
    })
    wishlistAndWishlistItem.wishlistItems = wishlistItemsMap;
    return wishlistAndWishlistItem;
}

export const updateWishlistItemQuantity = async(wishlistItem) => {
    const responseBody = await updateWishlistItemAPI(wishlistItem)
    return responseBody.data;
}