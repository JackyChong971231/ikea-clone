import { searchProductsByKeyword } from "../apiCalls/apis/productAPI";

export const searchProductByKeywordLike = async (keyword) => {
    // console.log(keyword);
    const response = await searchProductsByKeyword(keyword);
    const productsArray = response.data.filter(eachProduct => eachProduct.forSale = true);
    // console.log(productsArray);
    return productsArray;
}