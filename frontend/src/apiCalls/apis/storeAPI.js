import { apiGateway, POST, GET } from "../apiMaster";

const endPoint = "/api/v1/ikea-clone/store";

export const getAllStoresAPI = async() => {
    return apiGateway(GET, endPoint, null)
}