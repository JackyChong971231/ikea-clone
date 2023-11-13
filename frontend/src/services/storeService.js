import { GET, apiGateway } from "../apiCalls/apiMaster";
import { getAllStoresAPI } from "../apiCalls/apis/storeAPI";

export const getAllStores = async () => {
    const response = await getAllStoresAPI()
    console.log(response);
    // const data = await response.json();
    return response;
}