import { searchProductsByKeyword } from "../apiCalls/apis/productAPI";

export const searchProductByKeywordLike = async (keyword) => {
    console.log(keyword);
    const response = await searchProductsByKeyword(keyword);
    console.log(response);
}