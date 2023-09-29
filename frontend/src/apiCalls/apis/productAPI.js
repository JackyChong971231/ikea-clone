import { apiGateway, POST, GET } from "../apiMaster";

const endPoint = "/api/v1/ikea-clone/product";

export const searchProductsByKeyword = async (keyword) => {
    let controllerMapping = "/search";
    return apiGateway(POST, endPoint + controllerMapping, keyword);
}