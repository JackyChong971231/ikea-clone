export const getAllStores = async () => {
    const response = await fetch('http://localhost:8080/api/v1/ikea-clone/store');
    const data = await response.json();
    return data;
}