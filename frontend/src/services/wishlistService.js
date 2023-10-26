import { addToWishlistItemAPI } from "../apiCalls/apis/wishlistAPI";

export const addToWishlistItem = async (barcodeObject, wishlistObject) => {
    const responseBody = await addToWishlistItemAPI(barcodeObject, wishlistObject);
    if (responseBody.errorCode==="0000") {return true}
    else {return false};
}